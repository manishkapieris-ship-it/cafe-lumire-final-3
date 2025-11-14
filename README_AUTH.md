# 🚀 Authentication System - Quick Reference

## ✅ What Works Now

### Browse Freely (No Login Needed)
- ✅ Home page
- ✅ About page  
- ✅ Menu page (view items)
- ✅ Landing pages

### Login Required (Checkout Protected)
- 🔒 Cart page
- 🔒 Booking/Reservation page
- 🔒 Add to Cart (when not logged in)

## 🔐 Login Methods

### 1️⃣ Email & Password
**Test Account:**
```
Email: admin@example.com
Password: 1234
```

**Create New Account:**
- Click "Sign Up" tab
- Fill in all fields
- Click "Register"

### 2️⃣ Continue as Guest
- Click "Continue as Guest" button
- Enter your name
- Select gender
- Click "Confirm"
- ✅ Access granted immediately

### 3️⃣ Social Media (Google/Facebook/Twitter)
- Click any social icon
- Enter your name/handle
- ✅ Logged in instantly

## 📍 User Flow Example

### Scenario: User wants to order coffee

```
1. Visit home.html
   ↓
2. Browse menu.html (no login needed)
   ↓
3. Click "Add to Cart"
   ↓
4. Redirect to login page (if not logged in)
   ↓
5. Login via any method:
   - Email/Password
   - Guest
   - Google/FB/Twitter
   ↓
6. Redirected back to menu.html
   ↓
7. Click "Add to Cart" again
   ↓
8. Modal opens, customize coffee
   ↓
9. Confirm and add to cart
   ↓
10. Go to cart.html
    ↓
11. Proceed to checkout
```

## 🧪 Quick Tests

### Test 1: Browse Without Login
```
1. Open new private window
2. Visit menu.html
3. ✅ No redirect
4. ✅ Can see all items
5. Try Add to Cart → Redirects to login ✅
```

### Test 2: Guest Login
```
1. Click "Continue as Guest"
2. Enter: Name="John", Gender="Male"
3. Click "Confirm"
4. ✅ Success message
5. ✅ Redirected back to menu
6. Try Add to Cart → ✅ Works now!
```

### Test 3: Email Login
```
1. Click "Sign In" tab
2. Email: admin@example.com
3. Password: 1234
4. Click "Login"
5. ✅ Success message
6. ✅ Redirected to menu or cart
```

### Test 4: Social Login
```
1. Click "Google" icon
2. Enter name: "Jane Doe"
3. ✅ "Welcome Jane Doe! Logged in with Google"
4. ✅ Navbar shows "🔍 Google" and name
```

### Test 5: Protected Pages
```
1. Private window (not logged in)
2. Try to visit cart.html → ✅ Redirects to login
3. Try to visit booking.html → ✅ Redirects to login
4. After login → ✅ Both pages accessible
```

## 🎨 User Info Display

When logged in, navbar shows:
```
🔍 Google          ← Login method
Jane Doe           ← User name
```

Or for guests:
```
👤 Guest           ← Guest status
John Doe           ← Guest name
```

Or for email:
```
📧 Email           ← Login method
admin@example.com  ← Email address
```

## 🧹 Clear Login Data

To test different login scenarios, clear data in console (F12):

```javascript
// Clear everything
localStorage.clear();
sessionStorage.clear();
location.reload();

// Or just log out
localStorage.removeItem("loggedIn");
sessionStorage.clear();
```

## 📱 Mobile Responsive

All login flows work on mobile:
- ✅ Small screens
- ✅ Touch events
- ✅ Keyboard friendly
- ✅ Modal dialogs responsive

## ⚙️ Configuration

### Change Demo Credentials
Edit `login.html`, find this section:
```javascript
if (email === "admin@example.com" && pass === "1234") {
```

Change to your preferred email/password.

### Add More Test Accounts
Duplicate the login check for additional accounts:
```javascript
if ((email === "admin@example.com" && pass === "1234") ||
    (email === "user@example.com" && pass === "password")) {
  // Login successful
}
```

## 🔍 Debugging Tips

### Check login status
```javascript
console.log(localStorage.getItem("loggedIn"));
console.log(sessionStorage.getItem("loggedIn"));
```

### See user details
```javascript
console.log(sessionStorage.getItem("userName"));
console.log(sessionStorage.getItem("userProvider"));
```

### View storage
```javascript
// See all localStorage
for (let key in localStorage) {
  console.log(key + ": " + localStorage[key]);
}

// See all sessionStorage  
for (let key in sessionStorage) {
  console.log(key + ": " + sessionStorage[key]);
}
```

## 📋 Summary

| Feature | Works | Details |
|---------|-------|---------|
| Browse without login | ✅ | Home, Menu, About pages |
| Add to Cart (no login) | ⚠️ | Redirects to login |
| Email/Password | ✅ | Test: admin@example.com / 1234 |
| Guest Login | ✅ | Name + Gender required |
| Google Login | ✅ | Simulated (enter name) |
| Facebook Login | ✅ | Simulated (enter name) |
| Twitter Login | ✅ | Simulated (enter handle) |
| Cart Access | 🔒 | Login required |
| Booking Access | 🔒 | Login required |
| User Display | ✅ | Shows in navbar |

---

**Everything is ready for testing!** 🎉

Visit `menu.html` and try adding items without login - you'll be asked to login first!
