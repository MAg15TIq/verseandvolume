import { Poem } from '@/types';

export const imNobodyPoem: Poem = {
  id: 'im-nobody-who-are-you',
  title: 'I\'m Nobody! Who are you?',
  author: 'Emily Dickinson',
  authorId: 'emily-dickinson',
  year: 1891,
  language: 'en',
  type: 'poem',
  content: [
    "I'm Nobody! Who are you?",
    "Are you – Nobody – Too?",
    "Then there's a pair of us!",
    "Don't tell! they'd advertise – you know!",
    "",
    "How dreary – to be – Somebody!",
    "How public – like a Frog –",
    "To tell one's name – the livelong June –",
    "To an admiring Bog!"
  ],
  themes: ['Identity', 'Fame', 'Privacy', 'Authenticity'],
  explanation: 'This poem explores the speaker\'s preference for anonymity over fame, suggesting that being "Nobody" is preferable to the public scrutiny that comes with being "Somebody."',
  hasAudio: false
};
