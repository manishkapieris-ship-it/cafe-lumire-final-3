## 🔐 Authentication Debug Guide

### Issue
User can still visit pages without logging in.

### Root Causes
1. **Browser Cache/Storage Not Working** - Old session data might exist
2. **JavaScript Not Running** - Auth check script might not execute
3. **Redirect Too Fast** - Browser might not complete redirect
4. **LocalStorage Issue** - Storage might be disabled or cleared

---

## ✅ How to Test

### Method 1: Use Test Page
1. Open `test-auth.html` in your browser
2. Click **"Clear All Storage"** button
3. Verify localStorage and sessionStorage are cleared
4. Click **"Go to Menu"** - should redirect to login
5. Fill login form and submit
6. Should redirect back to menu

### Method 2: Manual Testing

**Step 1: Clear Browser Storage**
```
1. Open DevTools (F12 or Right-click → Inspect)
2. Go to Application tab
3. Clear LocalStorage
4. Clear SessionStorage
5. Close DevTools
```

**Step 2: Test Authentication**
```
1. Open: http://localhost:5500/menu.html
2. Should automatically redirect to login.html
3. If not redirected, check console for errors (F12 → Console)
```

**Step 3: Log In**
```
Login with demo account:
- Email: admin@example.com
- Password: 1234
```

**Step 4: Check Storage After Login**
```
1. Open DevTools (F12)
2. Go to Application tab
3. Check localStorage.loggedIn = "true"
4. Check sessionStorage.loggedIn = "user"
5. Try visiting menu.html again - should load normally
```

---

## 🐛 Common Issues & Fixes

### Issue: Pages still load without login
**Cause:** Old browser cache or storage not cleared

**Fix:**
```
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear all browser cache and cookies
3. Close and reopen browser
4. Test again
```

### Issue: Redirect loop (keeps going to login)
**Cause:** Login not setting storage properly

**Fix:**
```
1. Open DevTools → Console
2. Manually set: localStorage.setItem("loggedIn", "true")
3. Then: sessionStorage.setItem("loggedIn", "user")
4. Refresh page
```

### Issue: Login button doesn't work
**Cause:** Console JavaScript error

**Fix:**
```
1. Open DevTools → Console tab
2. Look for red error messages
3. Check that all HTML has proper closing tags
4. Check that all images exist (images/ folder)
```

---

## 📋 What's Protected

✅ **Requires Login:**
- `home.html` - Has auth check in `<head>`
- `index.html` - Has auth check in `<head>`
- `menu.html` - Has auth check in `<head>`
- `about.html` - Has auth check in `<head>`
- `cart.html` - Has auth check in `<body>`
- `booking.html` - Has auth check in `<body>`

🔓 **Open to All:**
- `login.html` - Login page (no auth check)
- `test-auth.html` - Testing page (no auth check)

---

## 🔧 Technical Details

### Authentication Check Code
```javascript
// This runs immediately when page loads
(function() {
  try {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const isGuest = sessionStorage.getItem("loggedIn") === "guest";
    const socialLogin = ["google", "facebook", "twitter"]
      .includes(sessionStorage.getItem("loggedIn"));
    
    console.log("Auth check - loggedIn:", isLoggedIn, "guest:", isGuest);
    
    if (!isLoggedIn && !isGuest && !socialLogin) {
      console.log("Not authenticated. Redirecting to login.");
      window.location.replace("login.html");
    }
  } catch(e) {
    console.error("Auth check error:", e);
  }
})();
```

### Storage Requirements
**localStorage:**
- `loggedIn = "true"` (indicates user has logged in at some point)

**sessionStorage:**
- `loggedIn = "user"` | `"guest"` | `"google"` | `"facebook"` | `"twitter"`
- `userName = "User Name"`
- `guestName = "Guest Name"` (if guest login)

---

## 🎯 Login Methods Working

✅ **Email/Password Login**
```
Demo Account:
Email: admin@example.com
Password: 1234

Sets:
- localStorage.loggedIn = "true"
- sessionStorage.loggedIn = "user"
- sessionStorage.userName = "admin@example.com"
```

✅ **Sign Up (Create Account)**
```
Form Fields:
- Full Name
- Email
- Password
- Confirm Password

Sets:
- localStorage.loggedIn = "true"
- sessionStorage.loggedIn = "user"
- sessionStorage.userName = "Full Name"
```

✅ **Guest Login**
```
Form Fields:
- Full Name
- Gender (Male/Female)

Sets:
- localStorage.loggedIn = "true"
- sessionStorage.loggedIn = "guest"
- sessionStorage.guestName = "Full Name"
- sessionStorage.guestGender = "male" | "female"
```

✅ **Social Logins (Simulated)**
```
Google, Facebook, Twitter:
- Prompt for name
- Sets:
  - localStorage.loggedIn = "true"
  - sessionStorage.loggedIn = "google" | "facebook" | "twitter"
  - sessionStorage.userName = "Provided Name"
  - sessionStorage.userProvider = "Google" | "Facebook" | "Twitter"
```

---

## 🔍 Debugging Commands

**In Browser Console (F12 → Console):**

```javascript
// Check current auth status
console.log(localStorage.getItem("loggedIn"));
console.log(sessionStorage.getItem("loggedIn"));

// Simulate login
localStorage.setItem("loggedIn", "true");
sessionStorage.setItem("loggedIn", "user");
sessionStorage.setItem("userName", "Test User");

// Simulate guest
localStorage.setItem("loggedIn", "true");
sessionStorage.setItem("loggedIn", "guest");
sessionStorage.setItem("guestName", "Test Guest");

// Clear everything
localStorage.clear();
sessionStorage.clear();

// Refresh page
location.reload();

// Force redirect to login
window.location.href = "login.html";
```

---

## ✨ Expected Behavior

### Without Login
1. User visits `menu.html`
2. Auth check runs (in `<head>`)
3. Finds no valid login data
4. Immediately redirects to `login.html`
5. Login page loads with form

### After Successful Login
1. User fills login form
2. Clicks "Login" button
3. Storage gets updated
4. Success popup shows
5. Redirects to origin page (menu → menu, etc.)
6. Can now access all pages

### Session Management
1. **Session Storage:** Cleared when browser closes
2. **Local Storage:** Persists until manually cleared
3. **After Browser Close:** User needs to login again
4. **Guest Login:** Only valid for current session

---

## 📞 Support

If pages still load without login:
1. Use `test-auth.html` to clear storage
2. Hard refresh all pages (Ctrl+Shift+R)
3. Check browser console for errors (F12)
4. Clear browser cookies/cache
5. Test in incognito/private mode
6. Try different browser
7. Check if images folder exists (needed for login page)

---

**Last Updated:** November 14, 2025
**Status:** ✅ System Ready for Testing
