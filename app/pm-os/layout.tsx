import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The PM Operating System | Claude Code for PMs',
  description: 'Build your PM operating system with Claude Code. Skills, data viz, and repeatable workflows from the Product Growth podcast.',
  openGraph: {
    title: 'The PM Operating System | Claude Code for PMs',
    description: 'Build your PM operating system with Claude Code. Skills, data viz, and repeatable workflows from the Product Growth podcast.',
    images: [
      {
        url: '/og-pm-os.png',
        width: 1200,
        height: 630,
        alt: 'The PM Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The PM Operating System | Claude Code for PMs',
    description: 'Build your PM operating system with Claude Code. Skills, data viz, and repeatable workflows from the Product Growth podcast.',
    images: ['/og-pm-os.png'],
  },
}

export default function PMOSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
