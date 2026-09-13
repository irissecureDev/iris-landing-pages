import { useState, useEffect } from "react";
import { Users, PieChart, FileText, Heart, CreditCard, BarChart2, DollarSign, Mail, BookOpen, Home, Calendar, Gift, Layers, Sun } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --void: #0A0500;
    --deep: #120A00;
    --char: #1A0F00;
    --panel: #241500;
    --rail: #2E1A00;
    --border: rgba(255,165,0,0.12);
    --border-soft: rgba(255,255,255,0.06);
    --saffron: #FF8C00;
    --saffron-light: #FFA500;
    --saffron-bright: #FFB84D;
    --kumkum: #CC2200;
    --kumkum-light: #E83000;
    --gold: #D4A017;
    --gold-light: #F0C040;
    --cream: #FFF8F0;
    --text-warm: #C8A878;
    --text-soft: #7A5C38;
    --green-ok: #22c55e;
    --red-warn: #ef4444;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; background: var(--void); color: var(--cream); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,140,0,0.4); } 50% { box-shadow: 0 0 0 12px rgba(255,140,0,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes diyas { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes sunRise {
    from { opacity: 0; transform: translateY(20px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; padding: 0 48px;
    background: rgba(10,5,0,0.97); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 13px; font-weight: 500; color: var(--text-warm); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--cream); }
  .nav-cta {
    background: var(--saffron); color: var(--void);
    padding: 9px 22px; border-radius: 4px; border: none; cursor: pointer;
    font-weight: 700; font-size: 13px; letter-spacing: 0.04em;
    transition: all 0.2s; box-shadow: 0 4px 16px rgba(255,140,0,0.4);
  }
  .nav-cta:hover { background: var(--saffron-light); transform: translateY(-1px); }

  /* FESTIVAL BAR */
  .festival-bar {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    height: 34px;
    background: linear-gradient(90deg, var(--kumkum) 0%, var(--saffron) 50%, var(--gold) 100%);
    display: flex; align-items: center; justify-content: center; gap: 0;
    overflow: hidden;
  }
  .festival-bar::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px);
  }
  .fb-item {
    position: relative; z-index: 2;
    display: flex; align-items: center; gap: 8px;
    padding: 0 24px; border-right: 1px solid rgba(255,255,255,0.2);
    font-size: 12px; color: rgba(255,255,255,0.85);
  }
  .fb-item:last-child { border-right: none; }
  .fb-val { color: white; font-weight: 700; }
  .fb-diya { font-size: 13px; animation: diyas 2s ease-in-out infinite; }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--void);
    padding: 120px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-mandala {
    position: absolute; right: -180px; top: 50%; transform: translateY(-50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: conic-gradient(from 0deg, rgba(255,140,0,0.04), rgba(212,160,23,0.06), rgba(204,34,0,0.03), rgba(255,140,0,0.04));
    pointer-events: none;
  }
  .hero-mandala::before {
    content: ''; position: absolute; inset: 80px; border-radius: 50%;
    background: conic-gradient(from 45deg, rgba(255,140,0,0.05), transparent, rgba(212,160,23,0.05), transparent);
  }
  .hero-glow {
    position: absolute; left: -100px; top: 20%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,140,0,0.05) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-om {
    font-size: 48px; margin-bottom: 12px; opacity: 0.5;
    animation: sunRise 0.8s ease both; color: var(--saffron);
    font-family: serif;
  }
  .hero-label { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--saffron); margin-bottom: 20px; text-transform: uppercase; animation: fadeUp 0.5s ease both; }
  .hero-title {
    font-family: 'Philosopher', serif;
    font-size: clamp(48px, 6vw, 78px); font-weight: 700; line-height: 1.05;
    color: var(--cream); margin-bottom: 24px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title em { font-style: italic; color: var(--saffron-light); }
  .hero-title .gold { color: var(--gold-light); }
  .hero-sub {
    font-size: 16px; color: var(--text-warm); line-height: 1.8; font-weight: 300;
    max-width: 460px; margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-saffron {
    background: var(--saffron); color: var(--void);
    padding: 16px 36px; border-radius: 4px; border: none; cursor: pointer;
    font-weight: 700; font-size: 15px; transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 6px 24px rgba(255,140,0,0.4);
  }
  .btn-saffron:hover { background: var(--saffron-light); transform: translateY(-2px); }
  .btn-ghost {
    background: transparent; color: var(--text-warm);
    padding: 14px 32px; border-radius: 4px; cursor: pointer;
    font-weight: 500; font-size: 15px;
    border: 1px solid var(--border); transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--saffron); color: var(--saffron); }

  /* HERO RIGHT — DANA CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .dana-card {
    background: var(--deep); border-radius: 4px;
    border: 1px solid var(--border);
    box-shadow: 0 32px 72px rgba(0,0,0,0.8);
    overflow: hidden;
  }
  .dc-head {
    background: linear-gradient(135deg, var(--kumkum), var(--saffron));
    padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;
  }
  .dc-title { font-family: 'Philosopher', serif; font-size: 16px; font-weight: 700; color: white; }
  .dc-live { display: flex; align-items: center; gap: 6px; }
  .dc-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold-light); animation: diyas 2s infinite; }
  .dc-live-txt { font-size: 11px; color: var(--gold-light); font-weight: 700; letter-spacing: 0.06em; }
  .dc-funds { padding: 0 24px; }
  .dc-fund-head {
    display: flex; justify-content: space-between; padding: 12px 0 8px;
    border-bottom: 1px solid var(--border);
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: var(--text-soft);
  }
  .dc-fund-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid rgba(255,165,0,0.06);
  }
  .dc-fund-row:last-child { border-bottom: none; }
  .dc-fund-left { display: flex; align-items: center; gap: 10px; }
  .dc-fund-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dc-fund-name { font-size: 14px; font-weight: 500; color: var(--cream); }
  .dc-fund-sub { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
  .dc-fund-val { font-family: 'Philosopher', serif; font-size: 17px; font-weight: 700; color: var(--saffron-light); }
  .dc-total {
    background: var(--panel); padding: 14px 24px;
    border-top: 2px solid var(--saffron);
    display: flex; align-items: center; justify-content: space-between;
  }
  .dc-total-lbl { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; color: var(--text-warm); }
  .dc-total-val { font-family: 'Philosopher', serif; font-size: 26px; font-weight: 700; color: var(--gold-light); }
  .dc-footer-strip {
    background: rgba(255,140,0,0.06); padding: 11px 24px; border-top: 1px solid var(--border);
    display: flex; align-items: center; gap: 8px;
  }
  .dc-footer-txt { font-size: 12px; color: var(--text-warm); font-weight: 500; }

  /* PAIN */
  .pain { background: var(--char); padding: 0; border-top: 1px solid var(--border); }
  .pain-layout { display: grid; grid-template-columns: 1.2fr 1fr; }
  .pain-left {
    padding: 80px 56px 80px 48px; border-right: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .pain-left::before {
    content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, transparent, var(--saffron), transparent); opacity: 0.3;
  }
  .pain-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--saffron); margin-bottom: 20px; text-transform: uppercase; }
  .pain-headline { font-family: 'Philosopher', serif; font-size: clamp(36px, 4.5vw, 56px); font-weight: 700; line-height: 1.1; color: var(--cream); margin-bottom: 24px; }
  .pain-headline em { font-style: italic; color: var(--saffron-light); }
  .pain-deck { font-size: 16px; color: var(--text-warm); line-height: 1.8; font-weight: 300; margin-bottom: 40px; }
  .pain-festival {
    background: rgba(255,140,0,0.05); border: 1px solid var(--border);
    padding: 24px 28px; border-left: 3px solid var(--saffron);
  }
  .pain-fest-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--saffron); margin-bottom: 14px; text-transform: uppercase; }
  .pain-fest-row { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid rgba(255,165,0,0.07); font-size: 14px; }
  .pain-fest-row:last-child { border-bottom: none; }
  .pain-fest-desc { color: var(--text-warm); }
  .pain-fest-val { font-family: 'Philosopher', serif; font-size: 18px; font-weight: 700; color: var(--cream); }
  .pain-fest-val.warn { color: var(--kumkum-light); }
  .pain-fest-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-top: 14px; border-top: 2px solid rgba(255,140,0,0.25); }
  .pain-fest-total-lbl { font-size: 14px; font-weight: 600; color: var(--text-warm); }
  .pain-fest-total-val { font-family: 'Philosopher', serif; font-size: 30px; font-weight: 700; color: var(--saffron-light); }

  .pain-right { padding: 80px 48px 80px 40px; display: flex; flex-direction: column; gap: 40px; justify-content: center; }
  .pain-issue { padding-bottom: 40px; border-bottom: 1px solid var(--border); }
  .pain-issue:last-child { padding-bottom: 0; border-bottom: none; }
  .pain-issue-icon { color: var(--saffron); margin-bottom: 14px; display: block; }
  .pain-issue h3 { font-family: 'Philosopher', serif; font-size: 22px; font-weight: 700; color: var(--cream); margin-bottom: 10px; }
  .pain-issue p { font-size: 14px; color: var(--text-warm); line-height: 1.75; }

  /* FEATURES */
  .features { background: var(--void); padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--saffron); margin-bottom: 14px; text-transform: uppercase; }
  .s-title { font-family: 'Philosopher', serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 700; line-height: 1.1; color: var(--cream); margin-bottom: 14px; }
  .s-title em { font-style: italic; color: var(--saffron-light); }
  .s-body { font-size: 16px; color: var(--text-warm); line-height: 1.75; font-weight: 300; max-width: 540px; }
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; margin-top: 56px; }
  .feat-card {
    background: var(--deep); padding: 36px;
    border: 1px solid var(--border); transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
  }
  .feat-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--kumkum), var(--saffron), var(--gold));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
  }
  .feat-card:hover::after { transform: scaleX(1); }
  .feat-card:hover { background: var(--char); border-color: rgba(255,140,0,0.25); transform: translateY(-3px); }
  .feat-icon { color: var(--saffron); margin-bottom: 18px; display: block; }
  .feat-card h3 { font-family: 'Philosopher', serif; font-size: 22px; font-weight: 700; color: var(--cream); margin-bottom: 10px; }
  .feat-card p { font-size: 14px; color: var(--text-warm); line-height: 1.7; }
  .feat-tag { display: inline-block; margin-top: 14px; background: rgba(255,140,0,0.08); border: 1px solid rgba(255,140,0,0.2); color: var(--saffron); padding: 3px 10px; border-radius: 2px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; }

  /* RAIL */
  .rail-section { background: var(--char); padding: 80px 0; border-top: 1px solid var(--border); overflow: hidden; }
  .rail-header { padding: 0 48px 36px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 3px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card { background: var(--panel); border: 1px solid var(--border); padding: 28px 24px; min-width: 240px; flex-shrink: 0; transition: all 0.25s; }
  .rail-card:hover { border-color: rgba(255,140,0,0.3); background: rgba(255,140,0,0.04); transform: translateY(-3px); }
  .rail-icon { color: var(--saffron); margin-bottom: 12px; display: block; }
  .rail-card h3 { font-family: 'Philosopher', serif; font-size: 19px; font-weight: 700; color: var(--cream); margin-bottom: 8px; }
  .rail-card p { font-size: 13px; color: var(--text-warm); line-height: 1.65; }
  .rail-hint { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-soft); letter-spacing: 0.06em; }

  /* COMPARISON */
  .comparison { background: var(--void); padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap { background: var(--deep); border: 1px solid var(--border); border-top: 3px solid var(--saffron); overflow: hidden; margin-top: 52px; box-shadow: 0 24px 56px rgba(0,0,0,0.7); }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--panel); }
  .ch { padding: 18px 22px; }
  .ch.f { font-size: 11px; color: var(--text-soft); font-weight: 600; letter-spacing: 0.08em; }
  .ch.i { font-family: 'Philosopher', serif; font-size: 18px; font-weight: 700; color: var(--saffron-light); display: flex; align-items: center; gap: 8px; }
  .ch.o { font-family: 'Philosopher', serif; font-size: 16px; font-weight: 600; color: var(--text-soft); }
  .iris-pill { background: var(--saffron); color: var(--void); font-size: 9px; font-family: 'Poppins', sans-serif; font-weight: 800; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 2px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: rgba(255,165,0,0.03); }
  .cc { padding: 13px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.f { color: var(--cream); font-weight: 500; }
  .cc.i { color: var(--text-warm); font-weight: 500; }
  .cc.o { color: var(--text-soft); }
  .ck { color: var(--green-ok); font-size: 16px; font-weight: 700; }
  .cx { color: var(--red-warn); font-size: 16px; font-weight: 700; }
  .price-row { background: rgba(255,140,0,0.04); border-top: 2px solid rgba(255,140,0,0.2) !important; }
  .big-i { font-family: 'Philosopher', serif; font-size: 26px; font-weight: 700; color: var(--saffron-light) !important; }
  .big-o { font-family: 'Philosopher', serif; font-size: 24px; font-weight: 700; color: var(--red-warn) !important; }

  /* TESTIMONIALS */
  .testimonials { background: var(--char); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-primary-wrap {
    background: linear-gradient(135deg, var(--kumkum) 0%, var(--saffron) 60%, var(--gold) 100%);
    padding: 56px 64px; margin-top: 52px;
  }
  .testi-primary-q { font-family: 'Philosopher', serif; font-size: 96px; font-weight: 700; color: rgba(255,255,255,0.15); line-height: 1; margin-bottom: -26px; }
  .testi-primary-text { font-family: 'Philosopher', serif; font-size: clamp(19px, 2.5vw, 25px); font-weight: 700; line-height: 1.45; color: white; margin-bottom: 36px; max-width: 800px; }
  .testi-primary-author { display: flex; align-items: center; gap: 16px; }
  .testi-primary-av { width: 46px; height: 46px; background: var(--void); color: var(--saffron); font-family: 'Philosopher', serif; font-size: 20px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-primary-name { font-weight: 700; font-size: 15px; color: white; }
  .testi-primary-role { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 2px; }
  .testi-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 3px; }
  .testi-secondary { background: var(--deep); border: 1px solid var(--border); padding: 36px; transition: background 0.2s; }
  .testi-secondary:hover { background: rgba(255,140,0,0.04); border-color: rgba(255,140,0,0.2); }
  .testi-sec-text { font-size: 15px; color: var(--text-warm); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-sec-author { display: flex; align-items: center; gap: 12px; }
  .testi-sec-av { width: 38px; height: 38px; background: var(--saffron); color: var(--void); font-family: 'Philosopher', serif; font-size: 17px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-sec-name { font-weight: 600; font-size: 14px; color: var(--cream); }
  .testi-sec-role { font-size: 12px; color: var(--text-soft); margin-top: 2px; }

  /* PRICING */
  .pricing { background: var(--void); border-top: 1px solid var(--border); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: center; }
  .pricing-amount { font-family: 'Philosopher', serif; font-size: 100px; font-weight: 700; color: var(--saffron-light); line-height: 1; }
  .pricing-amount sup { font-size: 42px; vertical-align: top; margin-top: 20px; }
  .pricing-cadence { font-size: 15px; color: var(--text-soft); margin: 8px 0 32px; }
  .pricing-left p { font-size: 15px; color: var(--text-warm); line-height: 1.75; font-weight: 300; margin-bottom: 32px; }
  .pricing-cta { width: 100%; background: var(--saffron); color: var(--void); padding: 17px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; transition: all 0.25s; box-shadow: 0 8px 32px rgba(255,140,0,0.4); }
  .pricing-cta:hover { background: var(--saffron-light); transform: translateY(-2px); }
  .pricing-note { font-size: 13px; color: var(--text-soft); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .p-feat { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text-warm); }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-ok); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section {
    background: linear-gradient(135deg, var(--kumkum) 0%, var(--saffron) 50%, var(--gold) 100%);
    padding: 90px 48px; text-align: center; position: relative; overflow: hidden;
  }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%); background-size: 20px 20px; }
  .cta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
  .cta-title { font-family: 'Philosopher', serif; font-size: clamp(36px, 5vw, 58px); font-weight: 700; color: white; line-height: 1.1; margin-bottom: 20px; }
  .cta-title em { font-style: italic; color: var(--void); }
  .cta-sub { font-size: 17px; color: rgba(255,255,255,0.8); line-height: 1.75; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: var(--void); color: var(--saffron); padding: 18px 48px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; transition: all 0.25s; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
  .cta-btn-main:hover { background: var(--deep); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: white; padding: 16px 44px; cursor: pointer; font-weight: 600; font-size: 15px; border: 1.5px solid rgba(255,255,255,0.4); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; }

  /* FOOTER */
  .footer { background: var(--void); padding: 30px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid var(--border); }
  .footer-copy { font-size: 13px; color: var(--text-soft); }
  .footer-copy strong { color: var(--saffron); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--text-soft); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--saffron); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(10,5,0,0.92); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: var(--deep); border: 1px solid var(--border); border-top: 3px solid var(--saffron); padding: 48px; max-width: 480px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(0,0,0,0.9); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--panel); border: 1px solid var(--border); color: var(--text-warm); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; }
  .modal-x:hover { border-color: var(--saffron); color: var(--saffron); }
  .modal-h { font-family: 'Philosopher', serif; font-size: 28px; font-weight: 700; color: var(--cream); margin-bottom: 6px; }
  .modal-s { color: var(--text-warm); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: var(--saffron); margin-bottom: 6px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 12px 16px; background: var(--panel); border: 1px solid var(--border); font-size: 14px; font-family: 'Poppins', sans-serif; color: var(--cream); outline: none; transition: border-color 0.2s; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-input:focus { border-color: var(--saffron); }
  .f-btn { width: 100%; background: var(--saffron); color: var(--void); padding: 15px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; margin-top: 8px; transition: all 0.25s; }
  .f-btn:hover { background: var(--saffron-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-icon { color: var(--saffron); margin-bottom: 16px; display: flex; justify-content: center; }
  .success-h { font-family: 'Philosopher', serif; font-size: 28px; font-weight: 700; color: var(--cream); margin-bottom: 10px; }
  .success-p { color: var(--text-warm); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .festival-bar { display: none; }
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

const IconH = ({ name, size = 24 }) => {
  const icons = {
    users: <Users size={size} />, "pie-chart": <PieChart size={size} />,
    "file-text": <FileText size={size} />, heart: <Heart size={size} />,
    "credit-card": <CreditCard size={size} />, "bar-chart": <BarChart2 size={size} />,
    dollar: <DollarSign size={size} />, mail: <Mail size={size} />,
    book: <BookOpen size={size} />, home: <Home size={size} />,
    calendar: <Calendar size={size} />, gift: <Gift size={size} />,
    layers: <Layers size={size} />, sun: <Sun size={size} />,
  };
  return icons[name] || null;
};

const funds = [
  { name: "Nitya Dana (Daily Offerings)", sub: "Puja & archana collections", val: "$24,600", color: "#FF8C00" },
  { name: "Utsav Fund (Festivals)", sub: "Diwali, Navratri, Ganesh Chaturthi", val: "$38,400", color: "#CC2200" },
  { name: "Annadanam (Community Meals)", sub: "Prasad & langar program", val: "$12,800", color: "#D4A017" },
  { name: "Temple Building Fund", sub: "Expansion & maintenance", val: "$51,200", color: "#FF6600" },
  { name: "Sanskrit School", sub: "Bal vihar tuition", val: "$8,400", color: "#FFA500" },
];

const mainFeatures = [
  { icon: "users", title: "Devotee Management", desc: "Full family profiles with seva history, puja bookings, and lifetime giving records — all connected in one place.", tag: "Temple-Specific" },
  { icon: "calendar", title: "Festival & Utsav Budgeting", desc: "Dedicated budgets for Diwali, Navratri, Ganesh Chaturthi, and every major festival. Track income and expenses per event — before and after.", tag: "Temple-Specific" },
  { icon: "gift", title: "Seva & Puja Booking", desc: "Track special puja bookings, archana fees, and anna dana contributions. Every seva tracked, every receipt generated automatically.", tag: "Revenue Automation" },
  { icon: "file-text", title: "Tax Receipts & Statements", desc: "IRS-compliant giving statements for every devotee generated and emailed in one click. Never apologize for being late again.", tag: "Saves Hours" },
  { icon: "credit-card", title: "Online Dana & Mobile Giving", desc: "Accept offerings via card and mobile money. Devotees give from anywhere — festival day traffic handled without crashing.", tag: "Iris Pay" },
  { icon: "bar-chart", title: "Financial Reports", desc: "Fund balances, festival P&L, annadanam costs, and giving trends — ready for your trust board at any time.", tag: "Bilingual EN/FR" },
];

const railFeatures = [
  { icon: "book", title: "Bal Vihar / Sanskrit School", desc: "Tuition tracking, payment plans, and parent invoicing — automated." },
  { icon: "home", title: "Multi-Temple Support", desc: "Multiple mandirs or satellite locations? Consolidated finances with per-location breakdowns." },
  { icon: "sun", title: "Annadanam Cost Tracking", desc: "Track ingredient costs, volunteer hours, and meals served per event. Know your true cost per plate." },
  { icon: "layers", title: "Endowment & Trust Funds", desc: "Named endowments, memorial funds, and trust accounts tracked with full transparency." },
  { icon: "mail", title: "Devotee Acknowledgments", desc: "Auto-send thank-you receipts and seva confirmations after every offering." },
  { icon: "dollar", title: "Donor Pledge Management", desc: "Multi-year building fund pledges tracked with automated reminders and payment reconciliation." },
];

const testimonials = [
  { q: "During Diwali and Navratri we collect more in two weeks than any other month. We had no system for tracking it — envelopes, cash, a notebook. Iris Financial gave us an online dana portal, real-time totals by fund, and tax receipts sent automatically. Our trustees stopped asking questions because they could finally see the numbers.", name: "Pandit Ramesh S.", role: "Temple Administrator — Shri Venkateswara Temple, Pittsburgh PA", init: "R", primary: true },
  { q: "Our annadanam program serves 400 devotees every Sunday. We had no idea what it actually cost until we started tracking ingredient purchases, gas, and volunteer expenses per week. Now we budget properly and our donors give more when they see the impact.", name: "Trustee Priya M.", role: "BAPS Swaminarayan Sanstha, Houston TX", init: "P", primary: false },
  { q: "The Bal Vihar billing alone saved our administrator 10 hours a month. 120 students, monthly tuition, payment reminders — all automated. Parents get receipts. We get paid on time.", name: "Secretary Anand K.", role: "Hindu Temple of Greater Cincinnati, OH", init: "A", primary: false },
];

export default function HinduTemplePage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", temple: "", email: "", size: "" });
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
      await fetch("https://formspree.io/f/xzeblboa", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, temple: form.temple, email: form.email, devotee_count: form.size, vertical: "Hindu Temple" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=hindutemple&ref=landing"; }, 2000);
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

      {/* FESTIVAL BAR */}
      <div className="festival-bar">
        <div className="fb-item"><span className="fb-diya">🪔</span><span className="fb-val">Navratri</span><span>festival active · Day 4</span></div>
        <div className="fb-item"><span className="fb-val">$135,400</span><span>total dana this year</span></div>
        <div className="fb-item"><span className="fb-val">Annadanam</span><span>400 served this Sunday</span></div>
        <div className="fb-item"><span className="fb-val">Building Fund</span><span>$51,200 raised</span></div>
        <div className="fb-item"><span className="fb-val">Bal Vihar</span><span>120 students enrolled</span></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-mandala" />
        <div className="hero-glow" />
        <div className="hero-layout">
          <div>
            <div className="hero-om">ॐ</div>
            <div className="hero-label">Built for Hindu Temples & Mandirs</div>
            <h1 className="hero-title">
              Every dana.<br />
              Every seva.<br />
              <em>Accounted for.</em>
            </h1>
            <p className="hero-sub">
              Festival budgeting, dana fund tracking, seva booking, annadanam costing, and IRS giving statements — one platform built for temples and mandirs. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-saffron" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-ghost">Watch Demo ▶</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="dana-card">
              <div className="dc-head">
                <span className="dc-title">Dana Dashboard — This Year</span>
                <div className="dc-live"><div className="dc-dot" /><span className="dc-live-txt">Live</span></div>
              </div>
              <div className="dc-funds">
                <div className="dc-fund-head"><span>Fund</span><span>Collected</span></div>
                {funds.map((f, i) => (
                  <div className="dc-fund-row" key={i}>
                    <div className="dc-fund-left">
                      <div className="dc-fund-dot" style={{ background: f.color }} />
                      <div><div className="dc-fund-name">{f.name}</div><div className="dc-fund-sub">{f.sub}</div></div>
                    </div>
                    <div className="dc-fund-val">{f.val}</div>
                  </div>
                ))}
              </div>
              <div className="dc-total">
                <span className="dc-total-lbl">Total Dana This Year</span>
                <span className="dc-total-val">$135,400</span>
              </div>
              <div className="dc-footer-strip">
                <span style={{ color: "var(--saffron)", fontSize: 14 }}>✓</span>
                <span className="dc-footer-txt">All funds separated · IRS receipts auto-generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-layout">
          <div className="pain-left">
            <div className="pain-eyebrow">The festival problem</div>
            <h2 className="pain-headline">Diwali brings your<br />biggest collections.<br /><em>And your biggest chaos.</em></h2>
            <p className="pain-deck">For two weeks every year, donations pour in from hundreds of devotees — cash, checks, envelopes, online. By the time Diwali ends, no one can reconcile where it all went or which fund it belongs to.</p>
            <div className="pain-festival">
              <div className="pain-fest-label">A typical Diwali weekend — untracked</div>
              {[
                { desc: "Cash collections across 3 hundi boxes", val: "~$8,200", warn: false },
                { desc: "Checks received — not yet deposited", val: "22 checks", warn: false },
                { desc: "Online dana — wrong fund allocation", val: "$3,400", warn: true },
                { desc: "Puja bookings not invoiced", val: "14 bookings", warn: true },
                { desc: "Building fund vs general fund split — unknown", val: "?", warn: true },
              ].map((r, i) => (
                <div className="pain-fest-row" key={i}>
                  <span className="pain-fest-desc">{r.desc}</span>
                  <span className={`pain-fest-val ${r.warn ? "warn" : ""}`}>{r.val}</span>
                </div>
              ))}
              <div className="pain-fest-total">
                <span className="pain-fest-total-lbl">Time to reconcile manually</span>
                <span className="pain-fest-total-val">3 weeks</span>
              </div>
            </div>
          </div>
          <div className="pain-right">
            {[
              { icon: "layers", title: "All dana in one account", body: "Nitya puja collections, Diwali donations, Annadanam contributions — all going into the same account. Your trust board can't see how much each program actually raised or spent." },
              { icon: "calendar", title: "Festival budgets built on guesswork", body: "You know last Navratri cost 'around $12,000.' You don't know the actual breakdown by item, vendor, or program. This year's budget is last year's guess plus 10%." },
            ].map((p, i) => (
              <div className="pain-issue" key={i}>
                <span className="pain-issue-icon"><IconH name={p.icon} size={28} /></span>
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
          <h2 className="s-title">Every tool your mandir<br />needs to <em>run clearly.</em></h2>
          <p className="s-body">Not generic nonprofit software. Built for the financial complexity of Hindu temple operations — from daily puja to Diwali to Bal Vihar.</p>
          <div className="features-grid">
            {mainFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <span className="feat-icon"><IconH name={f.icon} size={24} /></span>
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
              <span className="rail-icon"><IconH name={f.icon} size={22} /></span>
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
              ["Festival budget tracking", "✓ Built-in per event", "✗ Manual spreadsheet"],
              ["Dana fund separation", "✓ Automatic by fund", "✗ Manual allocation"],
              ["Seva & puja booking receipts", "✓ Auto-generated", "✗ Not available"],
              ["Annadanam cost tracking", "✓ Built-in", "✗ Not available"],
              ["Year-end giving statements", "✓ 1-click bulk email", "✗ Manual in Word"],
              ["Online dana portal", "✓ Iris Pay included", "✗ Extra integration"],
              ["Bal Vihar / school billing", "✓ Built-in", "✗ Separate tool"],
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
          <div className="s-label">From the mandir</div>
          <h2 className="s-title" style={{ marginBottom: 0 }}>What temples are saying</h2>
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
            <p>Start on the Starter plan — free forever, no credit card needed. Get your dana funds separated and your devotee records set up in 15 minutes.</p>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-cadence">per month · Starter plan · forever free</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) unlocks unlimited transactions, invoices, users, and advanced features.</div>
          </div>
          <div className="pricing-right">
            <div className="s-label" style={{ display: "block", marginBottom: 28 }}>What's included</div>
            {[
              "Devotee profiles & giving records (Starter: up to 50 transactions/mo)",
              "Festival & utsav dedicated fund tracking",
              "Seva, puja booking & archana fee receipts",
              "Annadanam program cost tracking",
              "IRS-compliant year-end giving statements (bulk email)",
              "Online dana portal + Iris Pay mobile giving",
              "Bal Vihar / Sanskrit school billing",
              "Trust board financial reports",
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
          <h2 className="cta-title">Every seva deserves<br />a clear <em>account.</em></h2>
          <p className="cta-sub">Every rupee offered, every festival expense, every Bal Vihar tuition deserves transparency. Iris Financial gives your trust board and your devotees the clarity they deserve — free to start.</p>
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
                <div className="modal-s">Set up your temple account in 15 minutes. No credit card required.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Pandit / Secretary / Trustee" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Temple Name</label><input className="f-input" placeholder="e.g. Shri Venkateswara Temple" value={form.temple} onChange={e => setForm({ ...form, temple: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="your@temple.org" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Devotee Families</label>
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
                <div className="success-icon"><Sun size={48} /></div>
                <div className="success-h">Jai Shri Ram! 🙏</div>
                <p className="success-p">Setup link on its way to <strong style={{ color: "var(--saffron)" }}>{form.email}</strong>. Your temple's finances are about to become much clearer.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
