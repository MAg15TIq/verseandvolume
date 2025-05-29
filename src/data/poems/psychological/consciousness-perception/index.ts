import { Poem } from '@/types';

// Import individual poems
import { emilyDickinsonTellAllTheTruth } from './emily-dickinson-tell-all-the-truth';
import { wallaceStevensTheSnowMan } from './wallace-stevens-the-snow-man';
import { tsMooreTheMind } from './marianne-moore-the-mind';

// Export collection
export const consciousnessPerceptionPoems: Poem[] = [
  emilyDickinsonTellAllTheTruth,
  wallaceStevensTheSnowMan,
  tsMooreTheMind
];

// Export individual poems
export {
  emilyDickinsonTellAllTheTruth,
  wallaceStevensTheSnowMan,
  tsMooreTheMind
};
