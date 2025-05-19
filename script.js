document.addEventListener('DOMContentLoaded', () => {
    // Store original Arabic text for language toggle
    try {
        document.querySelectorAll('[data-en]').forEach(element => {
            if (!element.getAttribute('data-ar')) {
                element.setAttribute('data-ar', element.textContent.trim());
            }
        });
        const importantLinksTitle = document.querySelector('.links-section h2');
        if (importantLinksTitle && !importantLinksTitle.getAttribute('data-ar')) {
            importantLinksTitle.setAttribute('data-ar', 'روابط مهمة');
            importantLinksTitle.setAttribute('data-en', 'Important Links');
        }
        const statisticsTitle = document.querySelector('.statistics-section h2');
        if (statisticsTitle && !statisticsTitle.getAttribute('data-ar')) {
            statisticsTitle.setAttribute('data-ar', 'إحصائياتنا');
            statisticsTitle.setAttribute('data-en', 'Our Statistics');
        }
        const videosTitle = document.querySelector('.videos-section h2');
        if (videosTitle && !videosTitle.getAttribute('data-ar')) {
            videosTitle.setAttribute('data-ar', 'فيديوهاتنا');
            videosTitle.setAttribute('data-en', 'Our Videos');
        } else if (!videosTitle) {
            const videosSection = document.querySelector('.videos-section');
            if (videosSection) {
                const title = document.createElement('h2');
                title.textContent = 'فيديوهاتنا';
                title.setAttribute('data-ar', 'فيديوهاتنا');
                title.setAttribute('data-en', 'Our Videos');
                videosSection.prepend(title);
                console.log('Videos section title added dynamically');
            }
        }
        // Store video titles for language toggle
        document.querySelectorAll('.videos-carousel .carousel-item .video-title').forEach(title => {
            if (!title.getAttribute('data-ar')) {
                title.setAttribute('data-ar', title.textContent.trim());
                title.setAttribute('data-en', title.textContent.trim().replace('فيديو', 'Video'));
            }
        });
    } catch (error) {
        console.error('Error storing Arabic text:', error);
    }

    // Update Counters for visitors and programs
    async function updateCounters() {
        try {
            let visitors = parseInt(localStorage.getItem('visitors')) || 0;
            visitors++;
            localStorage.setItem('visitors', visitors);
            const visitorCountElement = document.getElementById('visitor-count');
            if (visitorCountElement) {
                visitorCountElement.textContent = visitors;
                visitorCountElement.setAttribute('data-ar', visitors);
                visitorCountElement.setAttribute('data-en', visitors);
            }

            let programs = 0;
            try {
                const response = await fetch('programs.json');
                if (!response.ok) throw new Error('Failed to fetch programs.json');
                const programsData = await response.json();
                programs = programsData.length;
                console.log(`Program count from programs.json: ${programs}`);
            } catch (fetchError) {
                console.warn('Error fetching programs.json, falling back to DOM count:', fetchError);
                programs = document.querySelectorAll('.program-item').length;
                console.log(`Program count from DOM: ${programs}`);
            }

            const programCountElement = document.getElementById('program-count');
            if (programCountElement) {
                programCountElement.textContent = programs;
                programCountElement.setAttribute('data-ar', programs);
                programCountElement.setAttribute('data-en', programs);
            }
        } catch (error) {
            console.error('Error updating counters:', error);
        }
    }

    // Dynamic Program Switching for programs section
    function initializeProgramSwitching() {
        try {
            const programItems = document.querySelectorAll('.program-item');
            if (programItems.length === 0) return;

            let currentProgramIndex = 0;

            window.updateProgramDisplay = function () {
                programItems.forEach((item, index) => {
                    item.classList.toggle('visible', index === currentProgramIndex);
                    if (index === currentProgramIndex) {
                        const image = item.querySelector('.program-image');
                        const content = item.querySelector('.program-content');
                        if (image && content) {
                            image.style.opacity = '0';
                            content.style.opacity = '0';
                            requestAnimationFrame(() => {
                                image.style.transition = 'opacity 0.6s ease';
                                content.style.transition = 'opacity 0.6s ease';
                                image.style.opacity = '1';
                                content.style.opacity = '1';
                            });
                        }
                    }
                });
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        currentProgramIndex = (currentProgramIndex + 1) % programItems.length;
                        window.updateProgramDisplay();
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            });

            observer.observe(document.querySelector('.programs-section'));
            window.updateProgramDisplay();
        } catch (error) {
            console.error('Error in program switching:', error);
        }
    }

    // Parallax Effect for program images
    function initializeParallax() {
        try {
            const programItems = document.querySelectorAll('.program-item');
            if (!programItems.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const image = entry.target.querySelector('.parallax-img');
                    if (!image) return;

                    if (entry.isIntersecting) {
                        const rect = entry.target.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        const scrollPercent = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
                        image.style.transform = `translateY(${scrollPercent * -15}px) scale(1.05)`;
                        image.style.opacity = '1';
                    } else {
                        image.style.transform = 'translateY(0) scale(1)';
                        image.style.opacity = '1';
                    }
                });
            }, {
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                rootMargin: '100px 0px 100px 0px'
            });

            programItems.forEach(item => observer.observe(item));
        } catch (error) {
            console.error('Error in parallax effect:', error);
        }
    }

    // Vertical Carousel for News and Ads
    function VerticalCarousel(selector, interval) {
        try {
            const carousel = document.querySelector(selector);
            if (!carousel) {
                console.warn('Carousel not found:', selector);
                return;
            }
            const inner = carousel.querySelector('.carousel-inner');
            const indicatorsContainer = carousel.querySelector('.carousel-indicators');
            if (!inner || !indicatorsContainer) {
                console.warn('Carousel elements missing:', { inner, indicatorsContainer });
                return;
            }

            let currentIndex = 0;
            const items = inner.querySelectorAll('.carousel-item');
            if (!items.length) {
                console.warn('No carousel items found:', selector);
                return;
            }

            items.forEach((item, index) => {
                const img = item.querySelector('img');
                if (img) {
                    const imgSrc = img.src;
                    const testImg = new Image();
                    testImg.src = imgSrc;
                    testImg.onload = () => console.log(`Image ${index + 1} in ${selector} loaded successfully: ${imgSrc}`);
                    testImg.onerror = () => console.error(`Failed to load image ${index + 1} in ${selector}: ${imgSrc}`);
                }
            });

            console.log(`Initializing carousel: ${selector} with ${items.length} items`);

            if (!indicatorsContainer.dataset.initialized) {
                indicatorsContainer.innerHTML = '';
                items.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.classList.add('carousel-indicator');
                    indicator.classList.toggle('active', index === currentIndex);
                    indicator.dataset.index = index;
                    indicatorsContainer.appendChild(indicator);
                });
                indicatorsContainer.dataset.initialized = 'true';
            }

            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');

            function updateCarousel() {
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                });
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }

            indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    currentIndex = parseInt(indicator.dataset.index);
                    updateCarousel();
                });
            });

            updateCarousel();
            const intervalId = setInterval(nextSlide, interval);

            return {
                destroy: () => clearInterval(intervalId)
            };
        } catch (error) {
            console.error('Error in VerticalCarousel:', error);
        }
    }

    // Horizontal Carousel for Videos
    function HorizontalCarousel(selector, interval) {
        try {
            const carousel = document.querySelector(selector);
            if (!carousel) {
                console.warn('Carousel not found:', selector);
                return;
            }
            const inner = carousel.querySelector('.carousel-inner');
            const indicatorsContainer = carousel.querySelector('.carousel-indicators');
            const prevBtn = document.querySelector('.video-controls .prev-btn');
            const nextBtn = document.querySelector('.video-controls .next-btn');
            if (!inner || !indicatorsContainer || !prevBtn || !nextBtn) {
                console.warn('Carousel elements missing:', { inner, indicatorsContainer, prevBtn, nextBtn });
                return;
            }

            let currentIndex = 0;
            const items = inner.querySelectorAll('.carousel-item');
            if (!items.length) {
                console.warn('No carousel items found:', selector);
                return;
            }

            console.log(`Initializing carousel: ${selector} with ${items.length} items`);

            if (!indicatorsContainer.dataset.initialized) {
                indicatorsContainer.innerHTML = '';
                items.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.classList.add('carousel-indicator');
                    indicator.classList.toggle('active', index === currentIndex);
                    indicator.dataset.index = index;
                    indicatorsContainer.appendChild(indicator);
                });
                indicatorsContainer.dataset.initialized = 'true';
            }

            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');

            function updateCarousel() {
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                    const iframe = item.querySelector('iframe');
                    if (iframe && index !== currentIndex) {
                        const src = iframe.src.split('?')[0];
                        iframe.src = src + '?autoplay=1&mute=1&loop=1&playlist=' + src.split('/').pop();
                    }
                });
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            }

            indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    currentIndex = parseInt(indicator.dataset.index);
                    updateCarousel();
                });
            });

            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);

            updateCarousel();
            const intervalId = setInterval(nextSlide, interval);

            return {
                destroy: () => clearInterval(intervalId)
            };
        } catch (error) {
            console.error('Error in HorizontalCarousel:', error);
        }
    }

    // Fixed Navigation
    function initializeFixedNav() {
        try {
            const fixedNav = document.querySelector('.fixed-nav');
            if (!fixedNav) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    fixedNav.classList.toggle('scrolled', !entry.isIntersecting);
                });
            }, {
                threshold: 0,
                rootMargin: '-100px 0px 0px 0px'
            });

            observer.observe(document.querySelector('header'));
        } catch (error) {
            console.error('Error in fixed navigation:', error);
        }
    }

    // Language Toggle
    function initializeLanguageToggle() {
        try {
            const langToggle = document.getElementById('langToggle');
            if (!langToggle) return;

            let isEnglish = false;

            langToggle.addEventListener('click', () => {
                isEnglish = !isEnglish;
                document.documentElement.setAttribute('dir', isEnglish ? 'ltr' : 'rtl');
                langToggle.innerHTML = isEnglish
                    ? '<i class="fas fa-globe"></i> العربية'
                    : '<i class="fas fa-globe"></i> English';

                document.querySelectorAll('[data-ar][data-en]').forEach(element => {
                    const text = isEnglish ? element.getAttribute('data-en') : element.getAttribute('data-ar');
                    if (element.tagName === 'A' || element.tagName === 'P' || element.tagName === 'LI' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'H4') {
                        element.textContent = text;
                        const icon = element.querySelector('i');
                        if (icon) {
                            element.innerHTML = '';
                            element.appendChild(icon);
                            element.appendChild(document.createTextNode(` ${text}`));
                        }
                    }
                });

                // Update video titles
                document.querySelectorAll('.videos-carousel .carousel-item .video-title').forEach(title => {
                    const text = isEnglish ? title.getAttribute('data-en') : title.getAttribute('data-ar');
                    title.textContent = text;
                });

                const programItems = document.querySelectorAll('.program-item');
                programItems.forEach((item, index) => {
                    item.classList.toggle('reversed', isEnglish ? index % 2 === 1 : index % 2 === 0);
                });
            });
        } catch (error) {
            console.error('Error in language toggle:', error);
        }
    }

    // Dark Mode Toggle
    function initializeDarkModeToggle() {
        try {
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (!darkModeToggle) return;

            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            document.body.classList.toggle('dark-mode', isDarkMode);
            darkModeToggle.innerHTML = isDarkMode
                ? '<i class="fas fa-sun"></i> Light Mode'
                : '<i class="fas fa-moon"></i> Dark Mode';

            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDarkMode = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDarkMode);
                darkModeToggle.innerHTML = isDarkMode
                    ? '<i class="fas fa-sun"></i> Light Mode'
                    : '<i class="fas fa-moon"></i> Dark Mode';
            });
        } catch (error) {
            console.error('Error in dark mode toggle:', error);
        }
    }

    // Navigation Link Activation
    function initializeNavLinks() {
        try {
            const navLinks = document.querySelectorAll('.nav-link');
            if (!navLinks.length) return;

            const sections = Array.from(navLinks).map(link => {
                const href = link.getAttribute('href');
                return href.startsWith('#') ? document.querySelector(href) : null;
            }).filter(section => section);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                        });
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50% 0px'
            });

            sections.forEach(section => observer.observe(section));

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            });
        } catch (error) {
            console.error('Error in nav links activation:', error);
        }
    }

    // Initialize all functionalities
    try {
        updateCounters();
        initializeProgramSwitching();
        initializeParallax();
        initializeFixedNav();
        initializeLanguageToggle();
        initializeDarkModeToggle();
        initializeNavLinks();

        const exclusiveCarousel = VerticalCarousel('.exclusive-carousel', 5000);
        const adsCarousel = VerticalCarousel('.ads-carousel', 5000);
        const videosCarousel = HorizontalCarousel('.videos-carousel', 5000);

        window.addEventListener('beforeunload', () => {
            if (exclusiveCarousel) exclusiveCarousel.destroy();
            if (adsCarousel) adsCarousel.destroy();
            if (videosCarousel) videosCarousel.destroy();
        });
    } catch (error) {
        console.error('Error initializing functionalities:', error);
    }
});