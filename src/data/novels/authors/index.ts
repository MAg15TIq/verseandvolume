import { Book } from '@/types';

// Import all novel collections
import { rajaGidhNovel } from './bano-qudsia/raja-gidh';
import { aagKaDaryaNovel } from './qurratulain-hyder/aag-ka-darya';
import { peerEKamilNovel } from './umera-ahmed/peer-e-kamil';

// Import love novels - English
import { theNotebookNovel } from './nicholas-sparks/the-notebook';
import { aWalkToRememberNovel } from './nicholas-sparks/a-walk-to-remember';
import { meBeforeYouNovel } from './jojo-moyes/me-before-you';
import { prideAndPrejudiceNovel } from './jane-austen/pride-and-prejudice';

// Import classic literature
import { crimeAndPunishmentNovel } from './fyodor-dostoevsky/crime-and-punishment';
import { aliceAdventuresInWonderlandNovel } from './lewis-carroll/alice-adventures-in-wonderland';

// Import new classic literature novels (commented out until files are created)
// import { nineteenEightyFourNovel } from './george-orwell/1984';
// import { toKillAMockingbirdNovel } from './harper-lee/to-kill-a-mockingbird';
// import { theGreatGatsbyNovel } from './f-scott-fitzgerald/the-great-gatsby';
// import { wutheringHeightsNovel } from './emily-bronte/wuthering-heights';
// import { thePictureOfDorianGrayNovel } from './oscar-wilde/the-picture-of-dorian-gray';

// Import contemporary fiction (to be created)
// import { theKiteRunnerNovel } from './khaled-hosseini/the-kite-runner';
// import { lifeOfPiNovel } from './yann-martel/life-of-pi';
// import { theAlchemistNovel } from './paulo-coelho/the-alchemist';

// Import additional Urdu literature (commented out until files are created)
// import { umraoJanAdaNovel } from './mirza-hadi-ruswa/umrao-jan-ada';
// import { tobaTekSinghNovel } from './saadat-hasan-manto/toba-tek-singh';

// Import modern romance (to be created)
// import { theTimeTravelersWifeNovel } from './audrey-niffenegger/the-time-travelers-wife';
// import { oneDayNovel } from './david-nicholls/one-day';

// Import love novels - Urdu (existing)
import { jannatKePattayNovel } from './nimra-ahmad/jannat-ke-pattay';
import { namalNovel } from './nimra-ahmad/namal';
import { humsafarNovel } from './farhat-ishtiaq/humsafar';
import { mushafNovel } from './nimra-ahmad/mushaf';

// Import new Urdu love novels
import { khudaAurMohabbatNovel } from './hashim-nadeem/khuda-aur-mohabbat';
import { paniDaRangNovel } from './hashim-nadeem/pani-da-rang';
import { bachpanKaDecemberNovel } from './hashim-nadeem/bachpan-ka-december';
import { roshanSitaraNovel } from './maha-malik/roshan-sitara';
import { haalimNovel } from './nimra-ahmad/haalim';
import { diyarEDilNovel } from './farhat-ishtiaq/diyar-e-dil';
import { mohabbatDaghKiSooratNovel } from './riffat-siraj/mohabbat-dagh-ki-soorat';

// Import additional novels
import {
  allAdditionalNovels,
  mohabbatKiRaahNovel,
  ishqEHaqeeqiNovel,
  dilKiDastanNovel,
  mohabbatKaImtihanNovel,
  ishqKiIntehaNovel,
  mohabbatKiJeetNovel,
  dilKiAwaazNovel,
  ishqKiManzilNovel,
  mohabbatKaQarzNovel,
  ishqKiKhushiNovel,
  mohabbatKiShaamNovel,
  dilKiRahatNovel,
  ishqKiSubahNovel,
  mohabbatKiRaatNovel,
  // New 15 novels (2024 addition)
  mohabbatKiKhwahishNovel,
  dilKiRanginiNovel,
  mohabbatKiManzilNewNovel,
  ishqKiKahaniNovel,
  dilKiDuaNovel,
  mohabbatKiSadagiNovel,
  ishqKiMehfilNovel,
  mohabbatKiTasveerNovel,
  ishqKiAwazNovel,
  mohabbatKiRoshnaiNovel,
  dilKiSadaNovel,
  mohabbatKiKhushbuNovel
} from './additional-novels';

// Import English love novels
import { allEnglishLoveNovels } from './english-love-novels';

// Import additional Urdu love novels
import { allAdditionalUrduLoveNovels } from './urdu-love-novels';

// Export individual novels
export {
  rajaGidhNovel,
  aagKaDaryaNovel,
  peerEKamilNovel,
  // English love novels
  theNotebookNovel,
  aWalkToRememberNovel,
  meBeforeYouNovel,
  prideAndPrejudiceNovel,
  // Classic literature
  crimeAndPunishmentNovel,
  aliceAdventuresInWonderlandNovel,
  // New classic literature novels (commented out until files are created)
  // nineteenEightyFourNovel,
  // toKillAMockingbirdNovel,
  // theGreatGatsbyNovel,
  // wutheringHeightsNovel,
  // thePictureOfDorianGrayNovel,
  // Contemporary fiction (to be created)
  // theKiteRunnerNovel,
  // lifeOfPiNovel,
  // theAlchemistNovel,
  // Additional Urdu literature (commented out until files are created)
  // umraoJanAdaNovel,
  // tobaTekSinghNovel,
  // Modern romance (to be created)
  // theTimeTravelersWifeNovel,
  // oneDayNovel,
  // Urdu love novels (existing)
  jannatKePattayNovel,
  namalNovel,
  humsafarNovel,
  mushafNovel,
  // New Urdu love novels
  khudaAurMohabbatNovel,
  paniDaRangNovel,
  bachpanKaDecemberNovel,
  roshanSitaraNovel,
  haalimNovel,
  diyarEDilNovel,
  mohabbatDaghKiSooratNovel,
  // Additional new novels
  mohabbatKiRaahNovel,
  ishqEHaqeeqiNovel,
  dilKiDastanNovel,
  mohabbatKaImtihanNovel,
  ishqKiIntehaNovel,
  mohabbatKiJeetNovel,
  dilKiAwaazNovel,
  ishqKiManzilNovel,
  mohabbatKaQarzNovel,
  ishqKiKhushiNovel,
  mohabbatKiShaamNovel,
  dilKiRahatNovel,
  ishqKiSubahNovel,
  mohabbatKiRaatNovel,
  // New 15 novels (2024 addition)
  mohabbatKiKhwahishNovel,
  dilKiRanginiNovel,
  mohabbatKiManzilNewNovel,
  ishqKiKahaniNovel,
  dilKiDuaNovel,
  mohabbatKiSadagiNovel,
  ishqKiMehfilNovel,
  mohabbatKiTasveerNovel,
  ishqKiAwazNovel,
  mohabbatKiRoshnaiNovel,
  dilKiSadaNovel,
  mohabbatKiKhushbuNovel
};

// Combined collection for all novels
export const allNovels: Book[] = [
  // Original novels
  rajaGidhNovel,
  aagKaDaryaNovel,
  peerEKamilNovel,
  // English love novels (existing)
  theNotebookNovel,
  aWalkToRememberNovel,
  meBeforeYouNovel,
  prideAndPrejudiceNovel,
  // New English love novels (30 additional)
  ...allEnglishLoveNovels,
  // Classic literature
  crimeAndPunishmentNovel,
  aliceAdventuresInWonderlandNovel,
  // New classic literature novels (commented out until files are created)
  // nineteenEightyFourNovel,
  // toKillAMockingbirdNovel,
  // theGreatGatsbyNovel,
  // wutheringHeightsNovel,
  // thePictureOfDorianGrayNovel,
  // Contemporary fiction (to be created)
  // theKiteRunnerNovel,
  // lifeOfPiNovel,
  // theAlchemistNovel,
  // Additional Urdu literature (commented out until files are created)
  // umraoJanAdaNovel,
  // tobaTekSinghNovel,
  // Modern romance (to be created)
  // theTimeTravelersWifeNovel,
  // oneDayNovel,
  // Urdu love novels (existing)
  jannatKePattayNovel,
  namalNovel,
  humsafarNovel,
  mushafNovel,
  // New Urdu love novels
  khudaAurMohabbatNovel,
  paniDaRangNovel,
  bachpanKaDecemberNovel,
  roshanSitaraNovel,
  haalimNovel,
  diyarEDilNovel,
  mohabbatDaghKiSooratNovel,
  // Additional Urdu love novels (15 new)
  ...allAdditionalUrduLoveNovels,
  // Additional novels
  ...allAdditionalNovels
];

// Combined collection for all Urdu novels (for backward compatibility)
export const allUrduNovels: Book[] = [
  rajaGidhNovel,
  aagKaDaryaNovel,
  peerEKamilNovel,
  jannatKePattayNovel,
  namalNovel,
  humsafarNovel,
  mushafNovel,
  // New Urdu love novels
  khudaAurMohabbatNovel,
  paniDaRangNovel,
  bachpanKaDecemberNovel,
  roshanSitaraNovel,
  haalimNovel,
  diyarEDilNovel,
  mohabbatDaghKiSooratNovel,
  // Additional Urdu love novels (15 new)
  ...allAdditionalUrduLoveNovels,
  // Additional novels (Urdu only)
  ...allAdditionalNovels
];

// Love novels collection
export const allLoveNovels: Book[] = [
  // English love novels (existing)
  theNotebookNovel,
  aWalkToRememberNovel,
  meBeforeYouNovel,
  prideAndPrejudiceNovel,
  // New English love novels (30 additional)
  ...allEnglishLoveNovels,
  // Urdu love novels (existing)
  jannatKePattayNovel,
  namalNovel,
  humsafarNovel,
  mushafNovel,
  // New Urdu love novels
  khudaAurMohabbatNovel,
  paniDaRangNovel,
  bachpanKaDecemberNovel,
  roshanSitaraNovel,
  haalimNovel,
  diyarEDilNovel,
  mohabbatDaghKiSooratNovel,
  // Additional Urdu love novels (15 new)
  ...allAdditionalUrduLoveNovels,
  // Additional love novels
  ...allAdditionalNovels
];
