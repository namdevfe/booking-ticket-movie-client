import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { RefreshToken, StoreProvider } from '@/components/shared'
import './globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['vietnamese'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Booking Movie Ticket',
  description: 'Built by namdevfe'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={nunitoSans.className} suppressHydrationWarning>
        <StoreProvider>
          <RefreshToken />
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  )
}
