'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Award, BookOpen } from 'lucide-react';
import { pricingPlans } from '@/data/pricing';
import styles from './page.module.css';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan') || 'monthly';
    const [user, setUser] = useState(null);

    const plan = pricingPlans.find(p => p.id === planId);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        setUser(currentUser);
    }, []);

    return (
        <div className={styles.successPage}>
            <div className="container">
                <div className={styles.successCard}>
                    <div className={styles.icon}>
                        <CheckCircle size={80} />
                    </div>

                    <h1>Ödeme Başarılı! 🎉</h1>
                    <p className={styles.subtitle}>
                        Premium üyeliğiniz aktif edildi. Tüm derslere sınırsız erişiminiz başladı!
                    </p>

                    {plan && (
                        <div className={styles.planInfo}>
                            <h3>{plan.name}</h3>
                            <p className={styles.price}>
                                {plan.currency}{plan.price}{plan.period}
                            </p>
                        </div>
                    )}

                    <div className={styles.benefits}>
                        <h3>Artık bunlara erişebilirsiniz:</h3>
                        <div className={styles.benefitGrid}>
                            <div className={styles.benefit}>
                                <BookOpen size={32} />
                                <h4>Tüm Dersler</h4>
                                <p>13 ders, 3 seviye</p>
                            </div>
                            <div className={styles.benefit}>
                                <Award size={32} />
                                <h4>Rozetler</h4>
                                <p>Başarılarını topla</p>
                            </div>
                            <div className={styles.benefit}>
                                <CheckCircle size={32} />
                                <h4>Sertifikalar</h4>
                                <p>Seviyeleri tamamla</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/dashboard" className="btn btnSecondary">
                            Dashboard'a Git
                        </Link>
                        <Link href="/seviyeler" className="btn btnPrimary">
                            Derslere Başla
                        </Link>
                    </div>

                    <div className={styles.confirmation}>
                        <p>📧 Onay e-postası {user?.email} adresine gönderildi.</p>
                        <p className={styles.muted}>Fatura ve üyelik bilgilerinizi e-postanızda bulabilirsiniz.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
