import { useState, useEffect } from "react";
import { Check, X, ArrowRight, BarChart2, FileText, CreditCard, Users, TrendingUp, Globe, Zap, Shield, DollarSign } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --white: #FFFFFF; --bg: #F8FAFC; --gray-100: #F1F5F9; --gray-200: #E2E8F0;
    --gray-300: #CBD5E1; --gray-400: #94A3B8; --gray-500: #64748B;
    --gray-700: #334155; --gray-900: #0F172A;
    --teal: #0D9488; --teal-light: #14B8A6; --teal-lighter: #2DD4BF;
    --teal-bg: rgba(13,148,136,0.07); --teal-border: rgba(13,148,136,0.18);
    --teal-dark: #0F766E; --green: #16A34A; --amber: #D97706; --red: #DC2626;
    --border: #E2E8F0;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--gray-900); overflow-x: hidden; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(13,148,136,0.35); } 50% { box-shadow: 0 0 0 10px rgba(13,148,136,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 60px; padding: 0 48px; background: rgba(248,250,252,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .nav-brand { font-size: 15px; font-weight: 700; color: var(--gray-900); display: flex; align-items: center; gap: 10px; }
  .nav-brand span { color: var(--teal); }
  .nav-links { display: flex; gap: 28px; }
  .nav-lnk { font-size: 13px; font-weight: 500; color: var(--gray-500); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--gray-900); }
  .nav-cta { background: var(--teal); color: white; padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; box-shadow: 0 2px 8px rgba(13,148,136,0.3); }
  .nav-cta:hover { background: var(--teal-light); transform: translateY(-1px); }

  .hero { min-height: 100vh; padding: 100px 48px 80px; position: relative; overflow: hidden; display: flex; align-items: center; background: var(--white); }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,148,136,0.05) 0%, transparent 70%); pointer-events: none; }
  .hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--gray-200) 1px, transparent 1px); background-size: 24px 24px; opacity: 0.6; mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%); pointer-events: none; }
  .hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1100px; margin: 0 auto; width: 100%; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: var(--teal-bg); border: 1px solid var(--teal-border); color: var(--teal-dark); padding: 5px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 22px; animation: fadeUp 0.5s ease both; }
  .hero-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); animation: blink 2s infinite; }
  .hero-title { font-size: clamp(40px, 5.5vw, 64px); font-weight: 800; line-height: 1.1; color: var(--gray-900); margin-bottom: 18px; letter-spacing: -0.02em; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title .teal { color: var(--teal); }
  .hero-sub { font-size: 17px; color: var(--gray-500); line-height: 1.75; max-width: 440px; margin-bottom: 32px; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-industries { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; animation: fadeUp 0.6s 0.25s ease both; }
  .ind-pill { background: var(--gray-100); border: 1px solid var(--border); color: var(--gray-500); font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 4px; }
  .hero-actions { display: flex; gap: 12px; margin-bottom: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-teal { background: var(--teal); color: white; padding: 13px 26px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.25s; animation: pulse 2.5s infinite; box-shadow: 0 4px 14px rgba(13,148,136,0.35); display: flex; align-items: center; gap: 7px; }
  .btn-teal:hover { background: var(--teal-light); transform: translateY(-2px); }
  .btn-ghost { background: white; color: var(--gray-700); padding: 11px 22px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; border: 1.5px solid var(--border); transition: all 0.25s; }
  .btn-ghost:hover { border-color: var(--teal); color: var(--teal); }
  .hero-note { font-size: 12px; color: var(--gray-400); animation: fadeUp 0.6s 0.4s ease both; }

  .biz-card { background: white; border-radius: 16px; box-shadow: 0 20px 56px rgba(0,0,0,0.08); border: 1px solid var(--border); overflow: hidden; animation: scaleIn 0.7s 0.3s ease both; }
  .bc-head { background: linear-gradient(135deg, var(--teal-dark), var(--teal)); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
  .bc-title { font-size: 13px; font-weight: 700; color: white; }
  .bc-live { display: flex; align-items: center; gap: 5px; font-size: 11px; color: rgba(255,255,255,0.7); }
  .bc-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; animation: blink 2s infinite; }
  .bc-metrics { display: grid; grid-template-columns: repeat(2, 1fr); border-bottom: 1px solid var(--border); }
  .bcm { padding: 14px 18px; border-right: 1px solid var(--border); }
  .bcm:last-child { border-right: none; }
  .bcm-lbl { font-size: 10px; font-weight: 600; letter-spacing: 0.06em; color: var(--gray-400); text-transform: uppercase; margin-bottom: 4px; }
  .bcm-val { font-size: 24px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.02em; }
  .bcm-val.teal { color: var(--teal); }
  .bcm-val.green { color: var(--green); }
  .bcm-delta { font-size: 11px; color: var(--green); margin-top: 2px; font-weight: 600; }
  .bc-invoices { padding: 14px 20px; }
  .bc-inv-lbl { font-size: 10px; font-weight: 600; letter-spacing: 0.06em; color: var(--gray-400); text-transform: uppercase; margin-bottom: 10px; display: flex; justify-content: space-between; }
  .bc-inv { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid rgba(0,0,0,0.04); }
  .bc-inv:last-child { border-bottom: none; }
  .bc-inv-left { display: flex; align-items: center; gap: 10px; }
  .bc-inv-icon { width: 30px; height: 30px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
  .bc-inv-client { font-size: 13px; font-weight: 600; color: var(--gray-900); }
  .bc-inv-date { font-size: 11px; color: var(--gray-400); margin-top: 1px; }
  .bc-inv-right { text-align: right; }
  .bc-inv-amt { font-size: 14px; font-weight: 700; color: var(--gray-700); }
  .bc-inv-status { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 3px; margin-top: 2px; display: inline-block; }
  .bc-inv-status.paid { background: rgba(22,163,74,0.1); color: var(--green); }
  .bc-inv-status.sent { background: rgba(13,148,136,0.1); color: var(--teal); }
  .bc-inv-status.overdue { background: rgba(220,38,38,0.1); color: var(--red); }
  .bc-footer { background: var(--gray-100); padding: 12px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .bc-foot-lbl { font-size: 11px; color: var(--gray-400); font-weight: 500; }
  .bc-foot-val { font-size: 20px; font-weight: 800; color: var(--teal); letter-spacing: -0.02em; }

  .s-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--teal); text-transform: uppercase; margin-bottom: 12px; }
  .s-title { font-size: clamp(30px, 4vw, 44px); font-weight: 800; line-height: 1.1; color: var(--gray-900); margin-bottom: 12px; letter-spacing: -0.02em; }
  .s-title span { color: var(--teal); }
  .s-sub { font-size: 16px; color: var(--gray-500); line-height: 1.7; max-width: 500px; }

  .core { background: var(--bg); padding: 90px 48px; border-top: 1px solid var(--border); }
  .core-inner { max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
  .feat-card { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 24px; transition: all 0.25s; }
  .feat-card:hover { border-color: var(--teal-border); box-shadow: 0 6px 20px rgba(13,148,136,0.07); transform: translateY(-2px); }
  .feat-icon { color: var(--teal); margin-bottom: 12px; display: block; }
  .feat-card h3 { font-size: 15px; font-weight: 700; color: var(--gray-900); margin-bottom: 6px; }
  .feat-card p { font-size: 13px; color: var(--gray-500); line-height: 1.6; }

  .verticals { background: white; padding: 90px 48px; border-top: 1px solid var(--border); }
  .vert-inner { max-width: 1100px; margin: 0 auto; }
  .vert-note { display: inline-flex; align-items: center; gap: 8px; background: var(--teal-bg); border: 1px solid var(--teal-border); color: var(--teal-dark); padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
  .vert-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 36px; }
  .vert-pill { background: var(--bg); border: 1.5px solid var(--border); border-radius: 10px; padding: 16px; text-align: center; transition: all 0.25s; cursor: default; }
  .vert-pill:hover { border-color: var(--teal-border); background: var(--teal-bg); }
  .vert-pill-emoji { font-size: 22px; display: block; margin-bottom: 6px; }
  .vert-pill-name { font-size: 12px; font-weight: 600; color: var(--gray-700); }

  .pricing { background: var(--bg); padding: 90px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 960px; margin: 0 auto; text-align: center; }
  .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 44px; text-align: left; }
  .price-card { background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 24px; position: relative; transition: all 0.3s; }
  .price-card:hover { border-color: var(--teal-border); box-shadow: 0 6px 24px rgba(13,148,136,0.08); }
  .price-card.featured { border-color: var(--teal); box-shadow: 0 6px 24px rgba(13,148,136,0.15); }
  .price-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: var(--teal); color: white; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 100px; white-space: nowrap; }
  .price-name { font-size: 15px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
  .price-desc { font-size: 11px; color: var(--gray-400); margin-bottom: 12px; }
  .price-amount { font-size: 38px; font-weight: 800; color: var(--gray-900); line-height: 1; margin-bottom: 3px; letter-spacing: -0.03em; }
  .price-amount sup { font-size: 16px; vertical-align: top; margin-top: 9px; }
  .price-mo { font-size: 11px; color: var(--gray-400); margin-bottom: 6px; }
  .price-annual { font-size: 11px; color: var(--green); font-weight: 600; margin-bottom: 14px; min-height: 16px; }
  .price-div { height: 1px; background: var(--border); margin: 12px 0; }
  .price-feat { display: flex; align-items: flex-start; gap: 6px; font-size: 11px; color: var(--gray-600); padding: 3px 0; }
  .price-ck { color: var(--green); font-weight: 700; flex-shrink: 0; font-size: 12px; }
  .price-btn { width: 100%; padding: 10px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 12px; transition: all 0.25s; }
  .price-btn.primary { background: var(--teal); color: white; }
  .price-btn.primary:hover { background: var(--teal-light); }
  .price-btn.secondary { background: white; color: var(--gray-700); border: 1.5px solid var(--border); }
  .price-btn.secondary:hover { border-color: var(--teal); color: var(--teal); }

  .cta-section { background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 60%, var(--teal-lighter) 100%); padding: 80px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px; }
  .cta-inner { position: relative; z-index: 2; max-width: 520px; margin: 0 auto; }
  .cta-title { font-size: clamp(30px, 4.5vw, 46px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 14px; letter-spacing: -0.02em; }
  .cta-sub { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 28px; }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .cta-btn { background: white; color: var(--teal-dark); padding: 13px 30px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; font-weight: 700; transition: all 0.25s; }
  .cta-btn:hover { background: var(--bg); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.85); padding: 11px 26px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; border: 1.5px solid rgba(255,255,255,0.35); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; color: white; }

  .footer { background: var(--gray-900); padding: 26px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
  .footer-copy { font-size: 12px; color: var(--gray-500); }
  .footer-copy strong { color: var(--teal-lighter); }
  .f-lnk { font-size: 12px; color: var(--gray-500); cursor: pointer; margin-left: 20px; transition: color 0.2s; }
  .f-lnk:hover { color: var(--gray-300); }

  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(15,23,42,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal-box { background: white; border-radius: 18px; padding: 44px; max-width: 440px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 20px 56px rgba(0,0,0,0.18); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--gray-100); border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--gray-500); }
  .modal-x:hover { background: var(--gray-200); }
  .modal-h { font-size: 22px; font-weight: 800; color: var(--gray-900); margin-bottom: 5px; }
  .modal-s { color: var(--gray-500); font-size: 13px; margin-bottom: 22px; }
  .f-group { margin-bottom: 13px; }
  .f-label { font-size: 11px; font-weight: 700; letter-spacing: 0.07em; color: var(--teal); margin-bottom: 5px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 10px 13px; border-radius: 8px; background: var(--bg); border: 1.5px solid var(--border); font-size: 13px; font-family: 'DM Sans',sans-serif; color: var(--gray-900); outline: none; transition: border-color 0.2s; }
  .f-input:focus { border-color: var(--teal); background: white; }
  .f-input::placeholder { color: var(--gray-400); }
  .f-btn { width: 100%; background: var(--teal); color: white; padding: 12px; border-radius: 8px; border: none; cursor: pointer; font-weight: 700; font-size: 14px; margin-top: 6px; transition: all 0.25s; }
  .f-btn:hover { background: var(--teal-light); }
  .success-wrap { text-align: center; padding: 16px 0; }
  .success-h { font-size: 22px; font-weight: 800; color: var(--gray-900); margin-bottom: 8px; }
  .success-p { color: var(--gray-500); font-size: 13px; line-height: 1.6; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; } .nav-links { display: none; }
    .hero { padding: 90px 20px 60px; } .hero-layout { grid-template-columns: 1fr; }
    .biz-card { display: none; }
    .feat-grid { grid-template-columns: 1fr 1fr; }
    .vert-grid { grid-template-columns: repeat(2, 1fr); }
    .pricing-grid { grid-template-columns: 1fr 1fr; }
    .core, .verticals, .pricing, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; padding: 22px 20px; }
    .modal-box { padding: 32px 20px; }
  }
`;

const invoices = [
  { emoji: "🏢", bg: "#F0FDF4", client: "Acme Corp", date: "Due Sep 20", amt: "$2,400", status: "sent" },
  { emoji: "💼", bg: "#EFF6FF", client: "TechStart Inc", date: "Paid Sep 12", amt: "$1,800", status: "paid" },
  { emoji: "🏪", bg: "#FDF4FF", client: "Main St. Shop", date: "Overdue", amt: "$650", status: "overdue" },
];

const feats = [
  { icon: <FileText size={22} />, title: "Professional Invoicing", desc: "Create, send, and track invoices with QR code payment links and email delivery. Get paid faster." },
  { icon: <CreditCard size={22} />, title: "Iris Pay Integration", desc: "Accept card, mobile money, and bank transfers in 18+ countries. Payouts to your local account." },
  { icon: <BarChart2 size={22} />, title: "P&L & Financial Reports", desc: "Real-time profit and loss, cash flow, and expense reports. Know your numbers at any moment." },
  { icon: <TrendingUp size={22} />, title: "Bank Sync via Plaid", desc: "Connect your bank accounts. Transactions imported and categorized automatically." },
  { icon: <Globe size={22} />, title: "Multi-Currency", desc: "Invoice in any currency with automatic conversion. Built for businesses operating across borders." },
  { icon: <Users size={22} />, title: "Team Access", desc: "Role-based access for your team. Finance team sees invoices. Admins see everything." },
  { icon: <Zap size={22} />, title: "Expense Tracking", desc: "Capture and categorize every business expense. Attach receipts. Export for your accountant." },
  { icon: <Shield size={22} />, title: "OHADA Accounting", desc: "Full OHADA-compliant accounting built in — essential for businesses in Francophone Africa." },
  { icon: <DollarSign size={22} />, title: "Budget Planning", desc: "Set monthly budgets, track actuals, and get alerted before you overspend." },
];

const verticals = [
  { e: "🍞", n: "Bakery" }, { e: "🍽️", n: "Restaurant" }, { e: "🔧", n: "Auto Repair" },
  { e: "⛪", n: "Church" }, { e: "🕌", n: "Mosque" }, { e: "🕍", n: "Synagogue" },
  { e: "🛕", n: "Hindu Temple" }, { e: "⛩️", n: "Gurdwara" }, { e: "🚗", n: "Car Dealer" },
  { e: "🎙️", n: "Recording Studio" }, { e: "👤", n: "Personal" }, { e: "🏢", n: "General" },
];

const plans = [
  { name: "Starter", desc: "Solopreneurs", price: "$0", mo: "forever free", annual: "", features: ["1 user", "50 transactions/mo", "1 bank account", "10 invoices/mo", "Basic reports", "Email support"], btn: "Start Free", primary: false, featured: false },
  { name: "Basic", desc: "Small teams", price: "$39", mo: "per month", annual: "$32/mo annually", features: ["2 users", "500 transactions/mo", "2 bank accounts", "50 invoices/mo", "Standard reports", "Expense categorization"], btn: "Start Free Trial", primary: false, featured: false },
  { name: "Professional", desc: "Growing teams", price: "$79", mo: "per month", annual: "$64/mo annually — Most Popular", features: ["5 users", "Unlimited transactions", "3 bank accounts", "Unlimited invoices", "All reports & analytics", "OHADA accounting", "Multi-currency", "Priority support"], btn: "Start Free Trial", primary: true, featured: true },
  { name: "Business", desc: "Established teams", price: "$129", mo: "per month", annual: "$104/mo annually", features: ["10 users", "Unlimited everything", "Multi-organization", "Approval workflows", "API access", "Custom branding", "Phone support"], btn: "Start Free Trial", primary: false, featured: false },
];

export default function GeneralBusinessPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", industry: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      await fetch("https://formspree.io/f/xeaqbdov", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "General Business" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?ref=landing"; }, 2000);
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-brand">
          <img src="/media/image/logo1.png" alt="Iris Financial" style={{ height: "28px", width: "auto" }} />
          <span>Iris <span>Financial</span></span>
        </div>
        <div className="nav-links">
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Industries</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-dots" />
        <div className="hero-layout">
          <div>
            <div className="hero-badge"><div className="hero-badge-dot" />For Any Business · Any Industry</div>
            <h1 className="hero-title">Complete financial<br />management for <span className="teal">any business.</span></h1>
            <p className="hero-sub">Invoicing, bank sync, expense tracking, multi-currency payments, and financial reports — one platform that works for every kind of business. Free to start.</p>
            <div className="hero-industries">
              {["Consultancy", "Freelancer", "Retail", "Services", "E-commerce", "Healthcare", "Legal", "Education"].map((i) => (
                <span key={i} className="ind-pill">{i}</span>
              ))}
            </div>
            <div className="hero-actions">
              <button className="btn-teal" onClick={() => setShowModal(true)}>Start Free <ArrowRight size={15} /></button>
              <button className="btn-ghost" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule Demo</button>
            </div>
            <div className="hero-note">Free on Starter · 15-day Professional trial · No credit card</div>
          </div>
          <div>
            <div className="biz-card">
              <div className="bc-head">
                <span className="bc-title">Business Dashboard · September</span>
                <div className="bc-live"><div className="bc-live-dot" />Live</div>
              </div>
              <div className="bc-metrics">
                <div className="bcm"><div className="bcm-lbl">Revenue</div><div className="bcm-val teal">$18,400</div><div className="bcm-delta">↑ 12% vs last month</div></div>
                <div className="bcm"><div className="bcm-lbl">Expenses</div><div className="bcm-val">$6,820</div><div className="bcm-delta" style={{ color: "var(--amber)" }}>37% of revenue</div></div>
                <div className="bcm"><div className="bcm-lbl">Net Profit</div><div className="bcm-val green">$11,580</div><div className="bcm-delta">↑ Best month</div></div>
                <div className="bcm"><div className="bcm-lbl">Outstanding</div><div className="bcm-val" style={{ color: "var(--red)" }}>$3,050</div><div className="bcm-delta" style={{ color: "var(--red)" }}>2 invoices overdue</div></div>
              </div>
              <div className="bc-invoices">
                <div className="bc-inv-lbl"><span>Recent Invoices</span><span>Amount</span></div>
                {invoices.map((inv, i) => (
                  <div className="bc-inv" key={i}>
                    <div className="bc-inv-left">
                      <div className="bc-inv-icon" style={{ background: inv.bg }}>{inv.emoji}</div>
                      <div><div className="bc-inv-client">{inv.client}</div><div className="bc-inv-date">{inv.date}</div></div>
                    </div>
                    <div className="bc-inv-right">
                      <div className="bc-inv-amt">{inv.amt}</div>
                      <div className={`bc-inv-status ${inv.status}`}>{inv.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bc-footer">
                <span className="bc-foot-lbl">Net Profit This Month</span>
                <span className="bc-foot-val">$11,580</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="core">
        <div className="core-inner">
          <div className="s-label">Core features</div>
          <h2 className="s-title">Everything your business needs.<br /><span>Nothing it doesn't.</span></h2>
          <p className="s-sub">Start with the basics. Add industry-specific features when you need them. Iris Financial scales with every kind of business.</p>
          <div className="feat-grid">
            {feats.map((f, i) => (
              <div className="feat-card" key={i}><span className="feat-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="verticals">
        <div className="vert-inner">
          <div className="s-label">Industry verticals</div>
          <h2 className="s-title">Built for your industry.<br /><span>Not just any business.</span></h2>
          <p className="s-sub">Iris Financial has industry-specific tools for 12 verticals — from bakeries to mosques to recording studios. Start with General and switch to your vertical anytime.</p>
          <div className="vert-note">✓ All verticals included — switch anytime after signup</div>
          <div className="vert-grid">
            {verticals.map((v, i) => (
              <div className="vert-pill" key={i}><span className="vert-pill-emoji">{v.e}</span><span className="vert-pill-name">{v.n}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-inner">
          <div className="s-label">Pricing</div>
          <h2 className="s-title">Start free.<br /><span>Grow from there.</span></h2>
          <p style={{ fontSize: 15, color: "var(--gray-500)", marginTop: 8 }}>All paid plans include a 15-day free trial. No credit card required.</p>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="price-badge">Most Popular</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-desc">{plan.desc}</div>
                <div className="price-amount">{plan.price === "$0" ? "Free" : <><sup>$</sup>{plan.price.replace("$","")}</>}</div>
                <div className="price-mo">{plan.mo}</div>
                <div className="price-annual">{plan.annual}</div>
                <div className="price-div" />
                {plan.features.map((f, j) => <div className="price-feat" key={j}><span className="price-ck">✓</span>{f}</div>)}
                <button className={`price-btn ${plan.primary ? "primary" : "secondary"}`} onClick={() => setShowModal(true)}>{plan.btn}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Start managing your finances today.</h2>
          <p className="cta-sub">Free to start. Set up in 15 minutes. Works for any business in any market.</p>
          <div className="cta-btns">
            <button className="cta-btn" onClick={() => setShowModal(true)}>Start Free</button>
            <button className="cta-btn-sec" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Financial</strong> — irisfinancial.tech</div>
        <div><span className="f-lnk">Privacy</span><span className="f-lnk">Terms</span><span className="f-lnk">Contact</span></div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={15} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Start Your Free Account</div>
                <div className="modal-s">Set up in 15 minutes. First financial report ready today.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Business Name</label><input className="f-input" placeholder="Your business" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Email</label><input className="f-input" type="email" placeholder="you@business.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="f-group">
                  <label className="f-label">Industry</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}>
                    <option value="">Select your industry</option>
                    <option>Consulting / Services</option><option>Freelancer / Contractor</option>
                    <option>Retail / E-commerce</option><option>Healthcare</option>
                    <option>Legal / Law Firm</option><option>Education / Tutoring</option>
                    <option>Technology / SaaS</option><option>Other</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div style={{ fontSize: 44, marginBottom: 12 }}>🚀</div>
                <div className="success-h">Account created!</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--teal)" }}>{form.email}</strong>. Your first report is waiting.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
