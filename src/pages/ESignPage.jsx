import { useState, useEffect } from "react";
import { Check, X, ArrowRight, FileText, Download, Mail, Globe, Shield, Zap } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --white: #FFFFFF; --gray-50: #F0FDF8; --gray-100: #DCFCE7; --gray-200: #D1FAE5;
    --gray-300: #A7F3D0; --gray-400: #6EE7B7; --gray-500: #34D399; --gray-600: #10B981;
    --gray-700: #059669; --gray-800: #047857; --gray-900: #064E3B;
    --green: #10B981; --green-dark: #059669; --green-darker: #047857;
    --green-bg: rgba(16,185,129,0.08); --green-border: rgba(16,185,129,0.2);
    --ink: #0F2A1E; --text-mid: #374151; --text-soft: #6B7280; --border: #E5E7EB;
    --red: #EF4444; --amber: #F59E0B;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--ink); overflow-x: hidden; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { box-shadow: 0 0 0 10px rgba(16,185,129,0); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes float { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
  @keyframes sign { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 64px; padding: 0 48px; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-brand { font-size: 15px; font-weight: 700; color: var(--ink); }
  .nav-brand span { color: var(--green-dark); }
  .nav-links { display: flex; gap: 32px; }
  .nav-lnk { font-size: 14px; font-weight: 500; color: var(--text-soft); cursor: pointer; transition: color 0.2s; }
  .nav-lnk:hover { color: var(--ink); }
  .nav-right { display: flex; gap: 12px; align-items: center; }
  .nav-secondary { font-size: 14px; font-weight: 500; color: var(--text-mid); cursor: pointer; padding: 8px 16px; border-radius: 8px; border: 1.5px solid var(--border); transition: all 0.2s; }
  .nav-secondary:hover { border-color: var(--green); color: var(--green-dark); }
  .nav-cta { background: var(--green); color: white; padding: 9px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; box-shadow: 0 2px 8px rgba(16,185,129,0.35); }
  .nav-cta:hover { background: var(--green-dark); transform: translateY(-1px); }

  .hero { min-height: 100vh; background: var(--white); padding: 120px 48px 80px; position: relative; overflow: hidden; display: flex; align-items: center; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%); pointer-events: none; }
  .hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, #D1FAE5 1px, transparent 1px); background-size: 28px 28px; opacity: 0.8; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%); pointer-events: none; }
  .hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; max-width: 1200px; margin: 0 auto; width: 100%; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--green-bg); border: 1px solid var(--green-border); color: var(--green-dark); padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 600; margin-bottom: 24px; animation: fadeUp 0.5s ease both; }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: blink 2s infinite; }
  .hero-title { font-size: clamp(42px, 5.5vw, 68px); font-weight: 800; line-height: 1.1; color: var(--ink); margin-bottom: 20px; letter-spacing: -0.02em; animation: fadeUp 0.6s 0.1s ease both; }
  .hero-title .green { color: var(--green-dark); }
  .hero-sub { font-size: 17px; color: var(--text-soft); line-height: 1.75; max-width: 460px; margin-bottom: 36px; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display: flex; gap: 14px; margin-bottom: 20px; animation: fadeUp 0.6s 0.3s ease both; flex-wrap: wrap; }
  .btn-green { background: var(--green); color: white; padding: 14px 28px; border-radius: 10px; border: none; cursor: pointer; font-size: 15px; font-weight: 600; transition: all 0.25s; animation: pulse 2.5s infinite; box-shadow: 0 4px 14px rgba(16,185,129,0.4); display: flex; align-items: center; gap: 8px; }
  .btn-green:hover { background: var(--green-dark); transform: translateY(-2px); }
  .btn-outline { background: white; color: var(--text-mid); padding: 12px 24px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 500; border: 1.5px solid var(--border); transition: all 0.25s; }
  .btn-outline:hover { border-color: var(--green); color: var(--green-dark); }
  .hero-note { font-size: 13px; color: var(--text-soft); animation: fadeUp 0.6s 0.4s ease both; }

  .doc-preview { animation: scaleIn 0.7s 0.3s ease both; position: relative; }
  .doc-card { background: white; border-radius: 16px; box-shadow: 0 24px 60px rgba(0,0,0,0.1); border: 1px solid var(--border); overflow: hidden; }
  .doc-toolbar { background: var(--gray-50); padding: 12px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .doc-toolbar-left { display: flex; align-items: center; gap: 10px; }
  .doc-file { font-size: 14px; font-weight: 600; color: var(--ink); }
  .doc-size { font-size: 12px; color: var(--text-soft); }
  .doc-actions { display: flex; gap: 8px; }
  .doc-action { background: var(--green); color: white; border: none; padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.2s; }
  .doc-action:hover { background: var(--green-dark); }
  .doc-action.sec { background: white; color: var(--green-dark); border: 1.5px solid var(--green-border); }
  .doc-body { padding: 24px; }
  .doc-line { height: 8px; background: var(--gray-100); border-radius: 4px; margin-bottom: 8px; }
  .doc-line.short { width: 60%; }
  .doc-line.med { width: 80%; }
  .doc-line.title { height: 14px; width: 45%; margin-bottom: 16px; background: #D1FAE5; }
  .doc-sig-area { margin-top: 20px; border: 2px dashed var(--green-border); border-radius: 10px; padding: 20px; position: relative; background: rgba(16,185,129,0.03); }
  .doc-sig-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--green-dark); text-transform: uppercase; margin-bottom: 10px; }
  .doc-sig-svg { width: 100%; height: 50px; }
  .doc-sig-line { fill: none; stroke: var(--green-dark); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 200; animation: sign 1.5s ease forwards 1s; }
  .doc-sig-badge { position: absolute; top: -10px; right: 16px; background: var(--green); color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; display: flex; align-items: center; gap: 4px; }
  .doc-footer { background: var(--gray-50); padding: 12px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .doc-footer-txt { font-size: 12px; color: var(--text-soft); }
  .doc-footer-badge { font-size: 11px; font-weight: 700; color: var(--green-dark); background: var(--green-bg); border: 1px solid var(--green-border); padding: 3px 10px; border-radius: 100px; }

  .how { background: var(--gray-50); padding: 100px 48px; border-top: 1px solid var(--border); }
  .how-inner { max-width: 1000px; margin: 0 auto; }
  .section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--green-dark); text-transform: uppercase; margin-bottom: 14px; }
  .section-title { font-size: clamp(32px, 4vw, 48px); font-weight: 800; line-height: 1.1; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.02em; }
  .section-title span { color: var(--green-dark); }
  .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 52px; }
  .step { background: white; border: 1px solid var(--border); border-radius: 16px; padding: 28px; position: relative; transition: all 0.3s; }
  .step:hover { border-color: var(--green-border); box-shadow: 0 6px 24px rgba(16,185,129,0.1); }
  .step-num { width: 36px; height: 36px; border-radius: 10px; background: var(--green); color: white; font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .step h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .step p { font-size: 13px; color: var(--text-soft); line-height: 1.65; }

  .features { background: white; padding: 100px 48px; border-top: 1px solid var(--border); }
  .features-inner { max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
  .feat-card { background: var(--gray-50); border: 1px solid var(--border); border-radius: 14px; padding: 28px; transition: all 0.3s; }
  .feat-card:hover { border-color: var(--green-border); box-shadow: 0 6px 20px rgba(16,185,129,0.08); }
  .feat-icon { color: var(--green-dark); margin-bottom: 14px; display: block; }
  .feat-card h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .feat-card p { font-size: 13px; color: var(--text-soft); line-height: 1.65; }

  .free-cta { background: linear-gradient(135deg, #059669 0%, #10B981 100%); padding: 80px 48px; text-align: center; position: relative; overflow: hidden; }
  .free-cta::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 24px 24px; }
  .free-cta-inner { position: relative; z-index: 2; max-width: 560px; margin: 0 auto; }
  .free-cta-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 700; margin-bottom: 20px; }
  .free-cta h2 { font-size: clamp(32px, 4.5vw, 48px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.02em; }
  .free-cta p { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 32px; }
  .free-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .free-cta-btn { background: white; color: var(--green-dark); padding: 15px 36px; border-radius: 10px; border: none; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.25s; }
  .free-cta-btn:hover { background: var(--gray-50); transform: translateY(-2px); }
  .free-cta-btn-sec { background: transparent; color: rgba(255,255,255,0.85); padding: 13px 32px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 500; border: 1.5px solid rgba(255,255,255,0.4); transition: all 0.25s; }
  .free-cta-btn-sec:hover { border-color: white; color: white; }

  .footer { background: var(--gray-900); padding: 28px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .footer-copy { font-size: 13px; color: #6B7280; }
  .footer-copy strong { color: var(--green); }
  .f-lnk { font-size: 13px; color: #6B7280; cursor: pointer; transition: color 0.2s; margin-left: 24px; }
  .f-lnk:hover { color: #D1D5DB; }

  .modal-ov { position: fixed; inset: 0; z-index: 1000; background: rgba(6,78,59,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-box { background: white; border-radius: 20px; padding: 48px; max-width: 460px; width: 100%; position: relative; animation: scaleIn 0.3s ease; box-shadow: 0 24px 60px rgba(0,0,0,0.2); }
  .modal-x { position: absolute; top: 18px; right: 18px; background: #F3F4F6; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6B7280; }
  .modal-x:hover { background: #E5E7EB; }
  .modal-h { font-size: 24px; font-weight: 800; color: var(--ink); margin-bottom: 6px; }
  .modal-s { color: var(--text-soft); font-size: 14px; margin-bottom: 24px; }
  .f-group { margin-bottom: 14px; }
  .f-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--green-dark); margin-bottom: 5px; display: block; text-transform: uppercase; }
  .f-input { width: 100%; padding: 11px 14px; border-radius: 8px; background: var(--gray-50); border: 1.5px solid var(--border); font-size: 14px; font-family: 'Inter',sans-serif; color: var(--ink); outline: none; transition: border-color 0.2s; }
  .f-input:focus { border-color: var(--green); background: white; }
  .f-input::placeholder { color: var(--text-soft); }
  .f-btn { width: 100%; background: var(--green); color: white; padding: 13px; border-radius: 8px; border: none; cursor: pointer; font-weight: 700; font-size: 15px; margin-top: 6px; transition: all 0.25s; }
  .f-btn:hover { background: var(--green-dark); }
  .success-wrap { text-align: center; padding: 20px 0; }
  .success-h { font-size: 24px; font-weight: 800; color: var(--ink); margin-bottom: 8px; }
  .success-p { color: var(--text-soft); font-size: 14px; line-height: 1.65; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; } .nav-links { display: none; }
    .hero { padding: 100px 20px 60px; }
    .hero-layout { grid-template-columns: 1fr; }
    .doc-preview { display: none; }
    .steps { grid-template-columns: 1fr 1fr; }
    .feat-grid { grid-template-columns: 1fr; }
    .how, .features, .free-cta { padding: 70px 20px; }
    .footer { flex-direction: column; padding: 24px 20px; }
    .modal-box { padding: 36px 24px; }
  }
`;

const feats = [
  { icon: <FileText size={22} />, title: "PDF & Word Support", desc: "Upload any PDF or Word document. Place signatures, text, and dates anywhere on the page — no white box, no formatting issues." },
  { icon: <Shield size={22} />, title: "Legally Binding", desc: "Signatures created with Iris E-Signature are secure and legally binding. Metadata embedded for verification." },
  { icon: <Download size={22} />, title: "Download Instantly", desc: "Download the signed document immediately after signing. Share it, print it, or file it — it's yours." },
  { icon: <Mail size={22} />, title: "Email to Any Recipient", desc: "Send the signed document directly to any email address. Sender and signer metadata included automatically." },
  { icon: <Globe size={22} />, title: "Bilingual EN/FR", desc: "Full English and French support with automatic language detection and a manual toggle — works for any market." },
  { icon: <Zap size={22} />, title: "No Account Needed", desc: "Open the tool, upload a document, sign it, download it. No registration, no subscription, no waiting." },
];

export default function ESignPage() {
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
      await fetch("https://formspree.io/f/mnpqkggv", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, vertical: "Iris E-Signature" }),
      });
    } catch (e) {}
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://irisworkplace.com/esign"; }, 2000);
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">
          <img src="/media/image/logo1.png" alt="Iris" style={{ height: "30px", width: "auto" }} />
          <span className="nav-brand">Iris <span>E-Signature</span></span>
        </div>
        <div className="nav-links">
          <span className="nav-lnk">How it works</span>
          <span className="nav-lnk">Features</span>
          <span className="nav-lnk">Iris Workplace</span>
        </div>
        <div className="nav-right">
          <button className="nav-secondary" onClick={() => setShowModal(true)}>Schedule Demo</button>
          <button className="nav-cta" onClick={() => window.open("https://irisworkplace.com/esign", "_blank")}>Sign a Document Free</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-dots" />
        <div className="hero-layout">
          <div>
            <div className="hero-badge"><div className="hero-badge-dot" />Always free · No account required</div>
            <h1 className="hero-title">Digital signatures,<br /><span className="green">made simple.</span></h1>
            <p className="hero-sub">Secure, legally binding digital signatures on any PDF or Word document. Upload, sign, download, or email — in under 60 seconds. Completely free, forever.</p>
            <div className="hero-actions">
              <button className="btn-green" onClick={() => window.open("https://irisworkplace.com/esign", "_blank")}>Sign a Document Free <ArrowRight size={16} /></button>
              <button className="btn-outline" onClick={() => setShowModal(true)}>Schedule a Demo</button>
            </div>
            <div className="hero-note">No credit card. No account. No software to install.</div>
          </div>
          <div className="doc-preview">
            <div className="doc-card">
              <div className="doc-toolbar">
                <div className="doc-toolbar-left">
                  <FileText size={18} color="#10B981" />
                  <div><div className="doc-file">Service_Agreement.pdf</div><div className="doc-size">2.4 MB · 3 pages</div></div>
                </div>
                <div className="doc-actions">
                  <button className="doc-action sec"><Download size={12} />Download</button>
                  <button className="doc-action"><Mail size={12} />Email</button>
                </div>
              </div>
              <div className="doc-body">
                <div className="doc-line title" />
                <div className="doc-line" /><div className="doc-line med" /><div className="doc-line short" />
                <div className="doc-line" style={{ marginTop: 16 }} /><div className="doc-line med" />
                <div className="doc-sig-area">
                  <div className="doc-sig-badge"><Check size={11} />Signed</div>
                  <div className="doc-sig-label">Authorized Signature</div>
                  <svg className="doc-sig-svg" viewBox="0 0 280 50">
                    <path className="doc-sig-line" d="M 10 40 C 30 10, 50 10, 60 30 C 70 45, 80 45, 90 35 C 100 25, 110 20, 130 30 C 150 40, 160 38, 170 25 C 180 12, 190 10, 210 20 C 225 27, 235 30, 250 25" />
                  </svg>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                    <span>Signed via Iris E-Signature</span><span>Jan 14, 2025 · 10:42 AM</span>
                  </div>
                </div>
              </div>
              <div className="doc-footer">
                <span className="doc-footer-txt">Legally binding · Metadata embedded</span>
                <span className="doc-footer-badge">✓ Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how">
        <div className="how-inner">
          <div className="section-label">How it works</div>
          <h2 className="section-title">From upload to signed<br /><span>in under 60 seconds.</span></h2>
          <div className="steps">
            {[
              { n: "1", title: "Upload your document", desc: "Upload a PDF or Word file from your device. Any format, any size." },
              { n: "2", title: "Place your signature", desc: "Draw, type, or position a signature anywhere on the page. Add text or dates too." },
              { n: "3", title: "Download or email", desc: "Download the signed document instantly, or email it directly to any recipient." },
              { n: "4", title: "Done", desc: "No account needed. No subscription. The signed document is yours to keep and share." },
            ].map((s, i) => (
              <div className="step" key={i}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything you need.<br /><span>Nothing you don't.</span></h2>
          <div className="feat-grid">
            {feats.map((f, i) => (
              <div className="feat-card" key={i}>
                <span className="feat-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="free-cta">
        <div className="free-cta-inner">
          <div className="free-cta-badge">✍️ Free Forever</div>
          <h2>Sign your first document now.</h2>
          <p>No registration. No credit card. No software. Just upload, sign, and download — completely free, for everyone, forever.</p>
          <div className="free-cta-btns">
            <button className="free-cta-btn" onClick={() => window.open("https://irisworkplace.com/esign", "_blank")}>Sign a Document Free →</button>
            <button className="free-cta-btn-sec" onClick={() => setShowModal(true)}>Schedule a Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy"><strong>Iris E-Signature</strong> — by Iris Secure Technology Solutions · irisworkplace.com/esign</div>
        <div><span className="f-lnk">Privacy</span><span className="f-lnk">Terms</span><span className="f-lnk">Contact</span></div>
      </footer>

      {showModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-x" onClick={() => setShowModal(false)}><X size={16} /></button>
            {!submitted ? (
              <>
                <div className="modal-h">Schedule a Demo</div>
                <div className="modal-s">See Iris E-Signature in action. We'll walk you through everything.</div>
                <div className="f-group"><label className="f-label">Name</label><input className="f-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Email</label><input className="f-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="f-group"><label className="f-label">Company</label><input className="f-input" placeholder="Your company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                <button className="f-btn" onClick={handleSubmit}>Request Demo →</button>
              </>
            ) : (
              <div className="success-wrap">
                <div style={{ fontSize: 48, marginBottom: 14 }}>✍️</div>
                <div className="success-h">Demo requested!</div>
                <p className="success-p">We'll reach out to <strong style={{ color: "var(--green-dark)" }}>{form.email}</strong> to schedule your demo.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
