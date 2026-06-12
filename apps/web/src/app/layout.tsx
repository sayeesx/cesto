import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cesto – Premium Gifting & Curated Hampers Kerala",
  description:
    "Luxury same-day gifts, curated hampers, fresh flowers, and artisanal treats delivered across Kerala. Send premium care packages with ease.",
  keywords: [
    "premium gifts Kerala",
    "luxury hampers Kochi",
    "same day delivery Kerala",
    "send flowers to Kerala",
    "gifting app Kerala",
    "personalized hampers",
  ],
  openGraph: {
    title: "Cesto – Luxury Gifting & Hamper Delivery",
    description:
      "Premium same-day gifts, curated hampers, flowers, and artisanal treats.",
    type: "website",
    locale: "en_IN",
    siteName: "Cesto",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#b22153", // Brand Color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Added to "lock" mobile layout as requested
  viewportFit: "cover", 
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body style={{ 
        fontFamily: 'var(--font-archivo), sans-serif',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AuthProvider>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
