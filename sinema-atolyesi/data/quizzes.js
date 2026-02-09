// Kuiz soruları - Her ders için örnek 5 soruluk kuiz

export const quizzes = {
    'lesson-1': {
        lessonId: 'lesson-1',
        passingScore: 70,
        questions: [
            {
                id: 'q1-1',
                question: 'Üçte bir kuralı (Rule of Thirds) nedir?',
                options: [
                    'Kareyi 9 eşit parçaya bölen hayali çizgiler',
                    'Işığın üçte birinin gölge olması kuralı',
                    'Her sahnede 3 karakter olması kuralı',
                    'Kameranın üçte bir açıyla konumlandırılması'
                ],
                correctAnswer: 0,
                explanation: 'Üçte bir kuralı, kompozisyonda kareyi 9 eşit parçaya bölen hayali çizgilerin kesişim noktalarına önemli öğeleri yerleştirme prensibidir.'
            },
            {
                id: 'q1-2',
                question: 'Simetrik kompozisyon genellikle ne hissettirir?',
                options: [
                    'Dinamizm ve hareket',
                    'Kaos ve kargaşa',
                    'Denge ve düzen',
                    'Hüzün ve melankoli'
                ],
                correctAnswer: 2,
                explanation: 'Simetrik kompozisyon izleyiciye denge, düzen ve stabilite hissi verir.'
            },
            {
                id: 'q1-3',
                question: 'Headroom (baş boşluğu) nedir?',
                options: [
                    'Karakterin başı ile çerçevenin üst kenarı arasındaki boşluk',
                    'İki karakter arasındaki mesafe',
                    'Kameranın karaktere olan uzaklığı',
                    'Arka plandaki boş alan'
                ],
                correctAnswer: 0,
                explanation: 'Headroom, karakterin başı ile çerçevenin üst kenarı arasındaki boşluktur ve kompozisyonun dengesini etkiler.'
            },
            {
                id: 'q1-4',
                question: 'Leading lines (yönlendirici çizgiler) ne işe yarar?',
                options: [
                    'Sadece estetik görünüm sağlar',
                    'İzleyicinin gözünü belirli bir noktaya yönlendirir',
                    'Işığı kontrol eder',
                    'Ses kalitesini artırır'
                ],
                correctAnswer: 1,
                explanation: 'Leading lines, izleyicinin dikkatini çerçeve içindeki belirli bir noktaya veya öğeye yönlendiren doğal veya yapay çizgilerdir.'
            },
            {
                id: 'q1-5',
                question: 'Negatif alan (negative space) kompozisyonda neden önemlidir?',
                options: [
                    'Hiçbir önemi yoktur, boş alandır',
                    'Sadece bütçe kısıtlaması olduğunda kullanılır',
                    'Odak noktasını vurgular ve izleyiciye nefes aldırır',
                    'Yalnızca siyah-beyaz filmlerde kullanılır'
                ],
                correctAnswer: 2,
                explanation: 'Negatif alan, ana öğeyi vurgular, kompozisyona denge katar ve izleyicinin gözünü dinlendirir.'
            }
        ]
    },

    'lesson-2': {
        lessonId: 'lesson-2',
        passingScore: 70,
        questions: [
            {
                id: 'q2-1',
                question: 'Eye-level (göz hizası) çekim ne zaman kullanılır?',
                options: [
                    'Karakteri küçük göstermek için',
                    'Doğal ve nötr bir bakış açısı vermek için',
                    'Karakteri güçlü göstermek için',
                    'Sadece belgesellerde'
                ],
                correctAnswer: 1,
                explanation: 'Göz hizası çekim, karakterle izleyici arasında eşit bir ilişki kurar ve doğal bir bakış açısı sağlar.'
            },
            {
                id: 'q2-2',
                question: 'High angle (yukarıdan) çekim karakteri nasıl gösterir?',
                options: [
                    'Güçlü ve baskın',
                    'Zayıf ve savunmasız',
                    'Gizemli',
                    'Komik'
                ],
                correctAnswer: 1,
                explanation: 'Yukarıdan çekim, karakteri küçük, zayıf veya savunmasız gösterir.'
            },
            {
                id: 'q2-3',
                question: 'Dutch angle (eğik açı) ne amaçla kullanılır?',
                options: [
                    'Kamera arızası olduğunda',
                    'Huzursuzluk, kaos veya dengesizlik hissi yaratmak için',
                    'Komedi sahnelerinde',
                    'Sadece müzik videolarında'
                ],
                correctAnswer: 1,
                explanation: 'Dutch angle (eğik çekim), kamerayı eğerek huzursuzluk, kaos veya psikolojik dengesizlik hissi oluşturur.'
            },
            {
                id: 'q2-4',
                question: 'Bird\'s eye view (kuş bakışı) nasıl bir çekimdir?',
                options: [
                    'Göz hizasından',
                    'Hafif yukarıdan',
                    'Doğrudan yukarıdan, 90 derece',
                    'Aşağıdan yukarı'
                ],
                correctAnswer: 2,
                explanation: 'Kuş bakışı, sahneyi doğrudan yukarıdan (90 derece) gösteren ve genel bir perspektif sunan çekimdir.'
            },
            {
                id: 'q2-5',
                question: 'Low angle (aşağıdan) çekim ne etki yaratır?',
                options: [
                    'Karakteri zayıf gösterir',
                    'Karakteri güçlü ve baskın gösterir',
                    'Nötr bir etki yaratır',
                    'Sadece komedi için kullanılır'
                ],
                correctAnswer: 1,
                explanation: 'Aşağıdan yapılan çekim karakteri büyük, güçlü ve baskın gösterir.'
            }
        ]
    },

    'lesson-3': {
        lessonId: 'lesson-3',
        passingScore: 70,
        questions: [
            {
                id: 'q3-1',
                question: 'Pan hareketi nedir?',
                options: [
                    'Kameranın ileri-geri hareketi',
                    'Kameranın yatay eksende sağa-sola dönmesi',
                    'Kameranın yukarı-aşağı hareketi',
                    'Yakınlaştırma-uzaklaştırma'
                ],
                correctAnswer: 1,
                explanation: 'Pan, kameranın sabit bir nokta etrafında yatay eksende sağa veya sola dönmesidir.'
            },
            {
                id: 'q3-2',
                question: 'Tilt hareketi nasıl yapılır?',
                options: [
                    'Kamera sağa-sola döner',
                    'Kamera yukarı-aşağı hareket eder',
                    'Kamera öne-arkaya gider',
                    'Kamera dönerek hareket eder'
                ],
                correctAnswer: 1,
                explanation: 'Tilt, kameranın sabit bir nokta etrafında yukarı veya aşağı hareketidir.'
            },
            {
                id: 'q3-3',
                question: 'Tracking shot (takip çekimi) ne demektir?',
                options: [
                    'Kamera yerinde durur',
                    'Kamera bir nesneyi veya kişiyi takip ederek hareket eder',
                    'Sadece zoom kullanılır',
                    'Kamera yukarı-aşağı hareket eder'
                ],
                correctAnswer: 1,
                explanation: 'Tracking shot, kameranın bir karakter veya nesneyi takip ederek hareket ettiği çekimdir.'
            },
            {
                id: 'q3-4',
                question: 'Dolly zoom (Vertigo etkisi) nasıl elde edilir?',
                options: [
                    'Sadece zoom kullanarak',
                    'Kamerayı hareket ettirmeden',
                    'Dolly ile geriye çekilirken zoom yaparak (veya tersi)',
                    'Sadece dijital efektlerle'
                ],
                correctAnswer: 2,
                explanation: 'Dolly zoom, kamera geriye/ileriye hareket ederken aynı anda zoom yapılarak elde edilen, arka planı çarpıtarak psikolojik etki yaratan tekniktir.'
            },
            {
                id: 'q3-5',
                question: 'Handheld (el kamerası) çekim ne amaçla kullanılır?',
                options: [
                    'Sadece düşük bütçeli filmler için',
                    'Gerçekçilik, aciliyet veya kaos hissi yaratmak için',
                    'Sadece belgesellerde',
                    'Profesyonel filmlerde asla kullanılmaz'
                ],
                correctAnswer: 1,
                explanation: 'El kamerası çekimi, doğallık, gerçekçilik, enerji veya kaos hissi yaratmak için kullanılır.'
            }
        ]
    }
};

// Bir derse ait kuizi getir
export function getQuizByLesson(lessonId) {
    return quizzes[lessonId] || null;
}

// Kuiz sonucunu değerlendir
export function evaluateQuiz(lessonId, answers) {
    const quiz = quizzes[lessonId];
    if (!quiz) return null;

    let correctCount = 0;
    const results = quiz.questions.map((q, index) => {
        const userAnswer = answers[index];
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

    return {
        score,
        passed,
        correctCount,
        totalQuestions: quiz.questions.length,
        results
    };
}
