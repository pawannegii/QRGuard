'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, ShieldCheck, ShieldAlert, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface HistoryRecord {
  url: string;
  score: number;
  status: 'Safe' | 'Suspicious' | 'Dangerous';
  reason: string;
  timestamp: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('qrguard_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history.");
      }
    }
  }, []);

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your scan history?")) {
      localStorage.removeItem('qrguard_history');
      setHistory([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex-col" style={{ minHeight: "100vh", padding: "1rem 0" }}>
      <header className="flex-center" style={{ justifyContent: "space-between", marginBottom: "2rem" }}>
        <Link href="/" className="btn-icon" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 className="title" style={{ fontSize: "1.5rem", margin: 0 }}>Scan History</h1>
        <div style={{ width: 48 }}></div>
      </header>

      {history.length === 0 ? (
        <div className="text-center" style={{ padding: "4rem 1rem", color: "var(--text-secondary)" }}>
          <Clock size={48} style={{ margin: "0 auto 1rem auto", opacity: 0.5 }} />
          <p>No scans yet. Try scanning a QR code.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: "2rem", textDecoration: 'none' }}>
            Go to Scanner
          </Link>
        </div>
      ) : (
        <div className="flex-col" style={{ gap: "1rem" }}>
          {history.map((record, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card" 
              style={{ padding: "1.5rem" }}
            >
              <div className="flex-center" style={{ justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {record.status === 'Safe' ? (
                    <ShieldCheck color="var(--success-color)" size={20} />
                  ) : (
                    <ShieldAlert color={record.status === 'Dangerous' ? 'var(--danger-color)' : 'var(--warning-color)'} size={20} />
                  )}
                  <span style={{ fontWeight: 600, color: `var(--${record.status.toLowerCase()}-color)` }}>
                    {record.status} ({record.score}/100)
                  </span>
                </div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {formatDate(record.timestamp)}
                </span>
              </div>
              
              <div style={{ 
                background: "var(--bg-color)", 
                padding: "0.75rem", 
                borderRadius: "var(--radius-sm)", 
                fontSize: "0.9rem",
                wordBreak: "break-all",
                marginBottom: "0.5rem",
                fontFamily: "monospace"
              }}>
                {record.url}
              </div>
              
              {record.status !== 'Safe' && (
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
                  {record.reason}
                </p>
              )}
            </motion.div>
          ))}
          
          <motion.button 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            onClick={clearHistory} 
            className="btn-secondary" 
            style={{ marginTop: "2rem", border: "1px solid var(--danger-color)", color: "var(--danger-color)" }}
          >
            <Trash2 size={18} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
            Clear History
          </motion.button>
        </div>
      )}
    </div>
  );
}
