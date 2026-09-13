import { useState, useEffect } from "react";
import { CheckSquare, MessageSquare, DollarSign, Users, FileText, Zap, BarChart2, Shield, Globe, ArrowRight, X, Check, ChevronDown, Star } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --white: #FFFFFF;
    --gray-50: #F8FAFC;
    --gray-100: #F1F5F9;
    --gray-200: #E2E8F0;
    --gray-300: #CBD5E1;
    --gray-400: #94A3B8;
    --gray-500: #64748B;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-800: #1E293B;
    --gray-900: #0F172A;
    --indigo: #4F46E5;
    --indigo-light: #6366F1;
    --indigo-lighter: #818CF8;
    --indigo-bg: rgba(79,70,229,0.08);
    --indigo-border: rgba(79,70,229,0.2);
    --purple: #7C3AED;
    --green: #10B981;
    --green-bg: rgba(16,185,129,0.08);
    --red: #EF4444;
    --amber: #F59E0B;
    --border: #E2E8F0;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--gray-900); overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(79,70,229,0.35); } 50% { box-shadow: 0 0 0 10px rgba(79,70,229,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes countUp { from { opacity: 0; } to { opacity: 1; } }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; padding: 0 48px;
    background: rgba(255,255,255,0.96); backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-product { font-size: 15px; font-weight: 700; color: var(--gray-900); }
  .nav-product span { color: var(--indigo); }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 14px; font-weight: 500; color: var(--gray-500); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--gray-900); }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .nav-login { font-size: 14px; font-weight: 500; color: var(--gray-600); cursor: pointer; padding: 8px 16px; border-radius: 8px; transition: all 0.2s; }
  .nav-login:hover { background: var(--gray-100); }
  .nav-cta {
    background: var(--indigo); color: white;
    padding: 9px 20px; border-radius: 8px; border: none; cursor: pointer;
    font-size: 14px; font-weight: 600; transition: all 0.2s;
    box-shadow: 0 1px 3px rgba(79,70,229,0.3), 0 4px 12px rgba(79,70,229,0.2);
  }
  .nav-cta:hover { background: var(--indigo-light); transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh; background: var(--white);
    padding: 120px 48px 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,70,229,0.06) 0%, transparent 70%);
  }
  .hero-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, var(--gray-200) 1px, transparent 1px);
    background-size: 28px 28px; opacity: 0.6;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
  }
  .hero-inner { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; width: 100%; text-align: center; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--indigo-bg); border: 1px solid var(--indigo-border);
    color: var(--indigo); padding: 6px 16px; border-radius: 100px;
    font-size: 13px; font-weight: 600; margin-bottom: 28px;
    animation: fadeUp 0.5s ease both;
  }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--indigo); animation: blink 2s infinite; }
  .hero-title {
    font-size: clamp(44px, 6vw, 76px); font-weight: 800; line-height: 1.1;
    color: var(--gray-900); margin-bottom: 24px; letter-spacing: -0.02em;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title .grad {
    background: linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-sub {
    font-size: 18px; color: var(--gray-500); line-height: 1.75; font-weight: 400;
    max-width: 600px; margin: 0 auto 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 14px; justify-content: center; margin-bottom: 20px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-indigo {
    background: var(--indigo); color: white;
    padding: 14px 28px; border-radius: 10px; border: none; cursor: pointer;
    font-size: 15px; font-weight: 600; transition: all 0.25s; animation: pulse 2.5s infinite;
    box-shadow: 0 4px 14px rgba(79,70,229,0.4);
    display: flex; align-items: center; gap: 8px;
  }
  .btn-indigo:hover { background: var(--indigo-light); transform: translateY(-2px); }
  .btn-outline {
    background: white; color: var(--gray-700);
    padding: 12px 24px; border-radius: 10px; cursor: pointer;
    font-size: 15px; font-weight: 500; border: 1.5px solid var(--border); transition: all 0.25s;
  }
  .btn-outline:hover { border-color: var(--indigo); color: var(--indigo); }
  .hero-note { font-size: 13px; color: var(--gray-400); animation: fadeUp 0.6s 0.4s ease both; }

  /* LOGO BAR */
  .logo-bar { background: var(--gray-50); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 20px 48px; }
  .logo-bar-inner { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .logo-bar-label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: var(--gray-400); text-transform: uppercase; margin-right: 8px; }
  .logo-bar-items { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; justify-content: center; }
  .logo-bar-item { font-size: 14px; font-weight: 600; color: var(--gray-300); letter-spacing: -0.01em; }
  .logo-bar-arrow { color: var(--gray-300); font-size: 14px; }

  /* SAVINGS CALCULATOR */
  .savings { background: var(--white); padding: 100px 48px; }
  .savings-inner { max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--indigo); text-transform: uppercase; margin-bottom: 14px; }
  .section-title { font-size: clamp(32px, 4vw, 48px); font-weight: 800; line-height: 1.1; color: var(--gray-900); margin-bottom: 14px; letter-spacing: -0.02em; }
  .section-title span { color: var(--indigo); }
  .section-sub { font-size: 17px; color: var(--gray-500); line-height: 1.7; max-width: 540px; }
  .savings-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 60px; align-items: start; }
  .savings-stack { display: flex; flex-direction: column; gap: 8px; }
  .savings-stack-label { font-size: 13px; font-weight: 700; color: var(--gray-400); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
  .tool-row {
    display: flex; align-items: center; justify-content: space-between;
    background: var(--gray-50); border: 1px solid var(--border); border-radius: 10px;
    padding: 14px 18px; transition: all 0.2s;
  }
  .tool-row:hover { border-color: var(--gray-300); }
  .tool-row-left { display: flex; align-items: center; gap: 12px; }
  .tool-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .tool-name { font-size: 14px; font-weight: 600; color: var(--gray-800); }
  .tool-sub { font-size: 12px; color: var(--gray-400); margin-top: 1px; }
  .tool-price { font-size: 15px; font-weight: 700; color: var(--red); }
  .tool-total {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(239,68,68,0.06); border: 1.5px solid rgba(239,68,68,0.2);
    border-radius: 10px; padding: 16px 18px; margin-top: 4px;
  }
  .tool-total-lbl { font-size: 14px; font-weight: 700; color: var(--gray-700); }
  .tool-total-val { font-size: 22px; font-weight: 800; color: var(--red); }

  .savings-right { position: sticky; top: 80px; }
  .iris-card {
    background: linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%);
    border-radius: 20px; padding: 40px; color: white;
    box-shadow: 0 20px 60px rgba(79,70,229,0.35);
    animation: float 5s ease-in-out infinite;
  }
  .iris-card-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 8px; }
  .iris-card-name { font-size: 28px; font-weight: 800; color: white; margin-bottom: 6px; letter-spacing: -0.02em; }
  .iris-card-sub { font-size: 14px; color: rgba(255,255,255,0.65); margin-bottom: 32px; }
  .iris-price { font-size: 72px; font-weight: 800; color: white; line-height: 1; letter-spacing: -0.03em; }
  .iris-price sup { font-size: 32px; vertical-align: top; margin-top: 14px; }
  .iris-price-mo { font-size: 16px; color: rgba(255,255,255,0.65); margin-top: 6px; margin-bottom: 28px; }
  .iris-savings-badge {
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
    border-radius: 100px; padding: 8px 18px; display: inline-flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 700; color: white; margin-bottom: 28px;
  }
  .iris-features { display: grid; gap: 10px; margin-bottom: 28px; }
  .iris-feat { display: flex; align-items: center; gap: 10px; font-size: 14px; color: rgba(255,255,255,0.85); }
  .iris-feat-ck { color: rgba(255,255,255,0.9); flex-shrink: 0; }
  .iris-cta {
    width: 100%; background: white; color: var(--indigo);
    padding: 15px; border-radius: 10px; border: none; cursor: pointer;
    font-size: 15px; font-weight: 700; transition: all 0.25s;
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  }
  .iris-cta:hover { background: var(--gray-50); transform: translateY(-1px); }

  /* MODULES */
  .modules { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .modules-inner { max-width: 1100px; margin: 0 auto; }
  .modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 60px; }
  .mod-card {
    background: white; padding: 32px; border: 1px solid var(--border);
    transition: all 0.3s; cursor: default; position: relative;
  }
  .mod-card:hover { box-shadow: 0 8px 32px rgba(79,70,229,0.1); z-index: 1; border-color: var(--indigo-border); }
  .mod-icon {
    width: 48px; height: 48px; border-radius: 12px; margin-bottom: 18px;
    display: flex; align-items: center; justify-content: center;
  }
  .mod-card h3 { font-size: 17px; font-weight: 700; color: var(--gray-900); margin-bottom: 8px; }
  .mod-card p { font-size: 14px; color: var(--gray-500); line-height: 1.65; margin-bottom: 16px; }
  .mod-replaces { font-size: 12px; font-weight: 600; color: var(--gray-400); }
  .mod-replaces span { color: var(--indigo); }

  /* FEATURE COMPARISON TABLE */
  .comparison { background: white; padding: 100px 48px; border-top: 1px solid var(--border); }
  .comparison-inner { max-width: 900px; margin: 0 auto; }
  .comp-table { border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-top: 52px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
  .comp-head { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; background: var(--gray-50); border-bottom: 1px solid var(--border); }
  .ch { padding: 16px 20px; }
  .ch.f { font-size: 13px; font-weight: 600; color: var(--gray-400); }
  .ch.iris { background: var(--indigo); }
  .ch.iris-lbl { font-size: 15px; font-weight: 700; color: white; display: flex; flex-direction: column; gap: 2px; }
  .ch.iris-lbl small { font-size: 11px; font-weight: 500; opacity: 0.7; }
  .ch.other { font-size: 14px; font-weight: 600; color: var(--gray-500); }
  .comp-row { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; border-top: 1px solid var(--border); transition: background 0.15s; }
  .comp-row:hover { background: var(--gray-50); }
  .comp-row.section-header { background: var(--gray-50); }
  .cc { padding: 13px 20px; font-size: 13px; display: flex; align-items: center; gap: 8px; }
  .cc.f { color: var(--gray-700); font-weight: 500; }
  .cc.sec { color: var(--gray-500); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .cc.iris-col { background: rgba(79,70,229,0.04); }
  .ck { color: var(--green); font-weight: 700; }
  .cx { color: var(--gray-300); font-weight: 700; }
  .cp { color: var(--amber); font-weight: 600; font-size: 11px; }

  /* TESTIMONIALS */
  .testimonials { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .testi-inner { max-width: 1100px; margin: 0 auto; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
  .testi-card {
    background: white; border: 1px solid var(--border); border-radius: 16px;
    padding: 32px; transition: all 0.3s;
  }
  .testi-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); border-color: var(--indigo-border); transform: translateY(-3px); }
  .testi-stars { display: flex; gap: 3px; margin-bottom: 16px; }
  .testi-star { color: var(--amber); font-size: 14px; }
  .testi-text { font-size: 14px; color: var(--gray-600); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-av { width: 38px; height: 38px; border-radius: 50%; background: var(--indigo-bg); color: var(--indigo); font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1.5px solid var(--indigo-border); }
  .testi-name { font-size: 14px; font-weight: 700; color: var(--gray-800); }
  .testi-role { font-size: 12px; color: var(--gray-400); margin-top: 1px; }

  /* PRICING */
  .pricing { background: white; padding: 100px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 900px; margin: 0 auto; }
  .pricing-toggle { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 32px 0 52px; }
  .toggle-lbl { font-size: 14px; font-weight: 600; color: var(--gray-600); }
  .toggle-badge { background: var(--green-bg); color: var(--green); font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 100px; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .price-card {
    background: white; border: 1.5px solid var(--border); border-radius: 16px;
    padding: 32px; transition: all 0.3s; position: relative;
  }
  .price-card:hover { border-color: var(--indigo-border); box-shadow: 0 8px 32px rgba(79,70,229,0.1); }
  .price-card.featured { border-color: var(--indigo); box-shadow: 0 8px 32px rgba(79,70,229,0.15); }
  .price-card-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--indigo); color: white; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 100px; white-space: nowrap; }
  .price-name { font-size: 18px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
  .price-desc { font-size: 13px; color: var(--gray-400); margin-bottom: 20px; }
  .price-amount { font-size: 48px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
  .price-amount sup { font-size: 22px; vertical-align: top; margin-top: 10px; }
  .price-mo { font-size: 13px; color: var(--gray-400); margin-bottom: 6px; }
  .price-annual { font-size: 12px; color: var(--green); font-weight: 600; margin-bottom: 24px; }
  .price-divider { height: 1px; background: var(--border); margin: 20px 0; }
  .price-feat { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--gray-600); padding: 5px 0; }
  .price-ck { color: var(--green); font-size: 15px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .price-btn {
    width: 100%; padding: 13px; border-radius: 10px; border: none; cursor: pointer;
    font-size: 14px; font-weight: 600; margin-top: 20px; transition: all 0.25s;
  }
  .price-btn.primary { background: var(--indigo); color: white; box-shadow: 0 4px 14px rgba(79,70,229,0.3); }
  .price-btn.primary:hover { background: var(--indigo-light); transform: translateY(-1px); }
  .price-btn.secondary { background: white; color: var(--gray-700); border: 1.5px solid var(--border); }
  .price-btn.secondary:hover { border-color: var(--indigo); color: var(--indigo); }

  /* CTA */
  .cta-section {
    background: linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%);
    padding: 90px 48px; text-align: center; position: relative; overflow: hidden;
  }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 28px 28px; }
  .cta-inner { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
  .cta-title { font-size: clamp(36px, 5vw, 52px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.02em; }
  .cta-sub { font-size: 17px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 36px; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-main { background: white; color: var(--indigo); padding: 16px 36px; border-radius: 10px; border: none; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.25s; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
  .cta-btn-main:hover { background: var(--gray-50); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.8); padding: 14px 32px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 500; border: 1.5px solid rgba(255,255,255,0.3); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; color: white; }

  /* FOOTER */
  .footer { background: var(--gray-900); padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .footer-copy { font-size: 13px; color: var(--gray-500); }
  .footer-copy strong { color: var(--indigo-lighter); }
  .footer-links { display: flex; gap: 24px; }
  .f-lnk { font-size: 13px; color: var(--gray-500); cursor: pointer; transition: color 0.2s; }
  .f-lnk:hover { color: var(--gray-300); }

  /* MODAL */
  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(15,23,42,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: white; border-radius: 20px; padding: 48px; max-width: 480px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 24px 60px rgba(0,0,0,0.2); border: 1px solid var(--border); }
  .modal-x { position: absolute; top: 18px; right: 18px; background: var(--gray-100); border: none; color: var(--gray-500); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; }
  .modal-x:hover { background: var(--gray-200); color: var(--gray-800); }
  .modal-h { font-size: 26px; font-weight: 800; color: var(--gray-900); margin-bottom: 6px; letter-spacing: -0.02em; }
  .modal-s { color: var(--gray-500); font-size: 14px; margin-bottom: 28px; line-height: 1.6; }
  .f-group { margin-bottom: 16px; }
  .f-label { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; color: var(--gray-600); margin-bottom: 6px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 11px 14px; border-radius: 10px; background: var(--gray-50); border: 1.5px solid var(--border); font-size: 14px; font-family: 'Inter', sans-serif; color: var(--gray-900); outline: none; transition: border-color 0.2s; }
  .f-input::placeholder { color: var(--gray-400); }
  .f-input:focus { border-color: var(--indigo); background: white; }
  .f-btn { width: 100%; background: var(--indigo); color: white; padding: 14px; border-radius: 10px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; margin-top: 8px; transition: all 0.25s; box-shadow: 0 4px 14px rgba(79,70,229,0.35); }
  .f-btn:hover { background: var(--indigo-light); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-icon { font-size: 52px; margin-bottom: 16px; display: block; }
  .success-h { font-size: 26px; font-weight: 800; color: var(--gray-900); margin-bottom: 10px; }
  .success-p { color: var(--gray-500); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero { padding: 100px 20px 60px; }
    .savings { padding: 70px 20px; }
    .savings-layout { grid-template-columns: 1fr; }
    .savings-right { position: static; }
    .modules-grid { grid-template-columns: 1fr; }
    .testi-grid { grid-template-columns: 1fr; }
    .pricing-grid { grid-template-columns: 1fr; }
    .comparison, .testimonials, .cta-section, .modules { padding: 70px 20px; }
    .footer { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
  }
`;

const modules = [
  { icon: "✅", bg: "#EEF2FF", color: "#4F46E5", title: "Task Management", desc: "Kanban boards, subtasks, priorities, deadlines, and time tracking. Your team knows what's due and when.", replaces: "Asana, Monday.com, Trello" },
  { icon: "💬", bg: "#F0FDF4", color: "#10B981", title: "Team Communication", desc: "Real-time chat, video rooms, @mentions, and notifications — all inside your workspace.", replaces: "Slack, Microsoft Teams" },
  { icon: "💰", bg: "#FFFBEB", color: "#F59E0B", title: "Financial Management", desc: "Invoicing, expenses, budgets, OHADA-compliant accounting, and payroll — in one platform.", replaces: "QuickBooks, Xero, FreshBooks" },
  { icon: "📚", bg: "#FDF4FF", color: "#7C3AED", title: "Knowledge Base", desc: "Wiki, document management, templates, and AI-powered search. Your team's brain — organized.", replaces: "Notion, Confluence, Google Drive" },
  { icon: "👥", bg: "#FFF1F2", color: "#EF4444", title: "HR Management", desc: "Employee directory, contracts, leave management, and performance tracking.", replaces: "BambooHR, Gusto, Rippling" },
  { icon: "⚡", bg: "#F0F9FF", color: "#0EA5E9", title: "Automation", desc: "Workflow rules, recurring tasks, triggers, and integrations — the repetitive work runs itself.", replaces: "Zapier, Make, n8n" },
];

const competitors = [
  { name: "Asana", price: "$24" },
  { name: "Slack", price: "$15" },
  { name: "QuickBooks", price: "$90" },
  { name: "BambooHR", price: "$99" },
  { name: "DocuSign", price: "$25" },
  { name: "Toggl", price: "$20" },
  { name: "Notion", price: "$16" },
];

const testimonials = [
  { q: "We were paying for 7 tools and still had information gaps between them. Iris Workplace replaced 5 of them. The task + finance integration alone saves our ops team 4 hours a week.", name: "Amara D.", role: "Operations Lead · Digital Agency, Abidjan", init: "A" },
  { q: "The OHADA accounting module was the reason we switched. No other all-in-one platform had it. Now our accountant and our project managers are in the same tool.", name: "Jean-Pierre K.", role: "CFO · Construction Firm, Douala", init: "J" },
  { q: "I was skeptical about an all-in-one. But the onboarding was 30 minutes and within a week my team was off Slack and Asana. The savings are real — $340/mo back in our pocket.", name: "Sarah M.", role: "Founder · Consulting Practice, Chicago", init: "S" },
];

const compRows = [
  { feat: "Task & project management", iris: true, asana: true, notion: "partial", slack: false },
  { feat: "Team chat & video", iris: true, asana: false, notion: false, slack: true },
  { feat: "Invoicing & accounting", iris: true, asana: false, notion: false, slack: false },
  { feat: "HR & payroll", iris: true, asana: false, notion: false, slack: false },
  { feat: "Document & knowledge base", iris: true, asana: false, notion: true, slack: false },
  { feat: "Workflow automation", iris: true, asana: "partial", notion: "partial", slack: "partial" },
  { feat: "OHADA-compliant accounting", iris: true, asana: false, notion: false, slack: false },
  { feat: "Client portal", iris: true, asana: false, notion: false, slack: false },
  { feat: "Multi-organization support", iris: true, asana: false, notion: false, slack: false },
];

export default function IrisWorkplacePage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", size: "" });
  const [submitted, setSubmitted] = useState(false);
  const [billing, setBilling] = useState("monthly");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      await fetch("https://formspree.io/f/mkjnlvwk", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "Iris Workplace", billing }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisworkplace.com/auth/signup?ref=landing"; }, 2000);
  };

  const totalCompetitor = competitors.reduce((sum, c) => sum + parseInt(c.price.replace("$", "")), 0);

  const renderCell = (val) => {
    if (val === true) return <span className="ck"><Check size={16} /></span>;
    if (val === false) return <span className="cx"><X size={14} /></span>;
    if (val === "partial") return <span className="cp">Partial</span>;
    return null;
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">
          <img src="/media/image/logo1.png" alt="Iris Workplace" style={{ height: "32px", width: "auto" }} />
          <span className="nav-product">Iris <span>Workplace</span></span>
        </div>
        <div className="nav-links">
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Compare</span>
        </div>
        <div className="nav-right">
          <span className="nav-login" onClick={() => window.open("https://irisworkplace.com/auth/login", "_blank")}>Log in</span>
          <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free Trial</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="hero-inner">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            48+ features · 7 modules · 1 subscription
          </div>
          <h1 className="hero-title">
            Stop paying for<br />
            <span className="grad">7 separate tools.</span>
          </h1>
          <p className="hero-sub">
            Iris Workplace replaces Asana, Slack, QuickBooks, BambooHR, Notion, DocuSign, and Toggl — with one platform your whole team actually uses. Starting at $25/mo.
          </p>
          <div className="hero-actions">
            <button className="btn-indigo" onClick={() => setShowModal(true)}>
              Start Free Trial <ArrowRight size={16} />
            </button>
            <button className="btn-outline" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
          <div className="hero-note">15-day free trial · No credit card required · Cancel anytime</div>
        </div>
      </section>

      {/* LOGO BAR — what it replaces */}
      <div className="logo-bar">
        <div className="logo-bar-inner">
          <span className="logo-bar-label">Replaces</span>
          <div className="logo-bar-items">
            {["Asana", "Slack", "QuickBooks", "BambooHR", "Notion", "DocuSign", "Toggl"].map((t, i, arr) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <span className="logo-bar-item">{t}</span>
                {i < arr.length - 1 && <span className="logo-bar-arrow">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SAVINGS CALCULATOR */}
      <section className="savings">
        <div className="savings-inner">
          <div className="section-label">The math</div>
          <h2 className="section-title">You're paying <span>$289/mo</span><br />for tools that don't talk to each other.</h2>
          <p className="section-sub">Add up what your team pays for separate tools. Then compare it to one Iris Workplace subscription.</p>
          <div className="savings-layout">
            <div>
              <div className="savings-stack-label">What you're paying now</div>
              <div className="savings-stack">
                {competitors.map((c, i) => (
                  <div className="tool-row" key={i}>
                    <div className="tool-row-left">
                      <div className="tool-name">{c.name}</div>
                    </div>
                    <div className="tool-price">{c.price}/mo</div>
                  </div>
                ))}
                <div className="tool-total">
                  <span className="tool-total-lbl">Total per month</span>
                  <span className="tool-total-val">${totalCompetitor}/mo</span>
                </div>
              </div>
            </div>
            <div className="savings-right">
              <div className="iris-card">
                <div className="iris-card-label">Replace all of them with</div>
                <div className="iris-card-name">Iris Workplace</div>
                <div className="iris-card-sub">Professional plan · 50 users · all modules</div>
                <div className="iris-price"><sup>$</sup>90</div>
                <div className="iris-price-mo">per month · billed monthly</div>
                <div className="iris-savings-badge">
                  ✓ Save ${totalCompetitor - 90}/mo vs separate tools
                </div>
                <div className="iris-features">
                  {["48+ features across 7 modules", "Tasks, chat, finance, HR, docs — all connected", "OHADA-compliant accounting built in", "Client portal included", "Multi-organization support", "AI-powered search and automation"].map((f, i) => (
                    <div className="iris-feat" key={i}>
                      <Check size={15} className="iris-feat-ck" />
                      {f}
                    </div>
                  ))}
                </div>
                <button className="iris-cta" onClick={() => setShowModal(true)}>Start 15-Day Free Trial →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="modules">
        <div className="modules-inner">
          <div className="section-label">7 modules</div>
          <h2 className="section-title">Everything your team needs.<br />One login.</h2>
          <p className="section-sub">Each module works standalone — or together. Data flows between tasks, finance, HR, and docs automatically.</p>
          <div className="modules-grid">
            {modules.map((m, i) => (
              <div className="mod-card" key={i}>
                <div className="mod-icon" style={{ background: m.bg }}>
                  <span style={{ fontSize: 22 }}>{m.icon}</span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="mod-replaces">Replaces: <span>{m.replaces}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="comparison">
        <div className="comparison-inner">
          <div className="section-label">Side by side</div>
          <h2 className="section-title">Iris Workplace vs.<br />the stack it replaces</h2>
          <div className="comp-table">
            <div className="comp-head">
              <div className="ch f">Feature</div>
              <div className="ch iris"><div className="ch iris-lbl">Iris Workplace<small>All-in-one</small></div></div>
              <div className="ch other">Asana + Notion</div>
              <div className="ch other">Slack + QB</div>
            </div>
            {compRows.map((row, i) => (
              <div className="comp-row" key={i}>
                <div className="cc f">{row.feat}</div>
                <div className="cc iris-col">{renderCell(row.iris)}</div>
                <div className="cc">{renderCell(row.asana || row.notion)}</div>
                <div className="cc">{renderCell(row.slack || false)}</div>
              </div>
            ))}
            <div className="comp-row" style={{ background: "rgba(79,70,229,0.04)", borderTop: "2px solid rgba(79,70,229,0.15)" }}>
              <div className="cc f" style={{ fontWeight: 700 }}>Monthly cost (10 users)</div>
              <div className="cc iris-col" style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "var(--indigo)" }}>$25/mo</div>
              <div className="cc" style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: "var(--red)" }}>$39+/mo</div>
              <div className="cc" style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: "var(--red)" }}>$105+/mo</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testi-inner">
          <div className="section-label">What teams say</div>
          <h2 className="section-title">Real teams. Real savings.</h2>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-stars">{[...Array(5)].map((_, j) => <span key={j} className="testi-star">★</span>)}</div>
                <p className="testi-text">"{t.q}"</p>
                <div className="testi-author">
                  <div className="testi-av">{t.init}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="pricing-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-label" style={{ textAlign: "center" }}>Pricing</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>Simple, transparent pricing.</h2>
            <p style={{ fontSize: 16, color: "var(--gray-500)", textAlign: "center", marginBottom: 8 }}>All plans include a 15-day free trial. No credit card required.</p>
          </div>
          <div className="pricing-grid" style={{ marginTop: 52 }}>
            {[
              { name: "Starter", desc: "For individuals & small teams", price: "$0", mo: "forever free", annual: null, features: ["2 users", "50 tasks", "100MB storage", "Basic reports", "Email support"], btn: "Start Free", primary: false, featured: false },
              { name: "Professional", desc: "For growing teams", price: "$90", mo: "per month", annual: "$72/mo billed annually", features: ["50 users", "Unlimited tasks", "200GB storage", "All 7 modules", "Advanced analytics", "OHADA accounting", "Client portal", "Priority support"], btn: "Start Free Trial", primary: true, featured: true },
              { name: "Enterprise", desc: "For large organizations", price: "Custom", mo: "contact sales", annual: null, features: ["Unlimited users", "2TB storage", "White-label", "Dedicated support", "SSO & SAML", "Custom features", "SLA guarantee", "Account manager"], btn: "Contact Sales", primary: false, featured: false },
            ].map((plan, i) => (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="price-card-badge">Most Popular</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-desc">{plan.desc}</div>
                <div className="price-amount">{plan.price === "Custom" ? plan.price : <>{plan.price !== "$0" && <sup>$</sup>}{plan.price.replace("$", "")}</>}</div>
                <div className="price-mo">{plan.mo}</div>
                {plan.annual && <div className="price-annual">Save 20% — {plan.annual}</div>}
                <div className="price-divider" />
                {plan.features.map((f, j) => (
                  <div className="price-feat" key={j}><span className="price-ck">✓</span>{f}</div>
                ))}
                <button
                  className={`price-btn ${plan.primary ? "primary" : "secondary"}`}
                  onClick={() => plan.name === "Enterprise"
                    ? window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")
                    : setShowModal(true)
                  }
                >{plan.btn}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Replace 7 tools with one platform.</h2>
          <p className="cta-sub">Join teams already running their entire business on Iris Workplace. 15-day free trial, no credit card, cancel anytime.</p>
          <div className="cta-btns">
            <button className="cta-btn-main" onClick={() => setShowModal(true)}>Start Free Trial</button>
            <button className="cta-btn-sec" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Workplace</strong> — by Iris Secure Technology Solutions · irisworkplace.com</div>
        <div className="footer-links">
          <span className="f-lnk">Privacy</span>
          <span className="f-lnk">Terms</span>
          <span className="f-lnk">Contact</span>
        </div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={16} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Start Your Free Trial</div>
                <div className="modal-s">15 days free. All modules unlocked. No credit card needed.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Company Name</label><input className="f-input" placeholder="Your company or team" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
                <div className="f-group"><label className="f-label">Work Email</label><input className="f-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="f-group">
                  <label className="f-label">Team Size</label>
                  <select className="f-input" style={{ cursor: "pointer" }} value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
                    <option value="">Select team size</option>
                    <option>Just me</option>
                    <option>2–10 people</option>
                    <option>11–50 people</option>
                    <option>51–200 people</option>
                    <option>200+ people</option>
                  </select>
                </div>
                <button className="f-btn" onClick={handleSubmit}>Start Free Trial →</button>
              </>
            ) : (
              <div className="success-wrap">
                <span className="success-icon">🚀</span>
                <div className="success-h">You're in!</div>
                <p className="success-p">Setting up your workspace now. Check <strong style={{ color: "var(--indigo)" }}>{form.email}</strong> for your login link.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
