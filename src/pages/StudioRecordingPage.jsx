import { useState, useEffect } from "react";
import { Check, X, ArrowRight, Music, Calendar, FileText, Users, DollarSign, BarChart2, Mic, Clock } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --black: #070707; --deep: #0E0E0E; --char: #161616; --panel: #1F1F1F; --rail: #282828;
    --border: rgba(255,255,255,0.07); --border-red: rgba(229,9,20,0.25);
    --red: #E50914; --red-light: #FF1A25; --red-dim: #C00810;
    --gold: #F5C842; --gold-dim: #C9A028;
    --cream: #F5F0E8; --text-mid: #888888; --text-soft: #555555;
    --green: #1DB954; --amber: #F59E0B;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Barlow', sans-serif; background: var(--black); color: var(--cream); overflow-x: hidden; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(229,9,20,0.4); } 50% { box-shadow: 0 0 0 10px rgba(229,9,20,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes eq1 { 0%,100% { height: 8px; } 50% { height: 24px; } }
  @keyframes eq2 { 0%,100% { height: 18px; } 50% { height: 8px; } }
  @keyframes eq3 { 0%,100% { height: 12px; } 50% { height: 28px; } }
  @keyframes eq4 { 0%,100% { height: 22px; } 50% { height: 10px; } }
  @keyframes eq5 { 0%,100% { height: 6px; } 50% { height: 20px; } }
  @keyframes recBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 62px; padding: 0 48px; background: rgba(7,7,7,0.97); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .nav-brand { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: var(--cream); display: flex; align-items: center; gap: 10px; letter-spacing: 0.04em; }
  .nav-brand span { color: var(--red); }
  .nav-links { display: flex; gap: 28px; }
  .nav-lnk { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-mid); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--cream); }
  .nav-cta { background: var(--red); color: white; padding: 8px 18px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; box-shadow: 0 3px 10px rgba(229,9,20,0.4); }
  .nav-cta:hover { background: var(--red-light); transform: translateY(-1px); }

  .hero { min-height: 100vh; padding: 110px 48px 80px; position: relative; overflow: hidden; display: flex; align-items: center; background: var(--black); }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(229,9,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(229,9,20,0.03) 1px, transparent 1px); background-size: 44px 44px; pointer-events: none; }
  .hero-glow { position: absolute; right: -100px; top: 50%; transform: translateY(-50%); width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(229,9,20,0.07) 0%, transparent 65%); pointer-events: none; }
  .hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1100px; margin: 0 auto; width: 100%; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: rgba(229,9,20,0.1); border: 1px solid var(--border-red); color: var(--red-light); padding: 5px 14px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; animation: fadeUp 0.5s ease both; }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: blink 2s infinite; }
  .hero-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(52px, 7vw, 88px); font-weight: 900; line-height: 0.95; color: var(--cream); margin-bottom: 18px; letter-spacing: 0.01em; text-transform: uppercase; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title .red { color: var(--red); }
  .hero-title .gold { color: var(--gold); }
  .hero-sub { font-size: 16px; color: var(--text-mid); line-height: 1.75; max-width: 440px; margin-bottom: 32px; font-weight: 300; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display: flex; gap: 12px; margin-bottom: 14px; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-red { background: var(--red); color: white; padding: 14px 26px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.25s; animation: pulse 2.5s infinite; box-shadow: 0 5px 16px rgba(229,9,20,0.45); display: flex; align-items: center; gap: 7px; }
  .btn-red:hover { background: var(--red-light); transform: translateY(-2px); }
  .btn-ghost { background: transparent; color: var(--text-mid); padding: 12px 22px; cursor: pointer; font-size: 14px; font-weight: 500; border: 1px solid var(--border); transition: all 0.25s; }
  .btn-ghost:hover { border-color: var(--red); color: var(--red-light); }
  .hero-note { font-size: 12px; color: var(--text-soft); animation: fadeUp 0.6s 0.4s ease both; }

  .studio-card { background: var(--deep); border: 1px solid var(--border); border-top: 2px solid var(--red); box-shadow: 0 24px 60px rgba(0,0,0,0.8); overflow: hidden; animation: scaleIn 0.7s 0.3s ease both; }
  .sc-head { background: var(--char); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
  .sc-studio { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; color: var(--cream); letter-spacing: 0.06em; text-transform: uppercase; }
  .sc-rec { display: flex; align-items: center; gap: 6px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; color: var(--red); letter-spacing: 0.1em; text-transform: uppercase; }
  .sc-rec-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--red); animation: recBlink 1s infinite; }
  .sc-eq { display: flex; align-items: flex-end; gap: 3px; padding: 16px 20px; border-bottom: 1px solid var(--border); height: 60px; }
  .sc-bar { width: 6px; background: var(--red); border-radius: 2px; }
  .sc-bar:nth-child(1) { animation: eq1 0.8s ease-in-out infinite; }
  .sc-bar:nth-child(2) { animation: eq2 0.9s ease-in-out infinite; background: var(--red-light); }
  .sc-bar:nth-child(3) { animation: eq3 0.7s ease-in-out infinite; }
  .sc-bar:nth-child(4) { animation: eq4 1.1s ease-in-out infinite; background: var(--red-light); }
  .sc-bar:nth-child(5) { animation: eq5 0.85s ease-in-out infinite; }
  .sc-bar:nth-child(6) { animation: eq1 1.2s ease-in-out infinite; background: var(--gold-dim); }
  .sc-bar:nth-child(7) { animation: eq3 0.75s ease-in-out infinite; }
  .sc-bar:nth-child(8) { animation: eq2 0.95s ease-in-out infinite; background: var(--red-light); }
  .sc-bar:nth-child(9) { animation: eq4 0.8s ease-in-out infinite; }
  .sc-bar:nth-child(10) { animation: eq5 1.0s ease-in-out infinite; background: var(--gold-dim); }
  .sc-sessions { padding: 0 20px; }
  .sc-sess-lbl { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-mid); padding: 10px 0 6px; border-bottom: 1px solid var(--border); margin-bottom: 4px; display: flex; justify-content: space-between; }
  .sc-sess { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .sc-sess:last-child { border-bottom: none; }
  .sc-sess-left { display: flex; align-items: center; gap: 10px; }
  .sc-sess-av { width: 30px; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .sc-sess-artist { font-size: 13px; font-weight: 600; color: var(--cream); }
  .sc-sess-type { font-size: 11px; color: var(--text-mid); margin-top: 1px; }
  .sc-sess-right { text-align: right; }
  .sc-sess-amt { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; color: var(--gold); }
  .sc-sess-status { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 3px; margin-top: 2px; display: inline-block; }
  .sc-sess-status.paid { background: rgba(29,185,84,0.15); color: var(--green); }
  .sc-sess-status.pending { background: rgba(245,158,11,0.15); color: var(--amber); }
  .sc-footer { background: var(--panel); padding: 12px 20px; border-top: 2px solid var(--red); display: flex; align-items: center; justify-content: space-between; }
  .sc-foot-lbl { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-mid); }
  .sc-foot-val { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 900; color: var(--gold); }

  .s-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--red); text-transform: uppercase; margin-bottom: 12px; }
  .s-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(36px, 4.5vw, 54px); font-weight: 900; line-height: 1.0; color: var(--cream); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.01em; }
  .s-title span { color: var(--red); }
  .s-sub { font-size: 16px; color: var(--text-mid); line-height: 1.7; max-width: 500px; font-weight: 300; }

  .pain { background: var(--char); padding: 90px 48px; border-top: 1px solid var(--border); }
  .pain-inner { max-width: 1000px; margin: 0 auto; }
  .pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 48px; }
  .pain-card { background: var(--panel); border: 1px solid var(--border); padding: 26px; transition: all 0.25s; }
  .pain-card:hover { border-color: var(--border-red); background: rgba(229,9,20,0.04); }
  .pain-icon { color: var(--red); margin-bottom: 12px; display: block; }
  .pain-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 800; color: var(--cream); margin-bottom: 7px; text-transform: uppercase; letter-spacing: 0.02em; }
  .pain-card p { font-size: 13px; color: var(--text-mid); line-height: 1.65; }

  .features { background: var(--deep); padding: 90px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 48px; }
  .feat-card { background: var(--char); border: 1px solid var(--border); padding: 26px; transition: all 0.25s; position: relative; overflow: hidden; }
  .feat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--red), var(--gold-dim)); transform: scaleX(0); transition: transform 0.3s; transform-origin: left; }
  .feat-card:hover::before { transform: scaleX(1); }
  .feat-card:hover { background: var(--panel); }
  .feat-icon { color: var(--red); margin-bottom: 12px; display: block; }
  .feat-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 800; color: var(--cream); margin-bottom: 7px; text-transform: uppercase; letter-spacing: 0.02em; }
  .feat-card p { font-size: 13px; color: var(--text-mid); line-height: 1.65; }
  .feat-tag { display: inline-block; margin-top: 10px; background: rgba(229,9,20,0.1); border: 1px solid var(--border-red); color: var(--red-light); padding: 2px 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }

  .pricing { background: var(--black); padding: 90px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 860px; margin: 0 auto; text-align: center; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 44px; text-align: left; }
  .price-card { background: var(--deep); border: 1px solid var(--border); padding: 28px; position: relative; transition: all 0.3s; }
  .price-card:hover { border-color: var(--border-red); }
  .price-card.featured { border-top: 2px solid var(--red); }
  .price-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: var(--red); color: white; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 12px; white-space: nowrap; }
  .price-name { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900; color: var(--cream); letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 4px; }
  .price-amount { font-family: 'Barlow Condensed', sans-serif; font-size: 44px; font-weight: 900; color: var(--cream); line-height: 1; margin: 12px 0 3px; }
  .price-amount sup { font-size: 18px; vertical-align: top; margin-top: 12px; }
  .price-mo { font-size: 12px; color: var(--text-mid); margin-bottom: 18px; }
  .price-div { height: 1px; background: var(--border); margin: 14px 0; }
  .price-feat { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; color: var(--text-mid); padding: 4px 0; }
  .price-ck { color: var(--green); font-weight: 700; flex-shrink: 0; font-size: 13px; }
  .price-btn { width: 100%; padding: 11px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 14px; transition: all 0.25s; }
  .price-btn.primary { background: var(--red); color: white; }
  .price-btn.primary:hover { background: var(--red-light); }
  .price-btn.secondary { background: transparent; color: var(--text-mid); border: 1px solid var(--border); }
  .price-btn.secondary:hover { border-color: var(--red); color: var(--red-light); }

  .cta-section { background: var(--red); padding: 80px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px); background-size: 36px 36px; }
  .cta-inner { position: relative; z-index: 2; max-width: 520px; margin: 0 auto; }
  .cta-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(36px, 5vw, 58px); font-weight: 900; color: white; line-height: 1.0; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.02em; }
  .cta-title em { font-style: normal; color: var(--gold); }
  .cta-sub { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 28px; font-weight: 300; }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .cta-btn { background: var(--black); color: var(--red-light); padding: 14px 32px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.25s; }
  .cta-btn:hover { background: var(--deep); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.85); padding: 12px 28px; cursor: pointer; font-size: 14px; font-weight: 500; border: 1.5px solid rgba(255,255,255,0.4); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; color: white; }

  .footer { background: var(--black); padding: 26px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; border-top: 1px solid var(--border); }
  .footer-copy { font-size: 12px; color: var(--text-soft); }
  .footer-copy strong { color: var(--red); }
  .f-lnk { font-size: 12px; color: var(--text-soft); cursor: pointer; margin-left: 20px; transition: color 0.2s; }
  .f-lnk:hover { color: var(--cream); }

  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.9); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal-box { background: var(--deep); border: 1px solid var(--border); border-top: 2px solid var(--red); padding: 44px; max-width: 440px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 20px 56px rgba(0,0,0,0.9); }
  .modal-x { position: absolute; top: 14px; right: 14px; background: var(--char); border: none; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-mid); transition: all 0.2s; }
  .modal-x:hover { color: var(--red); }
  .modal-h { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; color: var(--cream); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.04em; }
  .modal-s { color: var(--text-mid); font-size: 13px; margin-bottom: 22px; }
  .f-group { margin-bottom: 13px; }
  .f-label { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--red-light); margin-bottom: 5px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 11px 14px; background: var(--char); border: 1px solid var(--border); font-size: 13px; font-family: 'Barlow',sans-serif; color: var(--cream); outline: none; transition: border-color 0.2s; }
  .f-input:focus { border-color: var(--red); }
  .f-input::placeholder { color: var(--text-soft); }
  .f-btn { width: 100%; background: var(--red); color: white; padding: 13px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 6px; transition: all 0.25s; }
  .f-btn:hover { background: var(--red-light); }
  .success-wrap { text-align: center; padding: 16px 0; }
  .success-h { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; color: var(--cream); margin-bottom: 8px; text-transform: uppercase; }
  .success-p { color: var(--text-mid); font-size: 13px; line-height: 1.6; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; } .nav-links { display: none; }
    .hero { padding: 90px 20px 60px; } .hero-layout { grid-template-columns: 1fr; }
    .studio-card { display: none; }
    .pain-grid, .feat-grid, .pricing-grid { grid-template-columns: 1fr; }
    .pain, .features, .pricing, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; padding: 22px 20px; }
    .modal-box { padding: 32px 20px; }
  }
`;

const sessions = [
  { emoji: "🎤", bg: "#1F0A0A", artist: "Diva Monroe", type: "Vocal Tracking · Studio A · 3hrs", amt: "$450", status: "paid" },
  { emoji: "🎸", bg: "#0A1A0A", artist: "The Red Band", type: "Full Session · Studio B · 6hrs", amt: "$820", status: "pending" },
  { emoji: "🎧", bg: "#0A0A1F", artist: "DJ Kaleo", type: "Mix & Master · Remote", amt: "$320", status: "paid" },
];

const feats = [
  { icon: <Calendar size={22} />, title: "Session Booking", desc: "Online booking calendar for each room. Artists see availability, pick a slot, pay a deposit. No back-and-forth.", tag: "Studio-Specific" },
  { icon: <FileText size={22} />, title: "Session Invoicing", desc: "Auto-generate invoices from completed sessions — deposit, balance, extras. QR code payment link included.", tag: "Gets You Paid" },
  { icon: <Users size={22} />, title: "Artist Portal", desc: "Give each artist their own login. They see their sessions, invoices, project files, and track history.", tag: "Studio-Specific" },
  { icon: <Music size={22} />, title: "Project Tracking", desc: "Group sessions by project — album, EP, single. Track hours, costs, and file delivery per project.", tag: "Studio-Specific" },
  { icon: <DollarSign size={22} />, title: "Revenue Reporting", desc: "Revenue by room, by artist, by month. Know which room is your earner and which is sitting idle.", tag: "Financial" },
  { icon: <Clock size={22} />, title: "Room & Gear Tracking", desc: "Track hours per room and per engineer. Log gear rental as a line item. Bill it all from one place.", tag: "Studio-Specific" },
];

const plans = [
  { name: "Starter", price: "$0", mo: "forever free", features: ["1 studio room", "10 sessions/month", "Basic invoicing", "Artist portal (3 artists)", "Email support"], btn: "Start Free", primary: false, featured: false },
  { name: "Professional", price: "$79", mo: "per month", features: ["Unlimited rooms", "Unlimited sessions", "Full project tracking", "Unlimited artist portal", "Revenue reports", "Multi-currency", "Priority support"], btn: "Start Free Trial", primary: true, featured: true },
  { name: "Enterprise", price: "Custom", mo: "contact us", features: ["Multi-location studios", "Custom branding", "API access", "Dedicated support", "White-label portal", "SLA guarantee"], btn: "Contact Us", primary: false, featured: false },
];

export default function StudioRecordingPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", studio: "", email: "" });
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
      await fetch("https://formspree.io/f/xzeblwzk", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "Studio Recording" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisfinancial.tech/auth/signup?vertical=studio&ref=landing"; }, 2000);
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-brand">
          <img src="/media/image/logo2.png" alt="Iris Financial" style={{ height: "28px", width: "auto" }} />
          <span>Iris <span>Financial</span></span>
        </div>
        <div className="nav-links">
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Artist Portal</span>
        </div>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Start Free</button>
      </nav>

      <section className="hero">
        <div className="hero-grid" /><div className="hero-glow" />
        <div className="hero-layout">
          <div>
            <div className="hero-badge"><div className="hero-badge-dot" />Built for Recording Studios</div>
            <h1 className="hero-title">RUN YOUR<br /><span className="red">STUDIO.</span><br />GET <span className="gold">PAID.</span></h1>
            <p className="hero-sub">Session booking, artist invoicing, project tracking, and room revenue reports — one platform built for recording studios. Free to start.</p>
            <div className="hero-actions">
              <button className="btn-red" onClick={() => setShowModal(true)}>Start Free <ArrowRight size={15} /></button>
              <button className="btn-ghost" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule Demo</button>
            </div>
            <div className="hero-note">Free Starter plan · No credit card · Cancel anytime</div>
          </div>
          <div>
            <div className="studio-card">
              <div className="sc-head">
                <span className="sc-studio">🎙️ Studio Dashboard</span>
                <div className="sc-rec"><div className="sc-rec-dot" />Recording</div>
              </div>
              <div className="sc-eq">
                {[...Array(10)].map((_, i) => <div className="sc-bar" key={i} />)}
              </div>
              <div className="sc-sessions">
                <div className="sc-sess-lbl"><span>This Week's Sessions</span><span>Revenue</span></div>
                {sessions.map((s, i) => (
                  <div className="sc-sess" key={i}>
                    <div className="sc-sess-left">
                      <div className="sc-sess-av" style={{ background: s.bg }}>{s.emoji}</div>
                      <div><div className="sc-sess-artist">{s.artist}</div><div className="sc-sess-type">{s.type}</div></div>
                    </div>
                    <div className="sc-sess-right">
                      <div className="sc-sess-amt">{s.amt}</div>
                      <div className={`sc-sess-status ${s.status}`}>{s.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sc-footer">
                <span className="sc-foot-lbl">Week Revenue</span>
                <span className="sc-foot-val">$1,590</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pain">
        <div className="pain-inner">
          <div className="s-label">The problem</div>
          <h2 className="s-title">You're running a studio<br /><span>on WhatsApp and guesswork.</span></h2>
          <div className="pain-grid">
            {[
              { icon: <Calendar size={24} />, title: "Booking by DM", desc: "Session bookings via Instagram DM, WhatsApp, or a shared Google calendar that no one keeps updated." },
              { icon: <FileText size={24} />, title: "Invoices in Word", desc: "You create invoices manually in Word or send a PayPal link. No deposit tracking, no payment history, no records." },
              { icon: <BarChart2 size={24} />, title: "No idea what each room earns", desc: "Studio A, Studio B, vocal booth — you know you're busy but you don't know which room or which artist is actually profitable." },
            ].map((p, i) => (
              <div className="pain-card" key={i}><span className="pain-icon">{p.icon}</span><h3>{p.title}</h3><p>{p.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="s-label">Features</div>
          <h2 className="s-title">Everything your studio<br /><span>needs to run right.</span></h2>
          <div className="feat-grid">
            {feats.map((f, i) => (
              <div className="feat-card" key={i}><span className="feat-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.desc}</p><div className="feat-tag">{f.tag}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-inner">
          <div className="s-label">Pricing</div>
          <h2 className="s-title">Start free.<br /><span>Scale when you're ready.</span></h2>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="price-badge">Most Popular</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-amount">{plan.price === "Custom" ? "Custom" : plan.price === "$0" ? "Free" : <><sup>$</sup>{plan.price.replace("$","")}</>}</div>
                <div className="price-mo">{plan.mo}</div>
                <div className="price-div" />
                {plan.features.map((f, j) => <div className="price-feat" key={j}><span className="price-ck">✓</span>{f}</div>)}
                <button className={`price-btn ${plan.primary ? "primary" : "secondary"}`}
                  onClick={() => plan.name === "Enterprise" ? window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank") : setShowModal(true)}>
                  {plan.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">YOUR STUDIO.<br /><em>YOUR NUMBERS.</em></h2>
          <p className="cta-sub">Stop running your business on DMs and guesswork. Book sessions, bill artists, and track your revenue — all from one place. Free to start.</p>
          <div className="cta-btns">
            <button className="cta-btn" onClick={() => setShowModal(true)}>Get Started Free</button>
            <button className="cta-btn-sec" onClick={() => window.open("https://irissecure.tech/contact#other-ways-to-connect", "_blank")}>Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Financial</strong> — Studio Recording · irisfinancial.tech</div>
        <div><span className="f-lnk">Privacy</span><span className="f-lnk">Terms</span><span className="f-lnk">Contact</span></div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={15} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Start Free Today</div>
                <div className="modal-s">Set up your studio account in 15 minutes.</div>
                <div className="f-group"><label className="f-label">Your Name</label><input className="f-input" placeholder="Owner / Studio Manager" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Studio Name</label><input className="f-input" placeholder="e.g. Pyramid Record Studio" value={form.studio} onChange={e => setForm({...form, studio: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Email</label><input className="f-input" type="email" placeholder="you@studio.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <button className="f-btn" onClick={handleSubmit}>Create My Free Account →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div style={{ fontSize: 44, marginBottom: 12 }}>🎙️</div>
                <div className="success-h">Studio Is Live.</div>
                <p className="success-p">Setup link heading to <strong style={{ color: "var(--red-light)" }}>{form.email}</strong>. Your first session report is waiting.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
