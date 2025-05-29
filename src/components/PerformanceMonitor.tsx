"use client";

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
  totalBlockingTime: number;
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: Partial<PerformanceMetrics>) => void;
  enableLogging?: boolean;
}

export default function PerformanceMonitor({ 
  onMetricsUpdate, 
  enableLogging = false 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    setIsVisible(process.env.NODE_ENV === 'development' || enableLogging);

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const newMetrics: Partial<PerformanceMetrics> = {};

      // Basic load time
      if (navigation) {
        newMetrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
      }

      // Paint metrics
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        newMetrics.firstContentfulPaint = fcp.startTime;
      }

      // Web Vitals
      if ('web-vitals' in window) {
        // This would require the web-vitals library
        // For now, we'll use Performance Observer API
      }

      // Use Performance Observer for more metrics
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            newMetrics.largestContentfulPaint = lastEntry.startTime;
            setMetrics(prev => ({ ...prev, largestContentfulPaint: lastEntry.startTime }));
            onMetricsUpdate?.({ ...newMetrics, largestContentfulPaint: lastEntry.startTime });
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
          console.warn('LCP observer not supported:', error);
        }

        // Cumulative Layout Shift
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            newMetrics.cumulativeLayoutShift = clsValue;
            setMetrics(prev => ({ ...prev, cumulativeLayoutShift: clsValue }));
            onMetricsUpdate?.({ ...newMetrics, cumulativeLayoutShift: clsValue });
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.warn('CLS observer not supported:', error);
        }

        // First Input Delay
        try {
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              newMetrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
              setMetrics(prev => ({ ...prev, firstInputDelay: newMetrics.firstInputDelay }));
              onMetricsUpdate?.({ ...newMetrics, firstInputDelay: newMetrics.firstInputDelay });
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (error) {
          console.warn('FID observer not supported:', error);
        }
      }

      setMetrics(prev => ({ ...prev, ...newMetrics }));
      onMetricsUpdate?.(newMetrics);

      if (enableLogging) {
        console.log('Performance Metrics:', newMetrics);
      }
    };

    // Collect initial metrics
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    // Memory usage monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (enableLogging) {
          console.log('Memory Usage:', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
          });
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 30000); // Every 30 seconds

    // Network monitoring
    const monitorNetwork = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (enableLogging) {
          console.log('Network Info:', {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData
          });
        }
      }
    };

    monitorNetwork();

    return () => {
      window.removeEventListener('load', collectMetrics);
      clearInterval(memoryInterval);
    };
  }, [onMetricsUpdate, enableLogging]);

  // Format metrics for display
  const formatMetric = (value: number | undefined, unit: string = 'ms') => {
    if (value === undefined) return 'N/A';
    return `${Math.round(value)}${unit}`;
  };

  const getMetricColor = (metric: string, value: number | undefined) => {
    if (value === undefined) return 'text-gray-500';
    
    switch (metric) {
      case 'fcp':
        return value < 1800 ? 'text-green-600' : value < 3000 ? 'text-yellow-600' : 'text-red-600';
      case 'lcp':
        return value < 2500 ? 'text-green-600' : value < 4000 ? 'text-yellow-600' : 'text-red-600';
      case 'cls':
        return value < 0.1 ? 'text-green-600' : value < 0.25 ? 'text-yellow-600' : 'text-red-600';
      case 'fid':
        return value < 100 ? 'text-green-600' : value < 300 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-gray-700';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Performance Metrics
      </h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Load Time:</span>
          <span className={getMetricColor('load', metrics.loadTime)}>
            {formatMetric(metrics.loadTime)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">FCP:</span>
          <span className={getMetricColor('fcp', metrics.firstContentfulPaint)}>
            {formatMetric(metrics.firstContentfulPaint)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">LCP:</span>
          <span className={getMetricColor('lcp', metrics.largestContentfulPaint)}>
            {formatMetric(metrics.largestContentfulPaint)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">CLS:</span>
          <span className={getMetricColor('cls', metrics.cumulativeLayoutShift)}>
            {formatMetric(metrics.cumulativeLayoutShift, '')}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">FID:</span>
          <span className={getMetricColor('fid', metrics.firstInputDelay)}>
            {formatMetric(metrics.firstInputDelay)}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600 dark:text-gray-400">Status:</span>
          <span className="text-green-600">Monitoring</span>
        </div>
      </div>
    </div>
  );
}

// Hook for using performance metrics in components
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  
  const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
    setMetrics(prev => ({ ...prev, ...newMetrics }));
  };
  
  return { metrics, updateMetrics };
}
