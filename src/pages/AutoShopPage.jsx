import { useState, useEffect } from "react";
import { Wrench, Car, Package, Receipt, CreditCard, BarChart2, UserCheck, Bell, ShoppingCart, TrendingUp, Settings, Cog, Fuel } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --black: #0A0B0D;
    --dark: #111318;
    --panel: #181C24;
    --rail: #1E2330;
    --border: rgba(255,255,255,0.07);
    --border-y: rgba(245,196,0,0.25);
    --yellow: #F5C400;
    --yellow-hot: #FFD740;
    --orange: #E8600A;
    --red: #E53935;
    --green: #43A047;
    --text: #C8CDD8;
    --muted: #5A6478;
    --light: #8890A0;
    --white: #F0F2F5;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Barlow', sans-serif; background: var(--black); color: var(--white); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(245,196,0,0.4); } 50% { box-shadow: 0 0 0 10px rgba(245,196,0,0); } }
  @keyframes scan { 0% { top: -2px; opacity: 0.7; } 100% { top: 100%; opacity: 0; } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes countUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 62px; padding: 0 48px;
    background: rgba(10,11,13,0.97); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; gap: 10px; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 13px; font-weight: 500; color: var(--muted); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--white); }
  .nav-cta {
    background: var(--yellow); color: var(--black);
    padding: 9px 22px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.08em;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: all 0.2s;
  }
  .nav-cta:hover { background: var(--yellow-hot); }

  /* STAT BAR — replaces ticker */
  .stat-bar {
    position: fixed; top: 62px; left: 0; right: 0; z-index: 199;
    height: 38px; background: var(--panel);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; gap: 0;
  }
  .sbar-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 32px; border-right: 1px solid var(--border);
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.06em;
  }
  .sbar-item:last-child { border-right: none; }
  .sbar-val { color: var(--yellow); }
  .sbar-lbl { color: var(--muted); }
  .sbar-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--black);
    padding: 122px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 52px 52px;
  }
  .hero-scan {
    position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(245,196,0,0.4), transparent);
    animation: scan 8s linear infinite; pointer-events: none;
  }
  .hero-accent {
    position: absolute; right: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, transparent, var(--yellow), transparent);
    opacity: 0.4;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.16em; color: var(--yellow); margin-bottom: 22px;
    animation: fadeUp 0.5s ease both;
  }
  .hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(58px, 7vw, 96px); font-weight: 900; line-height: 0.9;
    color: var(--white); margin-bottom: 28px; letter-spacing: -0.01em;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title .y { color: var(--yellow); }
  .hero-sub {
    font-size: 16px; color: var(--light); line-height: 1.75; font-weight: 300;
    max-width: 440px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-y {
    background: var(--yellow); color: var(--black);
    padding: 15px 36px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 15px; letter-spacing: 0.08em;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: all 0.25s; animation: pulse 2.5s infinite;
  }
  .btn-y:hover { background: var(--yellow-hot); transform: translateY(-2px); }
  .btn-ghost {
    background: transparent; color: var(--light);
    padding: 13px 30px; border: 1px solid var(--border);
    cursor: pointer; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600; font-size: 15px; letter-spacing: 0.06em; transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--yellow); color: var(--yellow); }

  /* HERO RIGHT: WO CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .wo-card {
    background: var(--dark); border: 1px solid var(--border);
    border-top: 2px solid var(--yellow); border-radius: 3px;
    overflow: hidden; box-shadow: 0 32px 64px rgba(0,0,0,0.7);
    font-family: 'Barlow Condensed', sans-serif;
  }
  .wo-head {
    background: var(--panel); padding: 13px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .wo-head-title { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--light); }
  .wo-badge {
    padding: 3px 10px; font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; border-radius: 2px;
  }
  .wo-badge.open { background: rgba(245,196,0,0.12); color: var(--yellow); border: 1px solid rgba(245,196,0,0.25); }
  .wo-badge.warn { background: rgba(229,57,53,0.12); color: var(--red); border: 1px solid rgba(229,57,53,0.3); }
  .wo-badge.done { background: rgba(67,160,71,0.12); color: var(--green); border: 1px solid rgba(67,160,71,0.25); }
  .wo-vehicle {
    padding: 14px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: flex-start; gap: 12px;
  }
  .wo-car-name { font-size: 16px; font-weight: 700; color: var(--white); }
  .wo-car-sub { font-size: 12px; color: var(--muted); margin-top: 3px; letter-spacing: 0.04em; }
  .wo-vin { font-size: 11px; color: var(--muted); font-family: monospace; margin-top: 4px; }
  .wo-items { padding: 0 20px; }
  .wo-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .wo-item:last-child { border-bottom: none; }
  .wo-item-left { display: flex; align-items: center; gap: 10px; }
  .wo-item-icon {
    width: 28px; height: 28px; border-radius: 3px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; font-size: 13px;
  }
  .wo-item-name { font-size: 13px; font-weight: 600; color: var(--white); }
  .wo-item-type { font-size: 11px; color: var(--muted); margin-top: 1px; letter-spacing: 0.04em; }
  .wo-item-price { font-size: 15px; font-weight: 700; color: var(--yellow-hot); }
  .wo-item-price.parts { color: var(--text); }
  .wo-total {
    background: var(--panel); padding: 13px 20px; border-top: 2px solid var(--yellow);
    display: flex; align-items: center; justify-content: space-between;
  }
  .wo-total-lbl { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--light); }
  .wo-total-val { font-size: 24px; font-weight: 900; color: var(--yellow); }
  .wo-foot {
    padding: 11px 20px; background: rgba(67,160,71,0.06);
    border-top: 1px solid rgba(67,160,71,0.15);
    display: flex; align-items: center; gap: 8px;
  }
  .wo-foot-txt { font-size: 12px; color: var(--green); font-weight: 600; letter-spacing: 0.05em; }

  /* PAIN — REDESIGNED: split layout with live calculator */
  .pain { background: var(--dark); padding: 0; border-top: 1px solid var(--border); }
  .pain-intro {
    padding: 80px 48px 60px; max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end;
  }
  .pain-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(40px, 5vw, 64px); font-weight: 900; line-height: 0.95;
    color: var(--white); letter-spacing: 0.01em;
  }
  .pain-headline .y { color: var(--yellow); }
  .pain-deck {
    font-size: 16px; color: var(--light); line-height: 1.75; font-weight: 300;
    border-left: 2px solid var(--yellow); padding-left: 24px;
  }

  /* CALCULATOR STRIP */
  .calc-strip {
    background: var(--black); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 0;
  }
  .calc-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); }
  .calc-item {
    padding: 36px 40px; border-right: 1px solid var(--border);
    position: relative;
  }
  .calc-item:last-child { border-right: none; }
  .calc-scenario { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 12px; font-family: 'Barlow Condensed', sans-serif; }
  .calc-loss {
    font-family: 'Barlow Condensed', sans-serif; font-size: 48px; font-weight: 900;
    color: var(--red); line-height: 1; margin-bottom: 8px;
  }
  .calc-desc { font-size: 13px; color: var(--light); line-height: 1.6; }
  .calc-math {
    margin-top: 12px; font-family: monospace; font-size: 12px; color: var(--muted);
    background: rgba(255,255,255,0.03); padding: 8px 10px; border-left: 2px solid var(--yellow);
  }
  .calc-total-strip {
    background: var(--yellow); padding: 20px 40px;
    display: flex; align-items: center; justify-content: space-between;
    max-width: none;
  }
  .calc-total-lbl {
    font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700;
    letter-spacing: 0.08em; color: var(--black);
  }
  .calc-total-val {
    font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 900; color: var(--black);
  }
  .calc-total-note { font-size: 13px; color: rgba(0,0,0,0.55); margin-top: 2px; }

  /* FEATURES */
  .features { background: var(--black); padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: var(--yellow); margin-bottom: 14px; }
  .s-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 900; line-height: 0.98; color: var(--white); margin-bottom: 14px; letter-spacing: 0.01em; }
  .s-title .y { color: var(--yellow); }
  .s-body { font-size: 16px; color: var(--light); line-height: 1.75; font-weight: 300; max-width: 540px; }
  .features-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; margin-top: 60px; }
  .feat-list { display: grid; gap: 4px; }
  .feat-row {
    display: flex; gap: 16px; padding: 20px 22px;
    background: var(--dark); border: 1px solid var(--border); border-radius: 3px; transition: all 0.25s;
  }
  .feat-row:hover { background: var(--panel); border-left: 3px solid var(--yellow); padding-left: 20px; }
  .feat-icon { width: 42px; height: 42px; border-radius: 3px; flex-shrink: 0; background: rgba(245,196,0,0.08); border: 1px solid rgba(245,196,0,0.18); display: flex; align-items: center; justify-content: center; font-size: 19px; }
  .feat-h { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: 0.04em; color: var(--white); margin-bottom: 5px; }
  .feat-p { font-size: 13px; color: var(--light); line-height: 1.6; }
  .feat-tag { display: inline-block; margin-top: 7px; background: rgba(245,196,0,0.07); border: 1px solid rgba(245,196,0,0.18); color: var(--yellow); padding: 2px 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; font-family: 'Barlow Condensed', sans-serif; border-radius: 2px; }

  /* DASHBOARD MOCKUP */
  .dash {
    background: var(--dark); border: 1px solid var(--border);
    border-top: 2px solid var(--yellow); border-radius: 3px; overflow: hidden;
    box-shadow: 0 24px 56px rgba(0,0,0,0.6);
  }
  .dash-top { background: var(--panel); padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
  .dash-top-title { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--light); }
  .dash-live-wrap { display: flex; align-items: center; gap: 6px; }
  .dash-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
  .dash-live { font-size: 11px; color: var(--green); font-weight: 600; letter-spacing: 0.06em; font-family: 'Barlow Condensed', sans-serif; }
  .dash-metrics { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--border); }
  .d-metric { padding: 14px 16px; border-right: 1px solid var(--border); }
  .d-metric:last-child { border-right: none; }
  .d-lbl { font-size: 10px; color: var(--muted); font-weight: 600; letter-spacing: 0.1em; margin-bottom: 5px; font-family: 'Barlow Condensed', sans-serif; }
  .d-val { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; color: var(--yellow); }
  .d-val.w { color: var(--white); }
  .d-val.g { color: var(--green); }
  .d-delta { font-size: 11px; color: var(--green); margin-top: 2px; }
  .dash-rows { padding: 0 4px; }
  .d-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); border-radius: 2px; transition: background 0.15s; }
  .d-row:hover { background: rgba(255,255,255,0.02); }
  .d-row-left { display: flex; align-items: center; gap: 10px; }
  .d-wo { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: var(--muted); background: var(--rail); padding: 2px 6px; border-radius: 2px; }
  .d-car { font-size: 13px; font-weight: 600; color: var(--white); }
  .d-svc { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .d-price { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: var(--yellow); }
  .d-status { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; margin-top: 2px; font-family: 'Barlow Condensed', sans-serif; }
  .d-status.in-progress { color: var(--orange); }
  .d-status.ready { color: var(--green); }
  .d-status.waiting { color: var(--red); }
  .dash-foot { background: var(--panel); padding: 12px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .dash-foot-lbl { font-size: 12px; color: var(--muted); font-weight: 600; letter-spacing: 0.06em; font-family: 'Barlow Condensed', sans-serif; }
  .dash-foot-val { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 900; color: var(--yellow); }

  /* FEATURE RAIL — replaces 3x2 grid */
  .rail-section { background: var(--dark); padding: 80px 0; border-top: 1px solid var(--border); overflow: hidden; }
  .rail-header { padding: 0 48px 40px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 3px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card {
    background: var(--panel); border: 1px solid var(--border);
    border-radius: 3px; padding: 28px 24px; min-width: 240px; flex-shrink: 0;
    transition: all 0.25s;
  }
  .rail-card:hover { border-color: var(--border-y); background: rgba(245,196,0,0.03); }
  .rail-card-icon { font-size: 26px; margin-bottom: 14px; display: block; }
  .rail-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: 0.04em; color: var(--white); margin-bottom: 8px; }
  .rail-card p { font-size: 13px; color: var(--light); line-height: 1.6; }
  .rail-hint { text-align: center; margin-top: 24px; font-size: 12px; color: var(--muted); letter-spacing: 0.06em; font-family: 'Barlow Condensed', sans-serif; }

  /* COMPARISON */
  .comparison { background: var(--black); padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 900px; margin: 0 auto; }
  .comp-wrap { background: var(--dark); border: 1px solid var(--border); border-top: 2px solid var(--yellow); border-radius: 3px; overflow: hidden; margin-top: 52px; box-shadow: 0 24px 56px rgba(0,0,0,0.5); }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--panel); }
  .ch { padding: 17px 22px; }
  .ch.f { font-size: 11px; color: var(--muted); font-weight: 600; letter-spacing: 0.08em; }
  .ch.i { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 900; letter-spacing: 0.04em; color: var(--yellow); display: flex; align-items: center; gap: 8px; }
  .ch.o { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; color: var(--muted); }
  .ibadge { background: var(--yellow); color: var(--black); font-size: 9px; font-family: 'Barlow', sans-serif; font-weight: 800; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 2px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: rgba(255,255,255,0.015); }
  .cc { padding: 13px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.f { color: var(--white); font-weight: 500; }
  .cc.i { color: var(--text); font-weight: 500; }
  .cc.o { color: var(--muted); }
  .ck { color: var(--green); font-size: 15px; font-weight: 700; }
  .cx { color: var(--red); font-size: 15px; font-weight: 700; }
  .price-row { background: rgba(245,196,0,0.03); border-top: 2px solid rgba(245,196,0,0.2) !important; }
  .big-i { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; color: var(--yellow) !important; }
  .big-o { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 900; color: var(--muted) !important; }

  /* TESTIMONIALS — MAGAZINE LAYOUT */
  .testimonials { background: var(--dark); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 3px; margin-top: 52px; }
  .testi-primary {
    background: var(--yellow); padding: 52px 48px;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 320px;
  }
  .testi-primary-q { font-family: 'Barlow Condensed', sans-serif; font-size: 80px; font-weight: 900; color: rgba(0,0,0,0.15); line-height: 1; margin-bottom: -20px; }
  .testi-primary-text { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 600; line-height: 1.35; color: var(--black); margin-bottom: 32px; }
  .testi-primary-author { display: flex; align-items: center; gap: 14px; }
  .testi-primary-av { width: 44px; height: 44px; background: var(--black); color: var(--yellow); font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900; display: flex; align-items: center; justify-content: center; border-radius: 3px; flex-shrink: 0; }
  .testi-primary-name { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 800; letter-spacing: 0.04em; color: var(--black); }
  .testi-primary-role { font-size: 13px; color: rgba(0,0,0,0.5); margin-top: 2px; }
  .testi-secondary-stack { display: flex; flex-direction: column; gap: 3px; }
  .testi-secondary {
    background: var(--panel); border: 1px solid var(--border);
    padding: 32px 28px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;
  }
  .testi-secondary-text { font-size: 14px; color: var(--text); line-height: 1.7; margin-bottom: 20px; }
  .testi-secondary-author { display: flex; align-items: center; gap: 10px; }
  .testi-secondary-av { width: 34px; height: 34px; background: var(--rail); border: 1px solid var(--border-y); color: var(--yellow); font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 900; display: flex; align-items: center; justify-content: center; border-radius: 2px; flex-shrink: 0; }
  .testi-secondary-name { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 800; letter-spacing: 0.04em; color: var(--white); }
  .testi-secondary-role { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* PRICING — BRUTALIST SPLIT */
  .pricing { background: var(--black); border-top: 1px solid var(--border); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left {
    padding: 80px 48px; border-right: 1px solid var(--border);
    display: flex; flex-direction: column; justify-content: center;
  }
  .pricing-left .s-title { font-size: clamp(42px, 5vw, 68px); margin-bottom: 24px; }
  .pricing-left p { font-size: 15px; color: var(--light); line-height: 1.75; font-weight: 300; margin-bottom: 36px; }
  .pricing-amount-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
  .pricing-amount { font-family: 'Barlow Condensed', sans-serif; font-size: 96px; font-weight: 900; color: var(--yellow); line-height: 1; }
  .pricing-amount sup { font-size: 40px; vertical-align: top; margin-top: 18px; }
  .pricing-cadence { font-size: 15px; color: var(--muted); margin-bottom: 36px; }
  .pricing-cta {
    background: var(--yellow); color: var(--black);
    padding: 17px 0; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: 0.1em; width: 100%;
    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    transition: all 0.25s;
  }
  .pricing-cta:hover { background: var(--yellow-hot); }
  .pricing-note { font-size: 13px; color: var(--muted); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .pricing-right .s-label { margin-bottom: 28px; }
  .p-feat {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 0; border-bottom: 1px solid var(--border);
    font-size: 14px; color: var(--text);
  }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section {
    background: var(--yellow); padding: 80px 48px; text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: ''; position: absolute; inset: 0;
    background-image: linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  .cta-inner { position: relative; z-index: 2; max-width: 660px; margin: 0 auto; }
  .cta-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(40px, 6vw, 70px); font-weight: 900; color: var(--black); line-height: 0.95; margin-bottom: 18px; letter-spacing: 0.01em; }
  .cta-sub { font-size: 16px; color: rgba(0,0,0,0.6); line-height: 1.7; margin-bottom: 40px; font-weight: 400; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-dark {
    background: var(--black); color: var(--yellow);
    padding: 17px 48px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 16px; letter-spacing: 0.08em;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: all 0.25s;
  }
  .cta-btn-dark:hover { background: var(--dark); }
  .cta-btn-outline {
    background: transparent; color: var(--black);
    padding: 15px 44px; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 16px; letter-spacing: 0.08em;
    border: 2px solid rgba(0,0,0,0.3); transition: all 0.25s;
  }
  .cta-btn-outline:hover { border-color: var(--black); }

  /* FOOTER */
  .footer {
    background: var(--black); padding: 30px 48px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
    border-top: 1px solid var(--border);
  }
  .footer-copy { font-size: 13px; color: var(--muted); }
  .footer-copy strong { color: var(--yellow); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 12px; color: var(--muted); cursor: pointer; transition: color 0.2s; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; letter-spacing: 0.06em; }
  .f-lnk:hover { color: var(--yellow); }

  /* MODAL */
  .modal-ov {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.9); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .modal-box {
    background: var(--dark); border: 1px solid var(--border); border-top: 3px solid var(--yellow);
    border-radius: 3px; padding: 48px; max-width: 480px; width: 100%;
    position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(0,0,0,0.8);
  }
  .modal-x {
    position: absolute; top: 16px; right: 16px;
    background: var(--panel); border: 1px solid var(--border); color: var(--light);
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; transition: all 0.2s; border-radius: 2px;
  }
  .modal-x:hover { border-color: var(--yellow); color: var(--yellow); }
  .modal-h { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 0.04em; color: var(--white); margin-bottom: 6px; }
  .modal-s { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--yellow); margin-bottom: 6px; display: block; }
  .f-input {
    width: 100%; padding: 12px 16px; background: var(--panel); border: 1px solid var(--border);
    font-size: 14px; font-family: 'Barlow', sans-serif; color: var(--white); outline: none; transition: border-color 0.2s; border-radius: 2px;
  }
  .f-input::placeholder { color: var(--muted); }
  .f-input:focus { border-color: var(--yellow); }
  .f-btn {
    width: 100%; background: var(--yellow); color: var(--black);
    padding: 15px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 16px; letter-spacing: 0.08em; margin-top: 8px;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: all 0.25s;
  }
  .f-btn:hover { background: var(--yellow-hot); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-emoji { font-size: 48px; display: block; margin-bottom: 14px; }
  .success-h { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 0.04em; color: var(--white); margin-bottom: 8px; }
  .success-p { color: var(--text); font-size: 14px; line-height: 1.6; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .stat-bar { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .pain-intro { grid-template-columns: 1fr; gap: 32px; padding: 60px 20px 40px; }
    .calc-inner { grid-template-columns: 1fr; }
    .calc-item { border-right: none; border-bottom: 1px solid var(--border); }
    .features-layout { grid-template-columns: 1fr; }
    .testi-layout { grid-template-columns: 1fr; }
    .pricing-layout { grid-template-columns: 1fr; }
    .pricing-left { padding: 60px 20px; border-right: none; border-bottom: 1px solid var(--border); }
    .pricing-right { padding: 60px 20px; }
    .features, .comparison, .testimonials, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
  }
`;

const workOrders = [
  { num: "WO-1042", car: "2019 Ford F-150", service: "Transmission Service", price: "$680", status: "in-progress", statusLabel: "In Progress" },
  { num: "WO-1041", car: "2021 Honda Civic", service: "Brake Pad Replacement", price: "$320", status: "ready", statusLabel: "Ready for Pickup" },
  { num: "WO-1040", car: "2017 Chevy Tahoe", service: "Engine Diagnostics", price: "$185", status: "waiting", statusLabel: "Waiting on Parts" },
  { num: "WO-1039", car: "2020 Toyota Camry", service: "Oil Change + Inspection", price: "$95", status: "ready", statusLabel: "Ready for Pickup" },
];

const mainFeatures = [
  { icon: "wrench", title: "Work Order Management", desc: "Create, assign, and track every job from intake to invoice. Techs update status from the bay in real time.", tag: "Shop-Specific" },
  { icon: "car", title: "Vehicle History", desc: "Every car gets a full service record — VIN, mileage, past work, recommendations. Customers trust you more.", tag: "Retention Driver" },
  { icon: "package", title: "Parts Inventory Control", desc: "Track stock, set reorder alerts, link parts to work orders. Every part that leaves the shelf hits the invoice.", tag: "Profit Recovery" },
  { icon: "receipt", title: "Service-to-Invoice", desc: "Job complete → invoice generated → sent to customer. Automatic. No manual step, no 9pm paperwork.", tag: "Saves 40 min/day" },
];

const railFeatures = [
  { icon: "credit-card", title: "Iris Pay at Counter", desc: "Card and mobile payments. Every transaction auto-posts to your books." },
  { icon: "bar-chart", title: "Real-Time P&L", desc: "Labor revenue, parts margin, net income — live. Not month-end." },
  { icon: "user-check", title: "Technician Tracking", desc: "Hours per job per tech. Labor cost vs billed. See who generates margin." },
  { icon: "bell", title: "Customer Reminders", desc: "Oil change due, inspection needed. SMS and email. Keeps bays full." },
  { icon: "cart", title: "Supplier POs", desc: "Order parts, track delivery, auto-match to open work orders." },
  { icon: "trending", title: "Monthly Reports", desc: "Revenue by service type, avg ticket size, tech efficiency. Accountant-ready." },
];

const testimonials = [
  { q: "The parts inventory tracking alone recovered $800/month in parts we were using but not billing. That's almost $10k a year we were leaving on the table. I didn't know until I ran the first report.", name: "Sandra R.", role: "Shop Manager — SR Automotive, Nashville TN", init: "S", primary: true },
  { q: "Invoicing used to be the last thing we did at 9pm. Now it fires automatically when we mark a job complete. We get paid 2 days faster.", name: "Mike D.", role: "Owner — D&M Auto Repair, Phoenix AZ", init: "M", primary: false },
  { q: "4 bays, 6 techs. I can see every open WO, who's assigned, what's waiting on parts — from my phone. That visibility alone is worth it.", name: "Carlos T.", role: "Owner — Precision Auto Works, Miami FL", init: "C", primary: false },
];


const A_ICONS = {
  wrench: (s=22) => <Wrench size={s} />, car: (s=22) => <Car size={s} />,
  package: (s=22) => <Package size={s} />, receipt: (s=22) => <Receipt size={s} />,
  "credit-card": (s=22) => <CreditCard size={s} />, "bar-chart": (s=22) => <BarChart2 size={s} />,
  "user-check": (s=22) => <UserCheck size={s} />, bell: (s=22) => <Bell size={s} />,
  cart: (s=22) => <ShoppingCart size={s} />, trending: (s=22) => <TrendingUp size={s} />,
  cog: (s=22) => <Cog size={s} />, fuel: (s=22) => <Fuel size={s} />,
  settings: (s=22) => <Settings size={s} />,
};
const IconA = ({ name, size=22 }) => { const fn = A_ICONS[name]; return fn ? fn(size) : null; };

export default function AutoShopPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", shop: "", email: "", bays: "" });
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
      await fetch("https://formspree.io/f/xnpqyyev", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name, shop: form.shop, email: form.email,
          number_of_bays: form.bays, vertical: "Auto Shop",
        }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "https://irisfinancial.tech/auth/signup?vertical=autoshop&ref=landing";
    }, 2000);
  };

  const primary = testimonials.find(t => t.primary);
  const secondary = testimonials.filter(t => !t.primary);

  return (
    <div>
      {/* NAV */}
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

      {/* STAT BAR — replaces ticker */}
      <div className="stat-bar">
        {[
          { val: "4 WOs", lbl: "Ready for Pickup" },
          { val: "$3,240", lbl: "Revenue Today" },
          { val: "2", lbl: "Waiting on Parts" },
          { val: "42%", lbl: "Parts Margin" },
          { val: "8", lbl: "Open Work Orders" },
        ].map((s, i) => (
          <div className="sbar-item" key={i}>
            <div className="sbar-dot" />
            <span className="sbar-val">{s.val}</span>
            <span className="sbar-lbl">{s.lbl}</span>
          </div>
        ))}
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-scan" />
        <div className="hero-accent" />
        <div className="hero-layout">
          <div>
            <div className="hero-label">Built for Auto Repair Shops</div>
            <h1 className="hero-title">
              Run every<br />
              <span className="y">bay.</span><br />
              Bill every<br />
              job.
            </h1>
            <p className="hero-sub">Work orders, vehicle history, parts inventory, and auto-invoicing — one platform built specifically for auto repair shops. Know your numbers. Get paid faster.</p>
            <div className="hero-actions">
              <button className="btn-y" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="wo-card">
              <div className="wo-head">
                <span className="wo-head-title">Active Shop Dashboard</span>
                <span className="wo-badge open">4 Open WOs</span>
              </div>
              <div className="wo-vehicle">
                <div>
                  <div className="wo-car-name">WO-1042 — 2019 Ford F-150</div>
                  <div className="wo-car-sub">Transmission Service · Bay 2 · Tech: Marco</div>
                  <div className="wo-vin">VIN: 1FTEW1EP5KFA12345 · 87,420 mi</div>
                </div>
                <span className="wo-badge warn" style={{ marginLeft: "auto", flexShrink: 0 }}>In Progress</span>
              </div>
              <div className="wo-items">
                {[
                  { icon: "cog", name: "Transmission Fluid Flush", type: "Labor", price: "$180", isLabor: true },
                  { icon: "fuel", name: "Transmission Fluid 6qt", type: "Parts", price: "$94", isLabor: false },
                  { icon: "settings", name: "Filter Replacement", type: "Labor", price: "$65", isLabor: true },
                  { icon: "receipt", name: "Multi-Point Inspection", type: "Labor", price: "$0 — Complimentary", isLabor: true },
                ].map((item, i) => (
                  <div className="wo-item" key={i}>
                    <div className="wo-item-left">
                      <div className="wo-item-icon"><IconA name={item.icon} size={14} /></div>
                      <div>
                        <div className="wo-item-name">{item.name}</div>
                        <div className="wo-item-type">{item.type}</div>
                      </div>
                    </div>
                    <div className={`wo-item-price ${item.isLabor ? "" : "parts"}`}>{item.price}</div>
                  </div>
                ))}
              </div>
              <div className="wo-total">
                <span className="wo-total-lbl">Work Order Total</span>
                <span className="wo-total-val">$680.00</span>
              </div>
              <div className="wo-foot">
                <span style={{ color: "var(--green)" }}>✓</span>
                <span className="wo-foot-txt">Invoice auto-sends on job completion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN — REDESIGNED */}
      <section className="pain">
        <div className="pain-intro">
          <h2 className="pain-headline">
            Your shop loses money<br />
            on jobs it already <span className="y">completed.</span>
          </h2>
          <p className="pain-deck">
            Not from bad work. From bad tracking. A gasket pulled from the shelf that never hit the invoice. An invoice sent four days after the car left. A tech whose hours you can't reconcile at month end. It compounds.
          </p>
        </div>
        <div className="calc-strip">
          <div className="calc-inner">
            {[
              {
                scenario: "Parts not billed per month",
                loss: "$1,200",
                desc: "50 jobs/month. Average 1 unbilled part per job at $24. None of it malicious — just not tracked.",
                math: "50 jobs × $24 avg unbilled part = $1,200/mo",
              },
              {
                scenario: "Invoice delay cost",
                loss: "$480",
                desc: "Invoices sent 4 days late on avg. At net 30 terms, that's effectively net 34. On $50k/mo revenue that's real float.",
                math: "4-day delay × $50k monthly AR × 12% APR ÷ 365 = $657/mo in lost float",
              },
              {
                scenario: "Labor not tracked per tech",
                loss: "$340",
                desc: "1 tech. 8 hours billed per day. If 20 min/day goes unlogged across 3 techs — that's real labor you absorbed.",
                math: "3 techs × 20 min/day unlogged × $85/hr × 22 days = $935/mo",
              },
            ].map((c, i) => (
              <div className="calc-item" key={i}>
                <div className="calc-scenario">{c.scenario}</div>
                <div className="calc-loss">{c.loss}</div>
                <p className="calc-desc">{c.desc}</p>
                <div className="calc-math">{c.math}</div>
              </div>
            ))}
          </div>
          <div className="calc-total-strip">
            <div>
              <div className="calc-total-lbl">Conservative monthly loss — tracked shops recover most of this</div>
              <div className="calc-total-note">These are floor estimates. Real numbers are usually higher.</div>
            </div>
            <div className="calc-total-val">$2,020 / mo</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <div className="s-label">Core features</div>
          <h2 className="s-title">Built for the <span className="y">bay,</span><br />not the boardroom.</h2>
          <div className="features-layout">
            <div className="feat-list">
              {mainFeatures.map((f, i) => (
                <div className="feat-row" key={i}>
                  <div className="feat-icon"><IconA name={f.icon} /></div>
                  <div>
                    <div className="feat-h">{f.title}</div>
                    <p className="feat-p">{f.desc}</p>
                    <div className="feat-tag">{f.tag}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="dash">
              <div className="dash-top">
                <span className="dash-top-title">Shop Overview — Today</span>
                <div className="dash-live-wrap"><div className="dash-dot" /><span className="dash-live">Live</span></div>
              </div>
              <div className="dash-metrics">
                <div className="d-metric"><div className="d-lbl">Revenue Today</div><div className="d-val">$3,240</div><div className="d-delta">↑ 12% vs yesterday</div></div>
                <div className="d-metric"><div className="d-lbl">Open WOs</div><div className="d-val w">8</div><div className="d-delta" style={{ color: "var(--muted)" }}>4 bays active</div></div>
                <div className="d-metric"><div className="d-lbl">Parts Margin</div><div className="d-val g">42%</div><div className="d-delta">Target: 40%</div></div>
              </div>
              <div className="dash-rows">
                {workOrders.map((wo, i) => (
                  <div className="d-row" key={i}>
                    <div className="d-row-left">
                      <span className="d-wo">{wo.num}</span>
                      <div><div className="d-car">{wo.car}</div><div className="d-svc">{wo.service}</div></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="d-price">{wo.price}</div>
                      <div className={`d-status ${wo.status}`}>{wo.statusLabel}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dash-foot">
                <span className="dash-foot-lbl">Today's Collected</span>
                <span className="dash-foot-val">$2,890</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE RAIL */}
      <section className="rail-section">
        <div className="rail-header">
          <div className="s-label">Everything else</div>
          <h2 className="s-title">One platform.<br /><span className="y">Zero juggling.</span></h2>
        </div>
        <div className="rail-scroll">
          {railFeatures.map((f, i) => (
            <div className="rail-card" key={i}>
              <span className="rail-card-icon"><IconA name={f.icon} /></span>
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
          <h2 className="s-title">Iris Financial vs.<br /><span className="y">Mitchell 1 + QuickBooks</span></h2>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch f">Feature</div>
              <div className="ch i">Iris Financial <span className="ibadge">Best</span></div>
              <div className="ch o">Mitchell 1 + QB</div>
            </div>
            {[
              ["Work Order Management", "✓ Built-in", "✓ Mitchell 1 (separate sub)"],
              ["Vehicle History", "✓ Built-in", "✓ Mitchell 1 (separate sub)"],
              ["Auto Invoicing from WO", "✓ 1-click", "✗ Manual transfer required"],
              ["Parts Inventory", "✓ Built-in", "✗ Add-on or manual"],
              ["Real-time P&L", "✓ Live dashboard", "✗ QB month-end only"],
              ["Technician Hour Tracking", "✓ Built-in", "✗ Separate tool needed"],
              ["Customer Auto-Reminders", "✓ SMS + Email", "✗ Extra integration"],
              ["Mobile Money / Global Pay", "✓ Iris Pay + PawaPay", "✗ US-only"],
            ].map(([feat, iris, other], i) => (
              <div className="comp-row" key={i}>
                <div className="cc f">{feat}</div>
                <div className="cc i"><span className={iris.startsWith("✓") ? "ck" : "cx"}>{iris.startsWith("✓") ? "✓" : "✗"}</span>{iris.replace("✓ ", "").replace("✗ ", "")}</div>
                <div className="cc o"><span className={other.startsWith("✓") ? "ck" : "cx"}>{other.startsWith("✓") ? "✓" : "✗"}</span>{other.replace("✓ ", "").replace("✗ ", "")}</div>
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

      {/* TESTIMONIALS — MAGAZINE */}
      <section className="testimonials">
        <div className="testi-inner">
          <div className="s-label">From the shop floor</div>
          <h2 className="s-title" style={{ marginBottom: 0 }}>What shop owners say</h2>
          <div className="testi-layout">
            <div className="testi-primary">
              <div>
                <div className="testi-primary-q">"</div>
                <p className="testi-primary-text">{primary.q}</p>
              </div>
              <div className="testi-primary-author">
                <div className="testi-primary-av">{primary.init}</div>
                <div>
                  <div className="testi-primary-name">{primary.name}</div>
                  <div className="testi-primary-role">{primary.role}</div>
                </div>
              </div>
            </div>
            <div className="testi-secondary-stack">
              {secondary.map((t, i) => (
                <div className="testi-secondary" key={i}>
                  <p className="testi-secondary-text">"{t.q}"</p>
                  <div className="testi-secondary-author">
                    <div className="testi-secondary-av">{t.init}</div>
                    <div>
                      <div className="testi-secondary-name">{t.name}</div>
                      <div className="testi-secondary-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING — BRUTALIST SPLIT */}
      <section className="pricing">
        <div className="pricing-layout">
          <div className="pricing-left">
            <div className="s-label">Simple pricing</div>
            <h2 className="s-title">Start free.<br /><span className="y">Scale when ready.</span></h2>
            <p>Everything a single-location shop needs — work orders, parts tracking, invoicing, payments, P&L — on the free tier. No trial expiry. No credit card.</p>
            <div className="pricing-amount-row">
              <div className="pricing-amount"><sup>$</sup>0</div>
            </div>
            <div className="pricing-cadence">per month · Starter plan · forever free</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) unlocks unlimited transactions, invoices, users, and advanced features.</div>
          </div>
          <div className="pricing-right">
            <div className="s-label" style={{ marginBottom: 28 }}>What's included</div>
            {[
              "Unlimited work orders & vehicle history",
              "Parts inventory tracking with reorder alerts",
              "Service-to-invoice automation (1-click)",
              "Technician assignment & hour tracking",
              "Iris Pay — card & mobile payment at counter",
              "Customer SMS/email service reminders",
              "Real-time shop P&L dashboard",
              "Supplier management & parts purchase orders",
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
          <h2 className="cta-title">Stop losing margin.<br />Start running a tighter shop.</h2>
          <p className="cta-sub">Every untracked part, every delayed invoice, every job without a work order is money leaving your shop. Iris Financial closes those gaps — free to start, 15 minutes to set up.</p>
          <div className="cta-btns">
            <button className="cta-btn-dark" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="cta-btn-outline">Schedule a Demo</button>
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
                <div className="modal-s">Set up your shop in 15 minutes. First work order ships same day.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Owner / Manager name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Shop Name</label><input className="f-input" placeholder="e.g. Precision Auto Works" value={form.shop} onChange={e => setForm({ ...form, shop: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="you@yourshop.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Number of Bays</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.bays} onChange={e => setForm({ ...form, bays: e.target.value })}>
                    <option value="">Select bay count</option>
                    <option>1–2 bays</option>
                    <option>3–5 bays</option>
                    <option>6–10 bays</option>
                    <option>10+ bays / Multi-location</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <span className="success-emoji"><Wrench size={48} color="var(--yellow)" /></span>
                <div className="success-h">Shop's open!</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--yellow)" }}>{form.email}</strong>. You'll be tracking work orders before end of day.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
