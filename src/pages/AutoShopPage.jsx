import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --steel-black: #0E0F11;
    --steel-dark: #161820;
    --steel-mid: #1F2230;
    --steel-panel: #252838;
    --steel-border: #2E3245;
    --steel-line: rgba(255,255,255,0.06);
    --yellow: #F5C400;
    --yellow-hot: #FFD740;
    --orange: #E8600A;
    --red-warn: #E53935;
    --green-ok: #43A047;
    --steel-text: #C8CDD8;
    --steel-muted: #6B7280;
    --steel-light: #8890A0;
    --white: #F0F2F5;
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'Barlow', sans-serif;
    background: var(--steel-black);
    color: var(--white);
    overflow-x: hidden;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scanline {
    0% { top: -10%; }
    100% { top: 110%; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes revCounter {
    0% { transform: rotate(-120deg); }
    100% { transform: rotate(60deg); }
  }
  @keyframes progressFill {
    from { width: 0; }
    to { width: var(--fill-w); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,196,0,0.4); }
    50% { box-shadow: 0 0 0 10px rgba(245,196,0,0); }
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes warningFlash {
    0%, 100% { border-color: rgba(229,57,53,0.3); }
    50% { border-color: rgba(229,57,53,0.7); }
  }

  /* ─── NAV ─── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px;
    background: var(--steel-black);
    border-bottom: 2px solid var(--yellow);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
  }
  .nav-logo { display: flex; align-items: center; gap: 12px; }
  .nav-logo-mark {
    width: 38px; height: 38px;
    background: var(--yellow);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    color: var(--steel-black); font-size: 17px;
  }
  .nav-wordmark {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 22px; letter-spacing: 0.04em; color: var(--white);
    text-transform: uppercase;
  }
  .nav-wordmark span { color: var(--yellow); }
  .nav-center { display: flex; gap: 32px; }
  .nav-item {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 600;
    font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--steel-light); cursor: pointer; transition: color 0.2s;
  }
  .nav-item:hover { color: var(--yellow); }
  .nav-cta {
    background: var(--yellow); color: var(--steel-black);
    padding: 9px 24px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: all 0.2s;
  }
  .nav-cta:hover { background: var(--yellow-hot); transform: translateY(-1px); }

  /* ─── STATUS BAR ─── */
  .status-bar {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    height: 32px; background: var(--steel-mid);
    border-bottom: 1px solid var(--steel-border);
    display: flex; align-items: center; overflow: hidden;
  }
  .status-ticker { display: flex; animation: ticker 28s linear infinite; white-space: nowrap; }
  .status-item {
    padding: 0 28px; font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--steel-light); display: flex; align-items: center; gap: 10px;
  }
  .status-dot { width: 5px; height: 5px; background: var(--yellow); border-radius: 50%; }
  .status-item.warn { color: var(--red-warn); }
  .status-item.ok { color: var(--green-ok); }

  /* ─── HERO ─── */
  .hero {
    min-height: 100vh;
    background: var(--steel-black);
    padding: 128px 48px 80px;
    position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-grid-bg {
    position: absolute; inset: 0; opacity: 1;
    background-image:
      linear-gradient(var(--steel-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--steel-line) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .hero-scanline {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(245,196,0,0.3), transparent);
    animation: scanline 6s linear infinite;
    pointer-events: none;
  }
  .hero-glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 800px; height: 400px;
    background: radial-gradient(ellipse, rgba(245,196,0,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
    animation: fadeUp 0.5s ease both;
  }
  .eyebrow-bar {
    width: 32px; height: 3px; background: var(--yellow);
  }
  .eyebrow-text {
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
    font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--yellow);
  }
  .hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(56px, 7vw, 96px);
    font-weight: 900; line-height: 0.95;
    color: var(--white); margin-bottom: 24px;
    text-transform: uppercase; letter-spacing: -0.01em;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title .yellow { color: var(--yellow); }
  .hero-title .slash {
    color: var(--steel-muted); font-weight: 400; font-size: 0.7em;
  }
  .hero-sub {
    font-size: 17px; color: var(--steel-text); line-height: 1.7;
    font-weight: 300; max-width: 480px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions {
    display: flex; gap: 14px; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-yellow {
    background: var(--yellow); color: var(--steel-black);
    padding: 16px 40px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: all 0.25s; animation: pulse 2.5s infinite;
  }
  .btn-yellow:hover { background: var(--yellow-hot); transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: var(--white);
    padding: 14px 36px; border: 2px solid var(--steel-border);
    cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase;
    transition: all 0.25s;
  }
  .btn-outline:hover { border-color: var(--yellow); color: var(--yellow); }
  .hero-stats {
    display: flex; gap: 40px; margin-top: 52px; padding-top: 40px;
    border-top: 1px solid var(--steel-border);
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .stat-val {
    font-family: 'Barlow Condensed', sans-serif; font-size: 38px;
    font-weight: 900; color: var(--yellow); line-height: 1;
  }
  .stat-lbl { font-size: 12px; color: var(--steel-muted); margin-top: 4px; letter-spacing: 0.04em; }

  /* ─── HERO RIGHT: WORK ORDER CARD ─── */
  .hero-right { animation: fadeIn 0.8s 0.4s ease both; }
  .wo-card {
    background: var(--steel-dark); border: 1px solid var(--steel-border);
    border-top: 3px solid var(--yellow); border-radius: 4px;
    box-shadow: 0 32px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04);
    font-family: 'Barlow Condensed', sans-serif; overflow: hidden;
  }
  .wo-header {
    background: var(--steel-mid); padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--steel-border);
  }
  .wo-title {
    font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--steel-light);
  }
  .wo-badge {
    padding: 3px 10px; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px;
  }
  .wo-badge.open { background: rgba(245,196,0,0.15); color: var(--yellow); border: 1px solid rgba(245,196,0,0.3); }
  .wo-badge.done { background: rgba(67,160,71,0.15); color: var(--green-ok); border: 1px solid rgba(67,160,71,0.3); }
  .wo-badge.warn { background: rgba(229,57,53,0.15); color: var(--red-warn); border: 1px solid rgba(229,57,53,0.3); animation: warningFlash 2s infinite; }
  .wo-vehicle {
    padding: 16px 20px; background: rgba(245,196,0,0.04);
    border-bottom: 1px solid var(--steel-border);
    display: flex; align-items: center; gap: 12px;
  }
  .wo-car-icon { font-size: 28px; }
  .wo-car-name { font-size: 17px; font-weight: 700; color: var(--white); letter-spacing: 0.02em; }
  .wo-car-sub { font-size: 12px; color: var(--steel-muted); margin-top: 2px; letter-spacing: 0.06em; text-transform: uppercase; }
  .wo-vin { font-size: 11px; color: var(--steel-muted); font-family: monospace; margin-top: 4px; }
  .wo-items { padding: 0 20px; }
  .wo-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid var(--steel-line);
  }
  .wo-item:last-child { border-bottom: none; }
  .wo-item-left { display: flex; align-items: center; gap: 10px; }
  .wo-item-icon {
    width: 30px; height: 30px; border-radius: 3px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--steel-border);
    display: flex; align-items: center; justify-content: center; font-size: 14px;
  }
  .wo-item-name { font-size: 14px; font-weight: 600; color: var(--white); letter-spacing: 0.02em; }
  .wo-item-type { font-size: 11px; color: var(--steel-muted); margin-top: 1px; text-transform: uppercase; letter-spacing: 0.06em; }
  .wo-item-price {
    font-size: 17px; font-weight: 700; color: var(--yellow-hot); letter-spacing: 0.02em;
  }
  .wo-item-price.parts { color: var(--steel-text); }
  .wo-total {
    background: var(--steel-mid); padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-top: 2px solid var(--yellow);
  }
  .wo-total-label { font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--steel-light); }
  .wo-total-val { font-size: 26px; font-weight: 900; color: var(--yellow); }
  .wo-footer {
    padding: 12px 20px; background: rgba(67,160,71,0.06);
    border-top: 1px solid rgba(67,160,71,0.15);
    display: flex; align-items: center; gap: 8px;
  }
  .wo-footer-icon { color: var(--green-ok); font-size: 14px; }
  .wo-footer-text { font-size: 12px; color: var(--green-ok); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }

  /* ─── SECTION COMMONS ─── */
  .section-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
  }
  .eyebrow-bar-sm { width: 24px; height: 2px; background: var(--yellow); }
  .eyebrow-lbl {
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
    font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--yellow);
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(38px, 4.5vw, 58px); font-weight: 900;
    line-height: 1.0; color: var(--white); text-transform: uppercase;
    letter-spacing: 0.01em; margin-bottom: 16px;
  }
  .section-title .yl { color: var(--yellow); }
  .section-body { font-size: 16px; color: var(--steel-text); line-height: 1.7; font-weight: 300; max-width: 540px; }

  /* ─── PAIN ─── */
  .pain { background: var(--steel-dark); padding: 100px 48px; border-top: 1px solid var(--steel-border); }
  .pain-inner { max-width: 1100px; margin: 0 auto; }
  .pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 56px; }
  .pain-card {
    background: var(--steel-panel); padding: 36px 28px;
    border: 1px solid var(--steel-border); transition: all 0.25s; cursor: default;
    position: relative; overflow: hidden;
  }
  .pain-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: var(--yellow); transform: scaleY(0); transition: transform 0.3s;
    transform-origin: bottom;
  }
  .pain-card:hover::before { transform: scaleY(1); }
  .pain-card:hover { background: rgba(245,196,0,0.03); border-color: rgba(245,196,0,0.2); }
  .pain-num {
    font-family: 'Barlow Condensed', sans-serif; font-size: 72px;
    font-weight: 900; color: rgba(245,196,0,0.08); line-height: 1; margin-bottom: 16px;
  }
  .pain-card h3 {
    font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--white); margin-bottom: 12px;
  }
  .pain-card p { font-size: 14px; color: var(--steel-text); line-height: 1.65; }
  .pain-warn {
    display: inline-flex; align-items: center; gap: 6px; margin-top: 14px;
    background: rgba(229,57,53,0.1); border: 1px solid rgba(229,57,53,0.25);
    color: var(--red-warn); padding: 5px 12px; font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .callout-strip {
    background: var(--yellow); padding: 20px 32px; margin-top: 48px;
    display: flex; align-items: center; gap: 16px;
    clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 16px 100%);
  }
  .callout-strip p { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 700; color: var(--steel-black); letter-spacing: 0.02em; text-transform: uppercase; }
  .callout-strip strong { font-size: 20px; }

  /* ─── FEATURES ─── */
  .features { background: var(--steel-black); padding: 100px 48px; border-top: 1px solid var(--steel-border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .features-layout {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: start; margin-top: 64px;
  }
  .feat-list { display: grid; gap: 6px; }
  .feat-row {
    display: flex; gap: 18px; padding: 22px 24px;
    background: var(--steel-dark); border: 1px solid var(--steel-border);
    transition: all 0.25s; cursor: default;
  }
  .feat-row:hover { background: var(--steel-panel); border-left: 3px solid var(--yellow); padding-left: 22px; }
  .feat-icon-box {
    width: 44px; height: 44px; flex-shrink: 0;
    background: rgba(245,196,0,0.08); border: 1px solid rgba(245,196,0,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .feat-text h4 {
    font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.05em; color: var(--white); margin-bottom: 6px;
  }
  .feat-text p { font-size: 13px; color: var(--steel-text); line-height: 1.6; }
  .feat-badge {
    display: inline-block; margin-top: 8px;
    background: rgba(245,196,0,0.08); border: 1px solid rgba(245,196,0,0.2);
    color: var(--yellow); padding: 2px 8px; font-size: 10px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
  }

  /* DASHBOARD MOCKUP */
  .dash-mockup {
    background: var(--steel-dark); border: 1px solid var(--steel-border);
    border-top: 2px solid var(--yellow); border-radius: 4px; overflow: hidden;
    box-shadow: 0 24px 56px rgba(0,0,0,0.6);
  }
  .dash-top {
    background: var(--steel-mid); padding: 12px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--steel-border);
  }
  .dash-title {
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--steel-light);
  }
  .dash-status { display: flex; align-items: center; gap: 6px; }
  .dash-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green-ok); animation: pulse 2s infinite; }
  .dash-live { font-size: 11px; color: var(--green-ok); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
  .dash-metrics {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid var(--steel-border);
  }
  .metric-box {
    padding: 16px 18px; border-right: 1px solid var(--steel-border);
    transition: background 0.2s;
  }
  .metric-box:last-child { border-right: none; }
  .metric-box:hover { background: rgba(245,196,0,0.03); }
  .metric-lbl { font-size: 10px; color: var(--steel-muted); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
  .metric-val {
    font-family: 'Barlow Condensed', sans-serif; font-size: 28px;
    font-weight: 900; color: var(--yellow);
  }
  .metric-val.green { color: var(--green-ok); }
  .metric-val.white { color: var(--white); }
  .metric-delta { font-size: 11px; color: var(--green-ok); margin-top: 3px; }
  .dash-wo-list { padding: 0 20px; }
  .dash-wo-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid var(--steel-line);
    transition: background 0.2s;
  }
  .dash-wo-row:last-child { border-bottom: none; }
  .dash-wo-left { display: flex; align-items: center; gap: 10px; }
  .wo-num {
    font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; color: var(--steel-muted); background: var(--steel-panel);
    padding: 2px 7px; border: 1px solid var(--steel-border);
  }
  .wo-car { font-size: 14px; font-weight: 600; color: var(--white); }
  .wo-service { font-size: 11px; color: var(--steel-muted); margin-top: 1px; text-transform: uppercase; letter-spacing: 0.06em; }
  .wo-right { text-align: right; }
  .wo-price { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 700; color: var(--yellow); }
  .wo-st { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px; }
  .wo-st.in-progress { color: var(--orange); }
  .wo-st.ready { color: var(--green-ok); }
  .wo-st.waiting { color: var(--red-warn); }
  .dash-footer {
    background: var(--steel-mid); padding: 12px 20px;
    border-top: 1px solid var(--steel-border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .dash-footer-lbl { font-size: 12px; color: var(--steel-muted); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
  .dash-footer-val { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 900; color: var(--yellow); }

  /* ─── MORE FEATURES ─── */
  .more-feat { background: var(--steel-dark); padding: 80px 48px; border-top: 1px solid var(--steel-border); }
  .more-feat-inner { max-width: 1100px; margin: 0 auto; }
  .more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 52px; }
  .more-card {
    background: var(--steel-panel); border: 1px solid var(--steel-border);
    padding: 32px 28px; transition: all 0.25s; cursor: default; position: relative;
  }
  .more-card:hover { background: rgba(245,196,0,0.03); border-color: rgba(245,196,0,0.25); }
  .more-card-num {
    font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--yellow);
    margin-bottom: 12px;
  }
  .more-card-icon { font-size: 28px; margin-bottom: 14px; }
  .more-card h3 {
    font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.05em; color: var(--white); margin-bottom: 10px;
  }
  .more-card p { font-size: 13px; color: var(--steel-text); line-height: 1.65; }

  /* ─── COMPARISON ─── */
  .comparison { background: var(--steel-black); padding: 100px 48px; border-top: 1px solid var(--steel-border); }
  .comparison-inner { max-width: 920px; margin: 0 auto; }
  .comp-table {
    background: var(--steel-dark); border: 1px solid var(--steel-border);
    border-top: 2px solid var(--yellow); margin-top: 52px; overflow: hidden;
  }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--steel-mid); }
  .ch { padding: 18px 24px; }
  .ch.feat { font-size: 11px; color: var(--steel-muted); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  .ch.iris {
    font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--yellow);
    display: flex; align-items: center; gap: 10px;
  }
  .ch.other {
    font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700;
    text-transform: uppercase; color: var(--steel-muted); letter-spacing: 0.04em;
  }
  .iris-badge-tag {
    background: var(--yellow); color: var(--steel-black);
    font-size: 9px; font-family: 'Barlow', sans-serif; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 2px 7px;
  }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--steel-border); transition: background 0.2s; }
  .comp-row:hover { background: rgba(255,255,255,0.02); }
  .cc { padding: 14px 24px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
  .cc.feat { color: var(--white); font-weight: 500; }
  .cc.iris-v { color: var(--steel-text); font-weight: 500; }
  .cc.other-v { color: var(--steel-muted); }
  .ck { color: var(--green-ok); font-weight: 700; font-size: 16px; }
  .cx { color: var(--red-warn); font-weight: 700; font-size: 16px; }
  .price-row-c { background: rgba(245,196,0,0.04); border-top: 2px solid rgba(245,196,0,0.2) !important; }
  .big-p-iris { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 900; color: var(--yellow) !important; }
  .big-p-other { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; color: var(--red-warn) !important; }

  /* ─── TESTIMONIALS ─── */
  .testimonials { background: var(--steel-dark); padding: 100px 48px; border-top: 1px solid var(--steel-border); }
  .testimonials-inner { max-width: 1100px; margin: 0 auto; }
  .testi-head { margin-bottom: 56px; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
  .testi-card {
    background: var(--steel-panel); border: 1px solid var(--steel-border);
    padding: 36px 28px; transition: all 0.25s;
  }
  .testi-card:hover { border-top: 2px solid var(--yellow); margin-top: -1px; }
  .testi-stars { color: var(--yellow); font-size: 14px; letter-spacing: 2px; margin-bottom: 14px; }
  .testi-q {
    font-family: 'Barlow Condensed', sans-serif; font-size: 44px;
    line-height: 1; color: var(--yellow); opacity: 0.3; margin-bottom: 6px; font-weight: 900;
  }
  .testi-text { font-size: 15px; color: var(--steel-text); line-height: 1.7; margin-bottom: 24px; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-av {
    width: 44px; height: 44px; flex-shrink: 0;
    background: var(--yellow); color: var(--steel-black);
    font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900;
    display: flex; align-items: center; justify-content: center;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
  .testi-name { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--white); }
  .testi-role { font-size: 12px; color: var(--steel-muted); margin-top: 2px; }

  /* ─── PRICING ─── */
  .pricing { background: var(--steel-black); padding: 100px 48px; border-top: 1px solid var(--steel-border); }
  .pricing-inner { max-width: 760px; margin: 0 auto; }
  .pricing-card {
    background: var(--steel-dark); border: 1px solid var(--steel-border);
    border-top: 3px solid var(--yellow); padding: 52px;
    margin-top: 52px; position: relative; overflow: hidden;
  }
  .pricing-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--yellow), var(--orange), var(--yellow));
    background-size: 200%; animation: shimmer 3s linear infinite;
  }
  .p-pill {
    display: inline-block; background: var(--yellow); color: var(--steel-black);
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 900;
    letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 16px; margin-bottom: 18px;
  }
  .p-name {
    font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--white); margin-bottom: 8px;
  }
  .p-amount {
    font-family: 'Barlow Condensed', sans-serif; font-size: 92px; font-weight: 900;
    color: var(--yellow); line-height: 1; margin: 16px 0 4px;
  }
  .p-amount sup { font-size: 36px; vertical-align: top; margin-top: 18px; }
  .p-per { font-size: 15px; color: var(--steel-muted); margin-bottom: 36px; letter-spacing: 0.04em; }
  .p-feats { margin: 28px 0; }
  .p-feat {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 0; border-bottom: 1px solid var(--steel-border);
    font-size: 15px; color: var(--steel-text);
  }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-ok); font-size: 16px; font-weight: 700; }
  .p-cta {
    width: 100%; background: var(--yellow); color: var(--steel-black);
    padding: 18px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: 0.1em; text-transform: uppercase;
    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    transition: all 0.25s;
  }
  .p-cta:hover { background: var(--yellow-hot); transform: translateY(-2px); }
  .p-note { font-size: 13px; color: var(--steel-muted); margin-top: 14px; text-align: center; }

  /* ─── CTA BANNER ─── */
  .cta-banner {
    background: var(--yellow); padding: 80px 48px; text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-banner::before {
    content: ''; position: absolute; inset: 0;
    background-image: linear-gradient(var(--steel-black) 1px, transparent 1px),
      linear-gradient(90deg, var(--steel-black) 1px, transparent 1px);
    background-size: 32px 32px; opacity: 0.07;
  }
  .cta-inner { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; }
  .cta-icon-big { font-size: 56px; display: block; margin-bottom: 20px; animation: float 4s ease-in-out infinite; }
  .cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(42px, 6vw, 72px); font-weight: 900; line-height: 0.95;
    color: var(--steel-black); text-transform: uppercase; letter-spacing: 0.01em; margin-bottom: 20px;
  }
  .cta-sub { font-size: 17px; color: rgba(14,15,17,0.7); line-height: 1.7; margin-bottom: 40px; font-weight: 400; }
  .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-dark {
    background: var(--steel-black); color: var(--yellow);
    padding: 18px 48px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: all 0.25s;
  }
  .cta-btn-dark:hover { background: var(--steel-dark); transform: translateY(-2px); }
  .cta-btn-outline-dark {
    background: transparent; color: var(--steel-black);
    padding: 16px 44px; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase;
    border: 2px solid var(--steel-black); transition: all 0.25s;
  }
  .cta-btn-outline-dark:hover { background: var(--steel-black); color: var(--yellow); }

  /* ─── FOOTER ─── */
  .footer {
    background: var(--steel-black); padding: 32px 48px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
    border-top: 1px solid var(--steel-border);
  }
  .footer-copy { font-size: 13px; color: var(--steel-muted); }
  .footer-copy strong { color: var(--yellow); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--steel-muted); cursor: pointer; transition: color 0.2s; letter-spacing: 0.04em; text-transform: uppercase; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 12px; }
  .f-lnk:hover { color: var(--yellow); }

  /* ─── MODAL ─── */
  .modal-ov {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.88); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .modal-box {
    background: var(--steel-dark); border: 1px solid var(--steel-border);
    border-top: 3px solid var(--yellow);
    padding: 48px; max-width: 480px; width: 100%;
    position: relative; animation: fadeUp 0.3s ease;
    box-shadow: 0 40px 80px rgba(0,0,0,0.8);
  }
  .modal-x {
    position: absolute; top: 16px; right: 16px;
    background: var(--steel-panel); border: 1px solid var(--steel-border);
    color: var(--steel-light); width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; transition: all 0.2s;
  }
  .modal-x:hover { border-color: var(--yellow); color: var(--yellow); }
  .modal-h {
    font-family: 'Barlow Condensed', sans-serif; font-size: 32px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--white); margin-bottom: 6px;
  }
  .modal-s { color: var(--steel-muted); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 18px; }
  .f-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--yellow);
    margin-bottom: 6px; display: block;
  }
  .f-input {
    width: 100%; padding: 12px 16px;
    background: var(--steel-panel); border: 1px solid var(--steel-border);
    font-size: 14px; font-family: 'Barlow', sans-serif; color: var(--white);
    outline: none; transition: border-color 0.2s;
  }
  .f-input::placeholder { color: var(--steel-muted); }
  .f-input:focus { border-color: var(--yellow); }
  .f-btn {
    width: 100%; background: var(--yellow); color: var(--steel-black);
    padding: 15px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 8px;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: all 0.25s;
  }
  .f-btn:hover { background: var(--yellow-hot); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-big { font-size: 52px; display: block; margin-bottom: 16px; }
  .success-h {
    font-family: 'Barlow Condensed', sans-serif; font-size: 30px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--white); margin-bottom: 10px;
  }
  .success-p { color: var(--steel-text); font-size: 14px; line-height: 1.6; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-center { display: none; }
    .hero { padding: 112px 20px 64px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-stats { flex-wrap: wrap; gap: 24px; }
    .pain-grid, .more-grid, .testi-grid { grid-template-columns: 1fr; }
    .features-layout { grid-template-columns: 1fr; }
    .pain, .features, .more-feat, .comparison, .testimonials, .pricing, .cta-banner { padding: 70px 20px; }
    .comp-head, .comp-row { grid-template-columns: 1.2fr 1fr 1fr; }
    .cc, .ch { padding: 12px 14px; font-size: 12px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
    .pricing-card { padding: 36px 24px; }
    .callout-strip { clip-path: none; }
  }
`;

const workOrders = [
  { num: "WO-1042", car: "2019 Ford F-150", service: "Transmission Service", price: "$680", status: "in-progress", statusLabel: "In Progress" },
  { num: "WO-1041", car: "2021 Honda Civic", service: "Brake Pad Replacement", price: "$320", status: "ready", statusLabel: "Ready for Pickup" },
  { num: "WO-1040", car: "2017 Chevy Tahoe", service: "Engine Diagnostics", price: "$185", status: "waiting", statusLabel: "Waiting on Parts" },
  { num: "WO-1039", car: "2020 Toyota Camry", service: "Oil Change + Inspection", price: "$95", status: "ready", statusLabel: "Ready for Pickup" },
];

const mainFeatures = [
  { icon: "🔧", title: "Work Order Management", desc: "Create, assign, and track every job from intake to invoice. Technicians update status in real time from the bay.", tag: "Shop-Specific" },
  { icon: "🚗", title: "Vehicle History Tracking", desc: "Every car gets a full service record — VIN, mileage, past work, recommended services. Customers trust you more.", tag: "Retention Driver" },
  { icon: "📦", title: "Parts Inventory Control", desc: "Track parts stock, set reorder alerts, and link parts directly to work orders. Never lose margin to untracked inventory.", tag: "Profit Recovery" },
  { icon: "🧾", title: "Service-to-Invoice in One Click", desc: "When the work's done, generate a professional invoice with itemized labor and parts — sent automatically to the customer.", tag: "Saves 40 min/day" },
];

const moreFeatures = [
  { icon: "💳", title: "Iris Pay at the Counter", desc: "Accept card and mobile payments at pickup. Every transaction auto-posts to your books." },
  { icon: "📊", title: "Real-Time Shop P&L", desc: "See labor revenue, parts margin, and net income update live — day by day, not month by month." },
  { icon: "👨‍🔧", title: "Technician Tracking", desc: "Log hours per job per tech. Calculate labor cost vs billed labor. See who's generating margin." },
  { icon: "📬", title: "Automated Customer Reminders", desc: "Send service reminders by SMS or email — oil changes, inspections, seasonal checks. Keeps bays full." },
  { icon: "📄", title: "Supplier & Parts POs", desc: "Order parts from suppliers directly in the platform. Track delivery status and auto-match to work orders." },
  { icon: "📈", title: "Monthly Business Reports", desc: "Revenue by service type, parts margin, average ticket size, technician efficiency — ready for your accountant." },
];

const testimonials = [
  { q: "Before Iris Financial, invoicing was the last thing we did at 9pm. Now it fires automatically when we mark a job complete. We get paid 2 days faster on average.", name: "Mike D.", role: "Owner — D&M Auto Repair, Phoenix AZ", init: "M" },
  { q: "The parts inventory tracking alone recovered about $800/month in parts we were using but not billing. That's almost $10k a year we were leaving on the table.", name: "Sandra R.", role: "Shop Manager — SR Automotive, Nashville TN", init: "S" },
  { q: "We have 4 bays and 6 techs. I can see every open work order, who's assigned, and what's waiting on parts — from my phone. That's the control I needed.", name: "Carlos T.", role: "Owner — Precision Auto Works, Miami FL", init: "C" },
];

export default function AutoShopLandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", shop: "", email: "", bays: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  const tickerContent = [
    { text: "Work Orders", cls: "" }, { text: "Vehicle History", cls: "" },
    { text: "Parts Inventory", cls: "" }, { text: "Auto Invoicing", cls: "ok" },
    { text: "Technician Tracking", cls: "" }, { text: "4 WOs Ready for Pickup", cls: "ok" },
    { text: "2 Waiting on Parts", cls: "warn" }, { text: "Today's Revenue: $3,240", cls: "ok" },
  ];

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-mark">I</div>
          <div className="nav-wordmark">Iris <span>Financial</span></div>
        </div>
        <div className="nav-center">
          <span className="nav-item">Features</span>
          <span className="nav-item">Pricing</span>
          <span className="nav-item">Demo</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      {/* STATUS BAR */}
      <div className="status-bar">
        <div className="status-ticker">
          {[...tickerContent, ...tickerContent].map((item, i) => (
            <span key={i} className={`status-item ${item.cls}`}>
              {item.text} <span className="status-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-scanline" />
        <div className="hero-glow" />
        <div className="hero-layout">
          <div>
            <div className="hero-eyebrow">
              <div className="eyebrow-bar" />
              <span className="eyebrow-text">Built for Auto Repair Shops</span>
            </div>
            <h1 className="hero-title">
              Run every<br />
              <span className="yellow">bay.</span><br />
              Bill every<br />
              job.
            </h1>
            <p className="hero-sub">
              Work orders, vehicle history, parts inventory, and auto-invoicing — one platform built specifically for auto repair shops. Know your numbers. Get paid faster. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-yellow" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-outline">Watch Demo ▶</button>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-val">$0</div>
                <div className="stat-lbl">to get started</div>
              </div>
              <div>
                <div className="stat-val">~$800</div>
                <div className="stat-lbl">avg parts recovered/mo</div>
              </div>
              <div>
                <div className="stat-val">2 days</div>
                <div className="stat-lbl">faster payment avg</div>
              </div>
            </div>
          </div>

          {/* WORK ORDER CARD */}
          <div className="hero-right">
            <div className="wo-card">
              <div className="wo-header">
                <span className="wo-title">Active Shop Dashboard</span>
                <span className="wo-badge open">4 Open WOs</span>
              </div>
              <div className="wo-vehicle">
                <span className="wo-car-icon">🔧</span>
                <div>
                  <div className="wo-car-name">WO-1042 — 2019 Ford F-150</div>
                  <div className="wo-car-sub">Transmission Service · Bay 2 · Tech: Marco</div>
                  <div className="wo-vin">VIN: 1FTEW1EP5KFA12345 · 87,420 mi</div>
                </div>
                <span className="wo-badge warn" style={{ marginLeft: "auto", flexShrink: 0 }}>In Progress</span>
              </div>
              <div className="wo-items">
                {[
                  { icon: "⚙️", name: "Transmission Fluid Flush", type: "Labor", price: "$180", isLabor: true },
                  { icon: "🛢️", name: "Transmission Fluid 6qt", type: "Parts", price: "$94", isLabor: false },
                  { icon: "🔩", name: "Filter Replacement", type: "Labor", price: "$65", isLabor: true },
                  { icon: "📋", name: "Multi-Point Inspection", type: "Labor", price: "$0 — Complimentary", isLabor: true },
                ].map((item, i) => (
                  <div className="wo-item" key={i}>
                    <div className="wo-item-left">
                      <div className="wo-item-icon">{item.icon}</div>
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
                <span className="wo-total-label">Work Order Total</span>
                <span className="wo-total-val">$680.00</span>
              </div>
              <div className="wo-footer">
                <span className="wo-footer-icon">✓</span>
                <span className="wo-footer-text">Invoice auto-sends on job completion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-inner">
          <div className="section-eyebrow">
            <div className="eyebrow-bar-sm" />
            <span className="eyebrow-lbl">The real problem</span>
          </div>
          <h2 className="section-title">Most shops lose money<br />on jobs they <span className="yl">already did.</span></h2>
          <p className="section-body">Not from bad work — from bad tracking. Parts not billed. Labor underestimated. Invoices delayed. It adds up to thousands per month.</p>
          <div className="pain-grid">
            {[
              { num: "01", title: "Parts used, not billed", body: "A technician grabs a gasket from the shelf. It never makes it onto the invoice. Multiply that by 50 jobs a month.", warn: "Up to $1,200/mo lost" },
              { num: "02", title: "Invoices sent 3 days late", body: "The job is done Tuesday. The invoice goes out Friday. Cash stays locked up. Customers forget. Payment drags.", warn: "Avg 4.5 day delay" },
              { num: "03", title: "No visibility across bays", body: "You walk the floor to know what's happening. You have no dashboard, no status board, no way to see bottlenecks without leaving your desk.", warn: "Operational blind spot" },
            ].map((p, i) => (
              <div className="pain-card" key={i}>
                <div className="pain-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="pain-warn">⚠ {p.warn}</div>
              </div>
            ))}
          </div>
          <div className="callout-strip">
            <span style={{ fontSize: 24 }}>🔩</span>
            <p>Auto repair shops using Iris Financial recover an average of <strong>$800–$1,400/month</strong> in previously untracked parts and unbilled labor within the first 60 days.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <div className="section-eyebrow">
            <div className="eyebrow-bar-sm" />
            <span className="eyebrow-lbl">Core features</span>
          </div>
          <h2 className="section-title">Built for the <span className="yl">bay,</span><br />not the boardroom.</h2>
          <div className="features-layout">
            <div className="feat-list">
              {mainFeatures.map((f, i) => (
                <div className="feat-row" key={i}>
                  <div className="feat-icon-box">{f.icon}</div>
                  <div className="feat-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                    <div className="feat-badge">{f.tag}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* SHOP DASHBOARD MOCKUP */}
            <div className="dash-mockup">
              <div className="dash-top">
                <span className="dash-title">Shop Overview — Today</span>
                <div className="dash-status">
                  <div className="dash-dot" />
                  <span className="dash-live">Live</span>
                </div>
              </div>
              <div className="dash-metrics">
                <div className="metric-box">
                  <div className="metric-lbl">Revenue Today</div>
                  <div className="metric-val">$3,240</div>
                  <div className="metric-delta">↑ 12% vs yesterday</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Open WOs</div>
                  <div className="metric-val white">8</div>
                  <div className="metric-delta" style={{ color: "var(--steel-muted)" }}>4 bays active</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Parts Margin</div>
                  <div className="metric-val green">42%</div>
                  <div className="metric-delta">Target: 40%</div>
                </div>
              </div>
              <div className="dash-wo-list">
                {workOrders.map((wo, i) => (
                  <div className="dash-wo-row" key={i}>
                    <div className="dash-wo-left">
                      <span className="wo-num">{wo.num}</span>
                      <div>
                        <div className="wo-car">{wo.car}</div>
                        <div className="wo-service">{wo.service}</div>
                      </div>
                    </div>
                    <div className="wo-right">
                      <div className="wo-price">{wo.price}</div>
                      <div className={`wo-st ${wo.status}`}>{wo.statusLabel}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dash-footer">
                <span className="dash-footer-lbl">Today's Collected</span>
                <span className="dash-footer-val">$2,890</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MORE FEATURES */}
      <section className="more-feat">
        <div className="more-feat-inner">
          <div className="section-eyebrow">
            <div className="eyebrow-bar-sm" />
            <span className="eyebrow-lbl">Everything else</span>
          </div>
          <h2 className="section-title">One platform.<br /><span className="yl">Zero juggling.</span></h2>
          <div className="more-grid">
            {moreFeatures.map((f, i) => (
              <div className="more-card" key={i}>
                <div className="more-card-num">0{i + 1}</div>
                <div className="more-card-icon">{f.icon}</div>
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
          <div className="section-eyebrow">
            <div className="eyebrow-bar-sm" />
            <span className="eyebrow-lbl">Side by side</span>
          </div>
          <h2 className="section-title">Iris Financial vs.<br /><span className="yl">Mitchell 1 + QuickBooks</span></h2>
          <div className="comp-table">
            <div className="comp-head">
              <div className="ch feat">Feature</div>
              <div className="ch iris">Iris Financial <span className="iris-badge-tag">Best</span></div>
              <div className="ch other">Mitchell 1 + QB</div>
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
                <div className="cc feat">{feat}</div>
                <div className="cc iris-v">
                  <span className={iris.startsWith("✓") ? "ck" : "cx"}>{iris.startsWith("✓") ? "✓" : "✗"}</span>
                  {iris.replace("✓ ", "").replace("✗ ", "")}
                </div>
                <div className="cc other-v">
                  <span className={other.startsWith("✓") ? "ck" : "cx"}>{other.startsWith("✓") ? "✓" : "✗"}</span>
                  {other.replace("✓ ", "").replace("✗ ", "")}
                </div>
              </div>
            ))}
            <div className="comp-row price-row-c" style={{ borderTop: "2px solid rgba(245,196,0,0.2)" }}>
              <div className="cc feat" style={{ fontWeight: 700 }}>Starting Price</div>
              <div className="cc iris-v"><span className="big-p-iris">$0/mo</span></div>
              <div className="cc other-v"><span className="big-p-other">$200+/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="testi-head">
            <div className="section-eyebrow">
              <div className="eyebrow-bar-sm" />
              <span className="eyebrow-lbl">From the shop floor</span>
            </div>
            <h2 className="section-title">What shop owners say</h2>
          </div>
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
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <div className="eyebrow-bar-sm" />
            <span className="eyebrow-lbl">Simple pricing</span>
          </div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Start free.<br /><span className="yl">Scale when ready.</span></h2>
          <div className="pricing-card">
            <div className="p-pill">Auto Shop Free Tier</div>
            <div className="p-name">Iris Financial — Auto Shop Edition</div>
            <div className="p-amount"><sup>$</sup>0</div>
            <div className="p-per">per month — forever free to start</div>
            <div className="p-feats">
              {[
                "Unlimited work orders & vehicle history",
                "Parts inventory tracking with reorder alerts",
                "Service-to-invoice automation (1-click)",
                "Technician assignment & hour tracking",
                "Iris Pay — card & mobile payment at counter",
                "Customer SMS/email service reminders",
                "Real-time shop P&L dashboard",
                "Supplier management & parts purchase orders",
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

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-inner">
          <span className="cta-icon-big">🔧</span>
          <h2 className="cta-title">Stop losing margin.<br />Start running a tighter shop.</h2>
          <p className="cta-sub">Every untracked part, every delayed invoice, every job without a work order is money leaving your shop. Iris Financial closes those gaps — free to start, 15 minutes to set up.</p>
          <div className="cta-btns">
            <button className="cta-btn-dark" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="cta-btn-outline-dark">Schedule a Demo</button>
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
                <div className="modal-h">Start Free Today</div>
                <div className="modal-s">Set up your shop account in 15 minutes. First work order ships same day.</div>
                <div className="f-group">
                  <label className="f-label">Your Name</label>
                  <input className="f-input" placeholder="Owner / Manager name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Shop Name</label>
                  <input className="f-input" placeholder="e.g. Precision Auto Works" value={form.shop} onChange={e => setForm({ ...form, shop: e.target.value })} />
                </div>
                <div className="f-group">
                  <label className="f-label">Email Address</label>
                  <input className="f-input" type="email" placeholder="you@yourshop.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
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
                <span className="success-big">🔧</span>
                <div className="success-h">Shop's open!</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--yellow)" }}>{form.email}</strong> now. You'll be tracking work orders before end of day.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
