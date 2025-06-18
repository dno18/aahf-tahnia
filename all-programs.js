
document.addEventListener('DOMContentLoaded', () => {
    // Store original Arabic text for language toggle
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        if (!el.getAttribute('data-ar')) {
            el.setAttribute('data-ar', el.textContent.trim());
        }
    });

    // تبديل الوضع الداكن
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const btn = document.getElementById('darkModeToggle');
        btn.innerHTML = document.body.classList.contains('dark-mode')
            ? '<i class="fas fa-sun"></i> Light Mode'
            : '<i class="fas fa-moon"></i> Dark Mode';
    });

    // التحكم في شريط التنقل اللاصق
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.sticky-nav');
        if (window.scrollY > 300) {
            nav.classList.add('scrolled');
            nav.classList.add('visible');
        } else {
            nav.classList.remove('scrolled');
            nav.classList.remove('visible');
        }
    });

    // تبديل اللغة
    document.getElementById('langToggle').addEventListener('click', () => {
        const isArabic = document.documentElement.getAttribute('lang') === 'ar';
        document.documentElement.setAttribute('lang', isArabic ? 'en' : 'ar');
        document.documentElement.setAttribute('dir', isArabic ? 'ltr' : 'rtl');

        elements.forEach(el => {
            const arText = el.getAttribute('data-ar');
            const enText = el.getAttribute('data-en');
            el.textContent = isArabic ? enText : arText;
        });

        const btn = document.getElementById('langToggle');
        btn.innerHTML = isArabic
            ? '<i class="fas fa-globe"></i> العربية'
            : '<i class="fas fa-globe"></i> English';
    });

    // تأثير الظهور التسلسلي للبطاقات
    const cards = document.querySelectorAll('.training-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 150);
    });

    // التحكم في قائمة الهامبرغر
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu .nav-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
