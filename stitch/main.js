document.addEventListener("DOMContentLoaded", () => {
  const CART_STORAGE_KEY = "hhm-cart";
  const cartCountElement = document.querySelector("[data-cart-count]");
  const addToCartButtons = document.querySelectorAll("[data-add-to-cart]");
  const bookingButton = document.querySelector("[data-booking-button]");

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }

  function renderCartCount() {
    if (!cartCountElement) return;
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCountElement.textContent = `Cart (${count})`;
  }

  function addToCart(productId) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    saveCart(cart);
    renderCartCount();
  }

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-add-to-cart");
      if (!productId) return;
      addToCart(productId);
    });
  });

  if (bookingButton) {
    bookingButton.addEventListener("click", async () => {
      const name = prompt("Your name for the private viewing:");
      if (!name) return;

      const email = prompt("Your email so we can confirm your booking:");
      if (!email) return;

      const date = prompt("Preferred date/time (optional):") || null;

      try {
        const response = await fetch("http://localhost:4000/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, date })
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        alert("Thank you! Your private viewing request has been submitted.");
      } catch (err) {
        alert("Sorry, something went wrong while submitting your request.");
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
  }

  renderCartCount();
});



