// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navBar = document.querySelector('.sticky-nav');
            const navBarHeight = navBar ? navBar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navBarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
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

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    if (window.scrollY < window.innerHeight / 2) {
        currentSection = 'about';
    }

    const contactSection = document.querySelector('#contact');
    const contactTop = contactSection.offsetTop;
    const contactHeight = contactSection.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition + windowHeight >= documentHeight - 50) {
        currentSection = 'contact';
    }

    scrollDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
});

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.sticky-nav ul').classList.toggle('active');
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const themeText = themeToggleBtn.querySelector('span'); // Select the span element for text

// Function to apply theme and update UI
function applyTheme(isLightTheme) {
    if (isLightTheme) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    themeText.textContent = isLightTheme ? 'Light' : 'Dark'; // Update text
    const icon = themeToggleBtn.querySelector('i');
    icon.classList.remove('fa-sun', 'fa-moon'); // Remove all possible icons
    icon.classList.add(isLightTheme ? 'fa-sun' : 'fa-moon'); // Add appropriate icon
}

// Load saved theme from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme'); // Get saved theme
    const isLightTheme = savedTheme === 'light'; // Check if saved theme is light
    applyTheme(isLightTheme); // Apply the saved theme
});

// Toggle theme on button click and save to localStorage
themeToggleBtn.addEventListener('click', () => {
    const isLightTheme = !document.body.classList.contains('light-theme'); // Toggle state
    applyTheme(isLightTheme); // Apply the new theme
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark'); // Save to localStorage
});