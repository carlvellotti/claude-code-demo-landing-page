import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Force no caching
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Create table if it doesn't exist
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
    }

    // Query all emails
    const { rows } = await sql`
      SELECT * FROM emails 
      ORDER BY created_at DESC;
    `;

    const response = NextResponse.json({ 
      success: true,
      count: rows.length,
      emails: rows,
      timestamp: new Date().toISOString()
    });
    
    // Prevent any caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('CDN-Cache-Control', 'no-store');
    response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
    
    return response;
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch emails',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
}

