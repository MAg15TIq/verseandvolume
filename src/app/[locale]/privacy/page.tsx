import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function PrivacyPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontWeight: 700 }}>Privacy Policy</h1>

        <div className="prose dark:prose-invert mx-auto">
          <p className="text-sm text-paper-600 dark:text-paper-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p className="mb-6">
            At Verse & Volume, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2>1. Information We Collect</h2>
          <h3>1.1 Personal Data</h3>
          <p>
            We may collect the following types of personal data:
          </p>
          <ul>
            <li><strong>Contact Information:</strong> Email address (if you subscribe to our newsletter or contact us)</li>
            <li><strong>User Preferences:</strong> Reading history, bookmarks, and display preferences</li>
            <li><strong>Usage Data:</strong> Information about how you use our website</li>
          </ul>

          <h3>1.2 Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Time and date of your visit</li>
            <li>Pages you viewed</li>
            <li>Time spent on pages</li>
            <li>Referring website</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect for the following purposes:
          </p>
          <ul>
            <li>To provide and maintain our website</li>
            <li>To notify you about changes to our website</li>
            <li>To allow you to participate in interactive features when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our website</li>
            <li>To monitor the usage of our website</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To send you newsletters if you have subscribed</li>
            <li>To personalize your experience</li>
          </ul>

          <h2>3. Website Analytics</h2>
          <p>
            We use Google Analytics to understand how visitors interact with our website. This helps us improve our content and user experience. Google Analytics uses cookies and other tracking technologies to collect information about your usage patterns.
          </p>
          <p>
            <strong>Google Analytics Data Collection:</strong>
          </p>
          <ul>
            <li>Google Analytics collects data about your visits to help us understand website usage patterns</li>
            <li>This includes pages visited, time spent on site, and general demographic information</li>
            <li>Data collected may include your IP address, browser type, device information, and browsing behavior</li>
            <li>This data helps us understand how visitors use our website and improve user experience</li>
          </ul>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
          <p>
            We use the following types of cookies:
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
            <li><strong>Preference Cookies:</strong> Allow the website to remember choices you make (such as dark mode preference)</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
            <li><strong>Third-Party Cookies:</strong> Set by external services like Google Analytics for website analytics</li>
          </ul>
          <p>
            For more detailed information about our cookie usage, please see our <Link href={`/${locale}/cookies`} className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">Cookie Policy</Link>.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
          </p>
          <p>
            We will also retain usage data for internal analysis purposes. Usage data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our website, or we are legally obligated to retain this data for longer periods.
          </p>

          <h2>6. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>

          <h2>7. Your Data Protection Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal data, including:
          </p>
          <ul>
            <li>The right to access, update, or delete the information we have on you</li>
            <li>The right of rectification (to correct information)</li>
            <li>The right to object (to processing of your data)</li>
            <li>The right of restriction (to limit processing of your data)</li>
            <li>The right to data portability (to receive a copy of your data)</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            If you wish to exercise any of these rights, please contact us at <a href="mailto:privacy@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">privacy@verseandvolume.com</a>.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party&rsquo;s site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h2>9. Children&rsquo;s Privacy</h2>
          <p>
            Our website is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us so that we can take necessary actions.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">privacy@verseandvolume.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
