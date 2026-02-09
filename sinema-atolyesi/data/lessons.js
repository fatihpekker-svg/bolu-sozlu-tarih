// Örnek ders verileri - Videolar hazır olduğunda URL'ler güncellenecek

export const levels = [
    {
        id: 1,
        title: 'Temel Kavramlar',
        description: 'Sinemaya giriş ve temel kavramlar',
        icon: '🎬',
        color: '#3b82f6'
    },
    {
        id: 2,
        title: 'Teknik Beceriler',
        description: 'Kamera, ışık ve ses teknikleri',
        icon: '🎥',
        color: '#8b5cf6'
    },
    {
        id: 3,
        title: 'İleri Seviye',
        description: 'Kurgu, yönetmenlik ve prodüksiyon',
        icon: '🏆',
        color: '#f59e0b'
    }
];

export const courses = [
    // Seviye 1 - Temel Kavramlar
    {
        id: 'course-1',
        levelId: 1,
        title: 'Görsel Dil',
        description: 'Sinemada görsel anlatımın temelleri',
        lessonCount: 3,
        duration: '45 dk',
        order: 1
    },
    {
        id: 'course-2',
        levelId: 1,
        title: 'Hikaye Anlatımı',
        description: 'Senaryo ve hikaye yapısı',
        lessonCount: 3,
        duration: '50 dk',
        order: 2
    },

    // Seviye 2 - Teknik Beceriler
    {
        id: 'course-3',
        levelId: 2,
        title: 'Kamera Teknikleri',
        description: 'Kamera kullanımı ve çekim teknikleri',
        lessonCount: 4,
        duration: '60 dk',
        order: 1
    },
    {
        id: 'course-4',
        levelId: 2,
        title: 'Işık ve Renk',
        description: 'Aydınlatma ve renk teorisi',
        lessonCount: 3,
        duration: '45 dk',
        order: 2
    },

    // Seviye 3 - İleri Seviye
    {
        id: 'course-5',
        levelId: 3,
        title: 'Kurgu Sanatı',
        description: 'Montaj ve kurgu teknikleri',
        lessonCount: 4,
        duration: '70 dk',
        order: 1
    },
    {
        id: 'course-6',
        levelId: 3,
        title: 'Yönetmenlik',
        description: 'Film yönetmenliği prensipleri',
        lessonCount: 5,
        duration: '80 dk',
        order: 2
    },
    {
        id: 'course-7',
        levelId: 3,
        title: 'Oyunculuk',
        description: 'Kamera karşısında oyunculuk teknikleri',
        lessonCount: 4,
        duration: '60 dk',
        order: 3
    },
    {
        id: 'course-8',
        levelId: 3,
        title: 'Sanat',
        description: 'Sinema ve sanat tarihi',
        lessonCount: 4,
        duration: '65 dk',
        order: 4
    }
];

export const lessons = [
    // Görsel Dil dersleri
    {
        id: 'lesson-1',
        courseId: 'course-1',
        title: 'Kompozisyon Temelleri',
        description: 'Kadraj, çerçeveleme ve kompozisyon prensipleri',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
        duration: '12:30',
        order: 1,
        resources: [
            { title: 'Ders Notu - Kompozisyon.pdf', url: '#' }
        ]
    },
    {
        id: 'lesson-2',
        courseId: 'course-1',
        title: 'Kamera Açıları',
        description: 'Farklı kamera açıları ve etkileri',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
        duration: '15:45',
        order: 2,
        resources: [
            { title: 'Kamera Açıları Rehberi.pdf', url: '#' }
        ]
    },
    {
        id: 'lesson-3',
        courseId: 'course-1',
        title: 'Harekette Kompozisyon',
        description: 'Dinamik kompozisyon ve hareket',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
        duration: '14:20',
        order: 3,
        resources: []
    },

    // Hikaye Anlatımı dersleri
    {
        id: 'lesson-4',
        courseId: 'course-2',
        title: 'Üç Perde Yapısı',
        description: 'Klasik senaryo yapısı',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
        duration: '18:30',
        order: 1,
        resources: [
            { title: 'Senaryo Yapısı.pdf', url: '#' }
        ]
    },
    {
        id: 'lesson-5',
        courseId: 'course-2',
        title: 'Karakter Gelişimi',
        description: 'Karakter yaratma ve gelişimi',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
        duration: '16:15',
        order: 2,
        resources: []
    },
    {
        id: 'lesson-6',
        courseId: 'course-2',
        title: 'Görsel Hikaye Anlatımı',
        description: 'Show, don\'t tell prensibi',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
        duration: '13:45',
        order: 3,
        resources: [
            { title: 'Görsel Anlatım Teknikleri.pdf', url: '#' }
        ]
    },

    // Seviye 2 - Kamera Teknikleri
    {
        id: 'lesson-7',
        courseId: 'course-3',
        title: 'Kamera Türleri ve Özellikleri',
        description: 'Farklı kamera türleri ve kullanım alanları',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '14:20',
        order: 1,
        resources: []
    },
    {
        id: 'lesson-8',
        courseId: 'course-3',
        title: 'Makineli Kamera Hareketleri',
        description: 'Dolly, crane ve steadicam kullanımı',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '17:45',
        order: 2,
        resources: []
    },
    {
        id: 'lesson-9',
        courseId: 'course-3',
        title: 'Lens Seçimi ve Derinlik',
        description: 'Farklı lensler ve alan derinliği',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '15:30',
        order: 3,
        resources: []
    },
    {
        id: 'lesson-10',
        courseId: 'course-3',
        title: 'Odak ve Pozlama',
        description: 'Manuel odak ve pozlama kontrolü',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '16:50',
        order: 4,
        resources: []
    },

    // Işık ve Renk dersleri
    {
        id: 'lesson-11',
        courseId: 'course-4',
        title: 'Işık Kaynakları ve Özellikler',
        description: 'Doğal ve yapay ışık kaynakları',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '14:15',
        order: 1,
        resources: []
    },
    {
        id: 'lesson-12',
        courseId: 'course-4',
        title: 'Üç Nokta Aydınlatma',
        description: 'Klasik aydınlatma tekniği',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '16:40',
        order: 2,
        resources: []
    },
    {
        id: 'lesson-13',
        courseId: 'course-4',
        title: 'Renk Teorisi ve Sıcaklık',
        description: 'Renk psikolojisi ve beyaz dengesi',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '15:25',
        order: 3,
        resources: []
    },

    // Oyunculuk dersleri (course-7)
    {
        id: 'lesson-14',
        courseId: 'course-7',
        title: 'Oyunculuk Temelleri',
        description: 'Kamera karşısında oyunculuk ve temel teknikler',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '18:30',
        order: 1,
        resources: []
    },
    {
        id: 'lesson-15',
        courseId: 'course-7',
        title: 'Duygu ve Motivasyon',
        description: 'Karakterin iç dünyasını anlama ve yansıtma',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '16:45',
        order: 2,
        resources: []
    },
    {
        id: 'lesson-16',
        courseId: 'course-7',
        title: 'Doğaçlama Teknikleri',
        description: 'Anı yaşama ve spontan oyunculuk',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '14:20',
        order: 3,
        resources: []
    },
    {
        id: 'lesson-17',
        courseId: 'course-7',
        title: 'Kamera ve Oyuncu İlişkisi',
        description: 'Kamera açıları ve oyunculuk üzerine etkileri',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '15:30',
        order: 4,
        resources: []
    },

    // Sanat dersleri (course-8)
    {
        id: 'lesson-18',
        courseId: 'course-8',
        title: 'Sinema ve Sanat Tarihi',
        description: 'Sinemanın doğuşu ve plastik sanatlarla ilişkisi',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '19:15',
        order: 1,
        resources: []
    },
    {
        id: 'lesson-19',
        courseId: 'course-8',
        title: 'Görsel Sanatlar ve Kompozisyon',
        description: 'Resim sanatından sinemaya: kompozisyon ilkeleri',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '17:40',
        order: 2,
        resources: []
    },
    {
        id: 'lesson-20',
        courseId: 'course-8',
        title: 'Auteur Kuramı',
        description: 'Yönetmen-sanatçı kavramı ve sinema akımları',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '16:50',
        order: 3,
        resources: []
    },
    {
        id: 'lesson-21',
        courseId: 'course-8',
        title: 'Çağdaş Sinema Sanatı',
        description: 'Modern ve postmodern sinema yaklaşımları',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '18:00',
        order: 4,
        resources: []
    }
];

// Bir dersin tüm bilgilerini getir
export function getLessonById(id) {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return null;

    const course = courses.find(c => c.id === lesson.courseId);
    const level = levels.find(l => l.id === course?.levelId);

    return {
        ...lesson,
        course,
        level
    };
}

// Bir kursa ait tüm dersleri getir
export function getLessonsByCourse(courseId) {
    return lessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);
}

// Bir seviyeye ait tüm kursları getir
export function getCoursesByLevel(levelId) {
    return courses.filter(c => c.levelId === levelId).sort((a, b) => a.order - b.order);
}
