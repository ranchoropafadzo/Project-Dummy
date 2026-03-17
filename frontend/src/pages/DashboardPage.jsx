import { useState } from 'react'

const NAV_ITEMS = [
  {
    id: 'risk',
    label: 'RISK OVERVIEW',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'backup',
    label: 'BACKUP STATUS',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 'access',
    label: 'ACCESS CONTROL',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 'incidents',
    label: 'INCIDENTS',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export default function DashboardPage({ onLogout }) {
  const [activePage, setActivePage] = useState('risk')
  const [darkMode, setDarkMode] = useState(false)
  const styles = makeStyles(darkMode)
  const dm = darkMode

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          {/* Brand */}
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dm ? '#93c5fd' : '#1a237e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div style={styles.brandName}>IT Admin</div>
              <div style={styles.brandSub}>Security Dashboard</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  ...styles.navItem,
                  ...(activePage === item.id ? styles.navItemActive : {}),
                }}
              >
                <span style={{ color: activePage === item.id ? (dm ? '#93c5fd' : '#1a237e') : (dm ? '#94a3b8' : '#6b7280') }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Admin Profile — pinned to bottom */}
        <div style={styles.profile}>
          <div style={styles.profileInner}>
            <div style={styles.avatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div style={styles.profileName}>Admin</div>
              <div style={styles.profileRole}>System Manager</div>
            </div>
          </div>
          {onLogout && (
            <button onClick={onLogout} style={styles.logoutBtn} title="Log out">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Page Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            {activePage === 'backup' ? (
              <>
                <h1 style={styles.pageTitle}>Backup Management</h1>
                <p style={styles.pageSubtitle}>
                  Automated Backup Status &mdash;{' '}
                  <span style={styles.subtitleLink}>SHA-256 Integrity Verification</span>
                </p>
              </>
            ) : activePage === 'access' ? (
              <>
                <h1 style={styles.pageTitle}>Role-Based Access Control</h1>
                <p style={styles.pageSubtitle}>
                  RBAC Management &mdash;{' '}
                  <span style={styles.subtitleLink}>Keycloak / LDAP Integration</span>
                </p>
              </>
            ) : activePage === 'incidents' ? (
              <>
                <h1 style={styles.pageTitle}>Incident Tickets</h1>
                <p style={styles.pageSubtitle}>
                  <span style={styles.subtitleLink}>SLA-Tracked Incident Response Lifecycle</span>
                </p>
              </>
            ) : (
              <>
                <h1 style={styles.pageTitle}>IT Administrator</h1>
                <p style={styles.pageSubtitle}>
                  System Risk Overview &mdash;{' '}
                  <span style={styles.subtitleLink}>Chinhoyi University of Technology</span>
                </p>
              </>
            )}
          </div>
          <div style={styles.headerRight}>
            <span style={styles.lastUpdated}>Last updated: —</span>
            {/* Dark / Light mode toggle */}
            <button onClick={() => setDarkMode(!dm)} style={styles.themeToggle} title={dm ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dm ? (
                /* Sun icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── BACKUP STATUS PAGE ── */}
        {activePage === 'backup' && <>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <span style={styles.cardLabel}>JOBS VERIFIED</span>
              <div style={styles.splitValue}>
                <span style={{ color: '#16a34a', fontSize: '34px', fontWeight: '800' }}>—</span>
                <span style={{ color: dm ? '#475569' : '#9ca3af', fontSize: '34px', fontWeight: '800', margin: '0 4px' }}>/</span>
                <span style={{ color: dm ? '#475569' : '#9ca3af', fontSize: '34px', fontWeight: '800' }}>—</span>
              </div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>— require attention</div>
            </div>

            <div style={styles.card}>
              <span style={styles.cardLabel}>FAILED JOBS</span>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#ef4444', lineHeight: '1' }}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>— ago</div>
            </div>

            <div style={styles.card}>
              <span style={styles.cardLabel}>TOTAL BACKUP SIZE</span>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#0891b2', lineHeight: '1' }}>— GB</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>Across all destinations</div>
            </div>

            <div style={styles.card}>
              <span style={styles.cardLabel}>NEXT FULL BACKUP</span>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#f59e0b', lineHeight: '1' }}>--:--</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>In — h —m</div>
            </div>
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>BACKUP JOB STATUS</span></div>
            <table style={styles.table}>
              <thead>
                <tr>{['Job Name', 'Last Run', 'Size', 'Integrity', 'Status'].map((col) => (
                  <th key={col} style={styles.th}>{col}</th>
                ))}</tr>
              </thead>
              <tbody>
                {['PostgreSQL Primary','MongoDB Events','File Server NAS','Email Archives','Keycloak Config','Redis Snapshot'].map((job) => (
                  <tr key={job}>
                    <td style={{ ...styles.td, fontWeight: '600', color: dm ? '#f1f5f9' : '#111827' }}>{job}</td>
                    <td style={styles.td}>—</td>
                    <td style={styles.td}>—</td>
                    <td style={styles.td}>—</td>
                    <td style={styles.td}><span style={styles.badgeNeutral}>—</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>STORAGE UTILIZATION</span></div>
            <div style={styles.storageList}>
              {[
                { label: 'On-Prem NAS',   barColor: 'linear-gradient(to right, #f97316, #ef4444)' },
                { label: 'S3 Cloud',      barColor: '#06b6d4' },
                { label: 'Off-site Tape', barColor: '#06b6d4' },
              ].map(({ label, barColor }) => (
                <div key={label} style={styles.storageRow}>
                  <div style={styles.storageRowHeader}>
                    <span style={styles.storageLabel}>{label}</span>
                    <span style={styles.storageMeta}>—% of —</span>
                  </div>
                  <div style={styles.storageTrack}>
                    <div style={{ ...styles.storageBar, background: barColor, width: '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>RETENTION SCHEDULE</span></div>
            <div style={styles.retentionList}>
              {[
                { label: 'Daily Snapshots',  sub: '— days' },
                { label: 'Weekly Snapshots', sub: '— weeks' },
                { label: 'Monthly Archives', sub: '— months' },
              ].map(({ label, sub }, i) => (
                <div key={label} style={{ ...styles.retentionRow, borderBottom: i < 2 ? `1px solid ${dm ? '#334155' : '#f3f4f6'}` : 'none' }}>
                  <div>
                    <div style={styles.retentionLabel}>{label}</div>
                    <div style={styles.retentionSub}>{sub}</div>
                  </div>
                  <div style={styles.copiesBadge}>
                    <span style={styles.copiesNum}>—</span>
                    <span style={styles.copiesText}> copies</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>}

        {/* ── ACCESS CONTROL PAGE ── */}
        {activePage === 'access' && <>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <span style={styles.cardLabel}>TOTAL USERS</span>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#0891b2', lineHeight: '1' }}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>Active accounts</div>
            </div>
            <div style={styles.card}>
              <span style={styles.cardLabel}>MFA ENABLED</span>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#f59e0b', lineHeight: '1' }}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>—% adoption rate</div>
            </div>
            <div style={styles.card}>
              <span style={styles.cardLabel}>PENDING APPROVALS</span>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#f97316', lineHeight: '1' }}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>Elevated permission requests</div>
            </div>
            <div style={styles.card}>
              <span style={styles.cardLabel}>PAM SESSIONS</span>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#7c3aed', lineHeight: '1' }}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>Active privileged session</div>
            </div>
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>ROLE PERMISSIONS MATRIX</span></div>
            <table style={styles.table}>
              <thead>
                <tr>{['Role', 'Active Users', 'Access Level', 'MFA Required', 'Actions'].map((col) => (
                  <th key={col} style={styles.th}>{col}</th>
                ))}</tr>
              </thead>
              <tbody>
                {[
                  { role: 'IT Administrator',   access: 'Full',               mfa: 'required' },
                  { role: 'Security Analyst',   access: 'Security & Logs',    mfa: 'required' },
                  { role: 'Compliance Officer', access: 'Reports & Policies', mfa: 'optional' },
                  { role: 'System Auditor',     access: 'Read-Only Audit',    mfa: 'optional' },
                  { role: 'IT Technician',      access: 'Operational',        mfa: 'optional' },
                ].map(({ role, access, mfa }) => (
                  <tr key={role}>
                    <td style={{ ...styles.td, color: '#0891b2', fontWeight: '600' }}>{role}</td>
                    <td style={{ ...styles.td, fontWeight: '700', color: dm ? '#f1f5f9' : '#111827' }}>—</td>
                    <td style={styles.td}>{access}</td>
                    <td style={styles.td}>
                      {mfa === 'required' ? <span style={styles.mfaRequired}>Required</span> : <span style={styles.mfaOptional}>Optional</span>}
                    </td>
                    <td style={styles.td}><span style={styles.manageLink}>Manage &gt;</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}

        {/* ── INCIDENTS PAGE ── */}
        {activePage === 'incidents' && (
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>OPEN &amp; ACTIVE INCIDENTS</span></div>
            <div style={styles.incidentList}>
              {[
                { title: 'Brute-force on admin account',      id: 'INC-0041', assigned: 'analyst_01', dot: '#ef4444', status: 'open',       severity: 'critical' },
                { title: 'Email archive backup failure',      id: 'INC-0040', assigned: 'tech_02',    dot: '#f97316', status: 'in-progress', severity: 'high'     },
                { title: 'Unauthorised access /data/finance', id: 'INC-0039', assigned: 'analyst_02', dot: '#ef4444', status: 'open',       severity: 'critical' },
                { title: 'Port scan from external IP',        id: 'INC-0038', assigned: 'analyst_01', dot: '#f97316', status: 'resolved',    severity: 'medium'   },
                { title: 'GDPR control gap \u2014 Data Retention', id: 'INC-0037', assigned: 'compliance', dot: '#f97316', status: 'in-progress', severity: 'medium' },
              ].map(({ title, id, assigned, dot, status, severity }, i, arr) => (
                <div key={id} style={{ ...styles.incidentRow, borderBottom: i < arr.length - 1 ? `1px solid ${dm ? '#334155' : '#f3f4f6'}` : 'none' }}>
                  <div style={styles.incidentLeft}>
                    <span style={{ ...styles.incidentDot, background: dot }} />
                    <div>
                      <div style={styles.incidentTitle}>{title}</div>
                      <div style={styles.incidentMeta}>{id} &bull; Assigned: {assigned}</div>
                    </div>
                  </div>
                  <div style={styles.incidentRight}>
                    {status === 'resolved'
                      ? <span style={styles.slaMet}>SLA met</span>
                      : <span style={styles.incidentTime}>— remaining</span>}
                    <span style={status === 'open' ? styles.badgeOpen : status === 'in-progress' ? styles.badgeInProgress : styles.badgeResolved}>{status}</span>
                    <span style={severity === 'critical' ? styles.badgeCritical : severity === 'high' ? styles.badgeHigh : styles.badgeMedium}>{severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RISK OVERVIEW PAGE ── */}
        {activePage === 'risk' && <>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardLabel}>OVERALL RISK SCORE</span>
                <div style={{ ...styles.iconBadge, background: '#fff7ed', border: '1px solid #fed7aa' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
              </div>
              <div style={styles.cardValue}>—</div>
              <div style={styles.cardMeta}>
                <span style={{ color: '#16a34a', fontWeight: '600' }}>↓ — pts</span>
                <span style={{ color: dm ? '#94a3b8' : '#6b7280' }}> from last month</span>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardLabel}>CRITICAL VULNS</span>
                <div style={{ ...styles.iconBadge, background: '#fff1f2', border: '1px solid #fecdd3' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
              </div>
              <div style={styles.cardValue}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>Requires immediate action</div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardLabel}>ACTIVE INCIDENTS</span>
                <div style={{ ...styles.iconBadge, background: '#fff7ed', border: '1px solid #fed7aa' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    <line x1="12" y1="2" x2="12" y2="4" />
                  </svg>
                </div>
              </div>
              <div style={styles.cardValue}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>— critical, — medium</div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardLabel}>MONITORED ENDPOINTS</span>
                <div style={{ ...styles.iconBadge, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
              </div>
              <div style={styles.cardValue}>—</div>
              <div style={{ ...styles.cardMeta, color: dm ? '#94a3b8' : '#6b7280' }}>—% reporting</div>
            </div>
          </div>

          {/* Risk Score Trend */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>RISK SCORE TREND (9 MONTHS)</span></div>
            <div style={styles.chartArea}>
              <div style={styles.chartInner}>
                <div style={styles.yAxis}>
                  {[100, 75, 50, 25, 0].map((v) => <span key={v} style={styles.yLabel}>{v}</span>)}
                </div>
                <div style={styles.chartPlaceholder}>
                  <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none" style={{ display: 'block' }}>
                    {[0, 50, 100, 150, 200].map((y) => (
                      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke={dm ? '#334155' : '#e5e7eb'} strokeWidth="1" strokeDasharray="4,4" />
                    ))}
                    <path d="M0,140 C100,130 200,100 300,80 C400,60 500,90 600,120 C700,150 750,170 800,180 L800,200 L0,200 Z" fill="rgba(249,115,22,0.12)" />
                    <path d="M0,140 C100,130 200,100 300,80 C400,60 500,90 600,120 C700,150 750,170 800,180" fill="none" stroke="#f97316" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
              <div style={styles.xAxis}>
                {['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'].map((m) => <span key={m} style={styles.xLabel}>{m}</span>)}
              </div>
            </div>
          </div>

          {/* Department Risk Heatmap */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>DEPARTMENT RISK HEATMAP</span></div>
            <div style={styles.heatmapArea}>
              <div style={styles.heatmapRows}>
                {['Finance','Research','Registry','Library','IT Ops','HR'].map((dept) => (
                  <div key={dept} style={styles.heatmapRow}>
                    <span style={styles.deptLabel}>{dept}</span>
                    <div style={styles.barTrack}><div style={styles.barEmpty} /></div>
                  </div>
                ))}
              </div>
              <div style={styles.heatmapXAxis}>
                <div style={styles.heatmapXLabels}>
                  {[0,25,50,75,100].map((v) => <span key={v} style={styles.heatmapXLabel}>{v}</span>)}
                </div>
              </div>
            </div>
            <div style={styles.legend}>
              {[{ color:'#ef4444', label:'High Risk' },{ color:'#f59e0b', label:'Medium Risk' },{ color:'#22c55e', label:'Low Risk' }].map(({ color, label }) => (
                <div key={label} style={styles.legendItem}>
                  <span style={{ ...styles.legendDot, background: color }} />
                  <span style={styles.legendLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vulnerability Distribution */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}><span style={styles.chartTitle}>VULNERABILITY DISTRIBUTION BY SEVERITY</span></div>
            <div style={styles.vulnBody}>
              <div style={styles.donutWrap}>
                <svg width="130" height="130" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="56" fill="none" stroke={dm ? '#334155' : '#f3f4f6'} strokeWidth="28" />
                  <circle cx="80" cy="80" r="56" fill="none" stroke="#ef4444" strokeWidth="28" strokeDasharray="0 351.86" strokeLinecap="butt" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="56" fill="none" stroke="#f97316" strokeWidth="28" strokeDasharray="0 351.86" strokeLinecap="butt" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="56" fill="none" stroke="#f59e0b" strokeWidth="28" strokeDasharray="0 351.86" strokeLinecap="butt" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="56" fill="none" stroke="#22c55e" strokeWidth="28" strokeDasharray="0 351.86" strokeLinecap="butt" transform="rotate(-90 80 80)" />
                </svg>
              </div>
              <div style={styles.vulnRows}>
                {[
                  { label:'Critical', color:'#ef4444' },
                  { label:'High',     color:'#f97316' },
                  { label:'Medium',   color:'#f59e0b' },
                  { label:'Low',      color:'#22c55e' },
                ].map(({ label, color }) => (
                  <div key={label} style={styles.vulnRow}>
                    <div style={styles.vulnRowHeader}>
                      <div style={styles.vulnRowLeft}>
                        <span style={{ ...styles.vulnDot, background: color }} />
                        <span style={styles.vulnLabel}>{label}</span>
                      </div>
                      <span style={styles.vulnCount}>— CVEs</span>
                    </div>
                    <div style={styles.vulnTrack}>
                      <div style={{ ...styles.vulnBar, background: color, width: '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.vulnFooter}>
              <span style={styles.vulnTotalLabel}>Total Vulnerabilities</span>
              <span style={styles.vulnTotalValue}>— CVEs</span>
            </div>
          </div>
        </>}

        <div style={{ minHeight: '32px', flexShrink: 0 }} />
      </main>
    </div>
  )
}

const makeStyles = (dm) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: dm ? '#0f172a' : '#f1f5f9',
  },
  sidebar: {
    width: '260px',
    minWidth: '260px',
    height: '100vh',
    background: dm ? '#1e293b' : 'white',
    borderRight: `1px solid ${dm ? '#334155' : '#e5e7eb'}`,
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 0 24px',
    flexShrink: 0,
    boxSizing: 'border-box',
  },
  sidebarTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    flex: 1,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 24px',
  },
  brandIcon: {
    width: '44px',
    height: '44px',
    background: dm ? '#1e3a5f' : '#eff6ff',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  brandName: {
    fontSize: '17px',
    fontWeight: '700',
    color: dm ? '#f1f5f9' : '#111827',
    lineHeight: '1.2',
  },
  brandSub: {
    fontSize: '12px',
    color: dm ? '#64748b' : '#9ca3af',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '0 12px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 14px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    color: dm ? '#94a3b8' : '#6b7280',
    letterSpacing: '0.5px',
    textAlign: 'left',
    width: '100%',
    transition: 'background 0.15s',
  },
  navItemActive: {
    background: dm ? '#1e3a5f' : '#eff6ff',
    color: dm ? '#93c5fd' : '#1a237e',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    borderTop: `1px solid ${dm ? '#334155' : '#e5e7eb'}`,
    flexShrink: 0,
  },
  profileInner: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: dm ? '#64748b' : '#9ca3af',
    padding: '6px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#1a237e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  profileName: {
    fontSize: '14px',
    fontWeight: '600',
    color: dm ? '#f1f5f9' : '#111827',
  },
  profileRole: {
    fontSize: '12px',
    color: dm ? '#64748b' : '#9ca3af',
  },
  main: {
    flex: 1,
    height: '100vh',
    padding: '24px 32px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    overflowY: 'auto',
    background: dm ? '#0f172a' : '#f1f5f9',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerLeft: {},
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  pageTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: dm ? '#f1f5f9' : '#111827',
    margin: '0 0 4px 0',
  },
  pageSubtitle: {
    fontSize: '14px',
    color: dm ? '#94a3b8' : '#6b7280',
    margin: 0,
  },
  subtitleLink: {
    color: dm ? '#93c5fd' : '#1a237e',
    fontWeight: '500',
  },
  lastUpdated: {
    fontSize: '13px',
    color: dm ? '#64748b' : '#9ca3af',
  },
  themeToggle: {
    background: dm ? '#1e293b' : '#f1f5f9',
    border: `1px solid ${dm ? '#334155' : '#e5e7eb'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    color: dm ? '#f59e0b' : '#6b7280',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  card: {
    background: dm ? '#1e293b' : 'white',
    borderRadius: '16px',
    padding: '18px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: dm ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.05)',
    border: `1px solid ${dm ? '#334155' : '#f3f4f6'}`,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: dm ? '#64748b' : '#9ca3af',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  iconBadge: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: '34px',
    fontWeight: '800',
    color: dm ? '#f1f5f9' : '#111827',
    lineHeight: '1',
  },
  cardMeta: {
    fontSize: '13px',
  },
  splitValue: {
    display: 'flex',
    alignItems: 'baseline',
    lineHeight: '1',
  },
  chartCard: {
    background: dm ? '#1e293b' : 'white',
    borderRadius: '16px',
    padding: '20px 24px 16px',
    boxShadow: dm ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.05)',
    border: `1px solid ${dm ? '#334155' : '#f3f4f6'}`,
  },
  chartHeader: {
    marginBottom: '16px',
  },
  chartTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: dm ? '#64748b' : '#9ca3af',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  chartArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  chartInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: '8px',
  },
  yAxis: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '32px',
    minWidth: '32px',
    height: '200px',
    pointerEvents: 'none',
  },
  yLabel: {
    fontSize: '12px',
    color: dm ? '#64748b' : '#9ca3af',
    textAlign: 'right',
  },
  chartPlaceholder: {
    flex: 1,
    height: '200px',
  },
  xAxis: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    paddingLeft: '40px',
  },
  xLabel: {
    fontSize: '12px',
    color: dm ? '#64748b' : '#9ca3af',
    flex: 1,
    textAlign: 'center',
  },
  heatmapArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  heatmapRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  heatmapRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  deptLabel: {
    width: '72px',
    minWidth: '72px',
    fontSize: '12px',
    color: dm ? '#94a3b8' : '#6b7280',
    textAlign: 'right',
  },
  barTrack: {
    flex: 1,
    height: '28px',
    background: dm ? '#334155' : '#f3f4f6',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  barEmpty: {
    height: '100%',
    width: '0%',
    background: dm ? '#475569' : '#e5e7eb',
    borderRadius: '4px',
  },
  heatmapXAxis: {
    paddingLeft: '84px',
    marginTop: '8px',
  },
  heatmapXLabels: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  heatmapXLabel: {
    fontSize: '12px',
    color: dm ? '#64748b' : '#9ca3af',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '28px',
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: `1px solid ${dm ? '#334155' : '#f3f4f6'}`,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  legendLabel: {
    fontSize: '13px',
    color: dm ? '#94a3b8' : '#6b7280',
  },
  vulnBody: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  donutWrap: { flexShrink: 0 },
  vulnRows: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  vulnRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  vulnRowHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vulnRowLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  vulnDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  vulnLabel: {
    fontSize: '13px',
    color: dm ? '#94a3b8' : '#374151',
    fontWeight: '500',
  },
  vulnCount: {
    fontSize: '13px',
    fontWeight: '700',
    color: dm ? '#f1f5f9' : '#111827',
  },
  vulnTrack: {
    height: '8px',
    background: dm ? '#334155' : '#f3f4f6',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  vulnBar: {
    height: '100%',
    borderRadius: '999px',
    transition: 'width 0.4s ease',
  },
  vulnFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '14px',
    paddingTop: '12px',
    borderTop: `1px solid ${dm ? '#334155' : '#f3f4f6'}`,
  },
  vulnTotalLabel: {
    fontSize: '13px',
    color: dm ? '#94a3b8' : '#6b7280',
  },
  vulnTotalValue: {
    fontSize: '20px',
    fontWeight: '800',
    color: dm ? '#f1f5f9' : '#111827',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '500',
    color: dm ? '#94a3b8' : '#6b7280',
    padding: '10px 16px',
    borderBottom: `1px solid ${dm ? '#334155' : '#e5e7eb'}`,
  },
  td: {
    padding: '16px 16px',
    fontSize: '14px',
    color: dm ? '#94a3b8' : '#6b7280',
    borderBottom: `1px solid ${dm ? '#334155' : '#f3f4f6'}`,
  },
  mfaRequired: {
    display: 'inline-block',
    padding: '3px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '500',
    border: '1px solid #6ee7b7',
    color: '#059669',
    background: 'transparent',
  },
  mfaOptional: {
    display: 'inline-block',
    padding: '3px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '500',
    border: '1px solid #fcd34d',
    color: '#d97706',
    background: 'transparent',
  },
  manageLink: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0891b2',
    cursor: 'pointer',
  },
  incidentList: {
    display: 'flex',
    flexDirection: 'column',
  },
  incidentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 0',
    gap: '16px',
  },
  incidentLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    minWidth: 0,
  },
  incidentDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  incidentTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: dm ? '#f1f5f9' : '#111827',
    marginBottom: '4px',
  },
  incidentMeta: {
    fontSize: '12px',
    color: dm ? '#64748b' : '#9ca3af',
  },
  incidentRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  },
  incidentTime: {
    fontSize: '14px',
    fontWeight: '600',
    color: dm ? '#94a3b8' : '#374151',
    marginRight: '4px',
  },
  slaMet: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#059669',
    marginRight: '4px',
  },
  badgeOpen:       { display:'inline-block', padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'500', border:'1px solid #fca5a5', color:'#ef4444', background:'transparent' },
  badgeInProgress: { display:'inline-block', padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'500', border:'1px solid #fcd34d', color:'#d97706', background:'transparent' },
  badgeResolved:   { display:'inline-block', padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'500', border:'1px solid #6ee7b7', color:'#059669', background:'transparent' },
  badgeCritical:   { display:'inline-block', padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'500', border:'1px solid #fca5a5', color:'#ef4444', background:'transparent' },
  badgeHigh:       { display:'inline-block', padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'500', border:'1px solid #fcd34d', color:'#d97706', background:'transparent' },
  badgeMedium:     { display:'inline-block', padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'500', border:'1px solid #fcd34d', color:'#d97706', background:'transparent' },
  badgeNeutral:    { display:'inline-block', padding:'3px 14px', borderRadius:'999px', fontSize:'13px', fontWeight:'500', border:`1px solid ${dm ? '#475569' : '#e5e7eb'}`, color: dm ? '#94a3b8' : '#6b7280', background:'transparent' },
  storageList: { display:'flex', flexDirection:'column', gap:'18px' },
  storageRow:  { display:'flex', flexDirection:'column', gap:'8px' },
  storageRowHeader: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  storageLabel: { fontSize:'14px', fontWeight:'600', color: dm ? '#f1f5f9' : '#111827' },
  storageMeta:  { fontSize:'13px', color: dm ? '#64748b' : '#9ca3af' },
  storageTrack: { height:'10px', background: dm ? '#334155' : '#f3f4f6', borderRadius:'999px', overflow:'hidden' },
  storageBar:   { height:'100%', borderRadius:'999px', transition:'width 0.4s ease' },
  retentionList: { display:'flex', flexDirection:'column' },
  retentionRow:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0' },
  retentionLabel: { fontSize:'14px', fontWeight:'600', color: dm ? '#f1f5f9' : '#111827', marginBottom:'4px' },
  retentionSub:   { fontSize:'13px', color: dm ? '#64748b' : '#9ca3af' },
  copiesBadge: { border:'2px solid #06b6d4', borderRadius:'12px', padding:'10px 20px', textAlign:'center', minWidth:'100px' },
  copiesNum:   { fontSize:'18px', fontWeight:'800', color:'#0891b2' },
  copiesText:  { fontSize:'13px', color:'#0891b2', fontWeight:'500' },
})
