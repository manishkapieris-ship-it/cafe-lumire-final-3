# 🚀 Quick Start - Authentication System

## What You Can Do Now

### ✅ Users Can Browse Freely
Visit these pages WITHOUT logging in:
- Home page (`index.html`)
- About page (`about.html`)
- Menu page (`menu.html`) - View all items

### 🔒 Login Required to Order
When user tries to add items to cart:
- Redirects to login page
- User must log in (or continue as guest)
- Then redirected back to menu to complete order

### 🔐 Multiple Login Options

1. **Email & Password**
   - Test: `admin@example.com` / `1234`
   - Or create new account

2. **Continue as Guest**
   - Enter name + select gender
   - Instant access, no account needed

3. **Google / Facebook / Twitter**
   - Click the social icon
   - Enter name (demo/simulated)
   - Instant login

## 🧪 Try It Now

### Test Scenario: Order Coffee Without Account

```
1. Open menu.html in private window
   → Page loads (no login redirect) ✅

2. Click "Add to Cart" on any coffee
   → Redirects to login.html ✅

3. Click "Continue as Guest"
   → Enter name: "John"
   → Select gender: "Male"
   → Click "Confirm" ✅

4. Success! Redirected back to menu.html ✅

5. Click "Add to Cart" again
   → Modal opens (customize coffee) ✅

6. Customize and click "Add to Cart"
   → Toast shows "Added to cart ✓" ✅

7. Go to cart.html
   → Items display ✅
   → Can checkout ✅
```

## 📋 Login Options Summary

| Option | Account Needed | Speed | Details |
|--------|-----------------|-------|---------|
| Email/Password | Yes | 1 min | Use demo or sign up |
| Guest | No | 5 sec | Just name + gender |
| Google | No | 5 sec | Simulated (demo) |
| Facebook | No | 5 sec | Simulated (demo) |
| Twitter | No | 5 sec | Simulated (demo) |

## 🎯 Key Features

### 1. Smart Redirects
After login, you're sent back to:
- The menu (if you came from menu)
- The cart (if you came from cart)
- Home (if you started at home)

### 2. User Display
When logged in, navbar shows:
```
🔍 Google        ← Method
Jane Doe         ← Name
```

### 3. Session Management
- Login persists while browsing
- Logs out when browser closes (guest)
- Stays logged in (registered users)

### 4. Page Protection
- **Can visit freely:** Home, About, Menu
- **Need login:** Cart, Booking, Add to Cart
- **Redirects automatically** to login if needed

## 🔑 Test Credentials

### Email Login
```
Email: admin@example.com
Password: 1234
```

### Create New Account
1. Go to login page
2. Click "Sign Up" tab
3. Fill in: Name, Email, Password, Confirm Password
4. Click "Register"

## 🎮 Live Testing Steps

### Step 1: Test Free Browsing
```
1. Open https://[your-site]/menu.html
2. Scroll through items
3. ✅ NO redirect to login
```

### Step 2: Try Adding to Cart
```
1. Click "Add to Cart" on any item
2. ✅ Redirects to login page
```

### Step 3: Guest Login
```
1. Click "Continue as Guest"
2. Enter name: "Alex"
3. Select gender
4. Click "Confirm"
5. ✅ Redirected back to menu
```

### Step 4: Complete Order
```
1. Click "Add to Cart" again
2. ✅ Modal opens (no redirect)
3. Customize coffee
4. Click "Confirm"
5. ✅ Toast: "Added to cart ✓"
```

### Step 5: Checkout
```
1. Visit cart.html
2. ✅ See items
3. Increase/decrease quantities
4. Checkout ✅
```

## 📱 Works on All Devices

- ✅ Desktop browsers
- ✅ Tablets
- ✅ Mobile phones
- ✅ Touch-friendly
- ✅ Keyboard-friendly

## 🐛 If Something Doesn't Work

### Clear login data
Open browser console (F12) and run:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Check console for errors
Press F12 → Console tab → Look for red errors

### Verify login status
```javascript
console.log(localStorage.getItem("loggedIn"));
console.log(sessionStorage.getItem("loggedIn"));
```

## 🚀 Next Steps

### For Development
- Modify demo credentials in `login.html`
- Add real user database
- Integrate OAuth providers

### For Production
- Replace simulated social logins with real OAuth
- Add backend authentication
- Implement user profiles
- Store user data in database

## 💡 Tips

1. **Test in private window** - No previous login data
2. **Use different login methods** - Try each option
3. **Clear data between tests** - Start fresh
4. **Check navbar** - See user display
5. **Open console** - See debug logs

## 📞 Quick Reference

| Action | Result |
|--------|--------|
| Visit menu.html | ✅ Loads (no login) |
| Click Add to Cart | → Redirect to login |
| Guest login | ✅ Access granted |
| Email login | ✅ Access granted |
| Social login | ✅ Access granted |
| Visit cart.html | → Redirect if not logged |
| Visit booking.html | → Redirect if not logged |

---

**Everything is ready to use!** 🎉

Start with menu.html and try adding items to your cart.
