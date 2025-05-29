import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontWeight: 700 }}>{t('navigation.about')}</h1>

        <div className="prose dark:prose-invert mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-2xl mb-2">Dentist Hafsa Rehman</h2>
            <p className="text-paper-600 dark:text-paper-400 mb-2">Bachelor in Dental Sciences</p>
            <p className="text-paper-600 dark:text-paper-400 mb-6">Founder & Curator <span className="font-bold italic">(Aima Khan)</span></p>

            <blockquote className="italic text-xl border-l-4 border-paper-400 dark:border-paper-600 pl-6 py-2 my-8 bg-paper-100 dark:bg-paper-900 rounded-r">
              &ldquo;Words have the power to transcend time, culture, and geography. At Verse & Volume, we&rsquo;ve created a sanctuary for literary souls—a place where the richness of Pakistani and Russian literature can be explored, celebrated, and preserved. Each poem, each story is a thread connecting us to our shared humanity. I invite you to journey with us through these carefully curated works and discover the beauty that lies within the written word.&rdquo;
            </blockquote>

            <div className="mt-8 text-left max-w-2xl mx-auto">
              <h3 className="text-xl mb-4 text-center">About Dentist Hafsa Rehman</h3>
              <p className="mb-4">
                Dentist Hafsa Rehman is a passionate dentist with a Bachelor&rsquo;s degree in Dental Sciences who discovered her calling in the preservation and celebration of literature. Known affectionately by her nickname <span className="font-bold italic">(Aima Khan)</span>, she brings a unique perspective to literary curation, combining her scientific background with a deep appreciation for the arts.
              </p>
              <p className="mb-4">
                Her journey from dentistry to literature began with a profound love for poetry and prose that transcended her professional training. Dentist Rehman believes that just as dental care preserves the health of our physical expression through speech, literature preserves the health of our cultural and emotional expression through words.
              </p>
              <p>
                With meticulous attention to detail—a skill honed through her dental practice—she curates each piece in the Verse & Volume collection, ensuring that every work maintains its authentic voice while being accessible to contemporary readers. Her vision is to create a bridge between the precision of science and the beauty of literature, making timeless works available to new generations of readers.
              </p>
            </div>
          </div>

          <p className="text-lg mb-6">
            Verse & Volume is a sophisticated literary platform dedicated to celebrating poetry and prose in both English and Urdu, with a special focus on Pakistani and Russian literature. Our mission is to create a digital space where literature can be experienced in its full depth and beauty, with careful attention to typography, readability, and cultural context.
          </p>

          <h2>Our Vision</h2>
          <p>
            We believe that literature transcends boundaries of language, culture, and time. By presenting works in both English and Urdu, we aim to bridge cultural divides and showcase the rich literary traditions of both languages. Our minimalist design philosophy puts the focus where it belongs: on the words themselves.
          </p>

          <h2>Features</h2>
          <ul>
            <li>Carefully typeset poetry and prose in both English and Urdu</li>
            <li>Bilingual presentation with side-by-side or toggle views</li>
            <li>Biographical information about authors</li>
            <li>Customizable reading experience with adjustable typography</li>
            <li>Dark mode for comfortable reading in any environment</li>
            <li>Responsive design that works on any device</li>
            <li>Audio playback for selected works</li>
          </ul>

          <h2>Our Collection</h2>
          <p>
            Our growing collection includes classic and contemporary works from renowned poets and authors, with particular emphasis on Pakistani and Russian literary traditions. We carefully select pieces that showcase the depth, beauty, and diversity of literary expression across cultures and languages.
          </p>

          <h2>Our Team</h2>
          <p>
            Verse & Volume was founded in 2024 by Dentist Hafsa Rehman <span className="font-bold italic">(Aima Khan)</span>, a passionate advocate for literary preservation and cross-cultural understanding. With her background in dental sciences, she brings a unique analytical approach to literary curation, ensuring precision and care in every selection. Our team consists of literature enthusiasts, translators, and digital designers committed to creating an exceptional reading experience.
          </p>

          <h2>Contact Us</h2>
          <p>
            We welcome feedback, suggestions, and contributions from our readers. If you&rsquo;d like to get in touch, please visit our <Link href={`/${locale}/contact`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Contact page</Link> or email us at <a href="mailto:contact@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">contact@verseandvolume.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
