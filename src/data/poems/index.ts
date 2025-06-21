import { Poem } from '@/types';

// Import from the new organized structure
import { allPoemsByAuthor } from './authors';

// Import individual author collections for backward compatibility
import { emilyDickinsonPoems } from './authors/emily-dickinson';
import { alexanderPushkinPoems } from './authors/alexander-pushkin';
import { robertFrostPoems } from './authors/robert-frost';
import { pabloNerudaPoems } from './authors/pablo-neruda';
import { williamShakespearePoems } from './authors/william-shakespeare';
import { mayaAngelouPoems } from './authors/maya-angelou';
import { amandaGormanPoems } from './authors/amanda-gorman';
import { sarahRiversPoems } from './authors/sarah-rivers';

// Main export using the new organized structure
export const allPoems: Poem[] = allPoemsByAuthor;

// Export individual collections for backward compatibility
export {
  emilyDickinsonPoems,
  alexanderPushkinPoems,
  robertFrostPoems,
  pabloNerudaPoems,
  williamShakespearePoems,
  mayaAngelouPoems,
  amandaGormanPoems,
  sarahRiversPoems
};
