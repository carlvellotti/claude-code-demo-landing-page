import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();
    console.log('Received email submission:', email, 'from source:', source);

    if (!email) {
      console.error('No email provided');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Create table if it doesn't exist
    console.log('Creating/updating table schema...');
    await sql`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        source VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Add source column if it doesn't exist (for existing tables)
    try {
      await sql`
        ALTER TABLE emails ADD COLUMN IF NOT EXISTS source VARCHAR(100);
      `;
    } catch (e) {
      // Column might already exist, that's fine
      console.log('Source column already exists or error adding:', e);
    }
    console.log('Table ready');

    // Insert email with source (keep first source if duplicate)
    console.log('Inserting email:', email, 'with source:', source);
    const result = await sql`
      INSERT INTO emails (email, source) 
      VALUES (${email}, ${source})
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;
    console.log('Insert result:', result);

    return NextResponse.json({ 
      success: true,
      stored: result.rowCount ? result.rowCount > 0 : false,
      email: email,
      source: source
    });
  } catch (error) {
    console.error('Error storing email:', error);
    return NextResponse.json({ 
      error: 'Failed to store email',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
}

