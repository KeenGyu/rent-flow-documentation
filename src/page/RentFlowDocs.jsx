import { useState, useEffect, useRef } from "react";
import {
  VizArchitecture, VizRolesSplit, VizDashboard, VizProperties, VizTenantsAdmin,
  VizPaymentFlow, VizMaintenanceAdmin, VizAnnouncements, VizMessagesAdmin, VizSettings,
  VizTenantDashboard, VizPayRentFlow, VizTenantMaintenance, VizTenantMessages, VizTenantProfile,
  VizOnboardLandlord, VizOnboardTenant, VizOnboardDeveloper,
} from "./DocVisuals";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #020817;
    --surface: #0f1629;
    --surface2: #17213a;
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.14);
    --text: #e8e9f0;
    --muted: #6b7a99;
    --accent: #7c5cfc;
    --accent2: #60a5fa;
    --green: #10b981;
    --amber: #f5a623;
    --red: #ef4444;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; line-height: 1.6; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(2,8,23,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 32px; height: 60px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; cursor: pointer; }
  .nav-logo .accent { color: var(--accent); }
  .nav-logo .dim { color: var(--muted); font-weight: 400; }
  .nav-links { display: flex; gap: 6px; }
  .nav-link {
    padding: 6px 14px; border-radius: 8px;
    color: var(--muted); font-size: 13px; cursor: pointer;
    transition: all 0.15s; background: none; border: none; font-family: 'DM Sans', sans-serif;
  }
  .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .nav-link.active { color: var(--accent); background: rgba(124,92,252,0.1); }

  /* HERO */
  .hero { padding: 80px 32px 64px; max-width: 960px; margin: 0 auto; text-align: center; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(124,92,252,0.12); border: 1px solid rgba(124,92,252,0.3);
    color: #a78bfa; font-size: 12px; font-weight: 600;
    padding: 5px 14px; border-radius: 20px; margin-bottom: 28px; letter-spacing: 0.5px;
  }
  .hero h1 { font-size: 52px; font-weight: 600; line-height: 1.15; letter-spacing: -1px; margin-bottom: 20px; color: var(--text); }
  .hero h1 em { font-style: normal; color: var(--accent); }
  .hero p { font-size: 17px; color: var(--muted); max-width: 580px; margin: 0 auto 40px; line-height: 1.7; }
  .hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  /* BUTTONS */
  .btn {
    padding: 12px 24px; border-radius: 10px; font-size: 14px;
    font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
    border: none; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #8b6dfd; transform: translateY(-1px); }
  .btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border2); }
  .btn-outline:hover { background: rgba(255,255,255,0.05); transform: translateY(-1px); }

  /* STATS BAR */
  .stats-bar {
    display: flex; justify-content: center; gap: 48px;
    padding: 32px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .stat-item { text-align: center; }
  .stat-num { font-size: 28px; font-weight: 600; color: var(--text); }
  .stat-lbl { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* SECTIONS */
  .section { padding: 64px 32px; max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 11px; font-weight: 600; color: var(--accent); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
  .section h2 { font-size: 32px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.5px; color: var(--text); }
  .section > p { color: var(--muted); font-size: 15px; margin-bottom: 36px; }
  .section-divider { border-top: 1px solid var(--border); padding-top: 64px; }

  /* CARDS GRID */
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px; cursor: pointer;
    color: var(--text); transition: all 0.2s;
  }
  .card:hover { border-color: var(--border2); transform: translateY(-2px); background: var(--surface2); }
  .card-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
  .card h3 { font-size: 15px; font-weight: 600; margin-bottom: 6px; color: var(--text); }
  .card p { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .card-arrow { color: var(--muted); font-size: 18px; float: right; margin-top: -22px; }

  /* FEATURE GRID */
  .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .feature-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 22px; display: flex; gap: 16px; }
  .feature-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
  .feature-card h4 { font-size: 14px; font-weight: 600; margin-bottom: 5px; color: var(--text); }
  .feature-card p { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ROLES GRID */
  .roles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .role-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 22px; text-align: center; }
  .role-icon { font-size: 32px; margin-bottom: 12px; }
  .role-card h3 { font-size: 15px; font-weight: 600; margin-bottom: 8px; color: var(--text); }
  .role-card p { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }
  .role-badge { display: inline-flex; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; }

  /* FOOTER */
  .footer { border-top: 1px solid var(--border); padding: 32px; text-align: center; color: var(--muted); font-size: 13px; }
  .footer a { color: var(--muted); text-decoration: none; cursor: pointer; }
  .footer a:hover { color: var(--text); }
  .footer-links { display: flex; gap: 12px; justify-content: center; margin: 8px 0; flex-wrap: wrap; }

  /* ─── DOCS PAGE ─── */
  .doc-layout { display: flex; max-width: 1200px; margin: 0 auto; }
  .doc-sidebar {
    width: 260px; flex-shrink: 0;
    position: sticky; top: 60px; height: calc(100vh - 60px);
    overflow-y: auto; padding: 28px 0 28px 24px;
    border-right: 1px solid var(--border);
  }
  .sidebar-section { margin-bottom: 28px; }
  .sidebar-label { font-size: 10px; font-weight: 600; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; padding: 0 8px; }
  .sidebar-link {
    display: flex; align-items: center; gap: 8px; padding: 7px 10px;
    border-radius: 8px; color: var(--muted); font-size: 13px;
    cursor: pointer; transition: all 0.15s; background: none; border: none;
    font-family: 'DM Sans', sans-serif; width: 100%; text-align: left;
  }
  .sidebar-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }
  .sidebar-link.active { color: var(--accent); background: rgba(124,92,252,0.1); }
  .sidebar-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  .doc-content { flex: 1; min-width: 0; padding: 40px 48px 80px; max-width: 800px; }
  .doc-section { margin-bottom: 56px; scroll-margin-top: 80px; }
  .doc-section h2 { font-size: 26px; font-weight: 600; margin-bottom: 6px; letter-spacing: -0.4px; color: var(--text); }
  .section-sub { color: var(--muted); font-size: 14px; margin-bottom: 28px; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
  .doc-section h3 { font-size: 17px; font-weight: 600; margin: 28px 0 12px; color: var(--text); }
  .doc-section h4 { font-size: 14px; font-weight: 600; margin: 20px 0 8px; color: var(--accent2); }
  .doc-section p { font-size: 14px; color: #b0b8d0; line-height: 1.75; margin-bottom: 12px; }
  .doc-section ul, .doc-section ol { padding-left: 20px; margin-bottom: 12px; }
  .doc-section li { font-size: 14px; color: #b0b8d0; line-height: 1.75; margin-bottom: 4px; }
  .doc-section strong { color: var(--text); font-weight: 600; }

  .callout { border-radius: 10px; padding: 14px 18px; margin: 16px 0; font-size: 13px; line-height: 1.6; border-left: 3px solid; }
  .callout-info { background: rgba(96,165,250,0.08); border-color: var(--accent2); color: #93c5fd; }
  .callout-warn { background: rgba(245,166,35,0.08); border-color: var(--amber); color: #fcd34d; }
  .callout-tip  { background: rgba(16,185,129,0.08); border-color: var(--green); color: #6ee7b7; }
  .callout-danger { background: rgba(239,68,68,0.08); border-color: var(--red); color: #fca5a5; }
  .callout strong { color: inherit; }

  code { background: rgba(255,255,255,0.06); border: 1px solid var(--border); padding: 2px 7px; border-radius: 5px; font-family: 'DM Mono', monospace; font-size: 12px; color: #c4b5fd; }
  pre { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 18px; overflow-x: auto; margin: 16px 0; }
  pre code { background: none; border: none; padding: 0; color: #94a3b8; font-size: 13px; }

  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
  th { text-align: left; padding: 10px 14px; background: var(--surface); color: var(--muted); font-weight: 600; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; border-bottom: 1px solid var(--border); }
  td { padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #b0b8d0; }
  tr:last-child td { border-bottom: none; }

  .badge { display: inline-flex; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .badge-green  { background: rgba(16,185,129,0.12); color: #6ee7b7; }
  .badge-amber  { background: rgba(245,166,35,0.12); color: #fcd34d; }
  .badge-blue   { background: rgba(96,165,250,0.12); color: #93c5fd; }
  .badge-purple { background: rgba(124,92,252,0.12); color: #c4b5fd; }
  .badge-red    { background: rgba(239,68,68,0.12);  color: #fca5a5; }

  .feature-list { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
  .feature-row { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; display: flex; align-items: flex-start; gap: 14px; }
  .feature-row-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .feature-row h5 { font-size: 13px; font-weight: 600; margin-bottom: 3px; color: var(--text); }
  .feature-row p { font-size: 12px; color: var(--muted); margin: 0; }

  .steps { counter-reset: step; display: flex; flex-direction: column; gap: 12px; margin: 16px 0; }
  .step { display: flex; gap: 16px; align-items: flex-start; }
  .step-num { width: 28px; height: 28px; border-radius: 50%; background: rgba(124,92,252,0.2); border: 1px solid rgba(124,92,252,0.4); color: #c4b5fd; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .step-content h5 { font-size: 14px; font-weight: 600; margin-bottom: 4px; color: var(--text); }
  .step-content p { font-size: 13px; color: var(--muted); margin: 0; }

  /* ─── VISUAL GUIDES (diagrams + mockups) ─── */
  .viz-svg { width: 100%; height: auto; display: block; margin: 18px 0; }
  .viz-svg text { font-family: 'DM Sans', sans-serif; }

  .viz-frame { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin: 18px 0; background: var(--surface); }
  .viz-frame-bar { display: flex; align-items: center; gap: 6px; padding: 9px 12px; border-bottom: 1px solid var(--border); background: rgba(255,255,255,0.02); }
  .viz-dot { width: 9px; height: 9px; border-radius: 50%; opacity: 0.7; }
  .viz-frame-title { margin-left: 8px; font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; }
  .viz-frame-body { padding: 18px; }

  .viz-pill { display: inline-flex; padding: 2px 9px; border-radius: 20px; font-size: 10.5px; font-weight: 600; line-height: 1.6; }
  .viz-pill-green { background: rgba(16,185,129,0.15); color: #6ee7b7; }
  .viz-pill-blue { background: rgba(96,165,250,0.15); color: #93c5fd; }
  .viz-pill-amber { background: rgba(245,166,35,0.15); color: #fcd34d; }
  .viz-pill-purple { background: rgba(124,92,252,0.15); color: #c4b5fd; }
  .viz-pill-red { background: rgba(239,68,68,0.15); color: #fca5a5; }

  .viz-stat-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
  .viz-stat-card { flex: 1; min-width: 100px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 12px; text-align: center; }
  .viz-stat-icon { font-size: 16px; margin-bottom: 4px; }
  .viz-stat-val { font-size: 16px; font-weight: 600; color: var(--text); }
  .viz-stat-lbl { font-size: 10px; color: var(--muted); margin-top: 2px; }

  .viz-chart-row { display: flex; gap: 10px; }
  .viz-chart-card { flex: 1; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
  .viz-donut-card { flex: 0 0 110px; display: flex; flex-direction: column; align-items: center; }
  .viz-chart-title { font-size: 10.5px; color: var(--muted); margin-bottom: 8px; }
  .viz-mini-svg { width: 100%; height: 64px; }
  .viz-donut-card .viz-mini-svg { width: 64px; height: 64px; }

  .viz-prop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
  .viz-prop-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 10px; text-align: center; }
  .viz-prop-thumb { font-size: 22px; margin-bottom: 6px; }
  .viz-prop-name { font-size: 12px; font-weight: 600; color: var(--text); }
  .viz-prop-rent { font-size: 10.5px; color: var(--muted); margin: 2px 0 8px; }
  .viz-prop-add { display: flex; flex-direction: column; align-items: center; justify-content: center; border-style: dashed; color: var(--muted); }
  .viz-prop-add-icon { font-size: 22px; line-height: 1; }
  .viz-prop-add-lbl { font-size: 11px; margin-top: 6px; }

  .viz-list { display: flex; flex-direction: column; gap: 8px; }
  .viz-list-row { display: flex; align-items: center; gap: 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; }
  .viz-list-main { flex: 1; }
  .viz-list-title { font-size: 13px; font-weight: 600; color: var(--text); }
  .viz-list-title.small { font-size: 12px; }
  .viz-list-sub { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .viz-list-sub.small { font-size: 10.5px; }
  .viz-avatar { width: 32px; height: 32px; border-radius: 50%; background: rgba(124,92,252,0.18); color: #c4b5fd; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
  .viz-avatar.small { width: 26px; height: 26px; font-size: 10px; }

  .viz-card-detail { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; }
  .viz-card-detail-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .viz-card-detail-note { font-size: 12px; color: var(--muted); margin-top: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 8px 10px; }
  .viz-card-detail-thumb { font-size: 11.5px; color: var(--muted); margin-top: 8px; }

  .viz-msg-layout { display: flex; gap: 10px; height: 100%; }
  .viz-msg-sidebar { width: 150px; flex-shrink: 0; display: flex; flex-direction: column; gap: 6px; }
  .viz-msg-convo { display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; background: var(--surface2); position: relative; }
  .viz-msg-convo.active { border: 1px solid var(--accent); background: rgba(124,92,252,0.08); }
  .viz-unread-dot { position: absolute; top: 6px; right: 6px; background: var(--accent); color: #fff; font-size: 9px; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .viz-msg-panel { flex: 1; display: flex; flex-direction: column; gap: 8px; justify-content: flex-end; }
  .viz-msg-panel.solo { justify-content: center; }
  .viz-bubble { font-size: 12px; padding: 8px 12px; border-radius: 12px; max-width: 80%; line-height: 1.4; }
  .viz-bubble.theirs { background: var(--surface2); border: 1px solid var(--border); align-self: flex-start; color: var(--text); }
  .viz-bubble.mine { background: rgba(124,92,252,0.18); align-self: flex-end; color: #e9e3ff; }

  .viz-settings-list { display: flex; flex-direction: column; gap: 8px; }
  .viz-settings-row { display: flex; justify-content: space-between; align-items: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; }
  .viz-toggle { width: 34px; height: 18px; border-radius: 20px; background: var(--border2); display: inline-flex; align-items: center; padding: 2px; }
  .viz-toggle.on { background: var(--accent); justify-content: flex-end; }
  .viz-toggle-knob { width: 14px; height: 14px; border-radius: 50%; background: #fff; }

  .viz-tenant-banner { display: flex; justify-content: space-between; align-items: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; margin-bottom: 12px; }
  .viz-tenant-grid { display: flex; gap: 8px; flex-wrap: wrap; }
  .viz-mini-card { flex: 1; min-width: 110px; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 10px; font-size: 11px; color: var(--muted); text-align: center; }
  .viz-fake-btn { background: var(--accent); color: #fff; border: none; border-radius: 8px; padding: 7px 14px; font-size: 11.5px; font-weight: 600; font-family: 'DM Sans', sans-serif; }

  .viz-form { display: flex; flex-direction: column; gap: 12px; }
  .viz-form-row-2 { display: flex; gap: 12px; }
  .viz-form-row-2 > div { flex: 1; }
  .viz-form-label { font-size: 10.5px; color: var(--muted); display: block; margin-bottom: 5px; }
  .viz-form-input { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 9px 12px; font-size: 12.5px; color: var(--text); }
  .viz-form-upload { background: var(--surface2); border: 1px dashed var(--border2); border-radius: 8px; padding: 9px 12px; font-size: 12px; color: var(--muted); text-align: center; }

  @media (max-width: 600px) {
    .viz-chart-row { flex-direction: column; }
    .viz-donut-card { flex: none; }
    .viz-msg-layout { flex-direction: column; }
    .viz-msg-sidebar { width: 100%; flex-direction: row; overflow-x: auto; }
  }

  /* ─── ONBOARDING PAGE ─── */
  .page-hero { background: linear-gradient(180deg, rgba(124,92,252,0.08) 0%, transparent 100%); border-bottom: 1px solid var(--border); padding: 48px 32px 40px; text-align: center; }
  .page-hero h1 { font-size: 36px; font-weight: 600; margin-bottom: 10px; letter-spacing: -0.5px; color: var(--text); }
  .page-hero p { color: var(--muted); font-size: 15px; max-width: 560px; margin: 0 auto; }

  .track-selector { display: flex; justify-content: center; gap: 16px; padding: 32px; flex-wrap: wrap; }
  .track-btn {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 18px 24px; cursor: pointer;
    transition: all 0.2s; min-width: 200px; text-align: center; font-family: 'DM Sans', sans-serif;
  }
  .track-btn:hover { border-color: var(--border2); background: var(--surface2); }
  .track-btn.active { border-color: var(--accent); background: rgba(124,92,252,0.08); }
  .track-icon { font-size: 28px; display: block; margin-bottom: 8px; }
  .track-label { font-size: 14px; font-weight: 600; color: var(--text); display: block; margin-bottom: 4px; }
  .track-desc { font-size: 12px; color: var(--muted); display: block; }

  .content-wrap { max-width: 800px; margin: 0 auto; padding: 0 32px 80px; }

  .phase { margin-bottom: 40px; }
  .phase-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; }
  .phase-num { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0; }
  .phase-header h2 { font-size: 20px; font-weight: 600; margin-bottom: 4px; color: var(--text); }
  .phase-header p { font-size: 13px; color: var(--muted); margin: 0; }

  .step-list { display: flex; flex-direction: column; }
  .step-item { display: flex; gap: 0; }
  .step-left { display: flex; flex-direction: column; align-items: center; margin-right: 16px; }
  .step-circle { width: 32px; height: 32px; border-radius: 50%; border: 1px solid; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
  .step-line { width: 2px; flex: 1; min-height: 20px; margin: 4px 0; }
  .step-right { padding-bottom: 24px; flex: 1; }
  .step-right h4 { font-size: 15px; font-weight: 600; margin-bottom: 6px; padding-top: 4px; color: var(--text); }
  .step-right p { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .step-right pre { margin: 10px 0; }
  .step-right .callout { margin: 10px 0; }

  .checklist { display: flex; flex-direction: column; gap: 12px; }
  .check-item { display: flex; align-items: flex-start; gap: 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; font-size: 14px; color: #b0b8d0; }
  .check-box { font-size: 18px; flex-shrink: 0; }
  .check-item strong { color: var(--text); }

  .completion-card { background: linear-gradient(135deg, rgba(124,92,252,0.12), rgba(96,165,250,0.08)); border: 1px solid rgba(124,92,252,0.3); border-radius: 20px; padding: 40px; text-align: center; margin-top: 32px; }
  .completion-card h3 { font-size: 22px; font-weight: 600; margin-bottom: 10px; color: var(--text); }
  .completion-card p { color: var(--muted); font-size: 14px; margin-bottom: 24px; }
  .completion-card-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  /* ─── SUPPORT PAGE ─── */
  .support-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
  .support-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
  .support-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text); }
  .support-card p { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .contact-row { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--surface2); border-radius: 8px; margin-bottom: 8px; }
  .contact-row span { font-size: 13px; color: var(--text); }
  .contact-row .contact-label { font-size: 11px; color: var(--muted); }

  .faq-item { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 8px; }
  .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; cursor: pointer; font-size: 14px; font-weight: 600; background: var(--surface); transition: background 0.15s; color: var(--text); }
  .faq-q:hover { background: var(--surface2); }
  .faq-a { padding: 0 20px; max-height: 0; overflow: hidden; transition: all 0.3s; font-size: 13px; color: var(--muted); line-height: 1.7; }
  .faq-a.open { padding: 16px 20px; max-height: 400px; }
  .faq-chevron { transition: transform 0.3s; font-size: 12px; }
  .faq-chevron.open { transform: rotate(180deg); }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .doc-sidebar { display: none; }
    .doc-content { padding: 24px 20px 60px; max-width: 100%; }
    .features-grid { grid-template-columns: 1fr; }
    .roles-grid { grid-template-columns: 1fr; }
    .support-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .nav { padding: 0 16px; }
    .hero { padding: 48px 20px 40px; }
    .hero h1 { font-size: 32px; }
    .stats-bar { gap: 24px; padding: 24px 16px; }
    .section { padding: 40px 16px; }
    .content-wrap { padding: 0 16px 60px; }
    .track-selector { padding: 20px 16px; gap: 10px; }
    .track-btn { min-width: 140px; padding: 14px 16px; }
    .page-hero { padding: 32px 20px; }
    .page-hero h1 { font-size: 28px; }
  }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("home")}>
        🏠 <span className="accent">RentFlow</span> <span className="dim">Docs</span>
      </div>
      <div className="nav-links">
        {["home","docs","onboarding","support"].map(p => (
          <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>
            {p === "home" ? "Home" : p === "docs" ? "Docs" : p === "onboarding" ? "Onboarding" : "Support"}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <p style={{marginBottom:8}}>🏠 <strong>RentFlow</strong> — Property Management System</p>
      <div className="footer-links">
        {[["home","Home"],["docs","Documentation"],["onboarding","Onboarding"],["support","Support"]].map(([p,l]) => (
          <a key={p} onClick={() => setPage(p)}>{l}</a>
        ))}
      </div>
      <p style={{marginTop:16,fontSize:12}}>Built with React + Firebase · Mobile Responsive · Dark Theme</p>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      <div className="hero">
        <div className="hero-tag">📦 Complete Package Documentation</div>
        <h1>Everything you need to run <em>RentFlow</em></h1>
        <p>Full documentation, step-by-step onboarding, and support guides for the RentFlow property management system — for landlords, property managers, and developers.</p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => setPage("onboarding")}>🚀 Get Started</button>
          <button className="btn btn-outline" onClick={() => setPage("docs")}>📖 Read the Docs</button>
        </div>
      </div>

      <div className="stats-bar">
        {[["3","User Roles"],["12+","Core Features"],["Firebase","Backend"],["React","Frontend"],["Mobile","Responsive"]].map(([n,l]) => (
          <div key={l} className="stat-item"><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
        ))}
      </div>

      <div className="section">
        <div className="section-label">Quick Access</div>
        <h2>Where do you want to start?</h2>
        <p>Choose a section based on your role and what you need right now.</p>
        <div className="cards-grid">
          {[
            ["🚀","rgba(124,92,252,0.15)","Onboarding Guide","New to RentFlow? Start here. Step-by-step setup from installation to your first tenant invite.","onboarding"],
            ["📖","rgba(96,165,250,0.15)","Full Documentation","Detailed reference for every feature — properties, payments, maintenance, messages, settings, and more.","docs"],
            ["🛠️","rgba(16,185,129,0.15)","Support & Troubleshooting","Common issues, FAQs, error messages explained, and how to reach support when you're stuck.","support"],
            ["👤","rgba(245,166,35,0.15)","Tenant Guide","For your tenants — how to pay rent, file maintenance requests, send messages, and manage their profile.","docs"],
            ["🏢","rgba(239,68,68,0.15)","Admin Guide","Managing properties, tenants, payments, announcements, maintenance requests and system settings.","docs"],
            ["⚙️","rgba(148,163,184,0.15)","Developer Reference","Firebase setup, environment variables, codebase structure, services, hooks, and customization guide.","docs"],
          ].map(([icon,bg,title,desc,target]) => (
            <div key={title} className="card" onClick={() => setPage(target)}>
              <div className="card-icon" style={{background:bg}}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="card-arrow">→</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section section-divider">
        <div className="section-label">Platform Overview</div>
        <h2>What is RentFlow?</h2>
        <p>A full-stack property management web app built with React and Firebase — designed for landlords managing multiple units.</p>
        <div className="features-grid">
          {[
            ["#7c5cfc","Property & Tenant Management","Create and manage property units, assign tenants, track occupancy and maintenance status in real time."],
            ["#10b981","Payment Tracking","Record cash payments, track online submissions from tenants (GCash, Maya, bank transfers), confirm or dispute payments."],
            ["#60a5fa","Tenant Messaging","Private messaging between tenants and admin — no third-party apps needed. Real-time via Firestore."],
            ["#f5a623","Maintenance Requests","Tenants submit requests with photos and priority levels. Admins update status and reply with notes."],
            ["#ef4444","Announcements System","Post announcements visible to all tenants on their dashboard. Categorized by type (general, urgent, payment, maintenance)."],
            ["#a78bfa","Maintenance Mode","Put the system in maintenance mode from settings — tenants see a branded holding screen while admins retain access."],
          ].map(([color,title,desc]) => (
            <div key={title} className="feature-card">
              <div className="feature-dot" style={{background:color}}></div>
              <div><h4>{title}</h4><p>{desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="section section-divider">
        <div className="section-label">User Roles</div>
        <h2>Who uses RentFlow?</h2>
        <p>Three distinct user roles, each with a tailored interface and access level.</p>
        <div className="roles-grid">
          <div className="role-card">
            <div className="role-icon">🏢</div>
            <h3>Admin / Landlord</h3>
            <p>Full system access. Manages properties, tenants, payments, maintenance, announcements and all settings.</p>
            <span className="role-badge" style={{background:"rgba(124,92,252,0.15)",color:"#a78bfa"}}>Full Access</span>
          </div>
          <div className="role-card">
            <div className="role-icon">🏠</div>
            <h3>Tenant</h3>
            <p>Sees their unit, pays rent online, files maintenance requests, receives announcements and messages the admin.</p>
            <span className="role-badge" style={{background:"rgba(16,185,129,0.15)",color:"#6ee7b7"}}>Limited Access</span>
          </div>
          <div className="role-card">
            <div className="role-icon">⚙️</div>
            <h3>Developer</h3>
            <p>Sets up the Firebase project, configures env vars, deploys the app, and customizes features for the client.</p>
            <span className="role-badge" style={{background:"rgba(96,165,250,0.15)",color:"#93c5fd"}}>Technical Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DOCS PAGE ────────────────────────────────────────────────────────────────
const docSections = [
  { id:"overview", label:"Overview", group:"Overview", dot:"#7c5cfc" },
  { id:"architecture", label:"Architecture", group:"Overview", dot:"#60a5fa" },
  { id:"roles", label:"User Roles", group:"Overview", dot:"#10b981" },
  { id:"dashboard", label:"Dashboard", group:"Admin Features", dot:"#7c5cfc" },
  { id:"properties", label:"Properties", group:"Admin Features", dot:"#60a5fa" },
  { id:"tenants-admin", label:"Tenants", group:"Admin Features", dot:"#10b981" },
  { id:"payments-admin", label:"Payments", group:"Admin Features", dot:"#f5a623" },
  { id:"maintenance-admin", label:"Maintenance", group:"Admin Features", dot:"#ef4444" },
  { id:"announcements", label:"Announcements", group:"Admin Features", dot:"#a78bfa" },
  { id:"messages-admin", label:"Messages", group:"Admin Features", dot:"#34d399" },
  { id:"settings", label:"Settings", group:"Admin Features", dot:"#94a3b8" },
  { id:"tenant-dashboard", label:"Dashboard", group:"Tenant Features", dot:"#7c5cfc" },
  { id:"pay-rent", label:"Pay Rent", group:"Tenant Features", dot:"#10b981" },
  { id:"tenant-maintenance", label:"Maintenance", group:"Tenant Features", dot:"#f5a623" },
  { id:"tenant-messages", label:"Messages", group:"Tenant Features", dot:"#60a5fa" },
  { id:"tenant-profile", label:"Profile", group:"Tenant Features", dot:"#94a3b8" },
  { id:"setup", label:"Firebase Setup", group:"Developer", dot:"#7c5cfc" },
  { id:"env-vars", label:"Environment Vars", group:"Developer", dot:"#60a5fa" },
  { id:"codebase", label:"Codebase Structure", group:"Developer", dot:"#10b981" },
  { id:"services", label:"Services & Hooks", group:"Developer", dot:"#f5a623" },
  { id:"firestore", label:"Firestore Schema", group:"Developer", dot:"#ef4444" },
];

function Step({n, title, children}) {
  return (
    <div className="step">
      <div className="step-num">{n}</div>
      <div className="step-content"><h5>{title}</h5>{children}</div>
    </div>
  );
}
function Callout({type="info", children}) {
  return <div className={`callout callout-${type}`}>{children}</div>;
}
function Badge({color, children}) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}
function FRow({icon, title, desc}) {
  return (
    <div className="feature-row">
      <div className="feature-row-icon">{icon}</div>
      <div><h5>{title}</h5><p>{desc}</p></div>
    </div>
  );
}

function DocsPage() {
  const [active, setActive] = useState("overview");
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = () => {
      const secs = el.querySelectorAll(".doc-section");
      let cur = "overview";
      secs.forEach(s => { if (el.scrollTop >= s.offsetTop - 120) cur = s.id; });
      setActive(cur);
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById("doc-" + id);
    if (el) el.scrollIntoView({behavior:"smooth", block:"start"});
    setActive(id);
  };

  const groups = [...new Set(docSections.map(s => s.group))];

  return (
    <div className="doc-layout">
      <div className="doc-sidebar">
        {groups.map(g => (
          <div key={g} className="sidebar-section">
            <div className="sidebar-label">{g}</div>
            {docSections.filter(s => s.group === g).map(s => (
              <button key={s.id} className={`sidebar-link ${active===s.id?"active":""}`} onClick={() => scrollTo(s.id)}>
                <span className="sidebar-dot" style={{background:s.dot}}></span>
                {s.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="doc-content" ref={contentRef} style={{overflowY:"auto",height:"calc(100vh - 60px)"}}>

        <div className="doc-section" id="doc-overview">
          <h2>📖 Documentation</h2>
          <div className="section-sub">Complete reference for RentFlow — a React + Firebase property management system.</div>
          <p>RentFlow is a full-stack property management web application. It has two separate portals: one for the admin (landlord) and one for tenants. The app is real-time — all changes sync instantly via Firebase Firestore subscriptions.</p>
          <Callout type="info"><strong>💡 Who should read this?</strong> This documentation is for all users — landlords learning the system, tenants using it for the first time, and developers setting it up or customizing it.</Callout>
        </div>

        <div className="doc-section" id="doc-architecture">
          <h2>🏗️ Architecture</h2>
          <div className="section-sub">How RentFlow is built under the hood.</div>
          <VizArchitecture />
          <table>
            <thead><tr><th>Layer</th><th>Technology</th><th>Purpose</th></tr></thead>
            <tbody>
              {[["Frontend","React (Vite)","UI, routing, state management"],["Database","Firebase Firestore","Real-time data storage"],["Auth","Firebase Auth","Email/password login, role checks"],["Storage","Firebase Storage","Maintenance request photos"],["Routing","React Router v6","Admin vs Tenant route separation"],["Charts","Recharts","Dashboard revenue & occupancy charts"],["Styling","CSS Modules + Inline","Component-scoped styles"]].map(([l,t,p]) => (
                <tr key={l}><td><strong>{l}</strong></td><td>{t}</td><td>{p}</td></tr>
              ))}
            </tbody>
          </table>
          <h3>Route Structure</h3>
          <p>The app has two entirely separate portals protected by role-based guards:</p>
          <pre><code>{`/ (admin routes — requires role: "admin")
  /              → Dashboard
  /properties    → Properties
  /tenants       → Tenants
  /payments      → Payments
  /maintenance   → Maintenance Requests
  /announcements → Announcements
  /messages      → Admin Messages
  /settings      → Settings
  /profile       → Admin Profile

/tenant (tenant routes — requires role: "tenant")
  /tenant            → Tenant Dashboard
  /tenant/pay-rent   → Pay Rent
  /tenant/maintenance → Maintenance Requests
  /tenant/messages   → Messages
  /tenant/profile    → Profile
  /tenant/settings   → Settings

/login  → Login / Signup / Forgot Password`}</code></pre>
        </div>

        <div className="doc-section" id="doc-roles">
          <h2>👥 User Roles</h2>
          <div className="section-sub">RentFlow has two roles stored in Firestore under <code>users/{"{uid}"}.role</code>.</div>
          <VizRolesSplit />
          <table>
            <thead><tr><th>Role</th><th>Value</th><th>Access Level</th><th>Portal</th></tr></thead>
            <tbody>
              <tr><td><Badge color="purple">Admin</Badge></td><td><code>"admin"</code></td><td>Full system access</td><td><code>/</code></td></tr>
              <tr><td><Badge color="green">Tenant</Badge></td><td><code>"tenant"</code></td><td>Limited — own data only</td><td><code>/tenant</code></td></tr>
            </tbody>
          </table>
          <Callout type="warn"><strong>⚠️ Admin accounts</strong> must be created manually in Firebase Console and the role set to <code>"admin"</code> in the Firestore <code>users</code> collection. The signup form on the app only creates tenant accounts.</Callout>
        </div>

        <div className="doc-section" id="doc-dashboard">
          <h2>📊 Admin Dashboard</h2>
          <div className="section-sub">The main overview screen for the admin portal at <code>/</code>.</div>
          <VizDashboard />
          <div className="feature-list">
            <FRow icon="💰" title="Total Revenue" desc={<>Sum of all payments with status <code>paid</code> or <code>confirmed</code>.</>} />
            <FRow icon="✅" title="Paid Payments" desc="Count of confirmed/paid payment records." />
            <FRow icon="⏳" title="Pending Payments" desc={<>Count of payments with <code>pending</code> status awaiting admin confirmation.</>} />
            <FRow icon="🏠" title="Properties" desc="Total number of property units in the system." />
          </div>
          <h3>Revenue Chart</h3>
          <p>The area chart compares this month's revenue (green line) vs last month's (grey line) across all 12 months. Revenue is calculated only from <code>paid</code> and <code>confirmed</code> payments, using the <code>createdAt</code> timestamp.</p>
          <h3>Occupancy Donut Chart</h3>
          <p>Shows the breakdown of units by status: <Badge color="green">Occupied</Badge> <Badge color="blue">Available</Badge> <Badge color="amber">Maintenance</Badge>. Click a segment or legend item to highlight it.</p>
        </div>

        <div className="doc-section" id="doc-properties">
          <h2>🏘️ Properties</h2>
          <div className="section-sub">Manage all property units at <code>/properties</code>.</div>
          <VizProperties />
          <h3>Adding a Property</h3>
          <div className="steps">
            <Step n={1} title='Click "Add Property"'><p>Opens a modal form on the right side of the page.</p></Step>
            <Step n={2} title="Fill in the details"><p>Unit name, monthly rent (₱), status, and optionally an assigned tenant name.</p></Step>
            <Step n={3} title="Click Save"><p>The property is saved to Firestore and appears in the grid immediately.</p></Step>
          </div>
          <h3>Property Statuses</h3>
          <table>
            <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><Badge color="green">occupied</Badge></td><td>A tenant is currently assigned and living in the unit</td></tr>
              <tr><td><Badge color="blue">available</Badge></td><td>The unit is empty and ready for a new tenant</td></tr>
              <tr><td><Badge color="amber">maintenance</Badge></td><td>The unit is undergoing repairs or is temporarily unavailable</td></tr>
            </tbody>
          </table>
          <h3>Editing & Deleting</h3>
          <p>Hover over a property card to reveal the edit ✏️ and delete 🗑️ icon buttons. Edit opens the same modal pre-filled with the current data. Delete requires confirmation.</p>
          <Callout type="danger"><strong>⚠️ Deleting a property</strong> permanently removes it from Firestore. It will not delete associated payment records.</Callout>
        </div>

        <div className="doc-section" id="doc-tenants-admin">
          <h2>👥 Tenants (Admin)</h2>
          <div className="section-sub">View all tenants at <code>/tenants</code>.</div>
          <VizTenantsAdmin />
          <p>The Tenants page shows all tenants pulled from the <code>properties</code> collection — specifically, properties that have a <code>tenant</code> field set. Each card shows the tenant name, property unit, and the unit's current status.</p>
          <Callout type="info"><strong>💡 Tenant accounts vs assignments</strong> — A tenant "account" (in <code>users</code> collection) and a tenant "assignment" (the <code>tenant</code> field on a property) are separate. Tenants sign up independently and you assign their name to a property manually.</Callout>
          <h3>Searching Tenants</h3>
          <p>Use the search bar to filter by tenant name. The filter is case-insensitive and matches partial names.</p>
        </div>

        <div className="doc-section" id="doc-payments-admin">
          <h2>💳 Payments (Admin)</h2>
          <div className="section-sub">Full payment management at <code>/payments</code>.</div>
          <VizPaymentFlow />
          <h3>Payment Statuses</h3>
          <table>
            <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><Badge color="green">paid / confirmed</Badge></td><td>Payment verified and accepted</td></tr>
              <tr><td><Badge color="amber">pending</Badge></td><td>Submitted by tenant, awaiting admin review</td></tr>
              <tr><td><Badge color="red">overdue</Badge></td><td>Payment deadline passed</td></tr>
              <tr><td><Badge color="blue">partial</Badge></td><td>Partial payment recorded with remaining balance</td></tr>
            </tbody>
          </table>
          <h3>Recording a Cash Payment</h3>
          <p>Click <strong>"Add Payment"</strong> to manually record a cash payment. Fill in tenant name, property, amount, date, month, and payment method. The payment is added with status <code>paid</code> and a notification is created.</p>
          <h3>Confirming Online Payments</h3>
          <p>When a tenant submits an online payment through the app, it appears as <code>pending</code>. Open the payment card, verify the screenshot and reference number, then click <strong>"Confirm"</strong>. The tenant is automatically notified.</p>
          <h3>Partial Payments & Extensions</h3>
          <p>When marking a payment as <code>partial</code>, you can set the remaining balance and an extension deadline. The tenant receives a notification with both the remaining amount and the deadline date.</p>
        </div>

        <div className="doc-section" id="doc-maintenance-admin">
          <h2>🔧 Maintenance (Admin)</h2>
          <div className="section-sub">Manage all tenant requests at <code>/maintenance</code>.</div>
          <VizMaintenanceAdmin />
          <p>Requests are displayed in a card grid. Filter by status using the pill buttons at the top, or search by title, tenant email, or category.</p>
          <h3>Request Card Actions</h3>
          <div className="feature-list">
            <FRow icon="🔄" title="Update Status" desc={<>Change from <code>open</code> → <code>in_progress</code> → <code>resolved</code> using the dropdown in the card.</>} />
            <FRow icon="📝" title="Admin Note" desc='Write a reply or note to the tenant (e.g. "Technician scheduled for Friday 2pm").' />
            <FRow icon="🖼️" title="View Photo" desc="If the tenant attached a damage photo, click it to open a fullscreen lightbox. Press Escape or click outside to close." />
          </div>
          <p>Clicking <strong>"Save Changes"</strong> updates Firestore and sends a notification to the tenant about the status update.</p>
        </div>

        <div className="doc-section" id="doc-announcements">
          <h2>📢 Announcements</h2>
          <div className="section-sub">Post system-wide announcements at <code>/announcements</code>.</div>
          <VizAnnouncements />
          <p>Announcements are visible to all tenants on their dashboard. Fill in a title, message body, and select the type:</p>
          <table>
            <thead><tr><th>Type</th><th>Icon</th><th>Use Case</th></tr></thead>
            <tbody>
              <tr><td><Badge color="purple">general</Badge></td><td>📢</td><td>General updates or information</td></tr>
              <tr><td><Badge color="amber">maintenance</Badge></td><td>🔧</td><td>Scheduled maintenance or building repairs</td></tr>
              <tr><td><Badge color="green">payment</Badge></td><td>💳</td><td>Rent reminders or payment changes</td></tr>
              <tr><td><Badge color="red">urgent</Badge></td><td>🚨</td><td>Emergency alerts or time-sensitive notices</td></tr>
            </tbody>
          </table>
          <p>Posting an announcement also creates a notification visible in the admin's notification bell. Announcements can be deleted from the list below the compose form.</p>
        </div>

        <div className="doc-section" id="doc-messages-admin">
          <h2>💬 Messages (Admin)</h2>
          <div className="section-sub">Private tenant messaging at <code>/messages</code>.</div>
          <VizMessagesAdmin />
          <p>The Messages page has a two-panel layout: a sidebar listing all tenant conversations, and a chat panel on the right. On mobile, these views switch between each other.</p>
          <h3>Unread Counts</h3>
          <p>Each conversation shows an unread count badge. The total unread count is also shown in the sidebar nav badge. Reading a conversation marks all messages in it as read for the admin.</p>
          <h3>Sending Messages</h3>
          <p>Type in the text area and press <strong>Enter</strong> to send (Shift+Enter for new line). Messages are stored in <code>conversations/{"{tenantId}"}/messages</code> in Firestore and sync in real time.</p>
        </div>

        <div className="doc-section" id="doc-settings">
          <h2>⚙️ Settings</h2>
          <div className="section-sub">System configuration at <code>/settings</code>.</div>
          <VizSettings />
          <h3>Payment Accounts</h3>
          <p>Configure the payment details shown to tenants when they pay rent online. Supported methods:</p>
          <ul>
            <li><strong>GCash</strong> — mobile number + account name</li>
            <li><strong>Maya</strong> — mobile number + account name</li>
            <li><strong>BDO, BPI, Metrobank, UnionBank, PNB</strong> — account number + account name</li>
          </ul>
          <h3>Maintenance Mode</h3>
          <p>Toggling Maintenance Mode on blocks all tenant access and shows a branded maintenance screen. Admins are always let through. The mode, message, and estimated return time are stored in <code>appSettings/maintenanceMode</code> in Firestore.</p>
          <Callout type="warn"><strong>⚠️ Turning on Maintenance Mode</strong> will immediately log out all active tenant sessions and redirect them to the maintenance screen.</Callout>
          <h3>Notifications</h3>
          <p>Toggle notification toasts on or off. This is a per-user setting stored in <code>settings/global</code>.</p>
        </div>

        <div className="doc-section" id="doc-tenant-dashboard">
          <h2>🏠 Tenant Dashboard</h2>
          <div className="section-sub">The tenant's home screen at <code>/tenant</code>.</div>
          <VizTenantDashboard />
          <p>The tenant dashboard shows a personalized overview of their rental situation. It loads data specific to the logged-in tenant based on their <code>uid</code>.</p>
          <div className="feature-list">
            <FRow icon="🏠" title="Property Banner" desc="Shows the assigned property name, rent amount, and current status." />
            <FRow icon="⏰" title="Rent Due Notice" desc='Displays the next due date and a "Pay Now" button if rent is due or overdue.' />
            <FRow icon="📋" title="Recent Payments" desc="Shows the 5 most recent payment records for the tenant." />
            <FRow icon="📢" title="Announcements" desc="Shows the 3 latest announcements posted by the admin." />
            <FRow icon="🔧" title="Maintenance Summary" desc="Quick count of open, in-progress, and resolved requests." />
          </div>
        </div>

        <div className="doc-section" id="doc-pay-rent">
          <h2>💸 Pay Rent (Tenant)</h2>
          <div className="section-sub">Online rent submission at <code>/tenant/pay-rent</code>.</div>
          <VizPayRentFlow />
          <div className="steps">
            <Step n={1} title="Select payment method"><p>Choose from GCash, Maya, BDO, BPI, Metrobank, UnionBank, or PNB.</p></Step>
            <Step n={2} title="View payment details"><p>The configured account number/name set by the admin is displayed.</p></Step>
            <Step n={3} title="Make the payment externally"><p>Transfer via GCash app, Maya, or your bank app.</p></Step>
            <Step n={4} title="Enter amount & reference"><p>Type the amount paid and the transaction reference number.</p></Step>
            <Step n={5} title="Upload screenshot"><p>Attach a screenshot of the payment confirmation.</p></Step>
            <Step n={6} title="Submit"><p>Creates a <code>pending</code> payment record. Admin reviews and confirms.</p></Step>
          </div>
          <Callout type="tip"><strong>✅ After submitting</strong>, your payment shows as <code>pending</code> until the admin reviews it. You'll receive a notification when it's confirmed.</Callout>
        </div>

        <div className="doc-section" id="doc-tenant-maintenance">
          <h2>🔧 Maintenance (Tenant)</h2>
          <div className="section-sub">Submit and track requests at <code>/tenant/maintenance</code>.</div>
          <VizTenantMaintenance />
          <p>Tenants can submit maintenance requests for issues in their unit. Each request includes:</p>
          <ul>
            <li><strong>Title</strong> — short description of the issue</li>
            <li><strong>Category</strong> — Plumbing, Electrical, HVAC, Structural, Pest Control, Appliance, Other</li>
            <li><strong>Priority</strong> — Low, Medium, High, or Emergency</li>
            <li><strong>Description</strong> — detailed explanation</li>
            <li><strong>Photo</strong> — optional image of the damage (uploaded to Firebase Storage)</li>
          </ul>
          <p>Once submitted, tenants can track the status: <Badge color="amber">open</Badge> → <Badge color="blue">in progress</Badge> → <Badge color="green">resolved</Badge>. Admin notes/replies are visible on each card.</p>
        </div>

        <div className="doc-section" id="doc-tenant-messages">
          <h2>💬 Messages (Tenant)</h2>
          <div className="section-sub">Private chat with the admin at <code>/tenant/messages</code>.</div>
          <VizTenantMessages />
          <p>Tenants have a private message thread with the landlord/admin. Messages are stored in Firestore and sync in real time. Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for a new line. Maximum message length is 2,000 characters.</p>
        </div>

        <div className="doc-section" id="doc-tenant-profile">
          <h2>👤 Tenant Profile</h2>
          <div className="section-sub">Personal info and account security at <code>/tenant/profile</code>.</div>
          <VizTenantProfile />
          <p>Tenants can update their personal details, emergency contact, and government ID info. The profile section also includes a password change form with real-time strength indicator.</p>
          <Callout type="info"><strong>🔐 Password changes</strong> require the tenant to enter their current password first (re-authentication). Email address cannot be changed from the profile page.</Callout>
        </div>

        <div className="doc-section" id="doc-setup">
          <h2>🔥 Firebase Setup</h2>
          <div className="section-sub">Developer guide for configuring Firebase.</div>
          <div className="steps">
            <Step n={1} title="Create Firebase project"><p>Go to <strong>console.firebase.google.com</strong> → Create a project → Enable Google Analytics (optional).</p></Step>
            <Step n={2} title="Enable Authentication"><p>Firebase Console → Authentication → Sign-in method → Enable <strong>Email/Password</strong>.</p></Step>
            <Step n={3} title="Enable Firestore"><p>Firestore Database → Create database → Start in <strong>production mode</strong>. Apply security rules (see below).</p></Step>
            <Step n={4} title="Enable Storage"><p>Storage → Get started. Used for maintenance request photo uploads.</p></Step>
            <Step n={5} title="Register Web App"><p>Project settings → Add app → Web → Copy the config object.</p></Step>
          </div>
        </div>

        <div className="doc-section" id="doc-env-vars">
          <h2>🔑 Environment Variables</h2>
          <div className="section-sub">Create a <code>.env</code> file in the project root.</div>
          <pre><code>{`VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`}</code></pre>
          <Callout type="danger"><strong>🚨 Never commit your .env file</strong> to version control. Add <code>.env</code> to your <code>.gitignore</code>.</Callout>
        </div>

        <div className="doc-section" id="doc-codebase">
          <h2>📁 Codebase Structure</h2>
          <div className="section-sub">How the source code is organized.</div>
          <pre><code>{`src/
  api/             ← dashboardApi.js, propertyApi.js
  components/      ← NavBar, MaintenanceModeGuard, MaintenanceScreen, StateView
  context/         ← AuthContext, MaintenanceModeContext, NotificationContext, SettingsContext
  features/
    dashboard/     ← Dashboard.jsx
  firebase/        ← firebase.js
  hooks/           ← useDashboardData, useNotifications, usePayments, useProperties, useTenants
  layout/          ← MainLayout.jsx (admin), TenantLayout.jsx (tenant)
  pages/           ← Admin pages (Properties, Tenants, Payments, etc.)
    tenant/        ← Tenant pages (payRent, tenantDashboard, etc.)
  routes/          ← AppRoutes.jsx, ProtectedRoute.jsx
  services/        ← messagesService, notificationsService, paymentsService, propertiesService, settingsService
  styles/          ← CSS files
  utils/           ← stats.js`}</code></pre>
        </div>

        <div className="doc-section" id="doc-services">
          <h2>🔌 Services & Hooks</h2>
          <div className="section-sub">Key abstractions for data access.</div>
          <h3>Services (src/services/)</h3>
          <table>
            <thead><tr><th>File</th><th>Exports</th><th>Description</th></tr></thead>
            <tbody>
              {[
                ["propertiesService.js","createProperty, updateProperty, deleteProperty, subscribeProperties","CRUD + realtime for properties"],
                ["paymentsService.js","createPayment, updatePayment, deletePayment, subscribePayments","CRUD + realtime for payments"],
                ["notificationsService.js","createNotification, subscribeNotifications, markNotificationRead, markAllNotificationsRead","Admin notification bell"],
                ["messagesService.js","sendMessage, subscribeToMessages, subscribeToAllConversations, markConversationRead, subscribeToAdminUnreadCount","Tenant ↔ Admin messaging"],
                ["settingsService.js","getSettings, updateSettings","Global app settings with deep merge"],
              ].map(([f,e,d]) => <tr key={f}><td><code>{f}</code></td><td>{e}</td><td>{d}</td></tr>)}
            </tbody>
          </table>
          <h3>Hooks (src/hooks/)</h3>
          <table>
            <thead><tr><th>Hook</th><th>Returns</th></tr></thead>
            <tbody>
              {[
                ["useProperties()","{ properties, loading }"],
                ["usePayments()","{ payments, loading }"],
                ["useNotifications()","{ notifications, loading, newNotification, clearNewNotification }"],
                ["useTenants()","{ tenants, loading } — admin only"],
                ["useDashboardData()","{ stats, revenueData, occupancyData, loading, error, refresh }"],
              ].map(([h,r]) => <tr key={h}><td><code>{h}</code></td><td>{r}</td></tr>)}
            </tbody>
          </table>
        </div>

        <div className="doc-section" id="doc-firestore">
          <h2>🗄️ Firestore Schema</h2>
          <div className="section-sub">Collections and document shapes used by the app.</div>
          {[
            ["users/{uid}", `{ email, displayName, role: "admin"|"tenant",
  phone?, emergencyContact?, emergencyPhone?,
  idType?, idNumber?, company?, location?,
  createdAt }`],
            ["properties/{id}", `{ name, price, status: "available"|"occupied"|"maintenance",
  tenant?, tenantId?, tenantEmail? }`],
            ["payments/{id}", `{ tenant, property, amount, date, month,
  paymentMethod, source: "cash"|"online",
  status: "paid"|"confirmed"|"pending"|"overdue"|"partial",
  tenantId?, tenantEmail?, referenceNumber?,
  remainingBalance?, extensionDeadline?,
  history[], createdAt, updatedAt? }`],
            ["maintenanceRequests/{id}", `{ title, description, category, priority,
  status: "open"|"in_progress"|"resolved",
  tenantEmail, tenantId, photo?,
  adminNote?, createdAt, updatedAt? }`],
            ["announcements/{id}", `{ title, message, type: "general"|"maintenance"|"payment"|"urgent",
  createdAt }`],
            ["conversations/{tenantId}", `{ tenantId, tenantEmail, lastMessage, lastSenderRole,
  lastAt, unreadAdmin, unreadTenant }
  → messages/{id}: { senderId, senderRole, text, createdAt }`],
            ["notifications/{id}", `{ message, type, route, entityId, read, createdAt }`],
            ["settings/global", `{ currency, notificationsEnabled,
  paymentAccounts: { gcash, maya, bdo, bpi, metrobank, unionbank, pnb } }`],
            ["appSettings/maintenanceMode", `{ enabled: bool, message?, eta?, enabledAt }`],
          ].map(([title, code]) => (
            <div key={title}>
              <h3>{title}</h3>
              <pre><code>{code}</code></pre>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── ONBOARDING PAGE ──────────────────────────────────────────────────────────
function OnboardingPage({ setPage }) {
  const [track, setTrack] = useState("landlord");

  return (
    <div>
      <div className="page-hero">
        <div className="hero-tag">🚀 Getting Started</div>
        <h1>Onboarding Guide</h1>
        <p>Step-by-step instructions for getting RentFlow set up and running. Choose your role below to see the right guide for you.</p>
      </div>

      <div className="track-selector">
        {[["landlord","🏢","I'm the Landlord / Admin","Set up the system and manage properties"],["tenant","🏠","I'm a Tenant","Access my unit, pay rent, get support"],["developer","⚙️","I'm the Developer","Deploy and configure the system"]].map(([id,icon,label,desc]) => (
          <button key={id} className={`track-btn ${track===id?"active":""}`} onClick={() => setTrack(id)}>
            <span className="track-icon">{icon}</span>
            <span className="track-label">{label}</span>
            <span className="track-desc">{desc}</span>
          </button>
        ))}
      </div>

      <div className="content-wrap">

        {track === "landlord" && (
          <div>
            <Callout type="tip"><strong>✅ You're the admin.</strong> This guide walks you through the first-time setup of RentFlow — from logging in to having your first tenant paying rent through the system.</Callout>
            <VizOnboardLandlord />

            {[
              {n:1, color:"rgba(124,92,252,0.15)", textColor:"#c4b5fd", border:"rgba(124,92,252,0.3)", circleStyle:{background:"rgba(124,92,252,0.15)",color:"#c4b5fd",borderColor:"rgba(124,92,252,0.4)"}, lineStyle:{background:"rgba(124,92,252,0.15)"},
                title:"Log In as Admin", sub:"Your developer will provide your admin credentials. Regular signup creates tenant accounts only.",
                steps:[
                  {title:"Open the app URL", desc:"Your developer will give you the app link (e.g. https://your-app.vercel.app). Open it in your browser — Chrome, Safari, or Edge all work fine."},
                  {title:"Enter your admin email & password", desc:"Use the credentials your developer provided. After logging in, you'll be redirected to the Admin Dashboard at /. Tenants get redirected to /tenant instead — this is how the system tells the difference."},
                  {title:"Familiarize yourself with the layout", desc:"The sidebar on the left has all main sections. On mobile, a bottom tab bar appears instead, with a \"More\" drawer for additional pages.", last:true},
                ]},
              {n:2, color:"rgba(96,165,250,0.15)", textColor:"#93c5fd", border:"rgba(96,165,250,0.3)", circleStyle:{background:"rgba(96,165,250,0.15)",color:"#93c5fd",borderColor:"rgba(96,165,250,0.4)"}, lineStyle:{background:"rgba(96,165,250,0.15)"},
                title:"Configure Payment Accounts", sub:"Before tenants can pay online, you need to set up your payment details.",
                steps:[
                  {title:"Go to Settings → Payment Accounts", desc:"Click Settings in the sidebar (or \"More\" → Settings on mobile)."},
                  {title:"Fill in the methods you accept", desc:"For each payment method you accept (GCash, Maya, BDO, BPI, etc.), enter your account number/mobile number and account name. You only need to fill in what you actually use — leave the others blank.", tip:"Tip: Most landlords use GCash as the primary method and optionally add a bank account."},
                  {title:"Save each section", desc:"Click the Save button for each payment method you've filled in. Each method saves independently.", last:true},
                ]},
              {n:3, color:"rgba(16,185,129,0.15)", textColor:"#6ee7b7", border:"rgba(16,185,129,0.3)", circleStyle:{background:"rgba(16,185,129,0.15)",color:"#6ee7b7",borderColor:"rgba(16,185,129,0.4)"}, lineStyle:{background:"rgba(16,185,129,0.15)"},
                title:"Add Your Properties", sub:"Add each rental unit you manage into the system.",
                steps:[
                  {title:"Go to Properties → Add Property", desc:"Click the Add Property button at the top right of the Properties page."},
                  {title:"Enter property details", desc:"Name (e.g. \"Unit 101A\"), Monthly Rent (₱), Status (available/occupied/maintenance), Tenant name (optional)."},
                  {title:"Repeat for all your units", desc:"Add all your rental units. They appear in the grid on the Properties page and are used throughout the system.", last:true},
                ]},
              {n:4, color:"rgba(245,166,35,0.15)", textColor:"#fcd34d", border:"rgba(245,166,35,0.3)", circleStyle:{background:"rgba(245,166,35,0.15)",color:"#fcd34d",borderColor:"rgba(245,166,35,0.4)"}, lineStyle:{background:"rgba(245,166,35,0.15)"},
                title:"Invite Your Tenants", sub:"Share the app link with tenants so they can sign up and access their portal.",
                steps:[
                  {title:"Share the app link with your tenant", desc:"Send them the app URL and tell them to click \"No account? Sign up\" on the login page. They create their own account using their email and a password they choose."},
                  {title:"Link them to a property", desc:"Once they've signed up, go to Properties, edit the relevant unit, and enter their name in the Tenant field."},
                  {title:"You're live!", desc:"Tenants can now pay rent online, file maintenance requests, send you messages, and see your announcements — all through the app.", last:true},
                ]},
            ].map(phase => (
              <div key={phase.n} className="phase">
                <div className="phase-header">
                  <div className="phase-num" style={{background:phase.color,color:phase.textColor,border:`1px solid ${phase.border}`}}>{phase.n}</div>
                  <div><h2>{phase.title}</h2><p>{phase.sub}</p></div>
                </div>
                <div className="step-list">
                  {phase.steps.map((s,i) => (
                    <div key={i} className="step-item">
                      <div className="step-left">
                        <div className="step-circle" style={phase.circleStyle}>{i+1}</div>
                        {!s.last && <div className="step-line" style={phase.lineStyle}></div>}
                      </div>
                      <div className="step-right">
                        <h4>{s.title}</h4>
                        <p>{s.desc}</p>
                        {s.tip && <Callout type="tip"><strong>Tip:</strong> {s.tip}</Callout>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(239,68,68,0.15)",color:"#fca5a5",border:"1px solid rgba(239,68,68,0.3)"}}>5</div>
                <div><h2>Day-to-Day Operations</h2><p>What to check and do on a regular basis.</p></div>
              </div>
              <div className="checklist">
                {[["📬","Check the notification bell","new payments, maintenance requests, and messages show up here."],["💳","Confirm pending payments","tenants submit online payments as \"pending\"; you review and confirm them in the Payments page."],["🔧","Respond to maintenance requests","update status and add notes for your tenants."],["💬","Reply to messages","the Messages badge in the sidebar shows unread counts."],["📢","Post announcements","for rent reminders, scheduled maintenance, or any important updates."],["📊","Review the Dashboard","track revenue vs last month and occupancy rate at a glance."]].map(([icon,bold,desc]) => (
                  <div key={bold} className="check-item"><div className="check-box">{icon}</div><div><strong>{bold}</strong> — {desc}</div></div>
                ))}
              </div>
            </div>

            <div className="completion-card">
              <div style={{fontSize:48,marginBottom:12}}>🎉</div>
              <h3>You're all set!</h3>
              <p>RentFlow is ready to manage your properties. For detailed feature reference, check the full documentation.</p>
              <div className="completion-card-btns">
                <button className="btn btn-primary" onClick={() => setPage("docs")}>📖 Full Documentation</button>
                <button className="btn btn-outline" onClick={() => setPage("support")}>🛠️ Support</button>
              </div>
            </div>
          </div>
        )}

        {track === "tenant" && (
          <div>
            <Callout type="tip"><strong>👋 Welcome!</strong> This guide is for tenants. Your landlord should have already given you the app link. Here's how to get started.</Callout>
            <VizOnboardTenant />
            {[
              {n:1,color:"rgba(16,185,129,0.15)",textColor:"#6ee7b7",border:"rgba(16,185,129,0.3)",title:"Create Your Account",sub:"One-time setup — takes about 2 minutes.",
                steps:[
                  {title:"Open the app link your landlord sent you",desc:"Works on any phone or computer — no app download needed, just your browser."},
                  {title:'Click "No account? Sign up"',desc:"Enter your email address and choose a password (at least 6 characters). Confirm the password and tap Sign Up.",info:"Use an email you actually check — your landlord may send important notifications through the system."},
                  {title:"You're automatically logged in",desc:"You'll land on your Tenant Dashboard. Let your landlord know you've signed up so they can link your account to your unit.",last:true},
                ]},
            ].map(phase => (
              <div key={phase.n} className="phase">
                <div className="phase-header">
                  <div className="phase-num" style={{background:phase.color,color:phase.textColor,border:`1px solid ${phase.border}`}}>{phase.n}</div>
                  <div><h2>{phase.title}</h2><p>{phase.sub}</p></div>
                </div>
                <div className="step-list">
                  {phase.steps.map((s,i) => (
                    <div key={i} className="step-item">
                      <div className="step-left">
                        <div className="step-circle" style={{background:phase.color,color:phase.textColor,borderColor:phase.border.replace("0.3","0.4")}}>{i+1}</div>
                        {!s.last && <div className="step-line" style={{background:phase.color}}></div>}
                      </div>
                      <div className="step-right">
                        <h4>{s.title}</h4>
                        <p>{s.desc}</p>
                        {s.info && <Callout type="info">{s.info}</Callout>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(96,165,250,0.15)",color:"#93c5fd",border:"1px solid rgba(96,165,250,0.3)"}}>2</div>
                <div><h2>Explore Your Dashboard</h2><p>Your home screen shows everything about your rental.</p></div>
              </div>
              <div className="checklist">
                {[["🏠","Property card","shows your unit name, monthly rent, and status."],["💳","Rent due notice","shows when your next payment is due and a quick Pay Now button if it's time."],["📋","Recent payments","your payment history with status (confirmed, pending, overdue)."],["📢","Announcements","latest notices from your landlord appear here."],["🔧","Maintenance requests","a quick summary of any open requests you've filed."]].map(([icon,bold,desc]) => (
                  <div key={bold} className="check-item"><div className="check-box">{icon}</div><div><strong>{bold}</strong> — {desc}</div></div>
                ))}
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(245,166,35,0.15)",color:"#fcd34d",border:"1px solid rgba(245,166,35,0.3)"}}>3</div>
                <div><h2>Pay Your Rent Online</h2><p>Submit your payment through the app in a few taps.</p></div>
              </div>
              <div className="step-list">
                {[
                  {title:"Go to Pay Rent in the bottom menu",desc:"Tap the Pay Rent tab at the bottom of your screen (or in the menu)."},
                  {title:"Choose your payment method",desc:"Select GCash, Maya, or a bank option. The account details set by your landlord will appear."},
                  {title:"Send the money using GCash / bank app",desc:"Switch to your GCash or banking app, send the rent amount to the displayed number/account, then come back to RentFlow."},
                  {title:"Fill in the payment form",desc:"Enter the amount you sent and the reference number from your GCash/bank receipt. Upload a screenshot of the confirmation."},
                  {title:"Submit and wait for confirmation",desc:"Your payment shows as Pending. Your landlord will review and confirm it — you'll receive a notification when it's done.",last:true},
                ].map((s,i) => (
                  <div key={i} className="step-item">
                    <div className="step-left">
                      <div className="step-circle" style={{background:"rgba(245,166,35,0.15)",color:"#fcd34d",borderColor:"rgba(245,166,35,0.4)"}}>{i+1}</div>
                      {!s.last && <div className="step-line" style={{background:"rgba(245,166,35,0.15)"}}></div>}
                    </div>
                    <div className="step-right"><h4>{s.title}</h4><p>{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(239,68,68,0.15)",color:"#fca5a5",border:"1px solid rgba(239,68,68,0.3)"}}>4</div>
                <div><h2>Other Things You Can Do</h2></div>
              </div>
              <div className="checklist">
                {[["🔧","File a maintenance request","go to Maintenance, describe the issue, optionally add a photo, and submit. Track the status in the same page."],["💬","Message your landlord","go to Messages and type directly. Private and real-time."],["👤","Update your profile","go to Profile to add your phone number and emergency contact details."],["🔑","Change your password","also in Profile, under Account Security."]].map(([icon,bold,desc]) => (
                  <div key={bold} className="check-item"><div className="check-box">{icon}</div><div><strong>{bold}</strong> — {desc}</div></div>
                ))}
              </div>
            </div>

            <div className="completion-card">
              <div style={{fontSize:48,marginBottom:12}}>✅</div>
              <h3>You're ready to go!</h3>
              <p>If something looks wrong or you can't see your property, message your landlord through the app or check the support guide.</p>
              <div className="completion-card-btns">
                <button className="btn btn-primary" onClick={() => setPage("support")}>🛠️ Tenant FAQ</button>
              </div>
            </div>
          </div>
        )}

        {track === "developer" && (
          <div>
            <Callout type="info"><strong>⚙️ Developer setup guide</strong> — This covers everything from cloning the repo to deploying a live instance for your client.</Callout>
            <VizOnboardDeveloper />

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(124,92,252,0.15)",color:"#c4b5fd",border:"1px solid rgba(124,92,252,0.3)"}}>1</div>
                <div><h2>Prerequisites</h2><p>What you need before starting.</p></div>
              </div>
              <div className="checklist">
                {[["✓","Node.js 18+","check with node -v"],["✓","npm or yarn","check with npm -v"],["✓","A Firebase account","free Spark plan is sufficient for small deployments"],["✓","Git","to clone the source repository"]].map(([icon,bold,desc]) => (
                  <div key={bold} className="check-item"><div className="check-box">{icon}</div><div><strong>{bold}</strong> — <code>{desc}</code></div></div>
                ))}
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(96,165,250,0.15)",color:"#93c5fd",border:"1px solid rgba(96,165,250,0.3)"}}>2</div>
                <div><h2>Install & Configure</h2></div>
              </div>
              <div className="step-list">
                {[
                  {title:"Clone and install",code:"git clone <your-repo-url>\ncd rentflow\nnpm install"},
                  {title:"Create the Firebase project",desc:"Go to console.firebase.google.com → Add project → name it (e.g. \"rentflow-client\"). Enable Authentication (Email/Password), Firestore, and Storage. Register a Web App and copy the config."},
                  {title:"Create .env file",code:"VITE_FIREBASE_API_KEY=...\nVITE_FIREBASE_AUTH_DOMAIN=...\nVITE_FIREBASE_PROJECT_ID=...\nVITE_FIREBASE_STORAGE_BUCKET=...\nVITE_FIREBASE_MESSAGING_SENDER_ID=...\nVITE_FIREBASE_APP_ID=..."},
                  {title:"Start dev server",code:"npm run dev",desc:"App runs at http://localhost:5173.",last:true},
                ].map((s,i) => (
                  <div key={i} className="step-item">
                    <div className="step-left">
                      <div className="step-circle" style={{background:"rgba(96,165,250,0.15)",color:"#93c5fd",borderColor:"rgba(96,165,250,0.4)"}}>{i+1}</div>
                      {!s.last && <div className="step-line" style={{background:"rgba(96,165,250,0.15)"}}></div>}
                    </div>
                    <div className="step-right">
                      <h4>{s.title}</h4>
                      {s.desc && <p>{s.desc}</p>}
                      {s.code && <pre><code>{s.code}</code></pre>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(16,185,129,0.15)",color:"#6ee7b7",border:"1px solid rgba(16,185,129,0.3)"}}>3</div>
                <div><h2>Create the Admin Account</h2></div>
              </div>
              <div className="step-list">
                <div className="step-item">
                  <div className="step-left">
                    <div className="step-circle" style={{background:"rgba(16,185,129,0.15)",color:"#6ee7b7",borderColor:"rgba(16,185,129,0.4)"}}>1</div>
                    <div className="step-line" style={{background:"rgba(16,185,129,0.15)"}}></div>
                  </div>
                  <div className="step-right">
                    <h4>Create user in Firebase Auth</h4>
                    <p>Firebase Console → Authentication → Users → Add user. Enter the client's email and a temporary password.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-left">
                    <div className="step-circle" style={{background:"rgba(16,185,129,0.15)",color:"#6ee7b7",borderColor:"rgba(16,185,129,0.4)"}}>2</div>
                  </div>
                  <div className="step-right">
                    <h4>Set role in Firestore</h4>
                    <p>Firestore → users collection → Add document with the UID as the document ID:</p>
                    <pre><code>{`{ email: "admin@example.com",
  displayName: "Admin",
  role: "admin",
  createdAt: <timestamp> }`}</code></pre>
                    <Callout type="danger"><strong>Critical:</strong> Without this Firestore document and <code>role: "admin"</code>, the account will be blocked.</Callout>
                  </div>
                </div>
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(245,166,35,0.15)",color:"#fcd34d",border:"1px solid rgba(245,166,35,0.3)"}}>4</div>
                <div><h2>Firestore Security Rules</h2></div>
              </div>
              <pre><code>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isTenant() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'tenant';
    }

    match /users/{uid} {
      allow read, write: if request.auth.uid == uid || isAdmin();
    }
    match /properties/{id} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
    match /payments/{id} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if isAdmin();
    }
    match /maintenanceRequests/{id} {
      allow read: if request.auth != null;
      allow create: if isTenant();
      allow update: if isAdmin();
    }
    match /announcements/{id} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
    match /notifications/{id} {
      allow read, write: if isAdmin();
    }
    match /conversations/{tenantId} {
      allow read, write: if request.auth.uid == tenantId || isAdmin();
      match /messages/{msgId} {
        allow read, write: if request.auth.uid == tenantId || isAdmin();
      }
    }
    match /settings/{docId} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
    match /appSettings/{docId} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
  }
}`}</code></pre>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div className="phase-num" style={{background:"rgba(239,68,68,0.15)",color:"#fca5a5",border:"1px solid rgba(239,68,68,0.3)"}}>5</div>
                <div><h2>Deploy to Production</h2></div>
              </div>
              <div className="step-list">
                {[
                  {title:"Build the app",code:"npm run build"},
                  {title:"Deploy to Vercel (recommended)",desc:"Push to GitHub → connect repo to Vercel → add your .env variables in the Vercel project settings → deploy. React Router requires a vercel.json:",code:'{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }'},
                  {title:"Add authorized domain in Firebase",desc:"Firebase Console → Authentication → Settings → Authorized domains → add your Vercel domain (e.g. rentflow-client.vercel.app).",last:true},
                ].map((s,i) => (
                  <div key={i} className="step-item">
                    <div className="step-left">
                      <div className="step-circle" style={{background:"rgba(239,68,68,0.15)",color:"#fca5a5",borderColor:"rgba(239,68,68,0.4)"}}>{i+1}</div>
                      {!s.last && <div className="step-line" style={{background:"rgba(239,68,68,0.15)"}}></div>}
                    </div>
                    <div className="step-right">
                      <h4>{s.title}</h4>
                      {s.desc && <p>{s.desc}</p>}
                      {s.code && <pre><code>{s.code}</code></pre>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="completion-card">
              <div style={{fontSize:48,marginBottom:12}}>🚀</div>
              <h3>Deployment complete!</h3>
              <p>Share the app URL and admin credentials with your client. For ongoing customizations, refer to the Services & Hooks and Firestore Schema sections in the docs.</p>
              <div className="completion-card-btns">
                <button className="btn btn-primary" onClick={() => setPage("docs")}>📖 Services Reference</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SUPPORT PAGE ─────────────────────────────────────────────────────────────
const faqs = [
  {q:"I can't log in — it says 'Access Denied'",a:"Your account exists in Firebase Auth but the Firestore users/{uid} document is missing or the role field is incorrect. Ask your developer to check the Firestore users collection and confirm your role is set to either \"admin\" or \"tenant\"."},
  {q:"My tenant can't see their property on their dashboard",a:"The tenant field on the property document must exactly match how you set it up. Go to Properties → edit the unit → make sure the Tenant name is entered. Also confirm the tenantId and tenantEmail fields are populated if your version uses those."},
  {q:"A payment is stuck as 'pending' — tenant paid but nothing happened",a:"Online payments don't auto-confirm. Go to Payments → find the pending record → click it to view the screenshot and reference number → click Confirm. The tenant will receive a notification automatically."},
  {q:"The app shows a blank screen or crashes after login",a:"This is almost always a Firebase configuration issue. Double-check your .env file — all six VITE_FIREBASE_* variables must be present and correct. Restart the dev server after any .env change."},
  {q:"Tenant submitted a maintenance request but I don't see it",a:"Check the Maintenance page and make sure you're not filtering by a status that excludes new requests. New requests come in as 'open'. Also check that Firestore security rules allow create for tenants on maintenanceRequests."},
  {q:"I turned on Maintenance Mode and now I can't access the admin panel",a:"Maintenance Mode only blocks tenants — admin accounts always get through. If you're locked out, log in with your admin email/password and you should pass the guard. If you're still blocked, check the Firestore appSettings/maintenanceMode document and set enabled to false directly in the Firebase Console."},
  {q:"Messages aren't appearing in real time",a:"Real-time messaging requires an active Firestore subscription. Check your browser console for permission errors. Make sure the Firestore security rules allow read/write on conversations/{tenantId}/messages for both the tenant and admin."},
  {q:"How do I reset a tenant's password?",a:"Go to Firebase Console → Authentication → find the tenant's email → click the three-dot menu → Send password reset email. Or the tenant can use the 'Forgot Password' link on the login page."},
];

function SupportPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <div className="page-hero">
        <div className="hero-tag">🛠️ Help & Support</div>
        <h1>Support Center</h1>
        <p>Get help with RentFlow — contact your developer directly or browse common issues below.</p>
      </div>

      <div className="section">
        <div className="section-label">Contact</div>
        <h2>Get in Touch</h2>
        <p>Reach out directly for setup help, bug reports, or customization requests.</p>

        <div className="support-grid">
          <div className="support-card">
            <h3>📧 Email Support</h3>
            <p>Send an email for non-urgent issues, feature requests, or documentation questions. Typically replied to within 24 hours.</p>
            <div className="contact-row">
              <span>✉️</span>
              <div>
                <div className="contact-label">Email address</div>
                <span>pawafuru04@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="support-card">
            <h3>📱 Mobile / Messaging</h3>
            <p>For urgent issues or quick questions, send a message via SMS or any messaging app.</p>
            <div className="contact-row">
              <span>📞</span>
              <div>
                <div className="contact-label">Phone / SMS / Viber / WhatsApp</div>
                <span>09054024265</span>
              </div>
            </div>
          </div>
        </div>

        <Callout type="info"><strong>💡 Before reaching out</strong> — check the FAQ below and the <strong>Documentation</strong> page first. Most common issues are covered there and you'll get a faster answer.</Callout>
      </div>

      <div className="section" style={{paddingTop:0}}>
        <div className="section-label">FAQ</div>
        <h2>Common Issues</h2>
        <p>Frequently asked questions from landlords, tenants, and developers.</p>

        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {faq.q}
              <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>▼</span>
            </div>
            <div className={`faq-a ${openFaq === i ? "open" : ""}`}>{faq.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      <style>{css}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "docs" && <DocsPage />}
      {page === "onboarding" && <OnboardingPage setPage={setPage} />}
      {page === "support" && <SupportPage />}
      {page !== "docs" && <Footer setPage={setPage} />}
    </>
  );
}