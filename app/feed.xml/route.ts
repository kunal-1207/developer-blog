import { generateRSS } from '@/lib/generateRSS';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Ensure the feed is generated
  await generateRSS();
  
  // Read and return the generated XML
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  const feed = fs.readFileSync(rssPath, 'utf8');
  
  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
