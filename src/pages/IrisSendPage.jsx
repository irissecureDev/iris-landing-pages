import { useState, useEffect } from "react";
import { Check, X, ArrowRight, Upload, Link, Lock, Clock, Shield, Zap, Globe, Mail } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --white: #FFFFFF; --gray-50: #F5F3FF; --gray-100: #EDE9FE; --gray-200: #DDD6FE;
    --border: #E5E7EB; --border-purple: rgba(124,58,237,0.2);
    --indigo: #4F46E5; --purple: #7C3AED; --purple-light: #8B5CF6;
    --purple-bg: rgba(124,58,237,0.08); --purple-border: rgba(124,58,237,0.2);
    --ink: #1E1B4B; --text-mid: #374151; --text-soft: #6B7280;
    --green: #10B981; --amber: #F59E0B; --red: #EF4444;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--ink); overflow-x: hidden; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); } 50% { box-shadow: 0 0 0 10px rgba(124,58,237,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes upload { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes progress { from { width: 0; } to { width: 78%; } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 64px; padding: 0 48px; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-brand { font-size: 15px; font-weight: 700; color: var(--ink); }
  .nav-brand span { color: var(--purple); }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 14px; font-weight: 500; color: var(--text-soft); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--ink); }
  .nav-right { display: flex; gap: 12px; align-items: center; }
  .nav-secondary { font-size: 14px; font-weight: 500; color: var(--text-mid); cursor: pointer; padding: 8px 16px; border-radius: 8px; border: 1.5px solid var(--border); transition: all 0.2s; }
  .nav-secondary:hover { border-color: var(--purple); color: var(--purple); }
  .nav-cta { background: linear-gradient(135deg, var(--indigo), var(--purple)); color: white; padding: 9px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; box-shadow: 0 2px 8px rgba(124,58,237,0.35); }
  .nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }

  .hero { min-height: 100vh; padding: 120px 48px 80px; position: relative; overflow: hidden; display: flex; align-items: center;
    background: linear-gradient(180deg, #FAFAFF 0%, var(--white) 100%); }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%); pointer-events: none; }
  .hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, #DDD6FE 1px, transparent 1px); background-size: 28px 28px; opacity: 0.6; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%); pointer-events: none; }
  .hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1200px; margin: 0 auto; width: 100%; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--purple-bg); border: 1px solid var(--purple-border); color: var(--purple); padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 600; margin-bottom: 24px; animation: fadeUp 0.5s ease both; }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--purple); animation: blink 2s infinite; }
  .hero-title { font-size: clamp(42px, 5.5vw, 68px); font-weight: 800; line-height: 1.1; color: var(--ink); margin-bottom: 20px; letter-spacing: -0.02em; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title .purple { background: linear-gradient(135deg, var(--indigo), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-sub { font-size: 17px; color: var(--text-soft); line-height: 1.75; max-width: 460px; margin-bottom: 36px; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display: flex; gap: 14px; margin-bottom: 16px; flex-wrap: wrap; animation: fadeUp 0.6s 0.3s ease both; }
  .btn-purple { background: linear-gradient(135deg, var(--indigo), var(--purple)); color: white; padding: 14px 28px; border-radius: 10px; border: none; cursor: pointer; font-size: 15px; font-weight: 600; transition: all 0.25s; animation: pulse 2.5s infinite; box-shadow: 0 4px 14px rgba(124,58,237,0.4); display: flex; align-items: center; gap: 8px; }
  .btn-purple:hover { opacity: 0.92; transform: translateY(-2px); }
  .btn-outline { background: white; color: var(--text-mid); padding: 12px 24px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 500; border: 1.5px solid var(--border); transition: all 0.25s; }
  .btn-outline:hover { border-color: var(--purple); color: var(--purple); }
  .hero-note { font-size: 13px; color: var(--text-soft); animation: fadeUp 0.6s 0.4s ease both; }
  .hero-free-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #059669; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 100px; margin-top: 12px; }

  .upload-card { background: white; border-radius: 20px; box-shadow: 0 24px 60px rgba(124,58,237,0.12); border: 1px solid var(--purple-border); overflow: hidden; animation: scaleIn 0.7s 0.3s ease both; }
  .uc-head { background: linear-gradient(135deg, var(--indigo), var(--purple)); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
  .uc-title { font-size: 14px; font-weight: 700; color: white; letter-spacing: -0.01em; }
  .uc-free { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
  .uc-body { padding: 24px; }
  .uc-drop { border: 2px dashed var(--purple-border); border-radius: 12px; padding: 32px; text-align: center; background: var(--gray-50); transition: all 0.2s; }
  .uc-drop:hover { border-color: var(--purple); background: rgba(124,58,237,0.04); }
  .uc-upload-icon { color: var(--purple); margin: 0 auto 12px; animation: upload 3s ease-in-out infinite; }
  .uc-drop-title { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .uc-drop-sub { font-size: 13px; color: var(--text-soft); }
  .uc-file-row { display: flex; align-items: center; gap: 12px; background: var(--gray-50); border-radius: 10px; padding: 12px 16px; margin-top: 16px; }
  .uc-file-icon { width: 36px; height: 36px; background: var(--purple-bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .uc-file-name { font-size: 14px; font-weight: 600; color: var(--ink); }
  .uc-file-size { font-size: 12px; color: var(--text-soft); margin-top: 2px; }
  .uc-progress { height: 4px; background: var(--gray-200); border-radius: 100px; overflow: hidden; margin-top: 8px; }
  .uc-progress-bar { height: 100%; background: linear-gradient(90deg, var(--indigo), var(--purple)); border-radius: 100px; animation: progress 2s ease forwards 0.5s; }
  .uc-options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
  .uc-option { background: var(--gray-50); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; }
  .uc-opt-lbl { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--text-soft); text-transform: uppercase; margin-bottom: 5px; }
  .uc-opt-val { font-size: 13px; font-weight: 600; color: var(--ink); display: flex; align-items: center; gap: 6px; }
  .uc-opt-icon { color: var(--purple); }
  .uc-btn { width: 100%; background: linear-gradient(135deg, var(--indigo), var(--purple)); color: white; border: none; padding: 13px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.25s; }
  .uc-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .uc-footer { background: var(--gray-50); border-top: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
  .uc-footer-txt { font-size: 12px; color: var(--text-soft); display: flex; align-items: center; gap: 6px; }
  .uc-footer-lim { font-size: 12px; font-weight: 600; color: var(--purple); }

  .s-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--purple); text-transform: uppercase; margin-bottom: 14px; }
  .s-title { font-size: clamp(32px, 4vw, 48px); font-weight: 800; line-height: 1.1; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.02em; }
  .s-title span { background: linear-gradient(135deg, var(--indigo), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .how { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .how-inner { max-width: 1000px; margin: 0 auto; }
  .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 52px; }
  .step { background: white; border: 1px solid var(--border); border-radius: 14px; padding: 24px; transition: all 0.3s; }
  .step:hover { border-color: var(--purple-border); box-shadow: 0 6px 24px rgba(124,58,237,0.08); }
  .step-num { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, var(--indigo), var(--purple)); color: white; font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
  .step h3 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .step p { font-size: 13px; color: var(--text-soft); line-height: 1.6; }

  .features { background: white; padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
  .feat-card { background: var(--gray-50); border: 1px solid var(--border); border-radius: 14px; padding: 26px; transition: all 0.3s; }
  .feat-card:hover { border-color: var(--purple-border); box-shadow: 0 6px 20px rgba(124,58,237,0.08); }
  .feat-icon { color: var(--purple); margin-bottom: 12px; display: block; }
  .feat-card h3 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .feat-card p { font-size: 13px; color: var(--text-soft); line-height: 1.6; }

  .pricing { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .pricing-inner { max-width: 960px; margin: 0 auto; text-align: center; }
  .pricing-note { display: inline-flex; align-items: center; gap: 8px; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); color: #D97706; padding: 8px 16px; border-radius: 100px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
  .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; text-align: left; }
  .price-card { background: white; border: 1.5px solid var(--border); border-radius: 16px; padding: 24px; position: relative; transition: all 0.3s; }
  .price-card:hover { border-color: var(--purple-border); box-shadow: 0 6px 24px rgba(124,58,237,0.1); }
  .price-card.featured { border-color: var(--purple); box-shadow: 0 8px 32px rgba(124,58,237,0.15); }
  .price-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, var(--indigo), var(--purple)); color: white; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 100px; white-space: nowrap; }
  .price-name { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .price-amount { font-size: 38px; font-weight: 800; color: var(--ink); letter-spacing: -0.03em; line-height: 1; margin: 12px 0 3px; }
  .price-amount sup { font-size: 17px; vertical-align: top; margin-top: 10px; }
  .price-mo { font-size: 12px; color: var(--text-soft); margin-bottom: 16px; }
  .price-div { height: 1px; background: var(--border); margin: 14px 0; }
  .price-feat { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; color: var(--text-soft); padding: 4px 0; }
  .price-ck { color: var(--green); font-weight: 700; flex-shrink: 0; }
  .price-cs { color: var(--amber); font-size: 10px; font-weight: 700; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); padding: 1px 6px; border-radius: 100px; }
  .price-btn { width: 100%; padding: 11px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; margin-top: 14px; transition: all 0.25s; }
  .price-btn.primary { background: linear-gradient(135deg, var(--indigo), var(--purple)); color: white; }
  .price-btn.primary:hover { opacity: 0.9; }
  .price-btn.secondary { background: white; color: var(--text-mid); border: 1.5px solid var(--border); }
  .price-btn.secondary:hover { border-color: var(--purple); color: var(--purple); }
  .coming-soon-note { font-size: 12px; color: var(--text-soft); margin-top: 24px; }
  .coming-soon-note strong { color: var(--amber); }

  .cta-section { background: linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%); padding: 80px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 24px 24px; }
  .cta-inner { position: relative; z-index: 2; max-width: 560px; margin: 0 auto; }
  .cta-free-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 5px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; margin-bottom: 18px; }
  .cta-h { font-size: clamp(32px, 4.5vw, 48px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 14px; letter-spacing: -0.02em; }
  .cta-p { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 30px; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cta-btn { background: white; color: var(--purple); padding: 14px 32px; border-radius: 10px; border: none; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.25s; }
  .cta-btn:hover { background: var(--gray-50); transform: translateY(-2px); }
  .cta-btn-sec { background: transparent; color: rgba(255,255,255,0.85); padding: 12px 28px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 500; border: 1.5px solid rgba(255,255,255,0.4); transition: all 0.25s; }
  .cta-btn-sec:hover { border-color: white; color: white; }

  .footer { background: #0F172A; padding: 28px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .footer-copy { font-size: 13px; color: #64748B; }
  .footer-copy strong { color: var(--purple-light); }
  .f-lnk { font-size: 13px; color: #64748B; cursor: pointer; transition: color 0.2s; margin-left: 24px; }
  .f-lnk:hover { color: #CBD5E1; }

  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(30,27,75,0.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: white; border-radius: 20px; padding: 44px; max-width: 440px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 24px 60px rgba(0,0,0,0.25); }
  .modal-x { position: absolute; top: 16px; right: 16px; background: #F3F4F6; border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6B7280; }
  .modal-x:hover { background: #E5E7EB; }
  .modal-h { font-size: 22px; font-weight: 800; color: var(--ink); margin-bottom: 6px; }
  .modal-s { color: var(--text-soft); font-size: 14px; margin-bottom: 22px; line-height: 1.6; }
  .f-group { margin-bottom: 13px; }
  .f-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--purple); margin-bottom: 5px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 11px 14px; border-radius: 8px; background: var(--gray-50); border: 1.5px solid var(--border); font-size: 14px; font-family: 'Inter',sans-serif; color: var(--ink); outline: none; transition: border-color 0.2s; }
  .f-input:focus { border-color: var(--purple); background: white; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-btn { width: 100%; background: linear-gradient(135deg, var(--indigo), var(--purple)); color: white; padding: 13px; border-radius: 8px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; margin-top: 6px; transition: opacity 0.25s; }
  .f-btn:hover { opacity: 0.9; }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-h { font-size: 24px; font-weight: 800; color: var(--ink); margin-bottom: 8px; }
  .success-p { color: var(--text-soft); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; } .nav-links { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-layout { grid-template-columns: 1fr; }
    .upload-card { display: none; }
    .steps { grid-template-columns: 1fr 1fr; }
    .feat-grid, .pricing-grid { grid-template-columns: 1fr 1fr; }
    .how, .features, .pricing, .cta-section { padding: 70px 20px; }
    .footer { flex-direction: column; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
  }
`;

const feats = [
  { icon: <Upload size={22} />, title: "Up to 25 GB free", desc: "Transfer files up to 25 GB per send — free, no account needed. Larger limits on paid plans (coming soon)." },
  { icon: <Link size={22} />, title: "Shareable download link", desc: "Every transfer generates a clean, branded download link. Share it anywhere — email, chat, text." },
  { icon: <Lock size={22} />, title: "Password protection", desc: "Add a password to any transfer. Only people with the link and password can download." },
  { icon: <Clock size={22} />, title: "Set expiry date", desc: "Choose when your link expires — from 1 day to 14 days. Links auto-delete after expiry." },
  { icon: <Shield size={22} />, title: "Secure transfer", desc: "Every file encrypted in transit and at rest. Clean branded download page, no third-party ads." },
  { icon: <Globe size={22} />, title: "Works anywhere", desc: "No app to install. Works in any browser on any device. Recipients don't need an account." },
];

const plans = [
  { name: "Free", price: "$0", mo: "forever", features: ["25 GB per transfer", "14-day expiry", "15 transfers/month", "Password protection", "Ad-supported"], btn: "Send a File Free", primary: false, featured: false, cs: false },
  { name: "Pro", price: "$8", mo: "per month", features: ["100 GB per transfer", "60-day expiry", "Unlimited transfers", "Ad-free", "Custom expiry", "Email delivery & status"], btn: "Coming Soon", primary: false, featured: false, cs: true },
  { name: "Business", price: "$19", mo: "per month", features: ["500 GB per transfer", "1-year expiry", "Unlimited transfers", "Custom-branded pages", "Folder sharing", "Transfer analytics", "Subfolders support"], btn: "Coming Soon", primary: true, featured: true, cs: true },
  { name: "Boost", price: "$5", mo: "one-off add-on", features: ["200 GB single transfer", "~21-day expiry", "No subscription", "Pay per big send", "Perfect for occasional use"], btn: "Coming Soon", primary: false, featured: false, cs: true },
];

export default function IrisSendPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
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
      await fetch("https://formspree.io/f/mdeorwwl", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "Iris Send" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisworkplace.com/send"; }, 2000);
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">
          <img src="/media/image/logo1.png" alt="Iris" style={{ height: "30px", width: "auto" }} />
          <span className="nav-brand">Iris <span>Send</span></span>
        </div>
        <div className="nav-links">
          <span className="nav-lnk">How it works</span>
          <span className="nav-lnk">Pricing</span>
          <span className="nav-lnk">Iris Workplace</span>
        </div>
        <div className="nav-right">
          <button className="nav-secondary" onClick={() => setShowModal(true)}>Get Early Access</button>
          <button className="nav-cta" onClick={() => window.open("https://irisworkplace.com/send", "_blank")}>Send a File Free</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-dots" />
        <div className="hero-layout">
          <div>
            <div className="hero-badge"><div className="hero-badge-dot" />Free · 25 GB · No account needed</div>
            <h1 className="hero-title">Send big files,<br /><span className="purple">simply.</span></h1>
            <p className="hero-sub">Transfer files up to 25 GB via a secure shareable link. Set an expiry date, add password protection, and share in seconds. Free forever — no account required.</p>
            <div className="hero-actions">
              <button className="btn-purple" onClick={() => window.open("https://irisworkplace.com/send", "_blank")}>Send a File Free <ArrowRight size={16} /></button>
              <button className="btn-outline" onClick={() => setShowModal(true)}>Get Early Access</button>
            </div>
            <div className="hero-note">No account · No software · No limits on what you send</div>
            <div className="hero-free-pill"><Check size={12} />Free tier available now · Pro & Business plans coming soon</div>
          </div>

          <div>
            <div className="upload-card">
              <div className="uc-head">
                <span className="uc-title">📤 Iris Send</span>
                <span className="uc-free">Free · 25 GB</span>
              </div>
              <div className="uc-body">
                <div className="uc-drop">
                  <div className="uc-upload-icon"><Upload size={36} /></div>
                  <div className="uc-drop-title">Drop files here or click to upload</div>
                  <div className="uc-drop-sub">Up to 25 GB · Any file type</div>
                </div>
                <div className="uc-file-row">
                  <div className="uc-file-icon"><span style={{ fontSize: 18 }}>📁</span></div>
                  <div style={{ flex: 1 }}>
                    <div className="uc-file-name">Q4_Report_Final.zip</div>
                    <div className="uc-file-size">1.8 GB · Uploading…</div>
                    <div className="uc-progress"><div className="uc-progress-bar" /></div>
                  </div>
                </div>
                <div className="uc-options">
                  <div className="uc-option">
                    <div className="uc-opt-lbl">Expires in</div>
                    <div className="uc-opt-val"><Clock size={13} className="uc-opt-icon" />14 days</div>
                  </div>
                  <div className="uc-option">
                    <div className="uc-opt-lbl">Password</div>
                    <div className="uc-opt-val"><Lock size={13} className="uc-opt-icon" />Protected</div>
                  </div>
                </div>
                <button className="uc-btn"><Link size={15} />Generate Download Link</button>
              </div>
              <div className="uc-footer">
                <span className="uc-footer-txt"><Shield size={12} />Encrypted in transit & at rest</span>
                <span className="uc-footer-lim">15 free transfers / month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how">
        <div className="how-inner">
          <div className="s-label">How it works</div>
          <h2 className="s-title">Upload. Share. <span>Done.</span></h2>
          <div className="steps">
            {[
              { n: "1", title: "Upload your file", desc: "Drag and drop or browse for any file or folder up to 25 GB." },
              { n: "2", title: "Set options", desc: "Choose expiry date and add password protection — optional but recommended." },
              { n: "3", title: "Get your link", desc: "Iris generates a clean, branded download link in seconds." },
              { n: "4", title: "Share anywhere", desc: "Send the link by email, chat, or any platform. Recipients click to download — no account needed." },
            ].map((s, i) => (
              <div className="step" key={i}><div className="step-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="s-label">Features</div>
          <h2 className="s-title">Everything you need<br />to <span>send with confidence.</span></h2>
          <div className="feat-grid">
            {feats.map((f, i) => (
              <div className="feat-card" key={i}><span className="feat-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-inner">
          <div className="s-label">Pricing</div>
          <h2 className="s-title">Free now.<br /><span>More coming soon.</span></h2>
          <p style={{ fontSize: 16, color: "var(--text-soft)", marginBottom: 12 }}>The free tier is live today. Pro, Business, and Boost plans are on the roadmap.</p>
          <div className="pricing-note">⏳ Pro & Business plans coming soon — get early access below</div>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="price-badge">Coming Soon · Best Value</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-amount">{plan.price === "$0" ? "Free" : <>{<sup>$</sup>}{plan.price.replace("$","")}</>}</div>
                <div className="price-mo">{plan.mo}</div>
                <div className="price-div" />
                {plan.features.map((f, j) => (
                  <div className="price-feat" key={j}>
                    <span className="price-ck">✓</span>
                    {f}{plan.cs && j === 0 ? "" : ""}
                  </div>
                ))}
                {plan.cs && <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#D97706", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", padding: "2px 8px", borderRadius: "100px", marginTop: 8 }}>⏳ Coming Soon</div>}
                <button
                  className={`price-btn ${plan.primary ? "primary" : "secondary"}`}
                  onClick={() => plan.cs ? setShowModal(true) : window.open("https://irisworkplace.com/send", "_blank")}
                >{plan.btn}</button>
              </div>
            ))}
          </div>
          <div className="coming-soon-note">Pro & Business features are on the roadmap. <strong>Sign up for early access</strong> to be notified when they launch.</div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-free-badge">📤 Free Forever</div>
          <h2 className="cta-h">Send your first file now.</h2>
          <p className="cta-p">No account. No credit card. No file size anxiety. Just upload, get a link, and share — completely free.</p>
          <div className="cta-btns">
            <button className="cta-btn" onClick={() => window.open("https://irisworkplace.com/send", "_blank")}>Send a File Free →</button>
            <button className="cta-btn-sec" onClick={() => setShowModal(true)}>Get Early Access to Pro</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris Send</strong> — by Iris Secure Technology Solutions · irisworkplace.com/send</div>
        <div><span className="f-lnk">Privacy</span><span className="f-lnk">Terms</span><span className="f-lnk">Contact</span></div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={15} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Get Early Access</div>
                <div className="modal-s">Be first to know when Iris Send Pro and Business launch. We'll also share early-adopter pricing.</div>
                <div className="f-group"><label className="f-label">Name</label><input className="f-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Email</label><input className="f-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Company (optional)</label><input className="f-input" placeholder="Your company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                <button className="f-btn" onClick={handleSubmit}>Get Early Access →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div style={{ fontSize: 48, marginBottom: 14 }}>📤</div>
                <div className="success-h">You're on the list!</div>
                <p className="success-p">We'll notify <strong style={{ color: "var(--purple)" }}>{form.email}</strong> when Pro and Business launch — with early-adopter pricing.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
