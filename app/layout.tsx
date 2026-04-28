import type { Metadata } from 'next'
import { Barlow_Condensed, Space_Grotesk, Share_Tech_Mono } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  weight: ['600', '700', '800'],
  variable: '--font-display',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600'],
  variable: '--font-body',
  subsets: ['latin'],
})

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sarthak Hingrajiya',
  description: 'AI/ML Engineer — building intelligent systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${spaceGrotesk.variable} ${shareTechMono.variable}`}>
      <body style={{ background: '#f2f2f2', color: '#111' }}>{children}</body>
    </html>
  )
}
