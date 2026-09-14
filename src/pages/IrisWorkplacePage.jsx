import { useState, useEffect } from "react";
import { CheckSquare, MessageSquare, DollarSign, Users, FileText, Zap, BarChart2, Shield, Globe, ArrowRight, X, Check, Star, Briefcase, Settings, Crown } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --white: #FFFFFF; --gray-50: #F8FAFC; --gray-100: #F1F5F9; --gray-200: #E2E8F0;
    --gray-300: #CBD5E1; --gray-400: #94A3B8; --gray-500: #64748B; --gray-600: #475569;
    --gray-700: #334155; --gray-800: #1E293B; --gray-900: #0F172A;
    --indigo: #4F46E5; --indigo-light: #6366F1; --indigo-lighter: #818CF8;
    --indigo-bg: rgba(79,70,229,0.08); --indigo-border: rgba(79,70,229,0.2);
    --purple: #7C3AED; --green: #10B981; --green-bg: rgba(16,185,129,0.08);
    --red: #EF4444; --amber: #F59E0B; --border: #E2E8F0;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--gray-900); overflow-x: hidden; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(79,70,229,0.35); } 50% { box-shadow: 0 0 0 10px rgba(79,70,229,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 64px; padding: 0 48px; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-product { font-size: 15px; font-weight: 700; color: var(--gray-900); }
  .nav-product span { color: var(--indigo); }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 14px; font-weight: 500; color: var(--gray-500); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--gray-900); }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .nav-login { font-size: 14px; font-weight: 500; color: var(--gray-600); cursor: pointer; padding: 8px 16px; border-radius: 8px; transition: all 0.2s; }
  .nav-login:hover { background: var(--gray-100); }
  .nav-cta { background: var(--indigo); color: white; padding: 9px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; box-shadow: 0 1px 3px rgba(79,70,229,0.3); }
  .nav-cta:hover { background: var(--indigo-light); transform: translateY(-1px); }

  .hero { min-height: 100vh; background: var(--white); padding: 120px 48px 80px; position: relative; overflow: hidden; display: flex; align-items: center; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,70,229,0.06) 0%, transparent 70%); pointer-events: none; }
  .hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--gray-200) 1px, transparent 1px); background-size: 28px 28px; opacity: 0.6; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%); pointer-events: none; }
  .hero-inner { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; width: 100%; text-align: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--indigo-bg); border: 1px solid var(--indigo-border); color: var(--indigo); padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 600; margin-bottom: 28px; animation: fadeUp 0.5s ease both; }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--indigo); animation: blink 2s infinite; }
  .hero-title { font-size: clamp(44px, 6vw, 72px); font-weight: 800; line-height: 1.1; color: var(--gray-900); margin-bottom: 24px; letter-spacing: -0.02em; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title .grad { background: linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-sub { font-size: 18px; color: var(--gray-500); line-height: 1.75; max-width: 620px; margin: 0 auto 40px; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display: flex; gap: 14px; justify-content: center; margin-bottom: 20px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-indigo { background: var(--indigo); color: white; padding: 14px 28px; border-radius: 10px; border: none; cursor: pointer; font-size: 15px; font-weight: 600; transition: all 0.25s; animation: pulse 2.5s infinite; box-shadow: 0 4px 14px rgba(79,70,229,0.4); display: flex; align-items: center; gap: 8px; }
  .btn-indigo:hover { background: var(--indigo-light); transform: translateY(-2px); }
  .btn-outline { background: white; color: var(--gray-700); padding: 12px 24px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 500; border: 1.5px solid var(--border); transition: all 0.25s; }
  .btn-outline:hover { border-color: var(--indigo); color: var(--indigo); }
  .hero-note { font-size: 13px; color: var(--gray-400); animation: fadeUp 0.6s 0.4s ease both; }
  .hero-stats { display: flex; gap: 48px; justify-content: center; margin-top: 60px; animation: fadeUp 0.6s 0.5s ease both; }
  .hero-stat-val { font-size: 36px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.02em; }
  .hero-stat-val span { color: var(--indigo); }
  .hero-stat-lbl { font-size: 13px; color: var(--gray-400); margin-top: 4px; }

  .replace-bar { background: var(--gray-50); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 18px 48px; }
  .replace-bar-inner { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .replace-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--gray-400); text-transform: uppercase; }
  .replace-items { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .replace-pill { background: white; border: 1px solid var(--border); color: var(--gray-500); font-size: 13px; font-weight: 500; padding: 4px 12px; border-radius: 100px; }

  .problem { background: white; padding: 100px 48px; }
  .problem-inner { max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--indigo); text-transform: uppercase; margin-bottom: 14px; }
  .section-title { font-size: clamp(32px, 4vw, 48px); font-weight: 800; line-height: 1.1; color: var(--gray-900); margin-bottom: 14px; letter-spacing: -0.02em; }
  .section-title span { color: var(--indigo); }
  .section-sub { font-size: 17px; color: var(--gray-500); line-height: 1.7; max-width: 540px; }
  .pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px; }
  .pain-card { background: var(--gray-50); border: 1px solid var(--border); border-radius: 14px; padding: 28px; }
  .pain-icon { font-size: 28px; margin-bottom: 14px; display: block; }
  .pain-card h3 { font-size: 17px; font-weight: 700; color: var(--gray-800); margin-bottom: 8px; }
  .pain-card p { font-size: 14px; color: var(--gray-500); line-height: 1.65; }

  .hubs { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .hubs-inner { max-width: 1100px; margin: 0 auto; }
  .hub-list { display: flex; flex-direction: column; gap: 4px; margin-top: 56px; }
  .hub-row { background: white; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.3s; }
  .hub-row:hover { box-shadow: 0 4px 24px rgba(79,70,229,0.08); border-color: var(--indigo-border); }
  .hub-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 28px; cursor: pointer; }
  .hub-header-left { display: flex; align-items: center; gap: 16px; }
  .hub-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .hub-name { font-size: 18px; font-weight: 700; color: var(--gray-900); }
  .hub-desc { font-size: 13px; color: var(--gray-400); margin-top: 2px; }
  .hub-count { font-size: 12px; font-weight: 600; color: var(--indigo); background: var(--indigo-bg); border: 1px solid var(--indigo-border); padding: 3px 10px; border-radius: 100px; }
  .hub-body { padding: 0 28px 28px; border-top: 1px solid var(--border); display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding-top: 20px; }
  .hub-feat { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--gray-600); }
  .hub-feat-ck { color: var(--green); flex-shrink: 0; margin-top: 2px; }

  .free-tools { background: white; padding: 100px 48px; border-top: 1px solid var(--border); }
  .free-tools-inner { max-width: 1100px; margin: 0 auto; }
  .free-tools-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 52px; }
  .free-tool-card { border-radius: 20px; padding: 40px; position: relative; overflow: hidden; }
  .free-tool-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 100px; margin-bottom: 20px; }
  .free-tool-card h3 { font-size: 26px; font-weight: 800; color: white; margin-bottom: 8px; letter-spacing: -0.02em; }
  .free-tool-card p { font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.65; margin-bottom: 24px; }
  .free-tool-feats { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }
  .free-tool-feat { display: flex; align-items: center; gap: 8px; font-size: 14px; color: rgba(255,255,255,0.85); }
  .free-tool-btn { background: white; border: none; cursor: pointer; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 8px; transition: all 0.25s; display: inline-flex; align-items: center; gap: 6px; }

  .differentiators { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .diff-inner { max-width: 1100px; margin: 0 auto; }
  .diff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 52px; }
  .diff-card { background: white; padding: 32px; border: 1px solid var(--border); transition: all 0.25s; }
  .diff-card:hover { border-color: var(--indigo-border); box-shadow: 0 4px 20px rgba(79,70,229,0.08); }
  .diff-icon { color: var(--indigo); margin-bottom: 14px; display: block; }
  .diff-card h3 { font-size: 17px; font-weight: 700; color: var(--gray-900); margin-bottom: 8px; }
  .diff-card p { font-size: 14px; color: var(--gray-500); line-height: 1.65; }

  .audiences { background: white; padding: 100px 48px; border-top: 1px solid var(--border); }
  .aud-inner { max-width: 1100px; margin: 0 auto; }
  .aud-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 52px; }
  .aud-card { background: var(--gray-50); border: 1.5px solid var(--border); border-radius: 16px; padding: 32px; transition: all 0.3s; }
  .aud-card:hover { border-color: var(--indigo-border); box-shadow: 0 6px 24px rgba(79,70,229,0.08); }
  .aud-emoji { font-size: 32px; margin-bottom: 14px; display: block; }
  .aud-card h3 { font-size: 19px; font-weight: 700; color: var(--gray-900); margin-bottom: 8px; }
  .aud-card p { font-size: 14px; color: var(--gray-500); line-height: 1.65; margin-bottom: 16px; }
  .aud-feats { display: flex; flex-direction: column; gap: 6px; }
  .aud-feat { font-size: 13px; color: var(--indigo); font-weight: 600; display: flex; align-items: center; gap: 6px; }

  .pricing { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 960px; margin: 0 auto; text-align: center; }
  .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 52px; text-align: left; }
  .price-card { background: white; border: 1.5px solid var(--border); border-radius: 16px; padding: 28px; position: relative; transition: all 0.3s; }
  .price-card:hover { border-color: var(--indigo-border); box-shadow: 0 8px 32px rgba(79,70,229,0.1); }
  .price-card.featured { border-color: var(--indigo); box-shadow: 0 8px 32px rgba(79,70,229,0.15); }
  .price-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--indigo); color: white; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 100px; white-space: nowrap; }
  .price-name { font-size: 16px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
  .price-desc { font-size: 12px; color: var(--gray-400); margin-bottom: 16px; }
  .price-amount { font-size: 40px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.03em; line-height: 1; }
  .price-amount sup { font-size: 18px; vertical-align: top; margin-top: 10px; }
  .price-mo { font-size: 12px; color: var(--gray-400); margin: 4px 0 6px; }
  .price-annual { font-size: 11px; color: var(--green); font-weight: 600; margin-bottom: 20px; min-height: 16px; }
  .price-div { height: 1px; background: var(--border); margin: 16px 0; }
  .price-feat { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; color: var(--gray-600); padding: 4px 0; }
  .price-ck { color: var(--green); font-size: 13px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .price-btn { width: 100%; padding: 11px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; margin-top: 16px; transition: all 0.25s; }
  .price-btn.primary { background: var(--indigo); color: white; }
  .price-btn.primary:hover { background: var(--indigo-light); }
  .price-btn.secondary { background: white; color: var(--gray-700); border: 1.5px solid var(--border); }
  .price-btn.secondary:hover { border-color: var(--indigo); color: var(--indigo); }

  .cta-section { background: linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%); padding: 90px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 28px 28px; }
  .cta-inner { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
  .cta-title { font-size: clamp(36px, 5vw, 52px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.02em; }
  .cta-sub { font-size: 17px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 36px; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: white; color: var(--indigo); padding: 16px 36px; border-radius: 10px; border: none; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.25s; }
  .cta-btn-main:hover { background: var(--gray-50); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.8); padding: 14px 32px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 500; border: 1.5px solid rgba(255,255,255,0.3); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; color: white; }

  .footer { background: var(--gray-900); padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .footer-copy { font-size: 13px; color: var(--gray-500); }
  .footer-copy strong { color: var(--indigo-lighter); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--gray-500); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--gray-300); }

  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(15,23,42,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: white; border-radius: 20px; padding: 48px; max-width: 480px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 24px 60px rgba(0,0,0,0.2); }
  .modal-x { position: absolute; top: 18px; right: 18px; background: var(--gray-100); border: none; color: var(--gray-500); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
  .modal-x:hover { background: var(--gray-200); }
  .modal-h { font-size: 26px; font-weight: 800; color: var(--gray-900); margin-bottom: 6px; letter-spacing: -0.02em; }
  .modal-s { color: var(--gray-500); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; color: var(--gray-600); margin-bottom: 6px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 11px 14px; border-radius: 10px; background: var(--gray-50); border: 1.5px solid var(--border); font-size: 14px; font-family: 'Inter', sans-serif; color: var(--gray-900); outline: none; transition: border-color 0.2s; }
  .f-input:focus { border-color: var(--indigo); background: white; }
  .f-input::placeholder { color: var(--gray-400); }
  .f-btn { width: 100%; background: var(--indigo); color: white; padding: 14px; border-radius: 10px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; margin-top: 8px; transition: all 0.25s; }
  .f-btn:hover { background: var(--indigo-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-h { font-size: 26px; font-weight: 800; color: var(--gray-900); margin-bottom: 10px; }
  .success-p { color: var(--gray-500); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; } .nav-links { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-stats { flex-direction: column; gap: 24px; }
    .pain-grid, .diff-grid { grid-template-columns: 1fr; }
    .hub-body { grid-template-columns: 1fr; }
    .free-tools-grid, .aud-grid { grid-template-columns: 1fr; }
    .pricing-grid { grid-template-columns: 1fr 1fr; }
    .problem, .hubs, .free-tools, .differentiators, .audiences, .pricing, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
  }
`;

const hubs = [
  {
    icon: "🗂️", bg: "#EEF2FF", name: "Work Hub", desc: "Project & team productivity",
    count: "13 features", color: "#4F46E5",
    features: [
      "Personalized dashboard", "Kanban task management", "Gantt chart timelines",
      "Time tracking per task", "Real-time team messaging", "Built-in video meetings",
      "Team file storage", "Reusable templates", "Unified calendar",
      "Analytics & activity logs", "AI-powered knowledge base", "Training management", "Retrospectives & archives"
    ]
  },
  {
    icon: "👥", bg: "#F0FDF4", name: "Clients Hub", desc: "CRM, sales & quality assurance",
    count: "11 features", color: "#10B981",
    features: [
      "Visual sales pipeline", "Operations overview", "Prospect outreach tracking",
      "Lead scoring", "Client directory", "Branded client portal",
      "Public intake form builder", "AI-assisted client onboarding", "Website inquiry intake",
      "Customer reviews", "QA checklists & templates"
    ]
  },
  {
    icon: "💰", bg: "#FFFBEB", name: "Finance Hub", desc: "Full financial management",
    count: "10 features", color: "#F59E0B",
    features: [
      "Real-time financial dashboard", "Professional invoicing", "Expense reports",
      "Budget planning", "Bank account transactions", "Revenue reporting",
      "Reconciliation", "OHADA-compliant accounting", "Multi-currency support", "Capital & shareholder management"
    ]
  },
  {
    icon: "🛠️", bg: "#FDF4FF", name: "Admin Hub", desc: "Control, HR & settings",
    count: "10 features", color: "#7C3AED",
    features: [
      "Team roles & permissions", "Workflow settings", "Feature access control",
      "Custom fields", "HR — employee directory & contracts", "Leave management",
      "External integrations", "Billing & subscription", "Storage management", "Website checker"
    ]
  },
];

const diffs = [
  { icon: <Globe size={24} />, title: "Bilingual EN/FR", desc: "Automatic language detection with a manual toggle. Built for teams across French- and English-speaking markets." },
  { icon: <BarChart2 size={24} />, title: "OHADA Accounting", desc: "The only all-in-one platform with OHADA-compliant accounting built in — essential for Francophone Africa." },
  { icon: <Users size={24} />, title: "Client Portal", desc: "Give clients a branded portal to log in, track projects, view invoices, and interact — no extra tool needed." },
  { icon: <Shield size={24} />, title: "Role-Based Security", desc: "Granular access control from member to admin to owner. Audit-logged actions on everything." },
  { icon: <Zap size={24} />, title: "Fully Modular", desc: "Enable only the features your business needs. No clutter. Scales with you as you grow." },
  { icon: <FileText size={24} />, title: "Multi-Organization", desc: "Manage multiple organizations from one account. Perfect for agencies, franchises, and holding groups." },
];

const audiences = [
  { emoji: "🏢", title: "Agencies & Consultancies", desc: "Manage projects, clients, invoices, and team performance in one workspace. Stop copy-pasting between Asana, Slack, and QuickBooks.", feats: ["Client portal for project visibility", "Sales pipeline + lead scoring", "Time tracking + invoicing connected"] },
  { emoji: "🚗", title: "Auto Dealers & Repair Shops", desc: "From service work orders to sales deals to payroll — run the whole operation without switching between systems.", feats: ["Financial dashboard + invoicing", "HR and team management", "Client directory + intake forms"] },
  { emoji: "💼", title: "Financial Service Providers", desc: "OHADA-compliant accounting, multi-currency, and client portal — built for teams operating across African and global markets.", feats: ["OHADA + multi-currency built in", "Bilingual EN/FR native", "Secure audit-logged records"] },
  { emoji: "🌍", title: "Teams Across FR/EN Markets", desc: "Whether your team is in Abidjan, Montréal, or Chicago — one platform that speaks both languages and handles both accounting standards.", feats: ["Auto language detection", "OHADA + IFRS support", "Multi-org, multi-currency"] },
];

const plans = [
  { name: "Starter", desc: "Individuals", price: "$0", mo: "forever free", annual: "", features: ["2 users", "50 tasks", "100MB storage", "Basic reports", "Email support"], btn: "Start Free", primary: false, featured: false },
  { name: "Basic", desc: "Small teams", price: "$39", mo: "per month", annual: "$32/mo annually", features: ["2 users", "500 tasks/month", "2 bank accounts", "50 invoices/month", "Standard reports", "Expense categorization"], btn: "Start Free Trial", primary: false, featured: false },
  { name: "Professional", desc: "Growing teams", price: "$90", mo: "per month", annual: "$72/mo annually", features: ["50 users", "Unlimited tasks", "3 bank accounts", "Unlimited invoices", "All reports & analytics", "OHADA accounting", "Client portal", "Priority support"], btn: "Start Free Trial", primary: true, featured: true },
  { name: "Enterprise", desc: "Large orgs", price: "Custom", mo: "contact sales", annual: "", features: ["Unlimited users", "2TB storage", "White-label", "SSO & SAML", "Dedicated support", "Custom features", "SLA guarantee"], btn: "Contact Sales", primary: false, featured: false },
];

export default function IrisWorkplacePage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", size: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openHub, setOpenHub] = useState(0);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      await fetch("https://formspree.io/f/mkjnlvwk", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "Iris Workplace" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisworkplace.com/auth/signup?ref=landing"; }, 2000);
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">
          <img src="/media/image/logo1.png" alt="Iris" style={{ height: "32px", width: "auto" }} />
          <span className="nav-product">Iris <span>Workplace</span></span>
        </div>
        <div className="nav-links">
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Free Tools</span>
        </div>
        <div className="nav-right">
          <span className="nav-login" onClick={() => window.open("https://irisworkplace.com/auth/login", "_blank")}>Log in</span>
          <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-dots" />
        <div className="hero-inner">
          <div className="hero-badge"><div className="hero-badge-dot" />5 hubs · 48+ features · EN/FR bilingual</div>
          <h1 className="hero-title">Run your entire business<br />from <span className="grad">one secure workspace.</span></h1>
          <p className="hero-sub">Projects, clients, finance, HR, and team communication — unified in Iris Workplace. Replace the tool stack. Keep the output.</p>
          <div className="hero-actions">
            <button className="btn-indigo" onClick={() => setShowModal(true)}>Start Free <ArrowRight size={16} /></button>
            <button className="btn-outline" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
          <div className="hero-note">Free forever on Starter · 15-day Professional trial · No credit card</div>
          <div className="hero-stats">
            {[["48+", "Features shipped"], ["5", "Hubs in one platform"], ["EN/FR", "Native bilingual"], ["$0", "To start"]].map(([v, l]) => (
              <div key={l}><div className="hero-stat-val">{v.includes("+") || v === "EN/FR" || v === "$0" ? <>{v}</> : <>{v}<span>+</span></>}</div><div className="hero-stat-lbl">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="replace-bar">
        <div className="replace-bar-inner">
          <span className="replace-label">Replaces</span>
          <div className="replace-items">
            {["Asana", "Slack", "QuickBooks", "BambooHR", "Notion", "DocuSign", "Toggl", "Salesforce CRM"].map(t => (
              <span key={t} className="replace-pill">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="problem">
        <div className="problem-inner">
          <div className="section-label">The problem</div>
          <h2 className="section-title">Your team runs on<br /><span>too many tools.</span></h2>
          <p className="section-sub">Every new tool adds a new subscription, a new login, and a new place where information lives in isolation.</p>
          <div className="pain-grid">
            {[
              { icon: "🔀", title: "Context switching kills productivity", desc: "Your team jumps between tasks in Asana, conversations in Slack, invoices in QuickBooks, and HR in BambooHR — nothing is connected." },
              { icon: "💸", title: "You're paying for redundancy", desc: "Seven subscriptions for seven tools that do seven separate things. Most teams spend $200–400/mo on a stack that still has gaps." },
              { icon: "🌍", title: "Global tools ignore your market", desc: "Standard accounting software doesn't speak OHADA. Most platforms are English-only. Your stack doesn't fit the market you're in." },
            ].map((p, i) => (
              <div className="pain-card" key={i}><span className="pain-icon">{p.icon}</span><h3>{p.title}</h3><p>{p.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="hubs">
        <div className="hubs-inner">
          <div className="section-label">The solution</div>
          <h2 className="section-title">Five hubs.<br /><span>One workspace.</span></h2>
          <p className="section-sub">Every hub connects to the others — tasks link to clients, invoices link to projects, HR links to time tracking. Data flows automatically.</p>
          <div className="hub-list">
            {hubs.map((hub, i) => (
              <div className="hub-row" key={i}>
                <div className="hub-header" onClick={() => setOpenHub(openHub === i ? -1 : i)}>
                  <div className="hub-header-left">
                    <div className="hub-icon" style={{ background: hub.bg }}><span>{hub.icon}</span></div>
                    <div><div className="hub-name">{hub.name}</div><div className="hub-desc">{hub.desc}</div></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="hub-count">{hub.count}</span>
                    <span style={{ color: "var(--gray-400)", fontSize: 18 }}>{openHub === i ? "−" : "+"}</span>
                  </div>
                </div>
                {openHub === i && (
                  <div className="hub-body">
                    {hub.features.map((f, j) => (
                      <div className="hub-feat" key={j}><Check size={13} className="hub-feat-ck" />{f}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="free-tools">
        <div className="free-tools-inner">
          <div className="section-label">Always free public tools</div>
          <h2 className="section-title">Two free tools.<br /><span>No account required.</span></h2>
          <p className="section-sub">E-Signature and file transfer — free forever, for anyone. Built to showcase Iris quality and bring people into the ecosystem.</p>
          <div className="free-tools-grid">
            <div className="free-tool-card" style={{ background: "linear-gradient(135deg, #059669 0%, #10B981 100%)" }}>
              <div className="free-tool-badge" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>✍️ Always Free</div>
              <h3>Iris E-Signature</h3>
              <p>Legally binding digital signatures on PDF and Word documents — no account, no software, completely free forever.</p>
              <div className="free-tool-feats">
                {["Upload PDF or Word, sign anywhere", "Draw, type, or place signatures", "Add text and dates to any position", "Email signed doc to any recipient", "Bilingual EN/FR"].map((f, i) => (
                  <div className="free-tool-feat" key={i}><Check size={14} />{f}</div>
                ))}
              </div>
              <button className="free-tool-btn" style={{ color: "#059669" }} onClick={() => window.open("https://irisworkplace.com/esign", "_blank")}>Sign a Document Free <ArrowRight size={14} /></button>
            </div>
            <div className="free-tool-card" style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}>
              <div className="free-tool-badge" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>📤 Always Free</div>
              <h3>Iris Send</h3>
              <p>Send files up to 25 GB via a secure shareable link. Set an expiry date, add password protection, and share in seconds.</p>
              <div className="free-tool-feats">
                {["Up to 25 GB per transfer", "Password-protected links", "Set expiry date on any transfer", "15 free transfers per month", "Clean branded download page"].map((f, i) => (
                  <div className="free-tool-feat" key={i}><Check size={14} />{f}</div>
                ))}
              </div>
              <button className="free-tool-btn" style={{ color: "#4F46E5" }} onClick={() => window.open("https://irisworkplace.com/send", "_blank")}>Send a File Free <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="differentiators">
        <div className="diff-inner">
          <div className="section-label">Why Iris Workplace</div>
          <h2 className="section-title">Built different.<br /><span>On purpose.</span></h2>
          <div className="diff-grid">
            {diffs.map((d, i) => (
              <div className="diff-card" key={i}><span className="diff-icon">{d.icon}</span><h3>{d.title}</h3><p>{d.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="audiences">
        <div className="aud-inner">
          <div className="section-label">Who it's for</div>
          <h2 className="section-title">Built for service businesses<br /><span>of every kind.</span></h2>
          <div className="aud-grid">
            {audiences.map((a, i) => (
              <div className="aud-card" key={i}>
                <span className="aud-emoji">{a.emoji}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div className="aud-feats">
                  {a.feats.map((f, j) => <div className="aud-feat" key={j}><Check size={13} />{f}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-inner">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Simple pricing.<br />Start free.</h2>
          <p style={{ fontSize: 16, color: "var(--gray-500)", marginTop: 8 }}>All paid plans include a 15-day free trial. No credit card required.</p>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="price-badge">Most Popular</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-desc">{plan.desc}</div>
                <div className="price-amount">{plan.price === "Custom" ? "Custom" : <>{plan.price !== "$0" && <sup>$</sup>}{plan.price.replace("$","")}</>}</div>
                <div className="price-mo">{plan.mo}</div>
                <div className="price-annual">{plan.annual}</div>
                <div className="price-div" />
                {plan.features.map((f, j) => <div className="price-feat" key={j}><span className="price-ck">✓</span>{f}</div>)}
                <button className={`price-btn ${plan.primary ? "primary" : "secondary"}`}
                  onClick={() => plan.name === "Enterprise" ? window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank") : setShowModal(true)}>
                  {plan.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Create your free workspace today.</h2>
          <p className="cta-sub">Join teams running their entire business on Iris Workplace. Free to start, easy to scale.</p>
          <div className="cta-btns">
            <button className="cta-btn-main" onClick={() => setShowModal(true)}>Start Free</button>
            <button className="cta-btn-sec" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Workplace</strong> — by Iris Secure Technology Solutions · irisworkplace.com</div>
        <div className="footer-links"><span className="f-lnk">Privacy</span><span className="f-lnk">Terms</span><span className="f-lnk">Contact</span></div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={16} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Start Your Free Workspace</div>
                <div className="modal-s">15-day Professional trial. All 5 hubs unlocked. No credit card needed.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Company Name</label><input className="f-input" placeholder="Your company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Work Email</label><input className="f-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="f-group">
                  <label className="f-label">Team Size</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.size} onChange={e => setForm({...form, size: e.target.value})}>
                    <option value="">Select size</option>
                    <option>Just me</option><option>2–10</option><option>11–50</option><option>51–200</option><option>200+</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Workspace →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>
                <div className="success-h">Workspace ready!</div>
                <p className="success-p">Check <strong style={{ color: "var(--indigo)" }}>{form.email}</strong> for your login link.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
