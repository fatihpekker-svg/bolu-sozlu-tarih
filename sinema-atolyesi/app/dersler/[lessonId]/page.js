'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Download, CheckCircle, PlayCircle } from 'lucide-react';
import { getLessonById } from '@/data/lessons';
import { getQuizByLesson } from '@/data/quizzes';
import styles from './page.module.css';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function LessonPage({ params }) {
    const resolvedParams = use(params);
    const lessonId = resolvedParams.lessonId;

    const [watched, setWatched] = useState(0);
    const [quizReady, setQuizReady] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizResult, setQuizResult] = useState(null);

    const lessonData = getLessonById(lessonId);
    const quiz = getQuizByLesson(lessonId);

    useEffect(() => {
        // LocalStorage'dan ilerlemeyi yükle
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        if (progress[lessonId]) {
            setWatched(progress[lessonId].watched || 0);
        }
    }, [lessonId]);

    const handleProgress = (state) => {
        const percentage = Math.round(state.played * 100);
        setWatched(percentage);

        // %80'i geçtiyse kuiz açılsın
        if (percentage >= 80 && !quizReady) {
            setQuizReady(true);
        }

        // LocalStorage'a kaydet
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        progress[lessonId] = {
            ...progress[lessonId],
            watched: percentage
        };
        localStorage.setItem('userProgress', JSON.stringify(progress));
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();

        if (!quiz) return;

        let correctCount = 0;
        const results = quiz.questions.map((q, index) => {
            const userAnswer = parseInt(quizAnswers[index]);
            const isCorrect = userAnswer === q.correctAnswer;
            if (isCorrect) correctCount++;

            return {
                questionId: q.id,
                isCorrect,
                userAnswer,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation
            };
        });

        const score = Math.round((correctCount / quiz.questions.length) * 100);
        const passed = score >= quiz.passingScore;

        setQuizResult({
            score,
            passed,
            correctCount,
            totalQuestions: quiz.questions.length,
            results
        });

        // İlerlemeyi kaydet
        if (passed) {
            const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
            progress[lessonId] = {
                watched: 100,
                quizScore: score,
                completed: true,
                points: 100,
                completedAt: new Date().toISOString()
            };
            localStorage.setItem('userProgress', JSON.stringify(progress));
        }
    };

    if (!lessonData) {
        return <div className="container" style={{ padding: '5rem 0' }}>Ders bulunamadı.</div>;
    }

    return (
        <div className={styles.lessonPage}>
            <div className="container">
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link href="/dashboard" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Dashboard'a Dön
                    </Link>
                    <span className={styles.breadcrumbSep}>/</span>
                    <span>{lessonData.level?.title}</span>
                    <span className={styles.breadcrumbSep}>/</span>
                    <span>{lessonData.course?.title}</span>
                </div>

                <div className={styles.contentGrid}>
                    {/* Main Content */}
                    <div className={styles.mainContent}>
                        {/* Video Player */}
                        <div className={styles.videoContainer}>
                            <ReactPlayer
                                url={lessonData.videoUrl}
                                width="100%"
                                height="100%"
                                controls
                                onProgress={handleProgress}
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 1 }
                                    }
                                }}
                            />
                        </div>

                        {/* Lesson Info */}
                        <div className={styles.lessonInfo}>
                            <h1>{lessonData.title}</h1>
                            <p className={styles.description}>{lessonData.description}</p>

                            <div className={styles.progressSection}>
                                <div className={styles.progressLabel}>
                                    <span>İzleme ilerlemeniz</span>
                                    <span>{watched}%</span>
                                </div>
                                <div className="progressBar">
                                    <div className="progressFill" style={{ width: `${watched}%` }}></div>
                                </div>
                            </div>

                            {/* Resources */}
                            {lessonData.resources && lessonData.resources.length > 0 && (
                                <div className={styles.resources}>
                                    <h3>Ders Kaynakları</h3>
                                    <div className={styles.resourceList}>
                                        {lessonData.resources.map((resource, idx) => (
                                            <a key={idx} href={resource.url} className={styles.resourceItem}>
                                                <Download size={18} />
                                                {resource.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quiz Section */}
                        {quiz && (
                            <div className={styles.quizSection}>
                                {!showQuiz ? (
                                    <div className={styles.quizPrompt}>
                                        <h2>Kuiz Zamanı!</h2>
                                        <p>Öğrendiklerinizi test edin ve dersi tamamlayın.</p>
                                        {quizReady ? (
                                            <button
                                                onClick={() => setShowQuiz(true)}
                                                className="btn btnSecondary"
                                            >
                                                <PlayCircle size={20} />
                                                Kuizi Başlat
                                            </button>
                                        ) : (
                                            <p className={styles.quizLocked}>
                                                🔒 Video en az %80 izlendiğinde kuiz açılacak
                                            </p>
                                        )}
                                    </div>
                                ) : quizResult ? (
                                    <div className={styles.quizResult}>
                                        <h2>{quizResult.passed ? '🎉 Tebrikler!' : '😞 Tekrar Deneyin'}</h2>
                                        <div className={styles.scoreDisplay}>
                                            <div className={styles.scoreBig}>%{quizResult.score}</div>
                                            <div className={styles.scoreDetail}>
                                                {quizResult.correctCount} / {quizResult.totalQuestions} doğru cevap
                                            </div>
                                        </div>

                                        {quizResult.passed ? (
                                            <div className={styles.passedMessage}>
                                                <CheckCircle size={48} color="var(--color-success)" />
                                                <p>Dersi başarıyla tamamladınız! 100 puan kazandınız.</p>
                                                <Link href="/dashboard" className="btn btnSecondary">
                                                    Dashboard'a Dön
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className={styles.failedMessage}>
                                                <p>Geçmek için en az %{quiz.passingScore} puan gerekli.</p>
                                                <button onClick={() => { setQuizResult(null); setQuizAnswers({}); }} className="btn btnPrimary">
                                                    Tekrar Dene
                                                </button>
                                            </div>
                                        )}

                                        {/* Show answers */}
                                        <div className={styles.answerReview}>
                                            <h3>Cevap Anahtarı</h3>
                                            {quiz.questions.map((q, idx) => (
                                                <div key={q.id} className={styles.answerItem}>
                                                    <div className={styles.answerHeader}>
                                                        <span className={`badge ${quizResult.results[idx].isCorrect ? 'badgeSuccess' : 'badgeWarning'}`}>
                                                            {quizResult.results[idx].isCorrect ? '✓ Doğru' : '✗ Yanlış'}
                                                        </span>
                                                    </div>
                                                    <div className={styles.answerQuestion}>{q.question}</div>
                                                    <div className={styles.answerExplanation}>{q.explanation}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleQuizSubmit} className={styles.quizForm}>
                                        <h2>Kuiz - {quiz.questions.length} Soru</h2>

                                        {quiz.questions.map((q, idx) => (
                                            <div key={q.id} className={styles.question}>
                                                <div className={styles.questionText}>
                                                    <span className={styles.questionNumber}>Soru {idx + 1}</span>
                                                    {q.question}
                                                </div>
                                                <div className={styles.options}>
                                                    {q.options.map((option, optIdx) => (
                                                        <label key={optIdx} className={styles.option}>
                                                            <input
                                                                type="radio"
                                                                name={`question-${idx}`}
                                                                value={optIdx}
                                                                checked={quizAnswers[idx] === optIdx.toString()}
                                                                onChange={(e) => setQuizAnswers({ ...quizAnswers, [idx]: e.target.value })}
                                                                required
                                                            />
                                                            <span>{option}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        <button type="submit" className="btn btnSecondary" style={{ width: '100%' }}>
                                            Kuizi Tamamla
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarCard}>
                            <h3>Ders Bilgileri</h3>
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Seviye</span>
                                    <span className={styles.metaValue}>{lessonData.level?.title}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Modül</span>
                                    <span className={styles.metaValue}>{lessonData.course?.title}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Süre</span>
                                    <span className={styles.metaValue}>{lessonData.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
