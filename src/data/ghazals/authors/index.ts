import { Poem } from '@/types';

// Import all author collections
import { mirzaGhalibGhazals } from './mirza-ghalib';
import { allamaIqbalGhazals } from './allama-iqbal';
import { parveenShakirGhazals } from './parveen-shakir';
import { faizAhmedFaizGhazals } from './faiz-ahmed-faiz';
import { hafezGhazals } from './hafez';

// Export all collections
export {
  mirzaGhalibGhazals,
  allamaIqbalGhazals,
  parveenShakirGhazals,
  faizAhmedFaizGhazals,
  hafezGhazals
};

// Combined collection for backward compatibility
export const allGhazalsByAuthor: Poem[] = [
  ...mirzaGhalibGhazals,
  ...allamaIqbalGhazals,
  ...parveenShakirGhazals,
  ...faizAhmedFaizGhazals,
  ...hafezGhazals
];
