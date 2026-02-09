'use client';
import { use, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, CreditCard, Shield, Lock } from 'lucide-react';
import Link from 'next/link';
import { pricingPlans } from '@/data/pricing';
import styles from './page.module.css';

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan') || 'monthly';
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const selectedPlan = pricingPlans.find(p => p.id === planId) || pricingPlans[1];

    useEffect(() => {
        // Kullanıcı bilgisini al
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        setUser(currentUser);

        // Giriş yapmamışsa kayıt sayfasına yönlendir
        if (!currentUser) {
            window.location.href = '/kayit';
        }
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simüle edilmiş ödeme işlemi (gerçek Stripe entegrasyonu için placeholder)
        setTimeout(() => {
            // Kullanıcı subscription bilgisini güncelle
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const updatedUser = {
                ...currentUser,
                subscription: {
                    plan: selectedPlan.id,
                    status: 'active',
                    startDate: new Date().toISOString(),
                    endDate: new Date(Date.now() + (selectedPlan.id === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
                    stripeCustomerId: 'cus_test_' + Math.random().toString(36).substring(7),
                    stripeSubscriptionId: 'sub_test_' + Math.random().toString(36).substring(7)
                }
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Başarılı sayfasına yönlendir
            window.location.href = '/odeme-basarili?plan=' + selectedPlan.id;
        }, 2000);
    };

    if (!user) {
        return <div className="container" style={{ padding: '5rem 0' }}>Yükleniyor...</div>;
    }

    return (
        <div className={styles.paymentPage}>
            <div className="container">
                <Link href="/fiyatlandirma" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    Fiyatlandırmaya Dön
                </Link>

                <div className={styles.paymentGrid}>
                    {/* Payment Form */}
                    <div className={styles.paymentForm}>
                        <h1>Ödeme Bilgileri</h1>
                        <p className={styles.subtitle}>Güvenli ödeme - Stripe tarafından korunmaktadır</p>

                        <div className={styles.securityBadges}>
                            <div className={styles.badge}>
                                <Shield size={20} />
                                <span>256-bit SSL Şifreleme</span>
                            </div>
                            <div className={styles.badge}>
                                <Lock size={20} />
                                <span>PCI-DSS Uyumlu</span>
                            </div>
                        </div>

                        <form onSubmit={handlePayment} className={styles.form}>
                            {/* User Info */}
                            <div className={styles.section}>
                                <h3>Kullanıcı Bilgileri</h3>
                                <div className={styles.formGroup}>
                                    <label>E-posta</label>
                                    <input type="email" value={user.email} disabled />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Ad Soyad</label>
                                    <input type="text" value={user.name} disabled />
                                </div>
                            </div>

                            {/* Card Info - Demo */}
                            <div className={styles.section}>
                                <h3>
                                    <CreditCard size={20} />
                                    Kart Bilgileri
                                </h3>

                                <div className={styles.demoNotice}>
                                    <p><strong>🧪 Test Modu:</strong> Bu demo bir ödeme simülasyonudur.</p>
                                    <p>Gerçek kart bilgisi girmenize gerek yok. "Ödemeyi Tamamla" butonuna tıklayın.</p>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Kart Numarası</label>
                                    <input
                                        type="text"
                                        placeholder="4242 4242 4242 4242"
                                        disabled
                                        className={styles.demoInput}
                                    />
                                    <small>Test kartı - Gerçek bilgi gerekmez</small>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Son Kullanma Tarihi</label>
                                        <input
                                            type="text"
                                            placeholder="12/25"
                                            disabled
                                            className={styles.demoInput}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>CVC</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            disabled
                                            className={styles.demoInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btnSecondary"
                                style={{ width: '100%', padding: '1rem' }}
                                disabled={loading}
                            >
                                {loading ? 'İşleniyor...' : `${selectedPlan.currency}${selectedPlan.price} Öde`}
                            </button>

                            <p className={styles.terms}>
                                Ödemeyi tamamlayarak <Link href="#">Kullanım Koşullarını</Link> ve{' '}
                                <Link href="#">Gizlilik Politikasını</Link> kabul etmiş olursunuz.
                            </p>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.orderSummary}>
                        <h3>Sipariş Özeti</h3>

                        <div className={styles.planDetails}>
                            <div className={styles.planHeader}>
                                <span className={styles.planName}>{selectedPlan.name}</span>
                                {selectedPlan.badge && (
                                    <span className={styles.planBadge}>{selectedPlan.badge}</span>
                                )}
                            </div>
                            <p className={styles.planDescription}>{selectedPlan.description}</p>
                        </div>

                        <div className={styles.priceBreakdown}>
                            <div className={styles.priceRow}>
                                <span>Plan Ücreti</span>
                                <span>{selectedPlan.currency}{selectedPlan.price}</span>
                            </div>
                            <div className={styles.priceRow}>
                                <span>KDV (%20)</span>
                                <span>Dahil</span>
                            </div>
                            <div className={`${styles.priceRow} ${styles.total}`}>
                                <span>Toplam</span>
                                <span>{selectedPlan.currency}{selectedPlan.price}</span>
                            </div>
                        </div>

                        <div className={styles.features}>
                            <h4>Dahil olan özellikler:</h4>
                            <ul>
                                {selectedPlan.features.slice(0, 6).map((feature, idx) => (
                                    <li key={idx}>✓ {feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.guarantee}>
                            <p><strong>💯 Memnuniyet Garantisi</strong></p>
                            <p>30 gün içinde herhangi bir nedenle iade alabilirsiniz.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
