import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/providers/session-provider'

export const metadata: Metadata = {
  title: 'AdGen SaaS',
  description: 'Multi-tenant Advertisement Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
