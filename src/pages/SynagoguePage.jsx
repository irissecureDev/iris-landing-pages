import { useState, useEffect } from "react";
import { Users, PieChart, FileText, Heart, CreditCard, BarChart2, Star, DollarSign, Mail, BookOpen, Home, Calendar, Shield, Layers } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --char: #1A1A2E;
    --deep: #12122A;
    --panel: #1F1F3A;
    --rail: #252545;
    --border: rgba(255,255,255,0.08);
    --cobalt: #4A6FE3;
    --cobalt-light: #6B8FF5;
    --cobalt-glow: rgba(74,111,227,0.12);
    --silver: #C8D0E0;
    --silver-bright: #E8EDF5;
    --star: #F0C040;
    --star-light: #F8D870;
    --text-mid: #8890A8;
    --text-soft: #5A6080;
    --white: #F0F4FA;
    --green-ok: #22c55e;
    --red-warn: #ef4444;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--char); color: var(--white); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,111,227,0.4); } 50% { box-shadow: 0 0 0 12px rgba(74,111,227,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes starTwinkle { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; padding: 0 48px;
    background: rgba(26,26,46,0.97); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 13px; font-weight: 500; color: var(--text-mid); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--white); }
  .nav-cta {
    background: var(--cobalt); color: white;
    padding: 9px 22px; border-radius: 6px; border: none; cursor: pointer;
    font-weight: 600; font-size: 13px; letter-spacing: 0.03em;
    transition: all 0.2s; box-shadow: 0 4px 16px rgba(74,111,227,0.35);
  }
  .nav-cta:hover { background: var(--cobalt-light); transform: translateY(-1px); }

  /* SHABBAT BAR */
  .shabbat-bar {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    height: 34px; background: var(--deep);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; gap: 0;
  }
  .sb-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 28px; border-right: 1px solid var(--border);
    font-size: 12px; color: var(--text-soft);
  }
  .sb-item:last-child { border-right: none; }
  .sb-val { color: var(--star); font-weight: 600; }
  .sb-star { font-size: 10px; color: var(--star); animation: starTwinkle 2s infinite; }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--char);
    padding: 120px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-stars {
    position: absolute; inset: 0; overflow: hidden; pointer-events: none;
  }
  .hero-star {
    position: absolute; border-radius: 50%; background: var(--cobalt-light);
    animation: starTwinkle 3s infinite;
  }
  .hero-glow-l {
    position: absolute; left: -200px; top: 30%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(74,111,227,0.08) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-glow-r {
    position: absolute; right: -100px; bottom: 10%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(240,192,64,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-label { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--cobalt-light); margin-bottom: 22px; text-transform: uppercase; animation: fadeUp 0.5s ease both; }
  .hero-title {
    font-family: 'EB Garamond', serif;
    font-size: clamp(48px, 6vw, 80px); font-weight: 800; line-height: 1.05;
    color: var(--white); margin-bottom: 24px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title em { font-style: italic; color: var(--cobalt-light); }
  .hero-title .gold { color: var(--star); }
  .hero-sub {
    font-size: 16px; color: var(--text-mid); line-height: 1.8; font-weight: 300;
    max-width: 460px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-cobalt {
    background: var(--cobalt); color: white;
    padding: 16px 36px; border-radius: 6px; border: none; cursor: pointer;
    font-weight: 600; font-size: 15px; transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 6px 24px rgba(74,111,227,0.4);
  }
  .btn-cobalt:hover { background: var(--cobalt-light); transform: translateY(-2px); }
  .btn-ghost {
    background: transparent; color: var(--silver);
    padding: 14px 32px; border-radius: 6px; cursor: pointer;
    font-weight: 500; font-size: 15px;
    border: 1px solid var(--border); transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--cobalt); color: var(--cobalt-light); }

  /* HERO RIGHT — MEMBER GIVING CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .giving-card {
    background: var(--deep); border-radius: 12px;
    border: 1px solid var(--border);
    box-shadow: 0 32px 72px rgba(0,0,0,0.6); overflow: hidden;
  }
  .gc-head {
    background: var(--panel); padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .gc-title { font-family: 'EB Garamond', serif; font-size: 16px; font-weight: 600; color: var(--white); }
  .gc-live { display: flex; align-items: center; gap: 6px; }
  .gc-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-ok); animation: blink 2s infinite; }
  .gc-live-txt { font-size: 11px; color: var(--green-ok); font-weight: 600; letter-spacing: 0.06em; }
  .gc-tabs { display: flex; border-bottom: 1px solid var(--border); }
  .gc-tab {
    flex: 1; padding: 10px; text-align: center;
    font-size: 12px; font-weight: 600; letter-spacing: 0.05em; cursor: pointer;
    transition: all 0.2s; color: var(--text-soft); border-bottom: 2px solid transparent;
  }
  .gc-tab.active { color: var(--cobalt-light); border-bottom-color: var(--cobalt); }
  .gc-funds { padding: 0 24px; }
  .gc-fund-head {
    display: flex; justify-content: space-between; padding: 10px 0 8px;
    border-bottom: 1px solid var(--border);
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: var(--text-soft);
  }
  .gc-fund-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .gc-fund-row:last-child { border-bottom: none; }
  .gc-fund-left { display: flex; align-items: center; gap: 10px; }
  .gc-fund-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .gc-fund-name { font-size: 14px; font-weight: 500; color: var(--silver); }
  .gc-fund-sub { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
  .gc-fund-val { font-family: 'EB Garamond', serif; font-size: 17px; font-weight: 700; color: var(--cobalt-light); }
  .gc-total {
    background: var(--panel); padding: 14px 24px; border-top: 1px solid var(--border);
    border-top-color: var(--cobalt); border-top-width: 2px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .gc-total-lbl { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; color: var(--text-mid); }
  .gc-total-val { font-family: 'EB Garamond', serif; font-size: 26px; font-weight: 800; color: var(--star); }

  /* PAIN */
  .pain { background: var(--deep); padding: 0; border-top: 1px solid var(--border); }
  .pain-layout { display: grid; grid-template-columns: 1.2fr 1fr; }
  .pain-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); }
  .pain-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--cobalt-light); margin-bottom: 20px; text-transform: uppercase; }
  .pain-headline { font-family: 'EB Garamond', serif; font-size: clamp(36px, 4.5vw, 56px); font-weight: 800; line-height: 1.1; color: var(--white); margin-bottom: 24px; }
  .pain-headline em { font-style: italic; color: var(--star); }
  .pain-deck { font-size: 16px; color: var(--text-mid); line-height: 1.8; font-weight: 300; margin-bottom: 40px; }
  .pain-membership {
    background: rgba(74,111,227,0.06); border: 1px solid rgba(74,111,227,0.2);
    padding: 24px 28px; border-radius: 6px;
  }
  .pain-mem-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--cobalt-light); margin-bottom: 14px; text-transform: uppercase; }
  .pain-mem-row { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
  .pain-mem-row:last-child { border-bottom: none; }
  .pain-mem-desc { color: var(--text-mid); }
  .pain-mem-val { font-family: 'EB Garamond', serif; font-size: 18px; font-weight: 700; color: var(--silver); }
  .pain-mem-val.bad { color: var(--red-warn); }
  .pain-mem-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-top: 14px; border-top: 2px solid rgba(74,111,227,0.3); }
  .pain-mem-total-lbl { font-size: 14px; font-weight: 600; color: var(--text-mid); }
  .pain-mem-total-val { font-family: 'EB Garamond', serif; font-size: 30px; font-weight: 800; color: var(--star); }

  .pain-right { padding: 80px 48px 80px 40px; display: flex; flex-direction: column; gap: 40px; justify-content: center; }
  .pain-issue { padding-bottom: 40px; border-bottom: 1px solid var(--border); }
  .pain-issue:last-child { padding-bottom: 0; border-bottom: none; }
  .pain-issue-icon { color: var(--cobalt-light); margin-bottom: 14px; display: block; }
  .pain-issue h3 { font-family: 'EB Garamond', serif; font-size: 22px; font-weight: 700; color: var(--white); margin-bottom: 10px; }
  .pain-issue p { font-size: 14px; color: var(--text-mid); line-height: 1.75; }

  /* FEATURES */
  .features { background: var(--char); padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--cobalt-light); margin-bottom: 14px; text-transform: uppercase; }
  .s-title { font-family: 'EB Garamond', serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 800; line-height: 1.1; color: var(--white); margin-bottom: 14px; }
  .s-title em { font-style: italic; color: var(--cobalt-light); }
  .s-body { font-size: 16px; color: var(--text-mid); line-height: 1.75; font-weight: 300; max-width: 540px; }
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 56px; }
  .feat-card {
    background: var(--deep); border-radius: 8px; padding: 36px;
    border: 1px solid var(--border); transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
  }
  .feat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--cobalt), var(--star));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
  }
  .feat-card:hover::before { transform: scaleX(1); }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 56px rgba(74,111,227,0.1); border-color: rgba(74,111,227,0.25); }
  .feat-icon { color: var(--cobalt-light); margin-bottom: 18px; display: block; }
  .feat-card h3 { font-family: 'EB Garamond', serif; font-size: 22px; font-weight: 700; color: var(--white); margin-bottom: 10px; }
  .feat-card p { font-size: 14px; color: var(--text-mid); line-height: 1.7; }
  .feat-tag { display: inline-block; margin-top: 14px; background: rgba(74,111,227,0.1); border: 1px solid rgba(74,111,227,0.25); color: var(--cobalt-light); padding: 3px 10px; border-radius: 100px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; }

  /* RAIL */
  .rail-section { background: var(--deep); padding: 80px 0; border-top: 1px solid var(--border); overflow: hidden; }
  .rail-header { padding: 0 48px 36px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 3px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card { background: var(--panel); border: 1px solid var(--border); padding: 28px 24px; min-width: 240px; flex-shrink: 0; border-radius: 6px; transition: all 0.25s; }
  .rail-card:hover { border-color: rgba(74,111,227,0.35); background: rgba(74,111,227,0.06); transform: translateY(-3px); }
  .rail-icon { color: var(--cobalt-light); margin-bottom: 12px; display: block; }
  .rail-card h3 { font-family: 'EB Garamond', serif; font-size: 19px; font-weight: 700; color: var(--white); margin-bottom: 8px; }
  .rail-card p { font-size: 13px; color: var(--text-mid); line-height: 1.65; }
  .rail-hint { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-soft); letter-spacing: 0.06em; }

  /* COMPARISON */
  .comparison { background: var(--char); padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap { background: var(--deep); border: 1px solid var(--border); border-top: 2px solid var(--cobalt); border-radius: 8px; overflow: hidden; margin-top: 52px; box-shadow: 0 24px 56px rgba(0,0,0,0.5); }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--panel); }
  .ch { padding: 18px 22px; }
  .ch.f { font-size: 11px; color: var(--text-soft); font-weight: 600; letter-spacing: 0.08em; }
  .ch.i { font-family: 'EB Garamond', serif; font-size: 18px; font-weight: 700; color: var(--cobalt-light); display: flex; align-items: center; gap: 8px; }
  .ch.o { font-family: 'EB Garamond', serif; font-size: 16px; font-weight: 600; color: var(--text-soft); }
  .iris-pill { background: var(--cobalt); color: white; font-size: 9px; font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 100px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: rgba(255,255,255,0.015); }
  .cc { padding: 13px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.f { color: var(--white); font-weight: 500; }
  .cc.i { color: var(--text-mid); font-weight: 500; }
  .cc.o { color: var(--text-soft); }
  .ck { color: var(--green-ok); font-size: 16px; font-weight: 700; }
  .cx { color: var(--red-warn); font-size: 16px; font-weight: 700; }
  .price-row { background: rgba(74,111,227,0.04); border-top: 2px solid rgba(74,111,227,0.2) !important; }
  .big-i { font-family: 'EB Garamond', serif; font-size: 26px; font-weight: 800; color: var(--cobalt-light) !important; }
  .big-o { font-family: 'EB Garamond', serif; font-size: 24px; font-weight: 800; color: var(--red-warn) !important; }

  /* TESTIMONIALS */
  .testimonials { background: var(--deep); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-primary-wrap { background: var(--cobalt); padding: 56px 64px; margin-top: 52px; border-radius: 4px; }
  .testi-primary-q { font-family: 'EB Garamond', serif; font-size: 96px; font-weight: 800; color: rgba(255,255,255,0.15); line-height: 1; margin-bottom: -26px; }
  .testi-primary-text { font-family: 'EB Garamond', serif; font-size: clamp(19px, 2.5vw, 25px); font-weight: 600; line-height: 1.45; color: white; margin-bottom: 36px; max-width: 800px; }
  .testi-primary-author { display: flex; align-items: center; gap: 16px; }
  .testi-primary-av { width: 46px; height: 46px; background: var(--deep); color: var(--star); font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 6px; flex-shrink: 0; }
  .testi-primary-name { font-weight: 600; font-size: 15px; color: white; }
  .testi-primary-role { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 2px; }
  .testi-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 3px; }
  .testi-secondary { background: var(--panel); border: 1px solid var(--border); padding: 36px; transition: background 0.2s; border-radius: 0; }
  .testi-secondary:hover { background: rgba(74,111,227,0.06); }
  .testi-sec-text { font-size: 15px; color: var(--text-mid); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-sec-author { display: flex; align-items: center; gap: 12px; }
  .testi-sec-av { width: 38px; height: 38px; border-radius: 6px; background: var(--cobalt); color: white; font-family: 'EB Garamond', serif; font-size: 17px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-sec-name { font-weight: 600; font-size: 14px; color: var(--white); }
  .testi-sec-role { font-size: 12px; color: var(--text-soft); margin-top: 2px; }

  /* PRICING */
  .pricing { background: var(--char); border-top: 1px solid var(--border); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: center; }
  .pricing-amount { font-family: 'EB Garamond', serif; font-size: 100px; font-weight: 800; color: var(--cobalt-light); line-height: 1; }
  .pricing-amount sup { font-size: 42px; vertical-align: top; margin-top: 20px; }
  .pricing-cadence { font-size: 15px; color: var(--text-soft); margin: 8px 0 32px; }
  .pricing-left p { font-size: 15px; color: var(--text-mid); line-height: 1.75; font-weight: 300; margin-bottom: 32px; }
  .pricing-cta { width: 100%; background: var(--cobalt); color: white; padding: 17px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; border-radius: 6px; transition: all 0.25s; box-shadow: 0 8px 32px rgba(74,111,227,0.35); }
  .pricing-cta:hover { background: var(--cobalt-light); transform: translateY(-2px); }
  .pricing-note { font-size: 13px; color: var(--text-soft); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .p-feat { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text-mid); }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-ok); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section { background: var(--deep); padding: 90px 48px; text-align: center; border-top: 1px solid var(--border); position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(74,111,227,0.06) 1.5px, transparent 1.5px); background-size: 28px 28px; }
  .cta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
  .cta-title { font-family: 'EB Garamond', serif; font-size: clamp(36px, 5vw, 58px); font-weight: 800; color: var(--white); line-height: 1.1; margin-bottom: 20px; }
  .cta-title em { font-style: italic; color: var(--star); }
  .cta-sub { font-size: 17px; color: var(--text-mid); line-height: 1.75; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: var(--cobalt); color: white; padding: 18px 48px; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; transition: all 0.25s; box-shadow: 0 8px 32px rgba(74,111,227,0.35); }
  .cta-btn-main:hover { background: var(--cobalt-light); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: var(--text-mid); padding: 16px 44px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 15px; border: 1px solid var(--border); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: var(--cobalt); color: var(--cobalt-light); }

  /* FOOTER */
  .footer { background: var(--char); padding: 30px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid var(--border); }
  .footer-copy { font-size: 13px; color: var(--text-soft); }
  .footer-copy strong { color: var(--cobalt-light); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--text-soft); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--cobalt-light); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(18,18,42,0.9); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: var(--deep); border: 1px solid var(--border); border-top: 3px solid var(--cobalt); border-radius: 8px; padding: 48px; max-width: 480px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(0,0,0,0.8); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--panel); border: 1px solid var(--border); color: var(--text-mid); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; border-radius: 6px; }
  .modal-x:hover { border-color: var(--cobalt); color: var(--cobalt-light); }
  .modal-h { font-family: 'EB Garamond', serif; font-size: 28px; font-weight: 700; color: var(--white); margin-bottom: 6px; }
  .modal-s { color: var(--text-mid); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: var(--cobalt-light); margin-bottom: 6px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 12px 16px; background: var(--panel); border: 1px solid var(--border); font-size: 14px; font-family: 'Inter', sans-serif; color: var(--white); outline: none; transition: border-color 0.2s; border-radius: 6px; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-input:focus { border-color: var(--cobalt); }
  .f-btn { width: 100%; background: var(--cobalt); color: white; padding: 15px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; border-radius: 6px; margin-top: 8px; transition: all 0.25s; }
  .f-btn:hover { background: var(--cobalt-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-icon { color: var(--star); margin-bottom: 16px; display: flex; justify-content: center; }
  .success-h { font-family: 'EB Garamond', serif; font-size: 28px; font-weight: 700; color: var(--white); margin-bottom: 10px; }
  .success-p { color: var(--text-mid); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .shabbat-bar { display: none; }
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

const IconS = ({ name, size = 24 }) => {
  const icons = {
    users: <Users size={size} />, "pie-chart": <PieChart size={size} />,
    "file-text": <FileText size={size} />, heart: <Heart size={size} />,
    "credit-card": <CreditCard size={size} />, "bar-chart": <BarChart2 size={size} />,
    star: <Star size={size} />, dollar: <DollarSign size={size} />,
    mail: <Mail size={size} />, book: <BookOpen size={size} />,
    home: <Home size={size} />, calendar: <Calendar size={size} />,
    shield: <Shield size={size} />, layers: <Layers size={size} />,
  };
  return icons[name] || null;
};

const funds = [
  { name: "Annual Membership Dues", sub: "Family & individual tiers", val: "$84,200", color: "#4A6FE3" },
  { name: "High Holiday Appeals", sub: "Rosh Hashanah & Yom Kippur", val: "$42,800", color: "#F0C040" },
  { name: "Tzedakah Fund", sub: "Charitable giving", val: "$18,600", color: "#22c55e" },
  { name: "Building & Endowment", sub: "Capital campaign", val: "$61,400", color: "#6B8FF5" },
];

const mainFeatures = [
  { icon: "users", title: "Member Management", desc: "Full family profiles with membership tier, dues status, lifecycle events, and multi-year giving history — all connected.", tag: "Synagogue-Specific" },
  { icon: "pie-chart", title: "High Holiday Appeal Tracking", desc: "Rosh Hashanah and Yom Kippur pledge management, payment plans, and follow-up — automated from pledge to receipt.", tag: "Synagogue-Specific" },
  { icon: "file-text", title: "Year-End Giving Statements", desc: "IRS-compliant tax receipts for every member generated and emailed in one click — before they start calling in January.", tag: "Saves Hours" },
  { icon: "layers", title: "Membership Dues Billing", desc: "Tiered dues structures, payment plans, auto-reminders, and lapsed-member tracking — all handled without a spreadsheet.", tag: "Revenue Automation" },
  { icon: "credit-card", title: "Online & Mobile Giving", desc: "Accept dues and donations via card or mobile money. High Holiday online giving portal handles volume spikes gracefully.", tag: "Iris Pay" },
  { icon: "bar-chart", title: "Financial Reports", desc: "Fund balances, dues collection rates, P&L, and giving trends — board and finance committee-ready at any time.", tag: "Bilingual EN/FR" },
];

const railFeatures = [
  { icon: "book", title: "Hebrew School Billing", desc: "Tuition tracking, payment plans, and invoicing for religious school families — automated." },
  { icon: "calendar", title: "Event & Lifecycle Billing", desc: "B'nai Mitzvah, lifecycle events, and program fees tracked with dedicated budgets." },
  { icon: "home", title: "Multi-Branch Support", desc: "Running satellite minyanim or multiple campuses? Consolidated financials across all." },
  { icon: "shield", title: "Endowment Fund Tracking", desc: "Track principal, distributions, and investment performance for named endowment funds." },
  { icon: "mail", title: "Member Acknowledgment", desc: "Auto-send tax receipts and thank-you letters after every gift. Builds donor retention." },
  { icon: "dollar", title: "Pledge Management", desc: "Multi-year pledge tracking with automated reminders and payment plan reconciliation." },
];

const testimonials = [
  { q: "We had 340 member families paying dues on different schedules, with different tier levels, some on payment plans. Our administrator was spending 15 hours a month just on dues tracking. Iris Financial automated that entirely — she's now spending those hours on actual member engagement.", name: "Rabbi Daniel B.", role: "Congregation Beth Shalom, Chicago IL", init: "D", primary: true },
  { q: "Our High Holiday appeals used to require three volunteers with spreadsheets for two weeks after the Holidays. Now every pledge is tracked, payment plans set up, and receipts sent automatically.", name: "Treasurer Sarah K.", role: "Temple Emanuel, New York NY", init: "S", primary: false },
  { q: "The board can see our fund balances in real time now. Endowment, building fund, and operating fund — completely separate, completely clear. We haven't had a finance committee question we couldn't answer instantly.", name: "Executive Director M. Levy", role: "Har Sinai Congregation, Baltimore MD", init: "M", primary: false },
];

const starPositions = [
  { top: "15%", left: "8%", size: 2, delay: "0s" }, { top: "25%", left: "85%", size: 3, delay: "0.5s" },
  { top: "60%", left: "92%", size: 2, delay: "1s" }, { top: "75%", left: "5%", size: 2, delay: "1.5s" },
  { top: "40%", left: "75%", size: 1.5, delay: "0.7s" }, { top: "10%", left: "60%", size: 2.5, delay: "1.2s" },
];

export default function SynagoguePage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", synagogue: "", email: "", size: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("funds");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      await fetch("https://formspree.io/f/xbgjvjwr", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, synagogue: form.synagogue, email: form.email, congregation_size: form.size, vertical: "Synagogue" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=synagogue&ref=landing"; }, 2000);
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

      {/* SHABBAT BAR */}
      <div className="shabbat-bar">
        <div className="sb-item"><span className="sb-star">✦</span><span className="sb-val">Shabbat</span><span>candle lighting 7:14 PM</span></div>
        <div className="sb-item"><span className="sb-val">$207,000</span><span>total funds this year</span></div>
        <div className="sb-item"><span className="sb-val">340</span><span>member families</span></div>
        <div className="sb-item"><span className="sb-val">High Holiday</span><span>pledges: 94% collected</span></div>
        <div className="sb-item"><span className="sb-val">Building Fund</span><span>$61,400 raised</span></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-stars">
          {starPositions.map((s, i) => (
            <div key={i} className="hero-star" style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }} />
          ))}
        </div>
        <div className="hero-glow-l" />
        <div className="hero-glow-r" />
        <div className="hero-layout">
          <div>
            <div className="hero-label">Built for Synagogues & Jewish Organizations</div>
            <h1 className="hero-title">
              Member finances,<br />
              <em>clearly managed.</em><br />
              <span className="gold">L'dor v'dor.</span>
            </h1>
            <p className="hero-sub">
              Membership dues, High Holiday appeals, tzedakah fund tracking, and year-end giving statements — one platform built for congregations. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-cobalt" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="giving-card">
              <div className="gc-head">
                <span className="gc-title">Congregation Dashboard — This Year</span>
                <div className="gc-live"><div className="gc-dot" /><span className="gc-live-txt">Live</span></div>
              </div>
              <div className="gc-tabs">
                {["funds", "dues"].map(t => (
                  <div key={t} className={`gc-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                    {t === "funds" ? "Fund Overview" : "Dues Status"}
                  </div>
                ))}
              </div>
              {activeTab === "funds" ? (
                <>
                  <div className="gc-funds">
                    <div className="gc-fund-head"><span>Fund</span><span>Collected</span></div>
                    {funds.map((f, i) => (
                      <div className="gc-fund-row" key={i}>
                        <div className="gc-fund-left">
                          <div className="gc-fund-dot" style={{ background: f.color }} />
                          <div><div className="gc-fund-name">{f.name}</div><div className="gc-fund-sub">{f.sub}</div></div>
                        </div>
                        <div className="gc-fund-val">{f.val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="gc-total">
                    <span className="gc-total-lbl">Total Funds This Year</span>
                    <span className="gc-total-val">$207,000</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="gc-funds">
                    <div className="gc-fund-head"><span>Tier</span><span>Collected</span></div>
                    {[
                      { name: "Full Member", sub: "142 families", val: "$56,800", color: "#4A6FE3" },
                      { name: "Associate Member", sub: "98 families", val: "$19,600", color: "#6B8FF5" },
                      { name: "Young Professional", sub: "64 families", val: "$6,400", color: "#22c55e" },
                      { name: "Senior / Fixed Income", sub: "36 families", val: "$5,400", color: "#F0C040" },
                    ].map((f, i) => (
                      <div className="gc-fund-row" key={i}>
                        <div className="gc-fund-left">
                          <div className="gc-fund-dot" style={{ background: f.color }} />
                          <div><div className="gc-fund-name">{f.name}</div><div className="gc-fund-sub">{f.sub}</div></div>
                        </div>
                        <div className="gc-fund-val">{f.val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="gc-total">
                    <span className="gc-total-lbl">Dues Collected YTD</span>
                    <span className="gc-total-val">$88,200</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-layout">
          <div className="pain-left">
            <div className="pain-eyebrow">The membership problem</div>
            <h2 className="pain-headline">340 families.<br />4 payment tiers.<br /><em>One spreadsheet.</em></h2>
            <p className="pain-deck">Most synagogues manage membership dues in a spreadsheet that one person understands. When they leave, the congregation loses years of institutional knowledge — and months of revenue while catching up.</p>
            <div className="pain-membership">
              <div className="pain-mem-label">What goes untracked every year</div>
              {[
                { desc: "Members on informal payment plans, never formalized", val: "22 families" },
                { desc: "High Holiday pledges outstanding past 90 days", val: "$8,400" },
                { desc: "Lapsed members not flagged for outreach", val: "18 families" },
                { desc: "Duplicate records across dues and donation systems", val: "47 entries" },
              ].map((r, i) => (
                <div className="pain-mem-row" key={i}>
                  <span className="pain-mem-desc">{r.desc}</span>
                  <span className={`pain-mem-val ${i === 0 ? "" : i === 1 ? "bad" : ""}`}>{r.val}</span>
                </div>
              ))}
              <div className="pain-mem-total">
                <span className="pain-mem-total-lbl">Revenue impact per year</span>
                <span className="pain-mem-total-val">$12–18k</span>
              </div>
            </div>
          </div>
          <div className="pain-right">
            {[
              { icon: "layers", title: "Dues and donations in different systems", body: "Your membership database doesn't talk to your accounting software. Members are in both. Nothing matches. The administrator reconciles manually every month." },
              { icon: "calendar", title: "High Holiday chaos, every fall", body: "Pledge cards collected at Kol Nidre. Entered manually the following week. Payment plan calls made by hand. Three volunteers for two weeks — every year." },
            ].map((p, i) => (
              <div className="pain-issue" key={i}>
                <span className="pain-issue-icon"><IconS name={p.icon} size={28} /></span>
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
          <h2 className="s-title">Everything your congregation<br />needs in <em>one place.</em></h2>
          <p className="s-body">Not generic nonprofit software. Built for the financial complexity of synagogue life — from tiered dues to High Holiday appeals.</p>
          <div className="features-grid">
            {mainFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <span className="feat-icon"><IconS name={f.icon} size={24} /></span>
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
              <span className="rail-icon"><IconS name={f.icon} size={22} /></span>
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
          <h2 className="s-title">Iris Financial vs.<br /><em>ShulCloud + QuickBooks</em></h2>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch f">Feature</div>
              <div className="ch i">Iris Financial <span className="iris-pill">Best</span></div>
              <div className="ch o">ShulCloud + QB</div>
            </div>
            {[
              ["Member management", "✓ Built-in", "✓ ShulCloud (separate sub)"],
              ["Tiered dues automation", "✓ Built-in", "✗ Manual setup required"],
              ["High Holiday pledge mgmt", "✓ Built-in", "✓ ShulCloud (limited)"],
              ["Year-end giving statements", "✓ 1-click bulk email", "✗ Manual in QB"],
              ["Real-time P&L", "✓ Live dashboard", "✗ QB month-end only"],
              ["Hebrew school billing", "✓ Built-in", "✗ Separate tool needed"],
              ["Online giving portal", "✓ Iris Pay included", "✗ Extra integration"],
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
          <div className="s-label">From the congregation</div>
          <h2 className="s-title" style={{ marginBottom: 0 }}>What synagogues say</h2>
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
            <h2 className="s-title">Start free.<br /><em>Scale as you grow.</em></h2>
            <p>Start on the Starter plan — free forever, no credit card needed. Get your member records and dues tracking set up in 15 minutes. Upgrade as your congregation grows.</p>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-cadence">per month · Starter plan · forever free</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) unlocks unlimited transactions, invoices, users, and advanced features.</div>
          </div>
          <div className="pricing-right">
            <div className="s-label" style={{ display: "block", marginBottom: 28 }}>What's included</div>
            {[
              "Member family profiles (Starter: up to 50 transactions/mo)",
              "Tiered dues management with payment plans",
              "High Holiday pledge tracking and follow-up",
              "IRS-compliant year-end giving statements (bulk email)",
              "Tzedakah and dedicated fund separation",
              "Hebrew school and program billing",
              "Online giving portal + Iris Pay",
              "Financial reports for board and finance committee",
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
          <h2 className="cta-title">Your congregation's future<br />starts with <em>clear finances.</em></h2>
          <p className="cta-sub">Every family that joins, every High Holiday pledge, every tzedakah gift deserves a clear record. Iris Financial gives your leadership the visibility your community has always deserved — free to start.</p>
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
                <div className="modal-h">Start Free Today</div>
                <div className="modal-s">Set up your congregation account in 15 minutes. No credit card required.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Rabbi / Executive Director name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Synagogue Name</label><input className="f-input" placeholder="e.g. Congregation Beth Shalom" value={form.synagogue} onChange={e => setForm({ ...form, synagogue: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="your@synagogue.org" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Congregation Size</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
                    <option value="">Select size</option>
                    <option>Under 100 families</option>
                    <option>100–250 families</option>
                    <option>250–500 families</option>
                    <option>500+ families</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div className="success-icon"><Star size={48} /></div>
                <div className="success-h">Mazal tov!</div>
                <p className="success-p">Setup link on its way to <strong style={{ color: "var(--cobalt-light)" }}>{form.email}</strong>. Your congregation's finances are about to get a lot clearer.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
