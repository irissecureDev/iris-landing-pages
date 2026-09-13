import { useState, useEffect } from "react";
import { Wrench, Car, Package, Receipt, CreditCard, BarChart2, UserCheck, Bell, TrendingUp, Layers, DollarSign, FileText, Clock, AlertTriangle } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --black: #080808;
    --deep: #0F0F0F;
    --char: #161616;
    --panel: #1E1E1E;
    --rail: #262626;
    --border: rgba(255,255,255,0.07);
    --orange: #E85D04;
    --orange-light: #F77F00;
    --orange-glow: rgba(232,93,4,0.12);
    --steel: #94A3B8;
    --steel-bright: #CBD5E1;
    --yellow: #FACC15;
    --yellow-dim: #CA9A0A;
    --cream: #F1F5F9;
    --text-mid: #64748B;
    --text-soft: #374151;
    --green-ok: #22c55e;
    --red-warn: #ef4444;
    --blue-info: #3B82F6;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Barlow', sans-serif; background: var(--black); color: var(--cream); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(232,93,4,0.4); } 50% { box-shadow: 0 0 0 12px rgba(232,93,4,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes scanline { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; padding: 0 48px;
    background: rgba(8,8,8,0.98); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-mid); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--cream); }
  .nav-cta {
    background: var(--orange); color: white;
    padding: 9px 22px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px;
    letter-spacing: 0.1em; text-transform: uppercase;
    transition: all 0.2s; box-shadow: 0 4px 16px rgba(232,93,4,0.4);
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .nav-cta:hover { background: var(--orange-light); transform: translateY(-1px); }

  /* SHOP STAT BAR */
  .stat-bar {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    height: 34px; background: var(--char);
    border-bottom: 2px solid var(--orange);
    display: flex; align-items: center; justify-content: center; gap: 0;
  }
  .sb-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 24px; border-right: 1px solid var(--border);
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-mid);
  }
  .sb-item:last-child { border-right: none; }
  .sb-val { color: var(--orange-light); font-weight: 700; }
  .sb-dot { width: 5px; height: 5px; background: var(--orange); animation: blink 2s infinite; }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--black);
    padding: 120px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(232,93,4,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232,93,4,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .hero-glow { position: absolute; right: -100px; top: 50%; transform: translateY(-50%); width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(232,93,4,0.07) 0%, transparent 65%); pointer-events: none; }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: var(--orange); margin-bottom: 20px; text-transform: uppercase; animation: fadeUp 0.5s ease both; }
  .hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(56px, 7vw, 92px); font-weight: 900; line-height: 0.95;
    color: var(--cream); margin-bottom: 24px; letter-spacing: 0.01em; text-transform: uppercase;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title em { font-style: normal; color: var(--orange); }
  .hero-title .yellow { color: var(--yellow); }
  .hero-sub {
    font-size: 16px; color: var(--steel); line-height: 1.8; font-weight: 300;
    max-width: 460px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-tags { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; animation: fadeUp 0.6s 0.25s ease both; }
  .hero-tag {
    font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px;
    border: 1px solid var(--border); color: var(--text-mid);
    clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
  }
  .hero-tag.active { border-color: var(--orange); color: var(--orange-light); background: rgba(232,93,4,0.06); }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-orange {
    background: var(--orange); color: white;
    padding: 16px 36px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 16px;
    letter-spacing: 0.1em; text-transform: uppercase;
    transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 6px 24px rgba(232,93,4,0.4);
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .btn-orange:hover { background: var(--orange-light); transform: translateY(-2px); }
  .btn-ghost {
    background: transparent; color: var(--steel);
    padding: 14px 32px; cursor: pointer; font-weight: 500; font-size: 15px;
    border: 1px solid var(--border); transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--orange); color: var(--orange-light); }

  /* HERO RIGHT — DUAL P&L CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .dual-card {
    background: var(--deep); border: 1px solid var(--border);
    border-top: 3px solid var(--orange);
    box-shadow: 0 32px 72px rgba(0,0,0,0.8); overflow: hidden;
  }
  .dc-head {
    background: var(--char); padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .dc-title { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream); }
  .dc-live { display: flex; align-items: center; gap: 6px; }
  .dc-dot { width: 7px; height: 7px; background: var(--green-ok); animation: blink 2s infinite; }
  .dc-live-txt { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--green-ok); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  .dc-split { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border); }
  .dc-side { padding: 16px 20px; }
  .dc-side:first-child { border-right: 1px solid var(--border); }
  .dc-side-label { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-mid); margin-bottom: 6px; }
  .dc-side-val { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 900; color: var(--orange-light); }
  .dc-side-sub { font-size: 11px; color: var(--text-mid); margin-top: 3px; }
  .dc-rows { padding: 0 20px; }
  .dc-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .dc-row:last-child { border-bottom: none; }
  .dc-row-left { display: flex; align-items: center; gap: 10px; }
  .dc-row-dot { width: 6px; height: 6px; flex-shrink: 0; }
  .dc-row-name { font-size: 13px; font-weight: 500; color: var(--steel-bright); }
  .dc-row-sub { font-size: 11px; color: var(--text-mid); margin-top: 1px; }
  .dc-row-val { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; }
  .dc-row-val.green { color: var(--green-ok); }
  .dc-row-val.orange { color: var(--orange-light); }
  .dc-row-val.yellow { color: var(--yellow); }
  .dc-row-val.warn { color: var(--red-warn); }
  .dc-footer {
    background: var(--panel); padding: 14px 20px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .dc-foot-lbl { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-mid); }
  .dc-foot-val { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 900; color: var(--yellow); }

  /* PAIN */
  .pain { background: var(--char); padding: 0; border-top: 1px solid var(--border); }
  .pain-layout { display: grid; grid-template-columns: 1.2fr 1fr; }
  .pain-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); }
  .pain-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--orange); margin-bottom: 20px; }
  .pain-headline { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(38px, 5vw, 62px); font-weight: 900; line-height: 1.0; color: var(--cream); margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.02em; }
  .pain-headline em { font-style: normal; color: var(--orange); }
  .pain-deck { font-size: 16px; color: var(--steel); line-height: 1.8; font-weight: 300; margin-bottom: 40px; }
  .pain-calc {
    background: rgba(232,93,4,0.05); border: 1px solid rgba(232,93,4,0.15);
    padding: 24px 28px; border-left: 3px solid var(--orange);
  }
  .pain-calc-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 14px; }
  .pain-calc-row { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
  .pain-calc-row:last-child { border-bottom: none; }
  .pain-calc-desc { color: var(--steel); }
  .pain-calc-val { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 700; }
  .pain-calc-val.bad { color: var(--red-warn); }
  .pain-calc-val.ok { color: var(--cream); }
  .pain-calc-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-top: 14px; border-top: 2px solid rgba(232,93,4,0.3); }
  .pain-calc-total-lbl { font-size: 14px; font-weight: 600; color: var(--steel); }
  .pain-calc-total-val { font-family: 'Barlow Condensed', sans-serif; font-size: 34px; font-weight: 900; color: var(--orange-light); }

  .pain-right { padding: 80px 48px 80px 40px; display: flex; flex-direction: column; gap: 40px; justify-content: center; }
  .pain-issue { padding-bottom: 40px; border-bottom: 1px solid var(--border); }
  .pain-issue:last-child { padding-bottom: 0; border-bottom: none; }
  .pain-issue-icon { color: var(--orange); margin-bottom: 14px; display: block; }
  .pain-issue h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 800; color: var(--cream); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
  .pain-issue p { font-size: 14px; color: var(--steel); line-height: 1.75; }

  /* FEATURES */
  .features { background: var(--black); padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--orange); margin-bottom: 14px; }
  .s-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(38px, 5vw, 58px); font-weight: 900; line-height: 1.0; color: var(--cream); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.02em; }
  .s-title em { font-style: normal; color: var(--orange); }
  .s-body { font-size: 16px; color: var(--steel); line-height: 1.75; font-weight: 300; max-width: 540px; }
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; margin-top: 56px; }
  .feat-card {
    background: var(--deep); padding: 36px;
    border: 1px solid var(--border); transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
  }
  .feat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--orange), var(--yellow));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
  }
  .feat-card:hover::before { transform: scaleX(1); }
  .feat-card:hover { background: var(--char); border-color: rgba(232,93,4,0.2); }
  .feat-icon { color: var(--orange); margin-bottom: 18px; display: block; }
  .feat-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 800; color: var(--cream); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
  .feat-card p { font-size: 14px; color: var(--steel); line-height: 1.7; }
  .feat-tag { display: inline-block; margin-top: 14px; background: rgba(232,93,4,0.08); border: 1px solid rgba(232,93,4,0.2); color: var(--orange); padding: 3px 10px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Barlow Condensed', sans-serif; }

  /* RAIL */
  .rail-section { background: var(--char); padding: 80px 0; border-top: 1px solid var(--border); overflow: hidden; }
  .rail-header { padding: 0 48px 36px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 3px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card { background: var(--panel); border: 1px solid var(--border); padding: 28px 24px; min-width: 240px; flex-shrink: 0; transition: all 0.25s; }
  .rail-card:hover { border-color: rgba(232,93,4,0.3); background: rgba(232,93,4,0.04); transform: translateY(-3px); }
  .rail-icon { color: var(--orange); margin-bottom: 12px; display: block; }
  .rail-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 800; color: var(--cream); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.04em; }
  .rail-card p { font-size: 13px; color: var(--steel); line-height: 1.65; }
  .rail-hint { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-soft); letter-spacing: 0.06em; }

  /* COMPARISON */
  .comparison { background: var(--black); padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap { background: var(--deep); border: 1px solid var(--border); border-top: 3px solid var(--orange); overflow: hidden; margin-top: 52px; box-shadow: 0 24px 56px rgba(0,0,0,0.7); }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--panel); }
  .ch { padding: 18px 22px; }
  .ch.f { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--text-mid); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  .ch.i { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 800; color: var(--orange-light); display: flex; align-items: center; gap: 8px; letter-spacing: 0.04em; }
  .ch.o { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-mid); letter-spacing: 0.04em; }
  .iris-pill { background: var(--orange); color: white; font-size: 9px; font-family: 'Barlow', sans-serif; font-weight: 800; letter-spacing: 0.08em; padding: 2px 7px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: rgba(232,93,4,0.03); }
  .cc { padding: 13px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.f { color: var(--cream); font-weight: 500; }
  .cc.i { color: var(--steel); font-weight: 500; }
  .cc.o { color: var(--text-mid); }
  .ck { color: var(--green-ok); font-size: 16px; font-weight: 700; }
  .cx { color: var(--red-warn); font-size: 16px; font-weight: 700; }
  .price-row { background: rgba(232,93,4,0.04); border-top: 2px solid rgba(232,93,4,0.2) !important; }
  .big-i { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 900; color: var(--orange-light) !important; }
  .big-o { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; color: var(--red-warn) !important; }

  /* TESTIMONIALS */
  .testimonials { background: var(--char); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-primary-wrap { background: var(--orange); padding: 56px 64px; margin-top: 52px; border-left: 6px solid var(--yellow); }
  .testi-primary-q { font-family: 'Barlow Condensed', sans-serif; font-size: 96px; font-weight: 900; color: rgba(255,255,255,0.12); line-height: 1; margin-bottom: -26px; }
  .testi-primary-text { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(20px, 2.6vw, 27px); font-weight: 700; line-height: 1.35; color: white; margin-bottom: 36px; max-width: 800px; letter-spacing: 0.01em; }
  .testi-primary-author { display: flex; align-items: center; gap: 16px; }
  .testi-primary-av { width: 46px; height: 46px; background: var(--black); color: var(--orange-light); font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-primary-name { font-weight: 700; font-size: 15px; color: white; letter-spacing: 0.03em; }
  .testi-primary-role { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 2px; }
  .testi-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 3px; }
  .testi-secondary { background: var(--panel); border: 1px solid var(--border); padding: 36px; transition: all 0.2s; border-top: 2px solid transparent; }
  .testi-secondary:hover { background: rgba(232,93,4,0.06); border-top-color: var(--orange); }
  .testi-sec-text { font-size: 15px; color: var(--steel); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-sec-author { display: flex; align-items: center; gap: 12px; }
  .testi-sec-av { width: 38px; height: 38px; background: var(--orange); color: white; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-sec-name { font-weight: 700; font-size: 14px; color: var(--cream); letter-spacing: 0.02em; }
  .testi-sec-role { font-size: 12px; color: var(--text-mid); margin-top: 2px; }

  /* PRICING */
  .pricing { background: var(--black); border-top: 1px solid var(--border); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: center; }
  .pricing-amount { font-family: 'Barlow Condensed', sans-serif; font-size: 100px; font-weight: 900; color: var(--orange-light); line-height: 1; }
  .pricing-amount sup { font-size: 42px; vertical-align: top; margin-top: 20px; }
  .pricing-cadence { font-size: 15px; color: var(--text-mid); margin: 8px 0 32px; }
  .pricing-left p { font-size: 15px; color: var(--steel); line-height: 1.75; font-weight: 300; margin-bottom: 32px; }
  .pricing-cta { width: 100%; background: var(--orange); color: white; padding: 17px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.25s; box-shadow: 0 8px 32px rgba(232,93,4,0.4); clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); }
  .pricing-cta:hover { background: var(--orange-light); transform: translateY(-2px); }
  .pricing-note { font-size: 13px; color: var(--text-mid); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .p-feat { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--steel); }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-ok); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section { background: var(--deep); padding: 90px 48px; text-align: center; border-top: 1px solid var(--border); position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(232,93,4,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,93,4,0.04) 1px, transparent 1px); background-size: 40px 40px; }
  .cta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
  .cta-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(40px, 5.5vw, 66px); font-weight: 900; color: var(--cream); line-height: 1.0; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.02em; }
  .cta-title em { font-style: normal; color: var(--orange); }
  .cta-sub { font-size: 17px; color: var(--steel); line-height: 1.75; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: var(--orange); color: white; padding: 18px 48px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.25s; box-shadow: 0 8px 32px rgba(232,93,4,0.35); clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); }
  .cta-btn-main:hover { background: var(--orange-light); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: var(--steel); padding: 16px 44px; cursor: pointer; font-weight: 500; font-size: 15px; border: 1px solid var(--border); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: var(--orange); color: var(--orange-light); }

  /* FOOTER */
  .footer { background: var(--black); padding: 30px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid var(--border); }
  .footer-copy { font-size: 13px; color: var(--text-mid); }
  .footer-copy strong { color: var(--orange); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--text-mid); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--orange); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(8,8,8,0.94); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: var(--deep); border: 1px solid var(--border); border-top: 3px solid var(--orange); padding: 48px; max-width: 480px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(0,0,0,0.9); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--panel); border: 1px solid var(--border); color: var(--steel); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; }
  .modal-x:hover { border-color: var(--orange); color: var(--orange); }
  .modal-h { font-family: 'Barlow Condensed', sans-serif; font-size: 30px; font-weight: 900; color: var(--cream); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
  .modal-s { color: var(--steel); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; color: var(--orange); margin-bottom: 6px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 12px 16px; background: var(--panel); border: 1px solid var(--border); font-size: 14px; font-family: 'Barlow', sans-serif; color: var(--cream); outline: none; transition: border-color 0.2s; }
  .f-input::placeholder { color: var(--text-mid); }
  .f-input:focus { border-color: var(--orange); }
  .f-btn { width: 100%; background: var(--orange); color: white; padding: 15px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 8px; transition: all 0.25s; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); }
  .f-btn:hover { background: var(--orange-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-icon { color: var(--orange); margin-bottom: 16px; display: flex; justify-content: center; }
  .success-h { font-family: 'Barlow Condensed', sans-serif; font-size: 32px; font-weight: 900; color: var(--cream); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
  .success-p { color: var(--steel); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .stat-bar { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .pain-layout { grid-template-columns: 1fr; }
    .pain-left { padding: 60px 20px 40px; border-right: none; border-bottom: 1px solid var(--border); }
    .pain-right { padding: 40px 20px 60px; }
    .features-grid { grid-template-columns: 1fr; }
    .testi-secondary-grid { grid-template-columns: 1fr; }
    .pricing-layout { grid-template-columns: 1fr; }
    .pricing-left { padding: 60px 20px; border-right: none; border-bottom: 1px solid var(--border); }
    .pricing-right { padding: 60px 20px; }
    .features, .comparison, .testimonials, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
    .testi-primary-wrap { padding: 40px 28px; }
  }
`;

const IconAD = ({ name, size = 24 }) => {
  const icons = {
    wrench: <Wrench size={size} />, car: <Car size={size} />,
    package: <Package size={size} />, receipt: <Receipt size={size} />,
    "credit-card": <CreditCard size={size} />, "bar-chart": <BarChart2 size={size} />,
    "user-check": <UserCheck size={size} />, bell: <Bell size={size} />,
    trending: <TrendingUp size={size} />, layers: <Layers size={size} />,
    dollar: <DollarSign size={size} />, "file-text": <FileText size={size} />,
    clock: <Clock size={size} />, alert: <AlertTriangle size={size} />,
  };
  return icons[name] || null;
};

const dualPnL = [
  { dot: "#22c55e", name: "Service Work Orders", sub: "14 active tickets today", val: "+$3,840", cls: "green" },
  { dot: "#E85D04", name: "Vehicle Recon (Unit 47)", sub: "2018 F-150 — days 8 of 12", val: "-$1,240", cls: "orange" },
  { dot: "#FACC15", name: "Deal Gross — Unit 44", sub: "2020 Civic sold today", val: "+$2,100", cls: "yellow" },
  { dot: "#ef4444", name: "Parts Untracked (Est.)", sub: "3 WOs missing part costs", val: "-$680?", cls: "warn" },
];

const mainFeatures = [
  { icon: "layers", title: "Dual P&L — Service + Sales", desc: "Separate profit tracking for your service department and your sales floor. See which side of the business is making money — and which isn't.", tag: "Hybrid-Specific" },
  { icon: "wrench", title: "Work Order Management", desc: "Full work orders with labor time, parts used, and technician assignment. Every ticket billed completely — no more forgotten line items.", tag: "Service Dept" },
  { icon: "car", title: "Vehicle Recon Costing", desc: "Track every dollar spent reconditioning a unit — parts, labor, sublet — before it hits the lot. Know your true cost before you price it.", tag: "Dealer Dept" },
  { icon: "package", title: "Parts Inventory & Cost Tracking", desc: "Parts used for customer repairs vs parts going into recon vehicles tracked separately. Stop subsidizing deals with service department parts.", tag: "Stops Leakage" },
  { icon: "clock", title: "Days on Lot + Recon Time", desc: "Track how long each unit has been in recon and on the lot. Aging inventory flagged automatically — move it before it costs you more.", tag: "Dealer Dept" },
  { icon: "receipt", title: "Invoicing & Iris Pay", desc: "Professional service invoices with QR codes, emailed on completion. Accept card payments at the service counter with Iris Pay.", tag: "Gets You Paid" },
];

const railFeatures = [
  { icon: "bar-chart", title: "Daily Gross Report", desc: "Service gross + deal gross + parts margin combined. Real P&L before you leave the lot." },
  { icon: "user-check", title: "Technician Productivity", desc: "Hours flagged per tech per day. Flat-rate efficiency tracked automatically." },
  { icon: "dollar", title: "Commission Tracking", desc: "Sales and service writer commissions calculated from deal and WO gross automatically." },
  { icon: "bell", title: "Recon Alerts", desc: "Units stuck in recon past your threshold flagged before they age on you." },
  { icon: "file-text", title: "Sublet Vendor Tracking", desc: "PDR, glass, upholstery — every sublet vendor invoice attached to the right unit." },
  { icon: "trending", title: "Monthly P&L by Department", desc: "Service, sales, and parts — three separate P&Ls, one dashboard." },
];

const testimonials = [
  { q: "We were running a 12-bay shop and selling 25 cars a month and had no idea if the service department was profitable or if we were just surviving on deal gross. Iris Financial split them out. Turns out our service department was losing $4,000 a month on untracked parts. We fixed it in 60 days.", name: "Marcus T.", role: "Owner — T&T Auto Sales & Service, Dallas TX", init: "M", primary: true },
  { q: "Recon costs were the black hole. We knew a unit cost something to recondition but never the exact number. Now every part, every labor hour, every sublet goes on the unit's recon ticket. We price deals with real numbers.", name: "Derrick W.", role: "GM — Westside Auto Group, Memphis TN", init: "D", primary: false },
  { q: "The dual P&L alone changed how we run the business. Service manager knows his numbers. Sales manager knows his. Nobody's blaming the other side anymore.", name: "Lisa R.", role: "Co-Owner — R&R Motors, Phoenix AZ", init: "L", primary: false },
];

export default function AutoDealerRepairPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", shop: "", email: "", type: "" });
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
      await fetch("https://formspree.io/f/xppzgrjz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, shop: form.shop, email: form.email, business_type: form.type, vertical: "Auto Dealer + Repair" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=autodealerrepair&ref=landing"; }, 2000);
  };

  const primary = testimonials.find(t => t.primary);
  const secondary = testimonials.filter(t => !t.primary);

  return (
    <div>
      <nav className="nav">
        <div className="nav-left">
          <img src="/media/image/logo2.png" alt="Iris Financial" style={{ height: "36px", width: "auto" }} />
        </div>
        <div className="nav-links">
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Demo</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      {/* STAT BAR */}
      <div className="stat-bar">
        <div className="sb-item"><div className="sb-dot" /><span className="sb-val">14 WOs</span><span>open today</span></div>
        <div className="sb-item"><span className="sb-val">$3,840</span><span>service gross today</span></div>
        <div className="sb-item"><span className="sb-val">3 units</span><span>in recon</span></div>
        <div className="sb-item"><span className="sb-val">Unit 47</span><span>recon day 8 of 12 ⚠</span></div>
        <div className="sb-item"><span className="sb-val">$2,100</span><span>deal gross — unit 44 sold</span></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-layout">
          <div>
            <div className="hero-label">Built for Auto Repair Shops that Sell Cars</div>
            <h1 className="hero-title">
              SERVICE GROSS.<br />
              DEAL GROSS.<br />
              <em>FINALLY</em><br />
              <span className="yellow">SEPARATE.</span>
            </h1>
            <div className="hero-tags">
              <span className="hero-tag active">Service Department</span>
              <span className="hero-tag active">Sales Floor</span>
              <span className="hero-tag active">Recon Tracking</span>
              <span className="hero-tag">Parts Management</span>
            </div>
            <p className="hero-sub">Work orders, recon costing, vehicle inventory, dual P&L — one platform built for shops that fix cars and sell them. Free to start.</p>
            <div className="hero-actions">
              <button className="btn-orange" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="dual-card">
              <div className="dc-head">
                <span className="dc-title">Today's Shop Dashboard</span>
                <div className="dc-live"><div className="dc-dot" /><span className="dc-live-txt">Live</span></div>
              </div>
              <div className="dc-split">
                <div className="dc-side">
                  <div className="dc-side-label">Service Gross</div>
                  <div className="dc-side-val">$3,840</div>
                  <div className="dc-side-sub">14 WOs · 8 complete</div>
                </div>
                <div className="dc-side">
                  <div className="dc-side-label">Deal Gross</div>
                  <div className="dc-side-val">$2,100</div>
                  <div className="dc-side-sub">1 unit sold · 8 on lot</div>
                </div>
              </div>
              <div className="dc-rows">
                {dualPnL.map((row, i) => (
                  <div className="dc-row" key={i}>
                    <div className="dc-row-left">
                      <div className="dc-row-dot" style={{ background: row.dot }} />
                      <div><div className="dc-row-name">{row.name}</div><div className="dc-row-sub">{row.sub}</div></div>
                    </div>
                    <div className={`dc-row-val ${row.cls}`}>{row.val}</div>
                  </div>
                ))}
              </div>
              <div className="dc-footer">
                <span className="dc-foot-lbl">Combined Gross Today</span>
                <span className="dc-foot-val">+$4,020</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-layout">
          <div className="pain-left">
            <div className="pain-eyebrow">The hybrid shop problem</div>
            <h2 className="pain-headline">YOUR PARTS DEPT IS<br />SUBSIDIZING YOUR<br /><em>DEALS.</em></h2>
            <p className="pain-deck">When service and sales share the same account, parts used on recon vehicles get absorbed into shop overhead. Your service department looks less profitable than it is. Your deals look cheaper than they are. Neither number is right.</p>
            <div className="pain-calc">
              <div className="pain-calc-label">What goes untracked on a typical recon unit</div>
              {[
                { desc: "Parts pulled from shop inventory for recon", val: "-$480", bad: true },
                { desc: "Technician hours not billed to the unit", val: "-$320", bad: true },
                { desc: "Sublet — detail, PDR, glass", val: "-$240", bad: true },
                { desc: "Days on lot carrying cost (est. $18/day × 22)", val: "-$396", bad: true },
                { desc: "Asking price set without knowing real cost", val: "$8,900", bad: false },
              ].map((r, i) => (
                <div className="pain-calc-row" key={i}>
                  <span className="pain-calc-desc">{r.desc}</span>
                  <span className={`pain-calc-val ${r.bad ? "bad" : "ok"}`}>{r.val}</span>
                </div>
              ))}
              <div className="pain-calc-total">
                <span className="pain-calc-total-lbl">Real margin you didn't know</span>
                <span className="pain-calc-total-val">$7,464</span>
              </div>
            </div>
          </div>
          <div className="pain-right">
            {[
              { icon: "layers", title: "One account, two businesses", body: "Service revenue, deal gross, parts sales — all in QuickBooks under the same chart of accounts. You can't tell if the shop is carrying the deals or the deals are carrying the shop." },
              { icon: "clock", title: "Recon units aging without visibility", body: "A unit goes into recon. 15 days pass. Nobody flagged it. Now it's been sitting for 3 weeks, the carrying cost is eating your margin, and the tech who started it moved to something else." },
            ].map((p, i) => (
              <div className="pain-issue" key={i}>
                <span className="pain-issue-icon"><IconAD name={p.icon} size={28} /></span>
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
          <h2 className="s-title">Every tool your hybrid<br />shop needs to <em>know its numbers.</em></h2>
          <p className="s-body">Not generic shop software. Not dealer DMS. Built for the business that does both — and needs both tracked separately.</p>
          <div className="features-grid">
            {mainFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <span className="feat-icon"><IconAD name={f.icon} size={24} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="feat-tag">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAIL */}
      <section className="rail-section">
        <div className="rail-header">
          <div className="s-label">Everything else</div>
          <h2 className="s-title">One platform.<br /><em>No more juggling.</em></h2>
        </div>
        <div className="rail-scroll">
          {railFeatures.map((f, i) => (
            <div className="rail-card" key={i}>
              <span className="rail-icon"><IconAD name={f.icon} size={22} /></span>
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
          <h2 className="s-title">Iris Financial vs.<br /><em>QuickBooks + shop software</em></h2>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch f">Feature</div>
              <div className="ch i">Iris Financial <span className="iris-pill">Best</span></div>
              <div className="ch o">QB + Shop Software</div>
            </div>
            {[
              ["Dual P&L — service + sales", "✓ Built-in", "✗ Manual separation"],
              ["Vehicle recon cost tracking", "✓ Per-unit tracking", "✗ Not available"],
              ["Work order management", "✓ Built-in", "✓ Separate subscription"],
              ["Parts inventory (service vs recon)", "✓ Separate tracking", "✗ Combined only"],
              ["Days on lot + aging alerts", "✓ Automatic", "✗ Not available"],
              ["Commission calculation", "✓ Auto from gross", "✗ Manual spreadsheet"],
              ["Iris Pay at service counter", "✓ Included", "✗ Extra integration"],
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
              <div className="cc o"><span className="big-o">$200+/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testi-inner">
          <div className="s-label">From the shop floor</div>
          <h2 className="s-title" style={{ marginBottom: 0 }}>What hybrid shops say</h2>
          <div className="testi-primary-wrap">
            <div className="testi-primary-q">"</div>
            <p className="testi-primary-text">{primary.q}</p>
            <div className="testi-primary-author">
              <div className="testi-primary-av">{primary.init}</div>
              <div><div className="testi-primary-name">{primary.name}</div><div className="testi-primary-role">{primary.role}</div></div>
            </div>
          </div>
          <div className="testi-secondary-grid">
            {secondary.map((t, i) => (
              <div className="testi-secondary" key={i}>
                <p className="testi-sec-text">"{t.q}"</p>
                <div className="testi-sec-author">
                  <div className="testi-sec-av">{t.init}</div>
                  <div><div className="testi-sec-name">{t.name}</div><div className="testi-sec-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="pricing-layout">
          <div className="pricing-left">
            <div className="s-label">Simple pricing</div>
            <h2 className="s-title">Start free.<br /><em>Scale when ready.</em></h2>
            <p>Start on the Starter plan — free forever, no credit card needed. Get your service and sales P&L separated in 15 minutes. Upgrade when your volume grows.</p>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-cadence">per month · Starter plan · forever free</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) unlocks unlimited transactions, invoices, users, and advanced features.</div>
          </div>
          <div className="pricing-right">
            <div className="s-label" style={{ display: "block", marginBottom: 28 }}>What's included</div>
            {[
              "Dual P&L — service department + sales floor separated",
              "Work order management with parts and labor tracking",
              "Vehicle recon cost tracking per unit",
              "Parts inventory with service vs recon separation",
              "Days on lot tracking with aging alerts",
              "Commission calculation from deal and WO gross",
              "Professional invoicing + Iris Pay at counter",
              "Daily gross report — service + sales + parts combined",
              "15-day free trial of Professional — no credit card required",
            ].map((f, i) => (
              <div className="p-feat" key={i}><span className="p-ck">✓</span> {f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">KNOW WHICH SIDE<br />OF THE LOT IS MAKING<br /><em>YOUR MONEY.</em></h2>
          <p className="cta-sub">Most hybrid shops have a gut feeling about their numbers. Iris Financial gives you the actual numbers — service gross, deal gross, recon cost, and parts margin — all separated, all real-time. Free to start.</p>
          <div className="cta-btns">
            <button className="cta-btn-main" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="cta-btn-sec" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
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
                <div className="modal-h">Start Free Today</div>
                <div className="modal-s">Set up your shop account in 15 minutes. First dual P&L report ready today.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Owner / GM name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Shop Name</label><input className="f-input" placeholder="e.g. T&T Auto Sales & Service" value={form.shop} onChange={e => setForm({ ...form, shop: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="you@yourshop.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Business Type</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="">Select type</option>
                    <option>Repair shop + used car sales</option>
                    <option>Used car dealer + in-house service</option>
                    <option>Buy-here-pay-here + repair</option>
                    <option>Franchise dealer + service</option>
                    <option>Collision center + sales</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div className="success-icon"><Car size={48} /></div>
                <div className="success-h">Let's Get to Work.</div>
                <p className="success-p">Setup link on its way to <strong style={{ color: "var(--orange-light)" }}>{form.email}</strong>. Your dual P&L will be ready before you close today.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
