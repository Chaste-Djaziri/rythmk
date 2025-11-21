import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Trispace as Impact, Charmonman as Charcoal } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _impact = Impact({ subsets: ["latin"], weight: "400", variable: "--font-impact" });
const _charcoal = Charcoal({ subsets: ["latin"], weight: "400", variable: "--font-charcoal" });

const siteUrl = 'https://rythmk.micorp.pro'
const siteName = 'rythmk'
const siteDescription = 'music. motion. meaning. Explore the music of rythmk, an electronic artist creating atmospheric and experimental soundscapes. Listen to tracks on Spotify, follow on social media, and stay updated with new releases.'
const siteImage = `${siteUrl}/background.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'rythmk - music. motion. meaning.',
    template: '%s | rythmk',
  },
  description: siteDescription,
  keywords: [
    'rythmk',
    'electronic music',
    'experimental music',
    'atmospheric music',
    'music artist',
    'Spotify artist',
    'electronic artist',
    'music producer',
    'rythmk music',
    'new music',
  ],
  authors: [{ name: 'rythmk' }],
  creator: 'rythmk',
  publisher: 'rythmk',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'rythmk - music. motion. meaning.',
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'rythmk - music. motion. meaning.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'rythmk - music. motion. meaning.',
    description: siteDescription,
    images: [siteImage],
    creator: '@_rythmk_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
