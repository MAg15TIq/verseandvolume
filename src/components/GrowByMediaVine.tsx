'use client';

import Script from 'next/script';

/**
 * Grow by MediaVine Component
 * 
 * This component integrates the Grow by MediaVine script for website monetization.
 * It uses Next.js Script component for optimal loading performance.
 */
export default function GrowByMediaVine() {
  return (
    <>
      {/* Grow by MediaVine Script */}
      <Script
        id="grow-by-mediavine"
        strategy="afterInteractive"
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
    </>
  );
}
