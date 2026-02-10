"use client";
import { useState } from "react";
import { Upload, Mic, FileText, CheckCircle, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function ContributePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showGuide, setShowGuide] = useState(false);
    const steps = [
        { label: 'Kişisel Bilgiler' },
        { label: 'Hikaye Detayları' },
        { label: 'Dosya Yükleme' },
        { label: 'Onay' }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="container section">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', color: 'var(--color-primary)' }}>Hikayeni Paylaş</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                        Tarihe bir not düşmek ister misiniz? Kendi hikayenizi veya aile büyüklerinizin anılarını paylaşarak arşive katkıda bulunun.
                    </p>
                </div>

                {/* Visual Guide Accordion */}
                <div style={{ marginBottom: '3rem' }}>
                    <button
                        onClick={() => setShowGuide(!showGuide)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            margin: '0 auto', padding: '0.75rem 1.5rem', borderRadius: '50px',
                            background: showGuide ? 'var(--color-primary)' : '#fff',
                            color: showGuide ? '#fff' : 'var(--color-primary)',
                            border: '1px solid var(--color-primary)',
                            fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        <HelpCircle size={20} />
                        Nasıl Yapılır?
                        {showGuide ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {showGuide && (
                        <div style={{ marginTop: '2rem', background: '#f8fafc', padding: '3rem', borderRadius: '12px', border: '1px solid #e2e8f0', animation: 'fadeIn 0.3s ease-in-out' }}>
                            <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '2.5rem', color: 'var(--color-primary)' }}>Katkı Süreci</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>1</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Hazırlık Yapın</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Anlatmak istediğiniz hikayeyi veya elinizdeki belgeleri hazırlayın.</p>
                                </div>

                                {/* Arrow Connector (Desktop only visual) */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>2</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Formu Doldurun</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Aşağıdaki sihirbazı kullanarak gerekli bilgileri adım adım girin.</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>3</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Dosyaları Yükleyin</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Ses, fotoğraf veya belge. İlgili dosyaları güvenle yükleyin.</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>4</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Onaylayın</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Bilgilerinizi kontrol edip gönderin. Editörlerimiz inceleyip yayınlasın.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Wizard Steps */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '20px', left: '0', right: '0', height: '2px', background: '#e5e7eb', zIndex: 0 }}></div>
                    {steps.map((step, i) => (
                        <div key={i} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: i <= currentStep ? 'var(--color-secondary)' : '#fff',
                                border: i <= currentStep ? 'none' : '2px solid #e5e7eb',
                                color: i <= currentStep ? '#fff' : '#9ca3af',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                            }}>
                                {i + 1}
                            </div>
                            <span style={{ fontSize: '0.9rem', color: i <= currentStep ? 'var(--color-primary)' : '#9ca3af', fontWeight: i <= currentStep ? '600' : '400' }}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Container */}
                <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '3rem' }}>
                    {currentStep === 0 && (
                        <>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                                Adım 1: Kişisel Bilgiler
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>Adınız</label>
                                    <input type="text" className="input" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>Soyadınız</label>
                                    <input type="text" className="input" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>E-posta Adresi</label>
                                    <input type="email" className="input" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>Telefon (İsteğe bağlı)</label>
                                    <input type="tel" className="input" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 1 && (
                        <>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                                Adım 2: Hikaye Detayları
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>Hikaye Başlığı</label>
                                    <input type="text" className="input" placeholder="Örn: Dedemin Göç Anıları" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>Tahmini Tarih</label>
                                    <input type="text" className="input" placeholder="Örn: 1950-1960 arası" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>Konu / Kategori</label>
                                    <select className="input" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff' }}>
                                        <option>Seçiniz...</option>
                                        <option>Göç</option>
                                        <option>Meslekler</option>
                                        <option>Şehir Hayatı</option>
                                        <option>Diğer</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '500' }}>Kısa Açıklama</label>
                                    <textarea className="input" rows="4" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }}></textarea>
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                                Adım 3: Dosya Yükleme
                            </h2>
                            <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', background: '#f9fafb' }}>
                                <Upload size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
                                <p style={{ fontSize: '1.1rem', fontWeight: '500', color: '#4b5563' }}>Dosyaları buraya sürükleyin veya seçin</p>
                                <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '0.5rem' }}>MP3, MP4, JPG, PNG (Maks 50MB)</p>
                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#16a34a' }}>
                                <CheckCircle size={48} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Teşekkürler!</h2>
                            <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '500px', margin: '0 auto' }}>
                                Hikayeniz başarıyla bize ulaştı. Editörlerimiz inceledikten sonra arşivimizde yerini alacaktır.
                            </p>
                        </div>
                    )}

                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                        {currentStep > 0 && currentStep < 3 && (
                            <button onClick={prevStep} className="btn btnOutline" style={{ padding: '1rem 2rem' }}>Geri</button>
                        )}
                        <div style={{ flex: 1 }}></div>
                        {currentStep < 3 && (
                            <button onClick={nextStep} className="btn btnPrimary" style={{ padding: '1rem 3rem' }}>
                                {currentStep === 2 ? 'Tamamla' : 'Devam Et'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <Mic size={40} style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Ses Kaydı</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Kendi sesinizle anlattığınız hikayeleri yükleyebilirsiniz.</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <Upload size={40} style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Fotoğraf & Belge</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Aile albümlerinizden tarihi fotoğrafları dijitalleştirin.</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <FileText size={40} style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Yazılı Anı</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Yazılı olarak hazırladığınız anılarınızı paylaşın.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
