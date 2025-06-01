import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="scroll-smooth" style={{ '--n8n-chat-display': 'none' } as React.CSSProperties}>
      <Head>
        {/* Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KH9FBLXVRL"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KH9FBLXVRL');
            `,
          }}
        />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5754219619080083"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
