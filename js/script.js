// Projects Data
const projectsData = [
    {
        id: 1,
        title: "Nexus Studio",
        category: "web",
        description: "Website portfolio untuk creative studio",
        tags: ["React", "GSAP", "Framer Motion"]
    },
    {
        id: 2,
        title: "Mono Chrome",
        category: "branding",
        description: "Brand identity untuk fashion brand",
        tags: ["Branding", "Typography", "Minimalist"]
    },
    {
        id: 3,
        title: "Flow App",
        category: "mobile",
        description: "Aplikasi productivity dengan desain minimalis",
        tags: ["React Native", "UI/UX", "Mobile"]
    },
    {
        id: 4,
        title: "Studio Vault",
        category: "web",
        description: "Platform untuk kreator digital",
        tags: ["Next.js", "Tailwind", "MongoDB"]
    },
    {
        id: 5,
        title: "Dark Mode UI",
        category: "branding",
        description: "UI Kit dengan tema gelap",
        tags: ["Figma", "UI Kit", "Dark Mode"]
    },
    {
        id: 6,
        title: "Task Flow",
        category: "mobile",
        description: "Aplikasi manajemen tugas minimalis",
        tags: ["Flutter", "Firebase", "GetX"]
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 800);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        });
        
        document.querySelectorAll('a, button, .work-item, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '60px';
                cursorFollower.style.border = '2px solid var(--white)';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.border = '1px solid var(--white)';
            });
        });
    }

    // Load Projects
    function loadProjects(category = 'all') {
        const workGrid = document.querySelector('.work-grid');
        if (!workGrid) return;
        
        const filteredProjects = category === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === category);
        
        workGrid.innerHTML = filteredProjects.map(project => `
            <div class="work-item" data-category="${project.category}">
                <div class="work-image">
                    <i class="fas fa-image"></i>
                </div>
                <div class="work-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="work-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    loadProjects();
    
    // Filter Projects
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            loadProjects(filter);
        });
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = '0';
            } else {
                header.style.padding = '';
            }
        }
        
        // Show/Hide Scroll Top Button
        const scrollTopBtn = document.getElementById('scroll-top');
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }
        
        // Active Navigation Link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const formMessage = document.getElementById('form-message');
            
            if (!name || !email || !message) {
                formMessage.innerHTML = '<p style="color: #ff4444;">Semua field harus diisi!</p>';
                return;
            }
            
            formMessage.innerHTML = '<p style="color: #ffffff;">Pesan berhasil dikirim! Saya akan menghubungi Anda.</p>';
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        });
    }
    
    // Download CV
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('CV akan segera tersedia untuk diunduh.');
        });
    }
    
    // Update Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Scroll Reveal Animation
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section, .work-item, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
