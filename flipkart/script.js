const products = [
  { id: 1, name: "Shirt", price: 500, category: "fashion" },
  { id: 2, name: "Shoes", price: 1000, category: "fashion" },
  { id: 3, name: "Mobile", price: 15000, category: "electronics" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let filtered = [...products];

// 📍 Location (Auto Detect)
navigator.geolocation.getCurrentPosition(pos => {
  document.getElementById("location").innerText =
    "📍 Lat: " + pos.coords.latitude.toFixed(2);
});

// 📦 Show Products
function displayProducts(data) {
  const div = document.getElementById("products");
  div.innerHTML = "";

  data.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}

// 🔍 Search
function searchProduct() {
  const value = document.getElementById("search").value.toLowerCase();
  const result = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(result);
}

// 📂 Filter
function filterCategory(cat) {
  if (cat === "all") {
    displayProducts(products);
  } else {
    const result = products.filter(p => p.category === cat);
    displayProducts(result);
  }
}

// 🛒 Cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const div = document.getElementById("cart");
  div.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    div.innerHTML += `
      <div class="card">
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${i})">X</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Init
displayProducts(products);
displayCart();