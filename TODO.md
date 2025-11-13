# Fix Add to Cart Functionality - TODO List

## Tasks Completed:

- [x] Remove redundant inline script from menu.html that interferes with Add to Cart
- [x] Remove redundant inline script from cart.html that interferes with checkout
- [x] Fix case-sensitive file path issue for GitHub Pages deployment

## What Was Fixed:

### Problem 1: Conflicting Event Listeners
The "Add to Cart" buttons were not working because there were **conflicting event listeners** in both menu.html and cart.html that were calling `e.preventDefault()`, which blocked the main.js event handlers from executing.

**Solution:**
1. **menu.html**: Removed the redundant inline script at the bottom that was adding duplicate event listeners to all `.add-cart` buttons
2. **cart.html**: Removed the redundant inline script that was interfering with the checkout process

### Problem 2: Case-Sensitive File Paths (GitHub Pages Issue)
When deployed on GitHub Pages (Linux server), the JavaScript wasn't loading because the HTML files referenced `js/main.js` (lowercase) but the actual folder is named `Js` (capital J). Windows is case-insensitive so it worked locally, but Linux servers are case-sensitive.

**Solution:**
Fixed all JavaScript file references in:
- menu.html: Changed `js/main.js` → `Js/main.js`
- cart.html: Changed `js/main.js` → `Js/main.js`
- booking.html: Changed `js/main.js` → `Js/main.js`

### How It Works Now:
- Login protection is still active via the `<script>` block in the `<head>` section of pages
- The main.js file now handles all Add to Cart functionality without interference:
  - Coffee items (with `.coffee-btn` class) open the customization modal
  - Bakery items (with `.add-cart` class only) are added directly to cart
  - Items are properly stored in localStorage
  - Toast notifications appear when items are added
- JavaScript now loads correctly on both local server AND GitHub Pages

## Testing Instructions:

1. Open `login.html` and log in (or use guest login)
2. Navigate to `menu.html`
3. Test Coffee Items:
   - Click "Add to Cart" on any coffee item
   - Customization modal should appear
   - Adjust size and toppings
   - Click "Add to Cart" in modal
   - Toast notification should appear
4. Test Bakery Items:
   - Click "Add to Cart" on any bakery item
   - Item should be added directly
   - Toast notification should appear
5. Navigate to `cart.html`
   - All added items should be displayed
   - Quantities and prices should be correct
   - Cart total should be accurate
6. Test checkout functionality to ensure it still works

## Files Modified:
- menu.html (removed conflicting inline script + fixed JS path)
- cart.html (removed conflicting inline script + fixed JS path)
- booking.html (fixed JS path)
- Js/main.js (no changes needed - already working correctly)

## Deployment Note:
The site should now work correctly on both:
- ✅ Local development server (Live Server)
- ✅ GitHub Pages / any Linux-based hosting
