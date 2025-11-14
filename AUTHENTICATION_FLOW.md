## 🔐 Authentication Flow - Visual Guide

### Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│               USER VISITS ANY PROTECTED PAGE                    │
│           (home.html, index.html, menu.html, etc)             │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │   AUTH CHECK RUNS (in <head>)      │
        │   Checks localStorage & sessionSt  │
        └────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  Is user logged in?                │
        │  loggedIn = "true" OR              │
        │  guest = "guest" OR                │
        │  social = google/fb/twitter        │
        └────────────────────────────────────┘
                    │              │
         YES ───────┘              └────── NO
          │                              │
          ▼                              ▼
    ┌──────────────────┐      ┌─────────────────────┐
    │ PAGE LOADS ✅    │      │ REDIRECT IMMEDIATELY│
    │                  │      │ window.location     │
    │ User can see:    │      │ .replace("login")   │
    │ - Menu           │      │                     │
    │ - About          │      │ Unauthenticated     │
    │ - Home           │      │ users CANNOT see    │
    │ - Cart           │      │ page content        │
    │ - Booking        │      └─────────────────────┘
    │                  │              │
    └──────────────────┘              ▼
          │                    ┌──────────────────────┐
          │                    │   LOGIN PAGE LOADS   │
          │                    │                      │
          │                    │ Options:             │
          │                    │ 1. Email/Password    │
          │                    │ 2. Sign Up           │
          │                    │ 3. Guest Login       │
          │                    │ 4. Social Login      │
          │                    └──────────────────────┘
          │                              │
          │                    ┌─────────┴──────────┐
          │                    │  USER CHOOSES LOGIN METHOD
          │                    │
          │         ┌──────────┼──────────┬────────────┬──────────┐
          │         │          │          │            │          │
          ▼         ▼          ▼          ▼            ▼          ▼
    ┌────────────┐ ┌─────┐ ┌──────┐ ┌────────┐ ┌────────┐ ┌────────┐
    │  EXISTING  │ │SIGN │ │GUEST │ │GOOGLE  │ │FACEBOOK│ │TWITTER │
    │  USER      │ │ UP  │ │LOGIN │ │ LOGIN  │ │ LOGIN  │ │ LOGIN  │
    │            │ │     │ │      │ │        │ │        │ │        │
    │ Email +    │ │Name │ │Name+ │ │  Name  │ │  Name  │ │ Handle │
    │ Password   │ │Email│ │Gender│ │ Prompt │ │ Prompt │ │ Prompt │
    │            │ │Pass │ │      │ │        │ │        │ │        │
    │ Check vs   │ │Pass2│ │      │ │        │ │        │ │        │
    │ demo acc   │ │     │ │      │ │        │ │        │ │        │
    │            │ │     │ │      │ │        │ │        │ │        │
    └──────┬─────┘ └──┬──┘ └──┬───┘ └───┬────┘ └───┬────┘ └───┬────┘
           │          │       │         │          │          │
           └──────────┴───────┴─────────┴──────────┴──────────┘
                              │
                  ┌───────────┴───────────┐
                  │   ALL METHODS SET:    │
                  │                       │
                  │ localStorage:         │
                  │ loggedIn = "true"     │
                  │                       │
                  │ sessionStorage:       │
                  │ loggedIn = type       │
                  │ userName = name       │
                  └───────────┬───────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │ SUCCESS POPUP SHOWS │
                    │ "Login successful!" │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │ REDIRECT BACK TO    │
                    │ ORIGIN PAGE         │
                    │                     │
                    │ Menu → Menu         │
                    │ Home → Home         │
                    │ Cart → Cart         │
                    │ (if no origin)      │
                    │ → Home              │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │ MAIN PAGE NOW LOADS │
                    │ User can see all    │
                    │ content and browse  │
                    │ website normally    │
                    └─────────────────────┘
                              │
                              ▼
            ┌─────────────────────────────────┐
            │   USER BROWSES WEBSITE          │
            │                                 │
            │ ✅ Can view menu                │
            │ ✅ Can add items to cart        │
            │ ✅ Can checkout                 │
            │ ✅ Can make reservations        │
            │ ✅ Can view about page          │
            │ ✅ Can navigate all sections    │
            └─────────────────────────────────┘
```

---

## 🔄 Storage Flow

```
BEFORE LOGIN:
┌─────────────────────────────────────┐
│ localStorage.loggedIn = (not set)   │
│ sessionStorage.loggedIn = (not set) │
│ sessionStorage.userName = (not set) │
│                                     │
│ RESULT: REDIRECT TO LOGIN ❌        │
└─────────────────────────────────────┘

DURING LOGIN (User fills form):
┌──────────────────────────────────────────┐
│ User enters: admin@example.com / 1234    │
│ Clicks: Login Button                     │
│                                          │
│ Script validates email/password          │
│ Script checks storage setting            │
└──────────────────────────────────────────┘

AFTER SUCCESSFUL LOGIN:
┌──────────────────────────────────────────┐
│ localStorage.loggedIn = "true"           │
│ sessionStorage.loggedIn = "user"         │
│ sessionStorage.userName = "email"        │
│                                          │
│ RESULT: PAGE LOADS ✅                   │
└──────────────────────────────────────────┘

AFTER BROWSER CLOSES:
┌──────────────────────────────────────────┐
│ localStorage.loggedIn = "true" ✅        │
│ sessionStorage.loggedIn = (CLEARED)      │
│ sessionStorage.userName = (CLEARED)      │
│                                          │
│ User visits page again next day:         │
│ RESULT: REDIRECT TO LOGIN                │
│ (sessionStorage cleared, need re-login)  │
└──────────────────────────────────────────┘
```

---

## 🎯 Authentication States

### State 1: NOT LOGGED IN (Fresh visit)
```
Location: menu.html
localStorage.loggedIn? NO
sessionStorage.loggedIn? NO

✗ Check fails
→ REDIRECT TO LOGIN.HTML

User sees: Login form
```

### State 2: JUST LOGGED IN (During session)
```
Location: menu.html after login
localStorage.loggedIn = "true" ✓
sessionStorage.loggedIn = "user" ✓

✓ Check passes
→ PAGE LOADS NORMALLY

User sees: Menu content
```

### State 3: BROWSER CLOSED & REOPENED
```
Location: menu.html
localStorage.loggedIn = "true" ✓
sessionStorage.loggedIn? NO (cleared when browser closed)

✗ Check fails
→ REDIRECT TO LOGIN.HTML

User must login again
```

### State 4: GUEST LOGIN
```
During session after guest login:
localStorage.loggedIn = "true" ✓
sessionStorage.loggedIn = "guest" ✓

✓ Check passes
→ PAGE LOADS NORMALLY

After browser closes:
sessionStorage cleared
Must login again next session
```

---

## 🚦 Quick Reference

### ✅ Authentication Succeeds When:
- `localStorage.getItem("loggedIn") === "true"` AND
- `sessionStorage.getItem("loggedIn")` is one of:
  - `"user"` (email login or signup)
  - `"guest"` (guest login)
  - `"google"` (Google social login)
  - `"facebook"` (Facebook social login)
  - `"twitter"` (Twitter social login)

### ❌ Authentication Fails When:
- Any of the above conditions are NOT met
- User is redirected to `login.html`
- They must complete login to proceed

### 🔄 After Successful Login:
- User sees success popup
- Automatically redirected to origin page
- Can now access entire website

---

## 📱 Mobile Flow

Works exactly the same on mobile:
1. Visit any page (e.g., menu.html)
2. Auth check runs before page content loads
3. If not logged in → redirect to login.html
4. Login page loads on mobile
5. Fill form and submit
6. Returns to menu.html on mobile
7. Can browse normally

---

## 🔐 Security Benefits

✅ **Immediate Protection** - Check runs before page even begins rendering
✅ **No Leaks** - Can't view page source to bypass auth
✅ **No API Calls** - Won't load resources until auth passes
✅ **Session-Based** - Guest/social logins cleared on browser close
✅ **Simple & Fast** - No delays, instant redirect

---

## 🧪 Testing Scenarios

### Scenario 1: Fresh User
```
1. Clear browser storage
2. Visit menu.html
3. Get redirected to login.html ✓
4. Login with admin@example.com / 1234
5. See success popup
6. Redirect to menu.html
7. Menu page loads ✓
```

### Scenario 2: Create New Account
```
1. Clear browser storage
2. Visit home.html
3. Get redirected to login.html
4. Click "Sign Up" tab
5. Fill form and register
6. See success popup
7. Redirect to home.html ✓
```

### Scenario 3: Guest Login
```
1. Clear browser storage
2. Visit about.html
3. Get redirected to login.html
4. Click "Continue as Guest"
5. Enter name and gender
6. See success popup
7. Redirect to about.html ✓
```

### Scenario 4: Social Login
```
1. Clear browser storage
2. Visit cart.html
3. Get redirected to login.html
4. Click "Google" button
5. Enter name when prompted
6. See success popup
7. Redirect to cart.html ✓
```

### Scenario 5: Session Expires
```
1. Login successfully
2. Browse for a while
3. Close browser completely
4. Reopen browser
5. Visit menu.html
6. sessionStorage cleared
7. Get redirected to login.html ✓
8. Must login again
```

---

**System: ✅ FULLY PROTECTED**
**All pages require login before access**
**Testing page: test-auth.html**
