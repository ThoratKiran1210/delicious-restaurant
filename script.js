document.addEventListener("DOMContentLoaded", () => {
  // Navigation toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 🛒 Cart logic
  let cartCount = 0;
  let cartItems = [];

  const cartModal = document.getElementById("cart-modal");
  const cartList = document.getElementById("cart-list");
  const closeCartBtn = document.getElementById("close-cart");
  const cartIcon = document.getElementById("cart-icon");
  const cartCountEl = document.getElementById("cart-count");

  // Initialize count
  cartCountEl.textContent = "0";

  window.addToCart = function (event) {
    const card = event.target.closest(".menu-card");
    const itemName = card.querySelector("h3").textContent;
    const itemPrice = card.querySelector("p").textContent;

    cartItems.push({ name: itemName, price: itemPrice });
    cartCount = cartItems.length;

    cartCountEl.textContent = cartCount;
    cartCountEl.style.display = "inline-block";

    updateCartModal();
  };

  function updateCartModal() {
    cartList.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price}`;
      cartList.appendChild(li);
      const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      total += priceNumber;
    });

    // Update total display
    const cartTotalEl = document.getElementById("cart-total");
    if (cartTotalEl) {
      cartTotalEl.textContent = `Total: ₹${total.toFixed(2)}`;
    }
  }

  cartIcon.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  window.checkout = function () {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Order placed successfully!");
    cartItems = [];
    cartCount = 0;
    cartCountEl.textContent = "0";
    cartModal.classList.add("hidden");
    cartList.innerHTML = "";
  };
});

const quotes = [
  { text: "Good food is good mood.", emojis: ["🍴", "😋"] },
  { text: "Where every bite tells a story.", emojis: ["📖", "🍲"] },
  { text: "Eat like you mean it.", emojis: ["🍔", "🔥"] },
  { text: "Life's too short for bad food.", emojis: ["⏳", "❌"] },
  { text: "Fuel your cravings, love every bite.", emojis: ["⚡", "❤️"] },
  { text: "Spoonfuls of happiness, served daily.", emojis: ["🥄", "😊"] },
  { text: "Happiness is homemade.", emojis: ["🏡", "🍽️"] },
  { text: "Cooked with love and a pinch of spice.", emojis: ["🧂", "💕"] },
  { text: "In pizza we crust.", emojis: ["🍕", "🤤"] },
  { text: "Bite me — I'm delicious!", emojis: ["😈", "🍗"] },
  { text: "Taste the love in every bite.", emojis: ["💖", "🍛"] },
  {
    text: "Food is the ingredient that binds us together.",
    emojis: ["👨‍👩‍👧‍👦", "🥘"],
  },
  { text: "Keep calm and eat biryani.", emojis: ["🧘‍♀️", "🍚"] },
  { text: "First we eat, then we do everything else.", emojis: ["🍽️", "💪"] },
  { text: "Dessert is always a good idea.", emojis: ["🧁", "😌"] },
];

const quoteEl = document.getElementById("foodie-quote");
let quoteIndex = 0;

setInterval(() => {
  quoteEl.style.opacity = 0;

  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    const { text, emojis } = quotes[quoteIndex];
    quoteEl.textContent = `${emojis[0]} "${text}" ${emojis[1]}`;
    quoteEl.style.opacity = 1;
  }, 500);
}, 3000);
