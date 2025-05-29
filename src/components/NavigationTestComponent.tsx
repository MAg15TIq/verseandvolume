"use client";

import { useEffect } from 'react';

/**
 * Test component to debug navigation issues
 * This component logs link clicks and navigation events to help identify issues
 */
export default function NavigationTestComponent() {
  useEffect(() => {
    // Log all link clicks
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        console.log('🔗 Link clicked:', {
          href: (link as HTMLAnchorElement)?.href,
          text: link?.textContent?.trim(),
          defaultPrevented: e.defaultPrevented,
          target: link,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Log navigation events
    const handleBeforeUnload = () => {
      console.log('🚀 Navigation starting...');
    };

    const handlePopState = (e: PopStateEvent) => {
      console.log('📍 Navigation completed:', {
        url: window.location.href,
        state: e.state,
        timestamp: new Date().toISOString()
      });
    };

    // Add event listeners
    document.addEventListener('click', handleLinkClick, true);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Log component mount
    console.log('🔧 Navigation test component mounted');

    // Cleanup
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      console.log('🔧 Navigation test component unmounted');
    };
  }, []);

  return null; // This component doesn't render anything
}
