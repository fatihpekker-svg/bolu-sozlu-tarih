import Studio from './Studio'

// Required for static export
export const dynamic = 'force-static'

export const metadata = {
    title: 'Sanity Studio',
    robots: { index: false, follow: false }
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
}

export function generateStaticParams() {
    return [{ index: [] }]
}

export default function StudioPage() {
    return <Studio />
}
