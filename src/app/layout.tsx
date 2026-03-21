import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
