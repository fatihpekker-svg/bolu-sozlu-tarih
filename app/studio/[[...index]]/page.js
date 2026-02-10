import Studio from './Studio'

// Required for static export
export const dynamic = 'force-static'

export { metadata } from 'next-sanity/studio/metadata'
export { viewport } from 'next-sanity/studio/viewport'

export function generateStaticParams() {
    return [{ index: [] }]
}

export default function StudioPage() {
    return <Studio />
}
