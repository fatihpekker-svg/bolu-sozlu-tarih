import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Bolu Sözlü Tarih | Şehrin Hafızası",
  description: "Bolu'nun toplumsal hafızasını oluşturan bireysel tanıklıkları kayıt altına alan yerel dijital arşiv.",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="tr" suppressHydrationWarning>
        <body>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
