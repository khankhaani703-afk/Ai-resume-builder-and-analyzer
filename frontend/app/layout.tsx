import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Resume Builder & Analyzer',
  description: 'AI-powered resume builder and analyzer using Google Gemini',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
