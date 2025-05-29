import { Poem } from '@/types';

// Import individual poems
import { johnKeatsOdeToMelancholy } from './john-keats-ode-to-melancholy';
import { williamBlakeTheTyger } from './william-blake-the-tyger';

// Export collection
export const mentalIllnessRecoveryPoems: Poem[] = [
  johnKeatsOdeToMelancholy,
  williamBlakeTheTyger
];

// Export individual poems
export {
  johnKeatsOdeToMelancholy,
  williamBlakeTheTyger
};
