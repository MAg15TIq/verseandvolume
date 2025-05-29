"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function NewsletterItem() {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    console.log('Subscribing email:', email);
    setIsSubmitted(true);
    setEmail('');

    // Reset the submitted state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div>
      <div className="section-title font-sans text-sm font-semibold text-paper-700 dark:text-paper-500 uppercase tracking-wider mb-4">
        Stay Connected
      </div>

      <p className="text-sm text-paper-600 dark:text-paper-400 mb-4">
        Receive our weekly selection of new works and literary insights.
      </p>

      {isSubmitted ? (
        <div className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 p-3 rounded text-sm animate-scale-in shadow-elegant">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form flex flex-col gap-3">
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input w-full py-3 px-4 border border-paper-400 dark:border-paper-700 bg-white dark:bg-paper-800 text-paper-900 dark:text-paper-100 rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-paper-500 dark:focus:ring-paper-600 focus:border-transparent group-hover:border-paper-500 dark:group-hover:border-paper-600"
              placeholder="Your email address"
              required
            />
            <div className="absolute inset-0 bg-paper-200 dark:bg-paper-700 rounded-sm -z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
          <button
            type="submit"
            className="newsletter-button py-3 px-4 bg-paper-900 text-paper-50 dark:bg-paper-50 dark:text-paper-900 border-none font-sans text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-paper-800 dark:hover:bg-white hover:shadow-elegant dark:hover:shadow-elegant-dark rounded-sm transform hover:-translate-y-0.5"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
