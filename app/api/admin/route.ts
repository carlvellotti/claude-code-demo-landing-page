import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Query all emails
    const { rows } = await sql`
      SELECT * FROM emails 
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ 
      success: true,
      count: rows.length,
      emails: rows 
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch emails',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

