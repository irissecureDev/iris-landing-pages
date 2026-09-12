import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --black: #0D0A07;
    --char: #1A1410;
    --brown: #2C1A0E;
    --ember: #C4501A;
    --ember-light: #E8723A;
    --amber: #D4960A;
    --amber-light: #F0B830;
    --cream: #F5EFE6;
    --parchment: #EDE3D4;
    --warm-gray: #8B7D6E;
    --text-light: #C8B89A;
    --green-fresh: #4A7C59;
    --red-loss: #C0392B;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--black); color: var(--cream); overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes flicker {
    0%, 100% { opacity: 1; } 50% { opacity: 0.85; } 75% { opacity: 0.95; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(196,80,26,0.5); }
    50% { box-shadow: 0 0 0 12px rgba(196,80,26,0); }
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    padding: 0 48px;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
    background: rgba(13,10,7,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(196,80,26,0.15);
  }
  .nav-left { display: flex; align-items: center; gap: 12px; }
  .nav-logo-wrap {
    width: 38px; height: 38px; border-radius: 8px;
    background: linear-gradient(135deg, var(--ember), #8B2200);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-weight: 700;
    color: white; font-size: 18px;
    box-shadow: 0 4px 16px rgba(196,80,26,0.35);
  }
  .nav-wordmark {
    font-family: 'Cormorant Garamond', serif; font-weight: 600;
    font-size: 20px; color: var(--cream); letter-spacing: 0.01em;
  }
  .nav-wordmark span { color: var(--ember-light); }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-link { color: var(--warm-gray); font-size: 13px; font-weight: 500; cursor: pointer; transition: color 0.2s; letter-spacing: 0.03em; }
  .nav-link:hover { color: var(--cream); }
  .nav-btn {
    background: var(--ember); color: white; padding: 9px 22px;
    border-radius: 6px; font-size: 13px; font-weight: 600;
    cursor: pointer; border: none; letter-spacing: 0.04em;
    text-transform: uppercase; transition: all 0.2s;
  }
  .nav-btn:hover { background: var(--ember-light); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(196,80,26,0.4); }

  /* TICKER */
  .ticker {
    position: fixed; top: 68px; left: 0; right: 0; z-index: 199;
    background: var(--ember); height: 36px;
    display: flex; align-items: center; overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .ticker-inner {
    display: flex; white-space: nowrap;
    animation: ticker 30s linear infinite;
  }
  .ticker-item {
    padding: 0 32px; font-size: 12px; font-weight: 600;
    color: white; letter-spacing: 0.08em; text-transform: uppercase;
    display: flex; align-items: center; gap: 16px;
  }
  .ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.5); }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--black);
    position: relative; overflow: hidden;
    display: flex; align-items: center;
    padding: 140px 48px 80px;
  }
  .hero-texture {
    position: absolute; inset: 0; opacity: 0.03;
    background-image:
      repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 0, transparent 50%);
    background-size: 20px 20px;
  }
  .hero-glow-left {
    position: absolute; left: -200px; top: 20%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(196,80,26,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-glow-right {
    position: absolute; right: -100px; bottom: 10%; width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(212,150,10,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
    max-width: 1200px; margin: 0 auto; width: 100%;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(196,80,26,0.15); border: 1px solid rgba(196,80,26,0.35);
    color: var(--ember-light); padding: 6px 16px; border-radius: 4px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 28px;
    animation: fadeUp 0.6s ease both;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 5.5vw, 76px);
    font-weight: 700; line-height: 1.05;
    color: var(--cream); margin-bottom: 24px;
    animation: fadeUp 0.7s 0.1s ease both;
  }
  .hero-title em { font-style: italic; color: var(--ember-light); }
  .hero-title .amber { color: var(--amber-light); }
  .hero-sub {
    font-size: 17px; line-height: 1.75; color: var(--text-light);
    margin-bottom: 40px; font-weight: 300; max-width: 480px;
    animation: fadeUp 0.7s 0.2s ease both;
  }
  .hero-actions {
    display: flex; gap: 14px; flex-wrap: wrap;
    animation: fadeUp 0.7s 0.3s ease both;
  }
  .btn-fire {
    background: var(--ember); color: white;
    padding: 16px 36px; border-radius: 6px;
    font-weight: 600; font-size: 14px; cursor: pointer; border: none;
    letter-spacing: 0.04em; text-transform: uppercase;
    transition: all 0.25s; animation: pulse 2.5s infinite;
  }
  .btn-fire:hover { background: var(--ember-light); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(196,80,26,0.45); }
  .btn-ghost {
    background: transparent; color: var(--cream);
    padding: 16px 36px; border-radius: 6px;
    font-weight: 500; font-size: 14px; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.15); transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--amber); color: var(--amber-light); }
  .hero-proof {
    display: flex; gap: 36px; margin-top: 52px; padding-top: 36px;
    border-top: 1px solid rgba(255,255,255,0.07);
    animation: fadeUp 0.7s 0.4s ease both;
  }
  .proof-item .proof-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 700; color: var(--amber-light); line-height: 1;
  }
  .proof-item .proof-label { font-size: 12px; color: var(--warm-gray); margin-top: 4px; }

  /* HERO RIGHT — RECEIPT CARD */
  .hero-right {
    animation: scaleIn 0.8s 0.3s ease both;
    position: relative;
  }
  .receipt-card {
    background: var(--char); border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.07);
    overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.6);
  }
  .receipt-header {
    background: var(--brown); padding: 20px 28px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .receipt-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; color: var(--cream); }
  .receipt-live { display: flex; align-items: center; gap: 6px; }
  .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green-fresh); animation: pulse 2s infinite; }
  .live-text { font-size: 11px; color: var(--green-fresh); font-weight: 600; letter-spacing: 0.06em; }
  .receipt-body { padding: 24px 28px; }
  .receipt-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .receipt-row:last-child { border-bottom: none; }
  .receipt-label { font-size: 13px; color: var(--warm-gray); display: flex; align-items: center; gap: 8px; }
  .receipt-label .dot { width: 6px; height: 6px; border-radius: 50%; }
  .receipt-val { font-size: 14px; font-weight: 600; color: var(--cream); font-family: 'Cormorant Garamond', serif; font-size: 16px; }
  .receipt-val.green { color: var(--green-fresh); }
  .receipt-val.red { color: var(--red-loss); }
  .receipt-val.amber { color: var(--amber-light); }
  .receipt-footer {
    background: rgba(196,80,26,0.08); border-top: 1px solid rgba(196,80,26,0.15);
    padding: 18px 28px; display: flex; align-items: center; justify-content: space-between;
  }
  .receipt-footer-label { font-size: 12px; color: var(--text-light); }
  .receipt-footer-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 700; color: var(--amber-light);
  }
  .receipt-tabs { display: flex; gap: 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .receipt-tab {
    flex: 1; padding: 12px; text-align: center; font-size: 12px;
    font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; color: var(--warm-gray);
    border-bottom: 2px solid transparent;
  }
  .receipt-tab.active { color: var(--ember-light); border-bottom-color: var(--ember); }
  .receipt-badge-row { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
  .r-badge {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    color: var(--text-light); padding: 5px 12px; border-radius: 4px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.04em;
  }
  .r-badge.hot { background: rgba(196,80,26,0.12); border-color: rgba(196,80,26,0.25); color: var(--ember-light); }

  /* PAIN */
  .pain { background: var(--char); padding: 100px 48px; }
  .pain-inner { max-width: 1100px; margin: 0 auto; }
  .section-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ember); margin-bottom: 14px;
  }
  .section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 54px); font-weight: 700;
    line-height: 1.1; color: var(--cream); margin-bottom: 16px;
  }
  .section-heading em { font-style: italic; color: var(--ember-light); }
  .section-body { font-size: 17px; color: var(--warm-gray); line-height: 1.7; max-width: 580px; font-weight: 300; }
  .pain-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
    margin-top: 56px; border-radius: 16px; overflow: hidden;
  }
  .pain-item {
    background: rgba(255,255,255,0.02); padding: 40px 32px;
    transition: background 0.3s; cursor: default;
    border: 1px solid rgba(255,255,255,0.04);
  }
  .pain-item:hover { background: rgba(196,80,26,0.05); border-color: rgba(196,80,26,0.15); }
  .pain-num {
    font-family: 'Cormorant Garamond', serif; font-size: 56px;
    font-weight: 700; color: rgba(196,80,26,0.18); line-height: 1;
    margin-bottom: 16px;
  }
  .pain-item h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--cream); margin-bottom: 12px; }
  .pain-item p { font-size: 14px; color: var(--warm-gray); line-height: 1.65; }
  .pain-callout {
    background: rgba(196,80,26,0.08); border: 1px solid rgba(196,80,26,0.2);
    border-radius: 12px; padding: 20px 28px; margin-top: 40px;
    display: flex; align-items: center; gap: 16px;
  }
  .pain-callout-icon { font-size: 28px; }
  .pain-callout p { font-size: 15px; color: var(--cream); line-height: 1.6; }
  .pain-callout strong { color: var(--ember-light); }

  /* FEATURES */
  .features { background: var(--black); padding: 100px 48px; }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .features-top {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center; margin-bottom: 80px;
  }
  .features-visual {
    background: var(--char); border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.06); overflow: hidden;
    box-shadow: 0 32px 64px rgba(0,0,0,0.5);
  }
  .vis-header {
    background: var(--brown); padding: 16px 24px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .vis-dot { width: 10px; height: 10px; border-radius: 50%; }
  .vis-title { font-size: 13px; color: var(--warm-gray); margin-left: 8px; font-weight: 500; }
  .vis-body { padding: 24px; }
  .vis-menu-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border-radius: 10px; margin-bottom: 8px;
    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.2s; cursor: default;
  }
  .vis-menu-item:hover { background: rgba(196,80,26,0.08); border-color: rgba(196,80,26,0.2); }
  .vis-item-left { display: flex; align-items: center; gap: 12px; }
  .vis-item-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(196,80,26,0.15); display: flex; align-items: center; justify-content: center; font-size: 16px;
  }
  .vis-item-name { font-size: 14px; color: var(--cream); font-weight: 500; }
  .vis-item-sub { font-size: 11px; color: var(--warm-gray); margin-top: 2px; }
  .vis-item-cost { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: var(--amber-light); }
  .vis-item-cost.red { color: var(--red-loss); }
  .vis-footer-bar {
    margin-top: 16px; padding: 14px 16px;
    background: rgba(212,150,10,0.08); border-radius: 10px;
    border: 1px solid rgba(212,150,10,0.2);
    display: flex; align-items: center; justify-content: space-between;
  }
  .vis-footer-label { font-size: 12px; color: var(--amber); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
  .vis-footer-val { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: var(--amber-light); }

  .features-list { display: grid; grid-template-columns: 1fr; gap: 4px; }
  .feature-row {
    display: flex; gap: 20px; padding: 24px 28px;
    border-radius: 12px; transition: all 0.25s; cursor: default;
    border: 1px solid transparent;
  }
  .feature-row:hover { background: rgba(255,255,255,0.03); border-color: rgba(196,80,26,0.15); }
  .feat-icon-wrap {
    width: 48px; height: 48px; border-radius: 10px; flex-shrink: 0;
    background: rgba(196,80,26,0.1); border: 1px solid rgba(196,80,26,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .feat-content h4 { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--cream); margin-bottom: 6px; }
  .feat-content p { font-size: 13px; color: var(--warm-gray); line-height: 1.65; }
  .feat-tag {
    display: inline-block; margin-top: 8px;
    background: rgba(212,150,10,0.1); border: 1px solid rgba(212,150,10,0.2);
    color: var(--amber-light); padding: 3px 10px; border-radius: 4px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  }

  /* MORE FEATURES GRID */
  .more-features { background: var(--char); padding: 80px 48px; }
  .more-features-inner { max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
  .feat-card {
    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; padding: 32px; transition: all 0.3s; position: relative; overflow: hidden;
  }
  .feat-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--ember), var(--amber));
    transform: scaleX(0); transition: transform 0.3s; transform-origin: left;
  }
  .feat-card:hover::after { transform: scaleX(1); }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 24px 48px rgba(0,0,0,0.4); border-color: rgba(196,80,26,0.2); }
  .feat-card-icon { font-size: 28px; margin-bottom: 16px; }
  .feat-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 600; color: var(--cream); margin-bottom: 10px; }
  .feat-card p { font-size: 13px; color: var(--warm-gray); line-height: 1.65; }

  /* COMPARISON */
  .comparison { background: var(--black); padding: 100px 48px; }
  .comparison-inner { max-width: 860px; margin: 0 auto; }
  .comp-wrap {
    background: var(--char); border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.07); margin-top: 52px;
    box-shadow: 0 32px 64px rgba(0,0,0,0.5);
  }
  .comp-head {
    display: grid; grid-template-columns: 1.4fr 1fr 1fr;
    background: var(--brown);
  }
  .comp-hcell { padding: 22px 28px; }
  .comp-hcell.feat { font-size: 12px; color: var(--warm-gray); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }
  .comp-hcell.iris-h {
    font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700;
    color: var(--ember-light); display: flex; align-items: center; gap: 10px;
  }
  .comp-hcell.other-h {
    font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600;
    color: rgba(255,255,255,0.4);
  }
  .iris-rec {
    background: rgba(196,80,26,0.2); color: var(--ember-light);
    font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
    border: 1px solid rgba(196,80,26,0.3);
  }
  .comp-row-r {
    display: grid; grid-template-columns: 1.4fr 1fr 1fr;
    border-top: 1px solid rgba(255,255,255,0.04); transition: background 0.2s;
  }
  .comp-row-r:hover { background: rgba(255,255,255,0.02); }
  .comp-cell-r { padding: 16px 28px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
  .comp-cell-r.feat-r { color: var(--cream); font-weight: 500; font-size: 14px; }
  .comp-cell-r.iris-r { color: var(--cream); font-weight: 500; }
  .comp-cell-r.other-r { color: var(--warm-gray); }
  .ck { color: #4ade80; font-size: 17px; }
  .cx { color: var(--red-loss); font-size: 17px; }
  .price-row-r { background: rgba(212,150,10,0.04); border-top: 2px solid rgba(212,150,10,0.15) !important; }
  .big-price-iris { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--amber-light) !important; }
  .big-price-other { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: var(--red-loss) !important; }

  /* TESTIMONIALS */
  .testimonials { background: var(--char); padding: 100px 48px; }
  .testimonials-inner { max-width: 1100px; margin: 0 auto; }
  .testi-head { text-align: center; margin-bottom: 60px; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .testi-card {
    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px; padding: 36px; transition: all 0.3s;
  }
  .testi-card:hover { transform: translateY(-4px); border-color: rgba(196,80,26,0.25); box-shadow: 0 24px 48px rgba(0,0,0,0.4); }
  .testi-stars { color: var(--amber); font-size: 14px; margin-bottom: 14px; }
  .testi-q-mark { font-family: 'Cormorant Garamond', serif; font-size: 48px; line-height: 1; color: var(--ember); opacity: 0.35; margin-bottom: 4px; }
  .testi-text { font-size: 15px; color: var(--text-light); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-author-row { display: flex; align-items: center; gap: 12px; }
  .testi-av {
    width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
    background: var(--brown); border: 2px solid rgba(196,80,26,0.3);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: var(--ember-light);
  }
  .testi-name { font-size: 14px; font-weight: 600; color: var(--cream); }
  .testi-role { font-size: 12px; color: var(--warm-gray); margin-top: 2px; }

  /* PRICING */
  .pricing { background: var(--black); padding: 100px 48px; }
  .pricing-inner { max-width: 760px; margin: 0 auto; text-align: center; }
  .pricing-card {
    background: var(--char); border-radius: 24px;
    border: 1px solid rgba(196,80,26,0.25);
    padding: 56px 52px; margin-top: 52px; position: relative; overflow: hidden;
  }
  .pricing-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--ember), var(--amber), var(--ember));
    background-size: 200%; animation: shimmer 3s linear infinite;
  }
  .pricing-pill {
    display: inline-block; background: rgba(196,80,26,0.15); border: 1px solid rgba(196,80,26,0.3);
    color: var(--ember-light); padding: 6px 18px; border-radius: 100px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px;
  }
  .pricing-plan-name { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 700; color: var(--cream); margin-bottom: 8px; }
  .pricing-amount { font-family: 'Cormorant Garamond', serif; font-size: 88px; font-weight: 700; color: var(--amber-light); line-height: 1; margin: 16px 0 4px; }
  .pricing-amount sup { font-size: 36px; vertical-align: top; margin-top: 18px; }
  .pricing-per { color: var(--warm-gray); font-size: 15px; margin-bottom: 36px; }
  .pricing-features { text-align: left; margin: 32px 0; }
  .pricing-feat {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 15px; color: var(--text-light);
  }
  .pricing-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-fresh); font-size: 17px; }
  .pricing-cta-btn {
    width: 100%; background: var(--ember); color: white;
    padding: 18px; border-radius: 10px; font-weight: 600; font-size: 15px;
    cursor: pointer; border: none; letter-spacing: 0.05em; text-transform: uppercase;
    transition: all 0.25s;
  }
  .pricing-cta-btn:hover { background: var(--ember-light); transform: translateY(-2px); box-shadow: 0 14px 40px rgba(196,80,26,0.4); }
  .pricing-note { color: var(--warm-gray); font-size: 13px; margin-top: 14px; }

  /* CTA */
  .cta-section { background: var(--ember); padding: 100px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 0, transparent 50%);
    background-size: 16px 16px;
  }
  .cta-inner { position: relative; z-index: 2; max-width: 680px; margin: 0 auto; }
  .cta-icon { font-size: 60px; margin-bottom: 24px; display: block; animation: float 5s ease-in-out infinite; }
  .cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5vw, 60px); font-weight: 700; color: white; line-height: 1.1; margin-bottom: 20px; }
  .cta-sub { font-size: 17px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 40px; font-weight: 300; }
  .cta-btn-white {
    background: white; color: var(--ember);
    padding: 18px 52px; border-radius: 8px;
    font-weight: 700; font-size: 15px; cursor: pointer; border: none;
    letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.25s;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  }
  .cta-btn-white:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }

  /* FOOTER */
  .footer {
    background: var(--black); padding: 36px 48px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.25); }
  .footer-copy strong { color: var(--ember-light); }
  .footer-links { display: flex; gap: 24px; }
  .footer-lnk { font-size: 13px; color: rgba(255,255,255,0.25); cursor: pointer; transition: color 0.2s; }
  .footer-lnk:hover { color: var(--ember-light); }

  /* MODAL */
  .modal-ov {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .modal-box {
    background: var(--char); border-radius: 24px; padding: 48px;
    max-width: 480px; width: 100%; position: relative;
    border: 1px solid rgba(196,80,26,0.25);
    animation: scaleIn 0.3s ease;
    box-shadow: 0 40px 80px rgba(0,0,0,0.7);
  }
  .modal-x {
    position: absolute; top: 20px; right: 20px;
    background: rgba(255,255,255,0.05); border: none; font-size: 18px;
    cursor: pointer; color: var(--warm-gray); width: 36px; height: 36px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .modal-x:hover { background: rgba(196,80,26,0.15); color: var(--ember-light); }
  .modal-h { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 700; color: var(--cream); margin-bottom: 6px; }
  .modal-s { color: var(--warm-gray); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 18px; }
  .f-label { font-size: 12px; font-weight: 600; color: var(--text-light); margin-bottom: 6px; display: block; letter-spacing: 0.06em; text-transform: uppercase; }
  .f-input {
    width: 100%; padding: 13px 16px; border-radius: 8px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    color: var(--cream); outline: none; transition: border-color 0.2s;
  }
  .f-input::placeholder { color: var(--warm-gray); }
  .f-input:focus { border-color: var(--ember); }
  .f-select { appearance: none; cursor: pointer; }
  .f-btn {
    width: 100%; background: var(--ember); color: white;
    padding: 15px; border-radius: 8px; font-weight: 600; font-size: 15px;
    cursor: pointer; border: none; margin-top: 8px; letter-spacing: 0.05em; text-transform: uppercase;
    transition: all 0.25s;
  }
  .f-btn:hover { background: var(--ember-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-icon-big { font-size: 52px; margin-bottom: 16px; display: block; }
  .success-h { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--cream); margin-bottom: 10px; }
  .success-p { color: var(--warm-gray); font-size: 14px; line-height: 1.6; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .hero-layout { grid-template-columns: 1fr; gap: 48px; }
    .hero-right { display: none; }
    .hero { padding: 130px 20px 70px; }
    .pain-grid { grid-template-columns: 1fr; }
    .features-top { grid-template-columns: 1fr; }
    .feat-grid { grid-template-columns: 1fr; }
    .testi-grid { grid-template-columns: 1fr; }
    .comp-head, .comp-row-r { grid-template-columns: 1.2fr 1fr 1fr; }
    .comp-cell-r, .comp-hcell { padding: 14px 16px; font-size: 13px; }
    .pain, .features, .more-features, .comparison, .testimonials, .pricing, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
    .pricing-card { padding: 36px 28px; }
  }
`;

const tickerItems = [
  "Recipe Costing", "Ingredient Tracking", "Supplier Management", "Built-in POS",
  "Profit Margin Alerts", "Invoice to Customer", "Food Cost Reports", "Daily Sales Tracking",
  "Payroll Ready", "Multi-Location Support",
];

const mainFeatures = [
  { icon: "🧮", title: "Recipe Costing Engine", desc: "Calculate the exact food cost and margin for every dish on your menu — down to the gram.", tag: "Restaurant-Specific" },
  { icon: "📦", title: "Ingredient & Inventory Tracking", desc: "Track stock levels, flag low inventory, and auto-link to supplier orders. No more surprise stockouts.", tag: "Saves Waste" },
  { icon: "🧾", title: "Supplier Management", desc: "All your vendors, invoices, and purchase orders in one place. Compare prices across suppliers automatically.", tag: "Cuts Costs" },
  { icon: "🖥️", title: "Built-in POS & Cash Register", desc: "Run sales at the counter or table. Every transaction flows directly into your books. No middleware.", tag: "No Integration Needed" },
];

const moreFeatures = [
  { icon: "📊", title: "Daily Sales Reports", desc: "See revenue, food cost %, labor cost %, and net margin every single day — not just at month-end." },
  { icon: "💳", title: "Iris Pay Processing", desc: "Accept cards and mobile money at the counter. Payouts land in your account fast." },
  { icon: "🧑‍🍳", title: "Staff & Payroll", desc: "Track hours, calculate wages, and run payroll directly from the platform." },
  { icon: "📄", title: "Professional Invoicing", desc: "Send invoices to catering clients or corporate accounts with your logo and QR code." },
  { icon: "📈", title: "P&L in Real Time", desc: "Your profit and loss updates live as transactions happen. Know your numbers before your accountant does." },
  { icon: "🌍", title: "Multi-Currency & Multi-Location", desc: "Running locations in different cities or countries? Consolidated reporting across all of them." },
];

const testimonials = [
  { q: "We were using Square for POS and QuickBooks for accounting. The data never matched. Iris Financial connects both — now every sale is in the books automatically.", name: "Chef Marcus B.", role: "La Maison Bistro, Chicago IL", init: "M" },
  { q: "The recipe costing feature alone saved us. We discovered three items were actually losing money. We repriced them and added $4,200 to monthly profit.", name: "Owner T. Nguyen", role: "Pho & More Restaurant, Houston TX", init: "T" },
  { q: "I finally understand my food cost percentage every week, not every quarter. That visibility changed how we order, how we menu, everything.", name: "GM Fatima A.", role: "Spice Garden, Atlanta GA", init: "F" },
];

const menuItems = [
  { icon: "🥩", name: "Grilled Ribeye", sub: "Food cost: 28%", cost: "↑ $42.00", isGood: true },
  { icon: "🍝", name: "Pasta Carbonara", sub: "Food cost: 18%", cost: "↑ $24.00", isGood: true },
  { icon: "🥗", name: "Caesar Salad", sub: "Food cost: 41% ⚠️", cost: "↓ $14.00", isGood: false },
  { icon: "🍰", name: "Chocolate Lava Cake", sub: "Food cost: 22%", cost: "↑ $11.00", isGood: true },
];

export default function RestaurantLandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", restaurant: "", email: "", type: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      await fetch("https://formspree.io/f/xwlkjjgv", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          restaurant: form.restaurant,
          email: form.email,
          restaurant_type: form.type,
          vertical: "Restaurant",
        }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "https://irisfinancial.tech/auth/signup?vertical=restaurant&ref=landing";
    }, 2000);
  };

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-left">
          <div className="nav-logo-wrap">I</div>
          <div className="nav-wordmark">Iris <span>Financial</span></div>
        </div>
        <div className="nav-right">
          <span className="nav-link">Features</span>
          <span className="nav-link">Pricing</span>
          <button className="nav-btn" onClick={() => setShowModal(true)}>Start Free</button>
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span className="ticker-item" key={i}>
              {item} <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-texture" />
        <div className="hero-glow-left" />
        <div className="hero-glow-right" />
        <div className="hero-layout">
          <div className="hero-left">
            <div className="hero-badge">🍽️ Built for Food & Hospitality</div>
            <h1 className="hero-title">
              Know your <em>margins.</em><br />
              Run a leaner<br />
              <span className="amber">kitchen.</span>
            </h1>
            <p className="hero-sub">
              Recipe costing, ingredient tracking, POS integration, and real-time P&L — all in one platform built specifically for restaurants. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-fire" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
            <div className="hero-proof">
              <div className="proof-item">
                <div className="proof-num">$0</div>
                <div className="proof-label">to get started</div>
              </div>
              <div className="proof-item">
                <div className="proof-num">~18%</div>
                <div className="proof-label">avg food cost savings</div>
              </div>
              <div className="proof-item">
                <div className="proof-num">1 platform</div>
                <div className="proof-label">replaces 4+ tools</div>
              </div>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="hero-right">
            <div className="receipt-card">
              <div className="receipt-header">
                <div className="receipt-title">Today's Kitchen Dashboard</div>
                <div className="receipt-live">
                  <div className="live-dot" />
                  <span className="live-text">Live</span>
                </div>
              </div>
              <div className="receipt-tabs">
                {["today", "week", "month"].map(t => (
                  <div key={t} className={`receipt-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </div>
                ))}
              </div>
              <div className="receipt-body">
                {menuItems.map((item, i) => (
                  <div className="receipt-row" key={i}>
                    <div className="receipt-label">
                      <span>{item.icon}</span> {item.name}
                      <span style={{ fontSize: 11, color: "var(--warm-gray)", display: "block", marginTop: 2 }}>{item.sub}</span>
                    </div>
                    <div className={`receipt-val ${item.isGood ? "green" : "red"}`}>{item.cost}</div>
                  </div>
                ))}
                <div className="receipt-badge-row">
                  <span className="r-badge">32 covers today</span>
                  <span className="r-badge hot">Food cost: 27.3%</span>
                  <span className="r-badge">Labor: 31%</span>
                </div>
              </div>
              <div className="receipt-footer">
                <div>
                  <div className="receipt-footer-label">Net Margin Today</div>
                </div>
                <div className="receipt-footer-val">+$1,847</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-inner">
          <div className="section-eyebrow">Sound familiar?</div>
          <h2 className="section-heading">Most restaurants bleed money<br />because they can't <em>see it happening.</em></h2>
          <p className="section-body">The average restaurant loses 4–9% of revenue to preventable waste and mispriced menu items — because they're not tracking the right numbers in real time.</p>
          <div className="pain-grid">
            {[
              { num: "01", title: "You don't know your real food cost", body: "You think it's 30%. Your accountant tells you it's 38% in March. By then you've already lost the margin." },
              { num: "02", title: "Three tools that don't talk to each other", body: "POS here. Accounting there. Inventory in a spreadsheet. Nothing reconciles. You're doing double entry every week." },
              { num: "03", title: "Pricing based on gut, not data", body: "Some of your most popular dishes are your lowest-margin dishes. You won't know until you run the numbers — which you haven't." },
            ].map((p, i) => (
              <div className="pain-item" key={i}>
                <div className="pain-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <div className="pain-callout">
            <div className="pain-callout-icon">🔥</div>
            <p>The average restaurant using Iris Financial identifies <strong>3–5 underpriced menu items</strong> within the first 30 days — unlocking an average of <strong>$3,800/month</strong> in recovered margin.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <div className="features-top">
            <div className="features-visual">
              <div className="vis-header">
                <div className="vis-dot" style={{ background: "#ff5f57" }} />
                <div className="vis-dot" style={{ background: "#febc2e" }} />
                <div className="vis-dot" style={{ background: "#28c840" }} />
                <span className="vis-title">Recipe Cost Analysis — This Week</span>
              </div>
              <div className="vis-body">
                {[
                  { icon: "🥩", name: "Weekend Brunch Set", sub: "Beef tenderloin + sides", cost: "29% margin ✓", ok: true },
                  { icon: "🍜", name: "House Ramen Bowl", sub: "Pork broth, noodles, egg", cost: "17% margin ✓", ok: true },
                  { icon: "🍕", name: "Truffle Pizza", sub: "Truffle oil, mozzarella", cost: "44% ⚠ Overspend", ok: false },
                  { icon: "🥂", name: "Mocktail Combo", sub: "Fresh fruit, mixers", cost: "12% margin ✓", ok: true },
                ].map((item, i) => (
                  <div className="vis-menu-item" key={i}>
                    <div className="vis-item-left">
                      <div className="vis-item-icon">{item.icon}</div>
                      <div>
                        <div className="vis-item-name">{item.name}</div>
                        <div className="vis-item-sub">{item.sub}</div>
                      </div>
                    </div>
                    <div className={`vis-item-cost ${item.ok ? "" : "red"}`}>{item.cost}</div>
                  </div>
                ))}
                <div className="vis-footer-bar">
                  <span className="vis-footer-label">Avg. Food Cost This Week</span>
                  <span className="vis-footer-val">26.4%</span>
                </div>
              </div>
            </div>

            <div>
              <div className="section-eyebrow">What's included</div>
              <h2 className="section-heading">The tools your kitchen<br />actually <em>needs.</em></h2>
              <div className="features-list" style={{ marginTop: 36 }}>
                {mainFeatures.map((f, i) => (
                  <div className="feature-row" key={i}>
                    <div className="feat-icon-wrap">{f.icon}</div>
                    <div className="feat-content">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                      <div className="feat-tag">{f.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MORE FEATURES */}
      <section className="more-features">
        <div className="more-features-inner">
          <div className="section-eyebrow">Everything else</div>
          <h2 className="section-heading">One platform.<br /><em>No more juggling.</em></h2>
          <div className="feat-grid">
            {moreFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-card-icon">{f.icon}</div>
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
            <div className="section-eyebrow">Side by side</div>
            <h2 className="section-heading">Iris Financial vs.<br /><em>Toast + QuickBooks</em></h2>
          </div>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="comp-hcell feat">Feature</div>
              <div className="comp-hcell iris-h">Iris Financial <span className="iris-rec">Best</span></div>
              <div className="comp-hcell other-h">Toast + QB</div>
            </div>
            {[
              ["Recipe Costing", "✓ Built-in", "✗ Not available"],
              ["Ingredient Tracking", "✓ Built-in", "✗ Add-on required"],
              ["Built-in POS", "✓ Iris Pay POS", "✓ Toast POS (separate)"],
              ["Auto Bookkeeping from POS", "✓ Native sync", "✗ Manual export needed"],
              ["Real-time P&L", "✓ Live", "✗ Month-end only"],
              ["Payroll", "✓ Built-in", "✗ Extra subscription"],
              ["Mobile Money (Africa/Global)", "✓ PawaPay + Stripe", "✗ US-only"],
              ["Bilingual EN/FR", "✓ Native", "✗ English only"],
            ].map(([feat, iris, other], i) => (
              <div className="comp-row-r" key={i}>
                <div className="comp-cell-r feat-r">{feat}</div>
                <div className="comp-cell-r iris-r">
                  <span className={iris.startsWith("✓") ? "ck" : "cx"}>{iris.startsWith("✓") ? "✓" : "✗"}</span>
                  {iris.replace("✓ ", "").replace("✗ ", "")}
                </div>
                <div className="comp-cell-r other-r">
                  <span className={other.startsWith("✓") ? "ck" : "cx"}>{other.startsWith("✓") ? "✓" : "✗"}</span>
                  {other.replace("✓ ", "").replace("✗ ", "")}
                </div>
              </div>
            ))}
            <div className="comp-row-r price-row-r" style={{ borderTop: "2px solid rgba(212,150,10,0.15)" }}>
              <div className="comp-cell-r feat-r" style={{ fontWeight: 700 }}>Starting Price</div>
              <div className="comp-cell-r"><span className="big-price-iris">$0/mo</span></div>
              <div className="comp-cell-r"><span className="big-price-other">$180+/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="testi-head">
            <div className="section-eyebrow">From the kitchen</div>
            <h2 className="section-heading">What restaurant owners say</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-stars">★★★★★</div>
                <div className="testi-q-mark">"</div>
                <p className="testi-text">{t.q}</p>
                <div className="testi-author-row">
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
          <div className="section-eyebrow" style={{ textAlign: "center", color: "var(--ember)" }}>Simple pricing</div>
          <h2 className="section-heading" style={{ textAlign: "center" }}>Start free.<br /><em>Upgrade when you're ready.</em></h2>
          <div className="pricing-card">
            <div className="pricing-pill">Restaurant Free Tier</div>
            <div className="pricing-plan-name">Iris Financial — Restaurant Edition</div>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-per">per month — forever free to start</div>
            <div className="pricing-features">
              {[
                "Recipe costing & menu margin analysis",
                "Ingredient & inventory tracking",
                "Supplier management & purchase orders",
                "Built-in POS & cash register (Iris Pay)",
                "Daily sales reports & food cost %",
                "Professional invoicing with QR codes",
                "Real-time P&L dashboard",
                "Unlimited users (front-of-house + back-office)",
                "15-day free trial — no credit card required",
              ].map((f, i) => (
                <div className="pricing-feat" key={i}><span className="p-ck">✓</span> {f}</div>
              ))}
            </div>
            <button className="pricing-cta-btn" onClick={() => setShowModal(true)}>
              Start Free — No Credit Card Required
            </button>
            <div className="pricing-note">Upgrade to Professional ($79/mo) for multi-location reporting, payroll, and advanced analytics.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <span className="cta-icon">🔥</span>
          <h2 className="cta-title">Stop guessing.<br />Start knowing your numbers.</h2>
          <p className="cta-sub">Most restaurants know their reservations number. Almost none know their real food cost percentage this week. That's the gap Iris Financial closes — free to start, five minutes to set up.</p>
          <button className="cta-btn-white" onClick={() => setShowModal(true)}>Get Started Free Today</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-copy"><strong>Iris Financial</strong> — by Iris Secure Technology Solutions · irisfinancial.tech</div>
        <div className="footer-links">
          <span className="footer-lnk">Privacy</span>
          <span className="footer-lnk">Terms</span>
          <span className="footer-lnk">Contact</span>
        </div>
      </footer>

      {/* MODAL */}
      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}>✕</button>
            {!submitted ? (
              <>
                <div className="modal-h">Start Your Free Account</div>
                <div className="modal-s">Set up in 15 minutes. Your menu and margins will never be a mystery again.</div>
                <div className="f-group">
                  <label className="f-label">Your Name</label>
                  <input className="f-input" placeholder="Owner / Manager name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Restaurant Name</label>
                  <input className="f-input" placeholder="e.g. La Maison Bistro" value={form.restaurant} onChange={e => setForm({ ...form, restaurant: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Email Address</label>
                  <input className="f-input" type="email" placeholder="you@yourrestaurant.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Restaurant Type</label>
                  <select className="f-input f-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="">Select type</option>
                    <option>Full-Service Restaurant</option>
                    <option>Fast Casual / QSR</option>
                    <option>Café / Bakery</option>
                    <option>Bar & Grill</option>
                    <option>Food Truck</option>
                    <option>Catering Business</option>
                    <option>Ghost Kitchen</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <span className="success-icon-big">🍽️</span>
                <div className="success-h">You're in the kitchen!</div>
                <p className="success-p">We're sending your setup link to <strong style={{ color: "var(--ember-light)" }}>{form.email}</strong>. You'll be running margin reports before dinner service.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
