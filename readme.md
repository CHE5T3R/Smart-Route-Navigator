# Smart Route Navigator

Smart Route Navigator, OpenStreetMap üzerinden indirilen bölgede harita üzerinden seçilen 2 nokta arasınki en kısa rotayı **Dijkstra Algoritması** kullanarak bulan, bunu harita üzerinde görselleştiren ve isteğe bağlı olarak (dijkstra algoritmasının nasıl çalıştığını görmek için) taranan node'ları tek tek gösteren ve tarama hızını belirleyebileceğiniz bir web uygulamasıdır.

## Özellikler

- Leaflet.js ile interaktif harita
- İki nokta seçerek rota oluşturma
- Dijkstra algoritması ile en kısa yol hesaplama
- JSON dosyası üzerinden yol ağı tanımı
- Harita üzerinde rota çizimi

## Teknolojiler

- HTML, CSS, JavaScript, Python
- Leaflet.js
- Dijkstra Algoritması (JS ile yazılmış)
- JSON veri yapısı
 

## Kurulum ve Çalıştırma

OpenStreetMap üzerinde osm dosyasını indirin ve main.py ile json dosyasına dönüştürün.
Live server ile çalıştırın veya python yüklüyse cmd üzerinden cd ile proje dosyasını açtıktan sonra "python -m http.server 8000" ile çalıştrıp "http://localhost:8000/index.html" ile açabilirsiniz.

##  Algoritma

Dijkstra Algoritması, ağırlıklı graflarda bir başlangıç düğümünden diğer tüm düğümlere en kısa yolları bulmak için kullanılır. Bu projede, sadece iki nokta arasındaki en kısa yol hesaplanır.

