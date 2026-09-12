import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --black: #0D0A07;
    --char: #1A1410;
    --panel: #201610;
    --border: rgba(255,255,255,0.07);
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

  @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(196,80,26,0.4); } 50% { box-shadow: 0 0 0 12px rgba(196,80,26,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 62px; padding: 0 48px;
    background: rgba(13,10,7,0.97); backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; gap: 10px; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 13px; font-weight: 500; color: var(--warm-gray); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--cream); }
  .nav-cta { background: var(--ember); color: white; padding: 9px 22px; border-radius: 4px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; transition: all 0.2s; }
  .nav-cta:hover { background: var(--ember-light); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(196,80,26,0.4); }

  /* SERVICE BAR — replaces ticker */
  .service-bar {
    position: fixed; top: 62px; left: 0; right: 0; z-index: 199;
    height: 34px; background: var(--panel);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    gap: 0;
  }
  .sb-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 28px; border-right: 1px solid var(--border);
    font-size: 12px; color: var(--warm-gray);
  }
  .sb-item:last-child { border-right: none; }
  .sb-val { color: var(--amber-light); font-weight: 600; }
  .sb-live { display: flex; align-items: center; gap: 6px; }
  .sb-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-fresh); animation: blink 2s infinite; }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--black);
    padding: 118px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 52px 52px;
  }
  .hero-glow { position: absolute; right: -200px; top: 50%; transform: translateY(-50%); width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(196,80,26,0.07) 0%, transparent 65%); pointer-events: none; }
  .hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; max-width: 1200px; margin: 0 auto; width: 100%; align-items: center; }
  .hero-label { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; color: var(--ember-light); margin-bottom: 22px; animation: fadeUp 0.5s ease both; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 6.5vw, 86px); font-weight: 700; line-height: 0.95; color: var(--cream); margin-bottom: 24px; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title em { font-style: italic; color: var(--ember-light); }
  .hero-title .amber { color: var(--amber-light); }
  .hero-sub { font-size: 16px; color: var(--warm-gray); line-height: 1.75; font-weight: 300; max-width: 460px; margin-bottom: 40px; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-ember { background: var(--ember); color: white; padding: 15px 36px; border-radius: 4px; border: none; cursor: pointer; font-weight: 600; font-size: 14px; letter-spacing: 0.03em; transition: all 0.25s; animation: pulse 2.5s infinite; }
  .btn-ember:hover { background: var(--ember-light); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(196,80,26,0.45); }
  .btn-ghost { background: transparent; color: var(--cream); padding: 13px 30px; border: 1px solid var(--border); border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 14px; transition: all 0.25s; }
  .btn-ghost:hover { border-color: var(--amber); color: var(--amber-light); }

  /* HERO RIGHT: MENU CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .menu-card { background: var(--char); border: 1px solid var(--border); border-top: 2px solid var(--ember); border-radius: 4px; overflow: hidden; box-shadow: 0 32px 64px rgba(0,0,0,0.7); }
  .mc-head { background: var(--panel); padding: 13px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
  .mc-head-title { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 600; color: var(--cream); }
  .mc-live { display: flex; align-items: center; gap: 6px; }
  .mc-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-fresh); animation: pulse 2s infinite; }
  .mc-live-txt { font-size: 11px; color: var(--green-fresh); font-weight: 600; letter-spacing: 0.06em; }
  .mc-tabs { display: flex; border-bottom: 1px solid var(--border); }
  .mc-tab { flex: 1; padding: 11px; text-align: center; font-size: 12px; font-weight: 600; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s; color: var(--warm-gray); border-bottom: 2px solid transparent; }
  .mc-tab.active { color: var(--ember-light); border-bottom-color: var(--ember); }
  .mc-items { padding: 0 20px; }
  .mc-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .mc-item:last-child { border-bottom: none; }
  .mc-item-left { display: flex; align-items: center; gap: 10px; }
  .mc-icon { font-size: 20px; }
  .mc-name { font-size: 14px; font-weight: 600; color: var(--cream); }
  .mc-sub { font-size: 11px; color: var(--warm-gray); margin-top: 1px; }
  .mc-val { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; }
  .mc-val.good { color: var(--green-fresh); }
  .mc-val.bad { color: var(--red-loss); }
  .mc-footer { background: var(--panel); padding: 14px 20px; border-top: 2px solid var(--ember); display: flex; align-items: center; justify-content: space-between; }
  .mc-footer-lbl { font-size: 12px; color: var(--warm-gray); font-weight: 500; letter-spacing: 0.04em; }
  .mc-footer-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: var(--amber-light); }

  /* PAIN — FULL-BLEED SPLIT */
  .pain { background: var(--char); padding: 0; border-top: 1px solid var(--border); }
  .pain-top { display: grid; grid-template-columns: 1fr 1fr; }
  .pain-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); }
  .pain-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: var(--ember); margin-bottom: 20px; }
  .pain-headline { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4.5vw, 56px); font-weight: 700; line-height: 1.05; color: var(--cream); margin-bottom: 24px; }
  .pain-headline em { font-style: italic; color: var(--ember-light); }
  .pain-deck { font-size: 16px; color: var(--warm-gray); line-height: 1.8; font-weight: 300; margin-bottom: 40px; }
  .pain-dish { background: rgba(196,80,26,0.06); border: 1px solid rgba(196,80,26,0.15); padding: 24px; }
  .pain-dish-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: var(--ember); margin-bottom: 14px; }
  .pain-dish-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--cream); margin-bottom: 16px; }
  .pain-dish-row { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
  .pain-dish-row:last-child { border-bottom: none; }
  .pain-dish-desc { color: var(--warm-gray); }
  .pain-dish-val { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; }
  .pain-dish-val.red { color: var(--red-loss); }
  .pain-dish-val.cream { color: var(--cream); }
  .pain-dish-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 12px; padding-top: 12px; border-top: 2px solid rgba(196,80,26,0.3); }
  .pain-dish-total-lbl { font-size: 14px; font-weight: 600; color: var(--warm-gray); }
  .pain-dish-total-val { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 700; color: var(--amber-light); }

  .pain-right { padding: 80px 48px 80px 40px; display: flex; flex-direction: column; gap: 40px; justify-content: center; }
  .pain-issue { padding-bottom: 40px; border-bottom: 1px solid var(--border); }
  .pain-issue:last-child { padding-bottom: 0; border-bottom: none; }
  .pain-issue-emoji { font-size: 28px; margin-bottom: 14px; display: block; }
  .pain-issue h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--cream); margin-bottom: 10px; }
  .pain-issue p { font-size: 14px; color: var(--warm-gray); line-height: 1.7; }

  /* FEATURES */
  .features { background: var(--black); padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: var(--ember); margin-bottom: 14px; }
  .s-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 700; line-height: 1.05; color: var(--cream); margin-bottom: 14px; }
  .s-title em { font-style: italic; color: var(--ember-light); }
  .s-body { font-size: 16px; color: var(--warm-gray); line-height: 1.75; font-weight: 300; max-width: 540px; }
  .features-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; margin-top: 60px; }
  .feat-list { display: grid; gap: 4px; }
  .feat-row { display: flex; gap: 16px; padding: 20px 22px; background: var(--char); border: 1px solid var(--border); border-radius: 3px; transition: all 0.25s; }
  .feat-row:hover { background: var(--panel); border-left: 3px solid var(--ember); padding-left: 20px; }
  .feat-icon { width: 42px; height: 42px; border-radius: 4px; flex-shrink: 0; background: rgba(196,80,26,0.1); border: 1px solid rgba(196,80,26,0.2); display: flex; align-items: center; justify-content: center; font-size: 19px; }
  .feat-h { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 700; color: var(--cream); margin-bottom: 6px; }
  .feat-p { font-size: 13px; color: var(--warm-gray); line-height: 1.6; }
  .feat-tag { display: inline-block; margin-top: 7px; background: rgba(196,80,26,0.08); border: 1px solid rgba(196,80,26,0.2); color: var(--ember-light); padding: 2px 8px; border-radius: 3px; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; }

  /* MENU ANALYSIS MOCKUP */
  .mockup { background: var(--char); border: 1px solid var(--border); border-top: 2px solid var(--ember); border-radius: 4px; overflow: hidden; box-shadow: 0 24px 56px rgba(0,0,0,0.6); }
  .mockup-top { background: var(--panel); padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
  .mockup-title { font-size: 13px; font-weight: 500; color: var(--warm-gray); letter-spacing: 0.04em; }
  .mockup-live { display: flex; align-items: center; gap: 6px; }
  .m-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-fresh); animation: pulse 2s infinite; }
  .m-live { font-size: 11px; color: var(--green-fresh); font-weight: 600; letter-spacing: 0.06em; }
  .mockup-metrics { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--border); }
  .mm { padding: 14px 16px; border-right: 1px solid var(--border); }
  .mm:last-child { border-right: none; }
  .mm-lbl { font-size: 10px; color: var(--warm-gray); font-weight: 500; letter-spacing: 0.08em; margin-bottom: 5px; }
  .mm-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: var(--amber-light); }
  .mm-val.cream { color: var(--cream); }
  .mm-val.green { color: var(--green-fresh); }
  .mm-delta { font-size: 11px; color: var(--green-fresh); margin-top: 2px; }
  .mockup-rows { padding: 0 4px; }
  .m-row { display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); border-radius: 3px; transition: background 0.15s; }
  .m-row:hover { background: rgba(255,255,255,0.02); }
  .m-row-left { display: flex; align-items: center; gap: 10px; }
  .m-dish { font-size: 14px; font-weight: 500; color: var(--cream); }
  .m-cost { font-size: 11px; color: var(--warm-gray); margin-top: 1px; }
  .m-margin { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 700; }
  .m-margin.ok { color: var(--green-fresh); }
  .m-margin.warn { color: var(--amber-light); }
  .m-margin.bad { color: var(--red-loss); }
  .mockup-foot { background: var(--panel); padding: 12px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .mockup-foot-lbl { font-size: 12px; color: var(--warm-gray); font-weight: 500; }
  .mockup-foot-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--amber-light); }

  /* FEATURE RAIL */
  .rail-section { background: var(--char); padding: 80px 0; border-top: 1px solid var(--border); overflow: hidden; }
  .rail-header { padding: 0 48px 36px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 3px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card { background: var(--panel); border: 1px solid var(--border); padding: 28px 24px; min-width: 240px; flex-shrink: 0; border-radius: 3px; transition: all 0.25s; }
  .rail-card:hover { border-color: rgba(196,80,26,0.3); background: rgba(196,80,26,0.04); }
  .rail-icon { font-size: 26px; margin-bottom: 12px; display: block; }
  .rail-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: var(--cream); margin-bottom: 8px; }
  .rail-card p { font-size: 13px; color: var(--warm-gray); line-height: 1.65; }
  .rail-hint { text-align: center; margin-top: 20px; font-size: 12px; color: var(--warm-gray); letter-spacing: 0.06em; }

  /* COMPARISON */
  .comparison { background: var(--black); padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap { background: var(--char); border: 1px solid var(--border); border-top: 2px solid var(--ember); border-radius: 4px; overflow: hidden; margin-top: 52px; box-shadow: 0 24px 56px rgba(0,0,0,0.5); }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--panel); }
  .ch { padding: 17px 22px; }
  .ch.f { font-size: 11px; color: var(--warm-gray); font-weight: 500; letter-spacing: 0.06em; }
  .ch.i { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: var(--ember-light); display: flex; align-items: center; gap: 8px; }
  .ch.o { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; color: var(--warm-gray); }
  .i-pill { background: var(--ember); color: white; font-size: 9px; font-family: 'DM Sans', sans-serif; font-weight: 700; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 2px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: rgba(255,255,255,0.015); }
  .cc { padding: 13px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.f { color: var(--cream); font-weight: 500; }
  .cc.i { color: var(--text-light); font-weight: 500; }
  .cc.o { color: var(--warm-gray); }
  .ck { color: var(--green-fresh); font-size: 16px; font-weight: 700; }
  .cx { color: var(--red-loss); font-size: 16px; font-weight: 700; }
  .price-row { background: rgba(196,80,26,0.04); border-top: 2px solid rgba(196,80,26,0.2) !important; }
  .big-i { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: var(--amber-light) !important; }
  .big-o { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: var(--warm-gray) !important; }

  /* TESTIMONIALS — EDITORIAL */
  .testimonials { background: var(--char); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-primary-wrap { background: var(--ember); padding: 56px 64px; margin-top: 52px; }
  .testi-primary-q { font-family: 'Cormorant Garamond', serif; font-size: 96px; font-weight: 700; color: rgba(255,255,255,0.15); line-height: 1; margin-bottom: -26px; }
  .testi-primary-text { font-family: 'Cormorant Garamond', serif; font-size: clamp(19px, 2.5vw, 25px); font-weight: 600; line-height: 1.45; color: white; margin-bottom: 36px; max-width: 800px; }
  .testi-primary-author { display: flex; align-items: center; gap: 16px; }
  .testi-primary-av { width: 46px; height: 46px; background: var(--black); color: var(--ember-light); font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 3px; flex-shrink: 0; }
  .testi-primary-name { font-weight: 600; font-size: 15px; color: white; }
  .testi-primary-role { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 2px; }
  .testi-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 3px; }
  .testi-secondary { background: var(--panel); border: 1px solid var(--border); padding: 36px; transition: background 0.2s; }
  .testi-secondary:hover { background: rgba(196,80,26,0.05); }
  .testi-sec-text { font-size: 15px; color: var(--warm-gray); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-sec-author { display: flex; align-items: center; gap: 12px; }
  .testi-sec-av { width: 38px; height: 38px; border-radius: 3px; background: var(--ember); color: white; font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-sec-name { font-weight: 600; font-size: 14px; color: var(--cream); }
  .testi-sec-role { font-size: 12px; color: var(--warm-gray); margin-top: 2px; }

  /* PRICING — SPLIT */
  .pricing { background: var(--black); border-top: 1px solid var(--border); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: center; }
  .pricing-amount { font-family: 'Cormorant Garamond', serif; font-size: 100px; font-weight: 700; color: var(--amber-light); line-height: 1; }
  .pricing-amount sup { font-size: 42px; vertical-align: top; margin-top: 20px; }
  .pricing-cadence { font-size: 15px; color: var(--warm-gray); margin: 8px 0 32px; }
  .pricing-left p { font-size: 15px; color: var(--warm-gray); line-height: 1.75; font-weight: 300; margin-bottom: 32px; }
  .pricing-cta { width: 100%; background: var(--ember); color: white; padding: 17px; border-radius: 4px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; letter-spacing: 0.03em; transition: all 0.25s; }
  .pricing-cta:hover { background: var(--ember-light); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(196,80,26,0.4); }
  .pricing-note { font-size: 13px; color: var(--warm-gray); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .p-feat { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--warm-gray); }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-fresh); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section { background: var(--ember); padding: 90px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px); background-size: 40px 40px; }
  .cta-inner { position: relative; z-index: 2; max-width: 660px; margin: 0 auto; }
  .cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(38px, 5.5vw, 64px); font-weight: 700; color: white; line-height: 1.05; margin-bottom: 18px; }
  .cta-sub { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-dark { background: var(--black); color: var(--amber-light); padding: 17px 48px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; border-radius: 4px; transition: all 0.25s; }
  .cta-btn-dark:hover { background: var(--char); transform: translateY(-2px); }
  .cta-btn-outline { background: transparent; color: white; padding: 15px 44px; cursor: pointer; font-weight: 600; font-size: 15px; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 4px; transition: all 0.25s; }
  .cta-btn-outline:hover { border-color: white; }

  /* FOOTER */
  .footer { background: var(--black); padding: 30px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid var(--border); }
  .footer-copy { font-size: 13px; color: var(--warm-gray); }
  .footer-copy strong { color: var(--ember-light); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--warm-gray); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--ember-light); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.88); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: var(--char); border: 1px solid var(--border); border-top: 3px solid var(--ember); border-radius: 4px; padding: 48px; max-width: 480px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(0,0,0,0.8); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--panel); border: 1px solid var(--border); color: var(--warm-gray); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; border-radius: 3px; }
  .modal-x:hover { border-color: var(--ember); color: var(--ember-light); }
  .modal-h { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--cream); margin-bottom: 6px; }
  .modal-s { color: var(--warm-gray); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: var(--ember-light); margin-bottom: 6px; display: block; }
  .f-input { width: 100%; padding: 12px 16px; background: var(--panel); border: 1px solid var(--border); font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--cream); outline: none; transition: border-color 0.2s; border-radius: 3px; }
  .f-input::placeholder { color: var(--warm-gray); }
  .f-input:focus { border-color: var(--ember); }
  .f-btn { width: 100%; background: var(--ember); color: white; padding: 15px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; border-radius: 3px; margin-top: 8px; transition: all 0.25s; }
  .f-btn:hover { background: var(--ember-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-emoji { font-size: 48px; display: block; margin-bottom: 14px; }
  .success-h { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--cream); margin-bottom: 10px; }
  .success-p { color: var(--warm-gray); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .service-bar { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .pain-top { grid-template-columns: 1fr; }
    .pain-left { padding: 60px 20px 40px; border-right: none; border-bottom: 1px solid var(--border); }
    .pain-right { padding: 40px 20px 60px; }
    .features-layout { grid-template-columns: 1fr; }
    .testi-secondary-grid { grid-template-columns: 1fr; }
    .pricing-layout { grid-template-columns: 1fr; }
    .pricing-left { padding: 60px 20px; border-right: none; border-bottom: 1px solid var(--border); }
    .pricing-right { padding: 60px 20px; }
    .features, .comparison, .testimonials, .cta-section { padding: 70px 20px; }
    .comp-head, .comp-row { grid-template-columns: 1.2fr 1fr 1fr; }
    .cc, .ch { padding: 12px 14px; font-size: 12px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
    .testi-primary-wrap { padding: 40px 28px; }
  }
`;

const mainFeatures = [
  { icon: "🧮", title: "Recipe Costing Engine", desc: "Calculate the exact food cost and margin for every dish — down to the gram. Updates automatically when supplier prices change.", tag: "Restaurant-Specific" },
  { icon: "📦", title: "Ingredient & Inventory Tracking", desc: "Track stock, flag low inventory, link to supplier orders. No more 86'd items that blindside a Friday service.", tag: "Saves Waste" },
  { icon: "🧾", title: "Supplier Management", desc: "All vendors, invoices, and POs in one place. Compare prices across suppliers automatically.", tag: "Cuts Costs" },
  { icon: "🖥️", title: "Built-in POS", desc: "Run the floor with a built-in register. Every transaction flows directly into your books — no middleware, no lag.", tag: "No Integration Needed" },
];

const railFeatures = [
  { icon: "📊", title: "Daily Sales Reports", desc: "Revenue, food cost %, labor %, and net margin — every day, not month-end." },
  { icon: "💳", title: "Iris Pay Processing", desc: "Cards and mobile money at the counter. Fast payouts to your account." },
  { icon: "🧑‍🍳", title: "Staff & Payroll", desc: "Track hours, calculate wages, run payroll — same platform." },
  { icon: "📄", title: "Catering Invoicing", desc: "Professional invoices with logo and QR code for corporate and event clients." },
  { icon: "📈", title: "Real-Time P&L", desc: "Profit and loss updates live as transactions happen. Know before your accountant does." },
  { icon: "🌍", title: "Multi-Location", desc: "Multiple kitchens or cities? Consolidated reporting with per-location breakdowns." },
];

const menuData = [
  { icon: "🥩", name: "Grilled Ribeye", cost: "Food cost: 28%", margin: "+$42.00", cls: "ok" },
  { icon: "🍝", name: "Pasta Carbonara", cost: "Food cost: 18%", margin: "+$24.00", cls: "ok" },
  { icon: "🥗", name: "Caesar Salad", cost: "Food cost: 41% ⚠", margin: "-$2.00", cls: "bad" },
  { icon: "🍰", name: "Lava Cake", cost: "Food cost: 22%", margin: "+$11.00", cls: "warn" },
];

const testimonials = [
  { q: "The recipe costing feature alone changed everything. We found three dishes losing money — repriced them and added $4,200 to monthly profit without changing a single supplier or cutting a single staff hour.", name: "Owner T. Nguyen", role: "Pho & More Restaurant, Houston TX", init: "T", primary: true },
  { q: "We were using Square and QuickBooks and the data never matched. Iris Financial connects both — every sale is in the books automatically. I stopped doing weekend reconciliation.", name: "Chef Marcus B.", role: "La Maison Bistro, Chicago IL", init: "M", primary: false },
  { q: "I finally understand my food cost percentage every week, not every quarter. That visibility changed how we order, how we menu plan, everything.", name: "GM Fatima A.", role: "Spice Garden, Atlanta GA", init: "F", primary: false },
];

export default function RestaurantPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", restaurant: "", email: "", type: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");

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
        body: JSON.stringify({ name: form.name, restaurant: form.restaurant, email: form.email, restaurant_type: form.type, vertical: "Restaurant" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=restaurant&ref=landing"; }, 2000);
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

      {/* SERVICE BAR */}
      <div className="service-bar">
        <div className="sb-item"><div className="sb-live"><div className="sb-dot" /></div><span className="sb-val">Dinner service</span><span>active</span></div>
        <div className="sb-item"><span className="sb-val">$3,240</span><span>revenue today</span></div>
        <div className="sb-item"><span className="sb-val">27.3%</span><span>food cost this week</span></div>
        <div className="sb-item"><span className="sb-val">Caesar Salad</span><span>⚠ losing margin</span></div>
        <div className="sb-item"><span className="sb-val">32 covers</span><span>tonight so far</span></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-layout">
          <div>
            <div className="hero-label">Built for Restaurants & Hospitality</div>
            <h1 className="hero-title">
              Know your<br />
              <em>margins.</em><br />
              Run a leaner<br />
              <span className="amber">kitchen.</span>
            </h1>
            <p className="hero-sub">Recipe costing, inventory tracking, POS integration, and real-time P&L — one platform built for restaurants. Free to start.</p>
            <div className="hero-actions">
              <button className="btn-ember" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="menu-card">
              <div className="mc-head">
                <span className="mc-head-title">Tonight's Menu Dashboard</span>
                <div className="mc-live"><div className="mc-live-dot" /><span className="mc-live-txt">Live</span></div>
              </div>
              <div className="mc-tabs">
                {["menu", "inventory"].map(t => (
                  <div key={t} className={`mc-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                    {t === "menu" ? "Margin by Dish" : "Inventory Alerts"}
                  </div>
                ))}
              </div>
              {activeTab === "menu" ? (
                <>
                  <div className="mc-items">
                    {menuData.map((item, i) => (
                      <div className="mc-item" key={i}>
                        <div className="mc-item-left">
                          <span className="mc-icon">{item.icon}</span>
                          <div><div className="mc-name">{item.name}</div><div className="mc-sub">{item.cost}</div></div>
                        </div>
                        <div className={`mc-val ${item.cls}`}>{item.margin}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mc-footer">
                    <span className="mc-footer-lbl">Net Margin Tonight</span>
                    <span className="mc-footer-val">+$1,847</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="mc-items">
                    {[
                      { icon: "⚠️", name: "Ribeye (12oz)", sub: "3 portions left · reorder needed", val: "LOW", cls: "bad" },
                      { icon: "✓", name: "Pasta (rigatoni)", sub: "Full stock · 4 service days", val: "OK", cls: "ok" },
                      { icon: "⚠️", name: "Truffle Oil", sub: "2 bottles · below threshold", val: "LOW", cls: "bad" },
                      { icon: "✓", name: "Heavy Cream", sub: "Adequate stock", val: "OK", cls: "ok" },
                    ].map((item, i) => (
                      <div className="mc-item" key={i}>
                        <div className="mc-item-left">
                          <span className="mc-icon">{item.icon}</span>
                          <div><div className="mc-name">{item.name}</div><div className="mc-sub">{item.sub}</div></div>
                        </div>
                        <div className={`mc-val ${item.cls}`}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mc-footer">
                    <span className="mc-footer-lbl">POs auto-sent to suppliers</span>
                    <span className="mc-footer-val">2 pending</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN — SPLIT */}
      <section className="pain">
        <div className="pain-top">
          <div className="pain-left">
            <div className="pain-eyebrow">The margin problem</div>
            <h2 className="pain-headline">Your most popular dish<br />might be your biggest<br /><em>money loser.</em></h2>
            <p className="pain-deck">Restaurants price menus on instinct, competitor rates, or "what feels right." When you cost it out properly — ingredient, labor, waste, portioning variance — the numbers rarely match the assumption.</p>
            <div className="pain-dish">
              <div className="pain-dish-label">A typical pasta dish — the full cost</div>
              <div className="pain-dish-name">Truffle Rigatoni — priced at $28</div>
              {[
                { desc: "Ingredients (pasta, cream, truffle oil, parmesan)", val: "-$7.20", cls: "red" },
                { desc: "Labor — 12 min prep + 8 min cook at $20/hr", val: "-$6.67", cls: "red" },
                { desc: "Waste factor (8% of ingredient cost)", val: "-$0.58", cls: "red" },
                { desc: "Overhead allocation (rent, utilities, per cover)", val: "-$4.80", cls: "red" },
              ].map((r, i) => (
                <div className="pain-dish-row" key={i}>
                  <span className="pain-dish-desc">{r.desc}</span>
                  <span className={`pain-dish-val ${r.cls}`}>{r.val}</span>
                </div>
              ))}
              <div className="pain-dish-total">
                <span className="pain-dish-total-lbl">Real margin per cover</span>
                <span className="pain-dish-total-val">$8.75</span>
              </div>
            </div>
          </div>
          <div className="pain-right">
            {[
              { emoji: "🔄", title: "POS and accounting never match", body: "Square says one number. QuickBooks says another. Your accountant reconciles them at month-end. By then the service decisions that caused the gap are three weeks old." },
              { emoji: "📉", title: "Food cost is a monthly surprise", body: "You check your food cost percentage once a month when your accountant sends the report. By then you've already run 30 services at the wrong margin without knowing." },
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
          <div className="s-label">Core features</div>
          <h2 className="s-title">Built for the kitchen,<br />not the <em>accounting firm.</em></h2>
          <div className="features-layout">
            <div className="feat-list">
              {mainFeatures.map((f, i) => (
                <div className="feat-row" key={i}>
                  <div className="feat-icon">{f.icon}</div>
                  <div><div className="feat-h">{f.title}</div><p className="feat-p">{f.desc}</p><div className="feat-tag">{f.tag}</div></div>
                </div>
              ))}
            </div>
            <div className="mockup">
              <div className="mockup-top">
                <span className="mockup-title">Menu Margin Analysis — This Week</span>
                <div className="mockup-live"><div className="m-dot" /><span className="m-live">Live</span></div>
              </div>
              <div className="mockup-metrics">
                <div className="mm"><div className="mm-lbl">Avg Food Cost</div><div className="mm-val">27.3%</div><div className="mm-delta">↓ 2.1% vs last week</div></div>
                <div className="mm"><div className="mm-lbl">Covers This Week</div><div className="mm-val cream">218</div><div className="mm-delta">↑ 14 vs last week</div></div>
                <div className="mm"><div className="mm-lbl">Net Margin</div><div className="mm-val green">18.4%</div><div className="mm-delta">Target: 18%</div></div>
              </div>
              <div className="mockup-rows">
                {[
                  { emoji: "🥩", name: "Weekend Brunch Set", cost: "Beef tenderloin + sides", margin: "29%", cls: "ok" },
                  { emoji: "🍜", name: "House Ramen Bowl", cost: "Pork broth, noodles, egg", margin: "17%", cls: "ok" },
                  { emoji: "🍕", name: "Truffle Pizza", cost: "Truffle oil, mozz — ⚠ overspend", margin: "44%", cls: "bad" },
                  { emoji: "🥂", name: "Mocktail Combo", cost: "Fresh fruit, mixers", margin: "12%", cls: "warn" },
                ].map((item, i) => (
                  <div className="m-row" key={i}>
                    <div className="m-row-left">
                      <span style={{ fontSize: 20 }}>{item.emoji}</span>
                      <div><div className="m-dish">{item.name}</div><div className="m-cost">{item.cost}</div></div>
                    </div>
                    <div className={`m-margin ${item.cls}`}>{item.margin} margin</div>
                  </div>
                ))}
              </div>
              <div className="mockup-foot">
                <span className="mockup-foot-lbl">Avg Food Cost This Week</span>
                <span className="mockup-foot-val">26.4%</span>
              </div>
            </div>
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
              <span className="rail-icon">{f.icon}</span>
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
          <h2 className="s-title">Iris Financial vs.<br /><em>Toast + QuickBooks</em></h2>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch f">Feature</div>
              <div className="ch i">Iris Financial <span className="i-pill">Best</span></div>
              <div className="ch o">Toast + QB</div>
            </div>
            {[
              ["Recipe Costing", "✓ Built-in", "✗ Not available"],
              ["Ingredient Tracking", "✓ Built-in", "✗ Add-on required"],
              ["Auto Bookkeeping from POS", "✓ Native sync", "✗ Manual export needed"],
              ["Real-time P&L", "✓ Live", "✗ Month-end only"],
              ["Payroll", "✓ Built-in", "✗ Extra subscription"],
              ["Mobile Money (Africa/Global)", "✓ PawaPay + Stripe", "✗ US-only"],
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
              <div className="cc o"><span className="big-o">$180+/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — EDITORIAL */}
      <section className="testimonials">
        <div className="testi-inner">
          <div className="s-label">From the kitchen</div>
          <h2 className="s-title" style={{ marginBottom: 0 }}>What restaurant owners say</h2>
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
            <p>Everything a single-location restaurant needs — recipe costing, inventory, POS, and real-time P&L — on the free tier. No credit card, no expiry.</p>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-cadence">per month — forever free to start</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) adds multi-location, payroll, and advanced analytics.</div>
          </div>
          <div className="pricing-right">
            <div className="s-label" style={{ display: "block", marginBottom: 28 }}>What's included</div>
            {[
              "Recipe costing & menu margin analysis",
              "Ingredient & inventory tracking with reorder alerts",
              "Supplier management & purchase orders",
              "Built-in POS & Iris Pay checkout",
              "Daily food cost % and sales reports",
              "Professional catering invoicing with QR codes",
              "Real-time P&L dashboard",
              "Unlimited users (front-of-house + back-office)",
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
          <h2 className="cta-title">Stop guessing.<br />Start knowing your numbers.</h2>
          <p className="cta-sub">Most restaurants know their reservation count. Almost none know their real food cost percentage this week. That's the gap Iris Financial closes — free to start, five minutes to set up.</p>
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
                <div className="modal-s">Set up in 15 minutes. Your first food cost report ready before dinner service.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Owner / Manager name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Restaurant Name</label><input className="f-input" placeholder="e.g. La Maison Bistro" value={form.restaurant} onChange={e => setForm({ ...form, restaurant: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="you@yourrestaurant.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Restaurant Type</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
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
                <span className="success-emoji">🍽️</span>
                <div className="success-h">Welcome to the kitchen!</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--ember-light)" }}>{form.email}</strong>. First food cost report ready before your next service.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
