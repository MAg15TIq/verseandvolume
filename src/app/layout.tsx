import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu, Crimson_Text } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-text'
});
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-nastaliq-urdu'
});

export const metadata: Metadata = {
  title: "Verse & Volume",
  description: "A sophisticated literary platform for poetry and prose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define inline style to match what might be added by browser extensions
  const inlineStyle = {
    '--n8n-chat-display': 'none'
  } as React.CSSProperties;

  return (
    <html className="scroll-smooth" style={inlineStyle}>
      <head>
        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-5754219619080083" />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5754219619080083"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Add a script to ensure consistent HTML attributes between server and client */}
        <Script id="handle-html-attributes" strategy="beforeInteractive">
          {`
            // This script runs before React hydration to ensure consistent HTML attributes
            (function() {
              // Set any attributes that might be added by browser extensions
              document.documentElement.style.setProperty('--n8n-chat-display', 'none');
            })();
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${crimsonText.variable} ${notoNastaliqUrdu.variable} font-sans bg-paper-50 dark:bg-paper-950 text-paper-900 dark:text-paper-50 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
