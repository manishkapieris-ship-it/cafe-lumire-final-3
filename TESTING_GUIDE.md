## 🚀 STEP-BY-STEP TESTING GUIDE

### ⚠️ IMPORTANT: Browser Cache Issue

Your browser may be caching old versions of the pages. Follow these steps EXACTLY:

---

## 🧹 STEP 1: Clear Everything (REQUIRED)

### Option A: Chrome/Edge/Firefox
1. Press **Ctrl + Shift + Delete** (Windows) or **Cmd + Shift + Delete** (Mac)
2. Select **All Time**
3. Check:
   - ✅ Cookies and other site data
   - ✅ Cached images and files
4. Click **Clear data**
5. **Close the browser completely** (not just the tab)
6. **Reopen the browser**

### Option B: Clear Using DevTools
1. Open DevTools: **F12**
2. Go to **Application** tab
3. **LocalStorage** → Right-click → **Clear All**
4. **SessionStorage** → Right-click → **Clear All**
5. Close DevTools
6. Close browser completely
7. Reopen browser

---

## 🧪 STEP 2: Test Without Login

### Test 1: Try to visit menu.html
1. In the address bar, type: `menu.html`
2. **Expected Result:**
   - ❌ Menu page should NOT load
   - ✅ Should redirect to `login.html`
   - ✅ You should see login form with email/password fields

### If menu.html loads:
- Browser still has old cache
- Repeat Step 1 (Clear Browser Cache)
- Try again

---

## ✅ STEP 3: Test Login

### Test 2: Log in with demo account
1. On login page, enter:
   - **Email:** admin@example.com
   - **Password:** 1234
2. Click **Login** button
3. **Expected Result:**
   - ✅ Success message appears
   - ✅ Automatically redirects to menu.html
   - ✅ Menu page now loads with coffee & bakery items

### If login button doesn't work:
- Check browser console (F12 → Console)
- Look for red error messages
- Report the error message

---

## 🔍 STEP 4: Verify Storage

### Check if login was stored correctly
1. Press **F12** to open DevTools
2. Go to **Application** tab
3. Click **LocalStorage** → (your website URL)
4. **You should see:**
   - ✅ Key: `loggedIn` → Value: `true`
5. Click **SessionStorage** → (your website URL)
6. **You should see:**
   - ✅ Key: `loggedIn` → Value: `user` (or `guest` if guest login)
   - ✅ Key: `userName` → Value: `admin@example.com`

---

## 🧭 STEP 5: Test Navigation

### Test 3: Navigate to other pages
1. Now that you're logged in, try clicking on navbar links:
   - Click **Home** → Should load home.html ✅
   - Click **About** → Should load about.html ✅
   - Click **Menu** → Should load menu.html ✅
   - Click **Cart** → Should load cart.html ✅
   - Click **Booking** → Should load booking.html ✅

### If pages still ask to login:
- Sessions might have expired
- Login again
- Check console for errors

---

## 🚪 STEP 6: Test Logout Behavior

### Test 4: Session expiry
1. Close the browser **completely**
2. Reopen the browser
3. Try to visit menu.html
4. **Expected Result:**
   - ❌ Should redirect to login.html
   - ✅ You need to login again (sessionStorage cleared)

### Why this happens:
- `localStorage` persists (keeps you signed in)
- But `sessionStorage` clears when you close the browser
- Auth check requires BOTH to be valid

---

## 📋 CHECKLIST: What Should Work

After following all steps above:

- ✅ Can't access menu.html without login
- ✅ Can't access home.html without login
- ✅ Can't access about.html without login
- ✅ Can't access booking.html without login
- ✅ Can't access cart.html without login
- ✅ Login redirects to correct page
- ✅ localStorage shows `loggedIn = true`
- ✅ sessionStorage shows `loggedIn = user/guest/google/facebook/twitter`
- ✅ All navbar links work after login
- ✅ Closing browser requires login again

---

## 🐛 TROUBLESHOOTING

### Problem: Pages still load without login

**Solution:**
1. Restart your browser completely (don't just refresh)
2. Clear cache (Ctrl+Shift+Delete)
3. Clear localStorage/sessionStorage (F12 → Application)
4. Hard refresh (Ctrl+Shift+R)
5. Try again

### Problem: Login button doesn't work

**Solution:**
1. Open DevTools (F12)
2. Click **Console** tab
3. Look for red error messages
4. Take screenshot of error
5. Check that `images/` folder exists

### Problem: Login works but pages still redirect

**Solution:**
1. Check DevTools (F12) → Application
2. Verify `localStorage.loggedIn = "true"`
3. Verify `sessionStorage.loggedIn = "user"`
4. If missing, login again
5. Hard refresh (Ctrl+Shift+R)

### Problem: Redirect loop (keeps going to login)

**Solution:**
1. Open DevTools Console (F12 → Console)
2. Run this command:
   ```javascript
   localStorage.setItem("loggedIn", "true");
   sessionStorage.setItem("loggedIn", "user");
   ```
3. Refresh page
4. Should load now

---

## 🔧 Advanced: Manual Testing via Console

If you want to test storage directly:

```javascript
// Check current status
console.log("Logged In:", localStorage.getItem("loggedIn"));
console.log("User Type:", sessionStorage.getItem("loggedIn"));

// Simulate login
localStorage.setItem("loggedIn", "true");
sessionStorage.setItem("loggedIn", "user");
sessionStorage.setItem("userName", "Test User");

// Simulate guest login
localStorage.setItem("loggedIn", "true");
sessionStorage.setItem("loggedIn", "guest");
sessionStorage.setItem("guestName", "Guest User");

// Clear everything
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

## 📝 What's Protected Now

### Pages that REQUIRE login:
- `home.html` ✅ Protected
- `index.html` ✅ Protected
- `menu.html` ✅ Protected
- `about.html` ✅ Protected
- `cart.html` ✅ Protected
- `booking.html` ✅ Protected

### Pages that DON'T require login:
- `login.html` - Login page (accessible to all)
- `test-auth.html` - Test page (accessible to all)

---

## ✨ Summary

**What was changed:**
1. Added auth check script to all protected pages
2. Auth check runs in `<head>` (before page loads)
3. Added cache prevention meta tags
4. Uses simpler, more direct redirect logic
5. Checks both localStorage AND sessionStorage

**How it works:**
1. Page starts loading
2. Script in `<head>` executes immediately
3. Checks if `localStorage.loggedIn = "true"`
4. Checks if `sessionStorage.loggedIn` is valid user type
5. If both not true → redirects to login.html
6. If both true → page loads normally

**Expected behavior:**
- Without login → instant redirect to login.html
- With login → pages load normally
- After closing browser → need to login again (sessionStorage cleared)

---

## 🎯 Test Now!

Follow the steps above exactly:
1. **Clear browser cache** (Step 1)
2. **Try visiting menu.html** (Step 2)
3. **Should redirect to login.html** ✓
4. **Login with demo account** (Step 3)
5. **Should redirect back to menu.html** ✓
6. **Check storage** (Step 4)
7. **Navigate to other pages** (Step 5)

If all 7 steps work, authentication is working correctly!

---

**If it still doesn't work after following ALL these steps, please:**
1. Take screenshot of browser address bar
2. Take screenshot of DevTools Console (F12)
3. Take screenshot of DevTools Application tab showing storage
4. Report what's showing
