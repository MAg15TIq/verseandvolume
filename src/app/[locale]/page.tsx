import BentoGrid, { BentoItem } from '@/components/BentoGrid';
import HeroItem from '@/components/bento/HeroItem';
import FeaturedQuoteItem from '@/components/bento/FeaturedQuoteItem';
import NavigationItem from '@/components/bento/NavigationItem';
import LatestWorksItem from '@/components/bento/LatestWorksItem';
import FeaturedImageItem from '@/components/bento/FeaturedImageItem';
import NewsletterItem from '@/components/bento/NewsletterItem';
import AboutItem from '@/components/bento/AboutItem';

interface FeaturedWork {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  type: 'poetry' | 'ghazal' | 'nazm' | 'sonnet';
  language: 'en' | 'ur';
  category: 'poetry' | 'ghazals' | 'psychological-poetry';
}

export default function Home() {
  const featuredWorks: FeaturedWork[] = [
    {
      id: 'hope-is-the-thing-with-feathers',
      title: 'Hope is the thing with feathers',
      author: 'Emily Dickinson',
      excerpt: 'Hope is the thing with feathers that perches in the soul, and sings the tune without the words, and never stops at all...',
      type: 'poetry',
      language: 'en',
      category: 'poetry'
    },
    {
      id: 'shakespeare-sonnet-18',
      title: 'Sonnet 18: Shall I compare thee to a summer\'s day?',
      author: 'William Shakespeare',
      excerpt: 'Shall I compare thee to a summer\'s day? Thou art more lovely and more temperate...',
      type: 'sonnet',
      language: 'en',
      category: 'poetry'
    },
    {
      id: 'dil-e-nadan-tujhe-hua-kya-hai',
      title: 'دلِ ناداں تجھے ہوا کیا ہے',
      author: 'Mirza Ghalib',
      excerpt: 'دلِ ناداں تجھے ہوا کیا ہے، آخر اس درد کی دوا کیا ہے...',
      type: 'ghazal',
      language: 'ur',
      category: 'ghazals'
    },
    {
      id: 'sitaron-se-aage-jahan-aur-bhi-hain',
      title: 'ستاروں سے آگے جہاں اور بھی ہیں',
      author: 'Allama Muhammad Iqbal',
      excerpt: 'ستاروں سے آگے جہاں اور بھی ہیں، ابھی عشق کے امتحان اور بھی ہیں...',
      type: 'ghazal',
      language: 'ur',
      category: 'ghazals'
    },
    {
      id: 'the-road-not-taken',
      title: 'The Road Not Taken',
      author: 'Robert Frost',
      excerpt: 'Two roads diverged in a yellow wood, and sorry I could not travel both and be one traveler, long I stood...',
      type: 'poetry',
      language: 'en',
      category: 'poetry'
    },
    {
      id: 'hum-dekhenge',
      title: 'ہم دیکھیں گے',
      author: 'Faiz Ahmad Faiz',
      excerpt: 'ہم دیکھیں گے، لازم ہے کہ ہم بھی دیکھیں گے، وہ دن کہ جس کا وعدہ ہے...',
      type: 'nazm',
      language: 'ur',
      category: 'ghazals'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
      {/* Enhanced Welcome Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-literary-gold via-literary-gold-dark to-literary-burgundy bg-clip-text text-transparent">
          Verse & Volume
        </h1>
        <p className="text-xl md:text-2xl text-paper-600 dark:text-paper-400 max-w-3xl mx-auto leading-relaxed">
          A sophisticated literary platform celebrating poetry and prose in English and Urdu
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-literary-gold to-literary-gold-dark text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Explore Poetry
          </button>
          <button className="px-8 py-3 border-2 border-literary-gold text-literary-gold rounded-full font-medium hover:bg-literary-gold hover:text-white transition-all duration-300">
            Browse Novels
          </button>
        </div>
      </div>

      <BentoGrid className="grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 sm:gap-5 md:gap-6">
        {/* Hero Section - 2x2 grid */}
        <BentoItem
          colSpan={2}
          rowSpan={2}
          decorationType="paper-texture"
          className="bg-gradient-to-br from-literary-parchment/90 to-paper-200/90 dark:from-literary-parchment-dark/90 dark:to-paper-800/90 hover:shadow-2xl hover:from-literary-parchment hover:to-paper-200 dark:hover:from-literary-parchment-dark dark:hover:to-paper-800 will-change-transform border border-literary-gold/20"
        >
          <HeroItem />
        </BentoItem>

        {/* Featured Quote - 2x1 grid */}
        <BentoItem
          colSpan={2}
          rowSpan={1}
          decorationType="folded-corner"
          className="bg-gradient-to-r from-literary-sage-light/30 to-literary-sage/30 dark:from-literary-sage-dark/30 dark:to-paper-700 hover:from-literary-sage-light/50 hover:to-literary-sage/50 dark:hover:from-literary-sage-dark/50 dark:hover:to-paper-600 will-change-transform border border-literary-sage/20"
        >
          <FeaturedQuoteItem />
        </BentoItem>

        {/* Navigation - 2x1 grid */}
        <BentoItem
          colSpan={2}
          rowSpan={1}
          decorationType="pattern"
          className="bg-gradient-to-r from-literary-emerald-light/20 to-literary-emerald/20 dark:from-literary-emerald-dark/20 dark:to-paper-800 hover:from-literary-emerald-light/30 hover:to-literary-emerald/30 dark:hover:from-literary-emerald-dark/30 dark:hover:to-paper-700 will-change-transform border border-literary-emerald/20"
        >
          <NavigationItem />
        </BentoItem>

        {/* Latest Works - 1x2 grid */}
        <BentoItem
          colSpan={1}
          rowSpan={2}
          decorationType="paper-texture"
          className="bg-gradient-to-b from-literary-burgundy-light/20 to-literary-burgundy/20 dark:from-literary-burgundy-dark/20 dark:to-paper-900 hover:from-literary-burgundy-light/30 hover:to-literary-burgundy/30 dark:hover:from-literary-burgundy-dark/30 dark:hover:to-paper-800 will-change-transform border border-literary-burgundy/20"
        >
          <LatestWorksItem works={featuredWorks.map(work => ({
            id: work.id,
            title: work.title,
            author: work.author,
            type: work.type,
            excerpt: work.excerpt,
            language: work.language,
            category: work.category
          }))} />
        </BentoItem>

        {/* Featured Image - 2x1 grid */}
        <BentoItem
          colSpan={2}
          rowSpan={1}
          decorationType="corner"
          className="bg-gradient-to-r from-literary-sepia-light/20 to-literary-sepia/20 dark:from-literary-sepia-dark/20 dark:to-paper-700 hover:from-literary-sepia-light/30 hover:to-literary-sepia/30 dark:hover:from-literary-sepia-dark/30 dark:hover:to-paper-600 will-change-transform border border-literary-sepia/20"
        >
          <FeaturedImageItem />
        </BentoItem>

        {/* Newsletter - 1x1 grid */}
        <BentoItem
          colSpan={1}
          rowSpan={1}
          decorationType="folded-corner"
          className="bg-gradient-to-br from-literary-gold-light/20 to-literary-gold/20 dark:from-literary-gold-dark/20 dark:to-paper-800 hover:from-literary-gold-light/30 hover:to-literary-gold/30 dark:hover:from-literary-gold-dark/30 dark:hover:to-paper-700 will-change-transform border border-literary-gold/30"
        >
          <NewsletterItem />
        </BentoItem>

        {/* About - 3x1 grid */}
        <BentoItem
          colSpan={3}
          rowSpan={1}
          decorationType="border"
          className="bg-gradient-to-r from-literary-parchment/50 to-paper-200/50 dark:from-literary-parchment-dark/50 dark:to-paper-800 hover:from-literary-parchment/70 hover:to-paper-200/70 dark:hover:from-literary-parchment-dark/70 dark:hover:to-paper-700 will-change-transform border border-literary-gold/20"
        >
          <AboutItem />
        </BentoItem>
      </BentoGrid>
    </div>
  );
}
