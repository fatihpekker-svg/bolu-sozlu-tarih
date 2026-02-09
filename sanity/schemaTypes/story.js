import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'story',
    title: 'Story',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'interviewee',
            title: 'Interviewee Name',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date / Era',
            type: 'string',
            description: 'e.g. "1954 from Memories" or specific date'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'location',
            title: 'District',
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
            name: 'audio',
            title: 'Audio Recording',
            type: 'file',
            options: {
                accept: 'audio/*'
            }
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Video URL',
            type: 'url',
            description: 'e.g. https://www.youtube.com/watch?v=...'
        }),

        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }]
        }),
    ],
})
