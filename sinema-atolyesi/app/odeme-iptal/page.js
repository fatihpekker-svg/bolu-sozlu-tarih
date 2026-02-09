'use client';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import styles from './page.module.css';

export default function PaymentCancelPage() {
    return (
        <div className={styles.cancelPage}>
            <div className="container">
                <div className={styles.cancelCard}>
                    <div className={styles.icon}>
                        <XCircle size={80} />
                    </div>

                    <h1>Ödeme İptal Edildi</h1>
                    <p className={styles.subtitle}>
                        Ödeme işlemi iptal edildi. Herhangi bir ücret tahsil edilmedi.
                    </p>

                    <div className={styles.reasons}>
                        <h3>Neden iptal olmuş olabilir?</h3>
                        <ul>
                            <li>İşlemi kendiniz iptal ettiniz</li>
                            <li>Kart bilgileriniz hatalıydı</li>
                            <li>Yetersiz bakiye</li>
                            <li>Bankanız işlemi reddetti</li>
                        </ul>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/fiyatlandirma" className="btn btnSecondary">
                            Fiyatlandırmaya Dön
                        </Link>
                        <Link href="/" className="btn btnPrimary">
                            Ana Sayfa
                        </Link>
                    </div>

                    <div className={styles.help}>
                        <p>Sorun mu yaşıyorsunuz?</p>
                        <Link href="mailto:info@sinemamektebi.com">Destek ekibiyle iletişime geçin →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
