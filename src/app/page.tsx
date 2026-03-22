import Link from "next/link";
import { QrCode, SearchCheck, ShieldAlert, Zap, History, Eye, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-col" style={{ width: "100%" }}>
      {/* 1. HERO SECTION */}
      <section className="section text-center flex-col animate-fade-up" style={{ alignItems: "center", justifyContent: "center", minHeight: "80vh", paddingTop: "8rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", backgroundColor: "rgba(0, 102, 204, 0.1)", color: "var(--accent-color)", fontWeight: 500, fontSize: "0.85rem", marginBottom: "2rem" }}>
          <Zap size={14} fill="currentColor" />
          <span>Real-time threat detection</span>
        </div>
        
        <h1 className="hero-title">
          Scan QR codes safely<br />
          <span className="text-gradient">before you trust them</span>
        </h1>
        
        <p className="hero-subtitle">
          Don't fall for fake codes. We analyze embedded links for phishing, malware, and hidden redirects before you ever open them.
        </p>

        <div className="flex-center" style={{ gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/scan" className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
            Start Scanning
            <ArrowRight size={18} />
          </Link>
          <Link href="#how-it-works" className="btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
            Learn More
          </Link>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="section bg-color">
        <div className="text-center animate-fade-up animate-delay-100" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">How it works</h2>
          <p className="subtitle" style={{ maxWidth: "500px", margin: "0 auto" }}>Three simple steps to protect yourself from malicious QR codes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl animate-fade-up animate-delay-200">
          <div className="card text-center flex-col" style={{ alignItems: "center", gap: "1rem" }}>
            <div className="btn-icon" style={{ width: "64px", height: "64px", backgroundColor: "rgba(0, 102, 204, 0.1)", color: "var(--accent-color)" }}>
              <QrCode size={32} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>1. Scan QR</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Point your camera at any QR code or upload an image from your gallery.
            </p>
          </div>

          <div className="card text-center flex-col" style={{ alignItems: "center", gap: "1rem" }}>
            <div className="btn-icon" style={{ width: "64px", height: "64px", backgroundColor: "rgba(234, 179, 8, 0.1)", color: "var(--warning-color)" }}>
              <SearchCheck size={32} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>2. Analyze link</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              We instantly decode the URL and check it against global threat databases.
            </p>
          </div>

          <div className="card text-center flex-col" style={{ alignItems: "center", gap: "1rem" }}>
            <div className="btn-icon" style={{ width: "64px", height: "64px", backgroundColor: "rgba(34, 197, 94, 0.1)", color: "var(--success-color)" }}>
              <ShieldAlert size={32} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>3. Get risk result</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              See a clear safety score and a safe preview before you decide to open the link.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section id="features" className="section-sm">
        <div className="text-center animate-fade-up" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">Why choose QRGuard?</h2>
          <p className="subtitle" style={{ maxWidth: "500px", margin: "0 auto" }}>Built for security, designed for simplicity.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl animate-fade-up animate-delay-100">
          <div className="card flex-col" style={{ gap: "1rem" }}>
            <Zap size={28} style={{ color: "var(--accent-color)" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Real-time detection</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Our engine scans destination URLs in milliseconds, catching zero-day phishing sites.</p>
          </div>
          
          <div className="card flex-col" style={{ gap: "1rem" }}>
            <ShieldAlert size={28} style={{ color: "var(--danger-color)" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Risk scoring</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Clear, color-coded risk indicators so you always know exactly how safe a link really is.</p>
          </div>

          <div className="card flex-col" style={{ gap: "1rem" }}>
            <Eye size={28} style={{ color: "var(--success-color)" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Safe preview</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>See the exact destination URL and title before you launch it in your browser.</p>
          </div>

          <div className="card flex-col" style={{ gap: "1rem" }}>
            <History size={28} style={{ color: "var(--warning-color)" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Scan history</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Keep track of everything you've scanned previously with easy-to-read logs.</p>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="section text-center animate-fade-up" style={{ paddingBottom: "8rem" }}>
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 2rem", background: "linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 102, 204, 0.0) 100%)", border: "1px solid rgba(0, 102, 204, 0.2)" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-0.02em" }}>Ready to scan safely?</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>No registration required. Just point, scan, and stay protected.</p>
          <Link href="/scan" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
            Launch Scanner
          </Link>
        </div>
      </section>
    </div>
  );
}
