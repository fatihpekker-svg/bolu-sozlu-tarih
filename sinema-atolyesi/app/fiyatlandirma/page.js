'use client';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { pricingPlans } from '@/data/pricing';
import styles from './page.module.css';

export default function PricingPage() {
    const handleSelectPlan = (plan) => {
        if (plan.id === 'free') {
            // Ücretsiz plan için kayıt sayfasına yönlendir
            window.location.href = '/kayit';
        } else {
            // Premium planlar için ödeme sayfasına yönlendir
            window.location.href = `/odeme?plan=${plan.id}`;
        }
    };

    return (
        <div className={styles.pricingPage}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <h1>Sinema Eğitimine Başla</h1>
                    <p>İhtiyacınıza en uygun planı seçin ve öğrenmeye başlayın</p>
                </div>

                {/* Pricing Cards */}
                <div className={styles.pricingGrid}>
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`${styles.pricingCard} ${plan.highlighted ? styles.highlighted : ''}`}
                        >
                            {plan.badge && (
                                <div className={styles.badge}>{plan.badge}</div>
                            )}

                            <div className={styles.cardHeader}>
                                <h3>{plan.name}</h3>
                                <p className={styles.description}>{plan.description}</p>
                            </div>

                            <div className={styles.pricing}>
                                <span className={styles.currency}>{plan.currency}</span>
                                <span className={styles.amount}>{plan.price}</span>
                                <span className={styles.period}>{plan.period}</span>
                            </div>

                            {plan.id === 'yearly' && (
                                <div className={styles.savings}>
                                    Aylık ₺{Math.round(plan.price / 12)} - 2 ay ücretsiz!
                                </div>
                            )}

                            <button
                                onClick={() => handleSelectPlan(plan)}
                                className={plan.highlighted ? 'btn btnSecondary' : 'btn btnPrimary'}
                                style={{ width: '100%', marginBottom: '2rem' }}
                            >
                                {plan.cta}
                            </button>

                            {/* Features */}
                            <div className={styles.features}>
                                <h4>Dahil olan özellikler:</h4>
                                <ul className={styles.featureList}>
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className={styles.included}>
                                            <Check size={20} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {plan.limitations && plan.limitations.length > 0 && (
                                    <>
                                        <h4 className={styles.limitationsTitle}>Dahil olmayan:</h4>
                                        <ul className={styles.featureList}>
                                            {plan.limitations.map((limitation, idx) => (
                                                <li key={idx} className={styles.excluded}>
                                                    <X size={20} />
                                                    <span>{limitation}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className={styles.faq}>
                    <h2>Sıkça Sorulan Sorular</h2>
                    <div className={styles.faqGrid}>
                        <div className={styles.faqItem}>
                            <h3>Ücretsiz deneme süresi var mı?</h3>
                            <p>Evet! İlk 3 ders tamamen ücretsiz. Kayıt olmadan hemen izlemeye başlayabilirsiniz.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>İstediğim zaman iptal edebilir miyim?</h3>
                            <p>Evet, istediğiniz zaman üyeliğinizi iptal edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar erişiminiz devam eder.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
                            <p>Tüm kredi ve banka kartlarını (Visa, Mastercard, Troy) güvenli Stripe altyapısı ile kabul ediyoruz.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>Sertifika alabilir miyim?</h3>
                            <p>Evet! Premium üyeler her seviyeyi tamamladığında dijital sertifika kazanır.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className={styles.cta}>
                    <h2>Hala emin değil misiniz?</h2>
                    <p>İlk 3 dersi ücretsiz izleyerek platformu deneyebilirsiniz!</p>
                    <Link href="/kayit" className="btn btnSecondary">
                        Ücretsiz Dene
                    </Link>
                </div>
            </div>
        </div>
    );
}
