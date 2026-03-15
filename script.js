// Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('section-hidden');
            entry.target.classList.add('section-visible');
        }
    });
}, observerOptions);

// Observe all sections with section-hidden class
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-hidden');
    sections.forEach(section => observer.observe(section));

    // Add scroll-based navbar background change (if navbar is added later)
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        // Future: Add navbar background change logic here
    });

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add interactive tooltips for skill cards
    const skillCards = document.querySelectorAll('#skills .bg-white, #skills .bg-gradient-to-r');
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a subtle pulse effect on click
            card.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        });
    });

    // Add parallax effect to hero section (subtle)
    const hero = document.querySelector('#hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

    // Add console message for fun
    console.log('%c안녕하세요! 👋', 'font-size: 24px; color: #1e3a8a; font-weight: bold;');
    console.log('%c코드를 들여다보시는군요! 궁금한 게 있으시면 연락주세요 😊', 'font-size: 14px; color: #0ea5e9;');
    console.log('%cGitHub: https://github.com/yejian', 'font-size: 12px; color: #6b7280;');

    // Prevent placeholder links from navigating
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default if it's a project link (not navigation)
            if (link.closest('#projects')) {
                e.preventDefault();
                // Optional: Show a tooltip or message
                const originalText = link.textContent;
                link.textContent = '준비 중...';
                setTimeout(() => {
                    link.textContent = originalText;
                }, 1000);
            }
        });
    });

    // Add typing effect to hero subtitle (optional enhancement)
    const subtitle = document.querySelector('#hero p:last-of-type');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                subtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }

    // Add project card hover sound effect (visual feedback only)
    const projectCards = document.querySelectorAll('#projects > div > div');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Add scroll progress indicator (optional)
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(to right, #f59e0b, #0ea5e9);
            z-index: 9999;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            indicator.style.width = scrolled + '%';
        });
    };

    createScrollIndicator();

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    const debounceScroll = (callback, delay = 10) => {
        return () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(callback, delay);
        };
    };

    // Add fade-in animation to elements as they come into view
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        fadeObserver.observe(el);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        const contact = document.querySelector('#contact');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 축하합니다! 히든 커맨드를 발견하셨습니다! 🎉\n\n"시키면 다 하는" 정신의 소유자시군요!');
        }, 2000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);
