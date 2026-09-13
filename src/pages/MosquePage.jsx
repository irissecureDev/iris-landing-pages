import { useState, useEffect } from "react";
import { Users, PieChart, FileText, Heart, CreditCard, BarChart2, Star, DollarSign, Mail, BookOpen, Home, Calendar, Shield } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --sand: #F5EDD8;
    --parchment: #EDE0C4;
    --dune: #D9C9A8;
    --dune-dark: #C4A87A;
    --emerald: #1B6B3A;
    --emerald-mid: #256B44;
    --emerald-light: #2E8B57;
    --emerald-glow: rgba(27,107,58,0.12);
    --gold: #B8860B;
    --gold-light: #DAA520;
    --ink: #1A1208;
    --text-mid: #5C4A2A;
    --text-soft: #8B7355;
    --white: #FFFEF9;
    --green-ok: #16A34A;
    --red-warn: #DC2626;
    --pattern-color: rgba(27,107,58,0.06);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--sand); color: var(--ink); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(27,107,58,0.35); } 50% { box-shadow: 0 0 0 12px rgba(27,107,58,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes float { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
  @keyframes patternDrift { from { background-position: 0 0; } to { background-position: 60px 60px; } }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; padding: 0 48px;
    background: rgba(245,237,216,0.96); backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--dune);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-left { display: flex; align-items: center; }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 14px; font-weight: 500; color: var(--text-mid); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--emerald); }
  .nav-cta {
    background: var(--emerald); color: white;
    padding: 10px 24px; border-radius: 4px; border: none; cursor: pointer;
    font-weight: 600; font-size: 14px; letter-spacing: 0.03em;
    transition: all 0.25s; box-shadow: 0 4px 16px rgba(27,107,58,0.3);
  }
  .nav-cta:hover { background: var(--emerald-light); transform: translateY(-1px); }

  /* PRAYER BAR */
  .prayer-bar {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 199;
    height: 34px; background: var(--emerald);
    display: flex; align-items: center; justify-content: center; gap: 0;
  }
  .pb-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 28px; border-right: 1px solid rgba(255,255,255,0.15);
    font-size: 12px; color: rgba(255,255,255,0.65);
  }
  .pb-item:last-child { border-right: none; }
  .pb-val { color: var(--gold-light); font-weight: 700; }
  .pb-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold-light); animation: blink 2s infinite; }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--sand);
    padding: 120px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-pattern {
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(0deg, var(--pattern-color) 0, var(--pattern-color) 1px, transparent 0, transparent 50%),
      repeating-linear-gradient(90deg, var(--pattern-color) 0, var(--pattern-color) 1px, transparent 0, transparent 50%);
    background-size: 30px 30px;
    opacity: 1;
  }
  .hero-arch {
    position: absolute; right: -60px; top: 0; bottom: 0; width: 580px;
    background: var(--emerald-glow);
    clip-path: ellipse(100% 100% at 100% 50%);
    pointer-events: none;
  }
  .hero-layout {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
    max-width: 1200px; margin: 0 auto; width: 100%; align-items: center;
  }
  .hero-bismillah {
    font-family: 'Amiri', serif; font-size: 22px; color: var(--emerald);
    margin-bottom: 18px; letter-spacing: 0.06em; opacity: 0.7;
    animation: fadeUp 0.5s ease both;
  }
  .hero-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    color: var(--emerald); margin-bottom: 16px; text-transform: uppercase;
    animation: fadeUp 0.5s 0.05s ease both;
  }
  .hero-title {
    font-family: 'Amiri', serif;
    font-size: clamp(48px, 6vw, 78px); font-weight: 700; line-height: 1.1;
    color: var(--ink); margin-bottom: 24px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title em { font-style: italic; color: var(--emerald); }
  .hero-title .gold { color: var(--gold); }
  .hero-sub {
    font-size: 17px; color: var(--text-mid); line-height: 1.8; font-weight: 300;
    max-width: 460px; margin-bottom: 40px; border-left: 3px solid var(--dune-dark);
    padding-left: 20px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-emerald {
    background: var(--emerald); color: white;
    padding: 16px 36px; border-radius: 4px; border: none; cursor: pointer;
    font-weight: 600; font-size: 15px; transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 6px 24px rgba(27,107,58,0.35);
  }
  .btn-emerald:hover { background: var(--emerald-light); transform: translateY(-2px); }
  .btn-soft {
    background: white; color: var(--ink);
    padding: 14px 32px; border-radius: 4px; cursor: pointer;
    font-weight: 500; font-size: 15px;
    border: 1.5px solid var(--dune); transition: all 0.25s;
  }
  .btn-soft:hover { border-color: var(--emerald); color: var(--emerald); }

  /* HERO RIGHT — FUND CARD */
  .hero-right { animation: scaleIn 0.7s 0.35s ease both; }
  .fund-card {
    background: white; border-radius: 4px;
    border: 1.5px solid var(--dune);
    box-shadow: 0 32px 72px rgba(92,74,42,0.14);
    overflow: hidden;
  }
  .fc-head {
    background: var(--emerald); padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .fc-title { font-family: 'Amiri', serif; font-size: 16px; font-weight: 700; color: white; }
  .fc-live { display: flex; align-items: center; gap: 6px; }
  .fc-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold-light); animation: blink 2s infinite; }
  .fc-live-txt { font-size: 11px; color: var(--gold-light); font-weight: 700; letter-spacing: 0.06em; }
  .fc-funds { padding: 0 24px; }
  .fc-fund-head {
    display: flex; justify-content: space-between; padding: 12px 0 8px;
    border-bottom: 1px solid var(--dune);
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--text-soft);
  }
  .fc-fund-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 0; border-bottom: 1px solid rgba(0,0,0,0.04);
    transition: background 0.15s;
  }
  .fc-fund-row:last-child { border-bottom: none; }
  .fc-fund-left { display: flex; align-items: center; gap: 10px; }
  .fc-fund-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .fc-fund-name { font-size: 14px; font-weight: 600; color: var(--ink); }
  .fc-fund-sub { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
  .fc-fund-val { font-family: 'Amiri', serif; font-size: 18px; font-weight: 700; color: var(--emerald); }
  .fc-total {
    background: var(--parchment); padding: 16px 24px; border-top: 2px solid var(--emerald);
    display: flex; align-items: center; justify-content: space-between;
  }
  .fc-total-lbl { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: var(--text-soft); }
  .fc-total-val { font-family: 'Amiri', serif; font-size: 28px; font-weight: 700; color: var(--emerald); }
  .fc-badges { display: flex; gap: 8px; padding: 12px 24px; border-top: 1px solid var(--dune); flex-wrap: wrap; }
  .fc-badge {
    font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 3px;
    background: var(--parchment); border: 1px solid var(--dune); color: var(--text-soft);
  }
  .fc-badge.active { background: rgba(27,107,58,0.08); border-color: rgba(27,107,58,0.25); color: var(--emerald); }

  /* PAIN — FULL BLEED */
  .pain { background: var(--emerald); padding: 0; }
  .pain-layout { display: grid; grid-template-columns: 1.2fr 1fr; }
  .pain-left {
    padding: 80px 56px 80px 48px; border-right: 1px solid rgba(255,255,255,0.1);
    position: relative; overflow: hidden;
  }
  .pain-left::before {
    content: ''; position: absolute; inset: 0;
    background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 0, transparent 50%);
    background-size: 20px 20px;
  }
  .pain-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--gold-light); margin-bottom: 20px; position: relative; }
  .pain-headline {
    font-family: 'Amiri', serif; font-size: clamp(36px, 4.5vw, 56px);
    font-weight: 700; line-height: 1.1; color: white; margin-bottom: 24px; position: relative;
  }
  .pain-headline em { font-style: italic; color: var(--gold-light); }
  .pain-deck { font-size: 16px; color: rgba(255,255,255,0.65); line-height: 1.8; font-weight: 300; margin-bottom: 40px; position: relative; }
  .pain-zakat {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
    padding: 24px 28px; position: relative;
  }
  .pain-zakat-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--gold-light); margin-bottom: 14px; }
  .pain-zakat-row { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; }
  .pain-zakat-row:last-child { border-bottom: none; }
  .pain-zakat-desc { color: rgba(255,255,255,0.55); }
  .pain-zakat-val { font-family: 'Amiri', serif; font-size: 17px; font-weight: 700; color: white; }
  .pain-zakat-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-top: 14px; border-top: 2px solid rgba(218,165,32,0.4); }
  .pain-zakat-total-lbl { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.65); }
  .pain-zakat-total-val { font-family: 'Amiri', serif; font-size: 30px; font-weight: 700; color: var(--gold-light); }

  .pain-right { padding: 80px 48px 80px 40px; display: flex; flex-direction: column; gap: 40px; justify-content: center; }
  .pain-issue { padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .pain-issue:last-child { padding-bottom: 0; border-bottom: none; }
  .pain-issue-icon { color: var(--gold-light); margin-bottom: 14px; display: block; }
  .pain-issue h3 { font-family: 'Amiri', serif; font-size: 22px; font-weight: 700; color: white; margin-bottom: 10px; }
  .pain-issue p { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.75; }

  /* FEATURES */
  .features { background: var(--sand); padding: 100px 48px; border-top: 1px solid var(--dune); }
  .features-inner { max-width: 1200px; margin: 0 auto; }
  .s-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--emerald); margin-bottom: 14px; text-transform: uppercase; }
  .s-title { font-family: 'Amiri', serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 700; line-height: 1.1; color: var(--ink); margin-bottom: 14px; }
  .s-title em { font-style: italic; color: var(--emerald); }
  .s-body { font-size: 16px; color: var(--text-mid); line-height: 1.75; font-weight: 300; max-width: 540px; }
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 56px; }
  .feat-card {
    background: white; border-radius: 4px; padding: 36px;
    border: 1.5px solid var(--dune); transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
  }
  .feat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--emerald), var(--gold));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
  }
  .feat-card:hover::before { transform: scaleX(1); }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 56px rgba(92,74,42,0.1); }
  .feat-icon { color: var(--emerald); margin-bottom: 18px; display: block; }
  .feat-card h3 { font-family: 'Amiri', serif; font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
  .feat-card p { font-size: 14px; color: var(--text-mid); line-height: 1.7; }
  .feat-tag { display: inline-block; margin-top: 14px; background: rgba(27,107,58,0.08); border: 1px solid rgba(27,107,58,0.2); color: var(--emerald); padding: 3px 10px; border-radius: 3px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; }

  /* RAIL */
  .rail-section { background: var(--parchment); padding: 80px 0; border-top: 1px solid var(--dune); overflow: hidden; }
  .rail-header { padding: 0 48px 36px; max-width: 1100px; margin: 0 auto; }
  .rail-scroll { display: flex; gap: 16px; padding: 0 48px; overflow-x: auto; scrollbar-width: none; }
  .rail-scroll::-webkit-scrollbar { display: none; }
  .rail-card { background: white; border: 1.5px solid var(--dune); padding: 28px 24px; min-width: 240px; flex-shrink: 0; border-radius: 4px; transition: all 0.3s; }
  .rail-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(92,74,42,0.1); border-color: rgba(27,107,58,0.3); }
  .rail-icon { color: var(--emerald); margin-bottom: 12px; display: block; }
  .rail-card h3 { font-family: 'Amiri', serif; font-size: 19px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .rail-card p { font-size: 13px; color: var(--text-mid); line-height: 1.65; }
  .rail-hint { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-soft); letter-spacing: 0.06em; }

  /* COMPARISON */
  .comparison { background: var(--sand); padding: 100px 48px; border-top: 1px solid var(--dune); }
  .comparison-inner { max-width: 880px; margin: 0 auto; }
  .comp-wrap {
    background: white; border-radius: 4px; overflow: hidden;
    border: 1.5px solid var(--dune); margin-top: 52px;
    box-shadow: 0 16px 56px rgba(92,74,42,0.08);
  }
  .comp-head { display: grid; grid-template-columns: 1.4fr 1fr 1fr; background: var(--emerald); }
  .ch { padding: 18px 22px; }
  .ch.f { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 600; letter-spacing: 0.08em; }
  .ch.i { font-family: 'Amiri', serif; font-size: 18px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px; }
  .ch.o { font-family: 'Amiri', serif; font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.45); }
  .iris-pill { background: var(--gold-light); color: var(--emerald); font-size: 9px; font-family: 'DM Sans', sans-serif; font-weight: 800; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 2px; }
  .comp-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-top: 1px solid var(--dune); transition: background 0.2s; }
  .comp-row:hover { background: rgba(27,107,58,0.03); }
  .cc { padding: 14px 22px; font-size: 13px; display: flex; align-items: center; gap: 7px; }
  .cc.f { color: var(--ink); font-weight: 600; }
  .cc.i { color: var(--text-mid); font-weight: 500; }
  .cc.o { color: var(--text-soft); }
  .ck { color: var(--green-ok); font-size: 16px; font-weight: 700; }
  .cx { color: var(--red-warn); font-size: 16px; font-weight: 700; }
  .price-row { background: rgba(27,107,58,0.04); border-top: 2px solid rgba(27,107,58,0.2) !important; }
  .big-i { font-family: 'Amiri', serif; font-size: 26px; font-weight: 700; color: var(--emerald) !important; }
  .big-o { font-family: 'Amiri', serif; font-size: 24px; font-weight: 700; color: var(--red-warn) !important; }

  /* TESTIMONIALS — EDITORIAL */
  .testimonials { background: var(--ink); padding: 100px 48px; }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--gold-light); margin-bottom: 14px; text-transform: uppercase; }
  .testi-title { font-family: 'Amiri', serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 700; color: white; margin-bottom: 0; }
  .testi-primary-wrap { background: var(--gold); padding: 56px 64px; margin-top: 52px; }
  .testi-primary-q { font-family: 'Amiri', serif; font-size: 96px; font-weight: 700; color: rgba(0,0,0,0.1); line-height: 1; margin-bottom: -26px; }
  .testi-primary-text { font-family: 'Amiri', serif; font-size: clamp(19px, 2.5vw, 25px); font-weight: 700; line-height: 1.45; color: var(--ink); margin-bottom: 36px; max-width: 800px; }
  .testi-primary-author { display: flex; align-items: center; gap: 16px; }
  .testi-primary-av { width: 46px; height: 46px; background: var(--ink); color: var(--gold-light); font-family: 'Amiri', serif; font-size: 20px; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 3px; flex-shrink: 0; }
  .testi-primary-name { font-weight: 700; font-size: 15px; color: var(--ink); }
  .testi-primary-role { font-size: 13px; color: rgba(26,18,8,0.6); margin-top: 2px; }
  .testi-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 3px; }
  .testi-secondary { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 36px; transition: background 0.2s; }
  .testi-secondary:hover { background: rgba(27,107,58,0.08); }
  .testi-sec-text { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.75; font-style: italic; margin-bottom: 24px; }
  .testi-sec-author { display: flex; align-items: center; gap: 12px; }
  .testi-sec-av { width: 38px; height: 38px; border-radius: 3px; background: var(--emerald); color: white; font-family: 'Amiri', serif; font-size: 17px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .testi-sec-name { font-weight: 700; font-size: 14px; color: white; }
  .testi-sec-role { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 2px; }

  /* PRICING — SPLIT */
  .pricing { background: var(--parchment); border-top: 1px solid var(--dune); }
  .pricing-layout { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
  .pricing-left { padding: 80px 56px 80px 48px; border-right: 1px solid var(--dune); display: flex; flex-direction: column; justify-content: center; }
  .pricing-amount { font-family: 'Amiri', serif; font-size: 100px; font-weight: 700; color: var(--emerald); line-height: 1; }
  .pricing-amount sup { font-size: 42px; vertical-align: top; margin-top: 20px; }
  .pricing-cadence { font-size: 15px; color: var(--text-soft); margin: 8px 0 32px; }
  .pricing-left p { font-size: 15px; color: var(--text-mid); line-height: 1.75; font-weight: 300; margin-bottom: 32px; }
  .pricing-cta { width: 100%; background: var(--emerald); color: white; padding: 17px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; border-radius: 4px; transition: all 0.25s; box-shadow: 0 8px 32px rgba(27,107,58,0.3); }
  .pricing-cta:hover { background: var(--emerald-light); transform: translateY(-2px); }
  .pricing-note { font-size: 13px; color: var(--text-soft); margin-top: 12px; }
  .pricing-right { padding: 80px 48px; }
  .p-feat { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--dune); font-size: 14px; color: var(--text-mid); }
  .p-feat:last-child { border-bottom: none; }
  .p-ck { color: var(--green-ok); font-size: 16px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-section { background: var(--emerald); padding: 90px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before {
    content: ''; position: absolute; inset: 0;
    background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%);
    background-size: 20px 20px;
  }
  .cta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
  .cta-title { font-family: 'Amiri', serif; font-size: clamp(36px, 5vw, 58px); font-weight: 700; color: white; line-height: 1.1; margin-bottom: 20px; }
  .cta-title em { font-style: italic; color: var(--gold-light); }
  .cta-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.75; margin-bottom: 40px; font-weight: 300; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: white; color: var(--emerald); padding: 18px 48px; border-radius: 4px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; transition: all 0.25s; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
  .cta-btn-main:hover { background: var(--sand); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.7); padding: 16px 44px; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 15px; border: 1.5px solid rgba(255,255,255,0.3); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: var(--gold-light); color: var(--gold-light); }

  /* FOOTER */
  .footer { background: var(--ink); padding: 30px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.25); }
  .footer-copy strong { color: var(--gold-light); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: rgba(255,255,255,0.25); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--gold-light); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(26,18,8,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: white; border-radius: 4px; padding: 48px; max-width: 480px; width: 100%; position: relative; border: 1.5px solid var(--dune); animation: scaleIn 0.3s ease; box-shadow: 0 40px 80px rgba(26,18,8,0.2); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: var(--sand); border: 1px solid var(--dune); color: var(--text-soft); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; border-radius: 3px; }
  .modal-x:hover { border-color: var(--emerald); color: var(--emerald); }
  .modal-h { font-family: 'Amiri', serif; font-size: 28px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .modal-s { color: var(--text-soft); font-size: 14px; margin-bottom: 28px; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--emerald); margin-bottom: 6px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 12px 16px; background: var(--sand); border: 1.5px solid var(--dune); font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--ink); outline: none; transition: border-color 0.2s; border-radius: 3px; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-input:focus { border-color: var(--emerald); background: white; }
  .f-btn { width: 100%; background: var(--emerald); color: white; padding: 15px; border: none; cursor: pointer; font-weight: 600; font-size: 15px; border-radius: 4px; margin-top: 8px; transition: all 0.25s; box-shadow: 0 6px 24px rgba(27,107,58,0.3); }
  .f-btn:hover { background: var(--emerald-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-icon { color: var(--emerald); margin-bottom: 16px; display: flex; justify-content: center; }
  .success-h { font-family: 'Amiri', serif; font-size: 28px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
  .success-p { color: var(--text-mid); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .prayer-bar { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-layout { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .pain-layout { grid-template-columns: 1fr; }
    .pain-left { padding: 60px 20px 40px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .pain-right { padding: 40px 20px 60px; }
    .features-grid { grid-template-columns: 1fr; }
    .testi-secondary-grid { grid-template-columns: 1fr; }
    .pricing-layout { grid-template-columns: 1fr; }
    .pricing-left { padding: 60px 20px; border-right: none; border-bottom: 1px solid var(--dune); }
    .pricing-right { padding: 60px 20px; }
    .features, .comparison, .testimonials, .cta-section { padding: 70px 20px; }
    .comp-head, .comp-row { grid-template-columns: 1.2fr 1fr 1fr; }
    .cc, .ch { padding: 12px 14px; font-size: 12px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
    .testi-primary-wrap { padding: 40px 28px; }
  }
`;

const IconM = ({ name, size = 24 }) => {
  const icons = {
    users: <Users size={size} />, "pie-chart": <PieChart size={size} />,
    "file-text": <FileText size={size} />, heart: <Heart size={size} />,
    "credit-card": <CreditCard size={size} />, "bar-chart": <BarChart2 size={size} />,
    star: <Star size={size} />, dollar: <DollarSign size={size} />,
    mail: <Mail size={size} />, book: <BookOpen size={size} />,
    home: <Home size={size} />, calendar: <Calendar size={size} />,
    shield: <Shield size={size} />,
  };
  return icons[name] || null;
};

const funds = [
  { name: "Zakat", sub: "Obligatory giving", val: "$12,840", color: "#1B6B3A" },
  { name: "Sadaqah", sub: "Voluntary donations", val: "$8,420", color: "#B8860B" },
  { name: "Masjid Building Fund", sub: "Expansion project", val: "$31,200", color: "#2E8B57" },
  { name: "Islamic School", sub: "Education programs", val: "$9,640", color: "#8B6914" },
  { name: "Iftar & Ramadan", sub: "Community programs", val: "$4,280", color: "#4A7C59" },
];

const mainFeatures = [
  { icon: "users", title: "Donor Management", desc: "Full donor profiles with Zakat eligibility tracking, giving history by fund, and family grouping.", tag: "Mosque-Specific" },
  { icon: "pie-chart", title: "Dedicated Fund Tracking", desc: "Separate Zakat, Sadaqah, building, education, and Ramadan funds. Board-ready transparency at all times.", tag: "Mosque-Specific" },
  { icon: "file-text", title: "Year-End Giving Statements", desc: "IRS-compliant tax receipts generated and emailed to every donor in one click. Before January ends.", tag: "Saves Hours" },
  { icon: "shield", title: "Zakat Calculation & Distribution", desc: "Track Nisab thresholds, calculate eligible amounts, and record distributions to the eight categories of recipients.", tag: "Islamic Finance" },
  { icon: "credit-card", title: "Online & Mobile Giving", desc: "Accept donations via card or mobile money. Ramadan giving spikes handled automatically — no crashes.", tag: "Iris Pay" },
  { icon: "bar-chart", title: "Financial Reports", desc: "Fund balances, P&L, giving trends — board-ready reports your congregation can trust.", tag: "Bilingual EN/FR" },
];

const railFeatures = [
  { icon: "book", title: "Quran School Billing", desc: "Tuition tracking for Islamic school students. Invoices and payment plans automated." },
  { icon: "calendar", title: "Event & Program Budgeting", desc: "Ramadan iftars, Eid events, community programs tracked with dedicated budgets." },
  { icon: "home", title: "Multi-Location Support", desc: "Running more than one masjid? Consolidated reporting across all locations." },
  { icon: "dollar", title: "Sadaqah Jariyah Tracking", desc: "Track ongoing charity projects — water wells, scholarships — with dedicated fund ledgers." },
  { icon: "mail", title: "Donor Acknowledgment Emails", desc: "Auto-send thank-you emails with giving summaries after every donation." },
  { icon: "star", title: "Ramadan Giving Dashboard", desc: "See donation spikes in real time during the last 10 nights. Allocate funds immediately." },
];

const testimonials = [
  { q: "We had Zakat donations mixed in with our general fund for years. No one could tell the board exactly how much Zakat came in or where it went. Iris Financial gave us separate fund tracking from day one — our Ramadan Zakat report now takes 20 minutes instead of two weeks.", name: "Brother Ahmed K.", role: "Treasurer — Islamic Center of Houston, TX", init: "A", primary: true },
  { q: "Our donors kept asking for tax receipts in January. We were doing them manually in Word. Now we click one button and 340 donors get their statements by email.", name: "Sister Fatima N.", role: "Finance Committee — Masjid Al-Noor, Atlanta GA", init: "F", primary: false },
  { q: "The building fund tracking built more donations than any campaign we ran. Our congregation can see the balance after every Jumu'ah. Transparency is the best fundraising tool.", name: "Imam Hassan R.", role: "Masjid Al-Rahman, Detroit MI", init: "H", primary: false },
];

export default function MosquePage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", masjid: "", email: "", size: "" });
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
      await fetch("https://formspree.io/f/xzeblpzb", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, masjid: form.masjid, email: form.email, congregation_size: form.size, vertical: "Mosque" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=mosque&ref=landing"; }, 2000);
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

      {/* PRAYER BAR */}
      <div className="prayer-bar">
        <div className="pb-item"><div className="pb-dot" /><span className="pb-val">Jumu'ah</span><span>today at 1:15 PM</span></div>
        <div className="pb-item"><span className="pb-val">$66,380</span><span>total funds this year</span></div>
        <div className="pb-item"><span className="pb-val">Ramadan</span><span>giving portal active</span></div>
        <div className="pb-item"><span className="pb-val">340</span><span>donor statements ready</span></div>
        <div className="pb-item"><span className="pb-val">Building Fund</span><span>$31,200 raised</span></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-pattern" />
        <div className="hero-arch" />
        <div className="hero-layout">
          <div>
            <div className="hero-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div className="hero-label">Built for Masajid & Islamic Organizations</div>
            <h1 className="hero-title">
              Masjid finances,<br />
              finally <em>transparent</em><br />
              and <span className="gold">trusted.</span>
            </h1>
            <p className="hero-sub">
              Zakat tracking, Sadaqah fund management, donor giving statements, and IRS 990 reports — one platform built specifically for masajid and Islamic nonprofits. Free to start.
            </p>
            <div className="hero-actions">
              <button className="btn-emerald" onClick={() => setShowModal(true)}>Start Free — No Credit Card</button>
              <button className="btn-soft">Watch Demo ▶</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="fund-card">
              <div className="fc-head">
                <span className="fc-title">Fund Dashboard — This Year</span>
                <div className="fc-live"><div className="fc-dot" /><span className="fc-live-txt">Live</span></div>
              </div>
              <div className="fc-funds">
                <div className="fc-fund-head"><span>Fund</span><span>Collected</span></div>
                {funds.map((f, i) => (
                  <div className="fc-fund-row" key={i}>
                    <div className="fc-fund-left">
                      <div className="fc-fund-dot" style={{ background: f.color }} />
                      <div>
                        <div className="fc-fund-name">{f.name}</div>
                        <div className="fc-fund-sub">{f.sub}</div>
                      </div>
                    </div>
                    <div className="fc-fund-val">{f.val}</div>
                  </div>
                ))}
              </div>
              <div className="fc-total">
                <span className="fc-total-lbl">Total Funds This Year</span>
                <span className="fc-total-val">$66,380</span>
              </div>
              <div className="fc-badges">
                <span className="fc-badge active">Zakat Separated</span>
                <span className="fc-badge active">IRS Compliant</span>
                <span className="fc-badge">340 Donors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-layout">
          <div className="pain-left">
            <div className="pain-eyebrow">The transparency problem</div>
            <h2 className="pain-headline">Your congregation deserves<br />to know where their<br /><em>Zakat goes.</em></h2>
            <p className="pain-deck">Most masajid collect Zakat, Sadaqah, and building fund donations in the same account. When the treasurer can't show exactly how much Zakat came in and where it went, trust erodes.</p>
            <div className="pain-zakat">
              <div className="pain-zakat-label">Ramadan Zakat — Full Accountability</div>
              {[
                { desc: "Total Zakat collected (29 nights)", val: "$12,840" },
                { desc: "Distributed to families in need", val: "$8,200" },
                { desc: "Distributed to Islamic school fund", val: "$2,640" },
                { desc: "Administrative (max 12.5%)", val: "$1,000" },
                { desc: "Remaining — next distribution", val: "$1,000" },
              ].map((r, i) => (
                <div className="pain-zakat-row" key={i}>
                  <span className="pain-zakat-desc">{r.desc}</span>
                  <span className="pain-zakat-val">{r.val}</span>
                </div>
              ))}
              <div className="pain-zakat-total">
                <span className="pain-zakat-total-lbl">Board report generated in</span>
                <span className="pain-zakat-total-val">2 minutes</span>
              </div>
            </div>
          </div>
          <div className="pain-right">
            {[
              { icon: "pie-chart", title: "Zakat mixed with general funds", body: "Donors give Zakat with the intention it reaches the eight eligible categories. When it sits in a general account, you can't prove it did — and you shouldn't have to guess." },
              { icon: "calendar", title: "Ramadan chaos, every year", body: "Donations triple in the last 10 nights. Your treasurer is reconciling envelopes at midnight. None of it is tracked properly until weeks after Eid." },
            ].map((p, i) => (
              <div className="pain-issue" key={i}>
                <span className="pain-issue-icon"><IconM name={p.icon} size={28} /></span>
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
          <h2 className="s-title">Everything your masjid<br />needs in <em>one place.</em></h2>
          <p className="s-body">Not generic accounting software. Built for the financial reality of Islamic organizations — from Zakat to Quran school tuition.</p>
          <div className="features-grid">
            {mainFeatures.map((f, i) => (
              <div className="feat-card" key={i}>
                <span className="feat-icon"><IconM name={f.icon} size={24} /></span>
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
              <span className="rail-icon"><IconM name={f.icon} size={22} /></span>
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
          <h2 className="s-title">Iris Financial vs.<br /><em>QuickBooks for nonprofits</em></h2>
          <div className="comp-wrap">
            <div className="comp-head">
              <div className="ch f">Feature</div>
              <div className="ch i">Iris Financial <span className="iris-pill">Best</span></div>
              <div className="ch o">QuickBooks</div>
            </div>
            {[
              ["Zakat fund separation", "✓ Built-in", "✗ Manual workaround"],
              ["Donor management", "✓ Built-in", "✗ Not available"],
              ["Year-end giving statements", "✓ 1-click bulk email", "✗ Not available"],
              ["IRS Form 990 export", "✓ Included", "✗ Requires add-on"],
              ["Ramadan giving portal", "✓ Built-in", "✗ Not available"],
              ["Online & mobile giving", "✓ Iris Pay included", "✗ Extra integration"],
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
              <div className="cc o"><span className="big-o">$115/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testi-inner">
          <div className="testi-label">From the community</div>
          <h2 className="testi-title">What Islamic centers say</h2>
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
            <p>Start on the Starter plan — free forever, no credit card needed. Get your Zakat and Sadaqah funds separated and your donor records set up in 15 minutes.</p>
            <div className="pricing-amount"><sup>$</sup>0</div>
            <div className="pricing-cadence">per month · Starter plan · forever free</div>
            <button className="pricing-cta" onClick={() => setShowModal(true)}>Start Free — No Credit Card Required</button>
            <div className="pricing-note">Professional ($79/mo) unlocks unlimited transactions, invoices, users, and advanced features.</div>
          </div>
          <div className="pricing-right">
            <div className="s-label" style={{ display: "block", marginBottom: 28 }}>What's included</div>
            {[
              "Donor profiles & giving records (Starter: up to 50 transactions/mo)",
              "Zakat, Sadaqah, and dedicated fund separation",
              "IRS-compliant year-end giving statements (bulk email)",
              "IRS Form 990 data exports",
              "Online giving links + mobile money (Iris Pay)",
              "Ramadan giving dashboard",
              "Quran school and program billing",
              "Financial reports for board meetings",
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
          <h2 className="cta-title">Your congregation's trust<br />starts with <em>transparency.</em></h2>
          <p className="cta-sub">Every dollar donated to your masjid deserves a clear record. Iris Financial gives your board and your community the visibility they deserve — free to start, 15 minutes to set up.</p>
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
                <div className="modal-s">Set up your masjid account in 15 minutes. No credit card required.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Imam / Treasurer name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Masjid Name</label><input className="f-input" placeholder="e.g. Masjid Al-Noor" value={form.masjid} onChange={e => setForm({ ...form, masjid: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Email Address</label><input className="f-input" type="email" placeholder="your@masjid.org" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Congregation Size</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
                    <option value="">Select size</option>
                    <option>Under 100 members</option>
                    <option>100–300 members</option>
                    <option>300–700 members</option>
                    <option>700+ members</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div className="success-icon"><Heart size={48} /></div>
                <div className="success-h">Barakallahu feekum!</div>
                <p className="success-p">Setup link on its way to <strong style={{ color: "var(--emerald)" }}>{form.email}</strong>. Your community's finances will never be a mystery again.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
