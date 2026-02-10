import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'story',
    title: 'Hikaye',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
        }),
        defineField({
            name: 'interviewee',
            title: 'Tanıklık Eden',
            type: 'string',
        }),
        defineField({
            name: 'interviewer',
            title: 'Konuşturan (Görüşmeci)',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Dönem / Tarih',
            type: 'string',
            description: 'Örn: "1950ler", "Cumhuriyet Dönemi" veya net bir tarih'
        }),
        defineField({
            name: 'slug',
            title: 'Sayfa Bağlantısı (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'excerpt',
            title: 'Özet / Kısa Giriş',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'mainImage',
            title: 'Kapak Fotoğrafı',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Fotoğraf Galerisi',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Fotoğraf Açıklaması',
                        },
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternatif Metin',
                        },
                    ],
                },
            ],
            description: 'Tanıklığa ait eski fotoğraflar'
        }),
        defineField({
            name: 'documents',
            title: 'Belgeler / PDF Arşivi',
            type: 'array',
            of: [
                {
                    type: 'file',
                    title: 'Belge',
                    options: {
                        accept: '.pdf,.doc,.docx'
                    },
                    fields: [
                        {
                            name: 'description',
                            type: 'string',
                            title: 'Belge Tanımı / Başlığı',
                        },
                    ],
                }
            ],
            description: 'Tanıklıkla ilgili resmi evraklar, PDFler veya belgeler'
        }),
        defineField({
            name: 'location',
            title: 'İlçe',
            type: 'string',
            options: {
                list: [
                    { title: 'Merkez', value: 'Merkez' },
                    { title: 'Gerede', value: 'Gerede' },
                    { title: 'Mengen', value: 'Mengen' },
                    { title: 'Mudurnu', value: 'Mudurnu' },
                    { title: 'Göynük', value: 'Göynük' },
                    { title: 'Yeniçağa', value: 'Yeniçağa' },
                    { title: 'Dörtdivan', value: 'Dörtdivan' },
                    { title: 'Seben', value: 'Seben' },
                    { title: 'Kıbrıscık', value: 'Kıbrıscık' },
                ],
            }
        }),
        defineField({
            name: 'village',
            title: 'Mekan / Köy',
            type: 'string',
        }),
        defineField({
            name: 'audio',
            title: 'Ses Kaydı',
            type: 'file',
            options: {
                accept: 'audio/*'
            }
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Video Linki',
            type: 'url',
            description: 'Örn: https://www.youtube.com/watch?v=...'
        }),
        defineField({
            name: 'storyMetadata',
            title: 'Künye Bilgisi (Yönetici Notu/Detaylar)',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Görüşme koşulları, teknik detaylar vb.'
        }),
        defineField({
            name: 'publishedAt',
            title: 'Yayınlanma Tarihi',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Tanıklık Metni / Transkripsiyon',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'collections',
            title: 'Koleksiyonlar',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'collection' } }],
            description: 'Bu hikayenin ait olduğu tematik koleksiyonlar'
        }),
    ],
})
