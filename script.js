document.addEventListener('DOMContentLoaded', function () {
    const langBtn = document.getElementById('lang-btn');
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    let isAr = true;
    let isDark = localStorage.getItem('theme') === 'dark';

    // تفعيل الوضع المظلم
    if (isDark) {
        body.classList.add('dark-mode');
        themeBtn.querySelector('i').className = 'fas fa-sun';
    }

    // === الدول ===
    const countries = [
        "أفغانستان", "ألبانيا", "الجزائر", "الأرجنتين", "أرمينيا", "أستراليا", "النمسا", "أذربيجان",
        "البحرين", "بنغلاديش", "بلجيكا", "البوسنة والهرسك", "البرازيل", "بلغاريا", "كندا", "تشيلي",
        "الصين", "كولومبيا", "كرواتيا", "كوبا", "قبرص", "التشيك", "الدنمارك", "مصر", "إستونيا",
        "فنلندا", "فرنسا", "جورجيا", "ألمانيا", "غانا", "اليونان", "هنغاريا", "آيسلندا", "الهند",
        "إندونيسيا", "إيران", "العراق", "أيرلندا", "إيطاليا", "اليابان", "الأردن", "كازاخستان",
        "كينيا", "كوريا الجنوبية", "الكويت", "قيرغيزستان", "لاتفيا", "لبنان", "ليبيا", "ليتوانيا",
        "ماليزيا", "المكسيك", "المغرب", "هولندا", "نيوزيلندا", "نيجيريا", "النرويج", "عُمان",
        "باكستان", "فلسطين", "بنما", "بيرو", "الفلبين", "بولندا", "البرتغال", "قطر", "رومانيا",
        "روسيا", "السعودية", "سنغافورة", "سلوفاكيا", "جنوب أفريقيا", "إسبانيا", "السودان", "السويد",
        "سويسرا", "سوريا", "تايوان", "طاجيكستان", "تايلاند", "تركيا", "تركمانستان", "أوكرانيا",
        "الإمارات", "المملكة المتحدة", "الولايات المتحدة", "أوروغواي", "أوزبكستان", "فنزويلا",
        "فيتنام", "اليمن", "زيمبابوي"
    ];

    const select = document.getElementById('nationality');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'ابحث عن دولتك...';
    searchInput.className = 'form-control mb-3';
    searchContainer.appendChild(searchInput);
    select.parentNode.insertBefore(searchContainer, select);

    countries.forEach(c => select.add(new Option(c, c)));

    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        Array.from(select.options).forEach(opt => {
            opt.style.display = opt.text.toLowerCase().includes(filter) ? '' : 'none';
        });
    });

    // === تبديل اللغة ===
    langBtn.addEventListener('click', () => {
        isAr = !isAr;
        body.classList.toggle('ar', isAr);
        body.classList.toggle('en', !isAr);
        updateTexts();
        langBtn.querySelector('span').textContent = isAr ? 'EN' : 'AR';
        searchInput.placeholder = isAr ? 'ابحث عن دولتك...' : 'Search for your country...';
        const defaultOption = select.querySelector('option[value=""]');
        if (defaultOption) defaultOption.textContent = isAr ? 'اختر جنسيتك' : 'Select your nationality';
    });

    // === تبديل الوضع الليلي ===
    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        body.classList.toggle('dark-mode', isDark);
        themeBtn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // === تحديث النصوص ===
    const texts = {
        ar: {
            hero_title: "مفن",
            hero_subtitle: "بوابتك للمستقبل",
            register_now: "سجل الآن",
            learn_more: "تعرف أكثر",
            about_mufan: "عن مفن",
            about_description: "مفن هي مبادرة شبابية طموحة تهدف إلى تمكين 60 شاب وشابة من خلال برامج تدريبية مكثفة ومشاريع حقيقية بالتعاون مع <strong>مؤسسة عبدالمنعم الراشد الإنسانية</strong> و<strong>دار نوره الموسى</strong>، لتأهيل قادة المستقبل وبناء جيل مبدع قادر على قيادة التغيير.",
            feature1_title: "تسريع النمو",
            feature1_desc: "برامج مكثفة لتطوير المهارات القيادية والمهنية",
            feature2_title: "شبكة علاقات",
            feature2_desc: "بناء شبكة علاقات مهنية مع خبراء ومتخصصين",
            feature3_title: "شهادات معتمدة",
            feature3_desc: "شهادات معتمدة من مؤسسات رائدة في المجال",
            register_mufan: "التسجيل في مفن",
            personal_info: "المعلومات الشخصية",
            nationality: "الجنسية",
            required_files: "الملفات المطلوبة",
            files_description: "يرجى رفع جميع الملفات بصيغة PDF بحد أقصى 5MB لكل ملف",
            cv_file: "السيرة الذاتية",
            cv_desc: "اخر نسخة محدثة من سيرتك الذاتية",
            passport_file: "صورة الجواز",
            passport_desc: "صورة واضحة من جواز السفر",
            id_file: "الهوية الوطنية",
            id_desc: "صورة واضحة من الهوية الوطنية",
            agree_terms: "أوافق على شروط التسجيل وأقر بصحة المعلومات المقدمة وأتعهد بالالتزام بأنظمة ولوائح برنامج مفن",
            processing: "جاري المعالجة...",
            registered: "تم التسجيل",
            submit_note: "سيتم مراجعة طلبك خلال 3-5 أيام عمل وسيتم التواصل معك عبر البريد الإلكتروني",
            visit_mufan: "زوروا مقر مفن",
            visit_title: "تعرف على بيئة مفن عن قرب",
            visit_description: "ندعوكم لزيارة مقرنا والتعرف على برامجنا ومرافقنا والالتقاء بفريق العمل والمدربين",
            visit_location: "الرياض، حي العليا",
            visit_hours: "9:00 ص - 5:00 م",
            visit_days: "الأحد - الخميس",
            book_visit: "احجز زيارتك الآن",
            confirm_visit: "تأكيد الحجز",
            our_partners: "نحن",
            partner1_name: "مؤسسة عبدالمنعم الراشد الإنسانية",
            partner1_desc: "مؤسسة رائدة في العمل الإنساني والتنموي على مستوى المنطقة",
            partner2_name: "دار نوره الموسى",
            partner2_desc: "دار متخصصة في تمكين الشباب وتنمية القدرات القيادية",
            footer_tagline: "بوابتك للمستقبل",
            footer_copyright: "جميع الحقوق محفوظة &copy; 2024 مفن",
            footer_contact: "للتواصل: info@mufan.com",
            success_title: "تم التسجيل بنجاح!",
            success_message: "شكراً لتسجيلك في برنامج مفن. سنتواصل معك قريباً عبر البريد الإلكتروني",
            success_close: "حسناً"
        },
        en: {
            hero_title: "Mufan",
            hero_subtitle: "Your Gateway to the Future",
            register_now: "Register Now",
            learn_more: "Learn More",
            about_mufan: "About Mufan",
            about_description: "Mufan is an ambitious youth initiative that aims to empower 60 young men and women through intensive training programs and real projects in cooperation with <strong>Abdulmunem Al-Rashed Humanitarian Foundation</strong> and <strong>Noura Al-Mousa House</strong>, to prepare future leaders and build a creative generation capable of leading change.",
            feature1_title: "Accelerated Growth",
            feature1_desc: "Intensive programs to develop leadership and professional skills",
            feature2_title: "Networking",
            feature2_desc: "Building professional networks with experts and specialists",
            feature3_title: "Certified Certificates",
            feature3_desc: "Certificates accredited by leading institutions in the field",
            register_mufan: "Register in Mufan",
            personal_info: "Personal Information",
            nationality: "Nationality",
            required_files: "Required Files",
            files_description: "Please upload all files in PDF format with a maximum of 5MB per file",
            cv_file: "CV",
            cv_desc: "Latest updated version of your CV",
            passport_file: "Passport Copy",
            passport_desc: "Clear copy of passport",
            id_file: "National ID",
            id_desc: "Clear copy of national ID",
            agree_terms: "I agree to the registration terms, confirm the accuracy of the information provided, and pledge to comply with Mufan program regulations",
            processing: "Processing...",
            registered: "Registered",
            submit_note: "Your application will be reviewed within 3-5 working days and we will contact you via email",
            visit_mufan: "Visit Mufan",
            visit_title: "Get to know Mufan environment up close",
            visit_description: "We invite you to visit our headquarters, learn about our programs and facilities, and meet the team and trainers",
            visit_location: "Riyadh, Al Olaya District",
            visit_hours: "9:00 AM - 5:00 PM",
            visit_days: "Sunday - Thursday",
            book_visit: "Book Your Visit Now",
            confirm_visit: "Confirm Booking",
            our_partners: "Our Partners",
            partner1_name: "Abdulmunem Al-Rashed Humanitarian Foundation",
            partner1_desc: "A leading foundation in humanitarian and developmental work in the region",
            partner2_name: "Noura Al-Mousa House",
            partner2_desc: "A house specialized in youth empowerment and leadership development",
            footer_tagline: "Your Gateway to the Future",
            footer_copyright: "All rights reserved &copy; 2024 Mufan",
            footer_contact: "Contact: info@mufan.com",
            success_title: "Registration Successful!",
            success_message: "Thank you for registering in Mufan program. We will contact you soon via email",
            success_close: "OK"
        }
    };

    function updateTexts() {
        const t = isAr ? texts.ar : texts.en;
        document.getElementById('page-title').textContent = t.hero_title + " - " + t.hero_subtitle;
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (t[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = t[key];
                } else {
                    el.innerHTML = t[key];
                }
            }
        });
    }

    // === تفعيل زر الإرسال ===
    const agree = document.getElementById('agree');
    const submitBtn = document.getElementById('applicant-btn');
    if (agree && submitBtn) {
        agree.addEventListener('change', () => {
            submitBtn.disabled = !agree.checked;
        });
    }

    // === رفع الملفات ===
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : (isAr ? 'لم يتم اختيار ملف' : 'No file chosen');
            const fileId = this.id;
            const fileNameElement = document.getElementById(`${fileId}-name`);
            if (fileNameElement) {
                fileNameElement.textContent = fileName;
                if (this.files[0]) {
                    const file = this.files[0];
                    const fileSize = file.size / 1024 / 1024;
                    const isPDF = file.name.toLowerCase().endsWith('.pdf');
                    if (!isPDF || fileSize > 5) {
                        fileNameElement.style.color = 'var(--danger)';
                        fileNameElement.textContent = isAr ? 'يجب أن يكون PDF وأقل من 5MB' : 'Must be PDF and less than 5MB';
                        this.value = '';
                    } else {
                        fileNameElement.style.color = 'var(-- Elm';
                    }
                }
            }
        });
    });

    // === إرسال النموذج (محاكاة) ===
    const form = document.getElementById('applicant-form');
    const successModal = document.getElementById('success-modal');
    const successClose = document.getElementById('success-close');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const filesValid = Array.from(fileInputs).every(input => {
                if (!input.files[0]) return false;
                const file = input.files[0];
                return file.name.toLowerCase().endsWith('.pdf') && file.size / 1024 / 1024 <= 5;
            });
            if (!filesValid) {
                alert(isAr ? 'يرجى رفع جميع الملفات بصيغة PDF وبحجم أقل من 5MB' : 'Please upload all files in PDF format and less than 5MB');
                return;
            }

            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            submitBtn.disabled = true;

            setTimeout(() => {
                btnText.style.display = 'flex';
                btnLoader.style.display = 'none';
                successModal.classList.add('active');
                form.reset();
                submitBtn.disabled = true;
                document.querySelectorAll('.file-name').forEach(el => {
                    el.textContent = isAr ? 'لم يتم اختيار ملف' : 'No file chosen';
                    el.style.color = '';
                });
                if (agree) agree.checked = false;
            }, 2000);
        });
    }

    if (successClose) {
        successClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    // === شريط التقدم ===
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const progress = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // === تمرير سلس ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === ظهور الأقسام عند التمرير ===
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // إضافة CSS للظهور
    const style = document.createElement('style');
    style.textContent = `
        .section { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .section.reveal { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(style);

    // تهيئة النصوص عند التحميل
    updateTexts();
});
