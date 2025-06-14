import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function CookiePolicyPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontWeight: 700 }}>Cookie Policy</h1>

        <div className="prose dark:prose-invert mx-auto">
          <p className="text-sm text-paper-600 dark:text-paper-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p className="mb-6">
            This Cookie Policy explains how Verse & Volume uses cookies and similar tracking technologies when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Verse & Volume) are called &ldquo;first-party cookies.&rdquo; Cookies set by parties other than the website owner are called &ldquo;third-party cookies.&rdquo; Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>

          <h2>2. Why Do We Use Cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> Some cookies are required for technical reasons for our website to operate</li>
            <li><strong>Functionality cookies:</strong> These allow us to remember choices you make and provide enhanced features</li>
            <li><strong>Analytics cookies:</strong> These help us understand how visitors interact with our website</li>
            <li><strong>Advertising cookies:</strong> These are used to make advertising messages more relevant to you and your interests</li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>
          
          <h3>3.1 Essential Cookies</h3>
          <p>
            These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.
          </p>
          <ul>
            <li><strong>Session cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Security cookies:</strong> Used to authenticate users and prevent fraudulent use of login credentials</li>
            <li><strong>Load balancing cookies:</strong> Help distribute traffic across our servers</li>
          </ul>

          <h3>3.2 Preference Cookies</h3>
          <p>
            These cookies allow our website to remember information that changes the way the website behaves or looks, such as your preferred language or the region you are in.
          </p>
          <ul>
            <li><strong>Language preference:</strong> Remembers your selected language (English/Urdu)</li>
            <li><strong>Theme preference:</strong> Remembers your dark/light mode selection</li>
            <li><strong>Reading preferences:</strong> Stores your font size and reading settings</li>
          </ul>

          <h3>3.3 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Tracks website usage and performance</li>
            <li><strong>Page view tracking:</strong> Monitors which pages are most popular</li>
            <li><strong>User behavior analysis:</strong> Helps us improve website functionality</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>
            We use third-party services that may set their own cookies to provide functionality and improve our website performance.
          </p>
          <p>
            <strong>Third-party services we use include:</strong>
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Helps us understand how visitors interact with our website</li>
            <li><strong>Grow by MediaVine:</strong> Provides website optimization and performance features</li>
            <li><strong>IDE:</strong> Used by Google DoubleClick to register and report website user actions after viewing or clicking ads</li>
            <li><strong>test_cookie:</strong> Used to check if the user&rsquo;s browser supports cookies</li>
          </ul>

          <h2>5. How Long Do Cookies Stay on My Device?</h2>
          <p>
            The length of time a cookie remains on your device depends on whether it is a &ldquo;persistent&rdquo; or &ldquo;session&rdquo; cookie:
          </p>
          <ul>
            <li><strong>Session cookies:</strong> These are temporary and are deleted when you close your browser</li>
            <li><strong>Persistent cookies:</strong> These remain on your device for a set period or until you delete them</li>
          </ul>
          <p>
            Most advertising cookies are persistent and may remain on your device for up to 2 years.
          </p>

          <h2>6. How Can You Control Cookies?</h2>
          <p>
            You have several options to control or limit how we and our partners use cookies:
          </p>

          <h3>6.1 Browser Settings</h3>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. You can set your browser to:
          </p>
          <ul>
            <li>Notify you when cookies are being set</li>
            <li>Block all cookies</li>
            <li>Block third-party cookies only</li>
            <li>Delete cookies when you close your browser</li>
          </ul>

          <h3>6.2 Opt-Out of Advertising Cookies</h3>
          <p>
            You can opt out of personalized advertising by visiting:
          </p>
          <ul>
            <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Google Ads Settings</a></li>
            <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Digital Advertising Alliance</a></li>
            <li><a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Your Online Choices (EU)</a></li>
          </ul>

          <h2>7. What Happens If You Disable Cookies?</h2>
          <p>
            If you choose to disable cookies, some features of our website may not function properly. Specifically:
          </p>
          <ul>
            <li>Your language and theme preferences will not be saved</li>
            <li>You may see less relevant advertisements</li>
            <li>Some interactive features may not work correctly</li>
            <li>We won&rsquo;t be able to remember your reading history or bookmarks</li>
          </ul>

          <h2>8. Updates to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:privacy@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">privacy@verseandvolume.com</a></li>
            <li>Contact Form: <Link href={`/${locale}/contact`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Contact Us</Link></li>
          </ul>

          <p className="mt-8 text-sm text-paper-600 dark:text-paper-400">
            For more information about our data practices, please see our <Link href={`/${locale}/privacy`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Privacy Policy</Link> and <Link href={`/${locale}/terms`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Terms and Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
