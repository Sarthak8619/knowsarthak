import type { Metadata } from 'next'
import { Share_Tech_Mono, VT323 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  variable: '--font-share-tech-mono',
  subsets: ['latin'],
})

const vt323 = VT323({
  weight: '400',
  variable: '--font-vt323',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sarthak Hingrajiya',
  description: 'Personal portfolio — software engineer, builder, hacker.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${shareTechMono.variable} ${vt323.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-terminal-black text-phosphor crt-flicker">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
