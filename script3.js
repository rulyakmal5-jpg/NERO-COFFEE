// Mengambil elemen kontainer keranjang
const cartItems = document.getElementById("cartItems");

// Mengambil data dari localStorage dengan fallback array kosong
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/**
 * Fungsi untuk merender (menampilkan) isi keranjang
 */
function renderCart() {
  // Jika keranjang kosong
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align: center; padding: 50px; color: white;">
        <i class="bi bi-cart-x" style="font-size: 50px; display: block; margin-bottom: 10px;"></i>
        <p>Keranjang masih kosong, yuk jajan dulu!</p>
        <a href="Index.html" class="btn" style="width: 200px; margin-top: 20px; text-decoration: none; display: inline-block; line-height: 45px;">Kembali Belanja</a>
      </div>`;
    return;
  }

  let totalBelanja = 0;

  // Membuat konten HTML untuk setiap item
  let htmlContent = cart.map((item, index) => {
    // Validasi data: Pastikan price dan qty adalah angka untuk menghindari error toLocaleString
    const price = Number(item.price) || 0; 
    const qty = Number(item.qty) || 1;
    const subtotal = price * qty;
    totalBelanja += subtotal;

    return `
      <div class="card" style="display: flex; flex-direction: row; align-items: center; gap: 20px; padding: 15px; margin-bottom: 15px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;">
        
        <img src="${item.image}" alt="${item.title}" style="width: 90px; height: 90px; object-fit: cover; border-radius: 8px;">
        
        <div style="flex: 1; text-align: left;">
          <h4 style="margin: 0; color: #fff; font-size: 1.1rem;">${item.title}</h4>
          <p style="margin: 5px 0; color: #ccc; font-size: 0.9rem;">Harga: Rp ${price.toLocaleString()}</p>
          <p style="margin: 0; color: #ccc; font-size: 0.9rem;">Jumlah: ${qty}</p>
          <p style="margin: 5px 0; color: #00ff88;"><strong>Subtotal: Rp ${subtotal.toLocaleString()}</strong></p>
        </div>

        <button onclick="removeItem(${index})" style="background: #ff4444; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: 0.3s; font-weight: 600;">
          <i class="bi bi-trash"></i> Hapus
        </button>
      </div>
    `;
  }).join("");

  // Menambahkan ringkasan total belanja dan tombol checkout
  htmlContent += `
    <div style="margin-top: 30px; padding: 25px; background: rgba(0,0,0,0.3); border-radius: 12px; color: white; text-align: right;">
      <h3 style="font-weight: 400;">Total yang harus dibayar:</h3>
      <h2 style="color: #00ff88; font-size: 2rem; margin: 10px 0;">Rp ${totalBelanja.toLocaleString()}</h2>
      <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px;">
         <a href="Index.html" class="btn" style="background: #444; width: 160px; text-decoration: none; line-height: 45px; text-align: center;">Tambah Produk</a>
         <button class="btn" style="width: 220px;" onclick="checkout()">Checkout via WhatsApp</button>
      </div>
    </div>
  `;

  cartItems.innerHTML = htmlContent;
}

/**
 * Fungsi untuk menghapus satu item berdasarkan index
 */
window.removeItem = function(index) {
  if (confirm("Hapus item ini dari keranjang?")) {
    cart.splice(index, 1); // Menghapus data di array
    localStorage.setItem("cart", JSON.stringify(cart)); // Update storage
    renderCart(); // Render ulang tampilan tanpa reload seluruh halaman
  }
};

/**
 * Fungsi Checkout via WhatsApp
 */
window.checkout = function() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const phoneNumber = "62895397660506"; // Sesuaikan dengan nomor tokomu
  let pesan = "*PESANAN BARU - NERO COFFEE*\n--------------------------------------\n";
  
  let total = 0;
  cart.forEach((item, i) => {
    const subtotal = (item.price || 0) * (item.qty || 1);
    total += subtotal;
    pesan += `${i + 1}. *${item.title}*\n   ${item.qty} x Rp ${item.price.toLocaleString()} = Rp ${subtotal.toLocaleString()}\n\n`;
  });

  pesan += "--------------------------------------\n";
  pesan += `*TOTAL BAYAR: Rp ${total.toLocaleString()}*\n`;
  pesan += "--------------------------------------\n";
  pesan += "Mohon segera diproses, terima kasih!";

  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(pesan)}`;
  window.open(waUrl, '_blank');
};

// Jalankan fungsi render saat halaman dimuat
renderCart();
