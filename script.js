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
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const form = this;
    const formData = new FormData(form);

    // Send form data to Formspree via AJAX
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            const messageDiv = document.getElementById('form-message');
            messageDiv.textContent = 'Form submitted successfully! Thank you!';
            messageDiv.style.display = 'block';
            // Clear form fields
            form.reset();
            // Optionally hide message after a few seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 10000); // Hide after 10 seconds
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Show error message
        const messageDiv = document.getElementById('form-message');
        messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
        messageDiv.style.display = 'block';
        console.error(error);
    });
});