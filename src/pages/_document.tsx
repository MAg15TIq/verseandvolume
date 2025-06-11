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



        {/* Grow by MediaVine */}
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
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
