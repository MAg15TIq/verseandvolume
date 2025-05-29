import { Book } from '@/types';

// Import English prose authors
import { ralphWaldoEmersonProse } from './ralph-waldo-emerson';
import { henryDavidThoreauProse } from './henry-david-thoreau';
import { oscarWildeProse } from './oscar-wilde';
import { markTwainProse } from './mark-twain';
import { virginiaWoolfProse } from './virginia-woolf';
import { georgeOrwellProse } from './george-orwell';
import { jamesJoyceProse } from './james-joyce';

// Import Urdu prose authors
import { sadatHasanMantoProse } from './sadat-hasan-manto';
import { ashfaqAhmadProse } from './ashfaq-ahmad';
import { qurratulainHyderProse } from './qurratulain-hyder';
import { intezarHussainProse } from './intezar-hussain';
import { banoQudsiyaProse } from './bano-qudsia';
import { krishanChanderProse } from './krishan-chander';
import { ismatChughtaiProse } from './ismat-chughtai';

// Export individual author collections
export {
  // English prose authors
  ralphWaldoEmersonProse,
  henryDavidThoreauProse,
  oscarWildeProse,
  markTwainProse,
  virginiaWoolfProse,
  georgeOrwellProse,
  jamesJoyceProse,
  // Urdu prose authors
  sadatHasanMantoProse,
  ashfaqAhmadProse,
  qurratulainHyderProse,
  intezarHussainProse,
  banoQudsiyaProse,
  krishanChanderProse,
  ismatChughtaiProse
};

// Combined collections
export const allProseEnglish: Book[] = [
  ...ralphWaldoEmersonProse,
  ...henryDavidThoreauProse,
  ...oscarWildeProse,
  ...markTwainProse,
  ...virginiaWoolfProse,
  ...georgeOrwellProse,
  ...jamesJoyceProse
];

export const allProseUrdu: Book[] = [
  ...sadatHasanMantoProse,
  ...ashfaqAhmadProse,
  ...qurratulainHyderProse,
  ...intezarHussainProse,
  ...banoQudsiyaProse,
  ...krishanChanderProse,
  ...ismatChughtaiProse
];

export const allProse: Book[] = [
  ...allProseEnglish,
  ...allProseUrdu
];
