import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'collection',
    title: 'Tematik Koleksiyon',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Koleksiyon Başlığı',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Bağlantı (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Açıklama',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'mainImage',
            title: 'Kapak Görseli',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'icon',
            title: 'Simgesi',
            type: 'string',
            options: {
                list: [
                    { title: 'Arşiv (Archive)', value: 'Archive' },
                    { title: 'Kişiler (Users)', value: 'Users' },
                    { title: 'Harita (MapPin)', value: 'MapPin' },
                    { title: 'Bina/Şehir (Building2)', value: 'Building2' },
                    { title: 'İş/Zanaat (Briefcase)', value: 'Briefcase' },
                    { title: 'Kitap/Anlatı (BookOpen)', value: 'BookOpen' },
                ],
            },
            initialValue: 'Archive',
        }),
    ],
})
