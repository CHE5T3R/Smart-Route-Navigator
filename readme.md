# Smart Route Navigator

Smart Route Navigator, bir yol ağı grafiği üzerinde iki nokta arasındaki en kısa rotayı **Dijkstra Algoritması** kullanarak bulan ve bunu harita üzerinde görselleştiren bir web uygulamasıdır.

## 🗺️ Özellikler

- Leaflet.js ile interaktif harita
- İki nokta seçerek rota oluşturma
- Dijkstra algoritması ile en kısa yol hesaplama
- JSON dosyası üzerinden yol ağı tanımı
- Harita üzerinde rota çizimi

## 🔧 Teknolojiler

- HTML, CSS, JavaScript
- Leaflet.js
- Dijkstra Algoritması (JS ile yazılmış)
- JSON veri yapısı
 

## 🚀 Kurulum ve Çalıştırma

> Bu proje bir web sunucusu ortamında çalışmalıdır. `graph-data.json` dosyasını fetch edebilmek için **"Live Server"** gibi bir uzantı kullanın.

### Adımlar:

1. VS Code'da projeyi açın.
2. `graph-data.json`, `index.html`, `script.js`, `dijkstra.js` ve `style.css` dosyalarının aynı klasörde olduğundan emin olun.
3. Sağ alttan **Go Live** butonuna tıklayın (Live Server).
4. Tarayıcıda açılan sayfadan harita üzerindeki iki noktayı seçin.
5. Rota hesaplanıp harita üzerinde gösterilecektir.

## 📌 Notlar

- Rota bulunamayan (bağlantısı olmayan) noktalar seçilirse, uygun bir uyarı verilir.
- Rota bulunduğunda, toplam mesafe gösterilir ve harita bu rotaya göre yakınlaştırılır.
- Yeni noktalar ve yollar `graph-data.json` dosyasına elle eklenebilir.

## 🧠 Algoritma

[Dijkstra Algoritması](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm), ağırlıklı graflarda bir başlangıç düğümünden diğer tüm düğümlere en kısa yolları bulmak için kullanılır. Bu projede, sadece iki nokta arasındaki en kısa yol hesaplanır.

## 📷 Ekran Görüntüsü

*(Ekran görüntüsü eklenecekse buraya koyabilirsiniz.)*

---

## 👥 Katkıda Bulunmak

Katkıda bulunmak isterseniz PR gönderebilir ya da issue açabilirsiniz.

---

## 📄 Lisans

Bu proje eğitim amaçlı hazırlanmıştır.

