import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text, voiceId } = await req.json();

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const modelId = 'eleven_monolingual_v1';
  const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  if (!apiKey) {
    return new NextResponse(JSON.stringify({ error: 'ElevenLabs API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(elevenLabsUrl, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', errorText);
      return new NextResponse(JSON.stringify({ error: `ElevenLabs API request failed with status ${response.status}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const audioBlob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', 'audio/mpeg');

    return new NextResponse(audioBlob, { status: 200, headers });
  } catch (error) {
    console.error('Error with ElevenLabs TTS API call:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 