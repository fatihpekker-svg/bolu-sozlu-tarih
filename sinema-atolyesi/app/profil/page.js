'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Award, BookOpen, TrendingUp, Download } from 'lucide-react';
import { lessons } from '@/data/lessons';
import { getEarnedBadges, getEarnedCertificates, badges } from '@/data/badges';
import styles from './page.module.css';

export default function ProfilePage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProgress, setUserProgress] = useState({});
    const [earnedBadges, setEarnedBadges] = useState([]);
    const [earnedCerts, setEarnedCerts] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');

        if (!user) {
            setCurrentUser({ name: 'Misafir Kullanıcı', email: 'misafir@example.com' });
        } else {
            setCurrentUser(user);
        }

        setUserProgress(progress);
        setEarnedBadges(getEarnedBadges(progress));
        setEarnedCerts(getEarnedCertificates(progress));
    }, []);

    const completedLessons = Object.keys(userProgress).filter(k => userProgress[k]?.completed).length;
    const totalPoints = Object.values(userProgress).reduce((sum, p) => sum + (p.points || 0), 0);
    const progressPercentage = Math.round((completedLessons / lessons.length) * 100);
    const avgQuizScore = Object.values(userProgress).filter(p => p.quizScore).length > 0
        ? Math.round(
            Object.values(userProgress)
                .filter(p => p.quizScore)
                .reduce((sum, p) => sum + p.quizScore, 0) /
            Object.values(userProgress).filter(p => p.quizScore).length
        )
        : 0;

    if (!currentUser) return <div>Yükleniyor...</div>;

    return (
        <div className={styles.profilePage}>
            <div className="container">
                {/* Profile Header */}
                <div className={styles.profileHeader}>
                    <div className={styles.avatar}>
                        <User size={48} />
                    </div>
                    <div className={styles.userInfo}>
                        <h1>{currentUser.name}</h1>
                        <p>{currentUser.email}</p>
                    </div>
                    <Link href="/dashboard" className="btn btnGhost">
                        Dashboard'a Dön
                    </Link>
                </div>

                {/* Stats Summary */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'var(--gradient-primary)' }}>
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <div className={styles.statValue}>{completedLessons}</div>
                            <div className={styles.statLabel}>Tamamlanan Ders</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'var(--gradient-secondary)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <div className={styles.statValue}>{progressPercentage}%</div>
                            <div className={styles.statLabel}>Genel İlerleme</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'var(--gradient-accent)' }}>
                            <Award size={24} />
                        </div>
                        <div>
                            <div className={styles.statValue}>{totalPoints}</div>
                            <div className={styles.statLabel}>Toplam Puan</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: '#10b981' }}>
                            <Award size={24} />
                        </div>
                        <div>
                            <div className={styles.statValue}>{avgQuizScore}%</div>
                            <div className={styles.statLabel}>Ort. Kuiz Skoru</div>
                        </div>
                    </div>
                </div>

                <div className={styles.contentGrid}>
                    {/* Badges Section */}
                    <div className={styles.section}>
                        <h2>🏆 Rozetler</h2>
                        <p className={styles.sectionDesc}>Başarılarınızı gösteren rozetleriniz</p>

                        <div className={styles.badgesGrid}>
                            {badges.map(badge => {
                                const isEarned = earnedBadges.some(b => b.id === badge.id);

                                return (
                                    <div
                                        key={badge.id}
                                        className={`${styles.badgeCard} ${isEarned ? styles.badgeEarned : styles.badgeLocked}`}
                                    >
                                        <div className={styles.badgeIcon}>{badge.icon}</div>
                                        <div className={styles.badgeInfo}>
                                            <h3>{badge.title}</h3>
                                            <p>{badge.description}</p>
                                        </div>
                                        {!isEarned && <div className={styles.lockOverlay}>🔒</div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Certificates Section */}
                    <div className={styles.section}>
                        <h2>📜 Sertifikalar</h2>
                        <p className={styles.sectionDesc}>Seviye tamamlama sertifikalarınız</p>

                        {earnedCerts.length > 0 ? (
                            <div className={styles.certsGrid}>
                                {earnedCerts.map(cert => (
                                    <div key={cert.id} className={styles.certCard}>
                                        <div className={styles.certHeader}>
                                            <Award size={32} color="var(--color-secondary)" />
                                            <h3>{cert.title}</h3>
                                        </div>
                                        <p>{cert.description}</p>
                                        <button className="btn btnSecondary">
                                            <Download size={18} />
                                            İndir (PDF)
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyCerts}>
                                <Award size={64} color="var(--color-border)" />
                                <p>Henüz sertifika kazanmadınız</p>
                                <p className={styles.emptyHint}>Bir seviyeyi tamamlayarak ilk sertifikanızı kazanın!</p>
                            </div>
                        )}
                    </div>

                    {/* Completed Lessons */}
                    <div className={styles.section}>
                        <h2>📚 Tamamlanan Dersler</h2>
                        <p className={styles.sectionDesc}>Başarıyla bitirdiğiniz dersler</p>

                        {completedLessons > 0 ? (
                            <div className={styles.completedList}>
                                {Object.keys(userProgress)
                                    .filter(lessonId => userProgress[lessonId]?.completed)
                                    .map(lessonId => {
                                        const lesson = lessons.find(l => l.id === lessonId);
                                        const progress = userProgress[lessonId];

                                        if (!lesson) return null;

                                        return (
                                            <div key={lessonId} className={styles.completedItem}>
                                                <div className={styles.completedInfo}>
                                                    <h4>{lesson.title}</h4>
                                                    <div className={styles.completedMeta}>
                                                        <span className="badge badgeSuccess">Tamamlandı</span>
                                                        <span>Kuiz Skoru: %{progress.quizScore}</span>
                                                        <span>{progress.points} puan</span>
                                                    </div>
                                                </div>
                                                <Link href={`/dersler/${lessonId}`} className="btn btnGhost">
                                                    Tekrar İzle
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        ) : (
                            <div className={styles.emptyCompleted}>
                                <BookOpen size={64} color="var(--color-border)" />
                                <p>Henüz ders tamamlamadınız</p>
                                <Link href="/seviyeler" className="btn btnPrimary">
                                    Derslere Göz At
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
