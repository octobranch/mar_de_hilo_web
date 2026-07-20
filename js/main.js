import { translations } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle
    let currentLang = localStorage.getItem('mardehilo_lang') || 'es';
    const langToggle = document.getElementById('langToggle');
    
    const updateLanguage = (lang) => {
        document.documentElement.lang = lang;
        if(langToggle) langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.textContent = translations[lang][key];
        });
        localStorage.setItem('mardehilo_lang', lang);
    };

    if(langToggle) {
        updateLanguage(currentLang);
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            updateLanguage(currentLang);
        });
    }

    // 2. Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. Active Nav State (Scroll Spy)
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
});
