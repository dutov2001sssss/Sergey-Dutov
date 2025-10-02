// script.js - Без багов, с крутыми фишками!

// Анимация появления элементов при скролле
class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// Анимация чисел
class CounterAnimator {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (target === 24 ? '' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 24 ? '' : '+');
            }
        }, 16);
    }
}

// Плавающие элементы
class FloatingElements {
    constructor() {
        this.elements = document.querySelectorAll('.floating-element');
        this.init();
    }
    
    init() {
        this.elements.forEach((element, index) => {
            // Случайная анимация для каждого элемента
            const duration = 3 + Math.random() * 2;
            const delay = index * 0.5;
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
}

// Интерактивный фон
class InteractiveBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        const bg = document.querySelector('.animated-bg');
        bg.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.createParticles();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const count = Math.min(50, window.innerWidth / 20);
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(102, 126, 234, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Возврат частиц на экран
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Эффекты при наведении
class HoverEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Эффект для карточек
        const cards = document.querySelectorAll('.about-card, .gallery-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.tiltCard(card, true));
            card.addEventListener('mouseleave', () => this.tiltCard(card, false));
        });
        
        // Эффект для социальных ссылок
        const links = document.querySelectorAll('.social-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => this.pulseLink(link));
        });
    }
    
    tiltCard(card, enter) {
        if (enter) {
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.05)';
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        }
    }
    
    pulseLink(link) {
        link.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            link.style.animation = '';
        }, 500);
    }
}

// Загрузка фотографий
class PhotoLoader {
    constructor() {
        this.photoElements = {
            'main-photo': 'photos/main.jpg',
            'gallery-1': 'photos/gallery1.jpg',
            'gallery-2': 'photos/gallery2.jpg', 
            'gallery-3': 'photos/gallery3.jpg',
            'gallery-4': 'photos/gallery4.jpg',
            'contact-photo': 'photos/contact.jpg'
        };
    }
    
    loadPhoto(elementId, imageUrl) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const img = new Image();
        img.onload = () => {
            element.style.backgroundImage = `url('${imageUrl}')`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            
            const placeholder = element.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            
            // Эффект появления
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease';
                element.style.opacity = '1';
            }, 100);
        };
        
        img.onerror = () => {
            console.warn(`Не удалось загрузить фото: ${imageUrl}`);
        };
        
        img.src = imageUrl;
    }
    
    loadAll() {
        Object.entries(this.photoElements).forEach(([id, url]) => {
            this.loadPhoto(id, url);
        });
    }
}

// Плавная прокрутка
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Музыкальный проигрыватель (опционально)
class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = 0;
        this.tracks = [
            { name: "Lofi Vibes", emoji: "🎵" },
            { name: "Chill Beats", emoji: "🎶" },
            { name: "Deep Focus", emoji: "🎧" }
        ];
        this.createPlayer();
    }
    
    createPlayer() {
        const player = document.createElement('div');
        player.className = 'music-player';
        player.innerHTML = `
            <div class="track-info">
                <span class="track-emoji">${this.tracks[0].emoji}</span>
                <span class="track-name">${this.tracks[0].name}</span>
            </div>
            <button class="play-btn">▶️</button>
            <button class="next-btn">⏭️</button>
        `;
        
        document.body.appendChild(player);
        
        this.addStyles();
        this.addEventListeners(player);
    }
    
    addStyles() {
        const styles = `
            .music-player {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--card-bg);
                padding: 1rem;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 1rem;
                box-shadow: var(--shadow);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                z-index: 1000;
            }
            .music-player button {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: transform 0.2s ease;
            }
            .music-player button:hover {
                transform: scale(1.1);
            }
            .track-info {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 500;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    addEventListeners(player) {
        const playBtn = player.querySelector('.play-btn');
        const nextBtn = player.querySelector('.next-btn');
        const trackEmoji = player.querySelector('.track-emoji');
        const trackName = player.querySelector('.track-name');
        
        playBtn.addEventListener('click', () => {
            this.isPlaying = !this.isPlaying;
            playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
            // Здесь можно добавить реальное воспроизведение музыки
        });
        
        nextBtn.addEventListener('click', () => {
            this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
            trackEmoji.textContent = this.tracks[this.currentTrack].emoji;
            trackName.textContent = this.tracks[this.currentTrack].name;
        });
    }
}

// Инициализация всего при загрузке
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Запускаем крутой сайт Сергея Дутова!');
    
    // Добавляем классы для анимаций
    document.querySelectorAll('.about-card, .gallery-item, .stat, .social-link').forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Инициализируем все модули
    new ScrollAnimator();
    new CounterAnimator();
    new FloatingElements();
    new InteractiveBackground();
    new HoverEffects();
    new SmoothScroll();
    
    // Опционально: музыкальный проигрыватель
    // new MusicPlayer();
    
    // Загружаем фото (раскомментируй когда будут фото)
    // new PhotoLoader().loadAll();
    
    console.log('✅ Все системы запущены!');
});

// Добавляем CSS анимацию для pulse
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

console.log('🎉 Сайт готов к работе!');
