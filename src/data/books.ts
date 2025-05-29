import { Book } from '@/types';

// Import novels with full content from the new organized structure
import { allNovels, allUrduNovels, allLoveNovels } from './novels/authors';

// Import love stories
import { allLoveStories } from './stories/love-stories';

// Import prose pieces
import { allProse, allProseEnglish, allProseUrdu } from './prose/authors';

// Legacy books array for backward compatibility
const legacyBooks: Book[] = [
  {
    id: 'the-bell-jar',
    title: 'The Bell Jar',
    author: 'Sylvia Plath',
    authorId: 'sylvia-plath',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/The_Bell_Jar_%281st_US_edition_cover%29.jpg',
    publishYear: 1963,
    language: 'en',
    genre: ['Novel', 'Autobiography', 'Coming-of-age'],
    description: 'The Bell Jar is the only novel written by the American poet Sylvia Plath. Originally published under the pseudonym "Victoria Lucas" in 1963, the novel is semi-autobiographical with the names of places and people changed. The book is often regarded as a roman à clef because the protagonist\'s descent into mental illness parallels Plath\'s own experiences with what may have been clinical depression or bipolar II disorder.',
    audioUrl: '/audio/the-bell-jar-excerpt.mp3',
    hasAudio: true,
    excerpt: [
      "I knew something was wrong with me that summer, because all I could think about was the Rosenbergs and how stupid I'd been to buy all those uncomfortable, expensive clothes, hanging limp as fish in my closet, and how all the little successes I'd totted up so happily at college fizzled to nothing outside the slick marble and plate-glass fronts along Madison Avenue.",
      "",
      "I was supposed to be having the time of my life.",
      "",
      "I was supposed to be the envy of thousands of other college girls just like me all over America who wanted nothing more than to be tripping about in those same size seven patent leather shoes I'd bought in Bloomingdale's one lunch hour with a black patent leather belt and black patent leather pocket-book to match.",
      "",
      "And when my picture came out in the magazine the twelve of us were working on—drinking martinis in a skimpy, imitation silver-lamé bodice stuck on to a big, fat cloud of white tulle, on some Starlight Roof, in the company of several anonymous young men with all-American bone structures hired or loaned for the occasion—everybody would think I must be having a real whirl."
    ],
    pages: 244,
    isbn: '978-0-06-083702-1',
    awards: [
      'Pulitzer Prize for Poetry (posthumously, 1982)'
    ],
    rating: 4.2,
    reviews: [
      {
        author: 'Literary Times',
        text: 'A profound and disturbing work that continues to resonate with readers decades after its publication.',
        rating: 5
      },
      {
        author: 'Modern Novels Review',
        text: 'Plath\'s only novel remains a stark portrayal of mental illness and the pressures faced by young women.',
        rating: 4.5
      }
    ]
  },
  {
    id: 'the-kite-runner',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    authorId: 'khaled-hosseini',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/6/62/Kite_runner.jpg',
    publishYear: 2003,
    language: 'en',
    genre: ['Novel', 'Historical Fiction', 'Drama'],
    description: 'The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003, it tells the story of Amir, a young boy from Kabul, Afghanistan, and his journey from childhood to adulthood. The story is set against a backdrop of tumultuous events, from the fall of Afghanistan\'s monarchy through the Soviet invasion, the exodus of refugees to Pakistan and the United States, and the rise of the Taliban regime.',
    excerpt: [
      "I became what I am today at the age of twelve, on a frigid overcast day in the winter of 1975. I remember the precise moment, crouching behind a crumbling mud wall, peeking into the alley near the frozen creek. That was a long time ago, but it's wrong what they say about the past, I've learned, about how you can bury it. Because the past claws its way out.",
      "",
      "Looking back now, I realize I have been peeking into that deserted alley for the last twenty-six years.",
      "",
      "One day last summer, my friend Rahim Khan called from Pakistan. He asked me to come see him. Standing in the kitchen with the receiver to my ear, I knew it wasn't just Rahim Khan on the line. It was my past of unatoned sins.",
      "",
      "After I hung up, I went for a walk along Spreckels Lake on the northern edge of Golden Gate Park. The early-afternoon sun sparkled on the water where dozens of miniature boats sailed, propelled by a crisp breeze."
    ],
    pages: 371,
    isbn: '978-1-59463-193-1',
    awards: [
      'South African Boeke Prize (2004)',
      'Book Sense Book of the Year Award for Adult Fiction (2005)'
    ],
    rating: 4.3,
    reviews: [
      {
        author: 'The New York Times',
        text: 'A powerful book that incites both thought and feeling.',
        rating: 4.5
      },
      {
        author: 'The Washington Post',
        text: 'A beautiful novel... ranks among the best-written and most provocative stories of the year.',
        rating: 4.8
      }
    ]
  },
  {
    id: 'a-thousand-splendid-suns',
    title: 'A Thousand Splendid Suns',
    author: 'Khaled Hosseini',
    authorId: 'khaled-hosseini',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/0/0b/A_Thousand_Splendid_Suns.gif',
    publishYear: 2007,
    language: 'en',
    genre: ['Novel', 'Historical Fiction', 'Drama'],
    description: 'A Thousand Splendid Suns is a 2007 novel by Afghan-American author Khaled Hosseini, following the tremendous success of his bestselling 2003 debut The Kite Runner. It focuses on the tumultuous lives and relationship of Mariam and Laila, two Afghan women. Mariam, an illegitimate teenager from Herat, is forced to marry a shoemaker from Kabul after a family tragedy. Laila, born a generation later, lives a relatively privileged life, but their lives intersect when a similar tragedy forces her to accept a marriage proposal from Mariam\'s husband.',
    excerpt: [
      "Mariam was five years old the first time she heard the word harami.",
      "",
      "It happened on a Thursday. It must have, because Mariam remembered that she had been restless and preoccupied that day, the way she was only on Thursdays, the day when Jalil visited her at the kolba. To pass the time until the moment that she would see him at last, crossing the knee-high grass in the clearing and waving, Mariam had climbed a chair and taken down her mother's Chinese tea set. The tea set was the sole relic that Mariam's mother, Nana, had of her own mother, who had died when Nana was two.",
      "",
      "Mariam could never decide what to do with it. Should she use it as a centerpiece for the table, or should she display it on the shelf? In the end, Mariam had moved it from one spot to the other, now the table, now the shelf, at least twice a day.",
      "",
      "Nana had raised the girl and, on occasion, even lobbed a word or two of half-hearted praise her way. But Nana had been consumed by her own misery, absorbed by her own hardships, and, in the end, had little connection with Mariam, little warmth to offer her."
    ],
    pages: 432,
    isbn: '978-1-59448-950-1',
    awards: [
      'Book Sense Book of the Year Award for Adult Fiction (2008)',
      'Richard & Judy Best Read of the Year (2008)'
    ],
    rating: 4.4,
    reviews: [
      {
        author: 'Entertainment Weekly',
        text: 'Hosseini has the storytelling gift...a keen sense of the emotional terrain of human suffering.',
        rating: 4.7
      },
      {
        author: 'USA Today',
        text: 'Just as good, if not better, than Hosseini\'s best-selling first book, The Kite Runner.',
        rating: 4.5
      }
    ]
  },
  {
    id: 'raja-gidh',
    title: 'راجا گدھ',
    author: 'Bano Qudsia',
    authorId: 'bano-qudsia',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Raja_Gidh.jpg',
    publishYear: 1981,
    language: 'ur',
    genre: ['Novel', 'Psychological Fiction', 'Romance'],
    description: 'Raja Gidh is a Urdu novel written by Pakistani writer Bano Qudsia. It is considered one of the most influential novels in Urdu literature. The novel explores the themes of love, spirituality, and the human psyche through a complex narrative that interweaves multiple storylines.',
    excerpt: [
      "میں نے اپنی زندگی میں کبھی بھی کسی کو اتنا نہیں چاہا تھا جتنا میں نے سیمی کو چاہا۔ میں نے اس سے پہلے بھی محبت کی تھی، لیکن وہ محبت نہیں تھی، وہ صرف ایک جذبہ تھا، ایک احساس تھا، جو آیا اور چلا گیا۔",
      "",
      "لیکن سیمی کے ساتھ ایسا نہیں تھا۔ سیمی کے ساتھ میری محبت ایک ایسی چیز تھی جو میرے وجود کا حصہ بن گئی تھی۔ میں اس سے الگ نہیں ہو سکتا تھا، کیونکہ وہ میرے اندر بس گئی تھی۔",
      "",
      "میں نے اس سے کہا تھا کہ میں اس کے بغیر نہیں رہ سکتا، اور یہ سچ تھا۔ میں اس کے بغیر نہیں رہ سکتا تھا، لیکن مجھے رہنا پڑا۔ میں نے اس کے بغیر رہنا سیکھا، لیکن میں نے اسے بھولنا نہیں سیکھا۔",
      "",
      "اور اب، جب میں اس کے بارے میں سوچتا ہوں، تو مجھے لگتا ہے کہ شاید میں نے اسے کبھی بھی اتنا نہیں چاہا جتنا میں نے اس کی یاد کو چاہا ہے۔"
    ],
    pages: 690,
    isbn: '978-969-35-2518-7',
    awards: [
      'Adamjee Award'
    ],
    rating: 4.6,
    reviews: [
      {
        author: 'Daily Jang',
        text: 'بانو قدسیہ کا شاہکار ناول جو اردو ادب میں ایک اہم مقام رکھتا ہے۔',
        rating: 4.8
      },
      {
        author: 'Pakistan Literature Review',
        text: 'A masterpiece that explores the depths of human psychology and spirituality.',
        rating: 4.7
      }
    ]
  },
  {
    id: 'aag-ka-darya',
    title: 'آگ کا دریا',
    author: 'Qurratulain Hyder',
    authorId: 'qurratulain-hyder',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/8/8e/River_of_Fire_%28novel%29.jpg',
    publishYear: 1959,
    language: 'ur',
    genre: ['Novel', 'Historical Fiction', 'Epic'],
    description: 'Aag Ka Darya (River of Fire) is a landmark novel by Qurratulain Hyder, first published in Urdu in 1959. The novel spans over two thousand years of Indian history, from the 4th century BC to post-Independence India. It follows the lives of four characters—Gautam, Champa, Kamal, and Cyril—through their various incarnations across time.',
    excerpt: [
      "زمانہ بدل گیا، مذہب بدل گئے، تہذیبیں بدل گئیں، لیکن انسان نہیں بدلا۔ وہی محبت، وہی نفرت، وہی حسد، وہی لالچ، وہی خوف، وہی امید۔",
      "",
      "گوتم نے سوچا، 'کیا یہ سب کچھ پہلے بھی ہو چکا ہے؟ کیا میں پہلے بھی اس دنیا میں آ چکا ہوں؟ کیا میں پہلے بھی چمپا سے محبت کر چکا ہوں؟'",
      "",
      "اس نے آسمان کی طرف دیکھا۔ ستارے چمک رہے تھے، وہی ستارے جو ہزاروں سال پہلے بھی چمک رہے تھے، اور ہزاروں سال بعد بھی چمکتے رہیں گے۔",
      "",
      "زمانہ بدل گیا، مذہب بدل گئے، تہذیبیں بدل گئیں، لیکن آسمان نہیں بدلا، ستارے نہیں بدلے، اور انسان کا دل بھی نہیں بدلا۔"
    ],
    pages: 528,
    isbn: '978-0-8112-1713-7',
    awards: [
      'Jnanpith Award',
      'Sahitya Akademi Award'
    ],
    rating: 4.5,
    reviews: [
      {
        author: 'The Hindu',
        text: 'A monumental work that captures the essence of Indian history and culture.',
        rating: 4.6
      },
      {
        author: 'Dawn News',
        text: 'قرۃ العین حیدر کا یہ ناول اردو ادب کا ایک شاہکار ہے جو ہندوستان کی تاریخ اور ثقافت کو بیان کرتا ہے۔',
        rating: 4.7
      }
    ]
  },
  {
    id: 'peer-e-kamil',
    title: 'پیر کامل',
    author: 'Umera Ahmed',
    authorId: 'umera-ahmed',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Peer-e-Kamil.jpg',
    publishYear: 2004,
    language: 'ur',
    genre: ['Novel', 'Islamic Fiction', 'Romance'],
    description: 'Peer-e-Kamil is an Urdu novel written by Pakistani author Umera Ahmed. The novel deals with the journey of a young, intelligent student who transforms from being an atheist to a religious person. It explores themes of faith, love, and spiritual growth.',
    excerpt: [
      "میں نے اپنی زندگی میں کبھی بھی خدا کو نہیں مانا تھا۔ میرے لیے خدا ایک ایسا تصور تھا جسے انسان نے اپنے خوف کو دور کرنے کے لیے ایجاد کیا تھا۔",
      "",
      "میں نے ہمیشہ سوچا تھا کہ اگر خدا ہوتا تو دنیا میں اتنا ظلم، اتنی بے انصافی، اتنا درد کیوں ہوتا؟",
      "",
      "لیکن پھر میں نے اسے دیکھا، اور میری زندگی بدل گئی۔ میں نے پہلی بار محسوس کیا کہ خدا صرف ایک تصور نہیں، بلکہ ایک حقیقت ہے۔",
      "",
      "میں نے پہلی بار محسوس کیا کہ میری زندگی کا مقصد صرف پیسہ کمانا، شہرت حاصل کرنا، یا دنیا کی خوشیاں حاصل کرنا نہیں ہے۔ میری زندگی کا مقصد کچھ اور ہے، کچھ بہت بڑا، کچھ بہت اہم۔"
    ],
    pages: 670,
    isbn: '978-969-35-2520-0',
    awards: [
      'Best Urdu Novel Award (2005)'
    ],
    rating: 4.7,
    reviews: [
      {
        author: 'Express Tribune',
        text: 'A spiritual journey that resonates with readers of all backgrounds.',
        rating: 4.5
      },
      {
        author: 'Daily Pakistan',
        text: 'عمیرہ احمد کا یہ ناول ایک روحانی سفر ہے جو ہر قاری کے دل کو چھو لیتا ہے۔',
        rating: 4.9
      }
    ]
  },
  {
    id: 'shikwa-jawab-e-shikwa',
    title: 'شکوہ و جواب شکوہ',
    author: 'Allama Muhammad Iqbal',
    authorId: 'allama-iqbal',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Iqbal_in_Lahore.jpg/330px-Iqbal_in_Lahore.jpg',
    publishYear: 1909,
    language: 'ur',
    genre: ['Poetry', 'Philosophy', 'Religious'],
    description: 'Shikwa and Jawab-e-Shikwa are two poems by Allama Muhammad Iqbal, the poet-philosopher of British India. Shikwa (Complaint) was published in 1909, and Jawab-e-Shikwa (Response to the Complaint) in 1913. In Shikwa, the poet complains to Allah about the plight of Muslims, and in Jawab-e-Shikwa, Allah responds to the poet\'s complaint.',
    excerpt: {
      en: [
        "The stars gaze upon my sleeplessness,",
        "The morning breeze carries my sighs.",
        "I have a complaint against You, O Lord,",
        "Listen to my lament, if You will.",
        "",
        "We were the ones who spread Your name across the world,",
        "We were the ones who recited the Quran in every land.",
        "We were the ones who fought for Your religion,",
        "We were the ones who sacrificed our lives for Your cause.",
        "",
        "But now we are abandoned, forgotten,",
        "Our glory is gone, our power diminished.",
        "The world mocks us, ridicules us,",
        "While You remain silent, indifferent to our plight."
      ],
      ur: [
        "کیا تیرا دل میرے آہ سحر سے جل گیا",
        "میرے شکوے سے تیرا عرش برین ہل گیا",
        "",
        "تیری محفل میں یہ اندازِ شکایت کیسا",
        "بندہ ہو کر تیرے در پر یہ ادب بھول گیا",
        "",
        "ہم تو جب کعبہ و بتخانہ میں لڑ مر گئے",
        "تو نے اپنا یہ پرانا گھر آباد کیا",
        "",
        "ہم تو جب وادیِ فاراں میں پکارے گئے",
        "تو نے سینا پہ کسی اور کو آزاد کیا"
      ]
    },
    pages: 48,
    isbn: '978-969-35-2522-4',
    awards: [
      'Knighthood (1922)',
      'Doctorate from the University of Munich (1907)'
    ],
    rating: 4.9,
    reviews: [
      {
        author: 'Literary Critic',
        text: 'A masterpiece of Urdu poetry that continues to inspire generations.',
        rating: 5
      },
      {
        author: 'Islamic Studies Journal',
        text: 'Iqbal\'s philosophical depth and poetic brilliance shine in these twin poems.',
        rating: 4.8
      }
    ]
  },
  {
    id: 'crime-and-punishment',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    authorId: 'fyodor-dostoevsky',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png',
    publishYear: 1866,
    language: 'en',
    genre: ['Novel', 'Psychological Fiction', 'Philosophical Fiction'],
    description: 'Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It is the second of Dostoevsky\'s full-length novels following his return from ten years of exile in Siberia. Crime and Punishment focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money.',
    excerpt: [
      "On an exceptionally hot evening early in July a young man came out of the garret in which he lodged in S. Place and walked slowly, as though in hesitation, towards K. bridge.",
      "",
      "He had successfully avoided meeting his landlady on the staircase. His garret was under the roof of a high, five-storied house and was more like a cupboard than a room. The landlady who provided him with garret, dinners, and attendance, lived on the floor below, and every time he went out he was obliged to pass her kitchen, the door of which invariably stood open. And each time he passed, the young man had a sick, frightened feeling, which made him scowl and feel ashamed.",
      "",
      "He was hopelessly in debt to his landlady, and was afraid of meeting her. This was not because he was cowardly and abject, quite the contrary; but for some time past he had been in an overstrained irritable condition, verging on hypochondria. He had become so completely absorbed in himself, and isolated from his fellows that he dreaded meeting, not only his landlady, but anyone at all."
    ],
    pages: 671,
    isbn: '978-0-14-044913-6',
    awards: [
      'Considered one of the greatest novels ever written'
    ],
    rating: 4.8,
    reviews: [
      {
        author: 'The Guardian',
        text: 'A masterpiece that probes the darkest corners of the human psyche.',
        rating: 5
      },
      {
        author: 'The New York Review of Books',
        text: 'Dostoevsky\'s profound exploration of guilt, redemption, and the human condition remains unparalleled.',
        rating: 4.9
      }
    ]
  },
  {
    id: 'eugene-onegin',
    title: 'Eugene Onegin',
    author: 'Alexander Pushkin',
    authorId: 'alexander-pushkin',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Onegin_by_Repin.jpg/330px-Onegin_by_Repin.jpg',
    publishYear: 1833,
    language: 'en',
    genre: ['Novel in Verse', 'Poetry', 'Romance'],
    description: 'Eugene Onegin is a novel in verse written by Alexander Pushkin. It is a classic of Russian literature, and its eponymous protagonist has served as the model for a number of Russian literary heroes. It was published in serial form between 1825 and 1832. The first complete edition was published in 1833, and the currently accepted version is based on the 1837 publication. The novel is composed of 389 fourteen-line stanzas of iambic tetrameter with the unusual rhyme scheme "AbAbCCddEffEgg", where the uppercase letters represent feminine rhymes while the lowercase letters represent masculine rhymes.',
    excerpt: [
      "My uncle, man of firm convictions...",
      "By falling gravely ill, he's won",
      "A due respect for his afflictions,",
      "The only clever thing he's done.",
      "May his example profit others;",
      "But God, what deadly boredom, brothers,",
      "Sits by the bed of the poor wretch",
      "And never stirs to fetch or stretch!",
      "And what ignoble speculations:",
      "To entertain the half-alive,",
      "Adjust his pillows, moan, contrive",
      "To bring his medicine in libations,",
      "Sigh, and reflect with mournful air:",
      "'When will the devil take you, where?'"
    ],
    pages: 224,
    isbn: '978-0-19-953814-7',
    awards: [
      'Considered the masterpiece of Russian literature'
    ],
    rating: 4.7,
    reviews: [
      {
        author: 'The Times Literary Supplement',
        text: 'Pushkin\'s masterpiece combines narrative poetry, social commentary, and psychological insight.',
        rating: 4.8
      },
      {
        author: 'Russian Literature Review',
        text: 'The foundation stone of Russian literature, a work of unparalleled beauty and wit.',
        rating: 4.9
      }
    ]
  },
  {
    id: 'toba-tek-singh',
    title: 'Toba Tek Singh',
    author: 'Saadat Hasan Manto',
    authorId: 'saadat-hasan-manto',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Saadat_Hasan_Manto.jpg/330px-Saadat_Hasan_Manto.jpg',
    publishYear: 1955,
    language: 'ur',
    genre: ['Short Story', 'Satire', 'Partition Literature'],
    description: 'Toba Tek Singh is a short story written by Saadat Hasan Manto and published in 1955. It is set in a mental asylum in Lahore, where the inmates are to be transferred to India or Pakistan following the 1947 Partition. The story is a powerful satire on the absurdity of the Partition, and is considered one of Manto\'s finest works. The protagonist, Bishan Singh, is from a town called Toba Tek Singh and is adamant about not leaving his hometown.',
    excerpt: {
      en: [
        "Two or three years after Partition, it occurred to the governments of India and Pakistan that, like criminal offenders, lunatics too should be exchanged: that is, Muslim lunatics in Indian institutions should be sent to Pakistan, and Hindu and Sikh lunatics in Pakistani asylums should be handed over to India.",
        "",
        "Whether the decision made sense or not was incomprehensible to ordinary mortals, but it was clear enough to the high-level personnel responsible for the administration of the two countries. At any rate, the decision was made, and a date was fixed for the exchange. High-level conferences were held, and various issues concerning the transfer were discussed.",
        "",
        "On the day of the exchange, senior officials from the two sides arrived at the border with their respective lists to take charge of the lunatics. The transfer was to take place at the Wagah border crossing.",
        "",
        "It was a cold winter morning, quite chilly, when the lunatics from the Lahore asylum were brought to the border in buses under police escort."
      ],
      ur: [
        "تقسیم کے دو تین سال بعد، ہندوستان اور پاکستان کی حکومتوں کو خیال آیا کہ مجرموں کی طرح پاگلوں کا تبادلہ بھی کیا جائے، یعنی جو مسلمان پاگل ہندوستان کے پاگل خانوں میں ہیں، انہیں پاکستان پہنچا دیا جائے اور جو ہندو اور سکھ پاگل پاکستان کے پاگل خانوں میں ہیں، انہیں ہندوستان کے حوالے کر دیا جائے۔",
        "",
        "یہ فیصلہ معقول ہے یا غیر معقول، اس کی سمجھ عام آدمیوں کو نہیں آ سکتی تھی، لیکن دونوں ملکوں کے انتظامی اعلیٰ افسروں کو اس کی سمجھ آ گئی تھی۔ بہرحال، فیصلہ ہو گیا اور تبادلے کی تاریخ بھی مقرر ہو گئی۔ اعلیٰ سطح کے اجلاس ہوئے اور تبادلے سے متعلق مختلف مسائل پر بات چیت ہوئی۔",
        "",
        "تبادلے کے دن، دونوں طرف کے اعلیٰ افسر اپنی اپنی فہرستوں کے ساتھ سرحد پر پہنچے تاکہ پاگلوں کو اپنے اپنے حوالے کر سکیں۔ تبادلہ واہگہ بارڈر پر ہونا تھا۔",
        "",
        "سردیوں کی ایک ٹھنڈی صبح تھی، کافی سردی تھی، جب لاہور کے پاگل خانے کے پاگلوں کو پولیس کی نگرانی میں بسوں میں سرحد پر لایا گیا۔"
      ]
    },
    pages: 12,
    isbn: '978-0-14-310603-7',
    awards: [
      'Considered one of the greatest short stories about the Partition'
    ],
    rating: 4.9,
    reviews: [
      {
        author: 'The New York Times',
        text: 'Manto\'s masterpiece captures the absurdity and tragedy of Partition with unparalleled clarity.',
        rating: 5
      },
      {
        author: 'Dawn News',
        text: 'منٹو کی یہ کہانی تقسیم کی بے معنیت اور المیے کو بے مثال انداز میں پیش کرتی ہے۔',
        rating: 4.9
      }
    ]
  }
];

// Main export combining novels with full content and other books
export const books: Book[] = [
  // Include novels with full content first (both Urdu and English love novels)
  ...allNovels,
  // Include love stories
  ...allLoveStories,
  // Include prose pieces
  ...allProse,
  // Include other books (international literature, etc.)
  ...legacyBooks.filter(book =>
    !allNovels.some(novel => novel.id === book.id) &&
    !allLoveStories.some(story => story.id === book.id) &&
    !allProse.some(prose => prose.id === book.id)
  )
];

// Export specific collections for easy access
export { allNovels, allUrduNovels, allLoveNovels, allLoveStories, allProse, allProseEnglish, allProseUrdu };
