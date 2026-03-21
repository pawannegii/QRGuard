import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import ScannerArea from "@/components/ScannerArea";

export default function Home() {
  return (
    <div className="flex-col" style={{ alignItems: "center", minHeight: "80vh", justifyContent: "center" }}>
      <div className="flex-center" style={{ marginBottom: "2rem", gap: "0.5rem" }}>
        <ShieldCheck size={40} className="accent-text" strokeWidth={1.5} style={{ color: "var(--accent-color)" }} />
        <h1 className="title" style={{ margin: 0 }}>QRGuard</h1>
      </div>
      
      <p className="subtitle text-center" style={{ maxWidth: "400px" }}>
        Scan any QR code securely. We automatically check for hidden threats, malicious links, and phishing attempts.
      </p>

      <div className="card" style={{ width: "100%", maxWidth: "450px", textAlign: "center", marginBottom: "2rem" }}>
        <ScannerArea />
      </div>
      
      <Link href="/history" className="btn-secondary">
        View Scan History
      </Link>
    </div>
  );
}
