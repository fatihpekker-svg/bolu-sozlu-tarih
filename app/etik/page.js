import Link from "next/link";
import { Shield, Lock, FileText, Scale } from "lucide-react";

export const metadata = {
    title: "Etik ve Yasal | Bolu Sözlü Tarih",
    description: "Bolu Sözlü Tarih Projesi'nin etik ilkeleri, katılımcı hakları ve yasal kullanım koşulları.",
};

export default function EthicsPage() {
    return (
        <div className="container section">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Etik ve Yasal</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                        Bu proje, uluslararası sözlü tarih standartlarına ve katılımcı haklarına saygı çerçevesinde yürütülmektedir.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                    {/* Section 1 */}
                    <section id="onam">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#dbeafe', padding: '10px', borderRadius: '8px', color: '#1e40af' }}>
                                <FileText size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', margin: 0 }}>Aydınlatılmış Onam</h2>
                        </div>
                        <div style={{ lineHeight: '1.7', color: '#374151', fontSize: '1.05rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Bolu Sözlü Tarih Projesi'ne katılan her birey, sürecin her aşamasında bilgilendirilme hakkına sahiptir.
                                Görüşmeler başlamadan önce katılımcılara projenin amacı, kapsamı ve kayıtların nerede kullanılacağı açıkça anlatılır.
                            </p>
                            <p>
                                Katılımcılardan yazılı veya sesli olarak <strong>"Aydınlatılmış Onam Formu"</strong> alınmadan hiçbir kayıt arşivlenmez veya yayınlanmaz.
                                Katılımcılar, diledikleri zaman kayıtların bir kısmının veya tamamının erişime kapatılmasını talep etme hakkına sahiptir.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section id="gizlilik">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '8px', color: '#166534' }}>
                                <Shield size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', margin: 0 }}>Gizlilik ve Veri Koruma</h2>
                        </div>
                        <div style={{ lineHeight: '1.7', color: '#374151', fontSize: '1.05rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, katılımcıların özel hayatın gizliliğini ihlal edebilecek hassas verileri (adres, telefon vb.)
                                kesinlikle halka açık platformda yayınlanmaz.
                            </p>
                            <p>
                                Sadece katılımcının rıza gösterdiği bilgiler (Ad, Soyad, Meslek, Doğum Yeri vb.) arşiv kartında yer alır.
                                Hassas içerik barındıran kayıtlar, araştırmacıların erişimine özel izinle açılabilir veya anonimleştirilebilir.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section id="telif">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '8px', color: '#92400e' }}>
                                <Scale size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', margin: 0 }}>Telif ve Kullanım</h2>
                        </div>
                        <div style={{ lineHeight: '1.7', color: '#374151', fontSize: '1.05rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Arşivdeki materyaller, <strong>Creative Commons (CC BY-NC-ND 4.0)</strong> lisansı ile paylaşılmaktadır.
                                Bu lisans kapsamında materyaller:
                            </p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                                <li>Ticari amaçla kullanılamaz.</li>
                                <li>Eserin bütünlüğü bozulamaz ve değiştirilemez.</li>
                                <li>Kaynak gösterilmek zorundadır.</li>
                            </ul>
                            <p>
                                Akademik çalışmalarda veya eğitim materyallerinde kullanım için lütfen referans kurallarına uyunuz.
                            </p>
                        </div>
                    </section>

                    {/* Contact Box */}
                    <div style={{ marginTop: '2rem', padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Sorularınız mı var?</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
                            Etik kurallar veya yasal süreçlerle ilgili daha fazla bilgi almak için Etik Kurulumuzla iletişime geçebilirsiniz.
                        </p>
                        <Link href="/contact" className="btn btnPrimary">
                            Bize Ulaşın
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
