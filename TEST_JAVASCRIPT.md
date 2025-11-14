# JavaScript Testing Guide

## 🔧 What Was Fixed

1. **Removed corrupted `cop//` from main.js** ✅
2. **Moved login checks inside DOMContentLoaded** ✅ - This was causing crashes
3. **Removed early `<script>` tags from cart.html and booking.html** ✅
4. **All code now runs only AFTER DOM is ready** ✅
5. **Added proper error handling** ✅

## 🧪 How to Test

### Step 1: Open Browser Console
Press **F12** (or right-click → Inspect) → Click **Console** tab

### Step 2: Test on Each Page

#### **1. Home Page (index.html)**
- Open in browser
- Should see no errors in console
- Links should work

#### **2. Menu Page (menu.html)**
- Open in browser
- Try clicking "Add to Cart" on any coffee
- **Expected**: Should redirect to login (if not logged in)
- **Console should show**: "Coffee button clicked!" and "Not logged in - redirecting to login"

#### **3. Login Page (login.html)**
- Enter: `admin@example.com` and `1234`
- Click "Login"
- **Expected**: Should redirect to home page
- Check console for: "Welcome back ☕ Login successful!"

#### **4. After Login - Menu Page Again (menu.html)**
- Now try clicking "Add to Cart"
- **Expected**: Modal should open
- Console should show: "Coffee button clicked!" and "Opening modal for: Americano"

#### **5. Cart Page (cart.html)**
- After adding items, go to cart
- **Expected**: Cart items should display
- Can increase/decrease quantities
- Console should show: "Login check - loggedIn: true"

#### **6. Booking Page (booking.html)**
- Try accessing without login (use private/incognito window)
- **Expected**: Should redirect to login with message
- Console should show: "Access denied - redirecting to login"

### Step 3: Check Console for Errors
Look for **red error messages**. Common ones to ignore:
- ❌ 404 errors on images (if images are missing)
- ✅ Everything else should NOT have errors

### Step 4: Test Toast Notifications
- Add item to cart
- **Expected**: Green notification appears saying "Item added to cart ✓"
- Toast should disappear after 2 seconds

### Step 5: Test on Live Server
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Follow steps 1-6 above
4. Should work exactly the same

## 📋 Expected Console Logs (Normal)

When loading menu.html:
```
JS connected properly!
DOM ready state: loading (or interactive)
Window location: http://localhost:5500/menu.html
Current page: menu.html
localStorage loggedIn: null (or true after login)
sessionStorage loggedIn: null (or guest/user)
Menu page - allowing browsing
```

When NOT logged in and clicking "Add to Cart":
```
Coffee button clicked!
Login check for coffee - loggedIn: false guest: false
Not logged in - redirecting to login
```

When logged in and clicking "Add to Cart":
```
Coffee button clicked!
Login check for coffee - loggedIn: true guest: false
Logged in - opening modal
Opening modal for: Americano price: 500
```

## ⚠️ If Something Still Doesn't Work

1. **Hard refresh browser**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear localStorage**: Open console and run:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   console.log("Cleared all storage");
   ```
3. **Close all tabs** of your site and reopen
4. **Check that script path is correct** in HTML: `<script src="Js/main.js"></script>`
   - Capital `J` in `Js` folder

## 🐛 Debug Mode

Run this in console to see all localStorage data:
```javascript
console.log("All Storage:", localStorage);
console.log("Cart:", JSON.parse(localStorage.getItem("cart") || "[]"));
```

Run this to manually set login (for testing):
```javascript
localStorage.setItem("loggedIn", "true");
sessionStorage.setItem("loggedIn", "user");
console.log("Logged in manually");
```

Run this to manually clear login:
```javascript
localStorage.removeItem("loggedIn");
sessionStorage.removeItem("loggedIn");
console.log("Logged out manually");
```

---

**All JavaScript should now work on GitHub Pages and Live Server!** 🎉
