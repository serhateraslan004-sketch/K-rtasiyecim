/* ============================================================
   [PUAN: 10] VERİTABANI İŞLEMLERİ (LocalStorage Seçeneği)
   ============================================================ */

// Form Gönderme İşlemi (iletisim.html için)
// [PUAN: 5] LocalStorage'a kaydetme
document.getElementById('iletisimFormu')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    // Form verilerini al
    const yeniMesaj = {
        id: Date.now(),
        ad: document.getElementById('ad').value,
        email: document.getElementById('email').value,
        tel: document.getElementById('tel').value,
        mesaj: document.getElementById('mesaj').value,
        adres: document.getElementById('adres').value,
        tarih: new Date().toLocaleString()
    };

    // Mevcut verileri çek veya boş dizi oluştur
    let mesajlar = JSON.parse(localStorage.getItem('siteMesajlari')) || [];

    // Yeni mesajı diziye ekle
    mesajlar.push(yeniMesaj);

    // Güncel diziyi tekrar LocalStorage'a kaydet
    localStorage.setItem('siteMesajlari', JSON.stringify(mesajlar));

    alert('Mesajınız başarıyla kaydedildi! (Yönetim sayfasından kontrol edebilirsiniz)');
    this.reset(); // Formu temizle
});

// Verileri Listeleme İşlemi (yonetim.html için derste yapacağız)
// [PUAN: 5] Kayıtlı verileri gösterme
function verileriGetir() {
    const tabloGovde = document.getElementById('veriListesi');

    // Eğer bu sayfada tablo yoksa fonksiyonu durdur
    if (!tabloGovde) return;

    // Verileri çek
    const mesajlar = JSON.parse(localStorage.getItem('siteMesajlari')) || [];

    // Tabloyu temizle ve doldur
    tabloGovde.innerHTML = mesajlar.map(m => `
        <tr>
            <td>${m.ad}</td>
            <td>${m.email}</td>
            <td>${m.tel}</td>
            <td>${m.mesaj}</td>
            <td>${m.tarih}</td>
            <td>${m.Adres}</td>
            
        </tr>
    `).join('');
}

// Sayfa yüklendiğinde listeleme fonksiyonunu çalıştır
document.addEventListener('DOMContentLoaded', verileriGetir);

// Sepete ürün ekleme fonksiyonu
function addToCart(name, price, image) {
    // Sepet verisini localStorage'dan al
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Ürünü sepete ekle
    cart.push({ name: name, price: price, image: image });

    // Tekrar localStorage'a kaydet
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Sepet sayfası için kod
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let sepetListesi = document.getElementById('sepet-listesi');

if (cart.length === 0) {
    sepetListesi.innerHTML = "<p>Sepetinizde ürün yok.</p>";
} else {
    sepetListesi.innerHTML = ""; // Önce temizle
    let toplamFiyat = 0;

    cart.forEach((item, index) => {
        toplamFiyat += item.price;

        // Sepet kartı
        let urunDiv = document.createElement('div');
        urunDiv.classList.add('card', 'mb-3', 'shadow-sm');
        urunDiv.innerHTML = `
            <div class="row g-0 align-items-center">
                <div class="col-md-2">
                    <img src="${item.image || 'https://via.placeholder.com/60'}" 
                         class="img-fluid rounded-start" alt="${item.name}">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.price} ₺</p>
                    </div>
                </div>
                <div class="col-md-3 text-end pe-3">
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Sil</button>
                </div>
            </div>
        `;
        sepetListesi.appendChild(urunDiv);
    });

    // Toplam fiyatı güncelle
    document.getElementById('toplam').textContent = toplamFiyat;
}

// Ürünü silme fonksiyonu
function removeItem(index) {
    cart.splice(index, 1); // Ürünü diziden çıkar
    localStorage.setItem('cart', JSON.stringify(cart)); // Güncelle
    location.reload(); // Sayfayı yenileyerek güncelle
}
