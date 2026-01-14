import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';
const FSPM_PUBLICATION_ID = 'pub_7a70fa6b-3c98-4872-9657-47e5ae2224b0';

async function addToBeehiiv(email: string, source: string) {
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!apiKey) {
    console.warn('BEEHIIV_API_KEY not set, skipping Beehiiv subscription');
    return { success: false, reason: 'no_api_key' };
  }

  try {
    const response = await fetch(
      `${BEEHIIV_API_BASE}/publications/${FSPM_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: source,
          utm_medium: 'demo_landing_page',
          referring_site: 'https://claude-code-demo-landing-page.vercel.app',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv API error:', data);
      return { success: false, reason: 'api_error', error: data };
    }

    console.log('Successfully added to Beehiiv:', email);
    return { success: true, data };
  } catch (error) {
    console.error('Beehiiv request failed:', error);
    return { success: false, reason: 'request_failed', error };
  }
}

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();
    console.log('Received email submission:', email, 'from source:', source);

    if (!email) {
      console.error('No email provided');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Store in Postgres (backup/analytics)
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS emails (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          source VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        ALTER TABLE emails ADD COLUMN IF NOT EXISTS source VARCHAR(100);
      `;

      await sql`
        INSERT INTO emails (email, source)
        VALUES (${email}, ${source})
        ON CONFLICT (email) DO NOTHING;
      `;
      console.log('Email stored in Postgres');
    } catch (dbError) {
      console.error('Postgres error (non-fatal):', dbError);
    }

    // Add to Beehiiv (The Full Stack PM)
    const beehiivResult = await addToBeehiiv(email, source);

    return NextResponse.json({
      success: true,
      email: email,
      source: source,
      beehiiv: beehiivResult.success,
    });
  } catch (error) {
    console.error('Error processing email:', error);
    return NextResponse.json({
      error: 'Failed to process email',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
