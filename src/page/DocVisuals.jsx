// ─── DOC VISUALS ────────────────────────────────────────────────────────────
// A library of small inline SVG diagrams + HTML "mockup" frames used to give
// every documentation topic a visual anchor. Built from the same CSS tokens
// as the rest of the app (--accent, --surface, --border, etc.) so they sit
// naturally inside the dark theme rather than looking bolted on.

// Generic browser-style frame used for every screen "mockup" so they all
// read as the same family of illustration.
function Frame({ title, children, height = 200 }) {
  return (
    <div className="viz-frame">
      <div className="viz-frame-bar">
        <span className="viz-dot" style={{ background: "#ef4444" }} />
        <span className="viz-dot" style={{ background: "#f5a623" }} />
        <span className="viz-dot" style={{ background: "#10b981" }} />
        {title && <span className="viz-frame-title">{title}</span>}
      </div>
      <div className="viz-frame-body" style={{ minHeight: height }}>
        {children}
      </div>
    </div>
  );
}

function Pill({ children, color = "purple" }) {
  return <span className={`viz-pill viz-pill-${color}`}>{children}</span>;
}

// ── Architecture: browser <-> Firebase services ──────────────────────────
export function VizArchitecture() {
  return (
    <svg viewBox="0 0 640 220" className="viz-svg" role="img" aria-label="Diagram showing the React app connecting to Firebase Auth, Firestore, and Storage">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
        </marker>
      </defs>
      {/* React app box */}
      <g>
        <rect x="20" y="80" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="95" y="106" textAnchor="middle" fill="var(--text)" fontSize="14" fontWeight="600">React App</text>
        <text x="95" y="124" textAnchor="middle" fill="var(--muted)" fontSize="11">(Vite + Router)</text>
      </g>
      {/* connecting lines */}
      <line x1="170" y1="95" x2="280" y2="40" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="170" y1="112" x2="280" y2="112" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="170" y1="129" x2="280" y2="184" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      {/* Firebase services */}
      <g>
        <rect x="280" y="14" width="170" height="52" rx="12" fill="var(--surface)" stroke="#f5a623" strokeWidth="1.5" />
        <text x="365" y="36" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">🔑 Firebase Auth</text>
        <text x="365" y="52" textAnchor="middle" fill="var(--muted)" fontSize="10.5">Login &amp; role checks</text>
      </g>
      <g>
        <rect x="280" y="86" width="170" height="52" rx="12" fill="var(--surface)" stroke="var(--accent2)" strokeWidth="1.5" />
        <text x="365" y="108" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">🗄️ Firestore</text>
        <text x="365" y="124" textAnchor="middle" fill="var(--muted)" fontSize="10.5">Real-time database</text>
      </g>
      <g>
        <rect x="280" y="158" width="170" height="52" rx="12" fill="var(--surface)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="365" y="180" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">🖼️ Storage</text>
        <text x="365" y="196" textAnchor="middle" fill="var(--muted)" fontSize="10.5">Maintenance photos</text>
      </g>
      {/* sync badge */}
      <g>
        <rect x="478" y="86" width="142" height="52" rx="12" fill="rgba(124,92,252,0.08)" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="549" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="600">⚡ Live sync</text>
        <text x="549" y="124" textAnchor="middle" fill="var(--muted)" fontSize="10">to every screen</text>
      </g>
      <line x1="450" y1="112" x2="478" y2="112" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow)" />
    </svg>
  );
}

// ── User roles: one login splits into two portals ────────────────────────
export function VizRolesSplit() {
  return (
    <svg viewBox="0 0 640 200" className="viz-svg" role="img" aria-label="Diagram showing login splitting into Admin portal and Tenant portal">
      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <rect x="250" y="74" width="140" height="52" rx="12" fill="var(--surface)" stroke="var(--border2)" strokeWidth="1.5" />
      <text x="320" y="96" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">🔐 Login</text>
      <text x="320" y="112" textAnchor="middle" fill="var(--muted)" fontSize="10.5">email + password</text>

      <line x1="250" y1="90" x2="140" y2="40" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow2)" />
      <line x1="250" y1="110" x2="140" y2="160" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow2)" />

      <g>
        <rect x="20" y="14" width="180" height="56" rx="12" fill="rgba(124,92,252,0.1)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="110" y="36" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">🏢 role: "admin"</text>
        <text x="110" y="54" textAnchor="middle" fill="#a78bfa" fontSize="10.5">→ Admin portal at /</text>
      </g>
      <g>
        <rect x="20" y="134" width="180" height="56" rx="12" fill="rgba(16,185,129,0.1)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="110" y="156" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">🏠 role: "tenant"</text>
        <text x="110" y="174" textAnchor="middle" fill="#6ee7b7" fontSize="10.5">→ Tenant portal at /tenant</text>
      </g>

      <line x1="390" y1="100" x2="470" y2="100" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow2)" />
      <rect x="470" y="60" width="150" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="545" y="84" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">Stored in Firestore</text>
      <text x="545" y="103" textAnchor="middle" fill="var(--muted)" fontSize="10">users/&#123;uid&#125;</text>
      <text x="545" y="119" textAnchor="middle" fill="var(--muted)" fontSize="10">.role field</text>
    </svg>
  );
}

// ── Dashboard mockup ───────────────────────────────────────────────────
export function VizDashboard() {
  const stats = [
    { icon: "💰", label: "Total Revenue", val: "₱148,200", color: "var(--accent)" },
    { icon: "✅", label: "Paid", val: "32", color: "var(--green)" },
    { icon: "⏳", label: "Pending", val: "4", color: "var(--amber)" },
    { icon: "🏠", label: "Properties", val: "18", color: "var(--accent2)" },
  ];
  return (
    <Frame title="Dashboard" height={230}>
      <div className="viz-stat-row">
        {stats.map((s) => (
          <div key={s.label} className="viz-stat-card">
            <div className="viz-stat-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="viz-stat-val">{s.val}</div>
            <div className="viz-stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="viz-chart-row">
        <div className="viz-chart-card">
          <div className="viz-chart-title">Revenue — this month vs last</div>
          <svg viewBox="0 0 260 70" className="viz-mini-svg">
            <polyline points="0,55 40,48 80,50 120,30 160,34 200,18 240,22" fill="none" stroke="var(--green)" strokeWidth="2.5" />
            <polyline points="0,60 40,58 80,56 120,52 160,50 200,48 240,46" fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>
        <div className="viz-chart-card viz-donut-card">
          <div className="viz-chart-title">Occupancy</div>
          <svg viewBox="0 0 80 80" className="viz-mini-svg">
            <circle cx="40" cy="40" r="28" fill="none" stroke="var(--border)" strokeWidth="12" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="var(--green)" strokeWidth="12" strokeDasharray="123 176" strokeLinecap="round" transform="rotate(-90 40 40)" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="var(--accent2)" strokeWidth="12" strokeDasharray="35 176" strokeDashoffset="-123" strokeLinecap="round" transform="rotate(-90 40 40)" />
          </svg>
        </div>
      </div>
    </Frame>
  );
}

// ── Properties grid mockup ────────────────────────────────────────────
export function VizProperties() {
  const props = [
    { name: "Unit 101A", status: "occupied", color: "green" },
    { name: "Unit 102B", status: "available", color: "blue" },
    { name: "Unit 103C", status: "maintenance", color: "amber" },
  ];
  return (
    <Frame title="Properties">
      <div className="viz-prop-grid">
        {props.map((p) => (
          <div key={p.name} className="viz-prop-card">
            <div className="viz-prop-thumb">🏠</div>
            <div className="viz-prop-name">{p.name}</div>
            <div className="viz-prop-rent">₱8,500 / mo</div>
            <Pill color={p.color}>{p.status}</Pill>
          </div>
        ))}
        <div className="viz-prop-card viz-prop-add">
          <div className="viz-prop-add-icon">+</div>
          <div className="viz-prop-add-lbl">Add Property</div>
        </div>
      </div>
    </Frame>
  );
}

// ── Tenants admin mockup ──────────────────────────────────────────────
export function VizTenantsAdmin() {
  const tenants = [
    { name: "Maria Santos", unit: "Unit 101A", color: "green" },
    { name: "Jay Reyes", unit: "Unit 104D", color: "green" },
  ];
  return (
    <Frame title="Tenants" height={170}>
      <div className="viz-list">
        {tenants.map((t) => (
          <div key={t.name} className="viz-list-row">
            <div className="viz-avatar">{t.name.split(" ").map(w => w[0]).join("")}</div>
            <div className="viz-list-main">
              <div className="viz-list-title">{t.name}</div>
              <div className="viz-list-sub">{t.unit}</div>
            </div>
            <Pill color={t.color}>occupied</Pill>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ── Payments status flow ──────────────────────────────────────────────
export function VizPaymentFlow() {
  return (
    <svg viewBox="0 0 640 130" className="viz-svg" role="img" aria-label="Diagram of payment status flow from pending to confirmed">
      <defs>
        <marker id="arrow3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <g>
        <rect x="10" y="38" width="160" height="54" rx="12" fill="rgba(245,166,35,0.1)" stroke="var(--amber)" strokeWidth="1.5" />
        <text x="90" y="60" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="600">⏳ Pending</text>
        <text x="90" y="78" textAnchor="middle" fill="var(--muted)" fontSize="10.5">Tenant submits online</text>
      </g>
      <line x1="170" y1="65" x2="230" y2="65" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow3)" />
      <g>
        <rect x="230" y="38" width="180" height="54" rx="12" fill="var(--surface)" stroke="var(--border2)" strokeWidth="1.5" />
        <text x="320" y="60" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">🔍 Admin reviews</text>
        <text x="320" y="78" textAnchor="middle" fill="var(--muted)" fontSize="10.5">checks screenshot + ref #</text>
      </g>
      <line x1="410" y1="65" x2="470" y2="65" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow3)" />
      <g>
        <rect x="470" y="38" width="160" height="54" rx="12" fill="rgba(16,185,129,0.1)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="550" y="60" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="600">✅ Confirmed</text>
        <text x="550" y="78" textAnchor="middle" fill="var(--muted)" fontSize="10.5">Tenant notified</text>
      </g>
    </svg>
  );
}

// ── Maintenance admin mockup ──────────────────────────────────────────
export function VizMaintenanceAdmin() {
  return (
    <Frame title="Maintenance Request" height={160}>
      <div className="viz-card-detail">
        <div className="viz-card-detail-head">
          <div>
            <div className="viz-list-title">Leaking faucet — kitchen</div>
            <div className="viz-list-sub">Maria Santos · Plumbing</div>
          </div>
          <Pill color="amber">in progress</Pill>
        </div>
        <div className="viz-card-detail-note">📝 "Technician scheduled for Friday 2pm"</div>
        <div className="viz-card-detail-thumb">🖼️ photo attached</div>
      </div>
    </Frame>
  );
}

// ── Announcements mockup ────────────────────────────────────────────────
export function VizAnnouncements() {
  return (
    <svg viewBox="0 0 640 130" className="viz-svg" role="img" aria-label="Diagram showing an admin announcement being broadcast to all tenant dashboards">
      <defs>
        <marker id="arrow4" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <rect x="10" y="38" width="170" height="54" rx="12" fill="rgba(124,92,252,0.1)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="95" y="60" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="600">📢 Admin posts</text>
      <text x="95" y="78" textAnchor="middle" fill="var(--muted)" fontSize="10.5">title + message + type</text>

      <line x1="180" y1="50" x2="260" y2="20" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow4)" />
      <line x1="180" y1="65" x2="260" y2="65" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow4)" />
      <line x1="180" y1="80" x2="260" y2="110" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow4)" />

      {[14, 50, 86].map((y, i) => (
        <g key={y}>
          <rect x="270" y={y} width="180" height="38" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="290" y={y + 24} fill="var(--text)" fontSize="11.5">🏠 Tenant {i + 1} dashboard</text>
        </g>
      ))}
      <rect x="478" y="38" width="150" height="54" rx="12" fill="rgba(124,92,252,0.06)" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="553" y="60" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="600">🔔 + notification</text>
      <text x="553" y="78" textAnchor="middle" fill="var(--muted)" fontSize="10">for admin bell</text>
    </svg>
  );
}

// ── Messages admin two-panel mockup ───────────────────────────────────
export function VizMessagesAdmin() {
  return (
    <Frame title="Messages" height={190}>
      <div className="viz-msg-layout">
        <div className="viz-msg-sidebar">
          <div className="viz-msg-convo active">
            <div className="viz-avatar small">MS</div>
            <div className="viz-list-main">
              <div className="viz-list-title small">Maria Santos</div>
              <div className="viz-list-sub small">Thanks, I'll send it...</div>
            </div>
            <span className="viz-unread-dot">2</span>
          </div>
          <div className="viz-msg-convo">
            <div className="viz-avatar small">JR</div>
            <div className="viz-list-main">
              <div className="viz-list-title small">Jay Reyes</div>
              <div className="viz-list-sub small">Ok noted po</div>
            </div>
          </div>
        </div>
        <div className="viz-msg-panel">
          <div className="viz-bubble theirs">When will the technician arrive?</div>
          <div className="viz-bubble mine">Friday at 2pm 👍</div>
        </div>
      </div>
    </Frame>
  );
}

// ── Settings payment accounts mockup ──────────────────────────────────
export function VizSettings() {
  const methods = [
    { name: "GCash", filled: true },
    { name: "Maya", filled: true },
    { name: "BDO", filled: false },
  ];
  return (
    <Frame title="Settings → Payment Accounts" height={170}>
      <div className="viz-settings-list">
        {methods.map((m) => (
          <div key={m.name} className="viz-settings-row">
            <span className="viz-list-title small">{m.name}</span>
            <span className={`viz-toggle ${m.filled ? "on" : ""}`}><span className="viz-toggle-knob" /></span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ── Tenant dashboard mockup ───────────────────────────────────────────
export function VizTenantDashboard() {
  return (
    <Frame title="Tenant Dashboard" height={210}>
      <div className="viz-tenant-banner">
        <div>
          <div className="viz-list-title">Unit 101A</div>
          <div className="viz-list-sub">₱8,500 / month · <Pill color="green">occupied</Pill></div>
        </div>
        <button className="viz-fake-btn">Pay Now</button>
      </div>
      <div className="viz-tenant-grid">
        <div className="viz-mini-card">📋 5 recent payments</div>
        <div className="viz-mini-card">📢 3 announcements</div>
        <div className="viz-mini-card">🔧 1 open request</div>
      </div>
    </Frame>
  );
}

// ── Pay rent step flow ──────────────────────────────────────────────────
export function VizPayRentFlow() {
  const steps = ["Select method", "View details", "Pay externally", "Enter amount + ref", "Upload screenshot", "Submit"];
  return (
    <svg viewBox="0 0 640 110" className="viz-svg" role="img" aria-label="Six step flow diagram for paying rent online">
      <defs>
        <marker id="arrow5" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = 8 + i * 106;
        return (
          <g key={s}>
            <rect x={x} y="30" width="92" height="50" rx="10" fill={i === steps.length - 1 ? "rgba(16,185,129,0.12)" : "var(--surface)"} stroke={i === steps.length - 1 ? "var(--green)" : "var(--border2)"} strokeWidth="1.5" />
            <text x={x + 46} y="50" textAnchor="middle" fill="var(--muted)" fontSize="9.5">{i + 1}</text>
            <foreignObject x={x + 4} y="52" width="84" height="30">
              <div style={{ fontSize: 9.5, color: "var(--text)", textAlign: "center", lineHeight: 1.2, fontFamily: "'DM Sans', sans-serif" }}>{s}</div>
            </foreignObject>
            {i < steps.length - 1 && (
              <line x1={x + 92} y1="55" x2={x + 106} y2="55" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow5)" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Tenant maintenance form mockup ────────────────────────────────────
export function VizTenantMaintenance() {
  return (
    <Frame title="New Maintenance Request" height={190}>
      <div className="viz-form">
        <div className="viz-form-row"><span className="viz-form-label">Title</span><div className="viz-form-input">Leaking faucet</div></div>
        <div className="viz-form-row-2">
          <div><span className="viz-form-label">Category</span><div className="viz-form-input">Plumbing</div></div>
          <div><span className="viz-form-label">Priority</span><div className="viz-form-input">High</div></div>
        </div>
        <div className="viz-form-row"><span className="viz-form-label">Photo</span><div className="viz-form-upload">📷 Tap to attach</div></div>
      </div>
    </Frame>
  );
}

// ── Tenant messages mockup (reuse bubble style) ───────────────────────
export function VizTenantMessages() {
  return (
    <Frame title="Messages" height={150}>
      <div className="viz-msg-panel solo">
        <div className="viz-bubble theirs">Hi! Just a reminder rent is due Friday.</div>
        <div className="viz-bubble mine">Got it, paying today 👍</div>
      </div>
    </Frame>
  );
}

// ── Tenant profile mockup ──────────────────────────────────────────────
export function VizTenantProfile() {
  return (
    <Frame title="My Profile" height={190}>
      <div className="viz-form">
        <div className="viz-form-row-2">
          <div><span className="viz-form-label">Phone</span><div className="viz-form-input">09xx xxx xxxx</div></div>
          <div><span className="viz-form-label">Emergency Contact</span><div className="viz-form-input">Juan Dela Cruz</div></div>
        </div>
        <div className="viz-form-row"><span className="viz-form-label">Change Password</span><div className="viz-form-input">••••••••</div></div>
      </div>
    </Frame>
  );
}

// ── Onboarding hero diagrams (one per track) ──────────────────────────
export function VizOnboardLandlord() {
  const steps = ["Log in as admin", "Set up payment accounts", "Add properties", "Invite tenants"];
  return (
    <svg viewBox="0 0 640 100" className="viz-svg" role="img" aria-label="Four step overview of landlord onboarding">
      <defs>
        <marker id="arrow6" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = 10 + i * 160;
        return (
          <g key={s}>
            <circle cx={x + 18} cy="40" r="18" fill="rgba(124,92,252,0.15)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x={x + 18} y="45" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="700">{i + 1}</text>
            <foreignObject x={x - 30} y="64" width="120" height="30">
              <div style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>{s}</div>
            </foreignObject>
            {i < steps.length - 1 && <line x1={x + 36} y1="40" x2={x + 142} y2="40" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow6)" />}
          </g>
        );
      })}
    </svg>
  );
}

export function VizOnboardTenant() {
  const steps = ["Sign up", "Get linked to a unit", "Pay rent & file requests"];
  return (
    <svg viewBox="0 0 640 100" className="viz-svg" role="img" aria-label="Three step overview of tenant onboarding">
      <defs>
        <marker id="arrow7" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = 20 + i * 210;
        return (
          <g key={s}>
            <circle cx={x + 18} cy="40" r="18" fill="rgba(16,185,129,0.15)" stroke="var(--green)" strokeWidth="1.5" />
            <text x={x + 18} y="45" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="700">{i + 1}</text>
            <foreignObject x={x - 40} y="64" width="140" height="30">
              <div style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>{s}</div>
            </foreignObject>
            {i < steps.length - 1 && <line x1={x + 36} y1="40" x2={x + 192} y2="40" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow7)" />}
          </g>
        );
      })}
    </svg>
  );
}

export function VizOnboardDeveloper() {
  const steps = ["Clone & install", "Configure Firebase", "Create admin", "Set rules", "Deploy"];
  return (
    <svg viewBox="0 0 640 100" className="viz-svg" role="img" aria-label="Five step overview of developer setup">
      <defs>
        <marker id="arrow8" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = 8 + i * 128;
        return (
          <g key={s}>
            <circle cx={x + 16} cy="40" r="16" fill="rgba(96,165,250,0.15)" stroke="var(--accent2)" strokeWidth="1.5" />
            <text x={x + 16} y="45" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700">{i + 1}</text>
            <foreignObject x={x - 26} y="62" width="96" height="32">
              <div style={{ fontSize: 9.5, color: "var(--muted)", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>{s}</div>
            </foreignObject>
            {i < steps.length - 1 && <line x1={x + 32} y1="40" x2={x + 112} y2="40" stroke="var(--border2)" strokeWidth="1.5" markerEnd="url(#arrow8)" />}
          </g>
        );
      })}
    </svg>
  );
}