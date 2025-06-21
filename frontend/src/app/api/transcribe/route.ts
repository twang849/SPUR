import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const sessionId = formData.get("sessionId") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file found" }, { status: 400 });
  }

  if (!sessionId) {
    return NextResponse.json({ error: "No session ID provided" }, { status: 400 });
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
    });

    const transcriptionsDir = path.join(process.cwd(), "transcriptions");
    await fs.mkdir(transcriptionsDir, { recursive: true });

    const filePath = path.join(transcriptionsDir, `${sessionId}.txt`);
    const timestamp = new Date().toISOString();
    const formattedText = `[${timestamp}] ${transcription.text}\n\n`;

    await fs.appendFile(filePath, formattedText);

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json(
      { error: "Error transcribing audio" },
      { status: 500 }
    );
  }
} 