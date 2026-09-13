import { useState, useEffect } from "react";
import { Users, PieChart, FileText, Heart, CreditCard, BarChart2, DollarSign, Mail, BookOpen, Home, Calendar, Shield, Layers, Utensils } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --forest: #0A1628;
    --deep: #0D1F38;
    --panel: #122444;
    --rail: #173050;
    --border: rgba(255,255,255,0.07);
    --steel: #3B82F6;
    --steel-light: #60A5FA;
    --steel-glow: rgba(59,130,246,0.1);
    --khanda: #E8B84B;
    --khanda-light: #F5D080;
    --khanda-glow: rgba(232,184,75,0.12);
    --orange: #F97316;
    --orange-light: #FB923C;
    --cream: #F0F6FF;
    --text-blue: #8BAFD4;
    --text-soft: #4A6480;
    --white: #EFF6FF;
    --green-ok: #22c55e;
    --red-warn: #ef4444;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Lato', sans-serif; background: var(--forest); color: var(--cream); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); } 50% { box-shadow: 0 0 0 12px rgba(59,130,246,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes khandaGlow { 0%,100% { filter: drop-shadow(0 0 8px rgba(232,184,75,0.4)); } 50% { filter: drop-shadow(0 0 16px rgba(232,184,75,0.7)); } }
  @keyframes nishan { 0%,100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; padding: 0 48px;
    background: rgba(10,22,40,0.97); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 13px; font-weight: 500; color: var(--text-blue); cursor: pointer; transition: color 0.2s; letter-spacing: 0.03em; }
  .nav-lnk:hover { color: var(--cream); }
  .nav-cta {
    background: var(--steel); color: white;
    padding: 9px 22px; border-radius: 4px; border: none; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase;
    transition: all 0.2s; box-shadow: 0 4px 16px rgba(59,130,246,0.35);
  }
  .nav-cta:hover { background: var(--steel-light); transform: translateY(-1px); }

  /* SEVA BAR */
  .seva-bar {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    height: 34px; background: var(--deep);
    border-bottom: 2px solid var(--khanda);
    display: flex; align-items: center; justify-content: center; gap: 0;
  }
  .sv-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 28px; border-right: 1px solid var(--border);
    font-size: 12px; color: var(--text-soft);
    font-family: 'Rajdhani', sans-serif; letter-spacing: 0.05em;
  }
  .sv-item:last-child { border-right: none; }
  .sv-val { color: var(--khanda); font-weight: 700; }
  .sv-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--khanda); animation: blink 2s infinite; }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--forest);
    padding: 120px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-lines {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .hero-khanda {
    position: absolute; right: 52%; top: 50%; transform: translate(50%, -50%);
    font-size: 380px; color: var(--khanda); opacity: 0.03;
    font-family: serif; pointer-events: none; user-select: none;
    animation: khandaGlow 4s ease-in-out infinite;
    letter-spacing: -0.1em;
  }
  .hero-glow-l { position: absolute; left: -150px; top: 20%; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%); pointer-events: none; }
  .hero-glow-r { position: absolute; right: -150px; bottom: 10%; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(232,184,75,0.05) 0%, transparent 65%); pointer-events: none; }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-waheguru {
    font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 600;
    letter-spacing: 0.2em; color: var(--khanda); opacity: 0.7; margin-bottom: 18px;
    text-transform: uppercase; animation: fadeUp 0.5s ease both;
  }
  .hero-label { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; color: var(--steel-light); margin-bottom: 20px; text-transform: uppercase; animation: fadeUp 0.5s 0.05s ease both; }
  .hero-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(52px, 6.5vw, 84px); font-weight: 700; line-height: 1.0;
    color: var(--cream); margin-bottom: 24px; letter-spacing: 0.02em;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title em { font-style: normal; color: var(--steel-light); }
  .hero-title .khanda { color: var(--khanda); }
  .hero-sub {
    font-size: 16px; color: var(--text-blue); line-height: 1.8; font-weight: 300;
    max-width: 460px; margin-bottom: 40px; border-left: 3px solid var(--khanda);
    padding-left: 20px; animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-steel {
    background: var(--steel); color: white;
    padding: 16px 36px; border-radius: 4px; border: none; cursor: pointer;
    font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 16px;
    letter-spacing: 0.08em; text-transform: uppercase;
    transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 6px 24px rgba(59,130,246,0.4);
  }
  .btn-steel:hover { background: var(--steel-light); transform: translateY(-2px); }
  .btn-ghost {
    background: transparent; color: var(--text-blue);
    padding: 14px 32px; border-radius: 4px; cursor: pointer;
    font-weight: 400; font-size: 15px;
    border: 1px solid var(--border); transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--khanda); color: var(--khanda); }

  /* HERO RIGHT — LANGAR + DASVANDH CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .seva-card {
    background: var(--deep); border-radius: 4px;
    border: 1px solid var(--border); border-top: 3px solid var(--khanda);
    box-shadow: 0 32px 72px rgba(0,0,0,0.7); overflow: hidden;
  }
  .sc-head {
    background: var(--panel); padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .sc-title { font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; color: var(--cream); letter-spacing: 0.06em; text-transform: uppercase; }
  .sc-live { display: flex; align-items: center; gap: 6px; }
  .sc-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-ok); animation: blink 2s infinite; }
  .sc-live-txt { font-size: 11px; color: var(--green-ok); font-weight: 700; letter-spacing: 0.08em; }
  .sc-funds { padding: 0 24px; }
  .sc-fund-head {
    display: flex; justify-content: space-between; padding: 10px 0 8px;
    border-bottom: 1px solid var(--border);
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--text-soft); text-transform: uppercase;
  }
  .sc-fund-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .sc-fund-row:last-child { border-bottom: none; }
  .sc-fund-left { display: flex; align-items: center; gap: 10px; }
  .sc-fund-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
  .sc-fund-name { font-size: 14px; font-weight: 600; color: var(--cream); letter-spacing: 0.02em; }
  .sc-fund-sub { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
  .sc-fund-val { font-family: 'Rajdhani', sans-serif; font-size: 19px; font-weight: 700; color: var(--khanda); }
  .sc-total {
    background: var(--panel); padding: 14px 24px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .sc-total-lbl { font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: var(--text-blue); text-transform: uppercase; }
  .sc-total-val { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; color: var(--steel-light); }
  .sc-langar { background: rgba(232,184,75,0.06); border-top: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
  .sc-langar-lbl { font-size: 12px; color: var(--text-blue); font-weight: 500; }
  .sc-langar-val { font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 700; color: var(--khanda); }

  /* PAIN */
  .pain { background: var(--panel); padding: 0; border-top: 2px solid var(--khanda); }
  .pain-layout { display: grid; grid-template-columns: 1.2fr 1fr; }
  .pain-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); }
  .pain-eyebrow { font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: var(--khanda); margin-bottom: 20px; text-transform: uppercase; }
  .pain-headline { font-family: 'Rajdhani', sans-serif; font-size: clamp(38px, 4.8vw, 58px); font-weight: 700; line-height: 1.05; color: var(--cream); margin-bottom: 24px; letter-spacing: 0.02em; }
  .pain-headline em { font-style: normal; color: var(--khanda); }
  .pain-deck { font-size: 16px; color: var(--text-blue); line-height: 1.8; font-weight: 300; margin-bottom: 40px; }
  .pain-langar {
    background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.15);
    padding: 24px 28px; border-left: 3px solid var(--steel);
  }
  .pain-lang-label { font-family: 'Rajdhani', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--steel-light); margin-bottom: 14px; text-transform: uppercase; }
  .pain-lang-row { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
  .pain-lang-row:last-child { border-bottom: none; }
  .pain-lang-desc { color: var(--text-blue); }
  .pain-lang-val { font-family: 'Rajdhani', sans-serif; font-size: 19px; font-weight: 700; color: var(--cream); }
  .pain-lang-val.warn { color: var(--red-warn); }
  .pain-lang-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-top: 14px; border-top: 2px solid rgba(59,130,246,0.25); }
  .pain-lang-total-lbl { font-size: 14px; font-weight: 600; color: var(--text-blue); }
  .pain-lang-total-val { font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700; color: var(--khanda); }

  .pain-right { padding: 80px 48px 80px 40px; display: flex; flex-direction: column; gap: 40px; justify-content: center; }
  .pain-issue { padding-bottom: 40px; border-bottom: 1px solid var(--border); }
  .pain-issue:last-child { padding-bottom: 0; border-bottom: none; }
  .pain-issue-icon { color: var(--steel-light); margin-bottom: 14px; display: block; }
  .pain-issue h3 { font-family: 'Rajdhani', sans-serif; font-size: 24px; font-weight: 700; color: var(--cream); margin-bottom: 10px; letter-spacing: 0.03em; }
  .pain-issue p { font-size: 14px; color: var(--text-blue); line-height: 1.75; }

  /* FEATURES */
  .features { background: var(--forest); padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: var(--steel-light); margin-bottom: 14px; text-transform: uppercase; }
  .s-title { font-family: 'Rajdhani', sans-serif; font-size: clamp(38px, 4.5vw, 56px); font-weight: 700; line-height: 1.05; color: var(--cream); margin-bottom: 14px; letter-spacing: 0.02em; }
  .s-title em { font-style: normal; color: var(--khanda); }
  .s-body { font-size: 16px; color: var(--text-blue); line-height: 1.75; font-weight: 300; max-width: 540px; }
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; margin-top: 56px; }
  .feat-card {
    background: var(--deep); padding: 36px;
    border: 1px solid var(--border); transition: all 0.3s; cursor: default; position: relative;
  }
  .feat-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, var(--steel), var(--khanda));
    transform: scaleY(0); transition: transform 0.35s; transform-origin: top;
  }
  .feat-card:hover::before { transform: scaleY(1); }
  .feat-card:hover { background: var(--panel); border-color: rgba(59,130,246,0.2); transform: translateX(4px); }
  .feat-icon { color: var(--steel-light); margin-bottom: 18px; display: block; }
  .feat-card h3 { font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; color: var(--cream); margin-bottom: 10px; letter-spacing: 0.03em; }
  .feat-card p { font-size: 14px; color: var(--text-blue); line-height: 1.7; }
  .feat-tag { display: inline-block; margin-top: 14px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); color: var(--steel-light); padding: 3px 10px; border-radius: 2px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }

  /* RAIL */
  .rail-section { background: var(--deep); padding: 80px 0; border-top: 1px solid var(--border); overflow: hidden; }
  .rail-header { padding: 0 48px 36px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 3px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card { background: var(--panel); border: 1px solid var(--border); padding: 28px 24px; min-width: 240px; flex-shrink: 0; transition: all 0.25s; }
  .rail-card:hover { border-color: rgba(232,184,75,0.3); background: rgba(232,184,75,0.03); transform: translateY(-3px); }
  .rail-icon { color: var(--khanda); margin-bottom: 12px; display: block; }
  .rail-card h3 { font-family: 'Rajdhani', sans-serif; font-size: 19px; font-weight: 700; color: var(--cream); margin-bottom: 8px; letter-spacing: 0.03em; }
  .rail-card p { font-size: 13px; color: var(--text-blue); line-height: 1.65; }
  .rail-hint { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-soft); letter-spacing: 0.06em; }

  /* COMPARISON */
  .comparison { background: var(--forest); padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap { background: var(--deep); border: 1px solid var(--border); border-top: 3px solid var(--khanda); overflow: hidden; margin-top: 52px; box-shadow: 0 24px 56px rgba(0,0,0,0.6); }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--panel); }
  .ch { padding: 18px 22px; }
  .ch.f { font-size: 11px; color: var(--text-soft); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  .ch.i { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; color: var(--khanda); display: flex; align-items: center; gap: 8px; letter-spacing: 0.04em; }
  .ch.o { font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 600; color: var(--text-soft); letter-spacing: 0.03em; }
  .iris-pill { background: var(--khanda); color: var(--forest); font-size: 9px; font-family: 'Lato', sans-serif; font-weight: 800; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 2px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: rgba(59,130,246,0.03); }
  .cc { padding: 13px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.f { color: var(--cream); font-weight: 500; }
  .cc.i { color: var(--text-blue); font-weight: 500; }
  .cc.o { color: var(--text-soft); }
  .ck { color: var(--green-ok); font-size: 16px; font-weight: 700; }
  .cx { color: var(--red-warn); font-size: 16px; font-weight: 700; }
  .price-row { background: rgba(232,184,75,0.04); border-top: 2px solid rgba(232,184,75,0.2) !important; }
  .big-i { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; color: var(--khanda) !important; }
  .big-o { font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700; color: var(--red-warn) !important; }

  /* TESTIMONIALS */
  .testimonials { background: var(--deep); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-primary-wrap { background: var(--steel); padding: 56px 64px; margin-top: 52px; border-left: 6px solid var(--khanda); }
  .testi-primary-q { font-family: 'Rajdhani', sans-serif; font-size: 96px; font-weight: 700; color: rgba(255,255,255,0.12); line-height: 1; margin-bottom: -26px; }
  .testi-primary-text { font-family: 'Rajdhani', sans-serif; font-size: clamp(20px, 2.6vw, 26px); font-weight: 600; line-height: 1.4; color: white; margin-bottom: 36px; max-width: 800px; letter-spacing: 0.01em; }
  .testi-primary-author { display: flex; align-items: center; gap: 16px; }
  .testi-primary-av { width: 46px; height: 46px; background: var(--forest); color: var(--khanda); font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-primary-name { font-weight: 700; font-size: 15px; color: white; letter-spacing: 0.03em; }
  .testi-primary-role { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 2px; }
  .testi-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 3px; }
  .testi-secondary { background: var(--panel); border: 1px solid var(--border); padding: 36px; transition: background 0.2s; border-left: 3px solid transparent; }
  .testi-secondary:hover { background: rgba(59,130,246,0.06); border-left-color: var(--steel); }
  .testi-sec-text { font-size: 15px; color: var(--text-blue); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-sec-author { display: flex; align-items: center; gap: 12px; }
  .testi-sec-av { width: 38px; height: 38px; background: var(--steel); color: white; font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-sec-name { font-weight: 700; font-size: 14px; color: var(--cream); letter-spacing: 0.02em; }
  .testi-sec-role { font-size: 12px; color: var(--text-soft); margin-top: 2px; }

  /* PRICING */
  .pricing { background: var(--forest); border-top: 1px solid var(--border); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: center; }
  .pricing-amount { font-family: 'Rajdhani', sans-serif; font-size: 100px; font-weight: 700; color: var(--khanda); line-height: 1; letter-spacing: -0.02em; }
  .pricing-amount sup { font-size: 42px; vertical-align: top; margin-top: 20px; }
  .pricing-cadence { font-size: 15px; color: var(--text-soft); margin: 8px 0 32px; }
  .pricing-left p { font-size: 15px; color: var(--text-blue); line-height: 1.75; font-weight: 300; margin-bottom: 32px; }
  .pricing-cta { width: 100%; background: var(--steel); color: white; padding: 17px; border: none; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.25s; box-shadow: 0 8px 32px rgba(59,130,246,0.4); }
  .pricing-cta:hover { background: var(--steel-light); transform: translateY(-2px); }
  .pricing-note { font-size: 13px; color: var(--text-soft); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .p-feat { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text-blue); }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-ok); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section { background: var(--panel); padding: 90px 48px; text-align: center; border-top: 2px solid var(--khanda); position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px); background-size: 40px 40px; }
  .cta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
  .cta-title { font-family: 'Rajdhani', sans-serif; font-size: clamp(38px, 5.5vw, 62px); font-weight: 700; color: var(--cream); line-height: 1.05; margin-bottom: 20px; letter-spacing: 0.02em; }
  .cta-title em { font-style: normal; color: var(--khanda); }
  .cta-sub { font-size: 17px; color: var(--text-blue); line-height: 1.75; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: var(--khanda); color: var(--forest); padding: 18px 48px; border: none; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.25s; box-shadow: 0 8px 32px rgba(232,184,75,0.3); }
  .cta-btn-main:hover { background: var(--khanda-light); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: var(--text-blue); padding: 16px 44px; cursor: pointer; font-weight: 400; font-size: 15px; border: 1px solid var(--border); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: var(--steel); color: var(--steel-light); }

  /* FOOTER */
  .footer { background: var(--forest); padding: 30px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid var(--border); }
  .footer-copy { font-size: 13px; color: var(--text-soft); }
  .footer-copy strong { color: var(--khanda); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--text-soft); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--khanda); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(10,22,40,0.92); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: var(--deep); border: 1px solid var(--border); border-top: 3px solid var(--khanda); padding: 48px; max-width: 480px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(0,0,0,0.8); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--panel); border: 1px solid var(--border); color: var(--text-blue); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; }
  .modal-x:hover { border-color: var(--khanda); color: var(--khanda); }
  .modal-h { font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; color: var(--cream); margin-bottom: 6px; letter-spacing: 0.04em; }
  .modal-s { color: var(--text-blue); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; color: var(--khanda); margin-bottom: 6px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 12px 16px; background: var(--panel); border: 1px solid var(--border); font-size: 14px; font-family: 'Lato', sans-serif; color: var(--cream); outline: none; transition: border-color 0.2s; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-input:focus { border-color: var(--khanda); }
  .f-btn { width: 100%; background: var(--khanda); color: var(--forest); padding: 15px; border: none; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 8px; transition: all 0.25s; }
  .f-btn:hover { background: var(--khanda-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-icon { color: var(--khanda); margin-bottom: 16px; display: flex; justify-content: center; }
  .success-h { font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; color: var(--cream); margin-bottom: 10px; letter-spacing: 0.04em; }
  .success-p { color: var(--text-blue); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .seva-bar { display: none; }
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

const IconG = ({ name, size = 24 }) => {
  const icons = {
    users: <Users size={size} />, "pie-chart": <PieChart size={size} />,
    "file-text": <FileText size={size} />, heart: <Heart size={size} />,
    "credit-card": <CreditCard size={size} />, "bar-chart": <BarChart2 size={size} />,
    dollar: <DollarSign size={size} />, mail: <Mail size={size} />,
    book: <BookOpen size={size} />, home: <Home size={size} />,
    calendar: <Calendar size={size} />, shield: <Shield size={size} />,
    layers: <Layers size={size} />, utensils: <Utensils size={size} />,
  };
  return icons[name] || null;
};

const funds = [
  { name: "Dasvandh (Tithing)", sub: "10% income offerings", val: "$48,200", color: "#E8B84B" },
  { name: "Langar Fund", sub: "Community kitchen program", val: "$22,800", color: "#3B82F6" },
  { name: "Gurdwara Building Fund", sub: "Expansion & maintenance", val: "$64,400", color: "#60A5FA" },
  { name: "Education (Gurmat Vidya)", sub: "Sikh studies & youth programs", val: "$14,600", color: "#F97316" },
];

const mainFeatures = [
  { icon: "users", title: "Sangat Management", desc: "Full family profiles with dasvandh history, seva records, and giving statements — all connected. Know your sangat.", tag: "Gurdwara-Specific" },
  { icon: "utensils", title: "Langar Cost Tracking", desc: "Track ingredient costs, volunteer hours, and meals served per service. Know your true cost per plate and budget accordingly.", tag: "Gurdwara-Specific" },
  { icon: "dollar", title: "Dasvandh Fund Management", desc: "Separate dasvandh from Langar contributions, building fund, and general seva. Full transparency for your Granthi and Parbhandak Committee.", tag: "Sikh Finance" },
  { icon: "file-text", title: "Year-End Giving Statements", desc: "IRS-compliant tax receipts for every family generated and emailed in one click. No more January phone calls.", tag: "Saves Hours" },
  { icon: "credit-card", title: "Online Giving & Mobile Money", desc: "Accept dasvandh and donations via card or mobile money. Gurpurab and Vaisakhi giving spikes handled without issues.", tag: "Iris Pay" },
  { icon: "bar-chart", title: "Financial Reports", desc: "Fund balances, langar cost trends, P&L — ready for your Parbhandak Committee and sangat transparency nights.", tag: "Bilingual EN/FR" },
];

const railFeatures = [
  { icon: "book", title: "Sikh Studies / Gurmat Vidya", desc: "Tuition tracking and invoicing for youth Sikh education programs — automated." },
  { icon: "home", title: "Multi-Location Gurdwaras", desc: "Running multiple sangat locations? Consolidated finances with per-location breakdowns." },
  { icon: "calendar", title: "Gurpurab Event Budgeting", desc: "Dedicated budgets per Gurpurab and Vaisakhi celebration with actual vs budget tracking." },
  { icon: "shield", title: "Endowment & Seva Funds", desc: "Named memorial funds, seva trusts, and long-term endowments tracked with full transparency." },
  { icon: "mail", title: "Sangat Acknowledgments", desc: "Auto-send thank-you receipts and seva confirmations after every contribution." },
  { icon: "layers", title: "Pledge Management", desc: "Building fund multi-year pledges tracked with automated reminders and payment reconciliation." },
];

const testimonials = [
  { q: "Our Langar program serves 600 people every Sunday. We had no way to show the sangat what it actually cost per week — flour, daal, vegetables, gas, the volunteers' supplies. Now we post a weekly Langar report after the service. Donations increased 40% when people saw the real numbers.", name: "Bhai Gurpreet S.", role: "Granthi — Gurdwara Sahib of Fremont, CA", init: "G", primary: true },
  { q: "Dasvandh was always the hardest to track. Families give different amounts at different times. We had a notebook. Now every contribution is recorded, receipts sent automatically, and year-end statements are done in 20 minutes.", name: "Secretary Harjit K.", role: "Gurdwara Singh Sabha, Surrey BC", init: "H", primary: false },
  { q: "Our Parbhandak Committee used to spend the first hour of every meeting asking basic finance questions. Now the dashboard is on the screen before we start. We spend that time on actual decisions.", name: "President Manjit B.", role: "Guru Nanak Darbar, Chicago IL", init: "M", primary: false },
];

export default function GurdwaraPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", gurdwara: "", email: "", size: "" });
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
      await fetch("https://formspree.io/f/mjyvqkkb", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, gurdwara: form.gurdwara, email: form.email, sangat_size: form.size, vertical: "Gurdwara" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=gurdwara&ref=landing"; }, 2000);
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

      {/* SEVA BAR */}
      <div className="seva-bar">
        <div className="sv-item"><div className="sv-dot" /><span className="sv-val">Langar</span><span>served 600 today</span></div>
        <div className="sv-item"><span className="sv-val">$150,000</span><span>total seva this year</span></div>
        <div className="sv-item"><span className="sv-val">Vaisakhi</span><span>planning active</span></div>
        <div className="sv-item"><span className="sv-val">Building Fund</span><span>$64,400 raised</span></div>
        <div className="sv-item"><span className="sv-val">Dasvandh</span><span>312 contributing families</span></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-lines" />
        <div className="hero-khanda">☬</div>
        <div className="hero-glow-l" />
        <div className="hero-glow-r" />
        <div className="hero-layout">
          <div>
            <div className="hero-waheguru">Waheguru Ji Ka Khalsa · Waheguru Ji Ki Fateh</div>
            <div className="hero-label">Built for Gurdwaras & Sikh Organizations</div>
            <h1 className="hero-title">
              SEVA FINANCES,<br />
              <em>CLEARLY TRACKED.</em><br />
              <span className="khanda">SANGAT TRUST BUILT.</span>
            </h1>
            <p className="hero-sub">
              Langar cost tracking, dasvandh fund management, seva receipts, and IRS giving statements — one platform built specifically for Gurdwaras. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-steel" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="seva-card">
              <div className="sc-head">
                <span className="sc-title">Seva Dashboard — This Year</span>
                <div className="sc-live"><div className="sc-dot" /><span className="sc-live-txt">Live</span></div>
              </div>
              <div className="sc-funds">
                <div className="sc-fund-head"><span>Fund</span><span>Collected</span></div>
                {funds.map((f, i) => (
                  <div className="sc-fund-row" key={i}>
                    <div className="sc-fund-left">
                      <div className="sc-fund-dot" style={{ background: f.color }} />
                      <div><div className="sc-fund-name">{f.name}</div><div className="sc-fund-sub">{f.sub}</div></div>
                    </div>
                    <div className="sc-fund-val">{f.val}</div>
                  </div>
                ))}
              </div>
              <div className="sc-total">
                <span className="sc-total-lbl">Total Seva This Year</span>
                <span className="sc-total-val">$150,000</span>
              </div>
              <div className="sc-langar">
                <span className="sc-langar-lbl">Langar cost per plate this week</span>
                <span className="sc-langar-val">$4.20 / plate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-layout">
          <div className="pain-left">
            <div className="pain-eyebrow">The accountability problem</div>
            <h2 className="pain-headline">YOUR SANGAT GIVES<br />DASVANDH IN TRUST.<br /><em>CAN YOU ACCOUNT FOR IT?</em></h2>
            <p className="pain-deck">Dasvandh is one-tenth of everything a Sikh earns — given in complete trust to the Gurdwara. When families can't see clearly how their dasvandh is used, that trust erodes. And it's hard to rebuild.</p>
            <div className="pain-langar">
              <div className="pain-lang-label">Langar — What Goes Untracked Per Week</div>
              {[
                { desc: "Flour, daal, vegetables, oil (weekly market run)", val: "~$840", warn: false },
                { desc: "Gas and utilities allocated to Langar kitchen", val: "Not tracked", warn: true },
                { desc: "Volunteer time (32 seva workers × 4hrs)", val: "Not recorded", warn: true },
                { desc: "Serving supplies, disposables, cleaning", val: "~$120", warn: false },
                { desc: "Cost per plate — do you know this number?", val: "Unknown", warn: true },
              ].map((r, i) => (
                <div className="pain-lang-row" key={i}>
                  <span className="pain-lang-desc">{r.desc}</span>
                  <span className={`pain-lang-val ${r.warn ? "warn" : ""}`}>{r.val}</span>
                </div>
              ))}
              <div className="pain-lang-total">
                <span className="pain-lang-total-lbl">With Iris Financial, you know</span>
                <span className="pain-lang-total-val">Every rupee</span>
              </div>
            </div>
          </div>
          <div className="pain-right">
            {[
              { icon: "layers", title: "Dasvandh and Langar in one pot", body: "Families give dasvandh intending it for the broader mission. But it sits in the same account as Langar donations and building fund contributions. No one can show the Parbhandak Committee where each dollar went." },
              { icon: "calendar", title: "Vaisakhi and Gurpurab chaos", body: "Major festivals bring large donations and large expenses. Without dedicated event budgets, the Parbhandak Committee reviews numbers weeks after the celebration and finds surprises — every time." },
            ].map((p, i) => (
              <div className="pain-issue" key={i}>
                <span className="pain-issue-icon"><IconG name={p.icon} size={28} /></span>
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
          <h2 className="s-title">Everything your Gurdwara<br />needs to <em>run with clarity.</em></h2>
          <p className="s-body">Not generic nonprofit software. Built for the financial reality of Gurdwara operations — from weekly Langar to Gurpurab to Gurmat Vidya.</p>
          <div className="features-grid">
            {mainFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <span className="feat-icon"><IconG name={f.icon} size={24} /></span>
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
              <span className="rail-icon"><IconG name={f.icon} size={22} /></span>
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
              ["Dasvandh fund separation", "✓ Built-in", "✗ Manual workaround"],
              ["Langar cost tracking", "✓ Per-plate costing", "✗ Not available"],
              ["Sangat / member management", "✓ Built-in", "✗ Not available"],
              ["Year-end giving statements", "✓ 1-click bulk email", "✗ Manual in Word"],
              ["Gurpurab event budgeting", "✓ Built-in", "✗ Spreadsheet only"],
              ["Online giving portal", "✓ Iris Pay included", "✗ Extra integration"],
              ["Gurmat Vidya school billing", "✓ Built-in", "✗ Separate tool"],
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

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testi-inner">
          <div className="s-label">From the sangat</div>
          <h2 className="s-title" style={{ marginBottom: 0 }}>What Gurdwaras are saying</h2>
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
            <p>Start on the Starter plan — free forever, no credit card needed. Get your dasvandh and Langar funds separated and your sangat records set up in 15 minutes.</p>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-cadence">per month · Starter plan · forever free</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) unlocks unlimited transactions, invoices, users, and advanced features.</div>
          </div>
          <div className="pricing-right">
            <div className="s-label" style={{ display: "block", marginBottom: 28 }}>What's included</div>
            {[
              "Sangat family profiles & giving records (Starter: up to 50 transactions/mo)",
              "Dasvandh, Langar, and building fund separation",
              "Weekly Langar cost tracking (per-plate costing)",
              "IRS-compliant year-end giving statements (bulk email)",
              "Online giving portal + Iris Pay mobile money",
              "Gurpurab and festival event budgeting",
              "Gurmat Vidya / Sikh studies school billing",
              "Parbhandak Committee financial reports",
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
          <h2 className="cta-title">Your sangat gives in trust.<br /><em>Honor that trust</em> with clarity.</h2>
          <p className="cta-sub">Every dasvandh contribution, every Langar rupee, every building fund pledge deserves a clear record. Iris Financial gives your Parbhandak Committee and your sangat the transparency they deserve — free to start.</p>
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
                <div className="modal-s">Set up your Gurdwara account in 15 minutes. No credit card required.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Granthi / Secretary / President" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Gurdwara Name</label><input className="f-input" placeholder="e.g. Gurdwara Sahib of Fremont" value={form.gurdwara} onChange={e => setForm({ ...form, gurdwara: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="your@gurdwara.org" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Sangat Size</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
                    <option value="">Select size</option>
                    <option>Under 100 families</option>
                    <option>100–300 families</option>
                    <option>300–700 families</option>
                    <option>700+ families</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div className="success-icon"><Shield size={48} /></div>
                <div className="success-h">Waheguru Ji Ka Khalsa!</div>
                <p className="success-p">Setup link on its way to <strong style={{ color: "var(--khanda)" }}>{form.email}</strong>. Your sangat's finances are about to become fully transparent.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
