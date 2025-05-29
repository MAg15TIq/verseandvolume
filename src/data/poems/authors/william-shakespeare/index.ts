import { Poem } from '@/types';

// Import individual sonnets
import { sonnet18 } from './sonnet-18';
import { sonnet29 } from './sonnet-29';
import { sonnet116 } from './sonnet-116';
import { sonnet130 } from './sonnet-130';

// Export individual sonnets
export {
  sonnet18,
  sonnet29,
  sonnet116,
  sonnet130
};

// Combined collection
export const williamShakespearePoems: Poem[] = [
  sonnet18,
  sonnet29,
  sonnet116,
  sonnet130
];
