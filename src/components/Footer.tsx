import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1px solid rgba(128, 128, 128, 0.1)",
      padding: "4rem 1.5rem 2rem",
      backgroundColor: "var(--surface-color)",
      marginTop: "auto"
    }}>
      <div className="max-w-3xl flex-col" style={{ gap: "2rem" }}>
        <div className="flex-col md:flex-row grid gap-8 md:grid-cols-2" style={{ justifyContent: "space-between" }}>
          <div className="flex-col" style={{ gap: "1rem" }}>
            <div className="flex-center" style={{ gap: "0.5rem", justifyContent: "flex-start" }}>
              <ShieldCheck size={24} style={{ color: "var(--accent-color)" }} />
              <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>QRGuard</span>
            </div>
            <p className="subtitle" style={{ margin: 0, fontSize: "0.9rem", maxWidth: "300px" }}>
              Scan any QR code securely. We automatically check for hidden threats, malicious links, and phishing attempts before you trust them.
            </p>
          </div>
          
          <div className="flex-col" style={{ gap: "1rem" }}>
            <h4 style={{ fontWeight: 600, fontSize: "1rem" }}>Quick Links</h4>
            <div className="flex-col" style={{ gap: "0.5rem" }}>
              <Link href="/scan" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Start Scanning</Link>
              <Link href="/history" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Scan History</Link>
              <Link href="/#how-it-works" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>How it works</Link>
              <Link href="/#features" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Features</Link>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          color: "var(--text-secondary)",
          fontSize: "0.85rem"
        }}>
          <span>&copy; {currentYear} QRGuard. All rights reserved.</span>
          <div className="flex-center" style={{ gap: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
