import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Received email submission:', email);

    if (!email) {
      console.error('No email provided');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Create table if it doesn't exist
    console.log('Creating table if not exists...');
    await sql`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table ready');

    // Insert email (ignore if duplicate)
    console.log('Inserting email:', email);
    const result = await sql`
      INSERT INTO emails (email) 
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;
    console.log('Insert result:', result);

    return NextResponse.json({ 
      success: true,
      stored: result.rowCount > 0,
      email: email 
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

