'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function NewsletterPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState({
    poetry: true,
    prose: true,
    authors: true,
    events: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Newsletter subscription:', { email, name, preferences });
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontWeight: 700 }}>Newsletter</h1>

        <div className="bg-paper-50 dark:bg-paper-900 p-8 rounded-lg border border-paper-200 dark:border-paper-800 shadow-elegant dark:shadow-elegant-dark mb-12">
          <div className="prose dark:prose-invert mx-auto mb-8">
            <p className="text-lg">
              Subscribe to our weekly newsletter and stay updated with the latest additions to our literary collection, featured authors, and exclusive insights into the world of literature.
            </p>
            <p>
              Each week, we curate a selection of the finest poetry and prose, along with commentary and context to enhance your appreciation of these works. Our newsletter is the perfect way to discover new authors and revisit timeless classics.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8 bg-paper-100 dark:bg-paper-800 rounded-lg p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600 dark:text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl mb-2">Thank You for Subscribing!</h3>
              <p className="text-paper-600 dark:text-paper-400 mb-6">
                You&rsquo;ve been added to our newsletter. Look forward to receiving our next issue in your inbox.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                  setName('');
                }}
                className="px-4 py-2 bg-paper-800 text-paper-50 dark:bg-paper-700 rounded hover:bg-paper-700 dark:hover:bg-paper-600 transition-colors"
              >
                Subscribe Another Email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-paper-700 dark:text-paper-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-paper-300 dark:border-paper-700 rounded-md bg-white dark:bg-paper-800 text-paper-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-paper-500 dark:focus:ring-paper-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-paper-700 dark:text-paper-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-paper-300 dark:border-paper-700 rounded-md bg-white dark:bg-paper-800 text-paper-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-paper-500 dark:focus:ring-paper-600"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <p className="block text-sm font-medium text-paper-700 dark:text-paper-300 mb-2">
                  Content Preferences
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="poetry"
                      name="poetry"
                      checked={preferences.poetry}
                      onChange={handlePreferenceChange}
                      className="h-4 w-4 text-paper-600 focus:ring-paper-500 border-paper-300 rounded"
                    />
                    <label htmlFor="poetry" className="ml-2 block text-sm text-paper-700 dark:text-paper-300">
                      Poetry
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="prose"
                      name="prose"
                      checked={preferences.prose}
                      onChange={handlePreferenceChange}
                      className="h-4 w-4 text-paper-600 focus:ring-paper-500 border-paper-300 rounded"
                    />
                    <label htmlFor="prose" className="ml-2 block text-sm text-paper-700 dark:text-paper-300">
                      Prose & Novels
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="authors"
                      name="authors"
                      checked={preferences.authors}
                      onChange={handlePreferenceChange}
                      className="h-4 w-4 text-paper-600 focus:ring-paper-500 border-paper-300 rounded"
                    />
                    <label htmlFor="authors" className="ml-2 block text-sm text-paper-700 dark:text-paper-300">
                      Author Spotlights
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="events"
                      name="events"
                      checked={preferences.events}
                      onChange={handlePreferenceChange}
                      className="h-4 w-4 text-paper-600 focus:ring-paper-500 border-paper-300 rounded"
                    />
                    <label htmlFor="events" className="ml-2 block text-sm text-paper-700 dark:text-paper-300">
                      Literary Events
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-sm text-paper-600 dark:text-paper-400">
                <p>
                  By subscribing, you agree to receive our newsletter and accept our <Link href={`/${locale}/terms`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100 underline">Terms and Conditions</Link> and <Link href={`/${locale}/privacy`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100 underline">Privacy Policy</Link>. You can unsubscribe at any time by clicking the unsubscribe link in the footer of our emails.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-paper-900 text-paper-50 dark:bg-paper-50 dark:text-paper-900 border-none font-sans text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-paper-800 dark:hover:bg-white hover:shadow-elegant dark:hover:shadow-elegant-dark rounded-sm transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-paper-100 dark:bg-paper-800 p-6 rounded-lg border border-paper-200 dark:border-paper-700">
            <h2 className="text-xl mb-4 font-serif" style={{ fontWeight: 600 }}>What to Expect</h2>
            <ul className="space-y-3 text-paper-700 dark:text-paper-300">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-paper-900 dark:text-paper-100 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Weekly curated selections of poetry and prose
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-paper-900 dark:text-paper-100 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Featured author biographies and insights
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-paper-900 dark:text-paper-100 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Exclusive content not available on the website
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-paper-900 dark:text-paper-100 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Literary analysis and historical context
              </li>
            </ul>
          </div>

          <div className="bg-paper-100 dark:bg-paper-800 p-6 rounded-lg border border-paper-200 dark:border-paper-700">
            <h2 className="text-xl mb-4 font-serif" style={{ fontWeight: 600 }}>Past Newsletters</h2>
            <p className="text-paper-700 dark:text-paper-300 mb-4">
              Browse our archive of past newsletters to get a sense of what you&rsquo;ll receive:
            </p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100 hover:underline">
                  The Poetic Voice of Faiz Ahmed Faiz (June 2024)
                </a>
              </li>
              <li>
                <a href="#" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100 hover:underline">
                  Exploring Dostoevsky&rsquo;s Literary Universe (May 2024)
                </a>
              </li>
              <li>
                <a href="#" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100 hover:underline">
                  The Art of Ghazal: From Classical to Contemporary (April 2024)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
