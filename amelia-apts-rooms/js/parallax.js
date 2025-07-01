/**
 * Advanced Parallax Effect for Amelia Apts & Rooms
 * Includes smooth scrolling, parallax backgrounds, and fade-in animations
 */

class ParallaxController {
    constructor() {
        this.scrollY = 0;
        this.isScrolling = false;
        this.parallaxElements = [];
        this.fadeElements = [];
        this.ticking = false;
        
        this.init();
    }

    init() {
        this.setupParallaxElements();
        this.setupFadeElements();
        this.bindEvents();
        this.startParallax();
    }

    setupParallaxElements() {
        // Configurazione elementi parallax
        this.parallaxElements = [
            {
                element: document.querySelector('.hero-section'),
                speed: 0.5,
                type: 'background'
            },
            {
                element: document.querySelector('.testimonials-section'),
                speed: 0.3,
                type: 'transform'
            },
            {
                element: document.querySelector('.discover-escape-section'),
                speed: 0.4,
                type: 'transform'
            },
            {
                element: document.querySelector('.extra-services-section'),
                speed: 0.2,
                type: 'background'
            },
            {
                element: document.querySelector('.nearby-highlights-section'),
                speed: 0.3,
                type: 'transform'
            }
        ];

        // Filtra elementi che esistono
        this.parallaxElements = this.parallaxElements.filter(item => item.element);
    }

    setupFadeElements() {
        // Elementi che dovranno fare fade-in
        this.fadeElements = [
            ...document.querySelectorAll('.testimonial-card'),
            ...document.querySelectorAll('.attraction-card'),
            ...document.querySelectorAll('.service-item'),
            ...document.querySelectorAll('.highlight-item'),
            document.querySelector('.contact-section')
        ].filter(el => el);

        // Inizializza elementi come invisibili
        this.fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        });
    }

    bindEvents() {
        // Ottimizzazione scroll con requestAnimationFrame
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
            this.isScrolling = true;
            
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.updateFadeElements();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        // Gestione resize
        window.addEventListener('resize', () => {
            this.setupParallaxElements();
        });
    }

    updateParallax() {
        const windowHeight = window.innerHeight;
        
        this.parallaxElements.forEach(item => {
            const { element, speed, type } = item;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + this.scrollY;
            const elementHeight = rect.height;
            
            // Calcola se l'elemento è visibile
            const isVisible = (
                rect.top < windowHeight && 
                rect.bottom > 0
            );
            
            if (isVisible) {
                const yPos = -(this.scrollY - elementTop) * speed;
                
                if (type === 'background') {
                    element.style.backgroundPositionY = `${yPos}px`;
                } else if (type === 'transform') {
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            }
        });
    }

    updateFadeElements() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8;
        
        this.fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            
            if (rect.top < triggerPoint && rect.bottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    startParallax() {
        // Avvia immediatamente per elementi già visibili
        this.updateParallax();
        this.updateFadeElements();
    }
}

// Smooth scroll per i link di navigazione
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Aggiungi smooth scroll a tutti i link interni
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.scrollToElement(targetElement);
                }
            });
        });
    }

    scrollToElement(element) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Effetto parallax per il video hero
class HeroParallax {
    constructor() {
        this.heroVideo = document.getElementById('hero-video');
        this.heroSection = document.querySelector('.hero-section');
        this.heroHeight = 0;
        this.scrollCount = 0;
        this.lastScrollY = 0;
        this.scrollThreshold = 50; // Minimo scroll per contare come "uno scroll"
        this.fadeStartScrolls = 3; // Inizia a svanire dopo 3 scroll
        this.fadeEndScrolls = 6; // Completamente invisibile dopo 6 scroll
        this.scrollDirection = 'down'; // Traccia la direzione dello scroll
        this.maxScrollCount = 0; // Tiene traccia del massimo scroll raggiunto
        this.init();
    }

    init() {
        if (!this.heroVideo || !this.heroSection) return;

        // Calcola l'altezza della sezione hero
        this.heroHeight = this.heroSection.offsetHeight;
        
        // Aggiorna l'altezza su resize
        window.addEventListener('resize', () => {
            this.heroHeight = this.heroSection.offsetHeight;
        });

        window.addEventListener('scroll', () => {
            this.updateScrollTracking();
            this.updateHeroParallax();
        }, { passive: true });
    }

    updateScrollTracking() {
        const currentScrollY = window.pageYOffset;
        const scrollDifference = Math.abs(currentScrollY - this.lastScrollY);
        
        // Determina la direzione dello scroll
        if (currentScrollY > this.lastScrollY) {
            this.scrollDirection = 'down';
        } else if (currentScrollY < this.lastScrollY) {
            this.scrollDirection = 'up';
        }
        
        // Se lo scroll è significativo, aggiorna il contatore
        if (scrollDifference > this.scrollThreshold) {
            if (this.scrollDirection === 'down') {
                // Scrolling verso il basso - incrementa
                this.scrollCount++;
                this.maxScrollCount = Math.max(this.maxScrollCount, this.scrollCount);
            } else {
                // Scrolling verso l'alto - decrementa ma non sotto 0
                this.scrollCount = Math.max(0, this.scrollCount - 1);
            }
            
            this.lastScrollY = currentScrollY;
        }
        
        // Se siamo tornati vicino alla cima (primi 200px), reset completo
        if (currentScrollY < 200) {
            this.scrollCount = 0;
            this.maxScrollCount = 0;
        }
    }

    updateHeroParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = this.heroHeight;
        
        // Calcola il parallax solo se siamo nella sezione hero o poco oltre
        if (scrolled < heroHeight * 1.2) {
            const parallax = scrolled * 0.3; // Effetto parallax sottile
            
            // Calcola l'opacità basata sul numero di scroll corrente
            let opacity = 1;
            
            if (this.scrollCount >= this.fadeStartScrolls) {
                // Inizia a svanire dopo il 3° scroll
                const fadeProgress = (this.scrollCount - this.fadeStartScrolls) / (this.fadeEndScrolls - this.fadeStartScrolls);
                opacity = Math.max(0, 1 - fadeProgress);
            }
            
            // Applica le trasformazioni con transizione fluida
            this.heroSection.style.transition = 'opacity 0.3s ease-out';
            this.heroSection.style.transform = `translate3d(0, ${parallax}px, 0)`;
            this.heroSection.style.opacity = opacity;
            
            // Gestione visibilità del video
            if (opacity === 0) {
                this.heroVideo.style.display = 'none';
                this.heroSection.style.pointerEvents = 'none';
            } else {
                this.heroVideo.style.display = 'block';
                this.heroSection.style.pointerEvents = 'auto';
            }
        } else {
            // Se siamo molto oltre la sezione hero, nascondi completamente
            this.heroSection.style.opacity = '0';
            this.heroVideo.style.display = 'none';
            this.heroSection.style.pointerEvents = 'none';
            this.heroSection.style.transform = `translate3d(0, ${heroHeight * 0.3}px, 0)`;
        }
    }

    // Metodo per resettare il contatore (utile per debug o reset)
    resetScrollCount() {
        this.scrollCount = 0;
        this.maxScrollCount = 0;
        this.lastScrollY = 0;
        // Forza un aggiornamento immediato
        this.updateHeroParallax();
    }
}

// Inizializzazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza tutti gli effetti parallax
    new ParallaxController();
    new SmoothScroll();
    
    // Inizializza l'effetto hero
    new HeroParallax();
    
    // Aggiungi classe per CSS parallax
    document.body.classList.add('parallax-enabled');
});

// Ottimizzazione performance
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Precarica le immagini in background per smooth parallax
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });
    });
}