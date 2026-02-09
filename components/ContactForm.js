"use client";
import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulating API call
        setTimeout(() => {
            setSubmitted(true);
        }, 500);
    };

    if (submitted) {
        return (
            <div className={styles.container} style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                <div style={{ width: '60px', height: '60px', background: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Mesajınız Gönderildi!</h3>
                <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
                    İletişime geçtiğiniz için teşekkür ederiz. Ekibimiz en kısa sürede size geri dönüş yapacaktır.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className={styles.button}
                    style={{ margin: '0 auto' }}
                >
                    Yeni Mesaj Gönder
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <p className={styles.info}>
                Projeye katkıda bulunmak, elinizdeki tarihi materyalleri paylaşmak veya görüşlerinizi iletmek için formu kullanabilirsiniz.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Adınız Soyadınız</label>
                    <input type="text" id="name" name="name" className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>E-posta Adresiniz</label>
                    <input type="email" id="email" name="email" className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Telefon Numaranız</label>
                    <input type="tel" id="phone" name="phone" className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>Konu</label>
                    <input type="text" id="subject" name="subject" className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Mesajınız</label>
                    <textarea id="message" name="message" className={styles.textarea} required></textarea>
                </div>

                <button type="submit" className={styles.button}>Gönder</button>
            </form>
        </div>
    );
}
