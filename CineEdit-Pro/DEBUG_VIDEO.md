# Video Oynatma Hatası Giderme

## Şu anda nerede:
- Timeline'a klip ekledik ✅
- Preview panelde video görünmüyor ❌

## Yapılan değişiklikler:
1. Video path'leri için `file://` protokolü eklendi
2. Console log'ları eklendi debug için
3. Video load error handling eklendi

## Sıradaki adımlar:

### 1. Developer Console'u Aç
Electron penceresinde:
- **Mac:** `Cmd + Option + I`
- **Windows:** `Ctrl + Shift + I`

### 2. Console'da şunları kontrol et:
```
Video URL: file:///path/to/video.mp4
Current clip: {id, mediaId, startTime, duration}
Current media: {id, name, path, type}
```

### 3. Hata mesajları:
- "Video load error" → Dosya yolu yanlış
- "Playback error" → Codec problemi
- Hiçbir log yok → Clip tespit edilmiyor

## Olası Sorunlar ve Çözümleri:

### Sorun 1: Dosya yolu yanlış
**Belirti:** Console'da "Video load error" hatası
**Çözüm:** Dosya yolunu düzeltmek

### Sorun 2: Clip tespit edilmiyor  
**Belirti:** Console'da hiç log yok
**Çözüm:** Timeline'daki clip verilerini kontrol et

### Sorun 3: Video codec desteklenmiyor
**Belirti:** "Format not supported" hatası
**Çözüm:** MP4 H.264 formatına dönüştür

## Test için:
1. Play butonuna bas
2. Timeline akıyor mu? → ✅
3. Console'da loglar görünüyor mu?
4. Hata mesajı var mı?

Bana console'da ne gördüğünü söyle!
