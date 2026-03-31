import { generateRSS } from '@/lib/generateRSS';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Generate the feed dynamically in memory
  const rss = await generateRSS();
  
  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
