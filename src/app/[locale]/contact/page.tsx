'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontWeight: 700 }}>Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="prose dark:prose-invert">
              <p className="text-lg mb-6">
                We&rsquo;d love to hear from you. Whether you have a question about our content, want to suggest a new feature, or are interested in contributing to our collection, please don&rsquo;t hesitate to reach out.
              </p>

              <div className="mb-8">
                <h3 className="text-xl mb-2">Email</h3>
                <p className="mb-4">
                  <a href="mailto:contact@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">
                    contact@verseandvolume.com
                  </a>
                </p>

                <h3 className="text-xl mb-2">Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                    Twitter
                  </a>
                  <a href="#" className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                    Instagram
                  </a>
                </div>
              </div>

              <div className="bg-paper-100 dark:bg-paper-900 p-6 rounded-lg border border-paper-200 dark:border-paper-800">
                <h3 className="text-xl mb-4">For Literary Submissions</h3>
                <p className="mb-2">
                  If you&rsquo;re a writer or translator interested in having your work featured on Verse & Volume, please email us at:
                </p>
                <a href="mailto:submissions@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">
                  submissions@verseandvolume.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-paper-50 dark:bg-paper-900 p-6 rounded-lg border border-paper-200 dark:border-paper-800 shadow-elegant dark:shadow-elegant-dark">
            {isSubmitted ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600 dark:text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl mb-2">Thank You!</h3>
                <p className="text-paper-600 dark:text-paper-400">
                  Your message has been sent successfully. We&rsquo;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-4 py-2 bg-paper-800 text-paper-50 dark:bg-paper-700 rounded hover:bg-paper-700 dark:hover:bg-paper-600 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-paper-700 dark:text-paper-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-paper-300 dark:border-paper-700 rounded-md bg-white dark:bg-paper-800 text-paper-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-paper-500 dark:focus:ring-paper-600"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-paper-700 dark:text-paper-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-paper-300 dark:border-paper-700 rounded-md bg-white dark:bg-paper-800 text-paper-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-paper-500 dark:focus:ring-paper-600"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-paper-700 dark:text-paper-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-paper-300 dark:border-paper-700 rounded-md bg-white dark:bg-paper-800 text-paper-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-paper-500 dark:focus:ring-paper-600"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Content Suggestion">Content Suggestion</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-paper-700 dark:text-paper-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-paper-300 dark:border-paper-700 rounded-md bg-white dark:bg-paper-800 text-paper-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-paper-500 dark:focus:ring-paper-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-paper-900 text-paper-50 dark:bg-paper-50 dark:text-paper-900 border-none font-sans text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-paper-800 dark:hover:bg-white hover:shadow-elegant dark:hover:shadow-elegant-dark rounded-sm transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
