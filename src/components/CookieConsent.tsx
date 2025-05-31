'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
}

export default function CookieConsent() {
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    functional: true,
    analytics: true,
    advertising: true,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };

  const handleAcceptAll = () => {
    const consentData = {
      essential: true,
      functional: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);
    
    // Enable all tracking
    enableTracking(consentData);
  };

  const handleRejectAll = () => {
    const consentData = {
      essential: true, // Essential cookies cannot be rejected
      functional: false,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);
    
    // Disable non-essential tracking
    enableTracking(consentData);
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      essential: true, // Always true
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowPreferences(false);
    
    // Enable tracking based on preferences
    enableTracking(consentData);
  };

  const enableTracking = (consent: any) => {
    // This function would integrate with your analytics and advertising scripts
    // For now, we'll just log the consent choices
    console.log('Cookie consent updated:', consent);
    
    // Example: Enable/disable Google Analytics
    if (consent.analytics && typeof window !== 'undefined') {
      // Enable Google Analytics
      (window as any).gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
    
    // Example: Enable/disable Google AdSense
    if (consent.advertising && typeof window !== 'undefined') {
      // Enable advertising cookies
      (window as any).gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
        <div className="container mx-auto px-4 py-4">
          {!showPreferences ? (
            // Main banner
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  We Use Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
                  By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies. You can manage your preferences or learn more in our{' '}
                  <Link 
                    href={localizedPath('/cookies')} 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Cookie Policy
                  </Link>
                  {' '}and{' '}
                  <Link 
                    href={localizedPath('/privacy')} 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  Manage Preferences
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            // Preferences panel
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close preferences"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Essential Cookies */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Essential Cookies
                    </label>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 opacity-50"
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Required for the website to function properly. Cannot be disabled.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Functional Cookies
                    </label>
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => handlePreferenceChange('functional')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Remember your preferences like language and theme settings.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Analytics Cookies
                    </label>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>

                {/* Advertising Cookies */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Advertising Cookies
                    </label>
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={() => handlePreferenceChange('advertising')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Used by Google AdSense to serve personalized advertisements.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
