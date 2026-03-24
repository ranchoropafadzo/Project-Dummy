import httpx
from jose import jwt, JWTError
from fastapi import Request, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import config as cfg
import logging

logger = logging.getLogger("KeycloakAuth")

security = HTTPBearer()

class KeycloakAuth:
    def __init__(self):
        self.jwks_url = f"{cfg.KEYCLOAK_BASE_URL}/realms/{cfg.KEYCLOAK_REALM}/protocol/openid-connect/certs"
        self.client_id = cfg.KEYCLOAK_CLIENT_ID
        self.algorithms = [cfg.KEYCLOAK_ALGORITHM]
        self.jwks = None

    async def get_jwks(self):
        """Fetch JSON Web Key Set from Keycloak to verify signatures."""
        if self.jwks:
            return self.jwks
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.jwks_url, timeout=10.0)
                response.raise_for_status()
                self.jwks = response.json()
                return self.jwks
        except Exception as e:
            logger.error(f"Failed to fetch JWKS from Keycloak: {e}")
            raise HTTPException(status_code=500, detail="Identity provider unavailable.")

    async def verify_token(self, token: str):
        jwks = await self.get_jwks()
        
        # Get the unverified header to find the active key ID (kid)
        try:
            unverified_header = jwt.get_unverified_header(token)
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token header.")
            
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
                break
                
        if rsa_key:
            try:
                # Keycloak Audience behavior can vary based on setup.
                # In standard setups, the client_id is in the 'aud' or 'azp' claim.
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=self.algorithms,
                    audience=self.client_id,
                    options={"verify_aud": False} # Often Keycloak puts audience in `azp`
                )
                return payload
            except jwt.ExpiredSignatureError:
                raise HTTPException(status_code=401, detail="Token has expired.")
            except jwt.JWTClaimsError:
                raise HTTPException(status_code=401, detail="Incorrect claims.")
            except Exception as e:
                # Catch-all
                raise HTTPException(status_code=401, detail="Could not parse credentials.")
                
        raise HTTPException(status_code=401, detail="Unable to find appropriate key.")

auth_handler = KeycloakAuth()

async def get_current_user_roles(credentials: HTTPAuthorizationCredentials = Security(security)) -> list[str]:
    """
    FastAPI Dependency to validate token and extract RBAC roles.
    Expects Keycloak standard realm_access.roles format.
    """
    token = credentials.credentials
    payload = await auth_handler.verify_token(token)
    
    # Extract roles (Keycloak specific hierarchy)
    # Payload format is typically: {"realm_access": {"roles": ["admin", "user"]}}
    roles = []
    realm_access = payload.get("realm_access", {})
    if isinstance(realm_access, dict):
        roles.extend(realm_access.get("roles", []))
        
    # User ID usually in 'sub' or 'preferred_username'
    user_id = payload.get("preferred_username", payload.get("sub", "unknown"))
    
    logger.debug(f"Authenticated user: {user_id} with roles: {roles}")
    return roles
