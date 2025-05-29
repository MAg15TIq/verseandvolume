"use client";

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { getAllFeaturedArtwork, getArtworkByCategory, ArtworkItem } from '@/utils/featuredArtwork';

export default function ArtworkPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);

  const allArtwork = getAllFeaturedArtwork();
  const categories = ['all', 'portrait', 'landscape', 'abstract', 'literary'];

  const filteredArtwork = selectedCategory === 'all' 
    ? allArtwork 
    : getArtworkByCategory(selectedCategory);

  const handleArtworkClick = (artwork: ArtworkItem) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-paper-900 dark:text-paper-100">
          Featured Artwork
        </h1>
        <p className="text-lg text-paper-600 dark:text-paper-400 max-w-2xl mx-auto">
          Discover our collection of literary portraits and artistic inspirations that celebrate the world of literature and poetry.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-paper-200 dark:bg-paper-700 text-paper-700 dark:text-paper-300 hover:bg-paper-300 dark:hover:bg-paper-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtwork.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-white dark:bg-paper-900 rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleArtworkClick(artwork)}
          >
            <div className="relative h-64">
              <Image
                src={artwork.imagePath}
                alt={artwork.altText}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-paper-900 dark:text-paper-100">
                {artwork.title}
              </h3>
              <p className="text-sm text-paper-600 dark:text-paper-400 mb-2">
                {artwork.artist}
              </p>
              {artwork.description && (
                <p className="text-sm text-paper-700 dark:text-paper-300 line-clamp-2">
                  {artwork.description}
                </p>
              )}
              <div className="mt-3">
                <span className="inline-block px-2 py-1 bg-paper-100 dark:bg-paper-800 text-xs rounded-full text-paper-600 dark:text-paper-400">
                  {artwork.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArtwork.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2 text-paper-900 dark:text-paper-100">
            No artwork found
          </h3>
          <p className="text-paper-600 dark:text-paper-400">
            No artwork matches the selected category.
          </p>
        </div>
      )}

      {/* Artwork Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-paper-900 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-colors"
              >
                ×
              </button>
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={selectedArtwork.imagePath}
                  alt={selectedArtwork.altText}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-paper-900 dark:text-paper-100">
                {selectedArtwork.title}
              </h2>
              <p className="text-lg text-paper-600 dark:text-paper-400 mb-4">
                {selectedArtwork.artist}
              </p>
              {selectedArtwork.description && (
                <p className="text-paper-700 dark:text-paper-300 mb-4">
                  {selectedArtwork.description}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 bg-paper-100 dark:bg-paper-800 text-sm rounded-full text-paper-600 dark:text-paper-400">
                  {selectedArtwork.category}
                </span>
                {selectedArtwork.featured && (
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-sm rounded-full text-blue-600 dark:text-blue-400">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
