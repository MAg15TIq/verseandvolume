import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function DisclaimerPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontWeight: 700 }}>Disclaimer</h1>

        <div className="prose dark:prose-invert mx-auto">
          <p className="text-sm text-paper-600 dark:text-paper-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p className="mb-6">
            The information contained on the Verse & Volume website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>

          <h2>1. Website Content Disclaimer</h2>
          <p>
            The content on this website, including but not limited to text, graphics, images, and other material, is for informational and educational purposes only. The material on this site is provided with the understanding that Verse & Volume is not engaged in rendering professional advice or services.
          </p>

          <h2>2. Literary Content and Copyright</h2>
          <p>
            Verse & Volume presents a collection of literary works including poetry, prose, novels, and other written content. We make every effort to:
          </p>
          <ul>
            <li>Ensure proper attribution of all literary works</li>
            <li>Respect copyright and intellectual property rights</li>
            <li>Present works that are in the public domain or used with permission</li>
            <li>Provide accurate biographical and historical information about authors</li>
          </ul>
          <p>
            However, we cannot guarantee the complete accuracy of all attributions, dates, or biographical information. If you believe any content infringes on copyright or contains inaccurate information, please <Link href={`/${locale}/contact`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">contact us</Link> immediately.
          </p>

          <h2>3. Translation and Interpretation Disclaimer</h2>
          <p>
            Where translations are provided between English and Urdu, or interpretations of literary works are offered:
          </p>
          <ul>
            <li>Translations may not capture the full nuance and meaning of the original text</li>
            <li>Literary interpretations are subjective and may vary among readers and scholars</li>
            <li>We strive for accuracy but cannot guarantee perfect translation or interpretation</li>
            <li>Original language versions should be consulted for authoritative understanding</li>
          </ul>

          <h2>4. Educational Purpose</h2>
          <p>
            The content on this website is intended for educational, cultural, and literary appreciation purposes. It should not be used as:
          </p>
          <ul>
            <li>A substitute for professional literary analysis or academic research</li>
            <li>Authoritative source for scholarly citations without verification</li>
            <li>Commercial or professional advice of any kind</li>
            <li>Medical, legal, or psychological guidance (even when literary content touches on these themes)</li>
          </ul>

          <h2>5. Third-Party Content and Links</h2>
          <p>
            Our website may contain links to external websites, references to other literary works, or embedded content from third parties. We do not:
          </p>
          <ul>
            <li>Endorse or guarantee the accuracy of external content</li>
            <li>Control the content or availability of linked websites</li>
            <li>Accept responsibility for the content, privacy policies, or practices of external sites</li>
            <li>Warrant that external links will remain active or accessible</li>
          </ul>

          <h2>6. Third-Party Services Disclaimer</h2>
          <p>
            This website uses third-party services to enhance functionality and user experience. Please note:
          </p>
          <ul>
            <li>Third-party services are provided by external companies</li>
            <li>We do not endorse or guarantee the functionality or reliability of third-party services</li>
            <li>Third-party service content and functionality is not reviewed or approved by Verse & Volume</li>
            <li>We may receive benefits from third-party service partnerships</li>
            <li>Using third-party services is at your own risk</li>
          </ul>
          <p>
            We are not responsible for any issues, disputes, or problems arising from your interaction with third-party services.
          </p>

          <h2>7. Technical Disclaimer</h2>
          <p>
            While we strive to maintain the website&rsquo;s functionality and security:
          </p>
          <ul>
            <li>We cannot guarantee uninterrupted access to the website</li>
            <li>Technical issues, server downtime, or maintenance may affect availability</li>
            <li>We are not responsible for any technical problems with your device or internet connection</li>
            <li>Website features may not work identically across all browsers and devices</li>
          </ul>

          <h2>8. User-Generated Content</h2>
          <p>
            If users are able to submit comments, reviews, or other content:
          </p>
          <ul>
            <li>User opinions do not reflect the views of Verse & Volume</li>
            <li>We do not verify the accuracy of user-submitted information</li>
            <li>Users are responsible for their own content and interactions</li>
            <li>We reserve the right to moderate or remove user content</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            In no event will Verse & Volume, its owner Dentist Hafsa Rehman <span className="font-bold italic">(Aima Khan)</span>, or any associated parties be liable for:
          </p>
          <ul>
            <li>Any direct, indirect, incidental, consequential, or punitive damages</li>
            <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
            <li>Any errors or omissions in content</li>
            <li>Any unauthorized access to or use of our servers and/or personal information</li>
            <li>Any interruption or cessation of transmission to or from our website</li>
          </ul>

          <h2>10. Professional Advice Disclaimer</h2>
          <p>
            The content on this website is not intended to be a substitute for professional advice. Always seek the advice of qualified professionals regarding:
          </p>
          <ul>
            <li>Academic research and scholarly citations</li>
            <li>Legal matters related to copyright or intellectual property</li>
            <li>Medical or psychological concerns that may arise from literary content</li>
            <li>Financial decisions related to book purchases or investments</li>
          </ul>

          <h2>11. Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website after any changes constitutes acceptance of the new disclaimer.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            This disclaimer is governed by and construed in accordance with applicable laws. Any disputes arising from the use of this website will be subject to the jurisdiction of appropriate courts.
          </p>

          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about this disclaimer or need to report content issues, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:legal@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">legal@verseandvolume.com</a></li>
            <li>Contact Form: <Link href={`/${locale}/contact`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Contact Us</Link></li>
          </ul>

          <p className="mt-8 text-sm text-paper-600 dark:text-paper-400">
            This disclaimer should be read in conjunction with our <Link href={`/${locale}/terms`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Terms and Conditions</Link> and <Link href={`/${locale}/privacy`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
