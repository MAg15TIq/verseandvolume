import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontWeight: 700 }}>Terms and Conditions</h1>

        <div className="prose dark:prose-invert mx-auto">
          <p className="text-sm text-paper-600 dark:text-paper-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p className="mb-6">
            Welcome to Verse & Volume. These Terms and Conditions govern your use of the Verse & Volume website and services. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our website.
          </p>

          <h2>1. Definitions</h2>
          <ul>
            <li><strong>&ldquo;Website&rdquo;</strong> refers to Verse & Volume, accessible at verseandvolume.com</li>
            <li><strong>&ldquo;We&rdquo;, &ldquo;Us&rdquo;, &ldquo;Our&rdquo;</strong> refers to Verse & Volume, owned by Dentist Hafsa Rahman (Bachelor in Dental Sciences, known by nickname Aima Khan)</li>
            <li><strong>&ldquo;You&rdquo;, &ldquo;Your&rdquo;</strong> refers to the individual accessing or using the Website</li>
            <li><strong>&ldquo;Content&rdquo;</strong> refers to all literary works, including but not limited to poetry, prose, novels, and biographical information available on the Website</li>
            <li><strong>&ldquo;Services&rdquo;</strong> refers to all features and functionalities provided through the Website</li>
          </ul>

          <h2>2. Intellectual Property</h2>
          <p>
            The Website and its original content, features, and functionality are owned by Verse & Volume and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            The literary works presented on this Website may be subject to copyright protection. While we make these works available for personal, non-commercial use, we respect the intellectual property rights of authors and rights holders.
          </p>
          <p>
            For works in the public domain, we have made efforts to ensure proper attribution. For works under copyright protection, we have sought appropriate permissions or are presenting them under fair use principles.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Website.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Website and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            You agree not to use the Website:
          </p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any &ldquo;junk mail&rdquo;, &ldquo;chain letter,&rdquo; &ldquo;spam,&rdquo; or any other similar solicitation</li>
            <li>To impersonate or attempt to impersonate Verse & Volume, a Verse & Volume employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone&rsquo;s use or enjoyment of the Website, or which may harm Verse & Volume or users of the Website</li>
          </ul>

          <h2>5. Content Usage and Limitations</h2>
          <p>
            The Content on the Website is provided for your personal, non-commercial use only. You may:
          </p>
          <ul>
            <li>Read, view, or listen to the Content online</li>
            <li>Share links to the Content</li>
            <li>Use small excerpts of the Content for educational or review purposes, with proper attribution</li>
          </ul>
          <p>
            You may not:
          </p>
          <ul>
            <li>Reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the Content, except as permitted by these Terms</li>
            <li>Use the Content for commercial purposes</li>
            <li>Remove any copyright, trademark, or other proprietary notices from the Content</li>
            <li>Transfer the Content to another person or &ldquo;mirror&rdquo; the Content on any other server</li>
          </ul>

          <h2>6. Advertising and Google AdSense</h2>
          <p>
            Our Website displays advertisements through Google AdSense and other advertising partners. By using our Website, you acknowledge and agree to the following:
          </p>
          <ul>
            <li>Advertisements are provided by third-party advertisers and we do not endorse or guarantee the products or services advertised</li>
            <li>Google AdSense may use cookies and other tracking technologies to serve personalized advertisements based on your browsing behavior</li>
            <li>We may receive compensation from advertising partners when you interact with advertisements</li>
            <li>You interact with advertisements at your own risk and we are not responsible for any transactions or issues arising from such interactions</li>
            <li>Advertisement content is subject to the advertiser&rsquo;s own terms and conditions</li>
          </ul>
          <p>
            For more information about how Google AdSense collects and uses data, please review Google&rsquo;s Privacy Policy and AdSense Terms.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our Website may contain links to third-party websites or services that are not owned or controlled by Verse & Volume. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Verse & Volume shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
          </p>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Website immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
          <p>
            If you wish to terminate your account, you may simply discontinue using the Website, or notify us that you wish to delete your account.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            In no event shall Verse & Volume, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Website.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&rsquo; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Website after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Website.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction where Verse & Volume operates, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:legal@verseandvolume.com" className="text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100">legal@verseandvolume.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
