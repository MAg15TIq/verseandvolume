"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

interface Author {
  id: string;
  name: string;
  image: string;
  brief: string;
  language: 'en' | 'ur' | 'both';
}

export default function AuthorsPage() {
  const t = useTranslations();
  const locale = useLocale();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  const authors: Author[] = [
    {
      id: 'emily-dickinson',
      name: 'Emily Dickinson',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Black-white_photograph_of_Emily_Dickinson2.png/800px-Black-white_photograph_of_Emily_Dickinson2.png',
      brief: 'American poet who lived a largely introverted life, known for her unique style and exploration of themes like death and immortality.',
      language: 'en'
    },
    {
      id: 'mirza-ghalib',
      name: 'Mirza Ghalib',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mirza_Ghalib_Mirza_Asadullah_Baig_Khan.jpg/800px-Mirza_Ghalib_Mirza_Asadullah_Baig_Khan.jpg',
      brief: 'The preeminent Urdu and Persian-language poet during the last years of the Mughal Empire, known for his lyrical and philosophical ghazals.',
      language: 'ur'
    },
    {
      id: 'robert-frost',
      name: 'Robert Frost',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Robert_Frost_NYWTS.jpg/800px-Robert_Frost_NYWTS.jpg',
      brief: 'American poet known for his realistic depictions of rural life and command of American colloquial speech.',
      language: 'en'
    },
    {
      id: 'faiz-ahmad-faiz',
      name: 'Faiz Ahmad Faiz',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Faiz_Ahmed_Faiz_1976.jpg/800px-Faiz_Ahmed_Faiz_1976.jpg',
      brief: 'Influential Pakistani poet who combined classical romantic themes with progressive ideas and revolutionary sentiment.',
      language: 'ur'
    },
    {
      id: 'sylvia-plath',
      name: 'Sylvia Plath',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sylvia_Plath.jpg/800px-Sylvia_Plath.jpg',
      brief: 'American poet, novelist, and short-story writer known for her confessional poetry and her novel The Bell Jar.',
      language: 'en'
    },
    {
      id: 'allama-iqbal',
      name: 'Allama Iqbal',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Allama_Iqbal.jpg/800px-Allama_Iqbal.jpg',
      brief: 'Poet, philosopher, and politician in British India who is widely regarded as having inspired the Pakistan Movement.',
      language: 'both'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl mb-12 text-center" style={{ fontWeight: 700 }}>{t('navigation.authors')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map(author => (
          <Link
            key={author.id}
            href={localizedPath(`/authors/${author.id}`)}
            className="group"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="relative h-64 w-full">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl mb-2" style={{ fontWeight: 600 }}>{author.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{author.brief}</p>

                <div className="flex space-x-2">
                  {author.language === 'en' && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                      English
                    </span>
                  )}
                  {author.language === 'ur' && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      Urdu
                    </span>
                  )}
                  {author.language === 'both' && (
                    <>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                        English
                      </span>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                        Urdu
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
