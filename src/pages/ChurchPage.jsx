import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Lato:wght@300;400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy: #0B1D3A;
    --teal: #00C8C8;
    --gold: #C9A84C;
    --gold-light: #F0D080;
    --cream: #FAF7F2;
    --warm-white: #FFFDF9;
    --text-dark: #1A1A2E;
    --text-muted: #6B7280;
    --green: #22c55e;
  }

  body { font-family: 'Lato', sans-serif; background: var(--warm-white); color: var(--text-dark); overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
    70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(201,168,76,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201,168,76,0); }
  }
  @keyframes slideRight {
    from { width: 0; }
    to { width: 100%; }
  }

  .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
  .animate-fadeIn { animation: fadeIn 0.7s ease forwards; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 16px 40px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(11,29,58,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-logo-mark {
    width: 36px; height: 36px; border-radius: 8px;
    background: linear-gradient(135deg, var(--teal), var(--navy));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-weight: 900;
    color: white; font-size: 16px; border: 1px solid rgba(0,200,200,0.3);
  }
  .nav-brand { font-family: 'Playfair Display', serif; font-weight: 700; color: white; font-size: 17px; }
  .nav-brand span { color: var(--teal); }
  .nav-cta {
    background: var(--gold); color: var(--navy);
    padding: 9px 22px; border-radius: 6px; font-weight: 700;
    font-size: 13px; letter-spacing: 0.04em; cursor: pointer;
    border: none; transition: all 0.2s;
    text-transform: uppercase;
  }
  .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--navy);
    position: relative; overflow: hidden;
    display: flex; align-items: center;
    padding: 120px 40px 80px;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,200,200,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 30% 40% at 50% 10%, rgba(0,200,200,0.04) 0%, transparent 50%);
  }
  .hero-cross {
    position: absolute; right: 8%; top: 50%; transform: translateY(-50%);
    opacity: 0.04; font-size: 380px; line-height: 1;
    color: white; font-family: serif; user-select: none;
    animation: float 8s ease-in-out infinite;
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.03;
    background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-content { position: relative; z-index: 2; max-width: 680px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold-light); padding: 6px 16px; border-radius: 100px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 28px;
    animation: fadeUp 0.6s ease forwards;
  }
  .hero-badge::before { content: '✦'; font-size: 10px; }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 900; line-height: 1.08;
    color: white; margin-bottom: 24px;
    animation: fadeUp 0.7s 0.1s ease both;
  }
  .hero-title em { font-style: normal; color: var(--gold); }
  .hero-title .teal { color: var(--teal); }
  .hero-sub {
    font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.65);
    margin-bottom: 40px; font-weight: 300; max-width: 540px;
    animation: fadeUp 0.7s 0.2s ease both;
  }
  .hero-actions {
    display: flex; gap: 16px; flex-wrap: wrap;
    animation: fadeUp 0.7s 0.3s ease both;
  }
  .btn-primary {
    background: var(--gold);
    color: var(--navy); padding: 16px 36px;
    border-radius: 8px; font-weight: 700; font-size: 15px;
    cursor: pointer; border: none; letter-spacing: 0.02em;
    transition: all 0.25s; animation: pulse-ring 2.5s infinite;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.3); }
  .btn-secondary {
    background: transparent; color: white;
    padding: 16px 36px; border-radius: 8px;
    font-weight: 600; font-size: 15px; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.25); transition: all 0.25s;
  }
  .btn-secondary:hover { border-color: var(--teal); color: var(--teal); }
  .hero-stats {
    display: flex; gap: 40px; margin-top: 56px; padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.08);
    animation: fadeUp 0.7s 0.4s ease both;
  }
  .stat-item { }
  .stat-num {
    font-family: 'Playfair Display', serif; font-size: 32px;
    font-weight: 900; color: var(--gold);
  }
  .stat-label { font-size: 13px; color: rgba(255,255,255,0.45); margin-top: 2px; }

  /* PAIN SECTION */
  .pain {
    background: var(--cream); padding: 100px 40px;
  }
  .section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--teal); margin-bottom: 14px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 48px); font-weight: 800;
    line-height: 1.15; color: var(--navy); margin-bottom: 16px;
  }
  .section-sub { font-size: 17px; color: var(--text-muted); line-height: 1.7; max-width: 580px; }
  .pain-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px; margin-top: 56px;
  }
  .pain-card {
    background: white; border-radius: 16px; padding: 32px;
    border: 1px solid rgba(0,0,0,0.06);
    transition: all 0.3s; cursor: default;
  }
  .pain-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(11,29,58,0.08); border-color: rgba(0,200,200,0.2); }
  .pain-icon { font-size: 32px; margin-bottom: 16px; }
  .pain-card h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
  .pain-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
  .pain-card .strike { color: #ef4444; font-weight: 600; }

  /* FEATURES */
  .features {
    background: var(--navy); padding: 100px 40px;
    position: relative; overflow: hidden;
  }
  .features-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 60% at 100% 50%, rgba(0,200,200,0.05) 0%, transparent 60%);
  }
  .features-inner { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; }
  .features-header { text-align: center; margin-bottom: 64px; }
  .features-header .section-label { color: var(--gold); }
  .features-header .section-title { color: white; }
  .features-header .section-sub { color: rgba(255,255,255,0.55); margin: 0 auto; }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;
  }
  .feature-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 36px;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--teal), var(--gold));
    transform: scaleX(0); transition: transform 0.3s; transform-origin: left;
  }
  .feature-card:hover::before { transform: scaleX(1); }
  .feature-card:hover { background: rgba(255,255,255,0.07); transform: translateY(-4px); }
  .feature-icon-wrap {
    width: 52px; height: 52px; border-radius: 12px;
    background: rgba(0,200,200,0.1); border: 1px solid rgba(0,200,200,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; margin-bottom: 20px;
  }
  .feature-card h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: white; margin-bottom: 12px; }
  .feature-card p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7; }
  .feature-tag {
    display: inline-block; margin-top: 16px;
    background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.25);
    color: var(--gold-light); padding: 4px 12px; border-radius: 100px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  }

  /* COMPARISON */
  .comparison { background: var(--cream); padding: 100px 40px; }
  .comparison-inner { max-width: 900px; margin: 0 auto; }
  .comp-table {
    background: white; border-radius: 20px; overflow: hidden;
    box-shadow: 0 8px 48px rgba(11,29,58,0.08);
    border: 1px solid rgba(0,0,0,0.06);
    margin-top: 48px;
  }
  .comp-header {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    background: var(--navy); padding: 0;
  }
  .comp-col-head {
    padding: 24px 28px; font-family: 'Playfair Display', serif;
    font-weight: 700; font-size: 16px;
  }
  .comp-col-head.feature-col { color: rgba(255,255,255,0.4); font-size: 13px; font-family: 'Lato', sans-serif; font-weight: 400; }
  .comp-col-head.iris { color: var(--teal); font-size: 18px; }
  .comp-col-head.quickbooks { color: rgba(255,255,255,0.5); font-size: 15px; }
  .comp-iris-badge {
    display: inline-block; background: rgba(0,200,200,0.15);
    border: 1px solid rgba(0,200,200,0.3); color: var(--teal);
    font-size: 10px; font-family: 'Lato', sans-serif; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 3px 8px; border-radius: 4px; margin-left: 8px; vertical-align: middle;
  }
  .comp-row {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    border-top: 1px solid rgba(0,0,0,0.05);
    transition: background 0.2s;
  }
  .comp-row:hover { background: rgba(11,29,58,0.02); }
  .comp-cell { padding: 18px 28px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
  .comp-cell.feature-name { color: var(--text-dark); font-weight: 600; font-size: 14px; }
  .comp-cell.iris-val { color: var(--navy); font-weight: 600; }
  .comp-cell.qb-val { color: var(--text-muted); }
  .check { color: var(--green); font-size: 18px; }
  .cross { color: #ef4444; font-size: 18px; }
  .price-row { background: rgba(11,29,58,0.03); }
  .price-iris { color: var(--teal) !important; font-family: 'Playfair Display', serif; font-size: 22px !important; font-weight: 900 !important; }
  .price-qb { color: #ef4444 !important; font-family: 'Playfair Display', serif; font-size: 22px !important; font-weight: 900 !important; }

  /* TESTIMONIALS */
  .testimonials { background: white; padding: 100px 40px; }
  .testimonials-inner { max-width: 1100px; margin: 0 auto; }
  .testimonials-header { text-align: center; margin-bottom: 56px; }
  .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px; }
  .testi-card {
    background: var(--cream); border-radius: 20px; padding: 36px;
    border: 1px solid rgba(0,0,0,0.05); position: relative;
    transition: all 0.3s;
  }
  .testi-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(11,29,58,0.07); }
  .testi-quote {
    font-size: 52px; line-height: 1; color: var(--gold);
    font-family: Georgia, serif; opacity: 0.4; margin-bottom: 4px;
  }
  .testi-text { font-size: 16px; line-height: 1.75; color: var(--text-dark); font-style: italic; margin-bottom: 24px; }
  .testi-author { display: flex; align-items: center; gap: 14px; }
  .testi-avatar {
    width: 46px; height: 46px; border-radius: 50%;
    background: var(--navy); display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-weight: 700; color: var(--teal); font-size: 18px;
  }
  .testi-name { font-weight: 700; color: var(--navy); font-size: 14px; }
  .testi-role { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .stars { color: var(--gold); font-size: 14px; margin-bottom: 12px; }

  /* PRICING */
  .pricing { background: var(--navy); padding: 100px 40px; }
  .pricing-inner { max-width: 700px; margin: 0 auto; text-align: center; }
  .pricing-card {
    background: rgba(255,255,255,0.05);
    border: 2px solid rgba(201,168,76,0.3);
    border-radius: 24px; padding: 56px 48px; margin-top: 48px;
    position: relative; overflow: hidden;
  }
  .pricing-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--teal), var(--gold));
    background-size: 200% auto; animation: shimmer 3s linear infinite;
  }
  .price-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
  .price-plan { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: white; margin-bottom: 8px; }
  .price-amount {
    font-family: 'Playfair Display', serif;
    font-size: 80px; font-weight: 900; color: var(--gold);
    line-height: 1; margin: 16px 0 4px;
  }
  .price-amount sup { font-size: 32px; vertical-align: top; margin-top: 16px; }
  .price-cadence { color: rgba(255,255,255,0.4); font-size: 15px; margin-bottom: 32px; }
  .price-features { text-align: left; margin: 32px 0; }
  .price-feature {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
    font-size: 15px; color: rgba(255,255,255,0.8);
  }
  .price-feature:last-child { border-bottom: none; }
  .price-feature .chk { color: var(--teal); font-size: 18px; }
  .pricing-cta {
    width: 100%; background: var(--gold); color: var(--navy);
    padding: 18px; border-radius: 10px; font-weight: 700; font-size: 16px;
    cursor: pointer; border: none; letter-spacing: 0.03em; transition: all 0.25s;
    text-transform: uppercase;
  }
  .pricing-cta:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.3); }
  .pricing-note { color: rgba(255,255,255,0.3); font-size: 13px; margin-top: 16px; }

  /* CTA BANNER */
  .cta-banner {
    background: var(--cream); padding: 100px 40px; text-align: center;
  }
  .cta-inner { max-width: 640px; margin: 0 auto; }
  .cta-icon { font-size: 56px; margin-bottom: 24px; animation: float 4s ease-in-out infinite; }
  .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: var(--navy); line-height: 1.15; margin-bottom: 20px; }
  .cta-title em { font-style: normal; color: var(--teal); }
  .cta-sub { font-size: 17px; color: var(--text-muted); line-height: 1.7; margin-bottom: 40px; }
  .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-cta-main {
    background: var(--navy); color: white;
    padding: 18px 44px; border-radius: 10px;
    font-weight: 700; font-size: 15px; cursor: pointer; border: none;
    letter-spacing: 0.03em; transition: all 0.25s; text-transform: uppercase;
  }
  .btn-cta-main:hover { background: #162d56; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(11,29,58,0.2); }
  .btn-cta-sec {
    background: transparent; color: var(--navy);
    padding: 18px 44px; border-radius: 10px;
    font-weight: 600; font-size: 15px; cursor: pointer;
    border: 2px solid var(--navy); transition: all 0.25s;
  }
  .btn-cta-sec:hover { border-color: var(--teal); color: var(--teal); }

  /* FOOTER */
  .footer {
    background: var(--navy); padding: 40px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .footer-brand { font-family: 'Playfair Display', serif; color: rgba(255,255,255,0.5); font-size: 14px; }
  .footer-brand strong { color: var(--teal); }
  .footer-links { display: flex; gap: 24px; }
  .footer-link { color: rgba(255,255,255,0.3); font-size: 13px; cursor: pointer; transition: color 0.2s; }
  .footer-link:hover { color: var(--gold); }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(11,29,58,0.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .modal {
    background: white; border-radius: 24px;
    padding: 48px; max-width: 480px; width: 100%;
    position: relative; animation: fadeUp 0.35s ease;
  }
  .modal-close {
    position: absolute; top: 20px; right: 20px;
    background: none; border: none; font-size: 22px; cursor: pointer; color: var(--text-muted);
    width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .modal-close:hover { background: rgba(0,0,0,0.06); }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: var(--navy); margin-bottom: 6px; }
  .modal-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; }
  .form-group { margin-bottom: 18px; }
  .form-label { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 6px; display: block; letter-spacing: 0.03em; }
  .form-input {
    width: 100%; padding: 13px 16px; border-radius: 8px;
    border: 1.5px solid rgba(0,0,0,0.12); font-size: 14px;
    font-family: 'Lato', sans-serif; transition: border-color 0.2s; outline: none;
    color: var(--text-dark);
  }
  .form-input:focus { border-color: var(--teal); }
  .form-submit {
    width: 100%; background: var(--navy); color: white;
    padding: 15px; border-radius: 8px; font-weight: 700;
    font-size: 15px; cursor: pointer; border: none; margin-top: 8px;
    transition: all 0.25s; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .form-submit:hover { background: #162d56; }
  .form-success { text-align: center; padding: 20px 0; }
  .form-success .success-icon { font-size: 48px; margin-bottom: 16px; }
  .form-success h3 { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--navy); margin-bottom: 8px; }
  .form-success p { color: var(--text-muted); font-size: 14px; }

  @media (max-width: 768px) {
    .nav { padding: 14px 20px; }
    .hero { padding: 100px 20px 60px; }
    .hero-stats { flex-direction: column; gap: 20px; }
    .hero-cross { font-size: 200px; opacity: 0.025; }
    .pain, .features, .comparison, .testimonials, .pricing, .cta-banner { padding: 70px 20px; }
    .comp-header, .comp-row { grid-template-columns: 1.2fr 1fr 1fr; }
    .comp-cell { padding: 14px 16px; font-size: 13px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 32px 20px; }
  }
`;

const features = [
  { icon: "🙏", title: "Donor Management", desc: "Complete donor profiles with full giving history, notes, and contact records — all in one place.", tag: "Church-Specific" },
  { icon: "📊", title: "Dedicated Fund Tracking", desc: "Separate funds for tithes, building projects, missions, and benevolence with automatic allocation.", tag: "Church-Specific" },
  { icon: "📄", title: "Year-End Giving Statements", desc: "IRS-compliant tax receipts generated and emailed to every donor in one click. Every January.", tag: "Saves Hours" },
  { icon: "📋", title: "IRS Form 990 Prep", desc: "Pre-populated 990 and 990-EZ data exports. Your accountant will thank you.", tag: "Tax Ready" },
  { icon: "💳", title: "Online & Mobile Giving", desc: "Accept tithes and offerings via card or mobile money. Donors give from the pew or anywhere.", tag: "Iris Pay" },
  { icon: "📈", title: "Financial Reports", desc: "P&L, giving trends, fund balances, and expense breakdowns — church-board ready.", tag: "Bilingual" },
];

const painPoints = [
  { icon: "📑", title: "Spreadsheets break every year", desc: "Your treasurer updates the same Excel file for 10 years and then they leave. That's not a system.", strike: null },
  { icon: "💰", title: "QuickBooks wasn't built for churches", desc: "No donor management. No fund tracking. No giving statements. You're paying $115/mo for the wrong tool.", strike: "~$1,380/yr wasted" },
  { icon: "📬", title: "Year-end chaos", desc: "Hunting down donor records in January to generate tax receipts shouldn't take two weeks.", strike: null },
];

const testimonials = [
  { quote: "We switched from a combination of QuickBooks and Google Sheets. Iris Financial consolidated everything — our treasurer went from 10 hours to 2 hours per month.", name: "Pastor James W.", role: "New Covenant Baptist Church, Atlanta GA", initial: "J" },
  { quote: "The year-end giving statements used to take us three days. Now I click one button and they're emailed to 340 members. This is exactly what churches need.", name: "Minister Sandra T.", role: "Grace Fellowship Church, Houston TX", initial: "S" },
  { quote: "Our board finally trusts the numbers. The fund tracking feature lets us show exactly where every dollar goes — tithes, building fund, missions. Complete transparency.", name: "Church Treasurer M. Okafor", role: "Bethel Worship Center, Charlotte NC", initial: "M" },
];

const priceFeatures = [
  "Unlimited donor profiles & giving records",
  "Dedicated fund management (tithes, missions, building fund)",
  "IRS-compliant year-end giving statements (bulk email)",
  "IRS Form 990 data exports",
  "Online giving links + mobile money (Iris Pay)",
  "Financial reports for board meetings",
  "Bilingual English/French interface",
  "Unlimited users (admins + volunteers)",
  "15-day free trial — no credit card",
];

export default function ChurchLandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({ name: "", church: "", email: "", size: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = () => {
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
  };

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-mark">I</div>
          <div className="nav-brand">Iris <span>Financial</span></div>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-cross">✝</div>
        <div className="hero-content">
          <div className="hero-badge">Built for Houses of Worship</div>
          <h1 className="hero-title">
            Church finances,<br />
            finally <em>simple</em> and<br />
            <span className="teal">transparent.</span>
          </h1>
          <p className="hero-sub">
            Donor management, fund tracking, year-end giving statements, and IRS 990 reports — all in one platform built specifically for churches and nonprofits. Free to start.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
            <button className="btn-secondary">Watch Demo ▶</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">$0</div>
              <div className="stat-label">to get started</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">15 min</div>
              <div className="stat-label">to import your donors</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">1-click</div>
              <div className="stat-label">giving statements</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Sound familiar?</div>
          <h2 className="section-title">Your church deserves better<br />than patched-together tools.</h2>
          <p className="section-sub">Most churches manage finances with tools that weren't built for them. Here's what that costs.</p>
          <div className="pain-grid">
            {painPoints.map((p, i) => (
              <div className="pain-card" key={i}>
                <div className="pain-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {p.strike && <p style={{ marginTop: 12 }} className="strike">→ {p.strike}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-bg" />
        <div className="features-inner">
          <div className="features-header">
            <div className="section-label">What's included</div>
            <h2 className="section-title" style={{ color: "white" }}>Everything your church<br />needs in one place.</h2>
            <p className="section-sub">No plugins. No add-ons. No consultants. Just the features churches actually use.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="feature-tag">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="comparison">
        <div className="comparison-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-label">How we compare</div>
            <h2 className="section-title">Iris Financial vs. QuickBooks<br />for churches</h2>
          </div>
          <div className="comp-table">
            <div className="comp-header">
              <div className="comp-col-head feature-col">Feature</div>
              <div className="comp-col-head iris">Iris Financial <span className="comp-iris-badge">Recommended</span></div>
              <div className="comp-col-head quickbooks">QuickBooks</div>
            </div>
            {[
              ["Donor Management", "✓ Built-in", "✗ Not available"],
              ["Dedicated Fund Tracking", "✓ Built-in", "✗ Manual workaround"],
              ["Year-End Giving Statements", "✓ 1-click bulk email", "✗ Not available"],
              ["IRS Form 990 Export", "✓ Included", "✗ Requires add-on"],
              ["Online Giving / Mobile Money", "✓ Iris Pay included", "✗ Extra integration"],
              ["Bilingual (EN/FR)", "✓ Native", "✗ English only"],
              ["Church-specific reports", "✓ Pre-built", "✗ Manual setup"],
            ].map(([feat, iris, qb], i) => (
              <div className="comp-row" key={i}>
                <div className="comp-cell feature-name">{feat}</div>
                <div className="comp-cell iris-val">
                  <span className="check">{iris.startsWith("✓") ? "✓" : "✗"}</span>
                  {iris.replace("✓ ", "").replace("✗ ", "")}
                </div>
                <div className="comp-cell qb-val">
                  <span className={qb.startsWith("✓") ? "check" : "cross"}>{qb.startsWith("✓") ? "✓" : "✗"}</span>
                  {qb.replace("✓ ", "").replace("✗ ", "")}
                </div>
              </div>
            ))}
            <div className="comp-row price-row">
              <div className="comp-cell feature-name" style={{ fontWeight: 700 }}>Starting Price</div>
              <div className="comp-cell"><span className="price-iris">$0/mo</span></div>
              <div className="comp-cell"><span className="price-qb">$115/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-header">
            <div className="section-label">Church Stories</div>
            <h2 className="section-title">What church leaders are saying</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="stars">★★★★★</div>
                <div className="testi-quote">"</div>
                <p className="testi-text">{t.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initial}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="pricing-inner">
          <div className="section-label" style={{ color: "var(--gold)", textAlign: "center" }}>Pricing for churches</div>
          <h2 className="section-title" style={{ color: "white", textAlign: "center" }}>Start free.<br />Scale as you grow.</h2>
          <div className="pricing-card">
            <div className="price-label">Church Free Tier</div>
            <div className="price-plan">Iris Financial — Church Edition</div>
            <div className="price-amount"><sup>$</sup>0</div>
            <div className="price-cadence">per month — forever free to start</div>
            <div className="price-features">
              {priceFeatures.map((f, i) => (
                <div className="price-feature" key={i}>
                  <span className="chk">✓</span> {f}
                </div>
              ))}
            </div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>
              Start Free — No Credit Card Required
            </button>
            <div className="pricing-note">Upgrade to Professional ($79/mo) when your church is ready for advanced features.</div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-inner">
          <div className="cta-icon">✝</div>
          <h2 className="cta-title">Your congregation deserves<br /><em>financial clarity.</em></h2>
          <p className="cta-sub">Join hundreds of churches that replaced spreadsheets and the wrong software with a platform actually built for them. Free to start. No credit card. 15 minutes to set up.</p>
          <div className="cta-actions">
            <button className="btn-cta-main" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="btn-cta-sec">Schedule a Demo</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <strong>Iris Financial</strong> — by Iris Secure Technology Solutions · irisfinancial.tech
        </div>
        <div className="footer-links">
          <span className="footer-link">Privacy</span>
          <span className="footer-link">Terms</span>
          <span className="footer-link">Contact</span>
        </div>
      </footer>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            {!submitted ? (
              <>
                <div className="modal-title">Start Free Today</div>
                <div className="modal-sub">Set up your church account in 15 minutes. No credit card required.</div>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" placeholder="Pastor / Treasurer name" value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Church Name</label>
                  <input className="form-input" placeholder="e.g. Grace Fellowship Church" value={formState.church} onChange={e => setFormState({ ...formState, church: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="your@church.org" value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Congregation Size</label>
                  <select className="form-input" value={formState.size} onChange={e => setFormState({ ...formState, size: e.target.value })}>
                    <option value="">Select size</option>
                    <option>Under 50 members</option>
                    <option>50–200 members</option>
                    <option>200–500 members</option>
                    <option>500+ members</option>
                  </select>
                </div>
                <button className="form-submit" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="form-success">
                <div className="success-icon">🙏</div>
                <h3>You're on your way!</h3>
                <p>We'll send your account setup link to <strong>{formState.email}</strong> within minutes. Welcome to Iris Financial.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
