import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Get Started | Claude Code Demo',
  description: 'Fork and use our repository',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang="en">
      <body>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {children}
        <Analytics />
      </body>
    </html>
  )
}

