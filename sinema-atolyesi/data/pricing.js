// Fiyatlandırma planları

export const pricingPlans = [
    {
        id: 'free',
        name: 'Ücretsiz Deneme',
        price: 0,
        currency: '₺',
        period: '',
        description: 'Platformu keşfet',
        features: [
            'İlk 3 derse erişim',
            'Video izleme',
            'Ders notları',
            'Sınırlı içerik'
        ],
        limitations: [
            'Kuizlere erişim yok',
            'Sertifika yok',
            'Rozetler yok'
        ],
        cta: 'Ücretsiz Başla',
        highlighted: false,
        stripePriceId: null
    },
    {
        id: 'monthly',
        name: 'Aylık Premium',
        price: 199,
        currency: '₺',
        period: '/ay',
        description: 'Tüm özelliklere erişim',
        features: [
            'Tüm derslere sınırsız erişim',
            'İnteraktif kuizler',
            'Rozetler ve başarılar',
            'Tamamlama sertifikaları',
            'Ders notları ve kaynaklar',
            'Öncelikli destek'
        ],
        limitations: [],
        cta: 'Premium\'a Geç',
        highlighted: true,
        stripePriceId: 'price_monthly_placeholder' // Stripe'da oluşturulacak
    },
    {
        id: 'yearly',
        name: 'Yıllık Premium',
        price: 1990,
        currency: '₺',
        period: '/yıl',
        description: 'En iyi değer - %17 tasarruf',
        badge: '🔥 En Popüler',
        features: [
            'Tüm derslere sınırsız erişim',
            'İnteraktif kuizler',
            'Rozetler ve başarılar',
            'Tamamlama sertifikaları',
            'Ders notları ve kaynaklar',
            'Öncelikli destek',
            'Yeni içeriklere ilk erişim',
            '2 ay ücretsiz (₺400 tasarruf)'
        ],
        limitations: [],
        cta: 'Yıllık\'a Geç',
        highlighted: false,
        stripePriceId: 'price_yearly_placeholder' // Stripe'da oluşturulacak
    }
];

// Kullanıcının mevcut planını kontrol et
export function getUserPlan(user) {
    if (!user || !user.subscription) return pricingPlans[0]; // free

    const planId = user.subscription.plan;
    return pricingPlans.find(p => p.id === planId) || pricingPlans[0];
}

// Kullanıcının premium olup olmadığını kontrol et
export function isPremiumUser(user) {
    if (!user || !user.subscription) return false;

    const { plan, status } = user.subscription;
    return (plan === 'monthly' || plan === 'yearly') && status === 'active';
}

// Kullanıcının belirli bir derse erişimi var mı?
export function canAccessLesson(user, lessonIndex) {
    // İlk 3 ders herkese açık
    if (lessonIndex < 3) return true;

    // Diğer dersler premium gerektirir
    return isPremiumUser(user);
}

// Fiyatları karşılaştırma için yardımcı fonksiyon
export function getMonthlyEquivalent(plan) {
    if (plan.id === 'yearly') {
        return Math.round(plan.price / 12);
    }
    return plan.price;
}
