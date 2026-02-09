import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "İletişim | Bolu Sözlü Tarih Projesi",
    description: "Bolu Sözlü Tarih Projesi ekibiyle iletişime geçin.",
};

export default function ContactPage() {
    return (
        <div className="container section">
            <h1 className="title">İletişim</h1>
            <p className="subtitle">Bizimle iletişime geçin.</p>

            <ContactForm />
        </div>
    );
}
