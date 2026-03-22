"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="navbar w-full">
      <Link href="/" className="flex-center gap-4" style={{ gap: "0.5rem" }}>
        <ShieldCheck size={32} className="accent-text" strokeWidth={2} style={{ color: "var(--accent-color)" }} />
        <span style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>QRGuard</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="nav-links nav-links-desktop">
        <Link href="/" style={{ fontWeight: 500, fontSize: "0.95rem", transition: "color 0.2s" }} className="hover:text-accent">
          Home
        </Link>
        <Link href="/#how-it-works" style={{ fontWeight: 500, fontSize: "0.95rem", transition: "color 0.2s" }} className="hover:text-accent">
          How it works
        </Link>
        <Link href="/#features" style={{ fontWeight: 500, fontSize: "0.95rem", transition: "color 0.2s" }} className="hover:text-accent">
          Features
        </Link>
        <Link href="/scan" style={{ fontWeight: 500, fontSize: "0.95rem", transition: "color 0.2s" }} className="hover:text-accent">
          Scan QR
        </Link>
        
        <button 
          onClick={toggleTheme} 
          className="btn-icon" 
          aria-label="Toggle theme"
          style={{ width: "36px", height: "36px" }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="flex-center" style={{ display: "none", gap: "1rem" }}>
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .mobile-controls { display: flex !important; }
          }
        `}} />
        <div className="mobile-controls" style={{ display: "none", alignItems: "center", gap: "1rem" }}>
          <button 
            onClick={toggleTheme} 
            className="btn-icon" 
            aria-label="Toggle theme"
            style={{ width: "36px", height: "36px" }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={toggleMobileMenu} 
            aria-label="Toggle menu"
            style={{ padding: "0.5rem" }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "var(--surface-color)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
            zIndex: 40
          }}
        >
          <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: 500 }}>
            Home
          </Link>
          <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: 500 }}>
            How it works
          </Link>
          <Link href="/#features" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: 500 }}>
            Features
          </Link>
          <Link href="/scan" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: 500, color: "var(--accent-color)" }}>
            Scan QR
          </Link>
        </div>
      )}
    </header>
  );
}
