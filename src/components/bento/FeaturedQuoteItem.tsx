"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface FeaturedQuoteItemProps {
  quote?: string;
  author?: string;
}

export default function FeaturedQuoteItem({ quote, author }: FeaturedQuoteItemProps) {
  const locale = useLocale();

  const defaultQuotes = {
    en: {
      quote: "In every word, there lives a universe waiting to be discovered.",
      author: ""
    },
    ur: {
      quote: "ہر لفظ میں ایک کائنات بستی ہے جو دریافت ہونے کا منتظر ہے۔",
      author: ""
    }
  };

  const displayQuote = quote || (locale === 'ur' ? defaultQuotes.ur.quote : defaultQuotes.en.quote);
  const displayAuthor = author || (locale === 'ur' ? defaultQuotes.ur.author : defaultQuotes.en.author);

  return (
    <div className="flex items-center justify-center text-center h-full relative">
      <div className="absolute top-4 left-4 quote-marks opacity-20 transform -translate-y-2">
        &ldquo;
      </div>
      <div className="absolute bottom-4 right-4 quote-marks opacity-20 transform rotate-180 translate-y-2">
        &rdquo;
      </div>
      <div className="quote-text font-serif text-xl md:text-2xl italic text-paper-900 dark:text-paper-100 leading-relaxed relative z-10 transition-all duration-500 hover:scale-105">
        <span className="relative">
          {displayQuote}
        </span>
        {displayAuthor && (
          <div className="mt-4 text-base font-normal text-paper-700 dark:text-paper-400 not-italic animate-fade-in">
            — <span className="border-b border-paper-400 dark:border-paper-600 pb-1">{displayAuthor}</span>
          </div>
        )}
      </div>
    </div>
  );
}
