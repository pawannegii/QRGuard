'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, Image as ImageIcon, X, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResult {
  score: number;
  status: 'Safe' | 'Suspicious' | 'Dangerous';
  reason: string;
}

export default function ScannerArea() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);
    setAnalysis(null);
    
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader");
      }
      
      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length > 0) {
        const cameraId = cameras[0].id;
        
        await scannerRef.current.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            setScanResult(decodedText);
            stopScanner();
            analyzeUrl(decodedText);
          },
          (errorMessage) => {
            // ignore constant background scanning errors
          }
        );
      } else {
        setError("No cameras found. Please check permissions.");
        setIsScanning(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to start scanner. Please ensure camera permissions are granted.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
      }).catch(err => {
        console.error("Failed to stop scanner", err);
      });
    } else {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setScanResult(null);
    setAnalysis(null);

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader");
      }
      const decodedText = await scannerRef.current.scanFile(file, true);
      setScanResult(decodedText);
      analyzeUrl(decodedText);
    } catch (err) {
      setError("Could not find a QR code in the image.");
    }
    
    // reset input
    event.target.value = '';
  };

  const analyzeUrl = async (url: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to analyze URL");
      const data = await res.json();
      setAnalysis(data);
      
      // Save to local storage for history
      const historyRecord = {
        url,
        ...data,
        timestamp: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('qrguard_history') || '[]');
      localStorage.setItem('qrguard_history', JSON.stringify([historyRecord, ...existing]));
      
    } catch (err) {
      console.error(err);
      setError("Threat analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-col" style={{ gap: '1.5rem', width: '100%' }}>
      
      <div 
        style={{ 
          position: 'relative', 
          borderRadius: "var(--radius-md)", 
          overflow: "hidden", 
          background: "#000",
          display: isScanning ? 'block' : 'none',
          minHeight: isScanning ? '300px' : '0'
        }}
      >
        <div id="reader" style={{ width: "100%" }}></div>
        {isScanning && (
          <button 
            onClick={stopScanner}
            className="btn-icon"
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              zIndex: 10, 
              background: 'rgba(255,255,255,0.8)' 
            }}
          >
            <X size={24} />
          </button>
        )}
      </div>

      {!isScanning && !scanResult && (
        <div style={{ padding: "3rem 1rem", background: "var(--bg-color)", borderRadius: "var(--radius-md)", border: "2px dashed var(--text-secondary)" }}>
          <div className="flex-center text-center" style={{ flexDirection: 'column', gap: '1rem' }}>
            <Camera size={48} color="var(--text-secondary)" strokeWidth={1.5} />
            <p style={{ color: "var(--text-secondary)", maxWidth: "250px", margin: "0 auto" }}>
              Point your camera at a QR code to securely analyze its contents.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: "rgba(255,59,48,0.1)", color: "var(--danger-color)", padding: "1rem", borderRadius: "var(--radius-sm)" }}>
          {error}
        </div>
      )}

      {!isScanning && !scanResult && (
        <div className="flex-col" style={{ gap: "1rem" }}>
          <button className="btn-primary" style={{ width: "100%" }} onClick={startScanner}>
            <Camera size={20} />
            Open Camera
          </button>
          
          <label className="btn-secondary" style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "pointer" }}>
            <ImageIcon size={20} />
            Upload Image
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0 }}
          style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}
        >
          <Shield size={40} className="accent-text" strokeWidth={1.5} style={{ animation: "pulse 1.5s infinite", margin: "0 auto 1rem auto" }} />
          <p>Analyzing for threats...</p>
        </motion.div>
      )}

      {analysis && scanResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex-col" 
          style={{ gap: "1rem", textAlign: "left" }}
        >
          <div style={{ 
            padding: "1.5rem", 
            borderRadius: "var(--radius-md)",
            border: `1px solid var(--${analysis.status.toLowerCase()}-color)`,
            background: `rgba(var(--${analysis.status.toLowerCase()}-color-rgb, 128,128,128), 0.05)`
          }}>
            <div className="flex-center" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {analysis.status === 'Safe' ? <ShieldCheck color="var(--success-color)" /> : <ShieldAlert color={analysis.status === 'Dangerous' ? 'var(--danger-color)' : 'var(--warning-color)'} />}
                <h2 style={{ fontSize: '1.25rem', margin: 0, color: `var(--${analysis.status.toLowerCase()}-color)` }}>
                  {analysis.status}
                </h2>
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {analysis.score}<span style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: "normal" }}>/100</span>
              </div>
            </div>
            
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{analysis.reason}</p>
            
            <div style={{ padding: "1rem", background: "var(--bg-color)", borderRadius: "var(--radius-sm)", wordBreak: "break-all", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>Scanned URL</span>
              <span style={{ fontWeight: 500 }}>{scanResult}</span>
            </div>
            
            <div style={{ display: "flex", gap: "1rem" }}>
              {(analysis.status === 'Safe' || analysis.status === 'Suspicious') && (
                <a href={scanResult} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, textDecoration: "none" }}>
                  Open Link
                </a>
              )}
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => { setScanResult(null); setAnalysis(null); setIsScanning(false); }}>
                Scan Another
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
