# Cover Images Directory

This directory contains cover images for novels, books, and other literary works.

## Organization
- Each novel should have a cover image named after its ID
- Images should be in common formats (jpg, png, webp)
- Recommended size: 400x600px for optimal display
- Use consistent naming: `{book-id}.jpg` or `{book-id}.png`

## Current Status
**⚠️ ISSUE IDENTIFIED: Most cover images are missing!**

Currently only placeholder files exist:
- placeholder-cover.svg (fallback design)
- README.md (this file)

## Missing Covers for Major Books
The following books need cover images downloaded:

### English Novels
- pride-and-prejudice.jpg
- the-notebook.jpg
- a-walk-to-remember.jpg
- me-before-you.jpg
- crime-and-punishment-dostoevsky.jpg
- alice-adventures-in-wonderland.jpg

### Urdu Novels
- raja-gidh.jpg
- aag-ka-darya.jpg
- peer-e-kamil.jpg
- khuda-aur-mohabbat.jpg
- bachpan-ka-december.jpg
- pani-da-rang.jpg

### Additional Novels (50+ books)
- All additional novels in the collection need covers

## Solutions to Fix Missing Covers

### Option 1: Download from External Sources
1. Use the existing external URLs in the book data
2. Download and save locally for better performance
3. Ensure proper licensing/fair use

### Option 2: Create Custom Covers
1. Generate professional-looking covers using design tools
2. Use consistent typography and color schemes
3. Include title, author, and decorative elements

### Option 3: Use Open Source Covers
1. Find public domain or Creative Commons covers
2. Use book cover APIs (Open Library, Google Books)
3. Ensure proper attribution

## Implementation Steps
1. **Audit all books** - identify which have working covers vs missing
2. **Download existing external covers** - save locally for performance
3. **Generate missing covers** - create professional designs for books without covers
4. **Update book data** - ensure all books reference local cover files
5. **Test display** - verify covers show correctly on website

## Adding New Covers
1. Add the image file with the novel ID as filename
2. Update the novel's TypeScript file to reference the cover: `coverImage: '/images/covers/book-id.jpg'`
3. Test the display on the website
4. Ensure image is optimized (compressed, appropriate size)

## Cover Design Guidelines
- **Aspect Ratio**: 2:3 (width:height) - e.g., 400x600px
- **File Format**: JPG for photos, PNG for graphics with transparency
- **File Size**: Keep under 200KB for web performance
- **Quality**: High enough for clear display at various sizes
- **Style**: Professional, readable typography, appropriate imagery
