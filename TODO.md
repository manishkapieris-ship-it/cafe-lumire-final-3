# Fix Add to Cart Functionality - TODO List

## Tasks to Complete:

- [x] Remove redundant inline script from menu.html that interferes with Add to Cart
- [x] Remove redundant inline script from cart.html that interferes with checkout
- [x] Add smart redirect after login (back to menu/cart where user came from)
- [x] Implement login requirement for all pages except menu.html
- [x] Add authentication checks to index.html, about.html, cart.html, booking.html
- [x] Update redirect logic to handle all protected pages
- [ ] Test coffee items Add to Cart functionality
- [ ] Test bakery items Add to Cart functionality
- [ ] Verify cart page displays items correctly
- [ ] Verify login protection still works

## Progress:
- ✅ Removed conflicting event listeners from menu.html
- ✅ Removed conflicting event listeners from cart.html
- ✅ Added smart redirect logic to login.html for both regular and guest login
- ✅ Added login requirement for index.html, about.html, cart.html, booking.html
- ✅ Updated main.js to protect all pages except menu.html
- Ready for testing!
