'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import styles from '../kayit/page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basit giriş - Herhangi bir kullanıcı kabul et
        const user = {
            id: Date.now().toString(),
            name: formData.email.split('@')[0],
            email: formData.email,
            loginAt: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(user));

        // Dashboard'a yönlendir
        router.push('/dashboard');
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <h1>Giriş Yap</h1>
                <p className={styles.subtitle}>Öğrenmeye kaldığınız yerden devam edin</p>

                <form onSubmit={handleSubmit} className={styles.form}>
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
                            placeholder="Şifreniz"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btnPrimary" style={{ width: '100%' }}>
                        Giriş Yap
                    </button>
                </form>

                <p className={styles.switchAuth}>
                    Hesabınız yok mu? <Link href="/kayit">Kayıt Olun</Link>
                </p>
            </div>
        </div>
    );
}
