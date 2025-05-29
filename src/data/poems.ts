import { Poem } from '@/types';

// Import from the new organized structure
import { allPoemsByAuthor } from './poems/authors';
import { allGhazalsByAuthor } from './ghazals/authors';
import { allPsychologicalPoems } from './poems/psychological';

// Combine all poems and ghazals using the new organized structure
export const poems: Poem[] = [
  // Include poems with full content from new structure
  ...allPoemsByAuthor,
  // Include ghazals with full content from new structure
  ...allGhazalsByAuthor,
  // Include psychological poetry collection
  ...allPsychologicalPoems
  // Note: Legacy inline content removed to avoid duplicates
  // All content is now organized in separate author files with full content
];


