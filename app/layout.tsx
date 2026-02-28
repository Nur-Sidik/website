import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'Desa Banaran',
  description: 'Kata katanya ntar disini',
}

export const viewport: Viewport = {
  themeColor: '#2E8B57',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <style>{`
          [data-nextjs-toast],
          [data-nextjs-dialog-overlay],
          div[nextjs-portal],
          #nextjs-dev-tools-overlay,
          .nextjs-toast-errors-parent,
          .nextjs-static-indicator-toast-wrapper,
          [class*="nextjs-toast"],
          [class*="vercel-toolbar"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            z-index: -9999 !important;
            width: 0 !important;
            height: 0 !important; 
          }
        `}</style>
      </head>
      
      <body 
        className={`${plusJakarta.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}