"use client";

import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  animateItems?: boolean;
}

export default function BentoGrid({
  children,
  className = '',
  animateItems = true
}: BentoGridProps) {
  return (
    <div className={`bento-grid ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<BentoItemProps>(child) && animateItems) {
          // Add staggered animation delay to each child
          return React.cloneElement(child, {
            animationDelay: `${index * 0.1}s`,
          } as Partial<BentoItemProps>);
        }
        return child;
      })}
    </div>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
  animationDelay?: string;
  decorationType?: 'none' | 'corner' | 'border' | 'pattern' | 'folded-corner' | 'paper-texture';
}

export function BentoItem({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
  animationDelay = '0s',
  decorationType = 'none'
}: BentoItemProps) {
  const colSpanClasses = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-3',
    4: 'col-span-1 md:col-span-4',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-1 md:row-span-2',
    3: 'row-span-1 md:row-span-3',
    4: 'row-span-1 md:row-span-4',
  };

  // Decoration classes based on type
  const decorationClasses = {
    'none': '',
    'corner': 'before:content-[""] before:absolute before:top-0 before:left-0 before:w-8 before:h-8 before:border-t before:border-l before:border-paper-300 dark:before:border-paper-700 before:rounded-tl-md',
    'border': 'ring-1 ring-paper-300 dark:ring-paper-700 ring-inset',
    'pattern': 'bg-paper-pattern bg-opacity-5 dark:bg-opacity-5',
    'folded-corner': 'after:content-[""] after:absolute after:top-0 after:right-0 after:w-0 after:h-0 after:border-t-[20px] after:border-r-[20px] after:border-t-paper-300 after:border-r-paper-300 dark:after:border-t-paper-700 dark:after:border-r-paper-700 after:shadow-sm',
    'paper-texture': 'before:content-[""] before:absolute before:inset-0 before:bg-paper-texture before:opacity-[0.03] before:mix-blend-overlay before:pointer-events-none dark:before:opacity-[0.05]'
  };

  return (
    <div
      className={`bento-item ${colSpanClasses[colSpan]} ${rowSpanClasses[rowSpan]} ${decorationClasses[decorationType]} animate-fade-in hover:animate-none ${className}`}
      style={{
        animationDelay,
        animationFillMode: 'both'
      }}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
