/**
 * Featured Artwork Management System
 * Handles the display and rotation of featured artwork images
 */

export interface ArtworkItem {
  id: string;
  title: string;
  artist: string;
  description?: string;
  imagePath: string;
  altText: string;
  category?: 'portrait' | 'landscape' | 'abstract' | 'literary';
  featured?: boolean;
}

// Featured artwork collection based on available images
export const featuredArtworkCollection: ArtworkItem[] = [
  {
    id: 'emily-dickinson-portrait',
    title: 'Emily Dickinson Portrait',
    artist: 'Literary Portrait Collection',
    description: 'A portrait of the renowned American poet Emily Dickinson, known for her reclusive nature and profound poetry.',
    imagePath: '/images/Featured Artwork/Emily_Dickinson.png',
    altText: 'Portrait of Emily Dickinson, American poet',
    category: 'portrait',
    featured: true
  },
  {
    id: 'featured-literary-image',
    title: 'Literary Inspiration',
    artist: 'Verse and Volume Collection',
    description: 'A featured image representing the essence of literature and poetry.',
    imagePath: '/images/Featured Artwork/Featured-Image.png',
    altText: 'Featured literary artwork',
    category: 'abstract',
    featured: true
  },
  {
    id: 'fyodor-dostoevsky-portrait',
    title: 'Fyodor Dostoevsky Portrait',
    artist: 'Literary Portrait Collection',
    description: 'A portrait of the great Russian novelist Fyodor Dostoevsky, author of Crime and Punishment.',
    imagePath: '/images/Featured Artwork/Fyodor-Dostoevsky.jpg',
    altText: 'Portrait of Fyodor Dostoevsky, Russian novelist',
    category: 'portrait',
    featured: true
  },
  {
    id: 'mirza-ghalib-portrait',
    title: 'Mirza Ghalib Portrait',
    artist: 'Literary Portrait Collection',
    description: 'A portrait of the legendary Urdu and Persian poet Mirza Ghalib.',
    imagePath: '/images/Featured Artwork/Mirza-Ghalib.jpg',
    altText: 'Portrait of Mirza Ghalib, Urdu poet',
    category: 'portrait',
    featured: true
  },
  {
    id: 'saadat-hasan-manto-portrait',
    title: 'Saadat Hasan Manto Portrait',
    artist: 'Literary Portrait Collection',
    description: 'A portrait of the influential Urdu short story writer Saadat Hasan Manto.',
    imagePath: '/images/Featured Artwork/Saadat-Hasan-Manto.jpg',
    altText: 'Portrait of Saadat Hasan Manto, Urdu writer',
    category: 'portrait',
    featured: true
  }
];

/**
 * Get a random featured artwork
 */
export function getRandomFeaturedArtwork(): ArtworkItem {
  const featuredItems = featuredArtworkCollection.filter(item => item.featured);
  const randomIndex = Math.floor(Math.random() * featuredItems.length);
  return featuredItems[randomIndex] || featuredArtworkCollection[0];
}

/**
 * Get artwork by ID
 */
export function getArtworkById(id: string): ArtworkItem | undefined {
  return featuredArtworkCollection.find(item => item.id === id);
}

/**
 * Get artwork by category
 */
export function getArtworkByCategory(category: string): ArtworkItem[] {
  return featuredArtworkCollection.filter(item => item.category === category);
}

/**
 * Get daily featured artwork (changes based on date)
 */
export function getDailyFeaturedArtwork(): ArtworkItem {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const featuredItems = featuredArtworkCollection.filter(item => item.featured);
  const index = dayOfYear % featuredItems.length;
  return featuredItems[index] || featuredArtworkCollection[0];
}

/**
 * Get all featured artwork
 */
export function getAllFeaturedArtwork(): ArtworkItem[] {
  return featuredArtworkCollection.filter(item => item.featured);
}

/**
 * Validate if artwork image exists (client-side check)
 */
export function validateArtworkImage(imagePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
}
