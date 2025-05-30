# 📚 COVER IMAGES TO DOWNLOAD

## 🔥 CRITICAL PRIORITY (Broken URLs Fixed)

These novels had broken external URLs that have been fixed to local paths. **Download these first:**

### **Urdu Novels:**
1. **bachpan-ka-december.jpg** - Bachpan ka December by Hashim Nadeem
2. **jannat-ke-pattay.jpg** - Jannat ke Pattay by Nimra Ahmad  
3. **khuda-aur-mohabbat.jpg** - Khuda Aur Mohabbat by Hashim Nadeem

### **English Novels:**
4. **alice-adventures-in-wonderland.jpg** - Alice's Adventures in Wonderland by Lewis Carroll

### **Additional Novels:**
5. **yaqeen-e-mohabbat.jpg** - Yaqeen e Mohabbat
6. **ishq-ka-sheen.jpg** - Ishq ka Sheen
7. **mere-humdam-mere-dost.jpg** - Mere Humdam Mere Dost

### **Urdu Love Novels (Sample Fixed):**
8. **mohabbat-ki-sada.jpg** - Mohabbat ki Sada
9. **dil-ki-kahani.jpg** - Dil ki Kahani

---

## 📋 MEDIUM PRIORITY (Local Paths Set, Need Images)

These novels already have correct local paths but may need actual image files:

### **English Love Novels (Check if images exist):**
- **outlander.jpg** - Outlander by Diana Gabaldon
- **the-time-travelers-wife.jpg** - The Time Traveler's Wife
- **the-kiss-quotient.jpg** - The Kiss Quotient
- **red-white-and-royal-blue.jpg** - Red, White & Royal Blue
- **the-seven-husbands-of-evelyn-hugo.jpg** - The Seven Husbands of Evelyn Hugo
- **beach-read.webp** - Beach Read (note: .webp format)
- **the-hating-game.png** - The Hating Game (note: .png format)
- **eleanor-oliphant-is-completely-fine.jpg** - Eleanor Oliphant Is Completely Fine
- **the-unhoneymooners.jpg** - The Unhoneymooners
- **the-spanish-love-deception.jpg** - The Spanish Love Deception
- **people-we-meet-on-vacation.jpg** - People We Meet on Vacation
- **the-flatshare.jpg** - The Flatshare
- **the-kiss-of-deception.jpg** - The Kiss of Deception

---

## 🔄 FUTURE WORK (External URLs Still Need Fixing)

These novels still have external URLs that should be converted to local paths:

### **Urdu Love Novels (~40+ novels):**
All novels in `src/data/novels/authors/urdu-love-novels.ts` with URLs like:
- `https://upload.wikimedia.org/wikipedia/commons/thumb/...`

### **English Love Novels:**
Most novels in `src/data/novels/authors/english-love-novels.ts` appear to have correct local paths already.

---

## 📁 SAVE LOCATION

Save all downloaded images to:
```
public/images/covers/
```

## 🎯 NAMING CONVENTION

- Use lowercase letters
- Replace spaces with hyphens (-)
- Use .jpg format (unless specified otherwise)
- Match the exact filename specified in the novel files

## ✅ VERIFICATION

After downloading, you can verify the fixes by:

1. Running the verification script:
   ```bash
   node scripts/verify-novel-fixes.js
   ```

2. Testing individual novel pages:
   - `/novels/bachpan-ka-december`
   - `/novels/jannat-ke-pattay`
   - `/novels/khuda-aur-mohabbat`
   - `/novels/alice-adventures-in-wonderland`

3. Checking the novels listing page for proper cover display

## 🚀 IMPACT

Fixing these cover images will:
- ✅ Resolve broken image displays
- ✅ Improve website performance (local vs external images)
- ✅ Ensure consistent user experience
- ✅ Prevent future broken links from external sources

---

**Total Critical Images Needed: 9**
**Total Medium Priority Images: ~15**
**Total Future Work: ~40+ images**
