import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const transcriptionDirectory = path.join(process.cwd(), 'transcriptions');

if (!fs.existsSync(transcriptionDirectory)) {
  fs.mkdirSync(transcriptionDirectory, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const { text, sessionId } = await req.json();

    if (!text || !sessionId) {
      return new NextResponse(JSON.stringify({ error: 'Text and sessionId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${text}\n\n`;

    const filePath = path.join(transcriptionDirectory, `${sessionId}.txt`);
    fs.appendFileSync(filePath, logEntry);

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in log-message route:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 