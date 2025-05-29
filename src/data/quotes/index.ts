import { Quote } from '@/types';

// Import from organized structure
import { allQuotesByAuthor } from './authors';

// Main export using the organized structure
export const allQuotes: Quote[] = allQuotesByAuthor;

// Export individual collections for backward compatibility
export * from './authors';
