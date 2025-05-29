"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Book } from '@/types';
import BookmarkButton from './BookmarkButton';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface BookDetailsProps {
  book: Book;
  relatedBooks?: Book[];
}

export default function BookDetails({ book, relatedBooks = [] }: BookDetailsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const locale = useLocale();
  const { addToReadingHistory } = useUserPreferences();

  // Add to reading history when component mounts
  useEffect(() => {
    addToReadingHistory('books', book.id);
  }, [book.id, addToReadingHistory]);

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Truncate description if it's too long
  const shouldTruncate = book.description.length > 300;
  const displayDescription = shouldTruncate && !showFullDescription
    ? `${book.description.substring(0, 300)}...`
    : book.description;

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-2 text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3 p-6 flex justify-center">
            <div className="relative w-64 h-96 shadow-lg">
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover rounded"
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-6">
            <div className={`text-sm font-medium mb-2 ${book.language === 'ur' ? 'text-right' : ''}`}>
              {book.genre.map((g, index) => (
                <span key={g}>
                  <span className="text-blue-600 dark:text-blue-400">{g}</span>
                  {index < book.genre.length - 1 && <span className="mx-1">•</span>}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-start">
              <h1 className={`text-3xl font-bold mb-2 ${book.language === 'ur' ? 'font-urdu text-right' : ''}`}>
                {book.title}
              </h1>

              <BookmarkButton
                id={book.id}
                type="books"
                showLabel={true}
                className="mt-1"
              />
            </div>

            <div className="mb-4">
              <Link
                href={localizedPath(`/authors/${book.authorId}`)}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {book.author}
              </Link>
              {book.publishYear && (
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  ({book.publishYear})
                </span>
              )}
            </div>

            {book.rating && (
              <div className="mb-4">
                {renderStars(book.rating)}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {book.pages && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Pages:</span> {book.pages}
                </div>
              )}
              {book.language && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Language:</span> {book.language === 'en' ? 'English' : book.language === 'ur' ? 'Urdu' : 'Bilingual'}
                </div>
              )}
              {book.isbn && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">ISBN:</span> {book.isbn}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {displayDescription}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>

            {book.awards && book.awards.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Awards</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {book.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Book Excerpt */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Excerpt</h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              Preview Only
            </div>
          </div>
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              📖 This is a preview excerpt. The full content ({book.pages ? `${book.pages} pages` : 'complete work'}) is available below.
            </p>
          </div>
          <div
            className={`p-6 bg-gray-50 dark:bg-gray-800 rounded-lg ${book.language === 'ur' ? 'text-right' : ''}`}
            style={{
              fontFamily: book.language === 'ur' ? 'Noto Nastaliq Urdu, serif' : 'inherit',
              direction: book.language === 'ur' ? 'rtl' : 'ltr'
            }}
          >
            {Array.isArray(book.excerpt) ? (
              book.excerpt.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))
            ) : (
              <div>
                {book.excerpt.en && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">English</h3>
                    {book.excerpt.en.map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {book.excerpt.ur && (
                  <div className="text-right" style={{ fontFamily: 'Noto Nastaliq Urdu, serif', direction: 'rtl' }}>
                    <h3 className="text-lg font-semibold mb-2">اردو</h3>
                    {book.excerpt.ur.map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {book.reviews && book.reviews.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {book.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{review.author}</h3>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((book) => (
              <Link
                key={book.id}
                href={localizedPath(`/prose/${book.id}`)}
                className="block group"
                onClick={() => addToReadingHistory('books', book.id)}
              >
                <div className="relative h-64 mb-2 overflow-hidden rounded-lg">
                  <Image
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`font-semibold ${book.language === 'ur' ? 'font-urdu text-right' : ''}`}>
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {book.author}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
