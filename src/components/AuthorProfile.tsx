"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthorImage from './AuthorImage';
import { Author } from '@/types';

interface Work {
  id: string;
  title: string;
  year?: number;
  type: 'poetry' | 'prose' | 'essay' | 'other';
}

interface AuthorProfileProps {
  author: Author;
  works?: Work[];
  language: 'en' | 'ur';
}

export default function AuthorProfile({
  author,
  works = [],
  language
}: AuthorProfileProps) {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <div className={`max-w-4xl mx-auto my-8 ${language === 'ur' ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <AuthorImage
            author={author}
            size="xl"
            className="shadow-lg"
            priority={true}
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>{author.name}</h1>

          {(author.birthYear || author.deathYear) && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {author.birthYear && author.deathYear
                ? `${author.birthYear} - ${author.deathYear}`
                : author.birthYear
                  ? `b. ${author.birthYear}`
                  : author.deathYear
                    ? `d. ${author.deathYear}`
                    : ''}
            </p>
          )}

          {author.birthPlace && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Born in {author.birthPlace}
            </p>
          )}

          <div className={`prose dark:prose-invert max-w-none ${bioExpanded ? '' : 'line-clamp-4'}`}>
            <p>{author.bio}</p>
          </div>

          {author.bio.length > 300 && (
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {bioExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {author.quote && (
            <blockquote className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 italic">
              &ldquo;{author.quote}&rdquo;
            </blockquote>
          )}
        </div>
      </div>

      {works.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Notable Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {works.map(work => (
              <Link
                key={work.id}
                href={`/works/${work.id}`}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <h3 className="mb-1" style={{ fontWeight: 600 }}>{work.title}</h3>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{work.type}</span>
                  {work.year && <span>{work.year}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
