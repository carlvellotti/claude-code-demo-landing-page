import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert email (ignore if duplicate)
    await sql`
      INSERT INTO emails (email) 
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING;
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing email:', error);
    return NextResponse.json({ error: 'Failed to store email' }, { status: 500 });
  }
}

