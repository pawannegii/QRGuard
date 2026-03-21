# QRGuard

A small tool to make QR codes a little less risky.

---

## Why this exists

We scan QR codes without thinking — at cafes, shops, payments, random posters.
The problem is, not every QR code is safe anymore.

QRGuard is built to add a pause between scanning and opening.
Instead of instantly redirecting, it shows you what’s behind the code and whether it looks trustworthy.

---

## What it does

* Scan a QR code (camera or image)
* Show what’s inside before opening it
* Check if the link looks suspicious
* Give a simple risk level: safe, suspicious, or dangerous
* Tell you *why* it thinks so
* Keep a small history of scans

---

## How it works (simple version)

1. You scan a QR code
2. The app reads the content (usually a link)
3. It checks for common red flags
4. You get a clear result before doing anything risky

---

## What it looks for

Things like:

* no HTTPS
* strange domain names
* shortened links
* “login / verify / bank” type keywords
* generally sketchy patterns

It’s not trying to be perfect — just helpful enough to stop obvious mistakes.

---

## Tech (kept minimal)

* React / Next.js
* Node.js (or simple serverless functions)

---

## Running it locally

```bash
git clone https://github.com/your-username/qrguard.git
cd qrguard
npm install
npm run dev
```

---

## A quick note

This project doesn’t use real harmful links for testing.
Everything is simulated or based on patterns, so it’s safe to try out.

---

## Future ideas

* smarter detection (maybe ML)
* better domain checks
* payment QR verification
* browser extension

---

## Final thought

QR codes aren’t going anywhere.
Adding even a small layer of awareness can prevent real problems.

That’s the idea behind QRGuard.
