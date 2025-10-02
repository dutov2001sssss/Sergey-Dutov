// script.js

// Прелоадер
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Кастомный курсор
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX - 20 + 'px';
                follower.style.top = e.clientY - 20 + 'px';
            }, 100);
        });
        
        // Эффекты при наведении на интерактивные элементы
        const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .interest-card, .hero-image, .about-image, .contacts-image');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = '#d4af37';
                follower.style.transform = 'scale(1.5)';
                follower.style.borderColor = '#d4af37';
                follower.style.background = 'rgba(212, 175, 55, 0.1)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = '#d4af37';
                follower.style.transform = 'scale(1)';
                follower.style.borderColor = '#d4af37';
                follower.style.background = 'transparent';
            });
        });
    }
});

// Плавная прокрутка
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

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Анимация для статистики
            if (entry.target.classList.contains('stats-grid')) {
                animateStats();
            }
            
            // Анимация для карточек интересов
            if (entry.target.classList.contains('interest-card')) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    });
}, observerOptions);

// Функция анимации статистики
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        if (finalNumber === '100+') {
            animateValue(stat, 0, 100, 2000, '+');
        } else if (finalNumber === '24') {
            animateValue(stat, 0, 24, 1500, '');
        } else if (finalNumber === '∞') {
            // Для бесконечности просто добавляем класс анимации
            stat.style.animation = 'pulse 2s infinite';
        }
    });
}

// Функция анимации чисел
function animateValue(element, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Инициализация анимаций при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс fade-in к элементам которые должны анимироваться
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .about-grid, .interest-card, .gallery-item, .contacts-content, .stats-grid'
    );
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    // Анимация hover для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('btn-ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Случайные частицы в герое
    createParticles();
});

// Создание частиц для фона
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные свойства
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + '%';
        particle.style.top = posY + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.background = 'rgba(212, 175, 55, ' + (Math.random() * 0.3 + 0.1) + ')';
        
        hero.appendChild(particle);
    }
}

// Функция для загрузки фото (основная)
function loadPhoto(elementId, imageUrl, caption = '') {
    const element = document.getElementById(elementId);
    if (element) {
        const img = new Image();
        img.onload = function() {
            element.style.backgroundImage = `url('${imageUrl}')`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            
            const placeholder = element.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            
            // Добавляем эффект появления
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease';
                element.style.opacity = '1';
            }, 100);
            
            console.log(`Фото загружено: ${elementId}`);
        };
        
        img.onerror = function() {
            console.error(`Ошибка загрузки фото: ${imageUrl}`);
            const placeholder = element.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.textContent = '❌ Ошибка загрузки фото';
                placeholder.style.color = '#ff6b6b';
            }
        };
        
        img.src = imageUrl;
    }
}

// Функция для массовой загрузки всех фото
function loadAllPhotos(photosConfig) {
    photosConfig.forEach(photo => {
        loadPhoto(photo.id, photo.url, photo.caption);
    });
}

// Пример конфигурации фото (раскомментируй и настрой)
/*
const photosConfig = [
    {
        id: 'main-photo',
        url: 'photos/main.jpg',
        caption: 'Главное фото'
    },
    {
        id: 'about-photo', 
        url: 'photos/about.jpg',
        caption: 'Обо мне'
    },
    {
        id: 'gallery-1',
        url: 'photos/gallery1.jpg',
        caption: 'Путешествия'
    },
    {
        id: 'gallery-2',
        url: 'photos/gallery2.jpg', 
        caption: 'Хобби'
    },
    {
        id: 'gallery-3',
        url: 'photos/gallery3.jpg',
        caption: 'Друзья'
    },
    {
        id: 'gallery-4',
        url: 'photos/gallery4.jpg',
        caption: 'Стиль'
    },
    {
        id: 'final-photo',
        url: 'photos/final.jpg',
        caption: 'Контакты'
    }
];

// Загружаем фото после полной загрузки страницы
window.addEventListener('load', function() {
    setTimeout(() => {
        loadAllPhotos(photosConfig);
    }, 2000);
});
*/

// Дополнительные эффекты
// Таймер для обновления времени (опционально)
function updateTime() {
    const timeElement = document.querySelector('.stat-number');
    if (timeElement && timeElement.textContent === '24') {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// Обновляем время каждую минуту
setInterval(updateTime, 60000);

// Эффект печатной машинки для заголовка (опционально)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Инициализация эффекта печатной машинки при необходимости
/*
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});
*/

// Случайные факты при клике на элементы (для интерактивности)
const randomFacts = [
    "Обожаю спонтанные путешествия 🗺️",
    "Могу приготовить идеальный стейк 🥩", 
    "Играю на гитаре когда в настроении 🎸",
    "Коллекционирую редкие виниловые пластинки 🎵",
    "Прошел все части The Witcher 🎮",
    "Знаю лучшие кофейни в городе ☕",
    "Увлекаюсь современным искусством 🎨",
    "Люблю велопрогулки по набережной 🚴"
];

function showRandomFact() {
    const fact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
    
    // Создаем всплывающее уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient);
        color: var(--primary);
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: var(--shadow);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = fact;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем обработчики для показа случайных фактов
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.interest-card, .stat-item');
    interactiveElements.forEach(element => {
        element.addEventListener('click', showRandomFact);
    });
});

console.log('🚀 Премиальный сайт Сергея Дутова инициализирован!');
console.log('💎 Готов к загрузке фотографий');
console.log('🎯 Добавлены интерактивные элементы и анимации');
