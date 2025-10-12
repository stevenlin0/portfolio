// This is the theme toggle functionality.
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// This is to update the header background based on the theme.
function updateHeaderBackground() {
    const header = document.querySelector('.header');
    header.style.background = '';
}

// This is to update the button icon based on the theme.
function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// This is to load the user's theme or use light if not set.
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// This is to update the icon and header to match the theme.
updateThemeIcon(currentTheme);
updateHeaderBackground();

// This is the theme toggle event listener.
themeToggleBtn.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateHeaderBackground();
});

// This is the mobile navigation.
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// This is to close the navigation when clicking a link.
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// This is to make smooth scrolling for navigation links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// This is to show which section you're on by highlighting the link.
window.addEventListener('scroll', () => {
    const current = getCurrentSection();
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

function getCurrentSection() {
    const sections = ['home', 'about', 'projects', 'skills', 'hobbies', 'experience', 'contact'];
    const scrollPos = window.pageYOffset + 100;
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
            return sections[i];
        }
    }
    return 'home';
}

// This is the intersection observer for animations.
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // This is to make the skill bars move when you reach that section.
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// This is to observe all the sections for animations.
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// This is to animate skill bars.
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', progress + '%');

        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });

    document.querySelector('.skills').classList.add('skills-loaded');
}

// This is to handle the contact form.
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // This is to get the form data.
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // This is to check that all fields are filled and the email is valid.
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // This is just to pretend to send the form for now.
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.reset();
});

// This is the email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// This is the notification.
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // This is to set how the notification looks.
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
    });

    document.body.appendChild(notification);

    // This is to slide the notification onto the screen.
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // This is to remove the notification.
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// This is to animate the "Hi, I'm Steven"
function typeWriter() {
    const text = "Hi, I'm Steven";
    const titleElement = document.querySelector('.hero-title');

    if (!titleElement) return;

    titleElement.innerHTML = `<span class="highlight"></span>`;
    const highlightElement = titleElement.querySelector('.highlight');

    let i = 0;
    function type() {
        if (i < text.length) {
            highlightElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 1000);
}

// This is to run the animations after the page loads.
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent) heroContent.classList.add('slide-in-left');
    if (heroImage) heroImage.classList.add('slide-in-right');

    typeWriter();
});

// This is to make project cards move when hovered.
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// This is to make the image move a bit when you scroll.
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// This is to load the images as you scroll down.
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// This is to make buttons show a ripple when it's clicked.
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// This is to make the ripple animation.
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 1s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// This is just to like make scrolling smoother.
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(() => {
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
