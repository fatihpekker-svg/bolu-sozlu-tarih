// Rozet sistemi verisi

export const badges = [
    {
        id: 'first-lesson',
        title: 'İlk Adım',
        description: 'İlk dersinizi tamamladınız',
        icon: '🎬',
        condition: (progress) => Object.keys(progress).filter(k => progress[k]?.completed).length >= 1
    },
    {
        id: 'quiz-master',
        title: 'Kuiz Ustası',
        description: 'İlk kuizinizden %100 aldınız',
        icon: '🎯',
        condition: (progress) => Object.values(progress).some(p => p.quizScore === 100)
    },
    {
        id: 'level-1-complete',
        title: 'Seviye 1 Tamamlandı',
        description: 'Temel Kavramlar seviyesini bitirdiniz',
        icon: '🏆',
        condition: (progress) => {
            const level1Lessons = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6'];
            return level1Lessons.every(id => progress[id]?.completed);
        }
    },
    {
        id: 'fast-learner',
        title: 'Hızlı Öğrenci',
        description: '5 dersi arka arkaya tamamladınız',
        icon: '⚡',
        condition: (progress) => Object.keys(progress).filter(k => progress[k]?.completed).length >= 5
    },
    {
        id: 'perfect-score',
        title: 'Mükemmeliyetçi',
        description: '3 kuizden %100 aldınız',
        icon: '💯',
        condition: (progress) => Object.values(progress).filter(p => p.quizScore === 100).length >= 3
    },
    {
        id: 'dedicated',
        title: 'Kendini Adamış',
        description: '10 dersi tamamladınız',
        icon: '📚',
        condition: (progress) => Object.keys(progress).filter(k => progress[k]?.completed).length >= 10
    }
];

export const certificates = [
    {
        id: 'level-1-cert',
        title: 'Temel Kavramlar Sertifikası',
        level: 1,
        description: 'Seviye 1: Temel Kavramlar\'ı başarıyla tamamladınız',
        condition: (progress) => {
            const level1Lessons = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6'];
            return level1Lessons.every(id => progress[id]?.completed);
        }
    },
    {
        id: 'level-2-cert',
        title: 'Teknik Beceriler Sertifikası',
        level: 2,
        description: 'Seviye 2: Teknik Beceriler\'i başarıyla tamamladınız',
        condition: (progress) => {
            // Şimdilik false, çünkü Seviye 2 dersleri henüz eklenmedi
            return false;
        }
    },
    {
        id: 'level-3-cert',
        title: 'İleri Seviye Sertifikası',
        level: 3,
        description: 'Seviye 3: İleri Seviye\'yi başarıyla tamamladınız',
        condition: (progress) => {
            // Şimdilik false
            return false;
        }
    }
];

// Kullanıcının kazandığı rozetleri getir
export function getEarnedBadges(userProgress) {
    return badges.filter(badge => badge.condition(userProgress));
}

// Kullanıcının kazandığı sertifikaları getir
export function getEarnedCertificates(userProgress) {
    return certificates.filter(cert => cert.condition(userProgress));
}

// Rozetin açılıp açılmadığını kontrol et
export function isBadgeEarned(badgeId, userProgress) {
    const badge = badges.find(b => b.id === badgeId);
    return badge ? badge.condition(userProgress) : false;
}
