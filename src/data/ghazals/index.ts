import { Poem } from '@/types';

// Import from the new organized structure
import { allGhazalsByAuthor } from './authors';

// Import individual author collections for backward compatibility
import { mirzaGhalibGhazals } from './authors/mirza-ghalib';
import { allamaIqbalGhazals } from './authors/allama-iqbal';
import { parveenShakirGhazals } from './authors/parveen-shakir';
import { faizAhmedFaizGhazals } from './authors/faiz-ahmed-faiz';
import { hafezGhazals } from './authors/hafez';

// Main export using the new organized structure
export const allGhazals: Poem[] = allGhazalsByAuthor;

// Export individual collections for backward compatibility
export {
  mirzaGhalibGhazals,
  allamaIqbalGhazals,
  parveenShakirGhazals,
  faizAhmedFaizGhazals,
  hafezGhazals
};
