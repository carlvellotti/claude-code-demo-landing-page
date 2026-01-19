import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Masterclass | Advanced Training',
  description: 'Master advanced Claude Code techniques with our comprehensive masterclass.',
  openGraph: {
    title: 'Claude Code Masterclass',
    description: 'Master advanced Claude Code techniques with our comprehensive masterclass.',
    images: [
      {
        url: '/og-advanced-cc.png',
        width: 1200,
        height: 630,
        alt: 'Claude Code Masterclass',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Masterclass',
    description: 'Master advanced Claude Code techniques with our comprehensive masterclass.',
    images: ['/og-advanced-cc.png'],
  },
}

export default function AdvancedCCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
