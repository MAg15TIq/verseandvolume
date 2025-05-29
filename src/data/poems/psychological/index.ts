import { Poem } from '@/types';

// Import psychological poetry by theme
import { depressionAnxietyPoems } from './depression-anxiety';
import { identitySelfDiscoveryPoems } from './identity-self-discovery';
import { traumaHealingPoems } from './trauma-healing';
import { consciousnessPerceptionPoems } from './consciousness-perception';
import { mentalIllnessRecoveryPoems } from './mental-illness-recovery';
import { emotionalProcessingPoems } from './emotional-processing';
import { psychologicalResiliencePoems } from './psychological-resilience';

// Combine all psychological poems
export const allPsychologicalPoems: Poem[] = [
  ...depressionAnxietyPoems,
  ...identitySelfDiscoveryPoems,
  ...traumaHealingPoems,
  ...consciousnessPerceptionPoems,
  ...mentalIllnessRecoveryPoems,
  ...emotionalProcessingPoems,
  ...psychologicalResiliencePoems
];

// Export individual theme collections
export {
  depressionAnxietyPoems,
  identitySelfDiscoveryPoems,
  traumaHealingPoems,
  consciousnessPerceptionPoems,
  mentalIllnessRecoveryPoems,
  emotionalProcessingPoems,
  psychologicalResiliencePoems
};
