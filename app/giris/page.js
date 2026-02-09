export const metadata = {
    title: "Giriş Yap | Sözlü Tarih Arşivi",
};

export default function LoginPage() {
    return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
            <div style={{ background: '#fff', padding: '3rem', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--color-primary)' }}>Giriş Yap</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>E-posta</label>
                        <input type="email" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Şifre</label>
                        <input type="password" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>

                    <button className="btn btnPrimary" style={{ marginTop: '1rem', justifyContent: 'center' }}>Giriş Yap</button>

                    <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1.5rem', paddingTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Hesabınız yok mu?</p>
                        <a href="#" style={{ color: 'var(--color-secondary)', fontWeight: '500' }}>Kayıt Ol</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
