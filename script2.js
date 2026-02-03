
// ================= HAMBURGER MENU =================
const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuToggle.innerHTML = navbar.classList.contains("active")
      ? '<i class="bi bi-x-lg"></i>'
      : '<i class="bi bi-list"></i>';
  });
}
// ================= SEARCH PRODUCT =================
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

if (searchForm) {
  searchForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Menghentikan refresh halaman

    const keyword = searchInput.value.toLowerCase().trim(); // Tambahkan .trim() untuk hapus spasi kosong
    const products = document.querySelectorAll("#product .card");

    products.forEach(card => {
      // Mengambil teks dari judul kartu produk
      const title = card.querySelector(".card-title").innerText.toLowerCase();

      if (title.includes(keyword)) {
        card.style.display = "block"; // Tampilkan jika cocok
      } else {
        card.style.display = "none";  // Sembunyikan jika tidak cocok
      }
    });
  });
}

// ================= CART SYSTEM =================

// Cek login
function isLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}

// Ambil cart
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Simpan cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Buy Button Logic
document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    if (!isLoggedIn()) {
      alert("Gak Login Gak Ngopi, login dulu sana!");
      window.location.href = "login.html";
      return;
    }

    const card = button.closest(".card");
    const title = card.querySelector(".card-title").innerText;
    const image = card.querySelector("img").src;
    
    // Ambil input Qty dan Harga dari atribut data-price
    const qtyInput = card.querySelector(".buy-qty");
    const price = parseInt(qtyInput.getAttribute("data-price"));
    const quantity = parseInt(qtyInput.value);

    if (quantity < 1) {
      alert("Minimal beli 1 dong!");
      return;
    }

    let cart = getCart(); //

    // Logika cek apakah barang sudah ada di keranjang
    const existingProduct = cart.find(item => item.title === title);

    if (existingProduct) {
      existingProduct.qty += quantity;
    } else {
      cart.push({
        title: title,
        image: image,
        price: price,
        qty: quantity
      });
    }

    saveCart(cart); //
    alert(`${quantity} ${title} berhasil masuk keranjang!`);
  });
});

const authLink = document.getElementById("authLink");

if (authLink) {
  const loggedIn = localStorage.getItem("userLoggedIn") === "true";

  if (loggedIn) {
    authLink.innerText = "Logout";
    authLink.href = "#";

    authLink.addEventListener("click", () => {
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("username");
      alert("Logout berhasil!");
      window.location.reload();
    });
  } else {
    authLink.innerText = "Login";
    authLink.href = "login.html";
  }
}