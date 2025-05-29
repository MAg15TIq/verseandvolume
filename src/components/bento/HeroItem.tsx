"use client";

import { useTranslations } from 'next-intl';

interface HeroItemProps {
  title?: string;
  subtitle?: string;
}

export default function HeroItem({ title, subtitle }: HeroItemProps) {
  const t = useTranslations('home.hero');

  return (
    <div className="hero-content relative z-10 h-full flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-literary-gold/10 to-transparent rounded-bl-3xl"></div>

      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal italic mb-4 text-paper-900 dark:text-paper-50 animate-slide-in-up">
        <span className="relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-literary-gold after:to-accent-500 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-bottom-left">
          {title || t('title')}
        </span>
      </h2>

      {/* Curator and Author Information */}
      <div className="text-sm md:text-base text-paper-700 dark:text-paper-400 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        Curator and Author: Dentist Hafsa Rehman <span className="font-bold italic">({t('curator.nickname')})</span>
      </div>

      <p className="text-base md:text-lg text-paper-800 dark:text-paper-300 font-light leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {subtitle || t('subtitle')}
      </p>

      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-500/10 to-transparent rounded-tr-3xl"></div>

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-literary-gold/5 via-transparent to-accent-500/5 rounded-xl pointer-events-none"></div>
    </div>
  );
}
