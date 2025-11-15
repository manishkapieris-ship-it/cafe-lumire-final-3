// main.js - unified behavior for menu/cart/checkout
console.log("JS connected properly!");
console.log("DOM ready state:", document.readyState);
console.log("Window location:", window.location.href);

/* ======================================================
   LOGIN REQUIRED MODAL
====================================================== */
function showLoginRequiredModal(onConfirm) {
  // Create modal overlay
  const overlay = document.createElement("div");
  overlay.id = "login-required-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  // Create modal content
  const modal = document.createElement("div");
  modal.style.cssText = `
    background: linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.9));
    border: 2px solid #00ff66;
    border-radius: 20px;
    padding: 40px;
    width: 90%;
    max-width: 420px;
    text-align: center;
    color: #fff;
    box-shadow: 0 0 30px rgba(0,255,100,0.5);
    backdrop-filter: blur(10px);
  `;

  modal.innerHTML = `
    <h2 style="color: #00ff66; margin-top: 0; font-size: 24px;">🔐 Login Required</h2>
    <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0;">
      Before you can order, you must first <strong style="color: #00ff66;">log in</strong> or 
      <strong style="color: #00ff66;">continue as a guest</strong>.
    </p>
    <p style="color: #aaa; font-size: 14px; margin: 20px 0;">
      ✅ Choose a login method below or create a new account.
    </p>
    <div style="margin-top: 30px; display: flex; gap: 10px; justify-content: center;">
      <button id="btn-login" style="
        background: #00ff66;
        color: #000;
        border: none;
        padding: 12px 28px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        font-size: 15px;
        transition: all 0.3s;
      ">Proceed to Login</button>
      <button id="btn-close" style="
        background: rgba(255,255,255,0.1);
        color: #fff;
        border: 1px solid #00ff66;
        padding: 12px 28px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        font-size: 15px;
        transition: all 0.3s;
      ">Cancel</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Add hover effects
  const loginBtn = modal.querySelector("#btn-login");
  const closeBtn = modal.querySelector("#btn-close");

  loginBtn.onmouseover = () => {
    loginBtn.style.background = "#00dd55";
    loginBtn.style.transform = "scale(1.05)";
  };
  loginBtn.onmouseout = () => {
    loginBtn.style.background = "#00ff66";
    loginBtn.style.transform = "scale(1)";
  };

  closeBtn.onmouseover = () => {
    closeBtn.style.background = "rgba(255,255,255,0.2)";
    closeBtn.style.transform = "scale(1.05)";
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.background = "rgba(255,255,255,0.1)";
    closeBtn.style.transform = "scale(1)";
  };

  // Button handlers
  loginBtn.onclick = () => {
    overlay.remove();
    if (onConfirm) onConfirm();
  };

  closeBtn.onclick = () => {
    overlay.remove();
  };

  // Close on escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
}

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
    COFFEE MODAL (only for coffee series)
     Buttons that open modal must have class "coffee-btn"
     And menu-card should have dataset: data-name, data-price (rs), data-img
  -------------------------*/
  const modal = document.getElementById("coffeeModal");
  const toastEl = document.getElementById("toast");
  
  // Safety check: if modal doesn't exist, this is not the menu page
  if (!modal) {
    console.log("Modal not found - not on menu page");
  }
  if (modal) {
    const coffeeButtons = document.querySelectorAll(".coffee-btn");
    const closeBtn = modal.querySelector(".close");
    const modalTitle = document.getElementById("modal-title");
    const modalImg = document.getElementById("modal-image");
    const totalPriceEl = document.getElementById("total-price");
    const sizeBtns = modal.querySelectorAll(".size-btn");
    const incBtns = modal.querySelectorAll(".increase");
    const decBtns = modal.querySelectorAll(".decrease");
    const confirmBtn = document.getElementById("confirm-add");

    let basePrice = 0;
    let selectedSize = "M";

    // Helper function to add event listeners for both click and touch
    const addEvent = (element, eventType, handler) => {
      element.addEventListener(eventType, handler);
      if ('ontouchstart' in window) {
        element.addEventListener('touchstart', handler, { passive: true });
      }
    };

    // safely wire buttons (if any)
    coffeeButtons.forEach(btn => {
      addEvent(btn, "click", (e) => {
        console.log("Coffee button clicked!");
        e.preventDefault(); // Prevent any default behavior
        e.stopPropagation(); // Stop event bubbling

        // Check if user is logged in before opening modal
        const loggedIn = localStorage.getItem("loggedIn") === "true";
        const guest = sessionStorage.getItem("loggedIn") === "guest";
        const socialLogin = ["google", "facebook", "twitter"].includes(sessionStorage.getItem("loggedIn"));

        console.log("Login check for coffee - loggedIn:", loggedIn, "guest:", guest, "socialLogin:", socialLogin);

        if (!loggedIn && !guest && !socialLogin) {
          // Redirect to login if not authenticated
          console.log("Not logged in - redirecting to login");
          
          // Show login required message
          showLoginRequiredModal(() => {
            localStorage.setItem("cameFromMenu", "true");
            window.location.href = "login.html";
          });
          return;
        }

        console.log("Logged in - opening modal");
        const card = e.target.closest(".menu-card");
        if (!card) {
          console.log("No card found");
          return;
        }
        const name = card.dataset.name || "Coffee";
        const img = card.dataset.img || card.querySelector("img")?.src || "";
        basePrice = (parseFloat(card.dataset.price) || 0) / 100; // dollars
        selectedSize = "M";

        console.log("Opening modal for:", name, "price:", card.dataset.price);
        modalTitle.textContent = `Customize Your ${name}`;
        modalImg.src = img;
        // reset counts in modal
        modal.querySelectorAll(".topping-item .count").forEach(c => {
          if (c.textContent === "") c.textContent = "0";
        });
        // set default counts as in UI
        modal.querySelectorAll(".topping-item .count").forEach((c,i)=> {
          if (i===0 && c) c.textContent = "3"; // sugar default
          if (i===3 && c) c.textContent = "2"; // ice default
        });

        // reset sizes
        sizeBtns.forEach(b => b.classList.remove("active"));
        sizeBtns.forEach(b => { if (b.dataset.size === "M") b.classList.add("active"); });
        totalPriceEl.textContent = `$${basePrice.toFixed(2)}`;

        modal.style.display = "flex";
      });
    });

    // close handlers
    if (closeBtn) addEvent(closeBtn, "click", () => modal.style.display = "none");
    addEvent(modal, "click", (e) => { if (e.target === modal) modal.style.display = "none"; });

    // size change
    sizeBtns.forEach(b => addEvent(b, "click", () => {
      sizeBtns.forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      selectedSize = b.dataset.size || "M";
      let multiplier = selectedSize === "S" ? 0.8 : selectedSize === "L" ? 1.2 : 1;
      const total = basePrice * multiplier + toppingsExtra();
      totalPriceEl.textContent = `$${(total).toFixed(2)}`;
    }));

    // toppings +/-
    const updateTotalDisplay = () => {
      let multiplier = selectedSize === "S" ? 0.8 : selectedSize === "L" ? 1.2 : 1;
      const total = basePrice * multiplier + toppingsExtra();
      totalPriceEl.textContent = `$${total.toFixed(2)}`;
    };

    function toppingsExtra(){
      let extra = 0;
      modal.querySelectorAll(".topping-item .count").forEach(c => {
        const v = parseInt(c.textContent) || 0;
        extra += v * 0.20;
      });
      return extra;
    }

    incBtns.forEach(b => addEvent(b, "click", (e) => {
      const count = e.target.closest(".quantity").querySelector(".count");
      count.textContent = (parseInt(count.textContent)||0) + 1;
      updateTotalDisplay();
    }));
    decBtns.forEach(b => addEvent(b, "click", (e) => {
      const count = e.target.closest(".quantity").querySelector(".count");
      let cur = parseInt(count.textContent)||0;
      if (cur>0) count.textContent = cur-1;
      updateTotalDisplay();
    }));

    // Confirm and push to localStorage
    if (confirmBtn) confirmBtn.addEventListener("click", () => {
      // Double-check login before adding to cart
      const loggedIn = localStorage.getItem("loggedIn") === "true";
      const guest = sessionStorage.getItem("loggedIn") === "guest";
      const socialLogin = ["google", "facebook", "twitter"].includes(sessionStorage.getItem("loggedIn"));

      if (!loggedIn && !guest && !socialLogin) {
        alert("Please log in or continue as guest to add items to cart!");
        modal.style.display = "none";
        localStorage.setItem("loginMessage", "⚠️ Please log in before adding items to cart!");
        
        // Show login required message
        showLoginRequiredModal(() => {
          window.location.href = "login.html";
        });
        return;
      }

      const name = (modalTitle?.textContent || "Coffee").replace("Customize Your ", "");
      const img = modalImg?.src || "";
      const totalText = (totalPriceEl?.textContent || "$0").replace("$","");
      const priceRs = Math.round(parseFloat(totalText||0) * 100); // convert $ to Rs (x100)

      let cart = JSON.parse(localStorage.getItem("cart")||"[]");
      const existing = cart.find(i => i.name === name);
      if (existing) existing.quantity = (existing.quantity||0) + 1;
      else cart.push({name, img, price: priceRs, quantity:1});

      localStorage.setItem("cart", JSON.stringify(cart));
      modal.style.display = "none";

      // toast
      if (toastEl){
        toastEl.textContent = `${name} added to cart ✓`;
        toastEl.classList.add("show");
        setTimeout(()=> toastEl.classList.remove("show"),2000);
      } else {
        alert(`${name} added to cart`);
      }
    });
  } // end modal block


  
  /* -------------------------
    Add-to-cart for Bakery items (simple) - with login check
  -------------------------*/
  document.querySelectorAll(".menu-card .add-cart:not(.coffee-btn)").forEach(btn => {
    btn.addEventListener("click", (e) => {
      console.log("Bakery button clicked!");
      e.preventDefault(); // Prevent any default behavior
      e.stopPropagation(); // Stop event bubbling

      // Check if user is logged in
      const loggedIn = localStorage.getItem("loggedIn") === "true";
      const guest = sessionStorage.getItem("loggedIn") === "guest";
      const socialLogin = ["google", "facebook", "twitter"].includes(sessionStorage.getItem("loggedIn"));

      console.log("Login check for bakery - loggedIn:", loggedIn, "guest:", guest, "socialLogin:", socialLogin);

      if (!loggedIn && !guest && !socialLogin) {
        // Redirect to login if not authenticated
        console.log("Not logged in - redirecting to login");
        
        // Show login required message
        showLoginRequiredModal(() => {
          localStorage.setItem("cameFromMenu", "true");
          window.location.href = "login.html";
        });
        return;
      }

      console.log("Logged in - adding to cart");
      // Proceed with adding to cart
      const card = e.target.closest(".menu-card");
      const name = card.dataset.name || card.querySelector("h3")?.textContent || "Item";
      const img = card.dataset.img || card.querySelector("img")?.src || "";
      const priceRs = Math.round((parseFloat(card.dataset.price)||0));

      console.log("Adding to cart:", name, "price:", priceRs);
      let cart = JSON.parse(localStorage.getItem("cart")||"[]");
      const existing = cart.find(i => i.name === name);
      if (existing) existing.quantity = (existing.quantity||0) + 1;
      else cart.push({name, img, price: priceRs, quantity:1});
      localStorage.setItem("cart", JSON.stringify(cart));
      if (toastEl){
        toastEl.textContent = `${name} added to cart ✓`;
        toastEl.classList.add("show");
        setTimeout(()=> toastEl.classList.remove("show"),1800);
      }
    });
  });

  /* -------------------------
    CART PAGE: render & actions
    (this block will safely run only on cart.html because elements may not exist)
  -------------------------*/
  const cartContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const emptyMessage = document.getElementById("empty-message");

  function loadCart(){
    const cart = JSON.parse(localStorage.getItem("cart")||"[]");
    if (!cartContainer) return;
    cartContainer.innerHTML = "";
    if (!cart || cart.length === 0){
      emptyMessage.style.display = "block";
      cartTotalEl.textContent = "Rs.0";
      return;
    }
    emptyMessage.style.display = "none";
    let total = 0;
    cart.forEach((it, idx) => {
      total += (it.price||0) * (it.quantity||1);
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${it.img}" alt="${it.name}">
        <div class="cart-details">
          <h4>${it.name}</h4>
          <p>Price: Rs.${it.price}</p>
          <p>Quantity: ${it.quantity}</p>
        </div>
        <div class="cart-actions">
          <button class="quantity-btn decrease" data-index="${idx}">-</button>
          <button class="quantity-btn increase" data-index="${idx}">+</button>
          <button class="remove-btn" data-index="${idx}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(el);
    });
    cartTotalEl.textContent = `Rs.${total}`;
  }

  // event delegation for cart
  if (cartContainer){
    cartContainer.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      if (typeof idx === "undefined") return;
      let cart = JSON.parse(localStorage.getItem("cart")||"[]");
      if (!cart || !cart[idx]) return;
      if (e.target.classList.contains("increase")){
        cart[idx].quantity = (cart[idx].quantity||0) + 1;
      } else if (e.target.classList.contains("decrease")){
        if (cart[idx].quantity > 1) cart[idx].quantity--;
      } else if (e.target.classList.contains("remove-btn")){
        cart.splice(idx,1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
      // update total in checkout area (if present)
      const cartTotalDisplay = document.getElementById("cart-total");
      if (cartTotalDisplay){ // already updated inside loadCart
      }
    });
  }

  // initial load (if cart page)
  loadCart();

  /* -------------------------
    CHECKOUT behavior (in cart.html)
    show/hide delivery & card details and handle confirm
  -------------------------*/
  const orderTypeInputs = document.querySelectorAll("input[name='orderType']");
  const paymentInputs = document.querySelectorAll("input[name='paymentMethod']");
  const deliveryDetails = document.getElementById("delivery-details");
  const cardDetails = document.getElementById("card-details");
  const confirmOrderBtn = document.getElementById("confirm-order");

  if (orderTypeInputs && orderTypeInputs.length){
    orderTypeInputs.forEach(input => input.addEventListener("change", () => {
      if (!deliveryDetails) return;
      deliveryDetails.style.display = input.value === "delivery" ? "block" : "none";
    }));
  }
  if (paymentInputs && paymentInputs.length){
    paymentInputs.forEach(input => input.addEventListener("change", () => {
      if (!cardDetails) return;
      cardDetails.style.display = input.value === "online" ? "block" : "none";
      // if online, show overlay pay-card maybe (handled below on confirm)
    }));
  }

  if (confirmOrderBtn){
    confirmOrderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // validate if cart present
      const cart = JSON.parse(localStorage.getItem("cart")||"[]");
      if (!cart || cart.length === 0){
        alert("Your cart is empty!");
        return;
      }
      const orderType = document.querySelector("input[name='orderType']:checked")?.value || "takeaway";
      const payMethod = document.querySelector("input[name='paymentMethod']:checked")?.value || "cash";

      if (orderType === "delivery"){
        const address = document.getElementById("delivery-address")?.value?.trim();
        const contact = document.getElementById("delivery-contact")?.value?.trim();
        if (!address || !contact){
          alert("Please fill delivery address and contact.");
          return;
        }
      }

      if (payMethod === "online"){
        // show pay overlay (if exists) or simulate card validation
        const payOverlay = document.querySelector(".pay-overlay");
        if (payOverlay){
          payOverlay.style.display = "flex";
          // wire buy button
          const buyBtn = payOverlay.querySelector(".buy-btn");
          if (buyBtn){
            buyBtn.onclick = () => {
              // simulate payment success
              payOverlay.style.display = "none";
              showSuccessAndClear();
            };
          }
          return;
        } else {
          // fallback: proceed
          alert("Online payment processed (simulated).");
          showSuccessAndClear();
          return;
        }
      }

      // cash on delivery path:
      showSuccessAndClear();
    });
  }

  function showSuccessAndClear(){
    localStorage.removeItem("cart");
    loadCart();
    // show center success box
    const box = document.createElement("div");
    box.className = "success-box";
    box.innerHTML = `<h3>🎉 Thank you for your order!</h3><p>Your order has been placed successfully.</p><div style="margin-top:12px"><button id="back-home" class="confirm-checkout">Back to Home</button></div>`;
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.inset = "0";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.zIndex = "120";
    wrapper.appendChild(box);
    document.body.appendChild(wrapper);
    document.getElementById("back-home").addEventListener("click", () => {
      wrapper.remove();
      window.location.href = "index.html";
    });
    setTimeout(()=> {
      // auto remove after 5s if user doesn't click
      try{ wrapper.remove(); }catch(e){}
    }, 6000);
  }

  /* ======================================================
     🔒 LOGIN + ACCESS CONTROL LOGIC
     Menu: Browse FREE (no login required)
     Cart/Booking: Login REQUIRED
     Index/About: Login REQUIRED (no browsing without login)
  ====================================================== */

  // --- Protect sensitive pages ---
  const protectedPages = ["cart.html", "booking.html", "index.html", "about.html"];
  const currentPage = window.location.pathname.split("/").pop();

  // Debug logging
  console.log("Current page:", currentPage);
  console.log("localStorage loggedIn:", localStorage.getItem("loggedIn"));
  console.log("sessionStorage loggedIn:", sessionStorage.getItem("loggedIn"));

  if (protectedPages.includes(currentPage)) {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const guest = sessionStorage.getItem("loggedIn") === "guest";
    const socialLogin = ["google", "facebook", "twitter"].includes(sessionStorage.getItem("loggedIn"));

    console.log("Login check - loggedIn:", loggedIn, "guest:", guest, "socialLogin:", socialLogin);

    // Only allow if user is logged in through ANY method
    if (!loggedIn && !guest && !socialLogin) {
      console.log("Access denied - redirecting to login");

      // Determine where they came from
      if (currentPage === "cart.html") localStorage.setItem("cameFromCart", "true");
      if (currentPage === "booking.html") localStorage.setItem("cameFromReserve", "true");
      if (currentPage === "index.html") localStorage.setItem("cameFromHome", "true");
      if (currentPage === "about.html") localStorage.setItem("cameFromAbout", "true");

      alert("Please log in or continue as guest to access this page!");
      localStorage.setItem("loginMessage", "⚠️ Please log in to continue!");
      window.location.href = "login.html";
      return;
    } else {
      console.log("Access granted");
    }
  }

  // --- Menu page: Allow browsing freely (no login required) ---
  if (currentPage === "menu.html") {
    console.log("Menu page - allowing free browsing without login");
  }

  // --- Show pop-up message after redirect ---
  const msgText = localStorage.getItem("loginMessage");
  if (msgText) {
    const box = document.createElement("div");
    box.textContent = msgText;
    Object.assign(box.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,255,100,0.15)",
      color: "#00ff66",
      padding: "12px 25px",
      borderRadius: "10px",
      fontWeight: "600",
      zIndex: "9999",
      backdropFilter: "blur(8px)",
    });
    document.body.appendChild(box);
    setTimeout(() => {
      box.style.transition = "opacity 0.6s";
      box.style.opacity = "0";
      setTimeout(() => box.remove(), 600);
    }, 3000);
    localStorage.removeItem("loginMessage");
  }

}); // DOMContentLoaded end

/* ======================================================
   Display User Info in Navbar
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const loginMethod = sessionStorage.getItem("loggedIn");
  
  if (isLoggedIn && loginMethod) {
    let userName = "";
    let displayMethod = "";
    
    if (loginMethod === "guest") {
      userName = sessionStorage.getItem("guestName") || "Guest";
      displayMethod = "👤 Guest";
    } else if (loginMethod === "user") {
      userName = sessionStorage.getItem("userName") || "User";
      displayMethod = "📧 Email";
    } else if (["google", "facebook", "twitter"].includes(loginMethod)) {
      userName = sessionStorage.getItem("userName") || "User";
      const icons = {
        "google": "🔍",
        "facebook": "📘",
        "twitter": "🐦"
      };
      displayMethod = `${icons[loginMethod]} ${loginMethod.charAt(0).toUpperCase() + loginMethod.slice(1)}`;
    }
    
    // Add user info to navbar if space allows
    const navbar = document.querySelector(".navbar");
    if (navbar && !document.getElementById("user-info-display")) {
      const userInfo = document.createElement("div");
      userInfo.id = "user-info-display";
      userInfo.style.cssText = `
        color: #00ff66;
        font-size: 0.9rem;
        font-weight: 600;
        margin-right: 15px;
        text-align: right;
      `;
      userInfo.innerHTML = `<div style="font-size:0.85rem;color:#bbb;">${displayMethod}</div><div>${userName}</div>`;
      
      // Insert before login button if it exists
      const loginBtn = navbar.querySelector(".login-btn");
      if (loginBtn) {
        navbar.insertBefore(userInfo, loginBtn);
      } else {
        navbar.appendChild(userInfo);
      }
    }
  }
});

