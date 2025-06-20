import { Poem } from '@/types';

// Import all author collections
import { emilyDickinsonPoems } from './emily-dickinson';
import { alexanderPushkinPoems } from './alexander-pushkin';
import { robertFrostPoems } from './robert-frost';
import { pabloNerudaPoems } from './pablo-neruda';
import { williamShakespearePoems } from './william-shakespeare';
import { mayaAngelouPoems } from './maya-angelou';
import { amandaGormanPoems } from './amanda-gorman';
import { sarahRiversPoems } from './sarah-rivers';

// Export all collections
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

// Combined collection for backward compatibility
export const allPoemsByAuthor: Poem[] = [
  ...emilyDickinsonPoems,
  ...alexanderPushkinPoems,
  ...robertFrostPoems,
  ...pabloNerudaPoems,
  ...williamShakespearePoems,
  ...mayaAngelouPoems,
  ...amandaGormanPoems,
  ...sarahRiversPoems
];
