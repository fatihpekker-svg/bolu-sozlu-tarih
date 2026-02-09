'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User } from 'lucide-react';
import styles from './page.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basit kayıt - LocalStorage'a kaydet
        const user = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userProgress', JSON.stringify({}));

        // Dashboard'a yönlendir
        router.push('/dashboard');
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <h1>Kayıt Ol</h1>
                <p className={styles.subtitle}>Sinema öğrenim yolculuğunuza başlayın</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label><User size={18} /> Ad Soyad</label>
                        <input
                            type="text"
                            placeholder="Adınız Soyadınız"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label><Mail size={18} /> E-posta</label>
                        <input
                            type="email"
                            placeholder="ornek@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label><Lock size={18} /> Şifre</label>
                        <input
                            type="password"
                            placeholder="En az 6 karakter"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>

                    <button type="submit" className="btn btnSecondary" style={{ width: '100%' }}>
                        Kayıt Ol
                    </button>
                </form>

                <p className={styles.switchAuth}>
                    Zaten hesabınız var mı? <Link href="/giris">Giriş Yapın</Link>
                </p>
            </div>
        </div>
    );
}
