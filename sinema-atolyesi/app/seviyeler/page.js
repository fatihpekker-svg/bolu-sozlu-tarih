import Link from 'next/link';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';
import { levels, courses, getCoursesByLevel, getLessonsByCourse } from '@/data/lessons';
import styles from './page.module.css';

export const metadata = {
    title: 'Seviyeler | Sinema Mektebi',
    description: 'Tüm eğitim seviyelerini ve modüllerini keşfedin',
};

export default function LevelsPage() {
    return (
        <div className={styles.levelsPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Öğrenim Seviyeleri</h1>
                    <p>Temel kavramlardan ileri tekniklere, adım adım sinema sanatını öğrenin</p>
                </div>

                <div className={styles.levelsContainer}>
                    {levels.map((level) => {
                        const levelCourses = getCoursesByLevel(level.id);
                        const totalLessons = levelCourses.reduce((sum, course) => {
                            return sum + getLessonsByCourse(course.id).length;
                        }, 0);
                        const totalDuration = levelCourses.reduce((sum, course) => sum + 45, 0); // Approximate

                        return (
                            <div key={level.id} className={styles.levelSection}>
                                <div className={styles.levelHeader}>
                                    <div className={styles.levelIcon} style={{ background: level.color }}>
                                        {level.icon}
                                    </div>
                                    <div className={styles.levelInfo}>
                                        <h2>{level.title}</h2>
                                        <p>{level.description}</p>
                                        <div className={styles.levelMeta}>
                                            <span><BookOpen size={16} /> {totalLessons} Ders</span>
                                            <span><Clock size={16} /> ~{totalDuration} dk</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.coursesGrid}>
                                    {levelCourses.map((course) => {
                                        const lessons = getLessonsByCourse(course.id);

                                        return (
                                            <div key={course.id} className={styles.courseCard}>
                                                <div className={styles.courseHeader}>
                                                    <h3>{course.title}</h3>
                                                    <span className="badge badgePrimary">{lessons.length} Ders</span>
                                                </div>
                                                <p className={styles.courseDescription}>{course.description}</p>

                                                <div className={styles.lessonsList}>
                                                    {lessons.map((lesson, idx) => (
                                                        <Link
                                                            key={lesson.id}
                                                            href={`/dersler/${lesson.id}`}
                                                            className={styles.lessonItem}
                                                        >
                                                            <div className={styles.lessonNumber}>{idx + 1}</div>
                                                            <div className={styles.lessonDetails}>
                                                                <div className={styles.lessonTitle}>{lesson.title}</div>
                                                                <div className={styles.lessonDuration}>
                                                                    <Clock size={14} /> {lesson.duration}
                                                                </div>
                                                            </div>
                                                            <CheckCircle size={18} className={styles.lessonCheck} />
                                                        </Link>
                                                    ))}
                                                </div>

                                                <Link href={`/dersler/${lessons[0]?.id}`} className="btn btnPrimary" style={{ marginTop: '1rem', width: '100%' }}>
                                                    Modülü Başlat
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
