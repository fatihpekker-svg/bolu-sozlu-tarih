import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sinema Mektebi | İnteraktif Sinema Eğitimi",
  description: "Sinema sanatını öğrenmenin en interaktif yolu. Video dersler, kuizler ve sertifikalarla sinema eğitimi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
