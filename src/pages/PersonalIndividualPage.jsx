import { useState, useEffect } from "react";
import { Check, X, ArrowRight, Target, TrendingUp, CreditCard, PieChart, Bell, Shield, Smartphone, BarChart2 } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --white: #FFFFFF; --bg: #FAFAFA; --gray-100: #F3F4F6; --gray-200: #E5E7EB;
    --gray-300: #D1D5DB; --gray-400: #9CA3AF; --gray-500: #6B7280;
    --gray-700: #374151; --gray-900: #111827;
    --violet: #7C3AED; --violet-light: #8B5CF6; --violet-lighter: #A78BFA;
    --violet-bg: rgba(124,58,237,0.07); --violet-border: rgba(124,58,237,0.18);
    --green: #10B981; --amber: #F59E0B; --red: #EF4444; --border: #E5E7EB;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--gray-900); overflow-x: hidden; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.35); } 50% { box-shadow: 0 0 0 10px rgba(124,58,237,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes progress { from { width: 0; } to { width: var(--w); } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 60px; padding: 0 48px; background: rgba(250,250,250,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .nav-brand { font-size: 15px; font-weight: 700; color: var(--gray-900); display: flex; align-items: center; gap: 10px; }
  .nav-brand span { color: var(--violet); }
  .nav-links { display: flex; gap: 28px; }
  .nav-lnk { font-size: 13px; font-weight: 500; color: var(--gray-500); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--gray-900); }
  .nav-cta { background: var(--violet); color: white; padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; box-shadow: 0 2px 8px rgba(124,58,237,0.3); }
  .nav-cta:hover { background: var(--violet-light); transform: translateY(-1px); }

  .hero { min-height: 100vh; padding: 100px 48px 80px; position: relative; overflow: hidden; display: flex; align-items: center; background: var(--white); }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.05) 0%, transparent 70%); pointer-events: none; }
  .hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--gray-200) 1px, transparent 1px); background-size: 24px 24px; opacity: 0.7; mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%); pointer-events: none; }
  .hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1100px; margin: 0 auto; width: 100%; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: var(--violet-bg); border: 1px solid var(--violet-border); color: var(--violet); padding: 5px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; margin-bottom: 22px; animation: fadeUp 0.5s ease both; }
  .hero-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--violet); animation: blink 2s infinite; }
  .hero-title { font-size: clamp(40px, 5.5vw, 64px); font-weight: 800; line-height: 1.1; color: var(--gray-900); margin-bottom: 18px; letter-spacing: -0.02em; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title .violet { color: var(--violet); }
  .hero-sub { font-size: 17px; color: var(--gray-500); line-height: 1.75; max-width: 440px; margin-bottom: 32px; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display: flex; gap: 12px; margin-bottom: 16px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-violet { background: var(--violet); color: white; padding: 13px 26px; border-radius: 10px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.25s; animation: pulse 2.5s infinite; box-shadow: 0 4px 14px rgba(124,58,237,0.35); display: flex; align-items: center; gap: 7px; }
  .btn-violet:hover { background: var(--violet-light); transform: translateY(-2px); }
  .btn-ghost { background: white; color: var(--gray-700); padding: 11px 22px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; border: 1.5px solid var(--border); transition: all 0.25s; }
  .btn-ghost:hover { border-color: var(--violet); color: var(--violet); }
  .hero-note { font-size: 12px; color: var(--gray-400); animation: fadeUp 0.6s 0.4s ease both; }

  .dash-card { background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); border: 1px solid var(--border); overflow: hidden; animation: scaleIn 0.7s 0.3s ease both; }
  .dc-head { background: var(--violet); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
  .dc-title { font-size: 13px; font-weight: 700; color: white; letter-spacing: -0.01em; }
  .dc-date { font-size: 11px; color: rgba(255,255,255,0.65); }
  .dc-metrics { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--border); }
  .dcm { padding: 14px 16px; border-right: 1px solid var(--border); }
  .dcm:last-child { border-right: none; }
  .dcm-lbl { font-size: 10px; font-weight: 600; letter-spacing: 0.06em; color: var(--gray-400); text-transform: uppercase; margin-bottom: 4px; }
  .dcm-val { font-size: 22px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.02em; }
  .dcm-val.green { color: var(--green); }
  .dcm-val.violet { color: var(--violet); }
  .dcm-delta { font-size: 11px; color: var(--green); margin-top: 2px; font-weight: 600; }
  .dc-goals { padding: 14px 20px; }
  .dc-goal-lbl { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--gray-400); text-transform: uppercase; margin-bottom: 10px; }
  .dc-goal { margin-bottom: 12px; }
  .dc-goal-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
  .dc-goal-name { font-size: 13px; font-weight: 600; color: var(--gray-900); }
  .dc-goal-pct { font-size: 12px; font-weight: 700; color: var(--violet); }
  .dc-goal-bar { height: 6px; background: var(--gray-100); border-radius: 100px; overflow: hidden; }
  .dc-goal-fill { height: 100%; background: var(--violet); border-radius: 100px; transition: width 1.5s ease; }
  .dc-txns { padding: 0 20px 14px; }
  .dc-txn { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid rgba(0,0,0,0.04); }
  .dc-txn:last-child { border-bottom: none; }
  .dc-txn-left { display: flex; align-items: center; gap: 10px; }
  .dc-txn-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .dc-txn-name { font-size: 13px; font-weight: 600; color: var(--gray-900); }
  .dc-txn-cat { font-size: 11px; color: var(--gray-400); margin-top: 1px; }
  .dc-txn-val { font-size: 14px; font-weight: 700; }
  .dc-txn-val.out { color: var(--gray-700); }
  .dc-txn-val.in { color: var(--green); }

  .s-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--violet); text-transform: uppercase; margin-bottom: 12px; }
  .s-title { font-size: clamp(30px, 4vw, 44px); font-weight: 800; line-height: 1.1; color: var(--gray-900); margin-bottom: 12px; letter-spacing: -0.02em; }
  .s-title span { color: var(--violet); }
  .s-sub { font-size: 16px; color: var(--gray-500); line-height: 1.7; max-width: 500px; }

  .pain { background: var(--bg); padding: 90px 48px; border-top: 1px solid var(--border); }
  .pain-inner { max-width: 1000px; margin: 0 auto; }
  .pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
  .pain-card { background: white; border: 1px solid var(--border); border-radius: 14px; padding: 26px; transition: all 0.25s; }
  .pain-card:hover { border-color: var(--violet-border); box-shadow: 0 6px 20px rgba(124,58,237,0.08); }
  .pain-emoji { font-size: 26px; margin-bottom: 12px; display: block; }
  .pain-card h3 { font-size: 16px; font-weight: 700; color: var(--gray-900); margin-bottom: 7px; }
  .pain-card p { font-size: 13px; color: var(--gray-500); line-height: 1.65; }

  .features { background: white; padding: 90px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
  .feat-card { background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: 26px; transition: all 0.25s; }
  .feat-card:hover { border-color: var(--violet-border); box-shadow: 0 6px 20px rgba(124,58,237,0.07); transform: translateY(-3px); }
  .feat-icon { color: var(--violet); margin-bottom: 12px; display: block; }
  .feat-card h3 { font-size: 15px; font-weight: 700; color: var(--gray-900); margin-bottom: 6px; }
  .feat-card p { font-size: 13px; color: var(--gray-500); line-height: 1.6; }

  .pricing { background: var(--bg); padding: 90px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 820px; margin: 0 auto; text-align: center; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 44px; text-align: left; }
  .price-card { background: white; border: 1.5px solid var(--border); border-radius: 16px; padding: 28px; position: relative; transition: all 0.3s; }
  .price-card:hover { border-color: var(--violet-border); box-shadow: 0 8px 28px rgba(124,58,237,0.1); }
  .price-card.featured { border-color: var(--violet); box-shadow: 0 8px 28px rgba(124,58,237,0.15); }
  .price-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: var(--violet); color: white; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 100px; white-space: nowrap; }
  .price-name { font-size: 16px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
  .price-amount { font-size: 42px; font-weight: 800; color: var(--gray-900); line-height: 1; margin: 12px 0 3px; letter-spacing: -0.03em; }
  .price-amount sup { font-size: 18px; vertical-align: top; margin-top: 10px; }
  .price-mo { font-size: 12px; color: var(--gray-400); margin-bottom: 18px; }
  .price-div { height: 1px; background: var(--border); margin: 14px 0; }
  .price-feat { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; color: var(--gray-600); padding: 4px 0; }
  .price-ck { color: var(--green); font-weight: 700; flex-shrink: 0; font-size: 13px; }
  .price-btn { width: 100%; padding: 11px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; margin-top: 14px; transition: all 0.25s; }
  .price-btn.primary { background: var(--violet); color: white; }
  .price-btn.primary:hover { background: var(--violet-light); }
  .price-btn.secondary { background: white; color: var(--gray-700); border: 1.5px solid var(--border); }
  .price-btn.secondary:hover { border-color: var(--violet); color: var(--violet); }

  .cta-section { background: linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #8B5CF6 100%); padding: 80px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px; }
  .cta-inner { position: relative; z-index: 2; max-width: 520px; margin: 0 auto; }
  .cta-title { font-size: clamp(30px, 4.5vw, 46px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 14px; letter-spacing: -0.02em; }
  .cta-sub { font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 28px; }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .cta-btn { background: white; color: var(--violet); padding: 13px 30px; border-radius: 10px; border: none; cursor: pointer; font-size: 14px; font-weight: 700; transition: all 0.25s; }
  .cta-btn:hover { background: var(--bg); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.85); padding: 11px 26px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; border: 1.5px solid rgba(255,255,255,0.35); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; color: white; }

  .footer { background: var(--gray-900); padding: 28px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
  .footer-copy { font-size: 12px; color: var(--gray-500); }
  .footer-copy strong { color: var(--violet-lighter); }
  .f-lnk { font-size: 12px; color: var(--gray-500); cursor: pointer; margin-left: 20px; transition: color 0.2s; }
  .f-lnk:hover { color: var(--gray-300); }

  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(17,24,39,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal-box { background: white; border-radius: 18px; padding: 44px; max-width: 440px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 20px 56px rgba(0,0,0,0.18); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--gray-100); border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--gray-500); }
  .modal-x:hover { background: var(--gray-200); }
  .modal-h { font-size: 22px; font-weight: 800; color: var(--gray-900); margin-bottom: 5px; }
  .modal-s { color: var(--gray-500); font-size: 13px; margin-bottom: 22px; }
  .f-group { margin-bottom: 13px; }
  .f-label { font-size: 11px; font-weight: 700; letter-spacing: 0.07em; color: var(--violet); margin-bottom: 5px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 10px 13px; border-radius: 8px; background: var(--bg); border: 1.5px solid var(--border); font-size: 13px; font-family: 'Inter',sans-serif; color: var(--gray-900); outline: none; transition: border-color 0.2s; }
  .f-input:focus { border-color: var(--violet); background: white; }
  .f-input::placeholder { color: var(--gray-400); }
  .f-btn { width: 100%; background: var(--violet); color: white; padding: 12px; border-radius: 8px; border: none; cursor: pointer; font-weight: 700; font-size: 14px; margin-top: 6px; transition: all 0.25s; }
  .f-btn:hover { background: var(--violet-light); }
  .success-wrap { text-align: center; padding: 16px 0; }
  .success-h { font-size: 22px; font-weight: 800; color: var(--gray-900); margin-bottom: 8px; }
  .success-p { color: var(--gray-500); font-size: 13px; line-height: 1.6; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; } .nav-links { display: none; }
    .hero { padding: 90px 20px 60px; } .hero-layout { grid-template-columns: 1fr; }
    .dash-card { display: none; }
    .pain-grid, .feat-grid, .pricing-grid { grid-template-columns: 1fr; }
    .pain, .features, .pricing, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; padding: 22px 20px; }
    .modal-box { padding: 32px 20px; }
  }
`;

const txns = [
  { icon: "🛒", bg: "#EDE9FE", name: "Whole Foods", cat: "Groceries", val: "-$84.20", cls: "out" },
  { icon: "💼", bg: "#D1FAE5", name: "Salary Deposit", cat: "Income", val: "+$3,200", cls: "in" },
  { icon: "🏠", bg: "#FEF3C7", name: "Rent", cat: "Housing", val: "-$1,400", cls: "out" },
  { icon: "☕", bg: "#EDE9FE", name: "Starbucks", cat: "Food & Drink", val: "-$6.80", cls: "out" },
];

const goals = [
  { name: "Emergency Fund", pct: 68, w: "68%" },
  { name: "Vacation — Paris", pct: 42, w: "42%" },
  { name: "New Laptop", pct: 85, w: "85%" },
];

const feats = [
  { icon: <Target size={22} />, title: "Savings Goals", desc: "Set a goal, track your progress, and watch your balance grow toward it — automatically." },
  { icon: <TrendingUp size={22} />, title: "Spending Insights", desc: "See exactly where your money goes each month — by category, by merchant, by week." },
  { icon: <CreditCard size={22} />, title: "Bank Sync via Plaid", desc: "Connect your bank and cards. Transactions imported automatically — no manual entry." },
  { icon: <PieChart size={22} />, title: "Budget Planning", desc: "Set monthly budgets per category. Get alerted before you overspend." },
  { icon: <Bell size={22} />, title: "Bill Reminders", desc: "Never miss a payment. Recurring bills tracked and reminded automatically." },
  { icon: <Shield size={22} />, title: "Secure & Private", desc: "Bank-level encryption. Your data is yours — never sold, never shared." },
];

const plans = [
  { name: "Free", price: "$0", mo: "forever", features: ["1 bank account", "Basic expense tracking", "3 savings goals", "Monthly summary report", "Email support"], btn: "Get Started Free", primary: false, featured: false },
  { name: "Plus", price: "$5", mo: "per month", features: ["Unlimited bank accounts", "Full spending insights", "Unlimited savings goals", "Bill reminders & tracking", "Weekly budget alerts", "CSV export"], btn: "Start Free Trial", primary: true, featured: true },
  { name: "Pro", price: "$12", mo: "per month", features: ["Everything in Plus", "Iris Pay integration", "Investment tracking", "Multi-currency support", "Priority support", "Tax-ready reports"], btn: "Start Free Trial", primary: false, featured: false },
];

export default function PersonalIndividualPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
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
      await fetch("https://formspree.io/f/maeygknj", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "Personal Individual" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=personal&ref=landing"; }, 2000);
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
          <span className="nav-lnk">For Teams</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-dots" />
        <div className="hero-layout">
          <div>
            <div className="hero-badge"><div className="hero-badge-dot" />Personal Finance · Free to Start</div>
            <h1 className="hero-title">Your money.<br /><span className="violet">Finally under control.</span></h1>
            <p className="hero-sub">Track spending, set savings goals, sync your bank, and build better money habits — all in one clean dashboard. Free forever on the starter plan.</p>
            <div className="hero-actions">
              <button className="btn-violet" onClick={() => setShowModal(true)}>Start Free <ArrowRight size={15} /></button>
              <button className="btn-ghost" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule Demo</button>
            </div>
            <div className="hero-note">No credit card · Free forever on Starter · Upgrade anytime</div>
          </div>
          <div>
            <div className="dash-card">
              <div className="dc-head">
                <span className="dc-title">My Financial Dashboard</span>
                <span className="dc-date">September 2025</span>
              </div>
              <div className="dc-metrics">
                <div className="dcm"><div className="dcm-lbl">Income</div><div className="dcm-val green">$3,200</div><div className="dcm-delta">↑ On track</div></div>
                <div className="dcm"><div className="dcm-lbl">Spent</div><div className="dcm-val">$1,842</div><div className="dcm-delta" style={{ color: "var(--amber)" }}>57% of budget</div></div>
                <div className="dcm"><div className="dcm-lbl">Saved</div><div className="dcm-val violet">$680</div><div className="dcm-delta">↑ Best month</div></div>
              </div>
              <div className="dc-goals">
                <div className="dc-goal-lbl">Savings Goals</div>
                {goals.map((g, i) => (
                  <div className="dc-goal" key={i}>
                    <div className="dc-goal-row"><span className="dc-goal-name">{g.name}</span><span className="dc-goal-pct">{g.pct}%</span></div>
                    <div className="dc-goal-bar"><div className="dc-goal-fill" style={{ width: g.w, "--w": g.w }} /></div>
                  </div>
                ))}
              </div>
              <div className="dc-txns">
                {txns.map((t, i) => (
                  <div className="dc-txn" key={i}>
                    <div className="dc-txn-left">
                      <div className="dc-txn-icon" style={{ background: t.bg }}>{t.icon}</div>
                      <div><div className="dc-txn-name">{t.name}</div><div className="dc-txn-cat">{t.cat}</div></div>
                    </div>
                    <div className={`dc-txn-val ${t.cls}`}>{t.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pain">
        <div className="pain-inner">
          <div className="s-label">The problem</div>
          <h2 className="s-title">Most people have no idea<br /><span>where their money goes.</span></h2>
          <div className="pain-grid">
            {[
              { emoji: "🤷", title: "Month ends, money's gone", desc: "You get paid, you spend, you check your balance two weeks later and wonder what happened. No visibility, no control." },
              { emoji: "📊", title: "Spreadsheets that you stop using", desc: "You start a budget spreadsheet in January. By March it's abandoned. You need something that works without willpower." },
              { emoji: "🎯", title: "Goals that never get funded", desc: "The vacation, the emergency fund, the big purchase — always 'next month.' Without a system, next month never comes." },
            ].map((p, i) => (
              <div className="pain-card" key={i}><span className="pain-emoji">{p.emoji}</span><h3>{p.title}</h3><p>{p.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="s-label">Features</div>
          <h2 className="s-title">Everything you need<br /><span>to own your finances.</span></h2>
          <div className="feat-grid">
            {feats.map((f, i) => (
              <div className="feat-card" key={i}><span className="feat-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-inner">
          <div className="s-label">Pricing</div>
          <h2 className="s-title">Start free.<br /><span>Upgrade when you're ready.</span></h2>
          <p style={{ fontSize: 15, color: "var(--gray-500)", marginTop: 8 }}>All plans include a 15-day free trial of Plus. No credit card required.</p>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="price-badge">Most Popular</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-amount">{plan.price === "$0" ? "Free" : <><sup>$</sup>{plan.price.replace("$","")}</>}</div>
                <div className="price-mo">{plan.mo}</div>
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
          <h2 className="cta-title">Take control of your money today.</h2>
          <p className="cta-sub">Free to start. Set up in 5 minutes. Know where every dollar goes.</p>
          <div className="cta-btns">
            <button className="cta-btn" onClick={() => setShowModal(true)}>Start Free</button>
            <button className="cta-btn-sec" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Financial</strong> — Personal · irisfinancial.tech</div>
        <div><span className="f-lnk">Privacy</span><span className="f-lnk">Terms</span><span className="f-lnk">Contact</span></div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={15} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Create Your Free Account</div>
                <div className="modal-s">Start tracking your finances in 5 minutes.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Email</label><input className="f-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <button className="f-btn" onClick={handleSubmit}>Get Started Free →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div style={{ fontSize: 44, marginBottom: 12 }}>🎯</div>
                <div className="success-h">You're in!</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--violet)" }}>{form.email}</strong>. Your financial dashboard is ready.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
