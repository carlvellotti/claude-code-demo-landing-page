import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Store email with timestamp
    const timestamp = new Date().toISOString();
    await kv.set(`email:${email}`, { email, timestamp });
    
    // Also add to a set for easy retrieval
    await kv.sadd('emails', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing email:', error);
    return NextResponse.json({ error: 'Failed to store email' }, { status: 500 });
  }
}

