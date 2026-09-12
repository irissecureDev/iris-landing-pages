import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600&family=Nunito:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --flour: #FAF6EF;
    --parchment: #F2EAD8;
    --dough: #E8D9BC;
    --crust: #C8A96E;
    --crust-dark: #A07840;
    --brown-deep: #5C3A1E;
    --brown-rich: #7A4A28;
    --chocolate: #2D1A0E;
    --rose: #E8766A;
    --rose-light: #F5A898;
    --sage: #7A9E7E;
    --sage-light: #A8C5AC;
    --butter: #F5C842;
    --butter-light: #FAE07A;
    --ink: #2A1F14;
    --text-mid: #6B5344;
    --text-soft: #9B8070;
    --white: #FFFFFF;
    --green-fresh: #4A7C59;
    --red-warn: #C0392B;
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'Nunito', sans-serif;
    background: var(--flour);
    color: var(--ink);
    overflow-x: hidden;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50% { transform: translateY(-12px) rotate(1deg); }
  }
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0) rotate(2deg); }
    50% { transform: translateY(-8px) rotate(-1deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes driftLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(200,169,110,0.5); }
    50% { box-shadow: 0 0 0 12px rgba(200,169,110,0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }
  @keyframes rise {
    0% { transform: scaleY(0); transform-origin: bottom; }
    100% { transform: scaleY(1); transform-origin: bottom; }
  }

  /* ─── NAV ─── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 68px; padding: 0 48px;
    background: rgba(250,246,239,0.95);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--dough);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-logo-mark {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--crust);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', serif; font-weight: 700; color: white; font-size: 17px;
    box-shadow: 0 3px 12px rgba(200,169,110,0.4);
  }
  .nav-wordmark {
    font-family: 'Fraunces', serif; font-weight: 700;
    font-size: 20px; color: var(--brown-deep); letter-spacing: -0.01em;
  }
  .nav-wordmark span { color: var(--crust-dark); }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk {
    font-size: 14px; font-weight: 600; color: var(--text-mid);
    cursor: pointer; transition: color 0.2s;
  }
  .nav-lnk:hover { color: var(--brown-deep); }
  .nav-cta {
    background: var(--crust); color: white;
    padding: 10px 24px; border-radius: 100px; border: none; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 14px;
    letter-spacing: 0.02em; transition: all 0.25s;
    box-shadow: 0 4px 16px rgba(200,169,110,0.35);
  }
  .nav-cta:hover { background: var(--crust-dark); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,169,110,0.45); }

  /* ─── SCENT STRIP ─── */
  .scent-strip {
    position: fixed; top: 68px; left: 0; right: 0; z-index: 199;
    height: 34px; background: var(--crust);
    display: flex; align-items: center; overflow: hidden;
  }
  .scent-inner { display: flex; animation: driftLeft 24s linear infinite; white-space: nowrap; }
  .scent-item {
    padding: 0 24px; font-size: 12px; font-weight: 700;
    color: rgba(255,255,255,0.85); letter-spacing: 0.08em;
    display: flex; align-items: center; gap: 10px;
  }
  .scent-sep { opacity: 0.4; font-size: 10px; }

  /* ─── HERO ─── */
  .hero {
    min-height: 100vh;
    background: var(--flour);
    padding: 130px 48px 80px;
    position: relative; overflow: hidden;
  }
  .hero-bg-circle-1 {
    position: absolute; right: -120px; top: -120px;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, var(--dough) 0%, transparent 70%);
    opacity: 0.6; pointer-events: none;
  }
  .hero-bg-circle-2 {
    position: absolute; left: -80px; bottom: 0;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,118,106,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-dots {
    position: absolute; inset: 0; opacity: 0.4;
    background-image: radial-gradient(circle, var(--dough) 1.5px, transparent 1.5px);
    background-size: 28px 28px;
    pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
    max-width: 1200px; margin: 0 auto; align-items: center;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200,169,110,0.12); border: 1.5px solid rgba(200,169,110,0.3);
    color: var(--crust-dark); padding: 6px 16px; border-radius: 100px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 28px;
    animation: fadeUp 0.5s ease both;
  }
  .hero-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(52px, 6vw, 80px);
    font-weight: 900; line-height: 1.0;
    color: var(--brown-deep); margin-bottom: 24px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title em { font-style: italic; color: var(--crust); }
  .hero-title .rose-txt { color: var(--rose); }
  .hero-sub {
    font-size: 17px; color: var(--text-mid); line-height: 1.75;
    font-weight: 400; max-width: 480px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions {
    display: flex; gap: 14px; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-crust {
    background: var(--crust); color: white;
    padding: 16px 36px; border-radius: 100px; border: none; cursor: pointer;
    font-weight: 700; font-size: 15px; letter-spacing: 0.02em;
    transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 6px 24px rgba(200,169,110,0.4);
  }
  .btn-crust:hover { background: var(--crust-dark); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(200,169,110,0.5); }
  .btn-soft {
    background: white; color: var(--brown-deep);
    padding: 14px 32px; border-radius: 100px; cursor: pointer;
    font-weight: 600; font-size: 15px;
    border: 1.5px solid var(--dough); transition: all 0.25s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  .btn-soft:hover { border-color: var(--crust); color: var(--crust-dark); }
  .hero-proof {
    display: flex; gap: 40px; margin-top: 48px; padding-top: 40px;
    border-top: 1px solid var(--dough);
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .proof-val {
    font-family: 'Fraunces', serif; font-size: 34px;
    font-weight: 900; color: var(--crust); line-height: 1;
  }
  .proof-lbl { font-size: 13px; color: var(--text-soft); margin-top: 4px; font-weight: 500; }

  /* ─── HERO RIGHT: RECIPE COST CARD ─── */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; position: relative; }
  .recipe-card {
    background: white; border-radius: 24px;
    border: 1.5px solid var(--dough);
    box-shadow: 0 32px 72px rgba(92,58,30,0.12), 0 8px 24px rgba(92,58,30,0.06);
    overflow: hidden;
  }
  .recipe-header {
    background: var(--parchment); padding: 18px 24px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--dough);
  }
  .recipe-title-row { display: flex; align-items: center; gap: 10px; }
  .recipe-icon { font-size: 22px; }
  .recipe-name { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: var(--brown-deep); }
  .recipe-sub { font-size: 12px; color: var(--text-soft); margin-top: 1px; }
  .recipe-profit-badge {
    background: rgba(74,124,89,0.1); border: 1.5px solid rgba(74,124,89,0.25);
    color: var(--green-fresh); padding: 5px 14px; border-radius: 100px;
    font-size: 12px; font-weight: 700;
  }
  .recipe-ingr { padding: 0 24px; }
  .ingr-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 0 8px; border-bottom: 1px solid var(--dough);
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-soft);
  }
  .ingr-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0; border-bottom: 1px solid rgba(0,0,0,0.04);
    transition: background 0.15s;
  }
  .ingr-row:last-child { border-bottom: none; }
  .ingr-left { display: flex; align-items: center; gap: 10px; }
  .ingr-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--crust); flex-shrink: 0; }
  .ingr-name { font-size: 14px; font-weight: 600; color: var(--brown-deep); }
  .ingr-qty { font-size: 12px; color: var(--text-soft); margin-top: 1px; }
  .ingr-cost { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 700; color: var(--brown-rich); }
  .recipe-summary {
    background: var(--parchment); padding: 16px 24px;
    border-top: 1px solid var(--dough);
  }
  .summary-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; font-size: 14px;
  }
  .summary-lbl { color: var(--text-mid); font-weight: 500; }
  .summary-val { font-family: 'Fraunces', serif; font-weight: 700; color: var(--brown-deep); }
  .summary-val.green { color: var(--green-fresh); font-size: 17px; }
  .summary-val.rose { color: var(--rose); }
  .recipe-cta-strip {
    background: var(--crust); padding: 13px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .rstrip-txt { font-size: 13px; color: rgba(255,255,255,0.85); font-weight: 600; }
  .rstrip-btn {
    background: white; color: var(--crust-dark); padding: 7px 16px;
    border-radius: 100px; border: none; cursor: pointer;
    font-size: 12px; font-weight: 700; transition: all 0.2s;
  }
  .rstrip-btn:hover { background: var(--butter-light); }

  /* ─── FLOATING DECO ─── */
  .deco-float-1 {
    position: absolute; top: -20px; right: -20px;
    font-size: 52px; animation: float 5s ease-in-out infinite;
    filter: drop-shadow(0 8px 16px rgba(200,169,110,0.3)); z-index: 3;
  }
  .deco-float-2 {
    position: absolute; bottom: -16px; left: -16px;
    font-size: 40px; animation: floatSlow 6s ease-in-out infinite;
    filter: drop-shadow(0 6px 12px rgba(232,118,106,0.25)); z-index: 3;
  }

  /* ─── PAIN ─── */
  .pain {
    background: var(--brown-deep); padding: 100px 48px;
    position: relative; overflow: hidden;
  }
  .pain-bg-wave {
    position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
    background: var(--parchment);
    clip-path: ellipse(55% 100% at 50% 100%);
  }
  .pain-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
  .section-eyebrow-light {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--crust); margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--crust); }
  .section-title-light {
    font-family: 'Fraunces', serif;
    font-size: clamp(36px, 4.5vw, 56px); font-weight: 900;
    line-height: 1.1; color: white; margin-bottom: 16px;
  }
  .section-title-light em { font-style: italic; color: var(--crust); }
  .section-body-light { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.75; max-width: 560px; font-weight: 300; margin-bottom: 56px; }
  .pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .pain-card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px; padding: 36px 28px; transition: all 0.3s; cursor: default;
  }
  .pain-card:hover { background: rgba(200,169,110,0.1); border-color: rgba(200,169,110,0.3); transform: translateY(-4px); }
  .pain-emoji { font-size: 36px; margin-bottom: 16px; display: block; }
  .pain-card h3 { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: white; margin-bottom: 12px; }
  .pain-card p { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.7; }
  .pain-card .tag {
    display: inline-block; margin-top: 14px;
    background: rgba(232,118,106,0.15); border: 1px solid rgba(232,118,106,0.3);
    color: var(--rose-light); padding: 4px 12px; border-radius: 100px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
  }
  .pain-stat-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px;
  }
  .pain-stat {
    background: rgba(245,200,66,0.08); border: 1px solid rgba(245,200,66,0.2);
    border-radius: 14px; padding: 24px; text-align: center;
  }
  .pain-stat-val { font-family: 'Fraunces', serif; font-size: 40px; font-weight: 900; color: var(--butter-light); line-height: 1; }
  .pain-stat-lbl { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 6px; }

  /* ─── FEATURES ─── */
  .features { background: var(--parchment); padding: 100px 48px; }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .section-eyebrow-warm {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--crust-dark); margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .section-title-warm {
    font-family: 'Fraunces', serif;
    font-size: clamp(36px, 4.5vw, 54px); font-weight: 900;
    line-height: 1.1; color: var(--brown-deep); margin-bottom: 14px;
  }
  .section-title-warm em { font-style: italic; color: var(--crust); }
  .section-body-warm { font-size: 16px; color: var(--text-mid); line-height: 1.75; max-width: 560px; font-weight: 400; }
  .features-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 56px;
  }
  .feat-card {
    background: white; border-radius: 20px; padding: 36px;
    border: 1.5px solid var(--dough); transition: all 0.3s; cursor: default;
    position: relative; overflow: hidden;
  }
  .feat-card::after {
    content: ''; position: absolute; bottom: 0; left: 24px; right: 24px; height: 2px;
    background: linear-gradient(90deg, var(--crust), var(--rose));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
    border-radius: 100px;
  }
  .feat-card:hover::after { transform: scaleX(1); }
  .feat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 56px rgba(92,58,30,0.1); border-color: rgba(200,169,110,0.4); }
  .feat-icon-wrap {
    width: 52px; height: 52px; border-radius: 14px;
    background: var(--parchment); border: 1.5px solid var(--dough);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; margin-bottom: 18px;
    box-shadow: 0 4px 12px rgba(200,169,110,0.15);
  }
  .feat-card h3 { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--brown-deep); margin-bottom: 10px; }
  .feat-card p { font-size: 14px; color: var(--text-mid); line-height: 1.7; }
  .feat-tag {
    display: inline-block; margin-top: 14px;
    background: rgba(200,169,110,0.1); border: 1px solid rgba(200,169,110,0.25);
    color: var(--crust-dark); padding: 4px 12px; border-radius: 100px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
  }

  /* ─── PRODUCTION PLANNER MOCKUP ─── */
  .planner-section { background: var(--flour); padding: 80px 48px; }
  .planner-inner { max-width: 1100px; margin: 0 auto; }
  .planner-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; margin-top: 56px; }
  .planner-card {
    background: white; border-radius: 24px; border: 1.5px solid var(--dough);
    box-shadow: 0 24px 56px rgba(92,58,30,0.08); overflow: hidden;
  }
  .planner-top {
    background: var(--parchment); padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--dough);
  }
  .planner-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--brown-deep); }
  .planner-date { font-size: 12px; color: var(--text-soft); font-weight: 600; }
  .planner-body { padding: 20px 24px; }
  .plan-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-radius: 10px; margin-bottom: 8px;
    background: var(--flour); border: 1px solid var(--dough);
    transition: all 0.2s; cursor: default;
  }
  .plan-row:hover { background: rgba(200,169,110,0.06); border-color: rgba(200,169,110,0.3); }
  .plan-left { display: flex; align-items: center; gap: 12px; }
  .plan-emoji { font-size: 22px; }
  .plan-name { font-weight: 700; font-size: 14px; color: var(--brown-deep); }
  .plan-qty { font-size: 12px; color: var(--text-soft); margin-top: 2px; }
  .plan-right { text-align: right; }
  .plan-cost { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--crust-dark); }
  .plan-margin {
    font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 100px; margin-top: 3px; display: inline-block;
  }
  .plan-margin.good { background: rgba(74,124,89,0.1); color: var(--green-fresh); }
  .plan-margin.warn { background: rgba(192,57,43,0.1); color: var(--red-warn); }
  .planner-footer {
    background: var(--crust); padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pf-lbl { font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 600; }
  .pf-val { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 900; color: white; }

  .planner-feats { display: grid; gap: 16px; }
  .p-feat-row {
    display: flex; align-items: flex-start; gap: 14px; padding: 18px;
    background: white; border-radius: 14px; border: 1.5px solid var(--dough);
    transition: all 0.25s;
  }
  .p-feat-row:hover { border-color: var(--crust); box-shadow: 0 8px 24px rgba(200,169,110,0.12); }
  .p-feat-icon {
    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
    background: var(--parchment); border: 1px solid var(--dough);
    display: flex; align-items: center; justify-content: center; font-size: 18px;
  }
  .p-feat-text h4 { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: var(--brown-deep); margin-bottom: 4px; }
  .p-feat-text p { font-size: 13px; color: var(--text-mid); line-height: 1.6; }

  /* ─── MORE FEATURES ─── */
  .more-feat { background: var(--parchment); padding: 80px 48px; }
  .more-feat-inner { max-width: 1100px; margin: 0 auto; }
  .more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 52px; }
  .more-card {
    background: white; border-radius: 18px; padding: 28px;
    border: 1.5px solid var(--dough); transition: all 0.3s; cursor: default;
  }
  .more-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(92,58,30,0.08); border-color: rgba(200,169,110,0.4); }
  .more-card-emoji { font-size: 28px; margin-bottom: 14px; display: block; }
  .more-card h3 { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 700; color: var(--brown-deep); margin-bottom: 8px; }
  .more-card p { font-size: 13px; color: var(--text-mid); line-height: 1.65; }

  /* ─── COMPARISON ─── */
  .comparison { background: var(--flour); padding: 100px 48px; }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap {
    background: white; border-radius: 24px; overflow: hidden;
    border: 1.5px solid var(--dough); margin-top: 52px;
    box-shadow: 0 16px 56px rgba(92,58,30,0.08);
  }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--parchment); }
  .ch { padding: 20px 24px; }
  .ch.feat-h { font-size: 11px; color: var(--text-soft); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .ch.iris-h {
    font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--crust-dark);
    display: flex; align-items: center; gap: 8px;
  }
  .ch.other-h { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: var(--text-soft); }
  .iris-rec-pill {
    background: var(--crust); color: white; font-size: 9px; font-family: 'Nunito', sans-serif;
    font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 2px 8px; border-radius: 100px;
  }
  .comp-row-r { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--dough); transition: background 0.2s; }
  .comp-row-r:hover { background: rgba(200,169,110,0.04); }
  .cc { padding: 15px 24px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
  .cc.feat-c { color: var(--brown-deep); font-weight: 600; }
  .cc.iris-c { color: var(--text-mid); font-weight: 500; }
  .cc.other-c { color: var(--text-soft); }
  .ck { color: var(--green-fresh); font-size: 17px; font-weight: 700; }
  .cx { color: var(--red-warn); font-size: 17px; font-weight: 700; }
  .price-row-r { background: rgba(200,169,110,0.05); border-top: 2px solid rgba(200,169,110,0.25) !important; }
  .big-iris { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: var(--crust-dark) !important; }
  .big-other { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 900; color: var(--red-warn) !important; }

  /* ─── TESTIMONIALS ─── */
  .testimonials { background: var(--brown-deep); padding: 100px 48px; }
  .testimonials-inner { max-width: 1100px; margin: 0 auto; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px; }
  .testi-card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px; padding: 36px; transition: all 0.3s;
  }
  .testi-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.08); border-color: rgba(200,169,110,0.3); }
  .testi-stars { color: var(--butter); font-size: 15px; letter-spacing: 2px; margin-bottom: 14px; }
  .testi-q { font-family: 'Fraunces', serif; font-size: 52px; line-height: 1; color: var(--crust); opacity: 0.4; margin-bottom: 6px; }
  .testi-text { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-av {
    width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
    background: var(--crust); color: white;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', serif; font-size: 18px; font-weight: 900;
    box-shadow: 0 4px 12px rgba(200,169,110,0.4);
  }
  .testi-name { font-weight: 700; font-size: 14px; color: white; }
  .testi-role { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 2px; }

  /* ─── PRICING ─── */
  .pricing { background: var(--flour); padding: 100px 48px; }
  .pricing-inner { max-width: 740px; margin: 0 auto; text-align: center; }
  .pricing-card {
    background: white; border-radius: 28px; padding: 56px 52px; margin-top: 52px;
    border: 2px solid var(--dough); position: relative; overflow: hidden;
    box-shadow: 0 24px 64px rgba(92,58,30,0.1);
  }
  .pricing-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--crust), var(--rose), var(--butter), var(--crust));
    background-size: 300%; animation: shimmer 4s linear infinite;
  }
  .p-ribbon {
    display: inline-block; background: var(--crust); color: white;
    font-weight: 800; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 6px 20px; border-radius: 100px; margin-bottom: 20px;
    box-shadow: 0 4px 16px rgba(200,169,110,0.4);
  }
  .p-name { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: var(--brown-deep); margin-bottom: 8px; }
  .p-price { font-family: 'Fraunces', serif; font-size: 88px; font-weight: 900; color: var(--crust); line-height: 1; margin: 16px 0 4px; }
  .p-price sup { font-size: 36px; vertical-align: top; margin-top: 18px; }
  .p-per { font-size: 15px; color: var(--text-soft); margin-bottom: 36px; }
  .p-feats { text-align: left; margin: 28px 0; }
  .p-feat {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 0; border-bottom: 1px solid var(--dough);
    font-size: 15px; color: var(--text-mid);
  }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-fresh); font-size: 17px; font-weight: 700; }
  .p-cta {
    width: 100%; background: var(--crust); color: white;
    padding: 18px; border-radius: 100px; border: none; cursor: pointer;
    font-weight: 800; font-size: 15px; letter-spacing: 0.03em; transition: all 0.25s;
    box-shadow: 0 8px 32px rgba(200,169,110,0.4);
  }
  .p-cta:hover { background: var(--crust-dark); transform: translateY(-2px); box-shadow: 0 14px 48px rgba(200,169,110,0.5); }
  .p-note { font-size: 13px; color: var(--text-soft); margin-top: 14px; }

  /* ─── CTA SECTION ─── */
  .cta-section {
    background: var(--parchment); padding: 100px 48px; text-align: center;
    border-top: 1px solid var(--dough); position: relative; overflow: hidden;
  }
  .cta-bg-dots {
    position: absolute; inset: 0; opacity: 0.4;
    background-image: radial-gradient(circle, var(--dough) 1.5px, transparent 1.5px);
    background-size: 24px 24px; pointer-events: none;
  }
  .cta-inner { position: relative; z-index: 2; max-width: 620px; margin: 0 auto; }
  .cta-emoji { font-size: 64px; display: block; margin-bottom: 24px; animation: wiggle 3s ease-in-out infinite; }
  .cta-title {
    font-family: 'Fraunces', serif; font-size: clamp(36px, 5vw, 58px);
    font-weight: 900; color: var(--brown-deep); line-height: 1.1; margin-bottom: 20px;
  }
  .cta-title em { font-style: italic; color: var(--crust); }
  .cta-sub { font-size: 17px; color: var(--text-mid); line-height: 1.75; margin-bottom: 40px; font-weight: 400; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main {
    background: var(--brown-deep); color: white;
    padding: 18px 48px; border-radius: 100px; border: none; cursor: pointer;
    font-weight: 700; font-size: 15px; transition: all 0.25s;
    box-shadow: 0 8px 32px rgba(92,58,30,0.2);
  }
  .cta-btn-main:hover { background: var(--brown-rich); transform: translateY(-2px); box-shadow: 0 14px 48px rgba(92,58,30,0.3); }
  .cta-btn-sec {
    background: white; color: var(--brown-deep);
    padding: 16px 44px; border-radius: 100px; cursor: pointer;
    font-weight: 600; font-size: 15px;
    border: 2px solid var(--dough); transition: all 0.25s;
  }
  .cta-btn-sec:hover { border-color: var(--crust); color: var(--crust-dark); }

  /* ─── FOOTER ─── */
  .footer {
    background: var(--brown-deep); padding: 36px 48px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
  }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.35); }
  .footer-copy strong { color: var(--crust); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: rgba(255,255,255,0.3); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--crust); }

  /* ─── MODAL ─── */
  .modal-ov {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(44,26,14,0.75); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .modal-box {
    background: white; border-radius: 28px; padding: 48px;
    max-width: 480px; width: 100%; position: relative;
    border: 1.5px solid var(--dough);
    animation: scaleIn 0.3s ease;
    box-shadow: 0 40px 80px rgba(44,26,14,0.2);
  }
  .modal-x {
    position: absolute; top: 20px; right: 20px;
    background: var(--flour); border: 1px solid var(--dough);
    color: var(--text-soft); width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; transition: all 0.2s;
  }
  .modal-x:hover { background: var(--parchment); color: var(--brown-deep); }
  .modal-h { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 900; color: var(--brown-deep); margin-bottom: 6px; }
  .modal-s { color: var(--text-soft); font-size: 14px; margin-bottom: 28px; line-height: 1.6; }
  .f-group { margin-bottom: 18px; }
  .f-label { font-size: 12px; font-weight: 700; color: var(--crust-dark); margin-bottom: 6px; display: block; letter-spacing: 0.06em; text-transform: uppercase; }
  .f-input {
    width: 100%; padding: 13px 16px; border-radius: 12px;
    background: var(--flour); border: 1.5px solid var(--dough);
    font-size: 14px; font-family: 'Nunito', sans-serif; color: var(--brown-deep);
    outline: none; transition: border-color 0.2s;
  }
  .f-input::placeholder { color: var(--text-soft); }
  .f-input:focus { border-color: var(--crust); background: white; }
  .f-btn {
    width: 100%; background: var(--crust); color: white;
    padding: 15px; border-radius: 100px; border: none; cursor: pointer;
    font-weight: 800; font-size: 15px; margin-top: 8px; transition: all 0.25s;
    box-shadow: 0 6px 24px rgba(200,169,110,0.4);
  }
  .f-btn:hover { background: var(--crust-dark); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-emoji { font-size: 56px; display: block; margin-bottom: 16px; animation: float 3s ease-in-out infinite; }
  .success-h { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: var(--brown-deep); margin-bottom: 10px; }
  .success-p { color: var(--text-mid); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero { padding: 120px 20px 64px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-proof { flex-wrap: wrap; gap: 20px; }
    .pain-grid, .pain-stat-row, .more-grid, .testi-grid, .features-grid { grid-template-columns: 1fr; }
    .planner-layout { grid-template-columns: 1fr; }
    .pain, .features, .planner-section, .more-feat, .comparison, .testimonials, .pricing, .cta-section { padding: 70px 20px; }
    .comp-head, .comp-row-r { grid-template-columns: 1.2fr 1fr 1fr; }
    .cc, .ch { padding: 12px 14px; font-size: 12px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
    .pricing-card, .modal-box { padding: 36px 24px; }
  }
`;

const ingredients = [
  { name: "Bread Flour", qty: "500g", cost: "$0.48" },
  { name: "Unsalted Butter", qty: "120g", cost: "$0.72" },
  { name: "Whole Eggs", qty: "3 large", cost: "$0.54" },
  { name: "Active Yeast", qty: "7g", cost: "$0.12" },
  { name: "Sugar + Salt", qty: "30g / 8g", cost: "$0.08" },
];

const mainFeatures = [
  { icon: "⚖️", title: "Gram-Level Recipe Costing", desc: "Enter every ingredient down to the gram. See the exact cost-per-unit for every baked good you produce, updated automatically when supplier prices change.", tag: "Bakery-Specific" },
  { icon: "📋", title: "Daily Production Planning", desc: "Plan your bake schedule by item, quantity, and batch. See ingredient requirements pulled automatically from your inventory before you start.", tag: "Saves Waste" },
  { icon: "🏪", title: "Cash Register & POS", desc: "Sell at the counter with a built-in register. Every transaction syncs to your books instantly — no manual entry, no end-of-day reconciliation hell.", tag: "Built-in" },
  { icon: "🛒", title: "Reseller & Wholesale Portal", desc: "Set wholesale pricing tiers for cafés, grocery partners, and bulk buyers. Let resellers place orders directly — tracked, invoiced, and collected automatically.", tag: "Revenue Growth" },
];

const plannerItems = [
  { emoji: "🥐", name: "Butter Croissants", qty: "48 units · Batch x3", cost: "$14.40", margin: "67%", good: true },
  { emoji: "🍞", name: "Sourdough Loaves", qty: "12 loaves", cost: "$8.10", margin: "72%", good: true },
  { emoji: "🎂", name: "Birthday Cakes (Custom)", qty: "4 orders", cost: "$31.20", margin: "58%", good: true },
  { emoji: "🍩", name: "Glazed Donuts", qty: "60 units", cost: "$6.90", margin: "44% ⚠", good: false },
];

const moreFeat = [
  { emoji: "💳", title: "Iris Pay Checkout", desc: "Accept card and mobile payments at the counter. Every sale flows straight to your P&L." },
  { emoji: "📦", title: "Ingredient Inventory", desc: "Track flour, butter, eggs, and every other ingredient. Auto-alerts when stock falls below your threshold." },
  { emoji: "📄", title: "Custom Invoice & QR", desc: "Send professional invoices to wholesale accounts and event clients with your logo and a payment QR code." },
  { emoji: "📊", title: "Profitability by Product", desc: "See which items make you the most money. Stop subsidizing your low-margin bestsellers." },
  { emoji: "🧑‍🍳", title: "Staff Hours & Payroll", desc: "Log baker hours by shift, calculate wages, and run payroll — all from the same platform." },
  { emoji: "📈", title: "Weekly Sales Reports", desc: "Revenue by product, top-selling items, ingredient usage, and net margin — every Monday morning." },
];

const testimonials = [
  { q: "I was losing money on my most popular items and had no idea. The recipe costing tool showed me my croissants were at 71% margin and my custom cakes were at 38%. I repriced the cakes and made $600 more that month.", name: "Amara J.", role: "Owner — Amara's Pâtisserie, Brooklyn NY", init: "A" },
  { q: "The wholesale portal is a game-changer. I have 6 café accounts now ordering online every week. The invoices go out automatically. I used to spend 3 hours on admin. Now it's 20 minutes.", name: "Sophie L.", role: "Baker-Owner — Lune Bakehouse, Austin TX", init: "S" },
  { q: "Before this, I was guessing how much flour to order every week. Now the production planner tells me exactly what I need based on what I have scheduled. Zero waste weeks are actually possible.", name: "David O.", role: "Head Baker — The Grain Studio, Atlanta GA", init: "D" },
];

export default function BakeryLandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", bakery: "", email: "", type: "" });
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
      await fetch("https://formspree.io/f/xdeovvql", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          bakery: form.bakery,
          email: form.email,
          bakery_type: form.type,
          vertical: "Bakery",
        }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "https://irisfinancial.tech/auth/signup?vertical=bakery&ref=landing";
    }, 2000);
  };

  const scentItems = [
    "Recipe Costing", "🥐", "Production Planning", "🍞", "Gram-Level Tracking",
    "🎂", "Wholesale Portal", "🍩", "Cash Register", "☕", "Inventory Alerts",
    "🥖", "Reseller Pricing", "🍰", "Daily P&L",
  ];

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-mark">I</div>
          <div className="nav-wordmark">Iris <span>Financial</span></div>
        </div>
        <div className="nav-links">
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Demo</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      {/* SCENT STRIP */}
      <div className="scent-strip">
        <div className="scent-inner">
          {[...scentItems, ...scentItems].map((item, i) => (
            <span key={i} className="scent-item">
              {item} <span className="scent-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-bg-circle-1" />
        <div className="hero-bg-circle-2" />
        <div className="hero-layout">
          <div>
            <div className="hero-tag">🥖 Built for Bakeries & Food Businesses</div>
            <h1 className="hero-title">
              Know the<br />
              cost of every<br />
              <em>crumb.</em>
            </h1>
            <p className="hero-sub">
              Gram-level recipe costing, production planning, a built-in cash register, and a wholesale reseller portal — one platform built specifically for bakeries. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-crust" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-soft">Watch Demo ▶</button>
            </div>
            <div className="hero-proof">
              <div>
                <div className="proof-val">$0</div>
                <div className="proof-lbl">to get started</div>
              </div>
              <div>
                <div className="proof-val">~32%</div>
                <div className="proof-lbl">avg ingredient waste reduced</div>
              </div>
              <div>
                <div className="proof-val">1 platform</div>
                <div className="proof-lbl">replaces 5+ tools</div>
              </div>
            </div>
          </div>

          {/* RECIPE COST CARD */}
          <div className="hero-right">
            <div className="deco-float-1">🥐</div>
            <div className="deco-float-2">🍰</div>
            <div className="recipe-card">
              <div className="recipe-header">
                <div className="recipe-title-row">
                  <span className="recipe-icon">📋</span>
                  <div>
                    <div className="recipe-name">Classic Brioche — 12 units</div>
                    <div className="recipe-sub">Recipe cost breakdown · Auto-updated</div>
                  </div>
                </div>
                <span className="recipe-profit-badge">✓ 68% margin</span>
              </div>
              <div className="recipe-ingr">
                <div className="ingr-head">
                  <span>Ingredient</span>
                  <span>Cost / batch</span>
                </div>
                {ingredients.map((ing, i) => (
                  <div className="ingr-row" key={i}>
                    <div className="ingr-left">
                      <div className="ingr-dot" />
                      <div>
                        <div className="ingr-name">{ing.name}</div>
                        <div className="ingr-qty">{ing.qty}</div>
                      </div>
                    </div>
                    <div className="ingr-cost">{ing.cost}</div>
                  </div>
                ))}
              </div>
              <div className="recipe-summary">
                <div className="summary-row">
                  <span className="summary-lbl">Total ingredient cost</span>
                  <span className="summary-val">$1.94</span>
                </div>
                <div className="summary-row">
                  <span className="summary-lbl">Selling price / unit</span>
                  <span className="summary-val">$6.50</span>
                </div>
                <div className="summary-row">
                  <span className="summary-lbl">Gross margin per batch</span>
                  <span className="summary-val green">+$54.72</span>
                </div>
              </div>
              <div className="recipe-cta-strip">
                <span className="rstrip-txt">📦 Ingredient prices synced to your supplier invoices</span>
                <button className="rstrip-btn">Update costs</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-bg-wave" />
        <div className="pain-inner">
          <div className="section-eyebrow-light">
            <div className="eyebrow-dot" />
            Sound familiar?
          </div>
          <h2 className="section-title-light">Bakers are artists.<br />But the <em>business</em> can break them.</h2>
          <p className="section-body-light">Most bakeries run on passion and guesswork. The ones that scale run on data — recipe costs, waste tracking, and margin visibility.</p>
          <div className="pain-grid">
            {[
              { emoji: "🔢", title: "You price by feel, not math", body: "Your croissants sell out every day — but are they actually profitable? Without gram-level costing, you're guessing.", tag: "Most common mistake" },
              { emoji: "📦", title: "Overproduction kills margins", body: "You bake too much and throw away the rest. Every discarded loaf is pure loss. Without production planning, this never stops.", tag: "Avg 18% waste" },
              { emoji: "🧾", title: "Wholesale chaos", body: "You have three café clients ordering by text message. You invoice them manually, sometimes late. You have no idea if it's actually worth it.", tag: "Revenue leak" },
            ].map((p, i) => (
              <div className="pain-card" key={i}>
                <span className="pain-emoji">{p.emoji}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="tag">{p.tag}</div>
              </div>
            ))}
          </div>
          <div className="pain-stat-row">
            {[
              { val: "32%", lbl: "Average ingredient waste in bakeries without tracking" },
              { val: "$600+", lbl: "Monthly margin recovered by repricing low-margin items" },
              { val: "3 hrs", lbl: "Weekly admin time saved with automated wholesale invoicing" },
            ].map((s, i) => (
              <div className="pain-stat" key={i}>
                <div className="pain-stat-val">{s.val}</div>
                <div className="pain-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <div className="section-eyebrow-warm">
            <div className="eyebrow-dot" style={{ background: "var(--crust-dark)" }} />
            What's included
          </div>
          <h2 className="section-title-warm">Every tool your bakery<br />needs to <em>thrive.</em></h2>
          <p className="section-body-warm">Not generic accounting software renamed for food. Built specifically for the way bakeries actually work — from the oven to the wholesale order.</p>
          <div className="features-grid">
            {mainFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="feat-tag">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTION PLANNER */}
      <section className="planner-section">
        <div className="planner-inner">
          <div className="section-eyebrow-warm">
            <div className="eyebrow-dot" style={{ background: "var(--crust-dark)" }} />
            Production planning
          </div>
          <h2 className="section-title-warm">Know what to bake<br /><em>before</em> you preheat the oven.</h2>
          <div className="planner-layout">
            <div className="planner-card">
              <div className="planner-top">
                <span className="planner-title">🗓 Today's Bake Schedule</span>
                <span className="planner-date">Monday, June 2</span>
              </div>
              <div className="planner-body">
                {plannerItems.map((item, i) => (
                  <div className="plan-row" key={i}>
                    <div className="plan-left">
                      <span className="plan-emoji">{item.emoji}</span>
                      <div>
                        <div className="plan-name">{item.name}</div>
                        <div className="plan-qty">{item.qty}</div>
                      </div>
                    </div>
                    <div className="plan-right">
                      <div className="plan-cost">{item.cost}</div>
                      <div className={`plan-margin ${item.good ? "good" : "warn"}`}>{item.margin}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="planner-footer">
                <span className="pf-lbl">Today's Ingredient Budget</span>
                <span className="pf-val">$60.60</span>
              </div>
            </div>
            <div className="planner-feats">
              {[
                { icon: "🔄", title: "Auto-pulls from inventory", desc: "As you add items to the bake plan, the system checks your current stock and tells you what to order. No more surprise shortages at 5am." },
                { icon: "📉", title: "Overproduce alerts", desc: "Schedule says 60 donuts but your last 3 Mondays averaged 42 sold. Iris flags the discrepancy before you fire up the fryer." },
                { icon: "💡", title: "Margin-aware scheduling", desc: "Low-margin items get flagged in your production plan. You decide whether to produce them, reprice, or substitute a better-margin alternative." },
              ].map((f, i) => (
                <div className="p-feat-row" key={i}>
                  <div className="p-feat-icon">{f.icon}</div>
                  <div className="p-feat-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MORE FEATURES */}
      <section className="more-feat">
        <div className="more-feat-inner">
          <div className="section-eyebrow-warm">
            <div className="eyebrow-dot" style={{ background: "var(--crust-dark)" }} />
            Everything else
          </div>
          <h2 className="section-title-warm">One login.<br /><em>No more juggling.</em></h2>
          <div className="more-grid">
            {moreFeat.map((f, i) => (
              <div className="more-card" key={i}>
                <span className="more-card-emoji">{f.emoji}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="comparison">
        <div className="comparison-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-eyebrow-warm" style={{ justifyContent: "center" }}>
              <div className="eyebrow-dot" style={{ background: "var(--crust-dark)" }} />
              Side by side
            </div>
            <h2 className="section-title-warm">Iris Financial vs.<br /><em>QuickBooks + spreadsheets</em></h2>
          </div>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch feat-h">Feature</div>
              <div className="ch iris-h">Iris Financial <span className="iris-rec-pill">Best</span></div>
              <div className="ch other-h">QuickBooks + Sheets</div>
            </div>
            {[
              ["Gram-level recipe costing", "✓ Built-in", "✗ Not available"],
              ["Production planning", "✓ Built-in", "✗ Manual spreadsheet"],
              ["Ingredient inventory", "✓ Auto-tracked", "✗ Manual tracking"],
              ["Wholesale / reseller portal", "✓ Built-in", "✗ Not available"],
              ["Built-in cash register / POS", "✓ Iris Pay", "✗ Separate tool needed"],
              ["Supplier invoice sync", "✓ Auto-updates recipe costs", "✗ Manual entry"],
              ["Overproduce alerts", "✓ Built-in", "✗ Not available"],
              ["Bilingual EN/FR", "✓ Native", "✗ English only"],
            ].map(([feat, iris, other], i) => (
              <div className="comp-row-r" key={i}>
                <div className="cc feat-c">{feat}</div>
                <div className="cc iris-c">
                  <span className={iris.startsWith("✓") ? "ck" : "cx"}>{iris.startsWith("✓") ? "✓" : "✗"}</span>
                  {iris.replace("✓ ", "").replace("✗ ", "")}
                </div>
                <div className="cc other-c">
                  <span className={other.startsWith("✓") ? "ck" : "cx"}>{other.startsWith("✓") ? "✓" : "✗"}</span>
                  {other.replace("✓ ", "").replace("✗ ", "")}
                </div>
              </div>
            ))}
            <div className="comp-row-r price-row-r">
              <div className="cc feat-c" style={{ fontWeight: 700 }}>Starting Price</div>
              <div className="cc iris-c"><span className="big-iris">$0/mo</span></div>
              <div className="cc other-c"><span className="big-other">$115+/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="section-eyebrow-light">
            <div className="eyebrow-dot" />
            From the oven
          </div>
          <h2 className="section-title-light">What bakers are saying</h2>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-stars">★★★★★</div>
                <div className="testi-q">"</div>
                <p className="testi-text">{t.q}</p>
                <div className="testi-author">
                  <div className="testi-av">{t.init}</div>
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
          <div className="section-eyebrow-warm" style={{ justifyContent: "center" }}>
            <div className="eyebrow-dot" style={{ background: "var(--crust-dark)" }} />
            Simple pricing
          </div>
          <h2 className="section-title-warm" style={{ textAlign: "center" }}>Start free.<br /><em>Grow from there.</em></h2>
          <div className="pricing-card">
            <div className="p-ribbon">Bakery Free Tier</div>
            <div className="p-name">Iris Financial — Bakery Edition</div>
            <div className="p-price"><sup>$</sup>0</div>
            <div className="p-per">per month — forever free to start</div>
            <div className="p-feats">
              {[
                "Gram-level recipe costing for unlimited products",
                "Daily production planning with inventory pull",
                "Ingredient inventory with reorder alerts",
                "Built-in cash register + Iris Pay checkout",
                "Wholesale reseller portal with auto-invoicing",
                "Supplier invoice sync (auto-updates recipe costs)",
                "Overproduce alerts and margin-aware scheduling",
                "Profitability reports by product line",
                "15-day free trial — no credit card required",
              ].map((f, i) => (
                <div className="p-feat" key={i}><span className="p-ck">✓</span> {f}</div>
              ))}
            </div>
            <button className="p-cta" onClick={() => setShowModal(true)}>
              Start Free — No Credit Card Required
            </button>
            <div className="p-note">Upgrade to Professional ($79/mo) for multi-location, payroll, and advanced analytics.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-bg-dots" />
        <div className="cta-inner">
          <span className="cta-emoji">🥖</span>
          <h2 className="cta-title">Your recipes are perfect.<br />Now make your <em>margins</em> match.</h2>
          <p className="cta-sub">Every unbilled gram, every overproduced batch, every underpriced item is money walking out the door. Iris Financial closes those gaps — free to start, 15 minutes to set up.</p>
          <div className="cta-btns">
            <button className="cta-btn-main" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="cta-btn-sec">Schedule a Demo</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-copy"><strong>Iris Financial</strong> — by Iris Secure Technology Solutions · irisfinancial.tech</div>
        <div className="footer-links">
          <span className="f-lnk">Privacy</span>
          <span className="f-lnk">Terms</span>
          <span className="f-lnk">Contact</span>
        </div>
      </footer>

      {/* MODAL */}
      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}>✕</button>
            {!submitted ? (
              <>
                <div className="modal-h">Start Your Free Account 🥐</div>
                <div className="modal-s">Set up your bakery account in 15 minutes. Your first recipe cost report will surprise you.</div>
                <div className="f-group">
                  <label className="f-label">Your Name</label>
                  <input className="f-input" placeholder="Baker / Owner name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Bakery Name</label>
                  <input className="f-input" placeholder="e.g. Lune Bakehouse" value={form.bakery} onChange={e => setForm({ ...form, bakery: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Email Address</label>
                  <input className="f-input" type="email" placeholder="you@yourbakery.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Bakery Type</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="">Select type</option>
                    <option>Retail Bakery / Storefront</option>
                    <option>Home Bakery</option>
                    <option>Wholesale / Production Bakery</option>
                    <option>Café + Bakery Hybrid</option>
                    <option>Custom Cakes & Events</option>
                    <option>Food Truck / Pop-Up</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <span className="success-emoji">🥖</span>
                <div className="success-h">Fresh start incoming!</div>
                <p className="success-p">Setup link on its way to <strong style={{ color: "var(--crust-dark)" }}>{form.email}</strong>. Your first recipe cost report will be ready before the next bake.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
