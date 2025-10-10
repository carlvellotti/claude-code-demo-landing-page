import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    const result = await sql`SELECT COUNT(*) as count FROM emails;`;
    const countResult = await sql`SELECT email FROM emails ORDER BY created_at DESC LIMIT 5;`;
    
    return NextResponse.json({ 
      success: true,
      totalEmails: result.rows[0].count,
      recentEmails: countResult.rows,
      connectionInfo: {
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Database test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

