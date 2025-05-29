"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number; // 0 to 1, percentage of element visible to trigger
  delay?: number; // ms
  duration?: number; // ms
  distance?: string; // CSS value like '20px'
  origin?: 'top' | 'right' | 'bottom' | 'left';
  once?: boolean; // Only animate once
}

export default function ScrollReveal({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  duration = 500,
  distance = '20px',
  origin = 'bottom',
  once = true
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Skip animation if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    if (once && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, hasAnimated, prefersReducedMotion]);

  // Define transform based on origin
  const getTransform = () => {
    switch (origin) {
      case 'top':
        return `translateY(-${distance})`;
      case 'right':
        return `translateX(${distance})`;
      case 'bottom':
        return `translateY(${distance})`;
      case 'left':
        return `translateX(-${distance})`;
      default:
        return `translateY(${distance})`;
    }
  };

  const styles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0)' : getTransform(),
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    willChange: 'opacity, transform'
  };

  // If user prefers reduced motion, don't apply animation styles
  const finalStyles = prefersReducedMotion ? {} : styles;

  return (
    <div ref={ref} className={className} style={finalStyles}>
      {children}
    </div>
  );
}
