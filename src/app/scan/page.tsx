import React from "react";
import ScannerArea from "@/components/ScannerArea";

export const metadata = {
  title: "Scan QR Code - QRGuard",
  description: "Securely scan QR codes to detect threats.",
};

export default function ScanPage() {
  return (
    <div className="section flex-col animate-fade-up" style={{ alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 200px)" }}>
      <div className="text-center" style={{ marginBottom: "3rem" }}>
        <h1 className="section-title">Scan QR Code</h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>
          Point your camera at a QR code or upload an image. We'll verify its safety.
        </p>
      </div>

      <div className="card" style={{ width: "100%", maxWidth: "450px", textAlign: "center", marginBottom: "2rem" }}>
        <ScannerArea />
      </div>
    </div>
  );
}
