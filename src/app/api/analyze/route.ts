import { NextResponse } from 'next/server';

const SHORTENERS = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly', 'shorte.st'];

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ score: 100, status: 'Dangerous', reason: 'Invalid or missing data' }, { status: 400 });
    }

    // UPI Pattern Check
    if (url.toLowerCase().startsWith('upi://pay')) {
      return NextResponse.json({
        score: 0,
        status: 'Safe',
        reason: 'This is a standard UPI Payment request. Ensure you verify the payee name in your app before sending money.'
      });
    }

    let parsedUrl;
    try {
      let urlToParse = url;
      // Assume http if missing to parse hostnames
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        urlToParse = 'http://' + url;
      }
      parsedUrl = new URL(urlToParse);
    } catch (e) {
      return NextResponse.json({ 
        score: 0, 
        status: 'Safe', 
        reason: 'Scanned text is not a URL. It appears to be plain text or data.' 
      });
    }

    // Exclude localhost
    if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1') {
      return NextResponse.json({ score: 0, status: 'Safe', reason: 'Local network IP.' });
    }

    let riskScore = 0;
    const reasons: string[] = [];

    // Protocol Check (Only if they actually provided HTTP in the original URL)
    if (url.startsWith('http://')) {
      riskScore += 40;
      reasons.push('Unencrypted connection (HTTP). Data can be intercepted.');
    }

    // Shortener Check
    if (SHORTENERS.includes(parsedUrl.hostname.toLowerCase())) {
      riskScore += 35;
      reasons.push('Uses a URL shortener which can hide the true destination.');
    }

    // IP Address Check
    const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(parsedUrl.hostname);
    if (isIpAddress) {
      riskScore += 60;
      reasons.push('Navigates directly to an IP address instead of a standard domain name.');
    }

    // Suspicious structural patterns
    const parts = parsedUrl.hostname.split('.');
    if (parts.length > 4) {
      riskScore += 20;
      reasons.push('Unusually long domain structure often used in phishing.');
    }

    riskScore = Math.min(riskScore, 100);

    let status = 'Safe';
    if (riskScore >= 60) status = 'Dangerous';
    else if (riskScore >= 30) status = 'Suspicious';

    const finalReason = reasons.length > 0 
      ? reasons.join(' ') 
      : 'No obvious threats detected. URL appears to be safe.';

    return NextResponse.json({
      score: riskScore,
      status,
      reason: finalReason
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
