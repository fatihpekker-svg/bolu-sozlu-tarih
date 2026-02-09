"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Sözlü tarih nedir?",
        answer: "Sözlü tarih, geçmiş olaylara tanıklık etmiş kişilerin anılarını, sistematik görüşme teknikleriyle kayıt altına alarak tarihi belge niteliği kazandırma yöntemidir."
    },
    {
        question: "Bu projeye kimler katılabilir?",
        answer: "Bolu ve çevresinde yaşamış, yerel tarihe, kültüre veya önemli olaylara tanıklık etmiş herkes hikayesini paylaşarak projeye katılabilir."
    },
    {
        question: "Kayıtlar nasıl kullanılıyor?",
        answer: "Toplanan kayıtlar, deşifre edilip arşivlendikten sonra web sitemiz üzerinden araştırmacıların ve halkın erişimine sunulur. Ayrıca belgesel, kitap ve sergi çalışmalarında kaynak olarak kullanılır."
    },
    {
        question: "Paylaştığım bilgilerin gizliliği sağlanıyor mu?",
        answer: "Evet. Aydınlatılmış onam formunda belirttiğiniz tercihler doğrultusunda, kimlik bilgileriniz veya hassas içerikleriniz gizli tutulabilir veya anonimleştirilebilir."
    },
    {
        question: "Elimdeki eski fotoğrafları bağışlayabilir miyim?",
        answer: "Memnuniyetle! Aile albümlerinizdeki tarihi değeri olan fotoğrafları, dijital kopyasını alarak (aslını size iade ederek) arşivimize katabiliriz."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Sıkça Sorulan Sorular</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                    Merak ettikleriniz ve cevapları.
                </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, index) => (
                    <div key={index} style={{
                        background: '#fff', borderRadius: '8px', border: '1px solid var(--color-border)',
                        overflow: 'hidden'
                    }}>
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            style={{
                                width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                                fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-primary)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <HelpCircle size={20} color="var(--color-secondary)" />
                                {faq.question}
                            </div>
                            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {openIndex === index && (
                            <div style={{
                                padding: '0 1.5rem 1.5rem 1.5rem', lineHeight: '1.7', color: '#4b5563',
                                borderTop: '1px solid #f1f5f9', marginTop: '-0.5rem', paddingTop: '1rem'
                            }}>
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
