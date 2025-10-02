// Основные функции для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Эффекты при наведении на карточки
    const interactiveElements = document.querySelectorAll('.skill-card, .gallery-item, .photo-placeholder');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('red-glow');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('red-glow');
        });
    });

    // Динамическое свечение заголовка
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        setInterval(() => {
            const glowIntensity = Math.random() * 25 + 5;
            const blurIntensity = Math.random() * 15 + 5;
            heroTitle.style.textShadow = `
                3px 3px ${glowIntensity}px var(--red),
                0 0 ${blurIntensity}px rgba(255, 0, 54, 0.5)
            `;
        }, 2000);
    }

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.skill-card, .gallery-item, .section-title');
    animatedElements.forEach(el => observer.observe(el));

    // Добавляем эффект пульсации для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });

    console.log('Сайт Сергея Дутова загружен! 🚀');
});

// Функция для замены плейсхолдеров на реальные фото
function replacePhoto(elementId, imageUrl, caption = '') {
    const element = document.getElementById(elementId);
    if (element) {
        // Создаем изображение для предзагрузки
        const img = new Image();
        img.onload = function() {
            // Когда изображение загружено, применяем его
            element.style.backgroundImage = `url('${imageUrl}')`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            element.innerHTML = ''; // Убираем текст плейсхолдера
            
            // Добавляем затемнение для лучшей читаемости если нужно
            element.style.position = 'relative';
            
            if (caption) {
                const captionElement = element.nextElementSibling;
                if (captionElement && captionElement.classList.contains('photo-caption')) {
                    captionElement.textContent = caption;
                    captionElement.style.opacity = '1';
                }
            }
            
            console.log(`Фото загружено: ${elementId}`);
        };
        
        img.onerror = function() {
            console.error(`Ошибка загрузки фото: ${imageUrl}`);
            element.innerHTML = '<span style="color: var(--red)">❌ Ошибка загрузки фото</span>';
        };
        
        img.src = imageUrl;
    } else {
        console.error(`Элемент не найден: ${elementId}`);
    }
}

// Функция для массовой загрузки фото
function loadAllPhotos(photosConfig) {
    photosConfig.forEach(photo => {
        replacePhoto(photo.id, photo.url, photo.caption);
    });
}

// Пример конфигурации фото (раскомментируй и настрой когда будут фото)
/*
const photosConfig = [
    {
        id: 'main-photo',
        url: 'photos/main.jpg',
        caption: 'Это я в своём стиле'
    },
    {
        id: 'about-photo', 
        url: 'photos/about.jpg',
        caption: 'Мой характер в одном кадре'
    },
    {
        id: 'gallery-1',
        url: 'photos/gallery1.jpg',
        caption: ''
    },
    {
        id: 'gallery-2',
        url: 'photos/gallery2.jpg', 
        caption: ''
    },
    {
        id: 'gallery-3',
        url: 'photos/gallery3.jpg',
        caption: ''
    },
    {
        id: 'gallery-4',
        url: 'photos/gallery4.jpg',
        caption: ''
    },
    {
        id: 'final-photo',
        url: 'photos/final.jpg',
        caption: 'Готов к новым знакомствам!'
    }
];

// Загружаем все фото когда страница готова
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loadAllPhotos(photosConfig);
    }, 1000);
});
*/

// Дополнительные утилиты
function changeTheme(theme) {
    // Можно добавить смену темы если захочешь
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--red', '#ff0036');
    } else if (theme === 'purple') {
        root.style.setProperty('--red', '#c300ff');
    }
}

// Функция для показа случайного факта
const randomFacts = [
    "Обожаю спонтанные путешествия",
    "Могу приготовить идеальный стейк", 
    "Играю на гитаре когда в настроении",
    "Коллекционирую редкие виниловые пластинки",
    "Прошел все части The Witcher"
];

function showRandomFact() {
    const fact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
    alert(`📌 Случайный факт: ${fact}`);
}
