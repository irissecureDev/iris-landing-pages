import { useState, useEffect } from "react";
import { Check, X, ArrowRight, Users, Target, CreditCard, PieChart, Bell, Shield, DollarSign, BarChart2 } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --cream: #FDF8F0; --warm: #FFF4E6; --parch: #FAEBD7;
    --border: #E8D5C0; --border-soft: #F0E0CC;
    --coral: #F97316; --coral-light: #FB923C; --coral-dark: #EA6A0A;
    --coral-bg: rgba(249,115,22,0.08); --coral-border: rgba(249,115,22,0.2);
    --brown: #92400E; --brown-mid: #78350F; --ink: #1C0A00;
    --text-mid: #6B4226; --text-soft: #9A7860; --white: #FFFFFF;
    --green: #16A34A; --red: #DC2626; --amber: #D97706;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Nunito', sans-serif; background: var(--cream); color: var(--ink); overflow-x: hidden; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.35); } 50% { box-shadow: 0 0 0 10px rgba(249,115,22,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes float { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
  @keyframes wave { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(8deg); } 75% { transform: rotate(-8deg); } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 62px; padding: 0 48px; background: rgba(253,248,240,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .nav-brand { font-size: 15px; font-weight: 800; color: var(--ink); display: flex; align-items: center; gap: 10px; }
  .nav-brand span { color: var(--coral); }
  .nav-links { display: flex; gap: 28px; }
  .nav-lnk { font-size: 13px; font-weight: 600; color: var(--text-soft); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--ink); }
  .nav-cta { background: var(--coral); color: white; padding: 9px 20px; border-radius: 100px; border: none; cursor: pointer; font-size: 13px; font-weight: 700; transition: all 0.2s; box-shadow: 0 3px 10px rgba(249,115,22,0.3); }
  .nav-cta:hover { background: var(--coral-light); transform: translateY(-1px); }

  .hero { min-height: 100vh; padding: 110px 48px 80px; position: relative; overflow: hidden; display: flex; align-items: center; background: var(--cream); }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%); pointer-events: none; }
  .hero-waves { position: absolute; bottom: 0; left: 0; right: 0; height: 120px; background: linear-gradient(0deg, var(--warm) 0%, transparent 100%); pointer-events: none; }
  .hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1100px; margin: 0 auto; width: 100%; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: var(--coral-bg); border: 1px solid var(--coral-border); color: var(--coral-dark); padding: 6px 16px; border-radius: 100px; font-size: 12px; font-weight: 700; margin-bottom: 20px; animation: fadeUp 0.5s ease both; }
  .hero-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--coral); animation: blink 2s infinite; }
  .hero-wave-emoji { display: inline-block; animation: wave 2s ease-in-out infinite; transform-origin: bottom right; }
  .hero-title { font-size: clamp(40px, 5.5vw, 64px); font-weight: 900; line-height: 1.1; color: var(--ink); margin-bottom: 18px; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title .coral { color: var(--coral); }
  .hero-sub { font-size: 17px; color: var(--text-mid); line-height: 1.75; max-width: 440px; margin-bottom: 32px; font-weight: 500; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-groups { display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap; animation: fadeUp 0.6s 0.25s ease both; }
  .group-pill { background: white; border: 1.5px solid var(--border); color: var(--text-mid); font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 100px; transition: all 0.2s; cursor: default; }
  .group-pill.active { border-color: var(--coral); color: var(--coral-dark); background: var(--coral-bg); }
  .hero-actions { display: flex; gap: 12px; margin-bottom: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-coral { background: var(--coral); color: white; padding: 14px 28px; border-radius: 100px; border: none; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.25s; animation: pulse 2.5s infinite; box-shadow: 0 5px 16px rgba(249,115,22,0.35); display: flex; align-items: center; gap: 7px; }
  .btn-coral:hover { background: var(--coral-light); transform: translateY(-2px); }
  .btn-ghost { background: white; color: var(--text-mid); padding: 12px 22px; border-radius: 100px; cursor: pointer; font-size: 15px; font-weight: 600; border: 1.5px solid var(--border); transition: all 0.25s; }
  .btn-ghost:hover { border-color: var(--coral); color: var(--coral-dark); }
  .hero-note { font-size: 12px; color: var(--text-soft); animation: fadeUp 0.6s 0.4s ease both; }

  .family-card { background: white; border-radius: 24px; box-shadow: 0 24px 60px rgba(146,64,14,0.1); border: 1.5px solid var(--border-soft); overflow: hidden; animation: scaleIn 0.7s 0.3s ease both; }
  .fc-head { background: linear-gradient(135deg, var(--coral-dark), var(--coral)); padding: 16px 22px; display: flex; align-items: center; justify-content: space-between; }
  .fc-title { font-size: 14px; font-weight: 800; color: white; }
  .fc-month { font-size: 11px; color: rgba(255,255,255,0.7); }
  .fc-summary { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--border-soft); }
  .fcs { padding: 14px 16px; border-right: 1px solid var(--border-soft); }
  .fcs:last-child { border-right: none; }
  .fcs-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: var(--text-soft); text-transform: uppercase; margin-bottom: 4px; }
  .fcs-val { font-size: 20px; font-weight: 800; color: var(--ink); }
  .fcs-val.green { color: var(--green); }
  .fcs-val.coral { color: var(--coral-dark); }
  .fc-members { padding: 14px 22px; border-bottom: 1px solid var(--border-soft); }
  .fc-members-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: var(--text-soft); text-transform: uppercase; margin-bottom: 10px; }
  .fc-member { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.04); }
  .fc-member:last-child { border-bottom: none; }
  .fc-member-left { display: flex; align-items: center; gap: 10px; }
  .fc-member-av { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .fc-member-name { font-size: 13px; font-weight: 700; color: var(--ink); }
  .fc-member-role { font-size: 11px; color: var(--text-soft); margin-top: 1px; }
  .fc-member-spent { font-size: 14px; font-weight: 700; color: var(--text-mid); }
  .fc-goal { padding: 14px 22px; }
  .fc-goal-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: var(--text-soft); text-transform: uppercase; margin-bottom: 10px; }
  .fc-goal-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
  .fc-goal-name { font-size: 13px; font-weight: 700; color: var(--ink); }
  .fc-goal-amt { font-size: 13px; font-weight: 700; color: var(--coral-dark); }
  .fc-goal-bar { height: 8px; background: var(--parch); border-radius: 100px; overflow: hidden; }
  .fc-goal-fill { height: 100%; background: linear-gradient(90deg, var(--coral-dark), var(--coral-light)); border-radius: 100px; width: 54%; }

  .s-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--coral-dark); text-transform: uppercase; margin-bottom: 12px; }
  .s-title { font-size: clamp(30px, 4vw, 44px); font-weight: 900; line-height: 1.1; color: var(--ink); margin-bottom: 12px; }
  .s-title span { color: var(--coral); }
  .s-sub { font-size: 16px; color: var(--text-mid); line-height: 1.7; max-width: 500px; font-weight: 500; }

  .how { background: var(--warm); padding: 90px 48px; border-top: 1px solid var(--border); }
  .how-inner { max-width: 1000px; margin: 0 auto; }
  .how-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; margin-top: 48px; }
  .how-card { background: white; border: 1px solid var(--border-soft); border-radius: 16px; padding: 24px; transition: all 0.25s; }
  .how-card:hover { border-color: var(--coral-border); box-shadow: 0 6px 20px rgba(249,115,22,0.08); }
  .how-num { width: 36px; height: 36px; border-radius: 10px; background: var(--coral); color: white; font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
  .how-card h3 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .how-card p { font-size: 13px; color: var(--text-soft); line-height: 1.6; }

  .features { background: var(--cream); padding: 90px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
  .feat-card { background: white; border: 1.5px solid var(--border-soft); border-radius: 16px; padding: 26px; transition: all 0.25s; }
  .feat-card:hover { border-color: var(--coral-border); box-shadow: 0 6px 20px rgba(249,115,22,0.08); transform: translateY(-3px); }
  .feat-icon { color: var(--coral); margin-bottom: 12px; display: block; }
  .feat-card h3 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .feat-card p { font-size: 13px; color: var(--text-mid); line-height: 1.6; }

  .pricing { background: var(--warm); padding: 90px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 820px; margin: 0 auto; text-align: center; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 44px; text-align: left; }
  .price-card { background: white; border: 1.5px solid var(--border-soft); border-radius: 18px; padding: 28px; position: relative; transition: all 0.3s; }
  .price-card:hover { border-color: var(--coral-border); box-shadow: 0 8px 28px rgba(249,115,22,0.1); }
  .price-card.featured { border-color: var(--coral); box-shadow: 0 8px 28px rgba(249,115,22,0.15); }
  .price-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: var(--coral); color: white; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 100px; white-space: nowrap; }
  .price-name { font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 4px; }
  .price-amount { font-size: 42px; font-weight: 900; color: var(--ink); line-height: 1; margin: 12px 0 3px; }
  .price-amount sup { font-size: 18px; vertical-align: top; margin-top: 10px; }
  .price-mo { font-size: 12px; color: var(--text-soft); margin-bottom: 18px; }
  .price-seats { font-size: 12px; font-weight: 700; color: var(--coral-dark); background: var(--coral-bg); border: 1px solid var(--coral-border); padding: 3px 10px; border-radius: 100px; display: inline-block; margin-bottom: 14px; }
  .price-div { height: 1px; background: var(--border-soft); margin: 14px 0; }
  .price-feat { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; color: var(--text-mid); padding: 4px 0; font-weight: 500; }
  .price-ck { color: var(--green); font-weight: 700; flex-shrink: 0; font-size: 13px; }
  .price-btn { width: 100%; padding: 12px; border-radius: 100px; border: none; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 14px; transition: all 0.25s; }
  .price-btn.primary { background: var(--coral); color: white; box-shadow: 0 4px 12px rgba(249,115,22,0.3); }
  .price-btn.primary:hover { background: var(--coral-light); }
  .price-btn.secondary { background: white; color: var(--text-mid); border: 1.5px solid var(--border); }
  .price-btn.secondary:hover { border-color: var(--coral); color: var(--coral-dark); }

  .cta-section { background: linear-gradient(135deg, var(--coral-dark) 0%, var(--coral) 60%, var(--coral-light) 100%); padding: 80px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 24px 24px; }
  .cta-inner { position: relative; z-index: 2; max-width: 540px; margin: 0 auto; }
  .cta-title { font-size: clamp(30px, 4.5vw, 46px); font-weight: 900; color: white; line-height: 1.1; margin-bottom: 14px; }
  .cta-sub { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 28px; font-weight: 500; }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .cta-btn { background: white; color: var(--coral-dark); padding: 14px 32px; border-radius: 100px; border: none; cursor: pointer; font-size: 14px; font-weight: 700; transition: all 0.25s; }
  .cta-btn:hover { background: var(--cream); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.85); padding: 12px 28px; border-radius: 100px; cursor: pointer; font-size: 14px; font-weight: 600; border: 1.5px solid rgba(255,255,255,0.4); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; color: white; }

  .footer { background: var(--brown-mid); padding: 26px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
  .footer-copy { font-size: 12px; color: rgba(255,255,255,0.4); }
  .footer-copy strong { color: var(--coral-light); }
  .f-lnk { font-size: 12px; color: rgba(255,255,255,0.4); cursor: pointer; margin-left: 20px; transition: color 0.2s; }
  .f-lnk:hover { color: rgba(255,255,255,0.8); }

  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(28,10,0,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal-box { background: white; border-radius: 22px; padding: 44px; max-width: 440px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 20px 56px rgba(0,0,0,0.2); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--cream); border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-soft); }
  .modal-x:hover { background: var(--parch); }
  .modal-h { font-size: 22px; font-weight: 900; color: var(--ink); margin-bottom: 5px; }
  .modal-s { color: var(--text-soft); font-size: 13px; margin-bottom: 22px; font-weight: 500; }
  .f-group { margin-bottom: 13px; }
  .f-label { font-size: 11px; font-weight: 700; letter-spacing: 0.07em; color: var(--coral-dark); margin-bottom: 5px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 11px 14px; border-radius: 10px; background: var(--cream); border: 1.5px solid var(--border-soft); font-size: 13px; font-family: 'Nunito',sans-serif; color: var(--ink); outline: none; transition: border-color 0.2s; }
  .f-input:focus { border-color: var(--coral); background: white; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-btn { width: 100%; background: var(--coral); color: white; padding: 13px; border-radius: 100px; border: none; cursor: pointer; font-weight: 700; font-size: 14px; margin-top: 6px; transition: all 0.25s; }
  .f-btn:hover { background: var(--coral-light); }
  .success-wrap { text-align: center; padding: 16px 0; }
  .success-h { font-size: 22px; font-weight: 900; color: var(--ink); margin-bottom: 8px; }
  .success-p { color: var(--text-soft); font-size: 13px; line-height: 1.6; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; } .nav-links { display: none; }
    .hero { padding: 90px 20px 60px; } .hero-layout { grid-template-columns: 1fr; }
    .family-card { display: none; }
    .how-grid, .feat-grid, .pricing-grid { grid-template-columns: 1fr 1fr; }
    .how, .features, .pricing, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; padding: 22px 20px; }
    .modal-box { padding: 32px 20px; }
  }
`;

const members = [
  { emoji: "👨", bg: "#FEF3C7", name: "Marcus", role: "Admin", spent: "$1,240" },
  { emoji: "👩", bg: "#FCE7F3", name: "Alicia", role: "Member", spent: "$680" },
  { emoji: "👦", bg: "#DBEAFE", name: "Tyler", role: "Member", spent: "$120" },
];

const feats = [
  { icon: <Users size={22} />, title: "Shared Family Dashboard", desc: "Every member sees the household budget, shared goals, and their own spending — all in one place." },
  { icon: <Target size={22} />, title: "Shared Savings Goals", desc: "Family vacation, house down payment, emergency fund — set goals together and track progress as a team." },
  { icon: <CreditCard size={22} />, title: "Individual + Joint Tracking", desc: "Each member tracks personal spending, while shared expenses roll up to the household view automatically." },
  { icon: <PieChart size={22} />, title: "Household Budget", desc: "Set monthly budgets by category — groceries, utilities, entertainment. Everyone sees where the household stands." },
  { icon: <Bell size={22} />, title: "Bill & Subscription Alerts", desc: "Never miss a shared bill. Rent, utilities, subscriptions — tracked and alerted before they're due." },
  { icon: <Shield size={22} />, title: "Role-Based Access", desc: "Admin controls the budget. Members see their own data. Full transparency where you want it, privacy where you need it." },
];

const plans = [
  { name: "Free", price: "$0", mo: "forever", seats: "Up to 5 members", features: ["1 shared bank account", "Basic household budget", "3 shared savings goals", "Monthly summary", "Email support"], btn: "Get Started Free", primary: false, featured: false },
  { name: "Plus", price: "$5", mo: "per month", seats: "Up to 10 members", features: ["Unlimited bank accounts", "Full spending insights", "Unlimited shared goals", "Individual + joint view", "Bill reminders", "CSV export"], btn: "Start Free Trial", primary: true, featured: true },
  { name: "Pro", price: "$12", mo: "per month", seats: "Unlimited members", features: ["Everything in Plus", "Iris Pay integration", "Multi-currency support", "Investment tracking", "Priority support", "Tax-ready reports"], btn: "Start Free Trial", primary: false, featured: false },
];

export default function PersonalFamilyPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", groupType: "" });
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
      await fetch("https://formspree.io/f/xljeyvdw", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "Personal Family/Group" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=personal-group&ref=landing"; }, 2000);
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
          <span className="nav-lnk">For Business</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-waves" />
        <div className="hero-layout">
          <div>
            <div className="hero-badge"><div className="hero-badge-dot" />For Families · Couples · Roommates · Friends</div>
            <h1 className="hero-title"><span className="hero-wave-emoji">👋</span> Money is better<br />managed <span className="coral">together.</span></h1>
            <p className="hero-sub">One shared dashboard for the whole household. Track spending, set family goals, and stay on the same financial page — without the awkward money conversations.</p>
            <div className="hero-groups">
              {["👨‍👩‍👧‍👦 Family", "💑 Couple", "🏠 Roommates", "👫 Friends"].map((g, i) => (
                <span key={i} className={`group-pill ${i === 0 ? "active" : ""}`}>{g}</span>
              ))}
            </div>
            <div className="hero-actions">
              <button className="btn-coral" onClick={() => setShowModal(true)}>Start Free <ArrowRight size={15} /></button>
              <button className="btn-ghost" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule Demo</button>
            </div>
            <div className="hero-note">Free for up to 5 members · No credit card required</div>
          </div>
          <div>
            <div className="family-card">
              <div className="fc-head">
                <span className="fc-title">👨‍👩‍👧 Johnson Family · September</span>
                <span className="fc-month">Household Dashboard</span>
              </div>
              <div className="fc-summary">
                <div className="fcs"><div className="fcs-lbl">Total Income</div><div className="fcs-val green">$7,800</div></div>
                <div className="fcs"><div className="fcs-lbl">Total Spent</div><div className="fcs-val">$4,280</div></div>
                <div className="fcs"><div className="fcs-lbl">Saved</div><div className="fcs-val coral">$1,420</div></div>
              </div>
              <div className="fc-members">
                <div className="fc-members-lbl">Member Spending</div>
                {members.map((m, i) => (
                  <div className="fc-member" key={i}>
                    <div className="fc-member-left">
                      <div className="fc-member-av" style={{ background: m.bg }}>{m.emoji}</div>
                      <div><div className="fc-member-name">{m.name}</div><div className="fc-member-role">{m.role}</div></div>
                    </div>
                    <div className="fc-member-spent">{m.spent}</div>
                  </div>
                ))}
              </div>
              <div className="fc-goal">
                <div className="fc-goal-lbl">🏖️ Family Vacation Goal</div>
                <div className="fc-goal-row"><span className="fc-goal-name">Bahamas Trip</span><span className="fc-goal-amt">$2,700 / $5,000</span></div>
                <div className="fc-goal-bar"><div className="fc-goal-fill" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how">
        <div className="how-inner">
          <div className="s-label">How it works</div>
          <h2 className="s-title">Set up your household<br /><span>in 10 minutes.</span></h2>
          <div className="how-grid">
            {[
              { n: "1", title: "Create your group", desc: "Pick your group type — Family, Couple, Roommates, or Friends. Name your household." },
              { n: "2", title: "Invite your people", desc: "Send email invites to each member. They join with one click, no extra signup needed." },
              { n: "3", title: "Connect your accounts", desc: "Each member syncs their bank account via Plaid. Shared accounts connected once." },
              { n: "4", title: "Set goals together", desc: "Create shared savings goals, set a household budget, and watch your money grow." },
            ].map((s, i) => (
              <div className="how-card" key={i}><div className="how-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="s-label">Features</div>
          <h2 className="s-title">Built for shared finances,<br /><span>not just shared spreadsheets.</span></h2>
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
          <h2 className="s-title">Free for your whole household.</h2>
          <p style={{ fontSize: 15, color: "var(--text-soft)", marginTop: 8, fontWeight: 500 }}>Start free with up to 5 members. Upgrade anytime.</p>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="price-badge">Most Popular</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-amount">{plan.price === "$0" ? "Free" : <><sup>$</sup>{plan.price.replace("$","")}</>}</div>
                <div className="price-mo">{plan.mo}</div>
                <div className="price-seats">{plan.seats}</div>
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
          <h2 className="cta-title">Get your household on the same page.</h2>
          <p className="cta-sub">Free for up to 5 members. Set up in 10 minutes. No money conversations required.</p>
          <div className="cta-btns">
            <button className="cta-btn" onClick={() => setShowModal(true)}>Start Free</button>
            <button className="cta-btn-sec" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Financial</strong> — Personal & Family · irisfinancial.tech</div>
        <div><span className="f-lnk">Privacy</span><span className="f-lnk">Terms</span><span className="f-lnk">Contact</span></div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={15} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Create Your Household</div>
                <div className="modal-s">Free for up to 5 members. Invite your people in seconds.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Email</label><input className="f-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="f-group">
                  <label className="f-label">Group Type</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.groupType} onChange={e => setForm({...form, groupType: e.target.value})}>
                    <option value="">Select your group</option>
                    <option>Family</option><option>Couple</option><option>Roommates</option><option>Friends</option><option>Other</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Household →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div style={{ fontSize: 44, marginBottom: 12 }}>🏠</div>
                <div className="success-h">Your household is ready!</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--coral-dark)" }}>{form.email}</strong>. Invite your people and get started.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
