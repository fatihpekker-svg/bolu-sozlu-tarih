import { ClerkProvider } from "@clerk/nextjs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "Bolu Sözlü Tarih | Şehrin Hafızası",
  description: "Bolu'nun toplumsal hafızasını oluşturan bireysel tanıklıkları kayıt altına alan yerel dijital arşiv.",
};

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
