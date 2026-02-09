# CineEdit Pro - Klip Ekleme ve Kurgu Rehberi

## 🎬 Editöre Klip Ekleme Adımları

### 1️⃣ Medya Import Etme

**Electron Uygulamasında:**

1. Sol üst köşedeki **Media Browser** panelinde **➕ (Import)** butonuna tıkla
2. Açılan dosya seçici penceresinde video/ses/görsel dosyalarını seç:
   - Desteklenen formatlar: **MP4, MOV, WebM, AVI, MP3, WAV, JPG, PNG**
3. Dosyalar Media Browser'da grid formatında görünecek

**Alternatif:** Dosyaları direkt olarak Media Browser paneline sürükle-bırak (drag & drop)

![Media Browser Import Button](file:///Users/fatihpeker/.gemini/antigravity/brain/15b4ee06-beca-472e-be92-816c9f0a7dd2/media_browser_import_highlighted_1770529658093.png)

---

### 2️⃣ Timeline'a Klip Ekleme

**Drag & Drop Yöntemi:**

1. Media Browser'dan bir klip seç
2. Klip'i sürükle (mouse sol tuş basılı)
3. Alt taraftaki **Timeline** üzerine getir:
   - **Video 1** track'ine video/görsel klipleri
   - **Audio 1** track'ine ses dosyalarını
4. İstediğin zaman noktasında bırak (drop)

**Sonuç:**
- Klip timeline'da görünür (mavi gradient arkaplan)
- Klip ismi ve süresi gösterilir
- Ses klipleri için dalga formu (waveform) otomatik oluşur

---

### 3️⃣ Klip Düzenleme

**Klip Seçme:**
- Timeline'daki herhangi bir klibe tek tıkla
- Seçili klip turuncu kenarlıkla vurgulanır
- Sağ panelde **Properties** otomatik açılır

**Klip Taşıma:**
- Seçili klibi sürükle
- Farklı bir zaman noktasına taşı
- Farklı bir track'e taşı

**Çoklu Seçim:**
- `Cmd` (Mac) veya `Ctrl` (Windows) basılı tutarken kliplere tıkla
- Birden fazla klibi aynı anda taşı/düzenle

---

### 4️⃣ Timeline Kontrolleri

**Zoom:**
- Timeline üstündeki **🔍−** butonuyla uzaklaş (25%-400%)
- **🔍+** butonuyla yakınlaş
- Orta gösterge zoom seviyesini gösterir

**Playhead (Oynatma Kafası):**
- Timeline'ın herhangi bir yerine tıkla
- Turuncu playhead o noktaya atlar
- Preview panelinde o anın görüntüsü gösterilir

**Oynatma:**
- Preview panelindeki **▶ (Play)** butonuna bas
- Playhead otomatik ilerler
- **⏸ (Pause)** ile duraklat
- **⏮** ve **⏭** ile frame-by-frame git

---

### 5️⃣ Efekt Uygulama

**Video Efektleri:**

1. Sağ üst **Effects** panelinde **Video Effects** sekmesini aç
2. Bir efekt seç:
   - ☀️ Brightness (Parlaklık)
   - ◐ Contrast (Kontrast)
   - 🎨 Saturation (Doygunluk)
   - 🌫️ Blur (Bulanıklık)
   - 🔍 Sharpen (Keskinlik)
3. Efekti timeline'daki klip üzerine sürükle-bırak

**Transitions (Geçişler):**

1. **Transitions** sekmesine geç
2. İki klip arasına geçiş ekle:
   - ◯ Fade
   - ◐ Dissolve
   - ◀︎ Wipe Left
   - ▶︎ Wipe Right
   - ⊕ Zoom

---

### 6️⃣ Klip Özellikleri Düzenleme

Timeline'da bir klip seçiliyken **Properties** panelinde:

**Basic (Temel Bilgiler):**
- İsim
- Süre (Duration)
- Başlangıç zamanı (Start Time)

**Transform (Dönüşüm):**
- **Opacity** slider'ı: Şeffaflık ayarı (0-100%)
- **Scale** slider'ı: Boyut ayarı (0-200%)

**Audio (Ses) - Sadece ses klipleri için:**
- **Volume** slider'ı: Ses seviyesi (0-100%)

**Effects Stack:**
- Eklenen efektlerin listesi
- Sıralamayı değiştir
- Efektleri kaldır

---

### 7️⃣ Track Yönetimi

**Yeni Track Ekle:**
- Timeline üstündeki **+ Video Track** veya **+ Audio Track** butonlarına tıkla
- Sınırsız sayıda track eklenebilir
- Her track bağımsız olarak yönetilir

**Track Kontrolleri:**
- **🔊 (Unmute) / 🔇 (Mute):** Track sesini kapat/aç
- Track başlığına tıklayarak tüm track'i seç

---

### 8️⃣ Video Export Etme

**Export Süreci:**

1. Menü çubuğundan **File > Export Video** (veya `Cmd+E`)
2. Export Dialog açılır
3. **Format** seç:
   - MP4 (önerilen)
   - MOV
   - WebM
4. **Quality** belirle:
   - 4K (3840 × 2160) - 50 Mbps
   - 1080p (1920 × 1080) - 12 Mbps
   - 720p (1280 × 720) - 8 Mbps
   - 480p (854 × 480) - 4 Mbps
5. **Export** butonuna bas
6. Dosya konumunu seç ve kaydet
7. Progress bar render ilerlemesini gösterir

---

## ⌨️ Klavye Kısayolları

| Kısayol | Fonksiyon |
|---------|-----------|
| `Space` | Play/Pause |
| `C` | Cut (Playhead'de kes) |
| `Delete` / `Backspace` | Seçili klibi sil |
| `Cmd+Z` | Geri al (Undo) |
| `Cmd+Shift+Z` | İleri al (Redo) |
| `Cmd+S` | Projeyi kaydet |
| `Cmd+E` | Export video |
| `Cmd+I` | Medya import et |
| `◀︎` / `▶︎` | Frame geri/ileri |

---

## 🎯 Pro İpuçları

1. **Organize Kalın:**
   - Video klipleri için üst track'leri kullanın (V1, V2, V3...)
   - Ses dosyaları için alt track'leri kullanın (A1, A2...)
   - B-roll için ayrı track açın

2. **Zoom Kullanın:**
   - Genel görünüm için zoom out yapın
   - Hassas kesimler için zoom in yapın

3. **Çoklu Seç:**
   - `Cmd` basılı tutarak birden fazla klip seçin
   - Tüm klipleri aynı anda hareket ettirin

4. **Preview Sık Sık:**
   - Değişikliklerden sonra mutlaka preview yapın
   - Play/Pause ile akışı kontrol edin

5. **Projeyi Kaydedin:**
   - Düzenli aralıklarla `Cmd+S` yapın
   - Projelerinizi organize edin

---

## 🚨 Şu Anda Sınırlamalar (Development Versiyonu)

> [!NOTE]
> **Browser Versiyonunda:**
> - Gerçek dosya import **çalışmıyor** (güvenlik kısıtlamaları)
> - FFmpeg render **simüle ediliyor**
> - Gerçek video oynatma **aktif değil**

> [!IMPORTANT]
> **Electron Desktop Uygulamasında:**
> - ✅ File import çalışıyor
> - ✅ Tüm UI özellikleri aktif
> - ⚠️ FFmpeg entegrasyonu için ek geliştirme gerekli

---

## 🎬 Örnek Workflow

1. **Import:** 3 video klip + 1 müzik dosyası import et
2. **Arrange:** Video klipleri V1 track'ine yerleştir, müziği A1'e ekle
3. **Trim:** Gereksiz kısımları kes
4. **Effects:** İlk klibe Brightness efekti ekle
5. **Transitions:** Klipler arası Fade geçişi ekle
6. **Audio:** Müzik seviyesini %60'a düşür
7. **Preview:** Tüm timeline'ı izle
8. **Export:** 1080p MP4 olarak kaydet

---

**CineEdit Pro ile profesyonel video kurgusu artık çok kolay!** 🎬✨
