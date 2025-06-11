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
        {/* SEO Meta Tags */}
        <meta name="description" content="Verse and Volume - A literary sanctuary featuring poetry, novels, ghazals, prose, quotes, and audiobooks. Discover timeless literature in English and Urdu." />
        <meta name="keywords" content="poetry, novels, ghazals, prose, quotes, audiobooks, literature, English poetry, Urdu poetry, classic novels, literary works" />
        <meta name="author" content="Dentist Hafsa Rehman (Aima Khan)" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Verse and Volume - Literary Sanctuary" />
        <meta property="og:description" content="Discover timeless literature featuring poetry, novels, ghazals, prose, quotes, and audiobooks in English and Urdu." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://verseandvolume.online/" />
        <meta property="og:site_name" content="Verse and Volume" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Verse and Volume - Literary Sanctuary" />
        <meta name="twitter:description" content="Discover timeless literature featuring poetry, novels, ghazals, prose, quotes, and audiobooks." />

        {/* Google Site Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />



        {/* Canonical URL */}
        <link rel="canonical" href="https://verseandvolume.online/" />

        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KH9FBLXVRL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KH9FBLXVRL');
          `}
        </Script>



        {/* Grow by MediaVine - Direct Script for Better Detection */}
        <script
          data-grow-initializer=""
          dangerouslySetInnerHTML={{
            __html: `
              !(function(){
                window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));
                var e=document.createElement("script");
                (e.type="text/javascript"),
                (e.src="https://faves.grow.me/main.js"),
                (e.defer=!0),
                e.setAttribute("data-grow-faves-site-id","U2l0ZTpkMWNiMjgxMC1iNmFjLTRiNGItOTUwMC01NTgxNDMwMzY3NjI=");
                var t=document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e,t);
              })();
            `
          }}
        />

        {/* Structured Data (JSON-LD) */}
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Verse and Volume",
              "description": "A literary sanctuary featuring poetry, novels, ghazals, prose, quotes, and audiobooks in English and Urdu",
              "url": "https://verseandvolume.online/",
              "author": {
                "@type": "Person",
                "name": "Dentist Hafsa Rehman",
                "alternateName": "Aima Khan"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Verse and Volume",
                "url": "https://verseandvolume.online/"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://verseandvolume.online/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "CreativeWork",
                "@id": "https://verseandvolume.online/#website",
                "name": "Verse and Volume Literary Collection",
                "description": "Comprehensive collection of poetry, novels, ghazals, prose, quotes, and audiobooks",
                "genre": ["Poetry", "Literature", "Novels", "Ghazals", "Prose"],
                "inLanguage": ["en", "ur"],
                "isAccessibleForFree": true
              }
            }
          `}
        </Script>

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
