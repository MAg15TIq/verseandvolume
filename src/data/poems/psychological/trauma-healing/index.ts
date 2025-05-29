import { Poem } from '@/types';

// Import individual poems
import { mayaAngelouStillIRise } from './maya-angelou-still-i-rise';
import { adrienneRichTwentyOnePoems } from './adrienne-rich-twenty-one-poems';
import { joyHarjoRemember } from './joy-harjo-remember';

// Export collection
export const traumaHealingPoems: Poem[] = [
  mayaAngelouStillIRise,
  adrienneRichTwentyOnePoems,
  joyHarjoRemember
];

// Export individual poems
export {
  mayaAngelouStillIRise,
  adrienneRichTwentyOnePoems,
  joyHarjoRemember
};
