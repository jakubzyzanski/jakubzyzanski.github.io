// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for header background
window.addEventListener('scroll', () => {
    const header = document.querySelector('.parallax-header');
    header.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
});

// Handle form submission with AJAX
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            const messageDiv = document.getElementById('form-message');
            messageDiv.textContent = 'Form submitted successfully! Thank you!';
            messageDiv.style.display = 'block';
            form.reset();
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 10000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        const messageDiv = document.getElementById('form-message');
        messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
        messageDiv.style.display = 'block';
        console.error(error);
    });
});

// Scrollbar navigation functionality
const sections = document.querySelectorAll('section');
const scrollDots = document.querySelectorAll('.scroll-dot');

window.addEventListener('scroll', () => {
    let currentSection = '';

    // Detect the current section based on scroll position
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport

        // Check if the section is in the viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Special case for the top of the page (About section)
    if (window.scrollY < window.innerHeight / 2) {
        currentSection = 'about'; // Force "About" section when near the top
    }

    // Special case for the last section (Contact)
    const contactSection = document.querySelector('#contact');
    const contactTop = contactSection.offsetTop;
    const contactHeight = contactSection.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    // If we're near the bottom of the page, activate Contact
    if (scrollPosition + windowHeight >= documentHeight - 50) {
        currentSection = 'contact';
    }

    // Update active dot
    scrollDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
});

