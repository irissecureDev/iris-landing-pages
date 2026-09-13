import { useState, useEffect } from "react";
import { Car, LayoutDashboard, Package, Receipt, FileText, BarChart2, CreditCard, Bell, Users, TrendingUp, Globe, Wrench, Clock } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --midnight: #080C14;
    --carbon: #10151F;
    --panel: #161C28;
    --rail: #1E2535;
    --border: rgba(255,255,255,0.07);
    --border-hot: rgba(220,38,38,0.4);
    --red: #DC2626;
    --red-hot: #EF4444;
    --red-glow: rgba(220,38,38,0.15);
    --silver: #C8D0DC;
    --silver-bright: #E8EDF5;
    --chrome: #8892A0;
    --muted: #4A5568;
    --white: #F0F4FA;
    --green-go: #16A34A;
    --amber-warn: #D97706;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; background: var(--midnight); color: var(--white); overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes pulse-red {
    0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
    50% { box-shadow: 0 0 0 10px rgba(220,38,38,0); }
  }
  @keyframes odometer {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes scanH {
    0% { top: 0; opacity: 0.6; }
    100% { top: 100%; opacity: 0; }
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 62px; padding: 0 48px;
    background: rgba(8,12,20,0.96);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; gap: 10px; }
  .nav-mark {
    width: 34px; height: 34px; border-radius: 6px;
    background: var(--red);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Rajdhani', sans-serif; font-weight: 700; color: white; font-size: 16px;
    box-shadow: 0 4px 16px rgba(220,38,38,0.4);
  }
  .nav-name {
    font-family: 'Rajdhani', sans-serif; font-weight: 700;
    font-size: 19px; color: var(--white); letter-spacing: 0.04em;
  }
  .nav-name span { color: var(--red-hot); }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk {
    font-size: 13px; font-weight: 500; color: var(--chrome);
    cursor: pointer; transition: color 0.2s; letter-spacing: 0.04em;
  }
  .nav-lnk:hover { color: var(--white); }
  .nav-cta {
    background: var(--red); color: white;
    padding: 9px 22px; border: none; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700;
    font-size: 14px; letter-spacing: 0.08em;
    border-radius: 4px; transition: all 0.2s;
  }
  .nav-cta:hover { background: var(--red-hot); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(220,38,38,0.4); }

  /* ── MARQUEE ── */
  .marquee {
    position: fixed; top: 62px; left: 0; right: 0; z-index: 199;
    height: 30px; background: var(--red);
    display: flex; align-items: center; overflow: hidden;
  }
  .marquee-inner { display: flex; animation: ticker 26s linear infinite; white-space: nowrap; }
  .marquee-item {
    padding: 0 24px; font-family: 'Rajdhani', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
    color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 12px;
  }
  .marquee-sep { opacity: 0.4; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background: var(--midnight);
    padding: 122px 48px 80px;
    position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .hero-scan {
    position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent);
    animation: scanH 7s linear infinite;
    pointer-events: none;
  }
  .hero-glow-r {
    position: absolute; right: -200px; top: 50%; transform: translateY(-50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 24px;
    animation: fadeUp 0.5s ease both;
  }
  .eyebrow-line { width: 28px; height: 2px; background: var(--red); }
  .eyebrow-txt {
    font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.12em; color: var(--red-hot);
  }
  .hero-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(52px, 6vw, 82px);
    font-weight: 700; line-height: 0.95;
    color: var(--white); margin-bottom: 24px;
    letter-spacing: 0.01em;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title .red { color: var(--red-hot); }
  .hero-title .silver { color: var(--silver); }
  .hero-sub {
    font-size: 16px; color: var(--chrome); line-height: 1.75;
    font-weight: 400; max-width: 480px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions {
    display: flex; gap: 14px; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-red {
    background: var(--red); color: white;
    padding: 15px 36px; border: none; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700;
    font-size: 15px; letter-spacing: 0.08em;
    border-radius: 4px; transition: all 0.25s;
    animation: pulse-red 2.5s infinite;
  }
  .btn-red:hover { background: var(--red-hot); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(220,38,38,0.45); }
  .btn-ghost {
    background: transparent; color: var(--silver);
    padding: 13px 32px; border: 1px solid var(--border);
    cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 600;
    font-size: 15px; letter-spacing: 0.06em; border-radius: 4px; transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--silver); color: var(--white); }
  .hero-metrics {
    display: flex; gap: 40px; margin-top: 52px; padding-top: 40px;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .metric-val {
    font-family: 'Rajdhani', sans-serif; font-size: 36px;
    font-weight: 700; color: var(--red-hot); line-height: 1;
  }
  .metric-lbl { font-size: 12px; color: var(--muted); margin-top: 4px; letter-spacing: 0.04em; }

  /* ── HERO RIGHT: VEHICLE PROFIT CARD ── */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .vp-card {
    background: var(--carbon); border: 1px solid var(--border);
    border-top: 2px solid var(--red); border-radius: 6px;
    overflow: hidden; box-shadow: 0 32px 64px rgba(0,0,0,0.7);
    font-family: 'Outfit', sans-serif;
  }
  .vp-head {
    background: var(--panel); padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .vp-head-title {
    font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.08em; color: var(--chrome);
  }
  .vp-live { display: flex; align-items: center; gap: 6px; }
  .vp-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-go); animation: pulse-red 2s infinite; }
  .vp-live-txt { font-size: 11px; color: var(--green-go); font-weight: 600; letter-spacing: 0.06em; }
  .vp-vehicle {
    padding: 16px 20px; background: rgba(220,38,38,0.04);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 14px;
  }
  .vp-car-emoji { font-size: 32px; }
  .vp-car-name { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; color: var(--white); letter-spacing: 0.02em; }
  .vp-car-sub { font-size: 12px; color: var(--chrome); margin-top: 2px; letter-spacing: 0.06em; }
  .vp-rows { padding: 0 20px; }
  .vp-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .vp-row:last-child { border-bottom: none; }
  .vp-row-lbl { font-size: 13px; color: var(--chrome); display: flex; align-items: center; gap: 8px; }
  .vp-row-lbl .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); flex-shrink: 0; }
  .vp-row-val { font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 600; color: var(--silver); }
  .vp-row-val.red { color: var(--red-hot); }
  .vp-row-val.green { color: var(--green-go); }
  .vp-total {
    background: var(--panel); padding: 14px 20px;
    border-top: 2px solid var(--red);
    display: flex; align-items: center; justify-content: space-between;
  }
  .vp-total-lbl { font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; color: var(--chrome); }
  .vp-total-val { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; color: var(--green-go); }
  .vp-tabs { display: flex; border-bottom: 1px solid var(--border); }
  .vp-tab {
    flex: 1; padding: 11px; text-align: center;
    font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s;
    color: var(--muted); border-bottom: 2px solid transparent;
  }
  .vp-tab.active { color: var(--red-hot); border-bottom-color: var(--red); }
  .vp-inventory-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 20px; border-bottom: 1px solid rgba(255,255,255,0.03);
    transition: background 0.15s;
  }
  .vp-inventory-row:hover { background: rgba(255,255,255,0.02); }
  .vi-left { display: flex; align-items: center; gap: 10px; }
  .vi-num {
    font-family: 'Rajdhani', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--muted); background: var(--rail); padding: 2px 6px; border-radius: 2px;
    letter-spacing: 0.06em;
  }
  .vi-car { font-size: 13px; font-weight: 600; color: var(--silver); }
  .vi-days { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .vi-margin { font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; }
  .vi-margin.good { color: var(--green-go); }
  .vi-margin.warn { color: var(--amber-warn); }
  .vi-margin.hot { color: var(--red-hot); }

  /* ── PAIN ── */
  .pain { background: var(--carbon); padding: 100px 48px; border-top: 1px solid var(--border); }
  .pain-inner { max-width: 1100px; margin: 0 auto; }
  .s-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .s-eyebrow-line { width: 20px; height: 2px; background: var(--red); }
  .s-eyebrow-txt { font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; color: var(--red-hot); }
  .s-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(36px, 4vw, 54px); font-weight: 700;
    line-height: 1.0; color: var(--white); margin-bottom: 16px; letter-spacing: 0.02em;
  }
  .s-title .red { color: var(--red-hot); }
  .s-body { font-size: 16px; color: var(--chrome); line-height: 1.75; max-width: 560px; font-weight: 300; }
  .pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 56px; }
  .pain-card {
    background: var(--panel); padding: 36px 28px;
    border: 1px solid var(--border); transition: all 0.3s; cursor: default;
    position: relative; overflow: hidden;
  }
  .pain-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: var(--red); transform: scaleY(0); transition: transform 0.3s; transform-origin: bottom;
  }
  .pain-card:hover::before { transform: scaleY(1); }
  .pain-card:hover { background: rgba(220,38,38,0.04); border-color: var(--border-hot); }
  .pain-emoji { font-size: 32px; margin-bottom: 16px; display: block; }
  .pain-card h3 {
    font-family: 'Rajdhani', sans-serif; font-size: 21px; font-weight: 700;
    letter-spacing: 0.03em; color: var(--white); margin-bottom: 12px;
  }
  .pain-card p { font-size: 14px; color: var(--chrome); line-height: 1.7; }
  .pain-tag {
    display: inline-block; margin-top: 14px;
    background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.25);
    color: var(--red-hot); padding: 3px 10px; border-radius: 3px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    font-family: 'Rajdhani', sans-serif;
  }
  .pain-callout {
    background: var(--red); padding: 20px 32px; margin-top: 40px;
    display: flex; align-items: center; gap: 16px; border-radius: 4px;
  }
  .pain-callout p {
    font-family: 'Rajdhani', sans-serif; font-size: 17px; font-weight: 600;
    color: white; letter-spacing: 0.02em;
  }
  .pain-callout strong { font-size: 20px; }

  /* ── FEATURES ── */
  .features { background: var(--midnight); padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .features-layout {
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    align-items: start; margin-top: 60px;
  }
  .feat-list { display: grid; gap: 4px; }
  .feat-row {
    display: flex; gap: 16px; padding: 20px 22px;
    background: var(--carbon); border: 1px solid var(--border);
    transition: all 0.25s; cursor: default;
    border-radius: 4px;
  }
  .feat-row:hover { background: var(--panel); border-left: 3px solid var(--red); padding-left: 20px; }
  .feat-icon-box {
    width: 42px; height: 42px; border-radius: 6px; flex-shrink: 0;
    background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .feat-text h4 {
    font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700;
    letter-spacing: 0.04em; color: var(--white); margin-bottom: 6px;
  }
  .feat-text p { font-size: 13px; color: var(--chrome); line-height: 1.65; }
  .feat-badge {
    display: inline-block; margin-top: 8px;
    background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.2);
    color: var(--red-hot); padding: 2px 8px; border-radius: 3px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
    font-family: 'Rajdhani', sans-serif;
  }

  /* INVENTORY MOCKUP */
  .inv-mockup {
    background: var(--carbon); border: 1px solid var(--border);
    border-top: 2px solid var(--red); border-radius: 6px; overflow: hidden;
    box-shadow: 0 24px 56px rgba(0,0,0,0.6);
  }
  .inv-top {
    background: var(--panel); padding: 12px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .inv-top-title {
    font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.08em; color: var(--chrome);
  }
  .inv-metrics { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--border); }
  .inv-metric {
    padding: 14px 16px; border-right: 1px solid var(--border);
    transition: background 0.2s;
  }
  .inv-metric:last-child { border-right: none; }
  .inv-metric:hover { background: rgba(255,255,255,0.02); }
  .inv-m-lbl { font-size: 10px; color: var(--muted); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 5px; }
  .inv-m-val {
    font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700; color: var(--red-hot);
  }
  .inv-m-val.white { color: var(--white); }
  .inv-m-val.green { color: var(--green-go); }
  .inv-m-delta { font-size: 11px; color: var(--green-go); margin-top: 2px; }
  .inv-list { padding: 0 4px; }
  .inv-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 16px; border-bottom: 1px solid rgba(255,255,255,0.03);
    border-radius: 3px; transition: background 0.15s;
  }
  .inv-item:hover { background: rgba(255,255,255,0.02); }
  .inv-item-left { display: flex; align-items: center; gap: 10px; }
  .inv-stock {
    font-family: 'Rajdhani', sans-serif; font-size: 10px; font-weight: 700;
    background: var(--rail); color: var(--muted); padding: 2px 6px; border-radius: 2px; letter-spacing: 0.06em;
  }
  .inv-car-name { font-size: 13px; font-weight: 600; color: var(--silver); }
  .inv-car-sub { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .inv-right { text-align: right; }
  .inv-profit { font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 700; color: var(--green-go); }
  .inv-status {
    font-size: 10px; font-weight: 700; letter-spacing: 0.06em; margin-top: 3px;
    font-family: 'Rajdhani', sans-serif;
  }
  .inv-status.available { color: var(--green-go); }
  .inv-status.pending { color: var(--amber-warn); }
  .inv-status.sold { color: var(--chrome); }
  .inv-footer {
    background: var(--panel); padding: 12px 20px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .inv-f-lbl { font-size: 12px; color: var(--muted); font-weight: 600; letter-spacing: 0.06em; font-family: 'Rajdhani', sans-serif; }
  .inv-f-val { font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; color: var(--green-go); }

  /* ── MORE FEATURES ── */
  .more-feat { background: var(--carbon); padding: 80px 48px; border-top: 1px solid var(--border); }
  .more-feat-inner { max-width: 1100px; margin: 0 auto; }
  .more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 52px; }
  .more-card {
    background: var(--panel); border: 1px solid var(--border);
    padding: 30px 26px; transition: all 0.25s; cursor: default;
    border-radius: 4px;
  }
  .more-card:hover { background: rgba(220,38,38,0.04); border-color: var(--border-hot); transform: translateY(-3px); }
  .more-card-emoji { font-size: 26px; margin-bottom: 12px; display: block; }
  .more-card h3 {
    font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700;
    letter-spacing: 0.04em; color: var(--white); margin-bottom: 8px;
  }
  .more-card p { font-size: 13px; color: var(--chrome); line-height: 1.65; }

  /* ── COMPARISON ── */
  .comparison { background: var(--midnight); padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 900px; margin: 0 auto; }
  .comp-wrap {
    background: var(--carbon); border: 1px solid var(--border);
    border-top: 2px solid var(--red); border-radius: 6px; overflow: hidden;
    margin-top: 52px; box-shadow: 0 24px 56px rgba(0,0,0,0.5);
  }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--panel); }
  .ch { padding: 18px 22px; }
  .ch.feat { font-size: 11px; color: var(--muted); font-weight: 600; letter-spacing: 0.08em; }
  .ch.iris {
    font-family: 'Rajdhani', sans-serif; font-size: 17px; font-weight: 700;
    letter-spacing: 0.04em; color: var(--red-hot);
    display: flex; align-items: center; gap: 8px;
  }
  .ch.other {
    font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 600;
    letter-spacing: 0.04em; color: var(--muted);
  }
  .iris-pill {
    background: var(--red); color: white; font-size: 9px;
    font-family: 'Outfit', sans-serif; font-weight: 700; letter-spacing: 0.08em;
    padding: 2px 7px; border-radius: 2px;
  }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: rgba(255,255,255,0.015); }
  .cc { padding: 14px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.feat-c { color: var(--silver); font-weight: 500; }
  .cc.iris-c { color: var(--chrome); font-weight: 500; }
  .cc.other-c { color: var(--muted); }
  .ck { color: var(--green-go); font-size: 16px; font-weight: 700; }
  .cx { color: var(--red-hot); font-size: 16px; font-weight: 700; }
  .price-row-c { background: rgba(220,38,38,0.04); border-top: 2px solid rgba(220,38,38,0.2) !important; }
  .big-iris { font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700; color: var(--red-hot) !important; }
  .big-other { font-family: 'Rajdhani', sans-serif; font-size: 24px; font-weight: 700; color: var(--muted) !important; }

  /* ── TESTIMONIALS ── */
  .testimonials { background: var(--carbon); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testimonials-inner { max-width: 1100px; margin: 0 auto; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 56px; }
  .testi-card {
    background: var(--panel); border: 1px solid var(--border);
    padding: 32px 26px; transition: all 0.3s; border-radius: 4px;
  }
  .testi-card:hover { border-top: 2px solid var(--red); margin-top: -1px; }
  .testi-stars { color: var(--red-hot); font-size: 14px; letter-spacing: 2px; margin-bottom: 12px; }
  .testi-q {
    font-family: 'Rajdhani', sans-serif; font-size: 44px;
    font-weight: 700; color: var(--red); opacity: 0.3; line-height: 1; margin-bottom: 4px;
  }
  .testi-text { font-size: 14px; color: var(--chrome); line-height: 1.75; margin-bottom: 22px; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-av {
    width: 42px; height: 42px; border-radius: 4px; flex-shrink: 0;
    background: var(--red); color: white;
    font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  .testi-name { font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; color: var(--white); }
  .testi-role { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* ── PRICING ── */
  .pricing { background: var(--midnight); padding: 100px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 740px; margin: 0 auto; text-align: center; }
  .pricing-card {
    background: var(--carbon); border: 1px solid var(--border);
    border-top: 3px solid var(--red); border-radius: 6px;
    padding: 52px; margin-top: 52px; position: relative; overflow: hidden;
    box-shadow: 0 32px 64px rgba(0,0,0,0.5);
  }
  .pricing-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--red), #FF6B6B, var(--red));
    background-size: 200%; animation: shimmer 3s linear infinite;
  }
  .p-pill {
    display: inline-block; background: var(--red); color: white;
    font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; padding: 5px 18px; border-radius: 3px; margin-bottom: 18px;
    box-shadow: 0 4px 16px rgba(220,38,38,0.4);
  }
  .p-name {
    font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700;
    letter-spacing: 0.04em; color: var(--white); margin-bottom: 8px;
  }
  .p-price { font-family: 'Rajdhani', sans-serif; font-size: 88px; font-weight: 700; color: var(--red-hot); line-height: 1; margin: 16px 0 4px; }
  .p-price sup { font-size: 36px; vertical-align: top; margin-top: 18px; }
  .p-per { font-size: 15px; color: var(--muted); margin-bottom: 36px; }
  .p-feats { text-align: left; margin: 28px 0; }
  .p-feat {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid var(--border);
    font-size: 15px; color: var(--chrome);
  }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-go); font-size: 16px; font-weight: 700; }
  .p-cta {
    width: 100%; background: var(--red); color: white;
    padding: 17px; border: none; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700;
    font-size: 17px; letter-spacing: 0.1em; border-radius: 4px; transition: all 0.25s;
  }
  .p-cta:hover { background: var(--red-hot); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(220,38,38,0.45); }
  .p-note { font-size: 13px; color: var(--muted); margin-top: 14px; }

  /* ── CTA ── */
  .cta-section {
    background: var(--red); padding: 90px 48px; text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: ''; position: absolute; inset: 0;
    background-image: linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .cta-inner { position: relative; z-index: 2; max-width: 660px; margin: 0 auto; }
  .cta-emoji { font-size: 56px; display: block; margin-bottom: 20px; }
  .cta-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(38px, 5.5vw, 64px); font-weight: 700;
    color: white; line-height: 1.0; margin-bottom: 18px; letter-spacing: 0.02em;
  }
  .cta-sub { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-dark {
    background: var(--midnight); color: var(--red-hot);
    padding: 17px 48px; border: none; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700;
    font-size: 16px; letter-spacing: 0.08em; border-radius: 4px; transition: all 0.25s;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .cta-btn-dark:hover { background: var(--carbon); transform: translateY(-2px); }
  .cta-btn-outline {
    background: transparent; color: white;
    padding: 15px 44px; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700;
    font-size: 16px; letter-spacing: 0.08em;
    border: 2px solid rgba(255,255,255,0.4); border-radius: 4px; transition: all 0.25s;
  }
  .cta-btn-outline:hover { border-color: white; }

  /* ── FOOTER ── */
  .footer {
    background: var(--midnight); padding: 32px 48px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
    border-top: 1px solid var(--border);
  }
  .footer-copy { font-size: 13px; color: var(--muted); }
  .footer-copy strong { color: var(--red-hot); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk {
    font-size: 12px; color: var(--muted); cursor: pointer; transition: color 0.2s;
    font-family: 'Rajdhani', sans-serif; font-weight: 600; letter-spacing: 0.06em;
  }
  .f-lnk:hover { color: var(--red-hot); }

  /* ── MODAL ── */
  .modal-ov {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.88); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .modal-box {
    background: var(--carbon); border: 1px solid var(--border);
    border-top: 3px solid var(--red); border-radius: 6px;
    padding: 48px; max-width: 480px; width: 100%;
    position: relative; animation: scaleIn 0.3s ease;
    box-shadow: 0 40px 80px rgba(0,0,0,0.8);
  }
  .modal-x {
    position: absolute; top: 16px; right: 16px;
    background: var(--panel); border: 1px solid var(--border);
    color: var(--chrome); width: 32px; height: 32px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; transition: all 0.2s;
  }
  .modal-x:hover { border-color: var(--red); color: var(--red-hot); }
  .modal-h {
    font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700;
    letter-spacing: 0.04em; color: var(--white); margin-bottom: 6px;
  }
  .modal-s { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 18px; }
  .f-label {
    font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.1em; color: var(--red-hot); margin-bottom: 6px; display: block;
  }
  .f-input {
    width: 100%; padding: 12px 16px;
    background: var(--panel); border: 1px solid var(--border);
    font-size: 14px; font-family: 'Outfit', sans-serif; color: var(--white);
    outline: none; transition: border-color 0.2s; border-radius: 4px;
  }
  .f-input::placeholder { color: var(--muted); }
  .f-input:focus { border-color: var(--red); }
  .f-btn {
    width: 100%; background: var(--red); color: white;
    padding: 15px; border: none; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700;
    font-size: 16px; letter-spacing: 0.08em; border-radius: 4px;
    margin-top: 8px; transition: all 0.25s;
  }
  .f-btn:hover { background: var(--red-hot); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-emoji { font-size: 52px; display: block; margin-bottom: 16px; }
  .success-h {
    font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700;
    letter-spacing: 0.04em; color: var(--white); margin-bottom: 10px;
  }
  .success-p { color: var(--chrome); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero { padding: 112px 20px 64px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-metrics { flex-wrap: wrap; gap: 24px; }
    .pain-grid, .more-grid, .testi-grid { grid-template-columns: 1fr; }
    .features-layout { grid-template-columns: 1fr; }
    .pain, .features, .more-feat, .comparison, .testimonials, .pricing, .cta-section { padding: 70px 20px; }
    .comp-head, .comp-row { grid-template-columns: 1.2fr 1fr 1fr; }
    .cc, .ch { padding: 12px 14px; font-size: 12px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
    .pricing-card, .modal-box { padding: 36px 24px; }
  }
`;

const inventory = [
  { stock: "S-4401", car: "2021 BMW 5 Series", sub: "M Sport · 28,400 mi", profit: "+$4,200", status: "available", statusLbl: "Available" },
  { stock: "S-4400", car: "2020 Toyota Camry XSE", sub: "V6 · 41,200 mi", profit: "+$2,800", status: "pending", statusLbl: "Pending Sale" },
  { stock: "S-4399", car: "2022 Ford F-150 XLT", sub: "4x4 · 19,800 mi", profit: "+$5,100", status: "available", statusLbl: "Available" },
  { stock: "S-4398", car: "2019 Honda CR-V EX", sub: "AWD · 52,000 mi", profit: "+$1,900", status: "sold", statusLbl: "Sold" },
];

const mainFeatures = [
  { icon: "car", title: "Profit Per Vehicle Tracking", desc: "Buy price, reconditioning costs, transport, fees — every cost tracked per unit. Know your real margin before you price it.", badge: "Dealer-Specific" },
  { icon: "dashboard", title: "Inventory Management", desc: "Every vehicle on your lot with stock number, days on lot, asking price, and margin — visible in one dashboard.", badge: "Real-Time" },
  { icon: "receipt", title: "Sales Rep Commission Tracking", desc: "Set commission structures per rep, per deal type. Commissions calculate automatically when a deal closes.", badge: "Saves Hours" },
  { icon: "file-text", title: "Deal Jackets & Auto-Invoicing", desc: "Generate professional buyer's orders and invoices directly from closed deals. Customers receive them instantly.", badge: "1-Click" },
];

const moreFeatures = [
  { emoji: "bar-chart", title: "Floor Plan Tracking", desc: "Track vehicles financed through floor plan lenders. See interest accruing per unit — know when to move a car." },
  { emoji: "credit-card", title: "Iris Pay", desc: "Accept deposits, down payments, and full purchase amounts via card or mobile money. Funds hit your account fast." },
  { emoji: "📈", title: "Monthly Gross Report", desc: "Total front-end gross, back-end gross, and net profit per month — exactly what your accountant and lender need." },
  { emoji: "🔧", title: "Reconditioning Cost Log", desc: "Log every detail fee, mechanical repair, and cosmetic fix per vehicle. Stop guessing what the lot really costs you." },
  { emoji: "📋", title: "Buyer's Order Generation", desc: "Professional buyer's orders with all fees, taxes, and deal terms populated automatically from your deal data." },
  { emoji: "globe", title: "Multi-Location Support", desc: "Running more than one lot? Consolidated reporting across all locations with per-location breakdowns." },
];

const testimonials = [
  { q: "I had no idea my reconditioning costs were eating 40% of my front-end gross on older units. Iris Financial showed me that in the first week. I repriced 8 cars and made $11,000 more that month.", name: "Marcus D.", role: "Owner — D&M Auto Sales, Dallas TX", init: "M" },
  { q: "Tracking commissions used to be a spreadsheet nightmare. Now every deal closes and my reps can see their commission instantly. No more disputes, no more manual calculations on Saturday mornings.", name: "Jennifer R.", role: "GM — Riverside Motors, Atlanta GA", init: "J" },
  { q: "The days-on-lot feature alone changed how I buy. I can see exactly which cars are sitting past 45 days and adjust pricing before they kill my floor plan interest. Game changer.", name: "Tony N.", role: "Owner — TN Auto Group, Houston TX", init: "T" },
];


const D_ICONS = {
  car: <Car size={22} />, dashboard: <LayoutDashboard size={22} />,
  receipt: <Receipt size={22} />, "file-text": <FileText size={22} />,
  "bar-chart": <BarChart2 size={22} />, "credit-card": <CreditCard size={22} />,
  users: <Users size={22} />, bell: <Bell size={22} />,
  trending: <TrendingUp size={22} />, globe: <Globe size={22} />,
  wrench: <Wrench size={22} />, clock: <Clock size={22} />,
};
const IconD = ({ name }) => D_ICONS[name] || null;

export default function CarDealerPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", dealership: "", email: "", size: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      await fetch("https://formspree.io/f/mdeovrbe", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          dealership: form.dealership,
          email: form.email,
          lot_size: form.size,
          vertical: "Car Dealer",
        }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "https://irisfinancial.tech/auth/signup?vertical=cardealer&ref=landing";
    }, 2000);
  };

  const marqueeItems = [
    "Profit Per Unit", "", "Inventory Dashboard", "🔑", "Commission Tracking",
    "", "Deal Jackets", "", "Floor Plan Alerts", "", "Reconditioning Costs",
    "", "Days on Lot", "", "Monthly Gross Report",
  ];

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

      <div className="marquee">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">{item} <span className="marquee-sep">|</span></span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-scan" />
        <div className="hero-glow-r" />
        <div className="hero-layout">
          <div>
            <div className="hero-eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-txt">Built for Auto Dealers</span>
            </div>
            <h1 className="hero-title">
              Know your<br />
              <span className="red">profit</span><br />
              on every<br />
              <span className="silver">deal.</span>
            </h1>
            <p className="hero-sub">
              Profit per vehicle, inventory tracking, commission management, and floor plan alerts — one platform built for independent and franchise auto dealers. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-red" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
            <div className="hero-metrics">
              <div><div className="metric-val">$0</div><div className="metric-lbl">to get started</div></div>
              <div><div className="metric-val">~$4,800</div><div className="metric-lbl">avg recovered margin/mo</div></div>
              <div><div className="metric-val">1 platform</div><div className="metric-lbl">replaces 4+ tools</div></div>
            </div>
          </div>

          {/* VEHICLE PROFIT CARD */}
          <div className="hero-right">
            <div className="vp-card">
              <div className="vp-head">
                <span className="vp-head-title">Vehicle Profit Breakdown</span>
                <div className="vp-live"><div className="vp-dot" /><span className="vp-live-txt">Live</span></div>
              </div>
              <div className="vp-tabs">
                {["inventory", "deal"].map(t => (
                  <div key={t} className={`vp-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                    {t === "inventory" ? "Lot Overview" : "Deal Detail"}
                  </div>
                ))}
              </div>
              {activeTab === "inventory" ? (
                <>
                  {inventory.slice(0, 3).map((v, i) => (
                    <div className="vp-inventory-row" key={i}>
                      <div className="vi-left">
                        <span className="vi-num">{v.stock}</span>
                        <div>
                          <div className="vi-car">{v.car}</div>
                          <div className="vi-days">{v.sub}</div>
                        </div>
                      </div>
                      <span className={`vi-margin ${v.status === "available" ? "good" : v.status === "pending" ? "warn" : "hot"}`}>{v.profit}</span>
                    </div>
                  ))}
                  <div className="vp-total">
                    <span className="vp-total-lbl">Month-to-Date Gross</span>
                    <span className="vp-total-val">+$38,400</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="vp-vehicle">
                    <span className="vp-car-emoji">🚗</span>
                    <div>
                      <div className="vp-car-name">2021 BMW 5 Series M Sport</div>
                      <div className="vp-car-sub">Stock #S-4401 · 28,400 mi · Acquired 14 days ago</div>
                    </div>
                  </div>
                  <div className="vp-rows">
                    {[
                      { lbl: "Purchase Price", val: "$28,500", cls: "" },
                      { lbl: "Reconditioning", val: "$1,200", cls: "red" },
                      { lbl: "Transport / Fees", val: "$380", cls: "red" },
                      { lbl: "Total Cost In", val: "$30,080", cls: "" },
                      { lbl: "Asking Price", val: "$34,900", cls: "" },
                    ].map((r, i) => (
                      <div className="vp-row" key={i}>
                        <div className="vp-row-lbl"><div className="dot" />{r.lbl}</div>
                        <div className={`vp-row-val ${r.cls}`}>{r.val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="vp-total">
                    <span className="vp-total-lbl">Front-End Gross</span>
                    <span className="vp-total-val">+$4,820</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-inner">
          <div className="s-eyebrow"><div className="s-eyebrow-line" /><span className="s-eyebrow-txt">The real problem</span></div>
          <h2 className="s-title">Most dealers don't know their<br /><span className="red">real margin</span> until it's too late.</h2>
          <p className="s-body">You know what you sold the car for. You rarely know what it actually cost you by the time it left the lot.</p>
          <div className="pain-grid">
            {[
              { emoji: "🔩", title: "Hidden reconditioning costs", body: "The mechanic bill, the detail, the new tires — tracked in your head or on a napkin. By the time you add it up, your $3,000 gross became $800.", tag: "Most expensive blind spot" },
              { emoji: "📅", title: "Cars sitting past 45 days", body: "Every day a car sits on floor plan financing, interest eats your margin. Without days-on-lot alerts, slow movers quietly drain profit.", tag: "Floor plan killer" },
              { emoji: "🧮", title: "Commission disputes every month", body: "Sales reps track their own deals in their own spreadsheet. You track them in yours. They never match. Someone's always wrong on payday.", tag: "Kills team trust" },
            ].map((p, i) => (
              <div className="pain-card" key={i}>
                <span className="pain-emoji">{p.emoji}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="pain-tag">{p.tag}</div>
              </div>
            ))}
          </div>
          <div className="pain-callout">
            <span style={{ fontSize: 28 }}>🏁</span>
            <p>Dealers using Iris Financial identify an average of <strong>$4,800/month</strong> in previously untracked costs and recovered margin within the first 60 days.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <div className="s-eyebrow"><div className="s-eyebrow-line" /><span className="s-eyebrow-txt">Core features</span></div>
          <h2 className="s-title">Built for the lot,<br />not the <span className="red">accounting firm.</span></h2>
          <div className="features-layout">
            <div className="feat-list">
              {mainFeatures.map((f, i) => (
                <div className="feat-row" key={i}>
                  <div className="feat-icon-box"><IconD name={f.icon} /></div>
                  <div className="feat-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                    <div className="feat-badge">{f.badge}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="inv-mockup">
              <div className="inv-top">
                <span className="inv-top-title">Lot Dashboard — This Month</span>
                <div className="vp-live"><div className="vp-dot" /><span className="vp-live-txt">Live</span></div>
              </div>
              <div className="inv-metrics">
                <div className="inv-metric">
                  <div className="inv-m-lbl">Units on Lot</div>
                  <div className="inv-m-val white">24</div>
                  <div className="inv-m-delta">↑ 3 this week</div>
                </div>
                <div className="inv-metric">
                  <div className="inv-m-lbl">MTD Gross</div>
                  <div className="inv-m-val">$38,400</div>
                  <div className="inv-m-delta">↑ 18% vs last mo</div>
                </div>
                <div className="inv-metric">
                  <div className="inv-m-lbl">Avg Days on Lot</div>
                  <div className="inv-m-val green">31</div>
                  <div className="inv-m-delta">↓ 8 days vs last mo</div>
                </div>
              </div>
              <div className="inv-list">
                {inventory.map((v, i) => (
                  <div className="inv-item" key={i}>
                    <div className="inv-item-left">
                      <span className="inv-stock">{v.stock}</span>
                      <div>
                        <div className="inv-car-name">{v.car}</div>
                        <div className="inv-car-sub">{v.sub}</div>
                      </div>
                    </div>
                    <div className="inv-right">
                      <div className="inv-profit">{v.profit}</div>
                      <div className={`inv-status ${v.status}`}>{v.statusLbl}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="inv-footer">
                <span className="inv-f-lbl">Total Lot Value</span>
                <span className="inv-f-val">$642,800</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MORE FEATURES */}
      <section className="more-feat">
        <div className="more-feat-inner">
          <div className="s-eyebrow"><div className="s-eyebrow-line" /><span className="s-eyebrow-txt">Everything else</span></div>
          <h2 className="s-title">One platform.<br /><span className="red">Zero gaps.</span></h2>
          <div className="more-grid">
            {moreFeatures.map((f, i) => (
              <div className="more-card" key={i}>
                <span className="more-card-emoji"><IconD name={f.emoji} /></span>
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
          <div className="s-eyebrow"><div className="s-eyebrow-line" /><span className="s-eyebrow-txt">Side by side</span></div>
          <h2 className="s-title">Iris Financial vs.<br /><span className="red">DealerSocket + QuickBooks</span></h2>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch feat">Feature</div>
              <div className="ch iris">Iris Financial <span className="iris-pill">Best</span></div>
              <div className="ch other">DealerSocket + QB</div>
            </div>
            {[
              ["Profit per vehicle tracking", "✓ Built-in", "✗ Manual calculation"],
              ["Reconditioning cost log", "✓ Per-unit tracking", "✗ Not available"],
              ["Days on lot alerts", "✓ Automatic", "✗ Manual monitoring"],
              ["Commission auto-calc", "✓ Built-in", "✗ Separate tool needed"],
              ["Floor plan interest tracking", "✓ Built-in", "✗ Not available"],
              ["Deal jacket / buyer's order", "✓ 1-click generate", "✓ DealerSocket (expensive)"],
              ["Real-time P&L", "✓ Live dashboard", "✗ QB month-end only"],
              ["Mobile money / global payments", "✓ Iris Pay + PawaPay", "✗ US card-only"],
            ].map(([feat, iris, other], i) => (
              <div className="comp-row" key={i}>
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
            <div className="comp-row price-row-c" style={{ borderTop: "2px solid rgba(220,38,38,0.2)" }}>
              <div className="cc feat-c" style={{ fontWeight: 600 }}>Starting Price</div>
              <div className="cc iris-c"><span className="big-iris">$0/mo</span></div>
              <div className="cc other-c"><span className="big-other">$300+/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="s-eyebrow"><div className="s-eyebrow-line" /><span className="s-eyebrow-txt">From the lot</span></div>
          <h2 className="s-title">What dealers are saying</h2>
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
          <div className="s-eyebrow" style={{ justifyContent: "center" }}><div className="s-eyebrow-line" /><span className="s-eyebrow-txt">Simple pricing</span></div>
          <h2 className="s-title" style={{ textAlign: "center" }}>Start free.<br /><span className="red">Scale when you're ready.</span></h2>
          <div className="pricing-card">
            <div className="p-pill">Auto Dealer Free Tier</div>
            <div className="p-name">Iris Financial — Dealer Edition</div>
            <div className="p-price"><sup>$</sup>0</div>
            <div className="p-per">per month · Starter plan · forever free</div>
            <div className="p-feats">
              {[
                "Unlimited vehicle inventory with profit tracking",
                "Reconditioning cost log per unit",
                "Days on lot tracking with alerts",
                "Sales rep commission auto-calculation",
                "Deal jackets and buyer's order generation",
                "Floor plan interest tracking",
                "Iris Pay — card and mobile payments",
                "Monthly gross and net profit reports",
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
        <div className="cta-inner">
          
          <h2 className="cta-title">Stop losing gross on<br />every deal you close.</h2>
          <p className="cta-sub">Every untracked recon cost, every car sitting past 45 days, every commission dispute is margin walking off your lot. Iris Financial closes those gaps — free to start, 15 minutes to set up.</p>
          <div className="cta-btns">
            <button className="cta-btn-dark" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="cta-btn-outline" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
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
                <div className="modal-s">Set up your dealership account in 15 minutes. First profit report ready same day.</div>
                <div className="f-group">
                  <label className="f-label">Your Name</label>
                  <input className="f-input" placeholder="Owner / GM name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Dealership Name</label>
                  <input className="f-input" placeholder="e.g. Riverside Motors" value={form.dealership} onChange={e => setForm({ ...form, dealership: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Email Address</label>
                  <input className="f-input" type="email" placeholder="you@yourdealership.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Lot Size</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
                    <option value="">Select lot size</option>
                    <option>1–10 vehicles</option>
                    <option>10–30 vehicles</option>
                    <option>30–75 vehicles</option>
                    <option>75–200 vehicles</option>
                    <option>200+ vehicles / Multi-location</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <span className="success-emoji"><Car size={48} color="var(--red-hot)" /></span>
                <div className="success-h">You're on the lot!</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--red-hot)" }}>{form.email}</strong>. Your first profit report will be ready before end of day.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
