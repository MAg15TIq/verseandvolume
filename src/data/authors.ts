import { Author } from '@/types';

export const authors: Author[] = [
  {
    id: 'sylvia-plath',
    name: 'Sylvia Plath',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sylvia_Plath_1956.jpg/800px-Sylvia_Plath_1956.jpg',
    birthYear: 1932,
    deathYear: 1963,
    birthPlace: 'Boston, Massachusetts, USA',
    bio: 'Sylvia Plath was an American poet, novelist, and short story writer. She is credited with advancing the genre of confessional poetry and is best known for her two published collections, The Colossus and Other Poems and Ariel, as well as The Bell Jar, a semi-autobiographical novel published shortly before her death. Plath\'s work often dealt with themes of death, rebirth, and psychological trauma, drawing from her own struggles with depression and mental illness. Her intensely personal and emotionally charged poetry has made her one of the most studied and influential poets of the 20th century.',
    language: 'en',
    works: [
      {
        id: 'ariel',
        title: 'Ariel',
        year: 1965,
        type: 'poetry'
      },
      {
        id: 'the-colossus',
        title: 'The Colossus and Other Poems',
        year: 1960,
        type: 'poetry'
      },
      {
        id: 'the-bell-jar',
        title: 'The Bell Jar',
        year: 1963,
        type: 'prose'
      }
    ],
    quote: 'I shut my eyes and all the world drops dead; I lift my lids and all is born again.',
    achievements: [
      'Pulitzer Prize for Poetry (1982, posthumous)',
      'Fulbright Scholar at Cambridge University',
      'Pioneer of confessional poetry'
    ],
    influences: [
      'Emily Dickinson',
      'Robert Lowell',
      'Anne Sexton',
      'Theodore Roethke'
    ],
    timeline: [
      { year: 1932, event: 'Born in Boston, Massachusetts' },
      { year: 1950, event: 'Entered Smith College' },
      { year: 1953, event: 'First suicide attempt and hospitalization' },
      { year: 1955, event: 'Graduated summa cum laude from Smith College' },
      { year: 1956, event: 'Married Ted Hughes' },
      { year: 1960, event: 'Published "The Colossus and Other Poems"' },
      { year: 1962, event: 'Separated from Ted Hughes' },
      { year: 1963, event: 'Published "The Bell Jar" under pseudonym Victoria Lucas' },
      { year: 1963, event: 'Died by suicide in London at age 30' }
    ]
  },
  {
    id: 'alexander-pushkin',
    name: 'Alexander Pushkin',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kiprensky_Pushkin.jpg/800px-Kiprensky_Pushkin.jpg',
    birthYear: 1799,
    deathYear: 1837,
    birthPlace: 'Moscow, Russian Empire',
    bio: 'Alexander Sergeyevich Pushkin was a Russian poet, playwright, and novelist of the Romantic era. He is considered by many to be the greatest Russian poet and the founder of modern Russian literature. Pushkin was born into Russian nobility in Moscow. His father, Sergey Lvovich Pushkin, was descended from a distinguished family of the Russian nobility. Pushkin published his first poem at the age of 15, and was widely recognized by the literary establishment by the time of his graduation from the Tsarskoye Selo Lyceum. Pushkin\'s work is characterized by its exceptional beauty of language and its acceptance of aristocratic values. His writings, which draw heavily on his own experiences and the drama of his short and tragic life, encompass a wide range of political, historical, and amorous themes. He died in a duel defending his wife\'s honor at the age of 37.',
    language: 'en',
    works: [
      {
        id: 'eugene-onegin',
        title: 'Eugene Onegin',
        year: 1833,
        type: 'poetry'
      },
      {
        id: 'the-bronze-horseman',
        title: 'The Bronze Horseman',
        year: 1837,
        type: 'poetry'
      },
      {
        id: 'ruslan-and-ludmila',
        title: 'Ruslan and Ludmila',
        year: 1820,
        type: 'poetry'
      },
      {
        id: 'the-captains-daughter',
        title: 'The Captain\'s Daughter',
        year: 1836,
        type: 'prose'
      },
      {
        id: 'the-queen-of-spades',
        title: 'The Queen of Spades',
        year: 1834,
        type: 'prose'
      }
    ],
    quote: 'Inspiration is needed in geometry, just as much as in poetry.',
    achievements: [
      'Considered the founder of modern Russian literature',
      'His works have been translated into all major languages',
      'Commemorated with numerous monuments throughout Russia',
      'The Pushkin Prize and the Pushkin Medal were established in his honor'
    ],
    influences: [
      'Lord Byron',
      'Voltaire',
      'Shakespeare',
      'Russian folklore',
      'European Romanticism'
    ],
    timeline: [
      { year: 1799, event: 'Born in Moscow, Russian Empire' },
      { year: 1811, event: 'Entered the Imperial Lyceum at Tsarskoye Selo' },
      { year: 1817, event: 'Graduated from the Lyceum and began working in the Collegium of Foreign Affairs' },
      { year: 1820, event: 'Published his first long poem "Ruslan and Ludmila"' },
      { year: 1820, event: 'Exiled to the south of Russia due to his political poems' },
      { year: 1824, event: 'Dismissed from government service and exiled to his mother\'s estate' },
      { year: 1826, event: 'Pardoned by Tsar Nicholas I' },
      { year: 1831, event: 'Married Natalia Goncharova' },
      { year: 1833, event: 'Completed "Eugene Onegin"' },
      { year: 1837, event: 'Mortally wounded in a duel with Georges d\'Anthès' },
      { year: 1837, event: 'Died in St. Petersburg at the age of 37' }
    ]
  },
  {
    id: 'emily-dickinson',
    name: 'Emily Dickinson',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Black-white_photograph_of_Emily_Dickinson2.png/800px-Black-white_photograph_of_Emily_Dickinson2.png',
    imageAlt: 'Portrait of Emily Dickinson, American poet',
    imageSources: {
      thumbnail: '/images/authors/emily-dickinson-thumb.jpg',
      medium: '/images/authors/emily-dickinson-medium.jpg',
      large: '/images/authors/emily-dickinson-large.jpg'
    },
    birthYear: 1830,
    deathYear: 1886,
    birthPlace: 'Amherst, Massachusetts, USA',
    bio: 'Emily Dickinson was an American poet who lived a largely introverted life. Though virtually unknown during her lifetime, she is now considered one of the most important figures in American poetry. Dickinson was born in Amherst, Massachusetts, into a prominent family with strong ties to its community. After studying at the Amherst Academy for seven years in her youth, she briefly attended the Mount Holyoke Female Seminary before returning to her family\'s house in Amherst. Evidence suggests that Dickinson lived much of her life in isolation. Considered an eccentric by locals, she developed a penchant for white clothing and was known for her reluctance to greet guests or, later in life, to even leave her bedroom. Dickinson never married, and most friendships between her and others depended entirely upon correspondence. While Dickinson was a prolific poet, fewer than a dozen of her nearly 1,800 poems were published during her lifetime. The poems published then were usually altered significantly by the publishers to fit conventional poetic rules. Her poems were unique in her era; they contain short lines, typically lack titles, and often use slant rhyme as well as unconventional capitalization and punctuation. Many of her poems deal with themes of death and immortality, two recurring topics in letters to her friends.',
    language: 'en',
    works: [
      {
        id: 'hope-is-the-thing-with-feathers',
        title: 'Hope is the thing with feathers',
        type: 'poetry'
      },
      {
        id: 'because-i-could-not-stop-for-death',
        title: 'Because I could not stop for Death',
        year: 1863,
        type: 'poetry'
      },
      {
        id: 'i-heard-a-fly-buzz',
        title: 'I heard a Fly buzz—when I died',
        year: 1862,
        type: 'poetry'
      },
      {
        id: 'success-is-counted-sweetest',
        title: 'Success is counted sweetest',
        year: 1859,
        type: 'poetry'
      },
      {
        id: 'collected-poems',
        title: 'The Complete Poems of Emily Dickinson',
        year: 1890,
        type: 'poetry'
      }
    ],
    quote: 'Forever is composed of nows.',
    achievements: [
      'Recognized as one of America\'s greatest poets',
      'Published collection of poems edited by Thomas H. Johnson (1955)',
      'Inducted into the National Women\'s Hall of Fame'
    ],
    influences: [
      'Ralph Waldo Emerson',
      'William Shakespeare',
      'The Bible',
      'Elizabeth Barrett Browning'
    ],
    timeline: [
      { year: 1830, event: 'Born in Amherst, Massachusetts' },
      { year: 1840, event: 'Began attending Amherst Academy' },
      { year: 1847, event: 'Attended Mount Holyoke Female Seminary' },
      { year: 1848, event: 'Left Mount Holyoke after one year' },
      { year: 1855, event: 'Traveled to Washington D.C. and Philadelphia' },
      { year: 1858, event: 'Began organizing her poems into hand-bound booklets (fascicles)' },
      { year: 1862, event: 'Most productive period of writing, producing nearly 800 poems' },
      { year: 1864, event: 'Consulted with a Boston physician for eye problems' },
      { year: 1874, event: 'Father Edward Dickinson died' },
      { year: 1875, event: 'Mother suffered a stroke that left her paralyzed' },
      { year: 1882, event: 'Judge Otis Lord (a close friend and possible romantic interest) died' },
      { year: 1884, event: 'Became ill with kidney disease' },
      { year: 1886, event: 'Died in Amherst at age 55' },
      { year: 1890, event: 'First collection of poems published posthumously' }
    ]
  },
  {
    id: 'mirza-ghalib',
    name: 'Mirza Ghalib',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mirza_Ghalib_Mirza_Asadullah_Baig_Khan.jpg/800px-Mirza_Ghalib_Mirza_Asadullah_Baig_Khan.jpg',
    birthYear: 1797,
    deathYear: 1869,
    birthPlace: 'Agra, Mughal Empire (present-day India)',
    bio: 'Mirza Asadullah Baig Khan, known by his pen name Ghalib, was a prominent Urdu and Persian poet during the last years of the Mughal Empire. He is considered one of the most popular and influential poets of the Urdu language. Today, Ghalib remains popular not only in India and Pakistan but also among the Hindustani diaspora around the world. Ghalib was born in Agra, into a family descended from Aibak Turks who moved to Samarkand after the downfall of the Seljuk kings. His paternal grandfather, Mirza Qoqan Baig Khan, was a Seljuq Turk who had immigrated to India from Samarkand during the reign of Ahmad Shah. He worked at Lahore, Delhi and Jaipur, was awarded the subdistrict of Pahasu and finally settled in Agra. He had four sons and three daughters. Mirza Abdullah Baig Khan and Mirza Nasrullah Baig Khan were two of his sons. Ghalib\'s father, Mirza Abdullah Baig Khan, married Izzat-ut-Nisa Begum, and then lived at the house of his father-in-law. He was employed first by the Nawab of Lucknow and then the Nizam of Hyderabad, Deccan. Mirza Abdullah Baig Khan died in a battle in 1803 in Alwar and was buried at Rajgarh (Alwar, Rajasthan). At the age of thirteen, Ghalib married Umrao Begum, daughter of Nawab Ilahi Bakhsh. He soon moved to Delhi, along with his younger brother, Mirza Yousuf Khan, who had developed schizophrenia at a young age and later died in Delhi during the chaos of 1857.',
    language: 'ur',
    works: [
      {
        id: 'divan-e-ghalib',
        title: 'Divan-e-Ghalib',
        year: 1841,
        type: 'poetry'
      },
      {
        id: 'gul-e-rana',
        title: 'Gul-e-Rana',
        type: 'poetry'
      },
      {
        id: 'nala-e-umeed',
        title: 'Nala-e-Umeed',
        type: 'poetry'
      },
      {
        id: 'qate-e-burhan',
        title: 'Qate-e-Burhan',
        year: 1865,
        type: 'prose'
      },
      {
        id: 'urdu-e-mualla',
        title: 'Urdu-e-Mualla',
        type: 'prose'
      }
    ],
    quote: 'ہم کو معلوم ہے جنت کی حقیقت لیکن\nدل کے خوش رکھنے کو غالب یہ خیال اچھا ہے',
    achievements: [
      'Royal historian of the Mughal court',
      'Received title of "Dabir-ul-Mulk" from Bahadur Shah Zafar',
      'Awarded the title of "Najm-ud-daula"'
    ],
    influences: [
      'Bedil',
      'Mir Taqi Mir',
      'Persian poets of the classical era',
      'Sufi philosophy'
    ],
    timeline: [
      { year: 1797, event: 'Born in Agra, India' },
      { year: 1803, event: 'Father died in battle in Alwar' },
      { year: 1810, event: 'Married Umrao Begum at the age of 13' },
      { year: 1812, event: 'Moved to Delhi' },
      { year: 1821, event: 'Began composing poetry in Urdu (previously wrote in Persian)' },
      { year: 1828, event: 'Started receiving a pension from the British East India Company' },
      { year: 1841, event: 'Published his first collection of Urdu ghazals' },
      { year: 1850, event: 'Appointed as the royal historian of the Mughal court' },
      { year: 1854, event: 'Received title of "Dabir-ul-Mulk" from Emperor Bahadur Shah Zafar' },
      { year: 1857, event: 'Witnessed the Indian Rebellion and fall of Mughal Delhi' },
      { year: 1858, event: 'Pension restored by the British government' },
      { year: 1865, event: 'Published "Qate-e-Burhan", a critical work on Urdu language' },
      { year: 1869, event: 'Died in Delhi' }
    ]
  },
  {
    id: 'parveen-shakir',
    name: 'Parveen Shakir',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Parveen_Shakir.jpg/330px-Parveen_Shakir.jpg',
    birthYear: 1952,
    deathYear: 1994,
    birthPlace: 'Karachi, Pakistan',
    bio: 'Parveen Shakir was a Pakistani poet, teacher and a civil servant. She is best known for her works that used the feminine perspective in Urdu poetry, which had traditionally been dominated by masculine expressions. She is considered one of the greatest modern Urdu poets of the late 20th century. Shakir started writing at an early age and published her first volume of poetry, Khushbu (Fragrance), to great acclaim in 1976. She subsequently published other volumes of poetry including Sad-barg (Marsh Marigold), Khud Kalami (Talking to Oneself), Inkaar (Denial), Kaf-e-Aina (The Edge of the Mirror), and Mah-e-Tamam (Full Moon). Shakir employed mainly two forms of poetry: ghazal and free verse. She was a prominent voice in contemporary Urdu literature, known for her use of pop culture references and distinctly feminine perspective. She died in a car accident in 1994 at the age of 42.',
    language: 'ur',
    works: [
      {
        id: 'khushbu',
        title: 'Khushbu (Fragrance)',
        year: 1976,
        type: 'poetry'
      },
      {
        id: 'sad-barg',
        title: 'Sad-barg (Marsh Marigold)',
        year: 1980,
        type: 'poetry'
      },
      {
        id: 'khud-kalami',
        title: 'Khud Kalami (Talking to Oneself)',
        year: 1985,
        type: 'poetry'
      },
      {
        id: 'inkaar',
        title: 'Inkaar (Denial)',
        year: 1990,
        type: 'poetry'
      },
      {
        id: 'mah-e-tamam',
        title: 'Mah-e-Tamam (Full Moon)',
        year: 1994,
        type: 'poetry'
      }
    ],
    quote: 'وہ تو خوشبو ہے، ہوائوں میں بکھر جائے گا',
    achievements: [
      'Pride of Performance Award by the President of Pakistan (1990)',
      'Adamjee Literary Award',
      'Parveen Shakir Urdu Literature Festival established in her honor',
      'Postage stamp issued by Pakistan Post to honor her contributions to Urdu literature'
    ],
    influences: [
      'Mirza Ghalib',
      'Faiz Ahmed Faiz',
      'John Keats',
      'Feminist movements',
      'Modern Urdu poetry'
    ],
    timeline: [
      { year: 1952, event: 'Born in Karachi, Pakistan' },
      { year: 1972, event: 'Completed MA in English Literature from Karachi University' },
      { year: 1976, event: 'Published first poetry collection "Khushbu" (Fragrance)' },
      { year: 1976, event: 'Joined the Civil Service of Pakistan' },
      { year: 1978, event: 'Completed MA in Linguistics from Karachi University' },
      { year: 1980, event: 'Published "Sad-barg" (Marsh Marigold)' },
      { year: 1982, event: 'Married Naseer Ali, a doctor (later divorced)' },
      { year: 1983, event: 'Gave birth to her son, Syed Murad Ali' },
      { year: 1985, event: 'Published "Khud Kalami" (Talking to Oneself)' },
      { year: 1986, event: 'Received PhD in Bank Administration' },
      { year: 1990, event: 'Published "Inkaar" (Denial)' },
      { year: 1990, event: 'Awarded Pride of Performance by the President of Pakistan' },
      { year: 1994, event: 'Published "Kaf-e-Aina" (The Edge of the Mirror)' },
      { year: 1994, event: 'Died in a car accident in Islamabad at the age of 42' },
      { year: 1994, event: '"Mah-e-Tamam" (Full Moon) published posthumously' }
    ]
  },
  {
    id: 'faiz-ahmad-faiz',
    name: 'Faiz Ahmad Faiz',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Faiz_Ahmed_Faiz_1976.jpg/800px-Faiz_Ahmed_Faiz_1976.jpg',
    birthYear: 1911,
    deathYear: 1984,
    birthPlace: 'Sialkot, Punjab, British India (now Pakistan)',
    bio: 'Faiz Ahmad Faiz was a Pakistani poet, and author in Urdu and Punjabi languages. He was one of the most celebrated writers of the Urdu language, having been nominated four times for the Nobel Prize for literature. Faiz was a member of the Anjuman Tarraqi Pasand Mussanafin-e-Hind (All India Progressive Writers\' Movement) and an avowed Marxist. Listed four times for the Nobel Prize for literature, he received the Lenin Peace Prize by the Soviet Union in 1962. Despite being repeatedly accused of atheism by the political and military establishment, Faiz\'s poetry suggested his complicated relationship with religion in general and Islam in particular. He was, in fact, greatly inspired by both secular poetry and South Asia\'s Sufi traditions. His popular ghazal "Hum Dekhenge" is an example of how he fused these traditions to create a more syncretic and universal poetic voice. The poem was set to music and sung by Iqbal Bano and was used as an anthem in the 1986 Movement for the Restoration of Democracy against Zia ul Haq\'s military dictatorship in Pakistan.',
    language: 'ur',
    works: [
      {
        id: 'naqsh-e-faryadi',
        title: 'Naqsh-e-Faryadi',
        year: 1943,
        type: 'poetry'
      },
      {
        id: 'dast-e-saba',
        title: 'Dast-e-Saba',
        year: 1952,
        type: 'poetry'
      },
      {
        id: 'zindan-nama',
        title: 'Zindan Nama',
        year: 1956,
        type: 'poetry'
      },
      {
        id: 'dast-e-tah-e-sang',
        title: 'Dast-e-Tah-e-Sang',
        year: 1965,
        type: 'poetry'
      },
      {
        id: 'hum-dekhenge',
        title: 'Hum Dekhenge',
        year: 1979,
        type: 'poetry'
      }
    ],
    quote: 'مجھ سے پہلی سی محبت میرے محبوب نہ مانگ',
    achievements: [
      'Lenin Peace Prize (1962)',
      'Nominated four times for the Nobel Prize for Literature',
      'Nishan-e-Imtiaz (highest literary honor of Pakistan) awarded posthumously',
      'Editor of The Pakistan Times newspaper'
    ],
    influences: [
      'Allama Iqbal',
      'Mirza Ghalib',
      'Karl Marx',
      'Progressive Writers\' Movement'
    ],
    timeline: [
      { year: 1911, event: 'Born in Sialkot, Punjab, British India' },
      { year: 1935, event: 'Completed MA in English from Government College, Lahore' },
      { year: 1936, event: 'Became a lecturer at M.A.O. College in Amritsar' },
      { year: 1940, event: 'Joined the British Indian Army as a captain' },
      { year: 1941, event: 'Married Alys George, a British national' },
      { year: 1943, event: 'Published first poetry collection "Naqsh-e-Faryadi"' },
      { year: 1947, event: 'Became editor of The Pakistan Times after Partition' },
      { year: 1951, event: 'Arrested for involvement in the Rawalpindi Conspiracy Case' },
      { year: 1955, event: 'Released from prison' },
      { year: 1962, event: 'Awarded the Lenin Peace Prize' },
      { year: 1964, event: 'Appointed as Secretary of the Arts Council of Pakistan' },
      { year: 1972, event: 'Became principal of Abdullah Haroon College in Karachi' },
      { year: 1974, event: 'Worked as editor of the magazine "Lotus" in Moscow' },
      { year: 1979, event: 'Wrote "Hum Dekhenge" during Zia ul-Haq\'s martial law' },
      { year: 1984, event: 'Died in Lahore, Pakistan' }
    ]
  },
  {
    id: 'allama-iqbal',
    name: 'Allama Iqbal',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Allama_Iqbal.jpg/800px-Allama_Iqbal.jpg',
    birthYear: 1877,
    deathYear: 1938,
    birthPlace: 'Sialkot, Punjab, British India (now Pakistan)',
    bio: 'Sir Muhammad Iqbal, widely known as Allama Iqbal, was a poet, philosopher, and politician in British India who is widely regarded as having inspired the Pakistan Movement. He is considered one of the most important figures in Urdu literature, with literary work in both Urdu and Persian. Iqbal is admired as a prominent poet by Indians, Pakistanis, Iranians and other international scholars of literature. Though Iqbal is best known as an eminent poet, he is also a highly acclaimed "Muslim philosophical thinker of modern times". His first poetry book, The Secrets of the Self, appeared in Persian in 1915, and other books of poetry include The Secrets of Selflessness, Message from the East and Persian Psalms. Amongst these, his best known Urdu works are The Call of the Marching Bell, Gabriel\'s Wing, The Rod of Moses and a part of Gift from Hijaz. Along with his Urdu and Persian poetry, his Urdu and English lectures and letters have been very influential in cultural, social, religious and political disputes.',
    language: 'both',
    works: [
      {
        id: 'asrar-e-khudi',
        title: 'Asrar-e-Khudi (The Secrets of the Self)',
        year: 1915,
        type: 'poetry'
      },
      {
        id: 'rumuz-e-bekhudi',
        title: 'Rumuz-e-Bekhudi (The Secrets of Selflessness)',
        year: 1917,
        type: 'poetry'
      },
      {
        id: 'bang-e-dara',
        title: 'Bang-e-Dara (The Call of the Marching Bell)',
        year: 1924,
        type: 'poetry'
      },
      {
        id: 'bal-e-jibril',
        title: 'Bal-e-Jibril (Gabriel\'s Wing)',
        year: 1935,
        type: 'poetry'
      },
      {
        id: 'zarb-e-kalim',
        title: 'Zarb-e-Kalim (The Rod of Moses)',
        year: 1936,
        type: 'poetry'
      },
      {
        id: 'reconstruction-of-religious-thought',
        title: 'The Reconstruction of Religious Thought in Islam',
        year: 1930,
        type: 'prose'
      }
    ],
    quote: 'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے',
    achievements: [
      'Knighthood (1922)',
      'Elected to Punjab Legislative Council (1926)',
      'Presided over All India Muslim League session (1930)',
      'Presented idea of separate Muslim state in his Allahabad Address (1930)'
    ],
    influences: [
      'Rumi',
      'Goethe',
      'Nietzsche',
      'Western philosophy',
      'Islamic mysticism'
    ],
    timeline: [
      { year: 1877, event: 'Born in Sialkot, Punjab, British India' },
      { year: 1895, event: 'Graduated from Scotch Mission College in Sialkot' },
      { year: 1897, event: 'Received MA in Philosophy from Government College Lahore' },
      { year: 1905, event: 'Traveled to Europe for higher studies' },
      { year: 1907, event: 'Obtained PhD from Munich University, Germany' },
      { year: 1908, event: 'Returned to India and began practicing law' },
      { year: 1915, event: 'Published "Asrar-e-Khudi" (The Secrets of the Self)' },
      { year: 1922, event: 'Knighted by King George V' },
      { year: 1926, event: 'Elected to Punjab Legislative Council' },
      { year: 1930, event: 'Delivered famous Allahabad Address proposing separate Muslim state' },
      { year: 1931, event: 'Attended Round Table Conference in London' },
      { year: 1932, event: 'Published "Javid Nama", inspired by Dante\'s Divine Comedy' },
      { year: 1938, event: 'Died in Lahore' }
    ]
  },
  {
    id: 'robert-frost',
    name: 'Robert Frost',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Robert_Frost_NYWTS.jpg/800px-Robert_Frost_NYWTS.jpg',
    birthYear: 1874,
    deathYear: 1963,
    birthPlace: 'San Francisco, California, USA',
    bio: 'Robert Lee Frost was an American poet. His work was initially published in England before it was published in the United States. Known for his realistic depictions of rural life and his command of American colloquial speech, Frost frequently wrote about settings from rural life in New England in the early 20th century, using them to examine complex social and philosophical themes. Frost was honored frequently during his lifetime and is the only poet to receive four Pulitzer Prizes for Poetry. He became one of America\'s rare "public literary figures, almost an artistic institution." He was awarded the Congressional Gold Medal in 1960 for his poetic works. On July 22, 1961, Frost was named poet laureate of Vermont.',
    language: 'en',
    works: [
      {
        id: 'the-road-not-taken',
        title: 'The Road Not Taken',
        year: 1916,
        type: 'poetry'
      },
      {
        id: 'stopping-by-woods',
        title: 'Stopping by Woods on a Snowy Evening',
        year: 1923,
        type: 'poetry'
      },
      {
        id: 'fire-and-ice',
        title: 'Fire and Ice',
        year: 1920,
        type: 'poetry'
      },
      {
        id: 'north-of-boston',
        title: 'North of Boston',
        year: 1914,
        type: 'poetry'
      },
      {
        id: 'a-boys-will',
        title: 'A Boy\'s Will',
        year: 1913,
        type: 'poetry'
      }
    ],
    quote: 'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
    achievements: [
      'Four-time Pulitzer Prize winner (1924, 1931, 1937, 1943)',
      'Congressional Gold Medal (1960)',
      'Poet Laureate of Vermont (1961)',
      'Performed at President John F. Kennedy\'s inauguration (1961)'
    ],
    influences: [
      'William Shakespeare',
      'William Wordsworth',
      'Ralph Waldo Emerson',
      'Henry David Thoreau'
    ],
    timeline: [
      { year: 1874, event: 'Born in San Francisco, California' },
      { year: 1885, event: 'Moved to Lawrence, Massachusetts after father\'s death' },
      { year: 1892, event: 'Graduated from Lawrence High School' },
      { year: 1895, event: 'Married Elinor White' },
      { year: 1897, event: 'Attended Harvard University (did not graduate)' },
      { year: 1900, event: 'Moved to a farm in Derry, New Hampshire' },
      { year: 1912, event: 'Moved to England with his family' },
      { year: 1913, event: 'Published first poetry collection "A Boy\'s Will"' },
      { year: 1915, event: 'Returned to the United States' },
      { year: 1916, event: 'Published "The Road Not Taken" in Mountain Interval' },
      { year: 1924, event: 'Won first Pulitzer Prize for "New Hampshire"' },
      { year: 1940, event: 'Published "A Witness Tree"' },
      { year: 1961, event: 'Recited "The Gift Outright" at President Kennedy\'s inauguration' },
      { year: 1963, event: 'Died in Boston, Massachusetts' }
    ]
  },
  {
    id: 'fyodor-dostoevsky',
    name: 'Fyodor Dostoevsky',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Vasily_Perov_-_Портрет_Ф.М.Достоевского_-_Google_Art_Project.jpg/800px-Vasily_Perov_-_Портрет_Ф.М.Достоевского_-_Google_Art_Project.jpg',
    birthYear: 1821,
    deathYear: 1881,
    birthPlace: 'Moscow, Russian Empire',
    bio: 'Fyodor Mikhailovich Dostoevsky was a Russian novelist, short story writer, essayist, and journalist. Dostoevsky\'s literary works explore human psychology in the troubled political, social, and spiritual atmospheres of 19th-century Russia, and engage with a variety of philosophical and religious themes. His most acclaimed novels include Crime and Punishment (1866), The Idiot (1869), Demons (1872), and The Brothers Karamazov (1880). Dostoevsky\'s body of work consists of 12 novels, four novellas, 16 short stories, and numerous other works. Many literary critics rate him as one of the greatest novelists in all of world literature, as his works are often acknowledged as among the most influential novels of the 19th century.',
    language: 'en',
    works: [
      {
        id: 'crime-and-punishment',
        title: 'Crime and Punishment',
        year: 1866,
        type: 'prose'
      },
      {
        id: 'the-brothers-karamazov',
        title: 'The Brothers Karamazov',
        year: 1880,
        type: 'prose'
      },
      {
        id: 'the-idiot',
        title: 'The Idiot',
        year: 1869,
        type: 'prose'
      },
      {
        id: 'demons',
        title: 'Demons',
        year: 1872,
        type: 'prose'
      },
      {
        id: 'notes-from-underground',
        title: 'Notes from Underground',
        year: 1864,
        type: 'prose'
      }
    ],
    quote: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
    achievements: [
      'Considered one of the greatest novelists in world literature',
      'Pioneer of psychological realism',
      'Profound influence on 20th-century literature and philosophy',
      'Works translated into over 170 languages'
    ],
    influences: [
      'Nikolai Gogol',
      'Charles Dickens',
      'Honoré de Balzac',
      'Christian theology',
      'Russian Orthodox spirituality'
    ],
    timeline: [
      { year: 1821, event: 'Born in Moscow, Russian Empire' },
      { year: 1837, event: 'Mother died of tuberculosis' },
      { year: 1838, event: 'Father died under mysterious circumstances' },
      { year: 1843, event: 'Graduated from the Military Engineering Institute' },
      { year: 1846, event: 'Published first novel "Poor Folk"' },
      { year: 1849, event: 'Arrested for involvement in the Petrashevsky Circle' },
      { year: 1849, event: 'Sentenced to death, later commuted to hard labor in Siberia' },
      { year: 1854, event: 'Released from prison camp' },
      { year: 1859, event: 'Returned to St. Petersburg' },
      { year: 1866, event: 'Published "Crime and Punishment"' },
      { year: 1867, event: 'Married Anna Grigoryevna Snitkina' },
      { year: 1869, event: 'Published "The Idiot"' },
      { year: 1872, event: 'Published "Demons"' },
      { year: 1880, event: 'Published "The Brothers Karamazov"' },
      { year: 1881, event: 'Died in St. Petersburg at age 59' }
    ]
  },
  {
    id: 'sylvia-plath',
    name: 'Sylvia Plath',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sylvia_Plath.jpg/800px-Sylvia_Plath.jpg',
    birthYear: 1932,
    deathYear: 1963,
    birthPlace: 'Boston, Massachusetts, USA',
    bio: 'Sylvia Plath was an American poet, novelist, and short-story writer. She is credited with advancing the genre of confessional poetry and is best known for two of her published collections, The Colossus and Other Poems (1960) and Ariel (1965), as well as The Bell Jar, a semi-autobiographical novel published shortly before her death in 1963. Born in Boston, Massachusetts, Plath studied at Smith College in Massachusetts and at Newnham College in Cambridge, England. She married fellow poet Ted Hughes in 1956, and they lived together in the United States and then in England. They had two children before separating in 1962. Plath was clinically depressed for most of her adult life, and was treated multiple times with electroconvulsive therapy (ECT). She died by suicide in 1963. Plath is the first poet to win a Pulitzer Prize posthumously, for The Collected Poems (published in 1981).',
    language: 'en',
    works: [
      {
        id: 'the-bell-jar',
        title: 'The Bell Jar',
        year: 1963,
        type: 'prose'
      },
      {
        id: 'ariel',
        title: 'Ariel',
        year: 1965,
        type: 'poetry'
      },
      {
        id: 'the-colossus',
        title: 'The Colossus and Other Poems',
        year: 1960,
        type: 'poetry'
      },
      {
        id: 'crossing-the-water',
        title: 'Crossing the Water',
        year: 1971,
        type: 'poetry'
      },
      {
        id: 'johnny-panic',
        title: 'Johnny Panic and the Bible of Dreams',
        year: 1977,
        type: 'prose'
      }
    ],
    quote: 'I took a deep breath and listened to the old brag of my heart: I am, I am, I am.',
    achievements: [
      'Fulbright Scholar at Cambridge University',
      'Pulitzer Prize for Poetry (posthumously, 1982)',
      'Glascock Prize from Mount Holyoke College (1955)',
      'First-place prize in the Mademoiselle fiction contest (1952)'
    ],
    influences: [
      'Anne Sexton',
      'W.B. Yeats',
      'Virginia Woolf',
      'James Joyce'
    ],
    timeline: [
      { year: 1932, event: 'Born in Boston, Massachusetts' },
      { year: 1940, event: 'Father died, an event that deeply affected her' },
      { year: 1950, event: 'Began studies at Smith College' },
      { year: 1952, event: 'Won Mademoiselle fiction contest and guest edited the magazine' },
      { year: 1953, event: 'First suicide attempt; received electroconvulsive therapy' },
      { year: 1955, event: 'Graduated summa cum laude from Smith College' },
      { year: 1956, event: 'Met and married Ted Hughes in Cambridge' },
      { year: 1957, event: 'Taught at Smith College' },
      { year: 1960, event: 'Published first poetry collection "The Colossus"' },
      { year: 1960, event: 'Gave birth to first child, Frieda' },
      { year: 1962, event: 'Gave birth to second child, Nicholas; separated from Hughes' },
      { year: 1963, event: 'Published "The Bell Jar" under pseudonym Victoria Lucas' },
      { year: 1963, event: 'Died by suicide in London' },
      { year: 1965, event: '"Ariel" published posthumously' },
      { year: 1982, event: 'Awarded Pulitzer Prize posthumously for "The Collected Poems"' }
    ]
  },
  {
    id: 'khaled-hosseini',
    name: 'Khaled Hosseini',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Khaled_Hosseini_2007.jpg/330px-Khaled_Hosseini_2007.jpg',
    birthYear: 1965,
    birthPlace: 'Kabul, Afghanistan',
    bio: 'Khaled Hosseini is an Afghan-American novelist and physician. After graduating from college, he worked as a doctor in California, a situation he likened to "an arranged marriage." He has published three novels, most notably his 2003 debut "The Kite Runner", all of which are at least partially set in Afghanistan and feature an Afghan as the protagonist. Following the success of "The Kite Runner", he retired from medicine to write full-time. Hosseini was born in Kabul, Afghanistan. His father worked as a diplomat, and when Hosseini was 11 years old, the family moved to France; four years later, they applied for asylum in the United States, where he later became a citizen.',
    language: 'en',
    works: [
      {
        id: 'the-kite-runner',
        title: 'The Kite Runner',
        year: 2003,
        type: 'prose'
      },
      {
        id: 'a-thousand-splendid-suns',
        title: 'A Thousand Splendid Suns',
        year: 2007,
        type: 'prose'
      },
      {
        id: 'and-the-mountains-echoed',
        title: 'And the Mountains Echoed',
        year: 2013,
        type: 'prose'
      },
      {
        id: 'sea-prayer',
        title: 'Sea Prayer',
        year: 2018,
        type: 'prose'
      }
    ],
    quote: 'It\'s wrong what they say about the past, I\'ve learned, about how you can bury it. Because the past claws its way out.',
    achievements: [
      'Goodreads Choice Award for Fiction (2007)',
      'Book Sense Book of the Year Award for Adult Fiction (2005)',
      'South African Boeke Prize (2004)',
      'UNHCR Goodwill Ambassador'
    ],
    influences: [
      'Persian poetry',
      'Afghan history and culture',
      'Fyodor Dostoevsky',
      'John Steinbeck'
    ],
    timeline: [
      { year: 1965, event: 'Born in Kabul, Afghanistan' },
      { year: 1976, event: 'Family relocated to Paris, France' },
      { year: 1980, event: 'Family sought political asylum in the United States' },
      { year: 1984, event: 'Graduated from high school in San Jose, California' },
      { year: 1988, event: 'Received bachelor\'s degree in biology from Santa Clara University' },
      { year: 1993, event: 'Earned medical degree from University of California, San Diego' },
      { year: 1996, event: 'Started practicing internal medicine' },
      { year: 2003, event: 'Published debut novel "The Kite Runner"' },
      { year: 2006, event: 'Established The Khaled Hosseini Foundation to provide humanitarian assistance to Afghanistan' },
      { year: 2007, event: 'Published second novel "A Thousand Splendid Suns"' },
      { year: 2013, event: 'Published third novel "And the Mountains Echoed"' },
      { year: 2018, event: 'Published illustrated book "Sea Prayer"' }
    ]
  },
  {
    id: 'bano-qudsia',
    name: 'Bano Qudsia',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Bano_Qudsia.jpg/330px-Bano_Qudsia.jpg',
    birthYear: 1928,
    deathYear: 2017,
    birthPlace: 'Firozpur, Punjab, British India (now India)',
    bio: 'Bano Qudsia, also known as Bano Aapa, was a Pakistani novelist, playwright and spiritualist. She wrote literature in Urdu, producing novels, dramas and short stories. Qudsia is best recognized for her novel Raja Gidh. She also wrote for television and stage in both Urdu and Punjabi languages. Her play Aadhi Baat has been called "a classic". She was married to writer Ashfaq Ahmed.',
    language: 'ur',
    works: [
      {
        id: 'raja-gidh',
        title: 'Raja Gidh',
        year: 1981,
        type: 'prose'
      },
      {
        id: 'aatish-e-zair-e-paa',
        title: 'Aatish-e-Zair-e-Paa',
        type: 'prose'
      },
      {
        id: 'aadhi-baat',
        title: 'Aadhi Baat',
        type: 'prose'
      },
      {
        id: 'footpath-ki-ghaas',
        title: 'Footpath ki Ghaas',
        type: 'prose'
      },
      {
        id: 'hasil',
        title: 'Hasil',
        type: 'prose'
      }
    ],
    quote: 'محبت انسان کو انسان بناتی ہے، حیوان نہیں۔',
    achievements: [
      'Sitara-e-Imtiaz (Star of Excellence) by the Government of Pakistan',
      'Kamal-e-Fun Award (2010)',
      'Hilal-e-Imtiaz (Crescent of Excellence) by the Government of Pakistan'
    ],
    influences: [
      'Sufism',
      'Ashfaq Ahmed',
      'Qurratulain Hyder',
      'Pakistani culture and traditions'
    ],
    timeline: [
      { year: 1928, event: 'Born in Firozpur, Punjab, British India' },
      { year: 1947, event: 'Migrated to Pakistan after Partition' },
      { year: 1951, event: 'Graduated from Government College Lahore' },
      { year: 1956, event: 'Married writer Ashfaq Ahmed' },
      { year: 1960, event: 'Started writing for radio and television' },
      { year: 1981, event: 'Published her masterpiece novel "Raja Gidh"' },
      { year: 1983, event: 'Wrote the play "Aadhi Baat"' },
      { year: 2000, event: 'Received Sitara-e-Imtiaz' },
      { year: 2010, event: 'Awarded Kamal-e-Fun Award for lifetime achievement in literature' },
      { year: 2012, event: 'Received Hilal-e-Imtiaz' },
      { year: 2017, event: 'Passed away in Lahore, Pakistan' }
    ]
  },
  {
    id: 'qurratulain-hyder',
    name: 'Qurratulain Hyder',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Qurratulain_Hyder.jpg/330px-Qurratulain_Hyder.jpg',
    birthYear: 1927,
    deathYear: 2007,
    birthPlace: 'Aligarh, United Provinces, British India (now India)',
    bio: 'Qurratulain Hyder was an influential Indian Urdu novelist and short story writer, an academic, and a journalist. One of the most outstanding literary names in Urdu literature, she is best known for her magnum opus, Aag Ka Darya (River of Fire), a novel first published in Urdu in 1959, that stretches from the 4th century BC to post-Partition India. Hyder was the recipient of the Sahitya Akademi Award, Jnanpith Award and Padma Bhushan by the Government of India for her contribution to Urdu literature.',
    language: 'ur',
    works: [
      {
        id: 'aag-ka-darya',
        title: 'Aag Ka Darya (River of Fire)',
        year: 1959,
        type: 'prose'
      },
      {
        id: 'mere-bhi-sanam-khane',
        title: 'Mere Bhi Sanamkhane',
        year: 1949,
        type: 'prose'
      },
      {
        id: 'safina-e-gham-e-dil',
        title: 'Safina-e-Gham-e-Dil',
        year: 1952,
        type: 'prose'
      },
      {
        id: 'patjhar-ki-awaz',
        title: 'Patjhar Ki Awaz (The Sound of Falling Leaves)',
        year: 1965,
        type: 'prose'
      },
      {
        id: 'kar-e-jahan-daraz-hai',
        title: 'Kar-e-Jahan Daraz Hai',
        year: 1981,
        type: 'prose'
      }
    ],
    quote: 'زمانہ بدل گیا، مذہب بدل گئے، تہذیبیں بدل گئیں، لیکن انسان نہیں بدلا۔',
    achievements: [
      'Jnanpith Award (1989)',
      'Sahitya Akademi Award (1967)',
      'Padma Shri (1984)',
      'Padma Bhushan (2005)',
      'Soviet Land Nehru Award'
    ],
    influences: [
      'James Joyce',
      'Virginia Woolf',
      'Marcel Proust',
      'Indian history and culture',
      'Progressive Writers\' Movement'
    ],
    timeline: [
      { year: 1927, event: 'Born in Aligarh, United Provinces, British India' },
      { year: 1947, event: 'Migrated to Pakistan after Partition' },
      { year: 1949, event: 'Published her first novel "Mere Bhi Sanamkhane"' },
      { year: 1950, event: 'Returned to India' },
      { year: 1959, event: 'Published her magnum opus "Aag Ka Darya" (River of Fire)' },
      { year: 1961, event: 'Worked as a journalist in London' },
      { year: 1967, event: 'Received Sahitya Akademi Award' },
      { year: 1979, event: 'Became a professor at the Jamia Millia Islamia University in Delhi' },
      { year: 1989, event: 'Awarded the prestigious Jnanpith Award' },
      { year: 2005, event: 'Received Padma Bhushan' },
      { year: 2007, event: 'Passed away in Noida, India' }
    ]
  },
  {
    id: 'umera-ahmed',
    name: 'Umera Ahmed',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Umera_Ahmed.jpg/330px-Umera_Ahmed.jpg',
    birthYear: 1976,
    birthPlace: 'Sialkot, Punjab, Pakistan',
    bio: 'Umera Ahmed is a Pakistani author and screenwriter, who has written several novels and television scripts in Urdu. She is best known for her novel Peer-e-Kamil, which has been widely acclaimed and has a large readership. Many of her novels have been adapted for television dramas in Pakistan. Her writings often explore themes of spirituality, faith, and moral dilemmas in contemporary society.',
    language: 'ur',
    works: [
      {
        id: 'peer-e-kamil',
        title: 'Peer-e-Kamil',
        year: 2004,
        type: 'prose'
      },
      {
        id: 'meri-zaat-zarra-e-benishan',
        title: 'Meri Zaat Zarra-e-Benishan',
        year: 2007,
        type: 'prose'
      },
      {
        id: 'shehr-e-zaat',
        title: 'Shehr-e-Zaat',
        year: 2012,
        type: 'prose'
      },
      {
        id: 'man-o-salwa',
        title: 'Man-o-Salwa',
        year: 2010,
        type: 'prose'
      },
      {
        id: 'aab-e-hayat',
        title: 'Aab-e-Hayat',
        year: 2014,
        type: 'prose'
      }
    ],
    quote: 'انسان کی زندگی میں سب سے بڑی کامیابی اس کا اپنے رب کو پہچاننا ہے۔',
    achievements: [
      'Best Writer Award at Lux Style Awards',
      'Best Writer Award at Hum TV Awards',
      'Pride of Performance Award by the Government of Pakistan'
    ],
    influences: [
      'Islamic teachings',
      'Ashfaq Ahmed',
      'Bano Qudsia',
      'Contemporary social issues'
    ],
    timeline: [
      { year: 1976, event: 'Born in Sialkot, Punjab, Pakistan' },
      { year: 1998, event: 'Started writing as a hobby' },
      { year: 2000, event: 'First story published in a magazine' },
      { year: 2004, event: 'Published "Peer-e-Kamil", which became a bestseller' },
      { year: 2007, event: 'Published "Meri Zaat Zarra-e-Benishan"' },
      { year: 2008, event: 'Her novel adapted as a television drama for the first time' },
      { year: 2010, event: 'Established her own publishing house' },
      { year: 2012, event: 'Published "Shehr-e-Zaat", later adapted as a successful TV drama' },
      { year: 2014, event: 'Published "Aab-e-Hayat", sequel to "Peer-e-Kamil"' },
      { year: 2018, event: 'Received Pride of Performance Award' }
    ]
  },
  {
    id: 'anna-akhmatova',
    name: 'Anna Akhmatova',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Anna_Akhmatova_1922.jpg/800px-Anna_Akhmatova_1922.jpg',
    birthYear: 1889,
    deathYear: 1966,
    birthPlace: 'Odessa, Russian Empire (now Ukraine)',
    bio: 'Anna Andreyevna Gorenko, better known by the pen name Anna Akhmatova, was one of Russia\'s most acclaimed poets and arguably the greatest woman poet in Russian literature. Her work ranges from short lyric poems to intricately structured cycles, such as Requiem (1935–40), her tragic masterpiece about the Stalinist terror. Her style, characterized by its economy and emotional restraint, was strikingly original and distinctive to her contemporaries. She was shortlisted for the Nobel Prize in 1965 and received second-most nominations for the award the following year. Her first husband, Nikolay Gumilyov, was executed by the Soviet secret police, and her son Lev Gumilyov and her common-law husband Nikolay Punin spent many years in the Gulag, all for essentially political reasons. Her perennial themes include meditations on time and memory, and the difficulties of living and writing in the shadow of Stalinism.',
    language: 'en',
    works: [
      {
        id: 'requiem',
        title: 'Requiem',
        year: 1940,
        type: 'poetry'
      },
      {
        id: 'poem-without-a-hero',
        title: 'Poem Without a Hero',
        year: 1962,
        type: 'poetry'
      },
      {
        id: 'evening',
        title: 'Evening',
        year: 1912,
        type: 'poetry'
      },
      {
        id: 'white-flock',
        title: 'White Flock',
        year: 1917,
        type: 'poetry'
      },
      {
        id: 'anno-domini-mcmxxi',
        title: 'Anno Domini MCMXXI',
        year: 1922,
        type: 'poetry'
      }
    ],
    quote: 'You will hear thunder and remember me, and think: she wanted storms.',
    achievements: [
      'Nominated for the Nobel Prize in Literature',
      'Awarded the Etna-Taormina prize (1964)',
      'Awarded honorary doctorate from Oxford University (1965)',
      'Recognized as one of the most significant Russian poets of the 20th century'
    ],
    influences: [
      'Alexander Pushkin',
      'Fyodor Dostoevsky',
      'Russian Orthodox tradition',
      'Classical mythology',
      'Russian Symbolism'
    ],
    timeline: [
      { year: 1889, event: 'Born in Odessa, Russian Empire' },
      { year: 1910, event: 'Married poet Nikolay Gumilyov' },
      { year: 1912, event: 'Published her first collection "Evening"' },
      { year: 1914, event: 'Published "Rosary", which brought her wide acclaim' },
      { year: 1918, event: 'Divorced Nikolay Gumilyov' },
      { year: 1921, event: 'Former husband Nikolay Gumilyov executed by the Bolshevik secret police' },
      { year: 1922, event: 'Published "Anno Domini MCMXXI"' },
      { year: 1925, event: 'Her poetry was banned from publication in the Soviet Union' },
      { year: 1935, event: 'Son Lev Gumilyov arrested and imprisoned' },
      { year: 1938, event: 'Began writing "Requiem" in response to Stalinist purges' },
      { year: 1941, event: 'Evacuated to Tashkent during the Siege of Leningrad' },
      { year: 1946, event: 'Expelled from the Union of Soviet Writers' },
      { year: 1951, event: 'Partially rehabilitated after Stalin\'s death' },
      { year: 1965, event: 'Received honorary doctorate from Oxford University' },
      { year: 1966, event: 'Died in Domodedovo, near Moscow' }
    ]
  },
  {
    id: 'saadat-hasan-manto',
    name: 'Saadat Hasan Manto',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Saadat_Hasan_Manto.jpg/330px-Saadat_Hasan_Manto.jpg',
    birthYear: 1912,
    deathYear: 1955,
    birthPlace: 'Samrala, Punjab, British India (now India)',
    bio: 'Saadat Hasan Manto was a Pakistani writer, playwright and author considered among the greatest writers of short stories in South Asian history. He produced 22 collections of short stories, a novel, five series of radio plays, three collections of essays, and two collections of personal sketches. His best short stories are held in high esteem by writers and critics. Manto was known to write about taboos of society including prostitution, sexuality, and the human condition during the Partition of India. His stories like "Toba Tek Singh" and "Khol Do" (Open It) are considered masterpieces of Urdu literature. In his short life, he faced legal troubles due to obscenity charges on his writings, and struggled with alcoholism, which eventually led to his death at the age of 42 from cirrhosis of the liver.',
    language: 'ur',
    works: [
      {
        id: 'toba-tek-singh',
        title: 'Toba Tek Singh',
        year: 1955,
        type: 'prose'
      },
      {
        id: 'khol-do',
        title: 'Khol Do (Open It)',
        year: 1948,
        type: 'prose'
      },
      {
        id: 'thanda-gosht',
        title: 'Thanda Gosht (Cold Meat)',
        year: 1950,
        type: 'prose'
      },
      {
        id: 'boo',
        title: 'Boo (Odor)',
        year: 1945,
        type: 'prose'
      },
      {
        id: 'kali-shalwar',
        title: 'Kali Shalwar (Black Pants)',
        year: 1941,
        type: 'prose'
      }
    ],
    quote: 'If you find my stories dirty, the society you are living in is dirty. With my stories, I only expose the truth.',
    achievements: [
      'Nishan-e-Imtiaz (Order of Excellence) awarded posthumously by the Government of Pakistan',
      'Considered one of the greatest short story writers in the Urdu language',
      'His works have been translated into over 18 languages worldwide',
      'Subject of numerous films, plays, and television adaptations'
    ],
    influences: [
      'Guy de Maupassant',
      'Anton Chekhov',
      'Oscar Wilde',
      'Partition of India',
      'Social realism'
    ],
    timeline: [
      { year: 1912, event: 'Born in Samrala, Punjab, British India' },
      { year: 1933, event: 'Met writer and mentor Abdul Bari Alig in Lahore' },
      { year: 1934, event: 'Published his first Urdu translation of Victor Hugo\'s "The Last Days of a Condemned Man"' },
      { year: 1936, event: 'Joined the editorial staff of Masawat, a daily newspaper' },
      { year: 1941, event: 'Moved to Bombay and wrote for film industry' },
      { year: 1947, event: 'Migrated to Pakistan after Partition' },
      { year: 1948, event: 'Faced first obscenity trial for his story "Thanda Gosht"' },
      { year: 1950, event: 'Faced multiple obscenity charges for his writings' },
      { year: 1952, event: 'Published "Siyah Hashiye" (Black Margins), sketches about Partition violence' },
      { year: 1954, event: 'Health deteriorated due to alcoholism' },
      { year: 1955, event: 'Died in Lahore, Pakistan at the age of 42' },
      { year: 1955, event: 'Published "Toba Tek Singh", one of his most famous stories, posthumously' }
    ]
  },
  {
    id: 'fyodor-dostoevsky',
    name: 'Fyodor Dostoevsky',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Vasily_Perov_-_Портрет_Ф.М.Достоевского_-_Google_Art_Project.jpg/800px-Vasily_Perov_-_Портрет_Ф.М.Достоевского_-_Google_Art_Project.jpg',
    birthYear: 1821,
    deathYear: 1881,
    birthPlace: 'Moscow, Russian Empire',
    bio: 'Fyodor Mikhailovich Dostoevsky was a Russian novelist, philosopher, short story writer, essayist, and journalist. His literary works explore human psychology in the troubled political, social, and spiritual atmospheres of 19th-century Russia, and engage with a variety of philosophical and religious themes. His most acclaimed novels include Crime and Punishment (1866), The Idiot (1869), Demons (1872), and The Brothers Karamazov (1880). Dostoevsky\'s body of work consists of 12 novels, four novellas, 16 short stories, and numerous other works. Many literary critics rate him as one of the greatest psychological novelists in world literature. His 1864 novella Notes from Underground is considered to be one of the first works of existentialist literature.',
    language: 'en',
    works: [
      {
        id: 'crime-and-punishment',
        title: 'Crime and Punishment',
        year: 1866,
        type: 'prose'
      },
      {
        id: 'the-brothers-karamazov',
        title: 'The Brothers Karamazov',
        year: 1880,
        type: 'prose'
      },
      {
        id: 'the-idiot',
        title: 'The Idiot',
        year: 1869,
        type: 'prose'
      },
      {
        id: 'demons',
        title: 'Demons',
        year: 1872,
        type: 'prose'
      },
      {
        id: 'notes-from-underground',
        title: 'Notes from Underground',
        year: 1864,
        type: 'prose'
      }
    ],
    quote: 'The mystery of human existence lies not in just staying alive, but in finding something to live for.',
    achievements: [
      'Considered one of the greatest novelists of all time',
      'Pioneer of existentialism and psychological realism in literature',
      'His works have been translated into more than 170 languages',
      'Profound influence on world literature, philosophy, and psychology'
    ],
    influences: [
      'Alexander Pushkin',
      'Nikolai Gogol',
      'Victor Hugo',
      'Charles Dickens',
      'Orthodox Christianity'
    ],
    timeline: [
      { year: 1821, event: 'Born in Moscow, Russian Empire' },
      { year: 1837, event: 'Mother died; sent to military engineering school in St. Petersburg' },
      { year: 1839, event: 'Father murdered by his own serfs' },
      { year: 1846, event: 'Published first novel "Poor Folk"' },
      { year: 1849, event: 'Arrested for involvement with the Petrashevsky Circle' },
      { year: 1849, event: 'Sentenced to death, reprieved at the last minute' },
      { year: 1850, event: 'Exiled to Siberia for four years of hard labor' },
      { year: 1854, event: 'Released from prison camp but forced to serve in the Siberian Army' },
      { year: 1859, event: 'Allowed to return to European Russia' },
      { year: 1861, event: 'Started literary journal "Time" with his brother Mikhail' },
      { year: 1864, event: 'Published "Notes from Underground"' },
      { year: 1866, event: 'Published "Crime and Punishment"' },
      { year: 1867, event: 'Married Anna Snitkina, his stenographer' },
      { year: 1880, event: 'Completed "The Brothers Karamazov"' },
      { year: 1881, event: 'Died in St. Petersburg at the age of 59' }
    ]
  },
  {
    id: 'rainer-maria-rilke',
    name: 'Rainer Maria Rilke',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Rilke_1900.jpg/800px-Rilke_1900.jpg',
    birthYear: 1875,
    deathYear: 1926,
    birthPlace: 'Prague, Bohemia, Austria-Hungary (now Czech Republic)',
    bio: 'Rainer Maria Rilke was a Bohemian-Austrian poet and novelist. He is widely recognized as one of the most lyrically intense German-language poets. His writings include one novel, several collections of poetry, and several volumes of correspondence. His best-known works include the poetry collections "Duino Elegies" and "Sonnets to Orpheus," the semi-autobiographical novel "The Notebooks of Malte Laurids Brigge," and a collection of ten letters published after his death under the title "Letters to a Young Poet." Rilke\'s poetic style was highly introspective and engaged deeply with questions of beauty, suffering, solitude, and the profound challenges of connecting with others. His work has influenced generations of poets, and he is frequently ranked as one of the most significant poets of the early 20th century.',
    language: 'en',
    works: [
      {
        id: 'duino-elegies',
        title: 'Duino Elegies',
        year: 1923,
        type: 'poetry'
      },
      {
        id: 'sonnets-to-orpheus',
        title: 'Sonnets to Orpheus',
        year: 1923,
        type: 'poetry'
      },
      {
        id: 'the-book-of-hours',
        title: 'The Book of Hours',
        year: 1905,
        type: 'poetry'
      },
      {
        id: 'the-notebooks-of-malte-laurids-brigge',
        title: 'The Notebooks of Malte Laurids Brigge',
        year: 1910,
        type: 'prose'
      },
      {
        id: 'letters-to-a-young-poet',
        title: 'Letters to a Young Poet',
        year: 1929,
        type: 'prose'
      }
    ],
    quote: 'The only journey is the one within.',
    achievements: [
      'Considered one of the most significant poets in the German language',
      'His work has been translated into numerous languages',
      'Influenced generations of poets and writers',
      'Developed a unique style that bridged traditional and modernist poetry'
    ],
    influences: [
      'Auguste Rodin',
      'Lou Andreas-Salomé',
      'Russian literature',
      'Romanticism',
      'Visual arts'
    ],
    timeline: [
      { year: 1875, event: 'Born in Prague, Bohemia, Austria-Hungary' },
      { year: 1886, event: 'Parents separated; sent to military academy' },
      { year: 1891, event: 'Left military academy due to poor health' },
      { year: 1895, event: 'Studied literature, art history, and philosophy in Prague' },
      { year: 1897, event: 'Met Lou Andreas-Salomé, who became a significant influence' },
      { year: 1899, event: 'First journey to Russia with Lou Andreas-Salomé' },
      { year: 1900, event: 'Second journey to Russia, met Leo Tolstoy' },
      { year: 1902, event: 'Moved to Paris to work as secretary for sculptor Auguste Rodin' },
      { year: 1905, event: 'Published "The Book of Hours"' },
      { year: 1910, event: 'Published "The Notebooks of Malte Laurids Brigge"' },
      { year: 1912, event: 'Began writing "Duino Elegies" at Duino Castle' },
      { year: 1919, event: 'Moved to Switzerland' },
      { year: 1922, event: 'Completed "Duino Elegies" and wrote "Sonnets to Orpheus"' },
      { year: 1923, event: 'Published "Duino Elegies" and "Sonnets to Orpheus"' },
      { year: 1926, event: 'Died of leukemia in Montreux, Switzerland' }
    ]
  },
  {
    id: 'marina-tsvetaeva',
    name: 'Marina Tsvetaeva',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Marina_Tsvetaeva_1911.jpg/330px-Marina_Tsvetaeva_1911.jpg',
    birthYear: 1892,
    deathYear: 1941,
    birthPlace: 'Moscow, Russian Empire',
    bio: 'Marina Ivanovna Tsvetaeva was a Russian and Soviet poet. Her work is considered among the greatest in twentieth century Russian literature. She lived through and wrote of the Russian Revolution of 1917 and the Moscow famine that followed it. In an attempt to save her daughter Irina from starvation, she placed her in a state orphanage in 1919, where she died of hunger. Tsvetaeva left Russia in 1922 and lived with her family in increasing poverty in Paris, Berlin and Prague before returning to Moscow in 1939. Her husband Sergei Efron and her daughter Ariadna Efron (Alya) were arrested on espionage charges in 1941; and her husband was executed. Tsvetaeva committed suicide in 1941. As a lyrical poet, her passion and daring linguistic experimentation mark her as a striking chronicler of her times and the depths of the human condition.',
    language: 'en',
    works: [
      {
        id: 'mileposts',
        title: 'Mileposts',
        year: 1916,
        type: 'poetry'
      },
      {
        id: 'the-swans-encampment',
        title: 'The Swans\' Encampment',
        year: 1917,
        type: 'poetry'
      },
      {
        id: 'craft',
        title: 'Craft',
        year: 1923,
        type: 'poetry'
      },
      {
        id: 'after-russia',
        title: 'After Russia',
        year: 1928,
        type: 'poetry'
      },
      {
        id: 'poem-of-the-end',
        title: 'Poem of the End',
        year: 1924,
        type: 'poetry'
      }
    ],
    quote: 'In this most Christian of worlds, all poets are Jews.',
    achievements: [
      'Recognized as one of the greatest Russian poets of the 20th century',
      'Her work has been translated into many languages',
      'Influenced generations of Russian and international poets'
    ],
    influences: [
      'Alexander Pushkin',
      'Alexander Blok',
      'Rainer Maria Rilke',
      'German Romanticism',
      'Russian folklore'
    ],
    timeline: [
      { year: 1892, event: 'Born in Moscow, Russian Empire' },
      { year: 1910, event: 'Published her first collection of poems, "Evening Album"' },
      { year: 1912, event: 'Married Sergei Efron' },
      { year: 1917, event: 'Witnessed the Russian Revolution' },
      { year: 1919, event: 'Daughter Irina died of starvation in a state orphanage' },
      { year: 1922, event: 'Emigrated from Soviet Russia to Berlin, then Prague' },
      { year: 1925, event: 'Moved to Paris' },
      { year: 1939, event: 'Returned to Soviet Union' },
      { year: 1941, event: 'Husband executed on espionage charges' },
      { year: 1941, event: 'Committed suicide in Yelabuga, Tatar ASSR' }
    ]
  },
  {
    id: 'bulleh-shah',
    name: 'Bulleh Shah',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bulleh_Shah.jpg/330px-Bulleh_Shah.jpg',
    birthYear: 1680,
    deathYear: 1757,
    birthPlace: 'Uch, Mughal Empire (present-day Pakistan)',
    bio: 'Bulleh Shah was a Punjabi Islamic philosopher and Sufi poet. His first spiritual teacher was Shah Inayat Qadiri, a Sufi murshid of Lahore. Bulleh Shah practiced the Sufi tradition of Punjabi poetry established by poets like Shah Hussain, Sultan Bahu, and others. His lifespan overlapped with the Mughal Emperor Aurangzeb and the rise of the Sikh leader Ranjit Singh. Bulleh Shah\'s writings represent him as a humanist, with a strong sense of perseverance for the struggles of the poor. Many people have put his kafis to music, from humble street-singers to renowned Sufi singers like Nusrat Fateh Ali Khan, Pathanay Khan, Abida Parveen, Wadali Brothers, Sain Zahoor and Arieb Azhar. His poetry and philosophy strongly criticize Islamic religious orthodoxy of his day.',
    language: 'ur',
    works: [
      {
        id: 'bullah-ki-jaana-main-kaun',
        title: 'Bullah Ki Jaana Main Kaun',
        type: 'poetry'
      },
      {
        id: 'ilmon-bas-kareen-o-yaar',
        title: 'Ilmon Bas Kareen O Yaar',
        type: 'poetry'
      },
      {
        id: 'gharyali-diyan-gharyalian',
        title: 'Gharyali Diyan Gharyalian',
        type: 'poetry'
      },
      {
        id: 'ki-jana-main-kaun',
        title: 'Ki Jana Main Kaun',
        type: 'poetry'
      },
      {
        id: 'bulleh-shah-kafis',
        title: 'Kafis of Bulleh Shah',
        type: 'poetry'
      }
    ],
    quote: 'Remove duality and do away with all disputes; The Hindus and Muslims are not other than He.',
    achievements: [
      'One of the most revered Sufi poets of the Punjab region',
      'His works have been translated into numerous languages',
      'His poetry continues to be sung and recited across South Asia',
      'Influenced generations of spiritual seekers and poets'
    ],
    influences: [
      'Sufism',
      'Islamic mysticism',
      'Punjabi folk traditions',
      'Shah Inayat Qadiri',
      'Bhakti movement'
    ],
    timeline: [
      { year: 1680, event: 'Born in Uch, Mughal Empire (present-day Pakistan)' },
      { year: 1707, event: 'Became a disciple of Shah Inayat Qadiri' },
      { year: 1729, event: 'Death of his spiritual master Shah Inayat' },
      { year: 1730, event: 'Began writing poetry expressing his spiritual philosophy' },
      { year: 1757, event: 'Died in Kasur, Punjab (present-day Pakistan)' }
    ]
  },
  {
    id: 'pablo-neruda',
    name: 'Pablo Neruda',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Pablo_Neruda_1963.jpg/330px-Pablo_Neruda_1963.jpg',
    birthYear: 1904,
    deathYear: 1973,
    birthPlace: 'Parral, Chile',
    bio: 'Pablo Neruda was a Chilean poet-diplomat and politician who won the Nobel Prize for Literature in 1971. Neruda became known as a poet when he was 13 years old, and wrote in a variety of styles, including surrealist poems, historical epics, overtly political manifestos, a prose autobiography, and passionate love poems such as the ones in his collection Twenty Love Poems and a Song of Despair (1924). Neruda occupied many diplomatic positions in various countries during his lifetime and served a term as a Senator for the Chilean Communist Party. When President Gabriel González Videla outlawed communism in Chile in 1948, a warrant was issued for Neruda\'s arrest. Friends hid him for months in the basement of a house in the port city of Valparaíso, and he later escaped through a mountain pass near Maihue Lake into Argentina. The Colombian novelist Gabriel García Márquez once called Neruda "the greatest poet of the 20th century in any language."',
    language: 'en',
    works: [
      {
        id: 'twenty-love-poems',
        title: 'Twenty Love Poems and a Song of Despair',
        year: 1924,
        type: 'poetry'
      },
      {
        id: 'residence-on-earth',
        title: 'Residence on Earth',
        year: 1933,
        type: 'poetry'
      },
      {
        id: 'canto-general',
        title: 'Canto General',
        year: 1950,
        type: 'poetry'
      },
      {
        id: 'elemental-odes',
        title: 'Elemental Odes',
        year: 1954,
        type: 'poetry'
      },
      {
        id: 'memoirs',
        title: 'Memoirs',
        year: 1974,
        type: 'prose'
      }
    ],
    quote: 'You can cut all the flowers but you cannot keep spring from coming.',
    achievements: [
      'Nobel Prize in Literature (1971)',
      'International Peace Prize (1950)',
      'Honorary Doctorate from Oxford University (1965)',
      'Chilean Senator (1945-1948)'
    ],
    influences: [
      'Walt Whitman',
      'Federico García Lorca',
      'Arthur Rimbaud',
      'Marxism',
      'Latin American culture'
    ],
    timeline: [
      { year: 1904, event: 'Born as Ricardo Eliécer Neftalí Reyes Basoalto in Parral, Chile' },
      { year: 1920, event: 'Adopted the pen name Pablo Neruda' },
      { year: 1924, event: 'Published "Twenty Love Poems and a Song of Despair"' },
      { year: 1927, event: 'Began diplomatic career as consul in Rangoon, Burma' },
      { year: 1934, event: 'Appointed consul in Barcelona, Spain' },
      { year: 1945, event: 'Elected Senator of the Republic of Chile' },
      { year: 1948, event: 'Forced into exile after criticizing President González Videla' },
      { year: 1952, event: 'Returned to Chile after exile' },
      { year: 1971, event: 'Awarded the Nobel Prize for Literature' },
      { year: 1973, event: 'Died in Santiago, Chile, shortly after the coup d\'état led by Augusto Pinochet' }
    ]
  },
  {
    id: 'leo-tolstoy',
    name: 'Leo Tolstoy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg/330px-L.N.Tolstoy_Prokudin-Gorsky.jpg',
    birthYear: 1828,
    deathYear: 1910,
    birthPlace: 'Yasnaya Polyana, Russian Empire',
    bio: 'Count Lev Nikolayevich Tolstoy, usually referred to in English as Leo Tolstoy, was a Russian writer who is regarded as one of the greatest authors of all time. He received nominations for the Nobel Prize in Literature every year from 1902 to 1906 and for the Nobel Peace Prize in 1901, 1902, and 1909. Born to an aristocratic Russian family in 1828, Tolstoy is best known for the novels War and Peace (1869) and Anna Karenina (1878), often cited as pinnacles of realist fiction. He first achieved literary acclaim in his twenties with his semi-autobiographical trilogy, Childhood, Boyhood, and Youth, and Sevastopol Sketches, based upon his experiences in the Crimean War. His fiction includes dozens of short stories and several novellas such as The Death of Ivan Ilyich, Family Happiness, and Hadji Murad. He also wrote plays and numerous philosophical essays. In the 1870s, Tolstoy experienced a profound moral crisis, followed by what he regarded as an equally profound spiritual awakening, as outlined in his non-fiction work A Confession. His literal interpretation of the ethical teachings of Jesus, centering on the Sermon on the Mount, caused him to become a fervent Christian anarchist and pacifist. His ideas on nonviolent resistance, expressed in such works as The Kingdom of God Is Within You, had a profound impact on such pivotal 20th-century figures as Mahatma Gandhi and Martin Luther King Jr.',
    language: 'en',
    works: [
      {
        id: 'war-and-peace',
        title: 'War and Peace',
        year: 1869,
        type: 'prose'
      },
      {
        id: 'anna-karenina',
        title: 'Anna Karenina',
        year: 1878,
        type: 'prose'
      },
      {
        id: 'the-death-of-ivan-ilyich',
        title: 'The Death of Ivan Ilyich',
        year: 1886,
        type: 'prose'
      },
      {
        id: 'resurrection',
        title: 'Resurrection',
        year: 1899,
        type: 'prose'
      },
      {
        id: 'the-kingdom-of-god-is-within-you',
        title: 'The Kingdom of God Is Within You',
        year: 1894,
        type: 'prose'
      }
    ],
    quote: 'Everyone thinks of changing the world, but no one thinks of changing himself.',
    achievements: [
      'Considered one of the greatest novelists of all time',
      'Nominated multiple times for Nobel Prizes in Literature and Peace',
      'His works have been translated into dozens of languages',
      'Influenced numerous writers, thinkers, and political leaders'
    ],
    influences: [
      'Jean-Jacques Rousseau',
      'Arthur Schopenhauer',
      'Christianity',
      'Eastern philosophy',
      'Russian folk tales'
    ],
    timeline: [
      { year: 1828, event: 'Born at Yasnaya Polyana, Russian Empire' },
      { year: 1851, event: 'Joined the army and served in the Caucasus' },
      { year: 1854, event: 'Served in the Crimean War' },
      { year: 1857, event: 'First traveled abroad to Europe' },
      { year: 1862, event: 'Married Sophia Behrs' },
      { year: 1869, event: 'Published "War and Peace"' },
      { year: 1878, event: 'Published "Anna Karenina"' },
      { year: 1879, event: 'Experienced spiritual crisis and conversion' },
      { year: 1894, event: 'Published "The Kingdom of God Is Within You"' },
      { year: 1901, event: 'Excommunicated from the Russian Orthodox Church' },
      { year: 1910, event: 'Left home at age 82 and died at Astapovo railway station' }
    ]
  },
  {
    id: 'abdullah-hussein',
    name: 'Abdullah Hussein',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Abdullah_Hussein.jpg/330px-Abdullah_Hussein.jpg',
    birthYear: 1931,
    deathYear: 2015,
    birthPlace: 'Rawalpindi, British India (now Pakistan)',
    bio: 'Abdullah Hussein (Urdu: عبداللہ حسین), born Mohammed Khan, was a Pakistani novelist and screenwriter. He is best known for his novel Udaas Naslein (The Weary Generations), which won the Adamjee Award in 1963. The novel depicts the lives of ordinary people during the British Raj and the early years of Pakistan\'s independence. Hussein was a reclusive writer who spent much of his life in the UK, working as a chemical engineer. He wrote in both Urdu and English, and translated his own works between the two languages. His other notable works include the novels Baagh (The Garden) and Qaid (Captivity), and the short story collection Nashaib (Descent). His writing style is characterized by its realism, psychological depth, and social commentary. Hussein\'s work has been compared to that of European modernists like James Joyce and Virginia Woolf for its stream-of-consciousness technique and exploration of inner lives.',
    language: 'ur',
    works: [
      {
        id: 'udaas-naslein',
        title: 'Udaas Naslein (The Weary Generations)',
        year: 1963,
        type: 'prose'
      },
      {
        id: 'baagh',
        title: 'Baagh (The Garden)',
        year: 1982,
        type: 'prose'
      },
      {
        id: 'qaid',
        title: 'Qaid (Captivity)',
        year: 1989,
        type: 'prose'
      },
      {
        id: 'nashaib',
        title: 'Nashaib (Descent)',
        year: 1995,
        type: 'prose'
      },
      {
        id: 'emigre-journeys',
        title: 'Émigré Journeys',
        year: 2000,
        type: 'prose'
      }
    ],
    quote: 'Literature is not created in a vacuum. It is the outcome of a society\'s collective experience.',
    achievements: [
      'Adamjee Award for Udaas Naslein (1963)',
      'Prime Minister\'s Award for Literature (1970)',
      'Sitara-i-Imtiaz (Star of Excellence) awarded by the Government of Pakistan',
      'His novel Udaas Naslein is considered a classic of Urdu literature'
    ],
    influences: [
      'James Joyce',
      'Virginia Woolf',
      'Fyodor Dostoevsky',
      'Partition of India',
      'Colonial and post-colonial Pakistani society'
    ],
    timeline: [
      { year: 1931, event: 'Born in Rawalpindi, British India (now Pakistan)' },
      { year: 1951, event: 'Graduated with a degree in chemical engineering' },
      { year: 1963, event: 'Published Udaas Naslein (The Weary Generations)' },
      { year: 1968, event: 'Moved to the United Kingdom' },
      { year: 1982, event: 'Published Baagh (The Garden)' },
      { year: 1993, event: 'Translated Udaas Naslein into English as The Weary Generations' },
      { year: 2000, event: 'Published Émigré Journeys in English' },
      { year: 2015, event: 'Died in Lahore, Pakistan' }
    ]
  },
  {
    id: 'virginia-woolf',
    name: 'Virginia Woolf',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg/330px-George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg',
    birthYear: 1882,
    deathYear: 1941,
    birthPlace: 'London, England',
    bio: 'Adeline Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device. Woolf was born into an affluent household in South Kensington, London, the seventh child in a blended family of eight. Her father, Sir Leslie Stephen, was a notable historian, author, critic and mountaineer. Her mother, Julia Prinsep Stephen, was a renowned beauty and niece of the photographer Julia Margaret Cameron. Woolf was educated by her parents in their literate and well-connected household. Her parents\' circle of friends included literary and artistic luminaries like Henry James, George Eliot, and James Russell Lowell. Despite her extensive education, Woolf was prevented from attending university, a source of lifelong resentment. Woolf\'s most famous works include the novels Mrs Dalloway (1925), To the Lighthouse (1927), and Orlando (1928), and the book-length essay A Room of One\'s Own (1929). The latter contains her famous dictum, "A woman must have money and a room of her own if she is to write fiction." Woolf suffered from severe bouts of mental illness throughout her life, now believed to have been bipolar disorder, and committed suicide by drowning in 1941 at the age of 59.',
    language: 'en',
    works: [
      {
        id: 'mrs-dalloway',
        title: 'Mrs Dalloway',
        year: 1925,
        type: 'prose'
      },
      {
        id: 'to-the-lighthouse',
        title: 'To the Lighthouse',
        year: 1927,
        type: 'prose'
      },
      {
        id: 'orlando',
        title: 'Orlando: A Biography',
        year: 1928,
        type: 'prose'
      },
      {
        id: 'a-room-of-ones-own',
        title: 'A Room of One\'s Own',
        year: 1929,
        type: 'prose'
      },
      {
        id: 'the-waves',
        title: 'The Waves',
        year: 1931,
        type: 'prose'
      }
    ],
    quote: 'A woman must have money and a room of her own if she is to write fiction.',
    achievements: [
      'Pioneered the stream-of-consciousness literary technique',
      'Founding member of the Bloomsbury Group',
      'Her works have been translated into more than 50 languages',
      'Considered one of the greatest novelists of the 20th century'
    ],
    influences: [
      'Marcel Proust',
      'James Joyce',
      'Greek classical literature',
      'Feminism',
      'Modernism'
    ],
    timeline: [
      { year: 1882, event: 'Born in London, England' },
      { year: 1895, event: 'Death of her mother, leading to her first mental breakdown' },
      { year: 1904, event: 'Death of her father, Sir Leslie Stephen' },
      { year: 1905, event: 'Began writing for The Times Literary Supplement' },
      { year: 1912, event: 'Married Leonard Woolf' },
      { year: 1917, event: 'Founded Hogarth Press with her husband' },
      { year: 1922, event: 'Met Vita Sackville-West, who became her lover' },
      { year: 1925, event: 'Published Mrs Dalloway' },
      { year: 1927, event: 'Published To the Lighthouse' },
      { year: 1929, event: 'Published A Room of One\'s Own' },
      { year: 1941, event: 'Committed suicide by drowning in the River Ouse, Sussex' }
    ]
  },
  {
    id: 'gabriel-garcia-marquez',
    name: 'Gabriel García Márquez',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Gabriel_Garcia_Marquez.jpg/330px-Gabriel_Garcia_Marquez.jpg',
    birthYear: 1927,
    deathYear: 2014,
    birthPlace: 'Aracataca, Colombia',
    bio: 'Gabriel José de la Concordia García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, known affectionately as Gabo or Gabito throughout Latin America. Considered one of the most significant authors of the 20th century, particularly in the Spanish language, he was awarded the 1972 Neustadt International Prize for Literature and the 1982 Nobel Prize in Literature. García Márquez started as a journalist and wrote many acclaimed non-fiction works and short stories, but is best known for his novels, such as One Hundred Years of Solitude (1967), The Autumn of the Patriarch (1975), and Love in the Time of Cholera (1985). His works have achieved significant critical acclaim and widespread commercial success, most notably for popularizing a literary style known as magic realism, which uses magical elements and events in otherwise ordinary and realistic situations. Some of his works are set in the fictional village of Macondo (mainly inspired by his birthplace, Aracataca), and most of them explore the theme of solitude.',
    language: 'en',
    works: [
      {
        id: 'one-hundred-years-of-solitude',
        title: 'One Hundred Years of Solitude',
        year: 1967,
        type: 'prose'
      },
      {
        id: 'love-in-the-time-of-cholera',
        title: 'Love in the Time of Cholera',
        year: 1985,
        type: 'prose'
      },
      {
        id: 'chronicle-of-a-death-foretold',
        title: 'Chronicle of a Death Foretold',
        year: 1981,
        type: 'prose'
      },
      {
        id: 'the-autumn-of-the-patriarch',
        title: 'The Autumn of the Patriarch',
        year: 1975,
        type: 'prose'
      },
      {
        id: 'no-one-writes-to-the-colonel',
        title: 'No One Writes to the Colonel',
        year: 1961,
        type: 'prose'
      }
    ],
    quote: 'What matters in life is not what happens to you but what you remember and how you remember it.',
    achievements: [
      'Nobel Prize in Literature (1982)',
      'Neustadt International Prize for Literature (1972)',
      'French Legion of Honour (1981)',
      'His novel "One Hundred Years of Solitude" has sold more than 30 million copies worldwide'
    ],
    influences: [
      'William Faulkner',
      'Ernest Hemingway',
      'Virginia Woolf',
      'Franz Kafka',
      'Latin American folklore'
    ],
    timeline: [
      { year: 1927, event: 'Born in Aracataca, Colombia' },
      { year: 1947, event: 'Began career as a journalist in Cartagena' },
      { year: 1955, event: 'Published his first novella, "Leaf Storm"' },
      { year: 1958, event: 'Married Mercedes Barcha' },
      { year: 1961, event: 'Published "No One Writes to the Colonel"' },
      { year: 1967, event: 'Published "One Hundred Years of Solitude"' },
      { year: 1975, event: 'Published "The Autumn of the Patriarch"' },
      { year: 1981, event: 'Fled Colombia for Mexico after being accused of sympathizing with M-19 guerrillas' },
      { year: 1982, event: 'Awarded the Nobel Prize in Literature' },
      { year: 1985, event: 'Published "Love in the Time of Cholera"' },
      { year: 2014, event: 'Died in Mexico City, Mexico' }
    ]
  },
  {
    id: 'marina-tsvetaeva',
    name: 'Marina Tsvetaeva',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Marina_Tsvetaeva_1911.jpg/330px-Marina_Tsvetaeva_1911.jpg',
    birthYear: 1892,
    deathYear: 1941,
    birthPlace: 'Moscow, Russian Empire',
    bio: 'Marina Ivanovna Tsvetaeva was a Russian and Soviet poet. Her work is considered among the greatest in twentieth century Russian literature. She lived through and wrote of the Russian Revolution of 1917 and the Moscow famine that followed it. In an attempt to save her daughter Irina from starvation, she placed her in a state orphanage in 1919, where she died of hunger. Tsvetaeva left Russia in 1922 and lived with her family in increasing poverty in Paris, Berlin and Prague before returning to Moscow in 1939. Her husband Sergei Efron and her daughter Ariadna Efron (Alya) were arrested on espionage charges in 1941; and her husband was executed. Tsvetaeva committed suicide in 1941. As a lyrical poet, her passion and daring linguistic experimentation mark her as a striking chronicler of her times and the depths of the human condition.',
    language: 'en',
    works: [
      {
        id: 'mileposts',
        title: 'Mileposts',
        year: 1916,
        type: 'poetry'
      },
      {
        id: 'the-swans-encampment',
        title: 'The Swans\' Encampment',
        year: 1917,
        type: 'poetry'
      },
      {
        id: 'craft',
        title: 'Craft',
        year: 1923,
        type: 'poetry'
      },
      {
        id: 'after-russia',
        title: 'After Russia',
        year: 1928,
        type: 'poetry'
      },
      {
        id: 'poem-of-the-end',
        title: 'Poem of the End',
        year: 1924,
        type: 'poetry'
      }
    ],
    quote: 'In this most Christian of worlds, all poets are Jews.',
    achievements: [
      'Recognized as one of the greatest Russian poets of the 20th century',
      'Her work has been translated into many languages',
      'Influenced generations of Russian and international poets'
    ],
    influences: [
      'Alexander Pushkin',
      'Alexander Blok',
      'Rainer Maria Rilke',
      'German Romanticism',
      'Russian folklore'
    ],
    timeline: [
      { year: 1892, event: 'Born in Moscow, Russian Empire' },
      { year: 1910, event: 'Published her first collection of poems, "Evening Album"' },
      { year: 1912, event: 'Married Sergei Efron' },
      { year: 1917, event: 'Witnessed the Russian Revolution' },
      { year: 1919, event: 'Daughter Irina died of starvation in a state orphanage' },
      { year: 1922, event: 'Emigrated from Soviet Russia to Berlin, then Prague' },
      { year: 1925, event: 'Moved to Paris' },
      { year: 1939, event: 'Returned to Soviet Union' },
      { year: 1941, event: 'Husband executed on espionage charges' },
      { year: 1941, event: 'Committed suicide in Yelabuga, Tatar ASSR' }
    ]
  },
  {
    id: 'bulleh-shah',
    name: 'Bulleh Shah',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bulleh_Shah.jpg/330px-Bulleh_Shah.jpg',
    birthYear: 1680,
    deathYear: 1757,
    birthPlace: 'Uch, Mughal Empire (present-day Pakistan)',
    bio: 'Bulleh Shah was a Punjabi Islamic philosopher and Sufi poet. His first spiritual teacher was Shah Inayat Qadiri, a Sufi murshid of Lahore. Bulleh Shah practiced the Sufi tradition of Punjabi poetry established by poets like Shah Hussain, Sultan Bahu, and others. His lifespan overlapped with the Mughal Emperor Aurangzeb and the rise of the Sikh leader Ranjit Singh. Bulleh Shah\'s writings represent him as a humanist, with a strong sense of perseverance for the struggles of the poor. Many people have put his kafis to music, from humble street-singers to renowned Sufi singers like Nusrat Fateh Ali Khan, Pathanay Khan, Abida Parveen, Wadali Brothers, Sain Zahoor and Arieb Azhar. His poetry and philosophy strongly criticize Islamic religious orthodoxy of his day.',
    language: 'ur',
    works: [
      {
        id: 'bullah-ki-jaana-main-kaun',
        title: 'Bullah Ki Jaana Main Kaun',
        type: 'poetry'
      },
      {
        id: 'ilmon-bas-kareen-o-yaar',
        title: 'Ilmon Bas Kareen O Yaar',
        type: 'poetry'
      },
      {
        id: 'gharyali-diyan-gharyalian',
        title: 'Gharyali Diyan Gharyalian',
        type: 'poetry'
      },
      {
        id: 'ki-jana-main-kaun',
        title: 'Ki Jana Main Kaun',
        type: 'poetry'
      },
      {
        id: 'bulleh-shah-kafis',
        title: 'Kafis of Bulleh Shah',
        type: 'poetry'
      }
    ],
    quote: 'Remove duality and do away with all disputes; The Hindus and Muslims are not other than He.',
    achievements: [
      'One of the most revered Sufi poets of the Punjab region',
      'His works have been translated into numerous languages',
      'His poetry continues to be sung and recited across South Asia',
      'Influenced generations of spiritual seekers and poets'
    ],
    influences: [
      'Sufism',
      'Islamic mysticism',
      'Punjabi folk traditions',
      'Shah Inayat Qadiri',
      'Bhakti movement'
    ],
    timeline: [
      { year: 1680, event: 'Born in Uch, Mughal Empire (present-day Pakistan)' },
      { year: 1707, event: 'Became a disciple of Shah Inayat Qadiri' },
      { year: 1729, event: 'Death of his spiritual master Shah Inayat' },
      { year: 1730, event: 'Began writing poetry expressing his spiritual philosophy' },
      { year: 1757, event: 'Died in Kasur, Punjab (present-day Pakistan)' }
    ]
  },
  {
    id: 'pablo-neruda',
    name: 'Pablo Neruda',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Pablo_Neruda_1963.jpg/330px-Pablo_Neruda_1963.jpg',
    birthYear: 1904,
    deathYear: 1973,
    birthPlace: 'Parral, Chile',
    bio: 'Pablo Neruda was a Chilean poet-diplomat and politician who won the Nobel Prize for Literature in 1971. Neruda became known as a poet when he was 13 years old, and wrote in a variety of styles, including surrealist poems, historical epics, overtly political manifestos, a prose autobiography, and passionate love poems such as the ones in his collection Twenty Love Poems and a Song of Despair (1924). Neruda occupied many diplomatic positions in various countries during his lifetime and served a term as a Senator for the Chilean Communist Party. When President Gabriel González Videla outlawed communism in Chile in 1948, a warrant was issued for Neruda\'s arrest. Friends hid him for months in the basement of a house in the port city of Valparaíso, and he later escaped through a mountain pass near Maihue Lake into Argentina. The Colombian novelist Gabriel García Márquez once called Neruda "the greatest poet of the 20th century in any language."',
    language: 'en',
    works: [
      {
        id: 'twenty-love-poems',
        title: 'Twenty Love Poems and a Song of Despair',
        year: 1924,
        type: 'poetry'
      },
      {
        id: 'residence-on-earth',
        title: 'Residence on Earth',
        year: 1933,
        type: 'poetry'
      },
      {
        id: 'canto-general',
        title: 'Canto General',
        year: 1950,
        type: 'poetry'
      },
      {
        id: 'elemental-odes',
        title: 'Elemental Odes',
        year: 1954,
        type: 'poetry'
      },
      {
        id: 'memoirs',
        title: 'Memoirs',
        year: 1974,
        type: 'prose'
      }
    ],
    quote: 'You can cut all the flowers but you cannot keep spring from coming.',
    achievements: [
      'Nobel Prize in Literature (1971)',
      'International Peace Prize (1950)',
      'Honorary Doctorate from Oxford University (1965)',
      'Chilean Senator (1945-1948)'
    ],
    influences: [
      'Walt Whitman',
      'Federico García Lorca',
      'Arthur Rimbaud',
      'Marxism',
      'Latin American culture'
    ],
    timeline: [
      { year: 1904, event: 'Born as Ricardo Eliécer Neftalí Reyes Basoalto in Parral, Chile' },
      { year: 1920, event: 'Adopted the pen name Pablo Neruda' },
      { year: 1924, event: 'Published "Twenty Love Poems and a Song of Despair"' },
      { year: 1927, event: 'Began diplomatic career as consul in Rangoon, Burma' },
      { year: 1934, event: 'Appointed consul in Barcelona, Spain' },
      { year: 1945, event: 'Elected Senator of the Republic of Chile' },
      { year: 1948, event: 'Forced into exile after criticizing President González Videla' },
      { year: 1952, event: 'Returned to Chile after exile' },
      { year: 1971, event: 'Awarded the Nobel Prize for Literature' },
      { year: 1973, event: 'Died in Santiago, Chile, shortly after the coup d\'état led by Augusto Pinochet' }
    ]
  },
  {
    id: 'leo-tolstoy',
    name: 'Leo Tolstoy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg/330px-L.N.Tolstoy_Prokudin-Gorsky.jpg',
    birthYear: 1828,
    deathYear: 1910,
    birthPlace: 'Yasnaya Polyana, Russian Empire',
    bio: 'Count Lev Nikolayevich Tolstoy, usually referred to in English as Leo Tolstoy, was a Russian writer who is regarded as one of the greatest authors of all time. He received nominations for the Nobel Prize in Literature every year from 1902 to 1906 and for the Nobel Peace Prize in 1901, 1902, and 1909. Born to an aristocratic Russian family in 1828, Tolstoy is best known for the novels War and Peace (1869) and Anna Karenina (1878), often cited as pinnacles of realist fiction. He first achieved literary acclaim in his twenties with his semi-autobiographical trilogy, Childhood, Boyhood, and Youth, and Sevastopol Sketches, based upon his experiences in the Crimean War. His fiction includes dozens of short stories and several novellas such as The Death of Ivan Ilyich, Family Happiness, and Hadji Murad. He also wrote plays and numerous philosophical essays. In the 1870s, Tolstoy experienced a profound moral crisis, followed by what he regarded as an equally profound spiritual awakening, as outlined in his non-fiction work A Confession. His literal interpretation of the ethical teachings of Jesus, centering on the Sermon on the Mount, caused him to become a fervent Christian anarchist and pacifist. His ideas on nonviolent resistance, expressed in such works as The Kingdom of God Is Within You, had a profound impact on such pivotal 20th-century figures as Mahatma Gandhi and Martin Luther King Jr.',
    language: 'en',
    works: [
      {
        id: 'war-and-peace',
        title: 'War and Peace',
        year: 1869,
        type: 'prose'
      },
      {
        id: 'anna-karenina',
        title: 'Anna Karenina',
        year: 1878,
        type: 'prose'
      },
      {
        id: 'the-death-of-ivan-ilyich',
        title: 'The Death of Ivan Ilyich',
        year: 1886,
        type: 'prose'
      },
      {
        id: 'resurrection',
        title: 'Resurrection',
        year: 1899,
        type: 'prose'
      },
      {
        id: 'the-kingdom-of-god-is-within-you',
        title: 'The Kingdom of God Is Within You',
        year: 1894,
        type: 'prose'
      }
    ],
    quote: 'Everyone thinks of changing the world, but no one thinks of changing himself.',
    achievements: [
      'Considered one of the greatest novelists of all time',
      'Nominated multiple times for Nobel Prizes in Literature and Peace',
      'His works have been translated into dozens of languages',
      'Influenced numerous writers, thinkers, and political leaders'
    ],
    influences: [
      'Jean-Jacques Rousseau',
      'Arthur Schopenhauer',
      'Christianity',
      'Eastern philosophy',
      'Russian folk tales'
    ],
    timeline: [
      { year: 1828, event: 'Born at Yasnaya Polyana, Russian Empire' },
      { year: 1851, event: 'Joined the army and served in the Caucasus' },
      { year: 1854, event: 'Served in the Crimean War' },
      { year: 1857, event: 'First traveled abroad to Europe' },
      { year: 1862, event: 'Married Sophia Behrs' },
      { year: 1869, event: 'Published "War and Peace"' },
      { year: 1878, event: 'Published "Anna Karenina"' },
      { year: 1879, event: 'Experienced spiritual crisis and conversion' },
      { year: 1894, event: 'Published "The Kingdom of God Is Within You"' },
      { year: 1901, event: 'Excommunicated from the Russian Orthodox Church' },
      { year: 1910, event: 'Left home at age 82 and died at Astapovo railway station' }
    ]
  },
  {
    id: 'abdullah-hussein',
    name: 'Abdullah Hussein',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Abdullah_Hussein.jpg/330px-Abdullah_Hussein.jpg',
    birthYear: 1931,
    deathYear: 2015,
    birthPlace: 'Rawalpindi, British India (now Pakistan)',
    bio: 'Abdullah Hussein (Urdu: عبداللہ حسین), born Mohammed Khan, was a Pakistani novelist and screenwriter. He is best known for his novel Udaas Naslein (The Weary Generations), which won the Adamjee Award in 1963. The novel depicts the lives of ordinary people during the British Raj and the early years of Pakistan\'s independence. Hussein was a reclusive writer who spent much of his life in the UK, working as a chemical engineer. He wrote in both Urdu and English, and translated his own works between the two languages. His other notable works include the novels Baagh (The Garden) and Qaid (Captivity), and the short story collection Nashaib (Descent). His writing style is characterized by its realism, psychological depth, and social commentary. Hussein\'s work has been compared to that of European modernists like James Joyce and Virginia Woolf for its stream-of-consciousness technique and exploration of inner lives.',
    language: 'ur',
    works: [
      {
        id: 'udaas-naslein',
        title: 'Udaas Naslein (The Weary Generations)',
        year: 1963,
        type: 'prose'
      },
      {
        id: 'baagh',
        title: 'Baagh (The Garden)',
        year: 1982,
        type: 'prose'
      },
      {
        id: 'qaid',
        title: 'Qaid (Captivity)',
        year: 1989,
        type: 'prose'
      },
      {
        id: 'nashaib',
        title: 'Nashaib (Descent)',
        year: 1995,
        type: 'prose'
      },
      {
        id: 'emigre-journeys',
        title: 'Émigré Journeys',
        year: 2000,
        type: 'prose'
      }
    ],
    quote: 'Literature is not created in a vacuum. It is the outcome of a society\'s collective experience.',
    achievements: [
      'Adamjee Award for Udaas Naslein (1963)',
      'Prime Minister\'s Award for Literature (1970)',
      'Sitara-i-Imtiaz (Star of Excellence) awarded by the Government of Pakistan',
      'His novel Udaas Naslein is considered a classic of Urdu literature'
    ],
    influences: [
      'James Joyce',
      'Virginia Woolf',
      'Fyodor Dostoevsky',
      'Partition of India',
      'Colonial and post-colonial Pakistani society'
    ],
    timeline: [
      { year: 1931, event: 'Born in Rawalpindi, British India (now Pakistan)' },
      { year: 1951, event: 'Graduated with a degree in chemical engineering' },
      { year: 1963, event: 'Published Udaas Naslein (The Weary Generations)' },
      { year: 1968, event: 'Moved to the United Kingdom' },
      { year: 1982, event: 'Published Baagh (The Garden)' },
      { year: 1993, event: 'Translated Udaas Naslein into English as The Weary Generations' },
      { year: 2000, event: 'Published Émigré Journeys in English' },
      { year: 2015, event: 'Died in Lahore, Pakistan' }
    ]
  },
  {
    id: 'virginia-woolf',
    name: 'Virginia Woolf',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg/330px-George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg',
    birthYear: 1882,
    deathYear: 1941,
    birthPlace: 'London, England',
    bio: 'Adeline Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device. Woolf was born into an affluent household in South Kensington, London, the seventh child in a blended family of eight. Her father, Sir Leslie Stephen, was a notable historian, author, critic and mountaineer. Her mother, Julia Prinsep Stephen, was a renowned beauty and niece of the photographer Julia Margaret Cameron. Woolf was educated by her parents in their literate and well-connected household. Her parents\' circle of friends included literary and artistic luminaries like Henry James, George Eliot, and James Russell Lowell. Despite her extensive education, Woolf was prevented from attending university, a source of lifelong resentment. Woolf\'s most famous works include the novels Mrs Dalloway (1925), To the Lighthouse (1927), and Orlando (1928), and the book-length essay A Room of One\'s Own (1929). The latter contains her famous dictum, "A woman must have money and a room of her own if she is to write fiction." Woolf suffered from severe bouts of mental illness throughout her life, now believed to have been bipolar disorder, and committed suicide by drowning in 1941 at the age of 59.',
    language: 'en',
    works: [
      {
        id: 'mrs-dalloway',
        title: 'Mrs Dalloway',
        year: 1925,
        type: 'prose'
      },
      {
        id: 'to-the-lighthouse',
        title: 'To the Lighthouse',
        year: 1927,
        type: 'prose'
      },
      {
        id: 'orlando',
        title: 'Orlando: A Biography',
        year: 1928,
        type: 'prose'
      },
      {
        id: 'a-room-of-ones-own',
        title: 'A Room of One\'s Own',
        year: 1929,
        type: 'prose'
      },
      {
        id: 'the-waves',
        title: 'The Waves',
        year: 1931,
        type: 'prose'
      }
    ],
    quote: 'A woman must have money and a room of her own if she is to write fiction.',
    achievements: [
      'Pioneered the stream-of-consciousness literary technique',
      'Founding member of the Bloomsbury Group',
      'Her works have been translated into more than 50 languages',
      'Considered one of the greatest novelists of the 20th century'
    ],
    influences: [
      'Marcel Proust',
      'James Joyce',
      'Greek classical literature',
      'Feminism',
      'Modernism'
    ],
    timeline: [
      { year: 1882, event: 'Born in London, England' },
      { year: 1895, event: 'Death of her mother, leading to her first mental breakdown' },
      { year: 1904, event: 'Death of her father, Sir Leslie Stephen' },
      { year: 1905, event: 'Began writing for The Times Literary Supplement' },
      { year: 1912, event: 'Married Leonard Woolf' },
      { year: 1917, event: 'Founded Hogarth Press with her husband' },
      { year: 1922, event: 'Met Vita Sackville-West, who became her lover' },
      { year: 1925, event: 'Published Mrs Dalloway' },
      { year: 1927, event: 'Published To the Lighthouse' },
      { year: 1929, event: 'Published A Room of One\'s Own' },
      { year: 1941, event: 'Committed suicide by drowning in the River Ouse, Sussex' }
    ]
  },
  {
    id: 'abdullah-hussein',
    name: 'Abdullah Hussein',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Abdullah_Hussein.jpg/330px-Abdullah_Hussein.jpg',
    birthYear: 1931,
    deathYear: 2015,
    birthPlace: 'Rawalpindi, British India (now Pakistan)',
    bio: 'Abdullah Hussein (Urdu: عبداللہ حسین), born Mohammed Khan, was a Pakistani novelist and screenwriter. He is best known for his novel Udaas Naslein (The Weary Generations), which won the Adamjee Award in 1963. The novel depicts the lives of ordinary people during the British Raj and the early years of Pakistan\'s independence. Hussein was a reclusive writer who spent much of his life in the UK, working as a chemical engineer. He wrote in both Urdu and English, and translated his own works between the two languages.',
    language: 'ur',
    works: [
      {
        id: 'udaas-naslein',
        title: 'Udaas Naslein (The Weary Generations)',
        year: 1963,
        type: 'prose'
      },
      {
        id: 'baagh',
        title: 'Baagh (The Garden)',
        year: 1982,
        type: 'prose'
      },
      {
        id: 'qaid',
        title: 'Qaid (Captivity)',
        year: 1989,
        type: 'prose'
      },
      {
        id: 'nashaib',
        title: 'Nashaib (Descent)',
        year: 1995,
        type: 'prose'
      },
      {
        id: 'emigre-journeys',
        title: 'Émigré Journeys',
        year: 2000,
        type: 'prose'
      }
    ],
    quote: 'Literature is not created in a vacuum. It is the outcome of a society\'s collective experience.',
    achievements: [
      'Adamjee Award for Udaas Naslein (1963)',
      'Prime Minister\'s Award for Literature (1970)',
      'Sitara-i-Imtiaz (Star of Excellence) awarded by the Government of Pakistan',
      'His novel Udaas Naslein is considered a classic of Urdu literature'
    ],
    influences: [
      'James Joyce',
      'Virginia Woolf',
      'Fyodor Dostoevsky',
      'Partition of India',
      'Colonial and post-colonial Pakistani society'
    ],
    timeline: [
      { year: 1931, event: 'Born in Rawalpindi, British India (now Pakistan)' },
      { year: 1951, event: 'Graduated with a degree in chemical engineering' },
      { year: 1963, event: 'Published Udaas Naslein (The Weary Generations)' },
      { year: 1968, event: 'Moved to the United Kingdom' },
      { year: 1982, event: 'Published Baagh (The Garden)' },
      { year: 1993, event: 'Translated Udaas Naslein into English as The Weary Generations' },
      { year: 2000, event: 'Published Émigré Journeys in English' },
      { year: 2015, event: 'Died in Lahore, Pakistan' }
    ]
  },
  {
    id: 'virginia-woolf',
    name: 'Virginia Woolf',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg/330px-George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg',
    birthYear: 1882,
    deathYear: 1941,
    birthPlace: 'London, England',
    bio: 'Adeline Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device. Woolf was born into an affluent household in South Kensington, London. Her father, Sir Leslie Stephen, was a notable historian, author, critic and mountaineer. Woolf\'s most famous works include the novels Mrs Dalloway (1925), To the Lighthouse (1927), and Orlando (1928), and the book-length essay A Room of One\'s Own (1929). The latter contains her famous dictum, "A woman must have money and a room of her own if she is to write fiction." Woolf suffered from severe bouts of mental illness throughout her life, now believed to have been bipolar disorder, and committed suicide by drowning in 1941 at the age of 59.',
    language: 'en',
    works: [
      {
        id: 'mrs-dalloway',
        title: 'Mrs Dalloway',
        year: 1925,
        type: 'prose'
      },
      {
        id: 'to-the-lighthouse',
        title: 'To the Lighthouse',
        year: 1927,
        type: 'prose'
      },
      {
        id: 'orlando',
        title: 'Orlando: A Biography',
        year: 1928,
        type: 'prose'
      },
      {
        id: 'a-room-of-ones-own',
        title: 'A Room of One\'s Own',
        year: 1929,
        type: 'prose'
      },
      {
        id: 'the-waves',
        title: 'The Waves',
        year: 1931,
        type: 'prose'
      }
    ],
    quote: 'A woman must have money and a room of her own if she is to write fiction.',
    achievements: [
      'Pioneered the stream-of-consciousness literary technique',
      'Founding member of the Bloomsbury Group',
      'Her works have been translated into more than 50 languages',
      'Considered one of the greatest novelists of the 20th century'
    ],
    influences: [
      'Marcel Proust',
      'James Joyce',
      'Greek classical literature',
      'Feminism',
      'Modernism'
    ],
    timeline: [
      { year: 1882, event: 'Born in London, England' },
      { year: 1895, event: 'Death of her mother, leading to her first mental breakdown' },
      { year: 1904, event: 'Death of her father, Sir Leslie Stephen' },
      { year: 1905, event: 'Began writing for The Times Literary Supplement' },
      { year: 1912, event: 'Married Leonard Woolf' },
      { year: 1917, event: 'Founded Hogarth Press with her husband' },
      { year: 1922, event: 'Met Vita Sackville-West, who became her lover' },
      { year: 1925, event: 'Published Mrs Dalloway' },
      { year: 1927, event: 'Published To the Lighthouse' },
      { year: 1929, event: 'Published A Room of One\'s Own' },
      { year: 1941, event: 'Committed suicide by drowning in the River Ouse, Sussex' }
    ]
  }
,
  {
    id: 'william-shakespeare',
    name: 'William Shakespeare',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/330px-Shakespeare.jpg',
    birthYear: 1564,
    deathYear: 1616,
    birthPlace: 'Stratford-upon-Avon, England',
    bio: 'William Shakespeare was an English poet, playwright, and actor, widely regarded as the greatest writer in the English language and the world\'s greatest dramatist. He is often called England\'s national poet and the "Bard of Avon". His extant works, including collaborations, consist of some 39 plays, 154 sonnets, two long narrative poems, and a few other verses. His plays have been translated into every major living language and are performed more often than those of any other playwright.',
    language: 'en',
    works: [
      {
        id: 'hamlet',
        title: 'Hamlet',
        year: 1600,
        type: 'prose'
      },
      {
        id: 'romeo-and-juliet',
        title: 'Romeo and Juliet',
        year: 1595,
        type: 'prose'
      },
      {
        id: 'macbeth',
        title: 'Macbeth',
        year: 1606,
        type: 'prose'
      },
      {
        id: 'sonnets',
        title: 'Sonnets',
        year: 1609,
        type: 'poetry'
      },
      {
        id: 'king-lear',
        title: 'King Lear',
        year: 1606,
        type: 'prose'
      }
    ],
    quote: 'All the world\'s a stage, and all the men and women merely players.',
    achievements: [
      'Considered the greatest writer in the English language',
      'His works have been translated into every major living language',
      'His plays continue to be studied, performed, and reinterpreted around the world'
    ],
    influences: [
      'Ovid',
      'Plutarch',
      'Holinshed\'s Chronicles',
      'Classical mythology',
      'English history'
    ],
    timeline: [
      { year: 1564, event: 'Born in Stratford-upon-Avon, England' },
      { year: 1582, event: 'Married Anne Hathaway' },
      { year: 1583, event: 'Birth of daughter Susanna' },
      { year: 1585, event: 'Birth of twins Hamnet and Judith' },
      { year: 1592, event: 'First mentioned as a London playwright' },
      { year: 1599, event: 'Globe Theatre built in London' },
      { year: 1609, event: 'Published Sonnets' },
      { year: 1613, event: 'Globe Theatre burned down during a performance of Henry VIII' },
      { year: 1616, event: 'Died in Stratford-upon-Avon, England' }
    ]
  },
  {
    id: 'dylan-thomas',
    name: 'Dylan Thomas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dylan_Thomas_profile.jpg/330px-Dylan_Thomas_profile.jpg',
    birthYear: 1914,
    deathYear: 1953,
    birthPlace: 'Swansea, Wales',
    bio: 'Dylan Marlais Thomas was a Welsh poet and writer whose works include the poems "Do not go gentle into that good night" and "And death shall have no dominion", as well as the "play for voices" Under Milk Wood. He became widely popular in his lifetime and remained so after his death at the age of 39 in New York City. By then, he had acquired a reputation, which he had encouraged, as a "roistering, drunken and doomed poet".',
    language: 'en',
    works: [
      {
        id: 'eighteen-poems',
        title: 'Eighteen Poems',
        year: 1934,
        type: 'poetry'
      },
      {
        id: 'twenty-five-poems',
        title: 'Twenty-five Poems',
        year: 1936,
        type: 'poetry'
      },
      {
        id: 'portrait-of-the-artist-as-a-young-dog',
        title: 'Portrait of the Artist as a Young Dog',
        year: 1940,
        type: 'prose'
      },
      {
        id: 'under-milk-wood',
        title: 'Under Milk Wood',
        year: 1954,
        type: 'prose'
      },
      {
        id: 'collected-poems',
        title: 'Collected Poems',
        year: 1952,
        type: 'poetry'
      }
    ],
    quote: 'Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light.',
    achievements: [
      'Guggenheim Fellowship (1950)',
      'His work brought Welsh literature to international attention',
      'Under Milk Wood is considered a classic of radio drama',
      'His readings on BBC Radio made him a household name in the UK'
    ],
    influences: [
      'Welsh folklore',
      'Bible',
      'Surrealism',
      'Romanticism',
      'Welsh landscape and culture'
    ],
    timeline: [
      { year: 1914, event: 'Born in Swansea, Wales' },
      { year: 1934, event: 'Published first book, Eighteen Poems' },
      { year: 1937, event: 'Married Caitlin Macnamara' },
      { year: 1946, event: 'First radio broadcast of "Return Journey to Swansea"' },
      { year: 1950, event: 'First US reading tour' },
      { year: 1953, event: 'Died in New York City during his fourth US tour' },
      { year: 1954, event: 'Under Milk Wood first performed (posthumously)' }
    ]
  },
  {
    id: 'rudyard-kipling',
    name: 'Rudyard Kipling',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Rudyard_Kipling_%28portrait%29.jpg/330px-Rudyard_Kipling_%28portrait%29.jpg',
    birthYear: 1865,
    deathYear: 1936,
    birthPlace: 'Bombay, British India (now Mumbai, India)',
    bio: 'Joseph Rudyard Kipling was an English journalist, short-story writer, poet, and novelist. He was born in India, which inspired much of his work. Kipling\'s works of fiction include The Jungle Book, Kim, and many short stories, including "The Man Who Would Be King". His poems include "Mandalay", "Gunga Din", "The Gods of the Copybook Headings", "The White Man\'s Burden", and "If—". He is regarded as a major innovator in the art of the short story; his children\'s books are classics of children\'s literature, and his best works are said to exhibit "a versatile and luminous narrative gift".',
    language: 'en',
    works: [
      {
        id: 'the-jungle-book',
        title: 'The Jungle Book',
        year: 1894,
        type: 'prose'
      },
      {
        id: 'kim',
        title: 'Kim',
        year: 1901,
        type: 'prose'
      },
      {
        id: 'just-so-stories',
        title: 'Just So Stories',
        year: 1902,
        type: 'prose'
      },
      {
        id: 'barrack-room-ballads',
        title: 'Barrack-Room Ballads',
        year: 1892,
        type: 'poetry'
      },
      {
        id: 'the-man-who-would-be-king',
        title: 'The Man Who Would Be King',
        year: 1888,
        type: 'prose'
      }
    ],
    quote: 'If you can keep your head when all about you are losing theirs and blaming it on you...',
    achievements: [
      'Nobel Prize in Literature (1907)',
      'First English-language writer to receive the Nobel Prize in Literature',
      'Youngest recipient of the Nobel Prize in Literature (age 41)',
      'Poet Laureate of the United Kingdom (declined)'
    ],
    influences: [
      'British colonial experience in India',
      'Indian culture and folklore',
      'Anglo-Indian society',
      'Victorian values',
      'British imperialism'
    ],
    timeline: [
      { year: 1865, event: 'Born in Bombay, British India' },
      { year: 1871, event: 'Sent to England for education' },
      { year: 1882, event: 'Returned to India to work as a journalist' },
      { year: 1889, event: 'Returned to England' },
      { year: 1892, event: 'Married Caroline Balestier' },
      { year: 1894, event: 'Published The Jungle Book' },
      { year: 1907, event: 'Awarded the Nobel Prize in Literature' },
      { year: 1915, event: 'His son John killed in World War I' },
      { year: 1936, event: 'Died in London, England' }
    ]
  },
  {
    id: 'samuel-taylor-coleridge',
    name: 'Samuel Taylor Coleridge',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Samuel_Taylor_Coleridge_by_Washington_Allston.jpg/330px-Samuel_Taylor_Coleridge_by_Washington_Allston.jpg',
    birthYear: 1772,
    deathYear: 1834,
    birthPlace: 'Ottery St Mary, Devon, England',
    bio: 'Samuel Taylor Coleridge was an English poet, literary critic, philosopher and theologian who, with his friend William Wordsworth, was a founder of the Romantic Movement in England and a member of the Lake Poets. He is known for his works such as "The Rime of the Ancient Mariner" and "Kubla Khan", as well as his major prose work Biographia Literaria. His critical work, especially on Shakespeare, was highly influential, and he helped introduce German idealist philosophy to English-speaking culture.',
    language: 'en',
    works: [
      {
        id: 'the-rime-of-the-ancient-mariner',
        title: 'The Rime of the Ancient Mariner',
        year: 1798,
        type: 'poetry'
      },
      {
        id: 'kubla-khan',
        title: 'Kubla Khan',
        year: 1816,
        type: 'poetry'
      },
      {
        id: 'christabel',
        title: 'Christabel',
        year: 1816,
        type: 'poetry'
      },
      {
        id: 'biographia-literaria',
        title: 'Biographia Literaria',
        year: 1817,
        type: 'prose'
      },
      {
        id: 'dejection-an-ode',
        title: 'Dejection: An Ode',
        year: 1802,
        type: 'poetry'
      }
    ],
    quote: 'Water, water, everywhere, And all the boards did shrink; Water, water, everywhere, Nor any drop to drink.',
    achievements: [
      'Co-founded the Romantic Movement in English literature',
      'Developed influential theories of imagination and poetic creation',
      'His lectures on Shakespeare established new standards in literary criticism',
      'Fellow of the Royal Society of Literature'
    ],
    influences: [
      'William Wordsworth',
      'German Idealist philosophy',
      'Neoplatonism',
      'Christian mysticism',
      'Opium (which influenced his dream-like poetry)'
    ],
    timeline: [
      { year: 1772, event: 'Born in Ottery St Mary, Devon, England' },
      { year: 1791, event: 'Entered Jesus College, Cambridge' },
      { year: 1795, event: 'Met William Wordsworth' },
      { year: 1798, event: 'Published Lyrical Ballads with Wordsworth' },
      { year: 1800, event: 'Moved to the Lake District' },
      { year: 1816, event: 'Published Kubla Khan and Christabel' },
      { year: 1817, event: 'Published Biographia Literaria' },
      { year: 1834, event: 'Died in Highgate, London' }
    ]
  },
  {
    id: 'jane-austen',
    name: 'Jane Austen',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg/330px-CassandraAusten-JaneAusten%28c.1810%29_hires.jpg',
    birthYear: 1775,
    deathYear: 1817,
    birthPlace: 'Steventon, Hampshire, England',
    bio: 'Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. Austen\'s plots often explore the dependence of women on marriage in the pursuit of favorable social standing and economic security. Her works critique the novels of sensibility of the second half of the 18th century and are part of the transition to 19th-century literary realism. Her use of biting irony, along with her realism, humor, and social commentary, have long earned her acclaim among critics, scholars, and popular audiences alike.',
    language: 'en',
    works: [
      {
        id: 'pride-and-prejudice',
        title: 'Pride and Prejudice',
        year: 1813,
        type: 'prose'
      },
      {
        id: 'sense-and-sensibility',
        title: 'Sense and Sensibility',
        year: 1811,
        type: 'prose'
      },
      {
        id: 'emma',
        title: 'Emma',
        year: 1815,
        type: 'prose'
      },
      {
        id: 'mansfield-park',
        title: 'Mansfield Park',
        year: 1814,
        type: 'prose'
      },
      {
        id: 'persuasion',
        title: 'Persuasion',
        year: 1818,
        type: 'prose'
      }
    ],
    quote: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    achievements: [
      'Considered one of the greatest writers in English literature',
      'Her works have been continuously in print since 1833',
      'Pioneered the use of free indirect discourse in fiction',
      'Her novels have inspired countless adaptations across various media'
    ],
    influences: [
      'Samuel Richardson',
      'Frances Burney',
      'Henry Fielding',
      'British society and manners',
      'Domestic life of the British landed gentry'
    ],
    timeline: [
      { year: 1775, event: 'Born in Steventon, Hampshire, England' },
      { year: 1801, event: 'Moved to Bath with her family' },
      { year: 1809, event: 'Settled in Chawton, Hampshire' },
      { year: 1811, event: 'Published Sense and Sensibility' },
      { year: 1813, event: 'Published Pride and Prejudice' },
      { year: 1814, event: 'Published Mansfield Park' },
      { year: 1815, event: 'Published Emma' },
      { year: 1817, event: 'Died in Winchester, Hampshire' },
      { year: 1818, event: 'Northanger Abbey and Persuasion published posthumously' }
    ]
  },
  {
    id: 'george-orwell',
    name: 'George Orwell',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/George_Orwell_press_photo.jpg/330px-George_Orwell_press_photo.jpg',
    birthYear: 1903,
    deathYear: 1950,
    birthPlace: 'Motihari, Bengal Presidency, British India',
    bio: 'George Orwell (born Eric Arthur Blair) was an English novelist, essayist, journalist, and critic. His work is characterized by lucid prose, social criticism, opposition to totalitarianism, and support of democratic socialism. Orwell\'s work remains influential in popular culture and in political culture, and the adjective "Orwellian"—describing totalitarian and authoritarian social practices—is part of the English language, like many of his neologisms, such as "Big Brother", "Thought Police", "Two Minutes Hate", "Room 101", "memory hole", "Newspeak", "doublethink", "proles", "unperson", and "thoughtcrime".',
    language: 'en',
    works: [
      {
        id: 'nineteen-eighty-four',
        title: 'Nineteen Eighty-Four',
        year: 1949,
        type: 'prose'
      },
      {
        id: 'animal-farm',
        title: 'Animal Farm',
        year: 1945,
        type: 'prose'
      },
      {
        id: 'homage-to-catalonia',
        title: 'Homage to Catalonia',
        year: 1938,
        type: 'prose'
      },
      {
        id: 'down-and-out-in-paris-and-london',
        title: 'Down and Out in Paris and London',
        year: 1933,
        type: 'prose'
      },
      {
        id: 'the-road-to-wigan-pier',
        title: 'The Road to Wigan Pier',
        year: 1937,
        type: 'prose'
      }
    ],
    quote: 'In a time of deceit, telling the truth is a revolutionary act.',
    achievements: [
      'His novels Animal Farm and Nineteen Eighty-Four have together sold more copies than any two books by any other 20th-century author',
      'Named by The Times as one of "The 50 greatest British writers since 1945"',
      'Orwell Prize established in his name for political writing',
      'His concepts and terminology have become fundamental in discussions of privacy, state security, and institutional deception'
    ],
    influences: [
      'Spanish Civil War',
      'Totalitarianism',
      'British colonialism',
      'Socialism',
      'Jonathan Swift'
    ],
    timeline: [
      { year: 1903, event: 'Born in Motihari, Bengal Presidency, British India' },
      { year: 1922, event: 'Joined the Imperial Police in Burma' },
      { year: 1928, event: 'Moved to Paris' },
      { year: 1933, event: 'Published first book, Down and Out in Paris and London' },
      { year: 1936, event: 'Fought in the Spanish Civil War' },
      { year: 1945, event: 'Published Animal Farm' },
      { year: 1949, event: 'Published Nineteen Eighty-Four' },
      { year: 1950, event: 'Died of tuberculosis in London' }
    ]
  },
  {
    id: 'harper-lee',
    name: 'Harper Lee',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Harper_Lee_%28To_Kill_a_Mockingbird_portrait%29.jpg/330px-Harper_Lee_%28To_Kill_a_Mockingbird_portrait%29.jpg',
    birthYear: 1926,
    deathYear: 2016,
    birthPlace: 'Monroeville, Alabama, USA',
    bio: 'Nelle Harper Lee was an American novelist best known for her 1960 novel To Kill a Mockingbird. It won the 1961 Pulitzer Prize and has become a classic of modern American literature. Lee published only two books, yet she was awarded the Presidential Medal of Freedom in 2007 for her contribution to literature. She also received numerous honorary degrees, though she declined to speak on those occasions. She assisted her close friend Truman Capote in his research for the book In Cold Blood (1966). Capote was the basis for the character Dill in To Kill a Mockingbird.',
    language: 'en',
    works: [
      {
        id: 'to-kill-a-mockingbird',
        title: 'To Kill a Mockingbird',
        year: 1960,
        type: 'prose'
      },
      {
        id: 'go-set-a-watchman',
        title: 'Go Set a Watchman',
        year: 2015,
        type: 'prose'
      }
    ],
    quote: 'You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.',
    achievements: [
      'Pulitzer Prize for Fiction (1961)',
      'Presidential Medal of Freedom (2007)',
      'National Medal of Arts (2010)',
      'To Kill a Mockingbird has sold more than 40 million copies worldwide'
    ],
    influences: [
      'Southern Gothic tradition',
      'Growing up in the American South',
      'Racial injustice in the American South',
      'Her father\'s legal career',
      'Truman Capote'
    ],
    timeline: [
      { year: 1926, event: 'Born in Monroeville, Alabama' },
      { year: 1944, event: 'Attended Huntingdon College in Montgomery' },
      { year: 1945, event: 'Transferred to the University of Alabama to study law' },
      { year: 1949, event: 'Moved to New York City to pursue writing' },
      { year: 1960, event: 'Published To Kill a Mockingbird' },
      { year: 1961, event: 'Won the Pulitzer Prize for Fiction' },
      { year: 2007, event: 'Awarded the Presidential Medal of Freedom' },
      { year: 2015, event: 'Published Go Set a Watchman' },
      { year: 2016, event: 'Died in Monroeville, Alabama' }
    ]
  }
];
