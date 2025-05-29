"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface AboutItemProps {
  text?: string;
}

export default function AboutItem({ text }: AboutItemProps) {
  const locale = useLocale();

  const defaultText = {
    en: "Verse & Volume celebrates the enduring power of written word in an increasingly digital world. Founded in 2024, we seek to bridge traditional literary forms with contemporary voices, creating a space where established and emerging writers can share their craft with readers who value depth, nuance, and artistic integrity.",
    ur: "نظم و جلد ایک بڑھتی ہوئی ڈیجیٹل دنیا میں لکھے ہوئے لفظ کی دیرپا طاقت کا جشن مناتا ہے۔ 2024 میں قائم، ہم روایتی ادبی اشکال کو معاصر آوازوں کے ساتھ جوڑنے کی کوشش کرتے ہیں، ایک ایسی جگہ بناتے ہیں جہاں قائم شدہ اور ابھرتے ہوئے مصنفین اپنی صنعت کو ان قارئین کے ساتھ شیئر کر سکتے ہیں جو گہرائی، باریکی، اور فنکارانہ سالمیت کی قدر کرتے ہیں۔"
  };

  const displayText = text || (locale === 'ur' ? defaultText.ur : defaultText.en);

  return (
    <div className="flex items-center h-full">
      <div className="about-text text-base text-paper-700 dark:text-paper-300 leading-relaxed">
        <ScrollReveal threshold={0.2} origin="bottom" distance="10px" delay={100}>
          {displayText}
        </ScrollReveal>
        <div className="mt-4">
          <ScrollReveal threshold={0.2} origin="bottom" distance="10px" delay={300}>
            <Link
              href={`/${locale}/about`}
              className="text-paper-900 dark:text-paper-100 hover:underline text-sm font-medium cursor-literature inline-flex items-center group"
            >
              <span>{locale === 'ur' ? 'مزید جانیں' : 'Learn more'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
