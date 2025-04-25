import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://badyet.ai"),
  title: {
    template: "%s | Badyet AI",
    default: "Badyet AI - Smart, Simple, Personalized Financial Tracking",
  },
  description:
    "AI-powered personal finance tracker that makes budgeting and saving effortless through natural language inputs and personalized insights.",
  keywords: [
    "personal finance",
    "AI budgeting",
    "expense tracker",
    "financial planning",
    "money management",
    "budgeting app",
  ],
  authors: [{ name: "Badyet Team" }],
  creator: "Badyet AI",
  publisher: "Badyet AI",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://badyet.ai",
    title: "Badyet AI - Your AI-Powered Financial Sidekick",
    description:
      "Take control of your finances with AI-powered insights, natural language budgeting, and personalized recommendations.",
    siteName: "Badyet AI",
    images: [
      {
        url: "https://badyet.ai/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Badyet AI - Smart Financial Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badyet AI - Your AI-Powered Financial Sidekick",
    description:
      "Take control of your finances with AI-powered insights, natural language budgeting, and personalized recommendations.",
    creator: "@badyet_ai",
    images: ["https://badyet.ai/images/twitter-image.jpg"],
  },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1
  //   }
  // },
  // icons: {
  //   icon: [
  //     { url: '/favicon.ico' },
  //     { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
  //     { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' }
  //   ],
  //   apple: [
  //     { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
  //   ],
  //   other: [
  //     { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#5bbad5' }
  //   ]
  // },
  // manifest: '/site.webmanifest',
  // alternates: {
  //   canonical: 'https://badyet.ai',
  //   languages: {
  //     'en-US': 'https://badyet.ai/en-US',
  //     'es-ES': 'https://badyet.ai/es-ES'
  //   }
  // },
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 1
  // },
  // verification: {
  //   google: 'google-site-verification-code',
  //   yandex: 'yandex-verification-code'
  // },
  // appleWebApp: {
  //   title: 'Badyet AI',
  //   statusBarStyle: 'black-translucent',
  //   startupImage: [
  //     '/startup/apple-splash-2048-2732.png',
  //     '/startup/apple-splash-1668-2388.png',
  //     '/startup/apple-splash-1536-2048.png'
  //   ]
  // },
  // applicationName: 'Badyet AI',
  // generator: 'Next.js',
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  //   { media: '(prefers-color-scheme: dark)', color: '#121212' }
  // ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
