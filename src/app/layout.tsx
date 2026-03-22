import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QRGuard - Secure QR Scanner",
  description: "A secure, minimal, and fast QR code scanner with threat detection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ThemeProvider>
          <Navbar />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
