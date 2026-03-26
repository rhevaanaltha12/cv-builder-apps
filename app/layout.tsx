import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import '@/styles/main.scss'
import PrimeReactContainer from '@/components/PrimeReactContainer'
import Topbar from '@/components/Layout/Topbar'

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
})

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
})

const jakartaSans = Plus_Jakarta_Sans({
   subsets: ['latin'],
   // weight: ['400', '500', '600', '700'],
   // style: ['normal', 'italic'],
   variable: '--font-jakarta-sans',
   // display: 'swap',
})

export const metadata: Metadata = {
   title: 'Resume Builder | Professional CV Templates',
   description: 'Create professional resumes with our easy-to-use CV builder.',
}

export const viewport: Viewport = {
   width: 'device-width',
   initialScale: 1,
   maximumScale: 5, // Allow some zooming for accessibility
}

const menu = [
   {
      url: '/',
      label: 'Home',
   },
   {
      url: '/builder',
      label: 'Builder',
   },
]

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${jakartaSans.variable} h-full antialiased`}>
         {/* <body className="min-h-full flex flex-col">{children}</body> */}
         <body className={`antialiased`}>
            <Topbar menu={menu} />
            <PrimeReactContainer>{children}</PrimeReactContainer>
         </body>
      </html>
   )
}
