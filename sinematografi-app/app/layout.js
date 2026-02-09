import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Sinematografi Eğitim Platformu | Kamera ve Işık Sanatı',
    description: 'İnteraktif simülasyonlar ve görsel örneklerle kamera ve ışık sanatını öğrenin. Temel tekniklerden profesyonel uygulamalara kadar sinematografinin tüm yönlerini keşfedin.',
    keywords: 'sinematografi, kamera ayarları, diyafram, ISO, enstantane, kadraj, objektif, lighting, ışıklandırma, film eğitimi',
    authors: [{ name: 'Sinematografi Eğitim Platformu' }],
    openGraph: {
        title: 'Sinematografi Eğitim Platformu',
        description: 'İnteraktif simülasyonlarla sinematografi öğrenin',
        type: 'website',
        locale: 'tr_TR',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sinematografi Eğitim Platformu',
        description: 'İnteraktif simülasyonlarla sinematografi öğrenin',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
