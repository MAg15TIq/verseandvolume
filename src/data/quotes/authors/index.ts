import { Quote } from '@/types';

// Import all author quote collections
import { rumi_quotes } from './rumi';
import { shakespeare_quotes } from './shakespeare';
import { oscar_wilde_quotes } from './oscar-wilde';
import { maya_angelou_quotes } from './maya-angelou';
import { mark_twain_quotes } from './mark-twain';
import { albert_einstein_quotes } from './albert-einstein';
import { winston_churchill_quotes } from './winston-churchill';
import { mahatma_gandhi_quotes } from './mahatma-gandhi';
import { nelson_mandela_quotes } from './nelson-mandela';
import { martin_luther_king_quotes } from './martin-luther-king';
import { frida_kahlo_quotes } from './frida-kahlo';
import { steve_jobs_quotes } from './steve-jobs';
import { confucius_quotes } from './confucius';
import { khalil_gibran_quotes } from './khalil-gibran';
import { aristotle_quotes } from './aristotle';
import { virginia_woolf_quotes } from './virginia-woolf';
import { paulo_coelho_quotes } from './paulo-coelho';
import { lao_tzu_quotes } from './lao-tzu';
import { socrates_quotes } from './socrates';
import { plato_quotes } from './plato';
import { buddha_quotes } from './buddha';
import { leonardo_da_vinci_quotes } from './leonardo-da-vinci';
import { marie_curie_quotes } from './marie-curie';
import { rabindranath_tagore_quotes } from './rabindranath-tagore';
import { helen_keller_quotes } from './helen-keller';
import { marcus_aurelius_quotes } from './marcus-aurelius';
import { jane_austen_quotes } from './jane-austen';
import { victor_hugo_quotes } from './victor-hugo';
import { fyodor_dostoevsky_quotes } from './fyodor-dostoevsky';

// Import love quotes collections
import { love_quotes_classic } from './love-quotes-classic';
import { love_quotes_contemporary } from './love-quotes-contemporary';
import { love_quotes_multilingual } from './love-quotes-multilingual';

// Import additional diverse authors
import { walt_whitman_quotes } from './walt-whitman';
import { emily_dickinson_quotes } from './emily-dickinson';
import { pablo_neruda_quotes } from './pablo-neruda';
import { sylvia_plath_quotes } from './sylvia-plath';
import { langston_hughes_quotes } from './langston-hughes';
import { toni_morrison_quotes } from './toni-morrison';
import { james_baldwin_quotes } from './james-baldwin';
import { zora_neale_hurston_quotes } from './zora-neale-hurston';

// Export all collections
export {
  rumi_quotes,
  shakespeare_quotes,
  oscar_wilde_quotes,
  maya_angelou_quotes,
  mark_twain_quotes,
  albert_einstein_quotes,
  winston_churchill_quotes,
  mahatma_gandhi_quotes,
  nelson_mandela_quotes,
  martin_luther_king_quotes,
  frida_kahlo_quotes,
  steve_jobs_quotes,
  confucius_quotes,
  khalil_gibran_quotes,
  aristotle_quotes,
  virginia_woolf_quotes,
  paulo_coelho_quotes,
  lao_tzu_quotes,
  socrates_quotes,
  plato_quotes,
  buddha_quotes,
  leonardo_da_vinci_quotes,
  marie_curie_quotes,
  rabindranath_tagore_quotes,
  helen_keller_quotes,
  marcus_aurelius_quotes,
  jane_austen_quotes,
  victor_hugo_quotes,
  fyodor_dostoevsky_quotes,
  love_quotes_classic,
  love_quotes_contemporary,
  love_quotes_multilingual,
  walt_whitman_quotes,
  emily_dickinson_quotes,
  pablo_neruda_quotes,
  sylvia_plath_quotes,
  langston_hughes_quotes,
  toni_morrison_quotes,
  james_baldwin_quotes,
  zora_neale_hurston_quotes
};

// Combined collection
export const allQuotesByAuthor: Quote[] = [
  ...rumi_quotes,
  ...shakespeare_quotes,
  ...oscar_wilde_quotes,
  ...maya_angelou_quotes,
  ...mark_twain_quotes,
  ...albert_einstein_quotes,
  ...winston_churchill_quotes,
  ...mahatma_gandhi_quotes,
  ...nelson_mandela_quotes,
  ...martin_luther_king_quotes,
  ...frida_kahlo_quotes,
  ...steve_jobs_quotes,
  ...confucius_quotes,
  ...khalil_gibran_quotes,
  ...aristotle_quotes,
  ...virginia_woolf_quotes,
  ...paulo_coelho_quotes,
  ...lao_tzu_quotes,
  ...socrates_quotes,
  ...plato_quotes,
  ...buddha_quotes,
  ...leonardo_da_vinci_quotes,
  ...marie_curie_quotes,
  ...rabindranath_tagore_quotes,
  ...helen_keller_quotes,
  ...marcus_aurelius_quotes,
  ...jane_austen_quotes,
  ...victor_hugo_quotes,
  ...fyodor_dostoevsky_quotes,
  ...love_quotes_classic,
  ...love_quotes_contemporary,
  ...love_quotes_multilingual,
  ...walt_whitman_quotes,
  ...emily_dickinson_quotes,
  ...pablo_neruda_quotes,
  ...sylvia_plath_quotes,
  ...langston_hughes_quotes,
  ...toni_morrison_quotes,
  ...james_baldwin_quotes,
  ...zora_neale_hurston_quotes
];

