'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { allPsychologicalPoems } from '@/data/poems/psychological';
import PoetryReader from '@/components/PoetryReader';
import { notFound } from 'next/navigation';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useEffect } from 'react';

export default function PsychologicalPoemPage() {
  const t = useTranslations();
  const params = useParams();
  const { addToReadingHistory } = useUserPreferences();
  const poemId = params?.id as string;

  if (!params || !poemId) {
    notFound();
  }

  // Find the poem by ID
  const poem = allPsychologicalPoems.find(p => p.id === poemId);

  // Add to reading history when poem is viewed
  useEffect(() => {
    if (poem) {
      addToReadingHistory('poems', poem.id);
    }
  }, [poem, addToReadingHistory]);

  if (!poem) {
    notFound();
  }

  // Get poem content based on language
  const getPoemContent = () => {
    if (Array.isArray(poem.content)) {
      return poem.content;
    }
    // For bilingual content, prefer English for now
    return poem.content.en || poem.content.ur || [];
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <PoetryReader
        title={poem.title}
        author={poem.author}
        content={getPoemContent()}
        language={poem.language === 'both' ? 'en' : poem.language}
        showLineNumbers={true}
        audioUrl={poem.audioUrl ?
          (typeof poem.audioUrl === 'string' ?
            poem.audioUrl :
            poem.language === 'ur' ? poem.audioUrl?.ur : poem.audioUrl?.en) :
          null}
        hasAudio={poem.hasAudio || !!poem.audioUrl}
      />
    </div>
  );
}
