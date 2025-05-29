import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="scroll-smooth" style={{ '--n8n-chat-display': 'none' } as React.CSSProperties}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
