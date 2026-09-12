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
    --ink: #2A1F14;
    --text-mid: #6B5344;
    --text-soft: #9B8070;
    --rose: #E8766A;
    --rose-light: #F5A898;
    --butter: #F5C842;
    --butter-light: #FAE07A;
    --green-fresh: #4A7C59;
    --red-warn: #C0392B;
    --white: #FFFFFF;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Nunito', sans-serif; background: var(--flour); color: var(--ink); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
  @keyframes floatSlow { 0%,100% { transform: translateY(0) rotate(2deg); } 50% { transform: translateY(-7px) rotate(-1deg); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(200,169,110,0.5); } 50% { box-shadow: 0 0 0 12px rgba(200,169,110,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; padding: 0 48px;
    background: rgba(250,246,239,0.96); backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--dough);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; gap: 10px; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 14px; font-weight: 600; color: var(--text-mid); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--brown-deep); }
  .nav-cta {
    background: var(--crust); color: white;
    padding: 10px 24px; border-radius: 100px; border: none; cursor: pointer;
    font-weight: 700; font-size: 14px; transition: all 0.25s;
    box-shadow: 0 4px 16px rgba(200,169,110,0.35);
  }
  .nav-cta:hover { background: var(--crust-dark); transform: translateY(-1px); }

  /* MORNING BAR — replaces ticker */
  .morning-bar {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    height: 36px; background: var(--brown-deep);
    display: flex; align-items: center; justify-content: center; gap: 32px;
    padding: 0 48px;
  }
  .mb-clock {
    font-family: 'Fraunces', serif; font-size: 13px; font-weight: 600; color: var(--crust);
    display: flex; align-items: center; gap: 8px;
  }
  .mb-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--crust); animation: blink 2s infinite; }
  .mb-items { display: flex; gap: 24px; align-items: center; }
  .mb-item { font-size: 12px; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 6px; }
  .mb-item strong { color: rgba(255,255,255,0.85); font-weight: 600; }
  .mb-sep { color: rgba(255,255,255,0.2); }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--flour);
    padding: 126px 48px 80px; position: relative; overflow: hidden;
  }
  .hero-dots {
    position: absolute; inset: 0; opacity: 0.4;
    background-image: radial-gradient(circle, var(--dough) 1.5px, transparent 1.5px);
    background-size: 28px 28px; pointer-events: none;
  }
  .hero-circle {
    position: absolute; right: -140px; top: -140px;
    width: 640px; height: 640px; border-radius: 50%;
    background: radial-gradient(circle, var(--dough) 0%, transparent 65%);
    opacity: 0.5; pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
    max-width: 1200px; margin: 0 auto; align-items: center;
  }
  .hero-label {
    font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--crust-dark);
    margin-bottom: 22px; animation: fadeUp 0.5s ease both;
  }
  .hero-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(52px, 6.5vw, 84px); font-weight: 900; line-height: 0.95;
    color: var(--brown-deep); margin-bottom: 24px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title em { font-style: italic; color: var(--crust); }
  .hero-sub {
    font-size: 17px; color: var(--text-mid); line-height: 1.75; font-weight: 400;
    max-width: 460px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-crust {
    background: var(--crust); color: white;
    padding: 16px 36px; border-radius: 100px; border: none; cursor: pointer;
    font-weight: 700; font-size: 15px; transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 6px 24px rgba(200,169,110,0.4);
  }
  .btn-crust:hover { background: var(--crust-dark); transform: translateY(-2px); }
  .btn-soft {
    background: white; color: var(--brown-deep);
    padding: 14px 32px; border-radius: 100px; cursor: pointer;
    font-weight: 600; font-size: 15px;
    border: 1.5px solid var(--dough); transition: all 0.25s;
  }
  .btn-soft:hover { border-color: var(--crust); color: var(--crust-dark); }

  /* HERO RIGHT: RECIPE CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; position: relative; }
  .deco-1 { position: absolute; top: -20px; right: -20px; font-size: 52px; animation: float 5s ease-in-out infinite; filter: drop-shadow(0 8px 16px rgba(200,169,110,0.3)); z-index: 3; }
  .deco-2 { position: absolute; bottom: -16px; left: -16px; font-size: 40px; animation: floatSlow 6s ease-in-out infinite; z-index: 3; }
  .recipe-card {
    background: white; border-radius: 24px; border: 1.5px solid var(--dough);
    box-shadow: 0 32px 72px rgba(92,58,30,0.12); overflow: hidden;
  }
  .rc-head {
    background: var(--parchment); padding: 18px 24px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--dough);
  }
  .rc-head-left { display: flex; align-items: center; gap: 10px; }
  .rc-name { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: var(--brown-deep); }
  .rc-sub { font-size: 12px; color: var(--text-soft); margin-top: 2px; }
  .rc-badge { background: rgba(74,124,89,0.1); border: 1.5px solid rgba(74,124,89,0.25); color: var(--green-fresh); padding: 5px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; }
  .rc-ingr { padding: 0 24px; }
  .rc-head-row { display: flex; justify-content: space-between; padding: 12px 0 8px; border-bottom: 1px solid var(--dough); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--text-soft); }
  .rc-row { display: flex; align-items: center; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid rgba(0,0,0,0.04); }
  .rc-row:last-child { border-bottom: none; }
  .rc-row-left { display: flex; align-items: center; gap: 10px; }
  .rc-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--crust); flex-shrink: 0; }
  .rc-iname { font-size: 14px; font-weight: 600; color: var(--brown-deep); }
  .rc-qty { font-size: 12px; color: var(--text-soft); margin-top: 1px; }
  .rc-cost { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 700; color: var(--brown-rich); }
  .rc-summary { background: var(--parchment); padding: 14px 24px; border-top: 1px solid var(--dough); }
  .rc-sum-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; font-size: 14px; }
  .rc-sum-lbl { color: var(--text-mid); font-weight: 500; }
  .rc-sum-val { font-family: 'Fraunces', serif; font-weight: 700; color: var(--brown-deep); }
  .rc-sum-val.green { color: var(--green-fresh); font-size: 18px; }
  .rc-foot { background: var(--crust); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
  .rc-foot-txt { font-size: 13px; color: rgba(255,255,255,0.85); font-weight: 600; }
  .rc-foot-btn { background: white; color: var(--crust-dark); padding: 6px 14px; border-radius: 100px; border: none; cursor: pointer; font-size: 12px; font-weight: 700; }

  /* PAIN — ASYMMETRIC SPLIT */
  .pain { background: var(--brown-deep); padding: 0; }
  .pain-main {
    display: grid; grid-template-columns: 1.2fr 1fr;
    max-width: none; border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .pain-left {
    padding: 80px 64px 80px 48px; border-right: 1px solid rgba(255,255,255,0.08);
  }
  .pain-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--crust); margin-bottom: 20px; }
  .pain-headline {
    font-family: 'Fraunces', serif;
    font-size: clamp(38px, 4.5vw, 58px); font-weight: 900; line-height: 1.05;
    color: white; margin-bottom: 28px;
  }
  .pain-headline em { font-style: italic; color: var(--crust); }
  .pain-deck { font-size: 16px; color: rgba(255,255,255,0.55); line-height: 1.8; font-weight: 300; max-width: 520px; margin-bottom: 40px; }
  .pain-math {
    background: rgba(255,255,255,0.04); border-left: 3px solid var(--crust);
    padding: 24px 28px;
  }
  .pain-math-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--crust); margin-bottom: 12px; }
  .pain-math-line { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 14px; }
  .pain-math-line:last-child { border-bottom: none; }
  .pain-math-desc { color: rgba(255,255,255,0.5); }
  .pain-math-val { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--rose-light); }
  .pain-math-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-top: 14px; border-top: 2px solid rgba(200,169,110,0.3); }
  .pain-math-total-lbl { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.7); }
  .pain-math-total-val { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 900; color: var(--crust); }

  .pain-right { padding: 80px 48px 80px 40px; display: flex; flex-direction: column; gap: 40px; justify-content: center; }
  .pain-issue { padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .pain-issue:last-child { padding-bottom: 0; border-bottom: none; }
  .pain-issue-emoji { font-size: 28px; margin-bottom: 14px; display: block; }
  .pain-issue h3 { font-family: 'Fraunces', serif; font-size: 21px; font-weight: 700; color: white; margin-bottom: 10px; }
  .pain-issue p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7; }

  /* FEATURES */
  .features { background: var(--parchment); padding: 100px 48px; }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--crust-dark); margin-bottom: 14px; }
  .s-title { font-family: 'Fraunces', serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 900; line-height: 1.05; color: var(--brown-deep); margin-bottom: 14px; }
  .s-title em { font-style: italic; color: var(--crust); }
  .s-body { font-size: 16px; color: var(--text-mid); line-height: 1.75; max-width: 540px; font-weight: 400; }
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 56px; }
  .feat-card {
    background: white; border-radius: 20px; padding: 36px;
    border: 1.5px solid var(--dough); transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
  }
  .feat-card::after {
    content: ''; position: absolute; bottom: 0; left: 24px; right: 24px; height: 2px;
    background: linear-gradient(90deg, var(--crust), var(--rose));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left; border-radius: 100px;
  }
  .feat-card:hover::after { transform: scaleX(1); }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 56px rgba(92,58,30,0.1); border-color: rgba(200,169,110,0.4); }
  .feat-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--parchment); border: 1.5px solid var(--dough); display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 18px; }
  .feat-card h3 { font-family: 'Fraunces', serif; font-size: 21px; font-weight: 700; color: var(--brown-deep); margin-bottom: 10px; }
  .feat-card p { font-size: 14px; color: var(--text-mid); line-height: 1.7; }
  .feat-tag { display: inline-block; margin-top: 14px; background: rgba(200,169,110,0.1); border: 1px solid rgba(200,169,110,0.25); color: var(--crust-dark); padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; }

  /* PRODUCTION PLANNER */
  .planner-section { background: var(--flour); padding: 80px 48px; border-top: 1px solid var(--dough); }
  .planner-inner { max-width: 1100px; margin: 0 auto; }
  .planner-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; margin-top: 52px; }
  .planner-card { background: white; border-radius: 24px; border: 1.5px solid var(--dough); box-shadow: 0 24px 56px rgba(92,58,30,0.08); overflow: hidden; }
  .pl-top { background: var(--parchment); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--dough); }
  .pl-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--brown-deep); }
  .pl-date { font-size: 12px; color: var(--text-soft); font-weight: 600; }
  .pl-body { padding: 20px 24px; }
  .pl-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 10px; margin-bottom: 8px; background: var(--flour); border: 1px solid var(--dough); transition: all 0.2s; }
  .pl-row:hover { background: rgba(200,169,110,0.06); border-color: rgba(200,169,110,0.3); }
  .pl-left { display: flex; align-items: center; gap: 12px; }
  .pl-name { font-weight: 700; font-size: 14px; color: var(--brown-deep); }
  .pl-qty { font-size: 12px; color: var(--text-soft); margin-top: 2px; }
  .pl-cost { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--crust-dark); }
  .pl-margin { font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 100px; margin-top: 3px; display: inline-block; }
  .pl-margin.good { background: rgba(74,124,89,0.1); color: var(--green-fresh); }
  .pl-margin.warn { background: rgba(192,57,43,0.1); color: var(--red-warn); }
  .pl-footer { background: var(--crust); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
  .pl-f-lbl { font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 600; }
  .pl-f-val { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 900; color: white; }
  .planner-feats { display: grid; gap: 16px; }
  .pf-row { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: white; border-radius: 14px; border: 1.5px solid var(--dough); transition: all 0.25s; }
  .pf-row:hover { border-color: var(--crust); box-shadow: 0 8px 24px rgba(200,169,110,0.12); }
  .pf-icon { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; background: var(--parchment); border: 1px solid var(--dough); display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .pf-h { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: var(--brown-deep); margin-bottom: 4px; }
  .pf-p { font-size: 13px; color: var(--text-mid); line-height: 1.6; }

  /* FEATURE RAIL */
  .rail-section { background: var(--parchment); padding: 80px 0; border-top: 1px solid var(--dough); overflow: hidden; }
  .rail-header { padding: 0 48px 36px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 16px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card { background: white; border-radius: 18px; padding: 28px 24px; min-width: 230px; flex-shrink: 0; border: 1.5px solid var(--dough); transition: all 0.3s; }
  .rail-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(92,58,30,0.08); border-color: rgba(200,169,110,0.4); }
  .rail-emoji { font-size: 26px; margin-bottom: 12px; display: block; }
  .rail-card h3 { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--brown-deep); margin-bottom: 8px; }
  .rail-card p { font-size: 13px; color: var(--text-mid); line-height: 1.65; }
  .rail-hint { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-soft); letter-spacing: 0.06em; }

  /* COMPARISON */
  .comparison { background: var(--flour); padding: 100px 48px; border-top: 1px solid var(--dough); }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap { background: white; border-radius: 24px; overflow: hidden; border: 1.5px solid var(--dough); margin-top: 52px; box-shadow: 0 16px 56px rgba(92,58,30,0.08); }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--parchment); }
  .ch { padding: 18px 22px; }
  .ch.f { font-size: 11px; color: var(--text-soft); font-weight: 700; letter-spacing: 0.08em; }
  .ch.i { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--crust-dark); display: flex; align-items: center; gap: 8px; }
  .ch.o { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; color: var(--text-soft); }
  .iris-pill { background: var(--crust); color: white; font-size: 9px; font-family: 'Nunito', sans-serif; font-weight: 800; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 100px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--dough); transition: background 0.2s; }
  .comp-row:hover { background: rgba(200,169,110,0.04); }
  .cc { padding: 14px 22px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
  .cc.f { color: var(--brown-deep); font-weight: 600; }
  .cc.i { color: var(--text-mid); font-weight: 500; }
  .cc.o { color: var(--text-soft); }
  .ck { color: var(--green-fresh); font-size: 17px; font-weight: 700; }
  .cx { color: var(--red-warn); font-size: 17px; font-weight: 700; }
  .price-row { background: rgba(200,169,110,0.05); border-top: 2px solid rgba(200,169,110,0.25) !important; }
  .big-i { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: var(--crust-dark) !important; }
  .big-o { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 900; color: var(--red-warn) !important; }

  /* TESTIMONIALS — EDITORIAL */
  .testimonials { background: var(--brown-deep); padding: 100px 48px; }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-primary-wrap {
    background: var(--crust); padding: 56px 64px; margin-top: 52px; position: relative;
  }
  .testi-primary-q { font-family: 'Fraunces', serif; font-size: 100px; font-weight: 900; color: rgba(255,255,255,0.15); line-height: 1; margin-bottom: -28px; }
  .testi-primary-text {
    font-family: 'Fraunces', serif; font-size: clamp(20px, 2.5vw, 26px); font-weight: 600;
    line-height: 1.45; color: white; margin-bottom: 36px; max-width: 780px;
  }
  .testi-primary-author { display: flex; align-items: center; gap: 16px; }
  .testi-primary-av { width: 48px; height: 48px; background: var(--brown-deep); color: var(--crust); font-family: 'Fraunces', serif; font-size: 20px; font-weight: 900; display: flex; align-items: center; justify-content: center; border-radius: 4px; flex-shrink: 0; }
  .testi-primary-name { font-weight: 700; font-size: 15px; color: white; }
  .testi-primary-role { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 2px; }
  .testi-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 3px; }
  .testi-secondary {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    padding: 36px; transition: all 0.3s;
  }
  .testi-secondary:hover { background: rgba(255,255,255,0.08); }
  .testi-sec-text { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-sec-author { display: flex; align-items: center; gap: 12px; }
  .testi-sec-av { width: 38px; height: 38px; border-radius: 50%; background: var(--crust); color: white; font-family: 'Fraunces', serif; font-size: 16px; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-sec-name { font-weight: 700; font-size: 14px; color: white; }
  .testi-sec-role { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }

  /* PRICING — SPLIT */
  .pricing { background: var(--flour); border-top: 1px solid var(--dough); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--dough); display: flex; flex-direction: column; justify-content: center; }
  .pricing-amount { font-family: 'Fraunces', serif; font-size: 100px; font-weight: 900; color: var(--crust); line-height: 1; }
  .pricing-amount sup { font-size: 42px; vertical-align: top; margin-top: 20px; }
  .pricing-cadence { font-size: 15px; color: var(--text-soft); margin: 8px 0 32px; }
  .pricing-left p { font-size: 15px; color: var(--text-mid); line-height: 1.75; font-weight: 400; margin-bottom: 32px; }
  .pricing-cta {
    width: 100%; background: var(--crust); color: white;
    padding: 17px; border-radius: 100px; border: none; cursor: pointer;
    font-weight: 800; font-size: 15px; letter-spacing: 0.02em; transition: all 0.25s;
    box-shadow: 0 8px 32px rgba(200,169,110,0.4);
  }
  .pricing-cta:hover { background: var(--crust-dark); transform: translateY(-2px); }
  .pricing-note { font-size: 13px; color: var(--text-soft); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .pricing-right .s-label { margin-bottom: 28px; display: block; }
  .p-feat { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--dough); font-size: 14px; color: var(--text-mid); }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-fresh); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section { background: var(--brown-deep); padding: 100px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(200,169,110,0.08) 1.5px, transparent 1.5px); background-size: 24px 24px; }
  .cta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
  .cta-title { font-family: 'Fraunces', serif; font-size: clamp(36px, 5vw, 58px); font-weight: 900; color: white; line-height: 1.1; margin-bottom: 20px; }
  .cta-title em { font-style: italic; color: var(--crust); }
  .cta-sub { font-size: 17px; color: rgba(255,255,255,0.55); line-height: 1.75; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: var(--crust); color: white; padding: 18px 48px; border-radius: 100px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; transition: all 0.25s; box-shadow: 0 8px 32px rgba(200,169,110,0.3); }
  .cta-btn-main:hover { background: var(--crust-dark); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.7); padding: 16px 44px; border-radius: 100px; cursor: pointer; font-weight: 600; font-size: 15px; border: 1.5px solid rgba(255,255,255,0.2); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: var(--crust); color: var(--crust); }

  /* FOOTER */
  .footer { background: var(--ink); padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.3); }
  .footer-copy strong { color: var(--crust); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: rgba(255,255,255,0.3); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--crust); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(44,26,14,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: white; border-radius: 28px; padding: 48px; max-width: 480px; width: 100%; position: relative; border: 1.5px solid var(--dough); animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(44,26,14,0.2); }
  .modal-x { position: absolute; top: 20px; right: 20px; background: var(--flour); border: 1px solid var(--dough); color: var(--text-soft); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; }
  .modal-x:hover { background: var(--parchment); color: var(--brown-deep); }
  .modal-h { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 900; color: var(--brown-deep); margin-bottom: 6px; }
  .modal-s { color: var(--text-soft); font-size: 14px; margin-bottom: 28px; line-height: 1.6; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-size: 12px; font-weight: 700; color: var(--crust-dark); margin-bottom: 6px; display: block; letter-spacing: 0.06em; }
  .f-input { width: 100%; padding: 13px 16px; border-radius: 12px; background: var(--flour); border: 1.5px solid var(--dough); font-size: 14px; font-family: 'Nunito', sans-serif; color: var(--brown-deep); outline: none; transition: border-color 0.2s; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-input:focus { border-color: var(--crust); background: white; }
  .f-btn { width: 100%; background: var(--crust); color: white; padding: 15px; border-radius: 100px; border: none; cursor: pointer; font-weight: 800; font-size: 15px; margin-top: 8px; transition: all 0.25s; box-shadow: 0 6px 24px rgba(200,169,110,0.4); }
  .f-btn:hover { background: var(--crust-dark); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-emoji { font-size: 56px; display: block; margin-bottom: 16px; animation: float 3s ease-in-out infinite; }
  .success-h { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: var(--brown-deep); margin-bottom: 10px; }
  .success-p { color: var(--text-mid); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .morning-bar { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .pain-main { grid-template-columns: 1fr; }
    .pain-left { padding: 60px 20px 40px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .pain-right { padding: 40px 20px 60px; }
    .features, .planner-section, .comparison, .testimonials, .cta-section { padding: 70px 20px; }
    .features-grid { grid-template-columns: 1fr; }
    .planner-layout { grid-template-columns: 1fr; }
    .testi-secondary-grid { grid-template-columns: 1fr; }
    .pricing-layout { grid-template-columns: 1fr; }
    .pricing-left { padding: 60px 20px; border-right: none; border-bottom: 1px solid var(--dough); }
    .pricing-right { padding: 60px 20px; }
    .comp-head, .comp-row { grid-template-columns: 1.2fr 1fr 1fr; }
    .cc, .ch { padding: 12px 14px; font-size: 12px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
    .modal-box { padding: 36px 24px; }
    .testi-primary-wrap { padding: 40px 28px; }
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
  { icon: "⚖️", title: "Gram-Level Recipe Costing", desc: "Every ingredient entered by gram. Cost-per-unit calculated automatically, updated when supplier prices change.", tag: "Bakery-Specific" },
  { icon: "📋", title: "Daily Production Planning", desc: "Schedule your bake by item and quantity. Ingredient requirements pulled from your current inventory before you start.", tag: "Saves Waste" },
  { icon: "🏪", title: "Cash Register & POS", desc: "Sell at the counter. Every transaction syncs to your books instantly — no manual entry, no end-of-day reconciliation.", tag: "Built-in" },
  { icon: "🛒", title: "Wholesale Reseller Portal", desc: "Café accounts log in, place standing orders, and get auto-invoiced. You stop being the middleman in your own operation.", tag: "Revenue Growth" },
];

const plannerItems = [
  { emoji: "🥐", name: "Butter Croissants", qty: "48 units · Batch x3", cost: "$14.40", margin: "67%", good: true },
  { emoji: "🍞", name: "Sourdough Loaves", qty: "12 loaves", cost: "$8.10", margin: "72%", good: true },
  { emoji: "🎂", name: "Birthday Cakes (Custom)", qty: "4 orders", cost: "$31.20", margin: "58%", good: true },
  { emoji: "🍩", name: "Glazed Donuts", qty: "60 units", cost: "$6.90", margin: "44% ⚠", good: false },
];

const railFeatures = [
  { emoji: "💳", title: "Iris Pay Checkout", desc: "Card and mobile payments at the counter. Every sale posts to P&L instantly." },
  { emoji: "📦", title: "Ingredient Inventory", desc: "Auto-alerts when stock drops below threshold. Never run out of butter at 4am." },
  { emoji: "📄", title: "Wholesale Invoicing", desc: "Professional invoices with logo and QR code, auto-sent to café accounts on delivery." },
  { emoji: "📊", title: "Profitability by Product", desc: "Which items make the most money. Which ones you're subsidizing without knowing." },
  { emoji: "🧑‍🍳", title: "Staff Hours & Payroll", desc: "Log baker hours by shift, calculate wages, run payroll — same platform." },
  { emoji: "📈", title: "Weekly Sales Reports", desc: "Revenue, top items, ingredient usage, and net margin. Every Monday, automatically." },
];

const testimonials = [
  { q: "I was losing money on my most popular items and had no idea. The recipe costing tool showed me my croissants were at 71% margin and my custom cakes were at 38%. I repriced the cakes and made $600 more that month without selling a single extra item.", name: "Amara J.", role: "Owner — Amara's Pâtisserie, Brooklyn NY", init: "A", primary: true },
  { q: "The wholesale portal changed everything. 6 café accounts, orders placed online, invoices sent automatically. I went from 3 hours of admin weekly to 20 minutes.", name: "Sophie L.", role: "Baker-Owner — Lune Bakehouse, Austin TX", init: "S", primary: false },
  { q: "Before this, I was guessing flour orders every week. Now the production planner tells me exactly what I need. Zero waste weeks are actually possible now.", name: "David O.", role: "Head Baker — The Grain Studio, Atlanta GA", init: "D", primary: false },
];

export default function BakeryPage() {
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
        body: JSON.stringify({ name: form.name, bakery: form.bakery, email: form.email, bakery_type: form.type, vertical: "Bakery" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "https://irisfinancial.tech/auth/signup?vertical=bakery&ref=landing";
    }, 2000);
  };

  const primary = testimonials.find(t => t.primary);
  const secondary = testimonials.filter(t => !t.primary);

  return (
    <div>
      <nav className="nav">
        <div className="nav-left">
          <img src="/media/image/logo1.png" alt="Iris Financial" style={{ height: "36px", width: "auto" }} />
        </div>
        <div className="nav-links">
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Demo</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      {/* MORNING BAR */}
      <div className="morning-bar">
        <div className="mb-clock">
          <div className="mb-dot" />
          5:14 AM
        </div>
        <div className="mb-items">
          <span className="mb-item"><strong>First batch</strong> in 16 min</span>
          <span className="mb-sep">·</span>
          <span className="mb-item"><strong>48 croissants</strong> scheduled</span>
          <span className="mb-sep">·</span>
          <span className="mb-item">Flour stock: <strong>OK</strong></span>
          <span className="mb-sep">·</span>
          <span className="mb-item"><strong>3 wholesale orders</strong> for pickup today</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-circle" />
        <div className="hero-layout">
          <div>
            <div className="hero-label">Built for Bakeries & Food Businesses</div>
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
          </div>
          <div className="hero-right">
            <div className="deco-1">🥐</div>
            <div className="deco-2">🍰</div>
            <div className="recipe-card">
              <div className="rc-head">
                <div className="rc-head-left">
                  <span style={{ fontSize: 22 }}>📋</span>
                  <div>
                    <div className="rc-name">Classic Brioche — 12 units</div>
                    <div className="rc-sub">Recipe cost breakdown · Auto-updated</div>
                  </div>
                </div>
                <span className="rc-badge">✓ 68% margin</span>
              </div>
              <div className="rc-ingr">
                <div className="rc-head-row"><span>Ingredient</span><span>Cost / batch</span></div>
                {ingredients.map((ing, i) => (
                  <div className="rc-row" key={i}>
                    <div className="rc-row-left">
                      <div className="rc-dot" />
                      <div><div className="rc-iname">{ing.name}</div><div className="rc-qty">{ing.qty}</div></div>
                    </div>
                    <div className="rc-cost">{ing.cost}</div>
                  </div>
                ))}
              </div>
              <div className="rc-summary">
                <div className="rc-sum-row"><span className="rc-sum-lbl">Total ingredient cost</span><span className="rc-sum-val">$1.94</span></div>
                <div className="rc-sum-row"><span className="rc-sum-lbl">Selling price / unit</span><span className="rc-sum-val">$6.50</span></div>
                <div className="rc-sum-row"><span className="rc-sum-lbl">Gross margin per batch</span><span className="rc-sum-val green">+$54.72</span></div>
              </div>
              <div className="rc-foot">
                <span className="rc-foot-txt">📦 Prices sync from supplier invoices</span>
                <button className="rc-foot-btn">Update costs</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN — ASYMMETRIC */}
      <section className="pain">
        <div className="pain-main">
          <div className="pain-left">
            <div className="pain-eyebrow">The real cost of guessing</div>
            <h2 className="pain-headline">
              Your bestselling item<br />might be your worst<br /><em>margin item.</em>
            </h2>
            <p className="pain-deck">
              Most bakeries price by feel — what competitors charge, what seems fair, what sold last week. When you actually run the numbers, the picture looks different. Here's a common one.
            </p>
            <div className="pain-math">
              <div className="pain-math-label">A typical custom cake — the real math</div>
              {[
                { desc: "Ingredients (flour, butter, fondant, fillings)", val: "-$18.40" },
                { desc: "Labor — 3.5 hrs at $16/hr", val: "-$56.00" },
                { desc: "Packaging, boards, boxes", val: "-$6.20" },
                { desc: "Selling price", val: "$75.00" },
              ].map((line, i) => (
                <div className="pain-math-line" key={i}>
                  <span className="pain-math-desc">{line.desc}</span>
                  <span className="pain-math-val">{line.val}</span>
                </div>
              ))}
              <div className="pain-math-total">
                <span className="pain-math-total-lbl">Real margin per cake</span>
                <span className="pain-math-total-val">-$5.60</span>
              </div>
            </div>
          </div>
          <div className="pain-right">
            {[
              { emoji: "📦", title: "Overproduction every week", body: "You bake 60 donuts. You sell 41. The other 19 go in the trash. Every unsold unit is pure ingredient cost with no return. Without data, this never stops." },
              { emoji: "🧾", title: "Wholesale that costs more than it earns", body: "Three café clients. Invoiced by text. Paid late. No idea if the wholesale price covers your actual cost to produce and deliver. It often doesn't." },
            ].map((p, i) => (
              <div className="pain-issue" key={i}>
                <span className="pain-issue-emoji">{p.emoji}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <div className="s-label">What's included</div>
          <h2 className="s-title">Every tool your bakery<br />needs to <em>thrive.</em></h2>
          <p className="s-body">Not generic accounting software renamed for food. Built for the way bakeries actually work.</p>
          <div className="features-grid">
            {mainFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon">{f.icon}</div>
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
          <div className="s-label">Production planning</div>
          <h2 className="s-title">Know what to bake<br /><em>before</em> you preheat.</h2>
          <div className="planner-layout">
            <div className="planner-card">
              <div className="pl-top">
                <span className="pl-title">🗓 Today's Bake Schedule</span>
                <span className="pl-date">Monday, June 2</span>
              </div>
              <div style={{ padding: "20px 24px" }}>
                {plannerItems.map((item, i) => (
                  <div className="pl-row" key={i}>
                    <div className="pl-left">
                      <span style={{ fontSize: 22 }}>{item.emoji}</span>
                      <div><div className="pl-name">{item.name}</div><div className="pl-qty">{item.qty}</div></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="pl-cost">{item.cost}</div>
                      <div className={`pl-margin ${item.good ? "good" : "warn"}`}>{item.margin}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pl-footer">
                <span className="pl-f-lbl">Today's Ingredient Budget</span>
                <span className="pl-f-val">$60.60</span>
              </div>
            </div>
            <div className="planner-feats">
              {[
                { icon: "🔄", title: "Auto-pulls from inventory", desc: "Add items to the bake plan and the system checks current stock. Tells you exactly what to order before the market opens." },
                { icon: "📉", title: "Overproduce alerts", desc: "60 donuts scheduled, but your last 3 Mondays averaged 42 sold. Iris flags the discrepancy before you fire up the fryer." },
                { icon: "💡", title: "Margin-aware scheduling", desc: "Low-margin items flagged in your production plan. Reprice, substitute, or cut before you bake a batch that costs you money." },
              ].map((f, i) => (
                <div className="pf-row" key={i}>
                  <div className="pf-icon">{f.icon}</div>
                  <div><div className="pf-h">{f.title}</div><p className="pf-p">{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE RAIL */}
      <section className="rail-section">
        <div className="rail-header">
          <div className="s-label">Everything else</div>
          <h2 className="s-title">One login.<br /><em>No more juggling.</em></h2>
        </div>
        <div className="rail-scroll">
          {railFeatures.map((f, i) => (
            <div className="rail-card" key={i}>
              <span className="rail-emoji">{f.emoji}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="rail-hint">← Scroll to see more →</div>
      </section>

      {/* COMPARISON */}
      <section className="comparison">
        <div className="comparison-inner">
          <div className="s-label">Side by side</div>
          <h2 className="s-title">Iris Financial vs.<br /><em>QuickBooks + spreadsheets</em></h2>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch f">Feature</div>
              <div className="ch i">Iris Financial <span className="iris-pill">Best</span></div>
              <div className="ch o">QuickBooks + Sheets</div>
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
              <div className="comp-row" key={i}>
                <div className="cc f">{feat}</div>
                <div className="cc i"><span className={iris.startsWith("✓") ? "ck" : "cx"}>{iris.startsWith("✓") ? "✓" : "✗"}</span>{iris.replace("✓ ","").replace("✗ ","")}</div>
                <div className="cc o"><span className={other.startsWith("✓") ? "ck" : "cx"}>{other.startsWith("✓") ? "✓" : "✗"}</span>{other.replace("✓ ","").replace("✗ ","")}</div>
              </div>
            ))}
            <div className="comp-row price-row">
              <div className="cc f" style={{ fontWeight: 600 }}>Starting Price</div>
              <div className="cc i"><span className="big-i">$0/mo</span></div>
              <div className="cc o"><span className="big-o">$115+/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — EDITORIAL */}
      <section className="testimonials">
        <div className="testi-inner">
          <div style={{ color: "var(--crust)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 0 }}>From the oven</div>
          <h2 className="s-title" style={{ color: "white", marginBottom: 0 }}>What bakers are saying</h2>
          <div className="testi-primary-wrap">
            <div className="testi-primary-q">"</div>
            <p className="testi-primary-text">{primary.q}</p>
            <div className="testi-primary-author">
              <div className="testi-primary-av">{primary.init}</div>
              <div>
                <div className="testi-primary-name">{primary.name}</div>
                <div className="testi-primary-role">{primary.role}</div>
              </div>
            </div>
          </div>
          <div className="testi-secondary-grid">
            {secondary.map((t, i) => (
              <div className="testi-secondary" key={i}>
                <p className="testi-sec-text">"{t.q}"</p>
                <div className="testi-sec-author">
                  <div className="testi-sec-av">{t.init}</div>
                  <div>
                    <div className="testi-sec-name">{t.name}</div>
                    <div className="testi-sec-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING — SPLIT */}
      <section className="pricing">
        <div className="pricing-layout">
          <div className="pricing-left">
            <div className="s-label">Simple pricing</div>
            <h2 className="s-title">Start free.<br /><em>Grow from there.</em></h2>
            <p>Everything a single-location bakery needs — recipe costing, production planning, POS, wholesale portal, and P&L — on the free tier. No trial expiry.</p>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-cadence">per month — forever free to start</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) adds multi-location, payroll, and advanced analytics.</div>
          </div>
          <div className="pricing-right">
            <span className="s-label pricing-right .s-label">What's included</span>
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
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Your recipes are perfect.<br />Make your <em>margins</em> match.</h2>
          <p className="cta-sub">Every unbilled gram, every overproduced batch, every underpriced item is money walking out the door. Iris Financial closes those gaps — free to start, 15 minutes to set up.</p>
          <div className="cta-btns">
            <button className="cta-btn-main" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="cta-btn-sec">Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Financial</strong> — by Iris Secure Technology Solutions · irisfinancial.tech</div>
        <div className="footer-links">
          <span className="f-lnk">Privacy</span>
          <span className="f-lnk">Terms</span>
          <span className="f-lnk">Contact</span>
        </div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}>✕</button>
            {!submitted ? (
              <>
                <div className="modal-h">Start Your Free Account</div>
                <div className="modal-s">Set up in 15 minutes. Your first recipe cost report will surprise you.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Baker / Owner name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Bakery Name</label><input className="f-input" placeholder="e.g. Lune Bakehouse" value={form.bakery} onChange={e => setForm({ ...form, bakery: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="you@yourbakery.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
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
                <p className="success-p">Setup link on its way to <strong style={{ color: "var(--crust-dark)" }}>{form.email}</strong>. First recipe cost report ready before your next bake.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
