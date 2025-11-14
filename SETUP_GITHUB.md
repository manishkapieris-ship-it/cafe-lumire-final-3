# 🚀 Setup Guide for GitHub Pages & Live Server

## Issues Fixed ✅

1. **Syntax Error in `Js/main.js`** - Fixed corrupted file start (`cop//` removed)
2. **File structure is now correct** - All relative paths will work

## For GitHub Pages Deployment

### Step 1: Ensure Your Repository Structure
Your folder structure should be:
```
cafe-lumire-final-3/
├── index.html
├── menu.html
├── cart.html
├── login.html
├── about.html
├── booking.html
├── css/
│   └── style.css
├── Js/
│   └── main.js
├── images/
│   ├── logo.png
│   ├── americano.jpg
│   ├── (all other images)
│   └── ...
```

### Step 2: GitHub Pages Settings
1. Go to your GitHub repository settings
2. Find **Pages** section (left sidebar)
3. Set **Source** to: `Deploy from a branch`
4. Select **Branch**: `main`
5. Select **Folder**: `/ (root)`
6. Click **Save**

### Step 3: Wait for Deployment
- GitHub will deploy your site in ~1-2 minutes
- Your site will be available at: `https://manishkapieris-ship-it.github.io/cafe-lumire-final-3/`

## For Live Server (Local Testing)

### Method 1: VS Code Live Server
1. Install extension: **Live Server** by Ritwick Dey
2. Right-click `index.html`
3. Click "Open with Live Server"
4. Your site opens at `http://localhost:5500`

### Method 2: Python (If you have Python installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then visit: `http://localhost:8000`

## Important Notes ⚠️

- ✅ All links are relative (no leading `/`) - works on GitHub Pages
- ✅ CSS and JS paths are correct
- ✅ Image paths use `images/` prefix
- ✅ localStorage/sessionStorage works on both platforms
- ⚠️ CORS restrictions may apply with some third-party APIs on GitHub Pages

## Testing Checklist

- [ ] Home page loads correctly
- [ ] Menu page loads and buttons work
- [ ] "Add to Cart" buttons trigger login check
- [ ] Cart page loads and cart operations work
- [ ] Login/Signup forms function
- [ ] Images display properly
- [ ] CSS styling applies correctly
- [ ] Navigation links work between pages

## If Something Still Doesn't Work

1. **Check Browser Console** (F12 → Console tab)
   - Look for red error messages
   - JavaScript console logs will help debug

2. **Clear Cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check Network Tab** (F12 → Network tab)
   - Verify all files are loading (green status codes)
   - Red status means missing files

## File Case Sensitivity

⚠️ **Important**: GitHub Pages is case-sensitive for file names!
- ✅ `Js/main.js` - Correct (capital J)
- ❌ `js/main.js` - Will fail on GitHub Pages
- Make sure all imports match your actual file names exactly

---

**Your site is now ready for GitHub Pages! 🎉**
