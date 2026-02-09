'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Play, BookOpen, Award, TrendingUp, Clock, Crown, ArrowRight } from 'lucide-react';
import { levels, courses, lessons } from '@/data/lessons';
import { isPremiumUser } from '@/data/pricing';
import styles from './page.module.css';

export default function DashboardPage() {
    const [userProgress, setUserProgress] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        // LocalStorage'dan kullanıcı verilerini al
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');

        if (!user) {
            // Kullanıcı giriş yapmamışsa örnek veri göster
            setCurrentUser({ name: 'Misafir Kullanıcı', email: 'misafir@example.com' });
            setUserProgress({});
            setIsPremium(false);
        } else {
            setCurrentUser(user);
            setUserProgress(progress);
            setIsPremium(isPremiumUser(user));
        }
    }, []);

    // İlerleme istatistikleri hesapla - güvenli varsayılan değerlerle
    const completedLessons = userProgress
        ? Object.keys(userProgress).filter(key => userProgress[key]?.completed).length
        : 0;

    const totalPoints = userProgress
        ? Object.values(userProgress).reduce((sum, p) => sum + (p.points || 0), 0)
        : 0;

    const progressPercentage = Math.round((completedLessons / lessons.length) * 100);

    // Devam edilecek son ders
    const lastLesson = userProgress && lessons.find(l =>
        userProgress[l.id] && !userProgress[l.id].completed
    ) || lessons[0];

    // Önerilen sonraki ders
    const nextLesson = userProgress && lessons.find(l => !userProgress[l.id]?.completed) || lessons[0];

    if (!currentUser || !userProgress) return <div>Yükleniyor...</div>;

    return (
        <div className={styles.dashboard}>
            <div className="container">
                {/* Premium Banner */}
                {!isPremium && (
                    <div className={styles.upgradeBanner}>
                        <div className={styles.bannerContent}>
                            <Crown size={32} />
                            <div className={styles.bannerText}>
                                <h3>🎓 Ücretsiz Deneme Kullanıyorsunuz</h3>
                                <p>İlk 3 ders ücretsiz - Tüm derslere erişmek için Premium'a geçin!</p>
                            </div>
                        </div>
                        <Link href="/fiyatlandirma" className="btn btnSecondary">
                            Premium'a Geç
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                )}

                {/* Welcome Header */}
                <div className={styles.welcome}>
                    <div>
                        <h1>Hoş Geldin, {currentUser.name}! 👋</h1>
                        <p>Öğrenmeye kaldığın yerden devam et</p>
                    </div>
                    <Link href="/profil" className="btn btnGhost">
                        Profili Görüntüle
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'var(--gradient-primary)' }}>
                            <BookOpen size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{completedLessons}/{lessons.length}</div>
                            <div className={styles.statLabel}>Tamamlanan Ders</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'var(--gradient-secondary)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{progressPercentage}%</div>
                            <div className={styles.statLabel}>Genel İlerleme</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'var(--gradient-accent)' }}>
                            <Award size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{totalPoints}</div>
                            <div className={styles.statLabel}>Toplam Puan</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: '#10b981' }}>
                            <Clock size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>0</div>
                            <div className={styles.statLabel}>Günlük Seri</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className={styles.contentGrid}>
                    {/* Continue Learning */}
                    <div className={styles.mainColumn}>
                        <div className={styles.section}>
                            <h2>Kaldığın Yerden Devam Et</h2>
                            <div className={styles.lessonCard}>
                                <div className={styles.lessonThumbnail}>
                                    <Play size={48} />
                                </div>
                                <div className={styles.lessonInfo}>
                                    <h3>{lastLesson.title}</h3>
                                    <p>{lastLesson.description}</p>
                                    <div className={styles.lessonMeta}>
                                        <span className="badge badgePrimary">Seviye 1</span>
                                        <span>⏱️ {lastLesson.duration}</span>
                                    </div>
                                </div>
                                <Link href={`/dersler/${lastLesson.id}`} className="btn btnSecondary">
                                    Devam Et
                                </Link>
                            </div>
                        </div>

                        {/* Recommended Next */}
                        <div className={styles.section}>
                            <h2>Önerilen Sonraki Ders</h2>
                            <div className={styles.lessonCard}>
                                <div className={styles.lessonThumbnail}>
                                    <Play size={48} />
                                </div>
                                <div className={styles.lessonInfo}>
                                    <h3>{nextLesson.title}</h3>
                                    <p>{nextLesson.description}</p>
                                    <div className={styles.lessonMeta}>
                                        <span>⏱️ {nextLesson.duration}</span>
                                    </div>
                                </div>
                                <Link href={`/dersler/${nextLesson.id}`} className="btn btnPrimary">
                                    Başlat
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        {/* Progress Overview */}
                        <div className={styles.sidebarCard}>
                            <h3>İlerleme Durumu</h3>
                            <div className="progressBar" style={{ marginTop: '1rem' }}>
                                <div className="progressFill" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <p style={{ marginTop: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                                %{progressPercentage} tamamlandı
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className={styles.sidebarCard}>
                            <h3>Hızlı Erişim</h3>
                            <div className={styles.quickLinks}>
                                <Link href="/seviyeler" className={styles.quickLink}>
                                    <BookOpen size={18} />
                                    Tüm Seviyeler
                                </Link>
                                <Link href="/profil" className={styles.quickLink}>
                                    <Award size={18} />
                                    Rozetlerim
                                </Link>
                            </div>
                        </div>

                        {/* Levels Overview */}
                        <div className={styles.sidebarCard}>
                            <h3>Seviyeler</h3>
                            <div className={styles.levelsList}>
                                {levels.map(level => (
                                    <div key={level.id} className={styles.levelItem}>
                                        <span className={styles.levelEmoji}>{level.icon}</span>
                                        <div>
                                            <div className={styles.levelName}>{level.title}</div>
                                            <div className={styles.levelProgress}>0/6 Ders</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
