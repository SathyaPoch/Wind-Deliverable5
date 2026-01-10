// Verification page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const verificationForm = document.getElementById('verificationForm');
    const verificationInput = document.getElementById('verificationInput');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const backLink = document.querySelector('.back-link');

    // Check if user came from login page
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
        console.log('Verification email sent to:', userEmail);
    }

    // Handle form submission
    verificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const code = verificationInput.value.trim();

        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        if (code === '') {
            errorMessage.textContent = 'Please enter a verification code.';
            errorMessage.style.display = 'block';
            return;
        }

        // Validate code format (example: 6 digits)
        if (code.length < 4) {
            errorMessage.textContent = 'Verification code must be at least 4 characters.';
            errorMessage.style.display = 'block';
            return;
        }

        // Simulate verification (in real app, this would call an API)
        console.log('Verifying code:', code);
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Clear the input
        verificationInput.value = '';

        // In a real application, you would verify the code with backend
        // and then redirect to password reset page
        setTimeout(function() {
            alert('Verification successful! In a real app, you would now be able to reset your password.');
            // Optionally redirect to password reset page
            // window.location.href = 'reset-password.html';
        }, 1500);
    });

    // Handle back to login link
    backLink.addEventListener('click', function() {
        goBackToLogin();
    });

    // Allow Enter key to submit
    verificationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            verificationForm.dispatchEvent(new Event('submit'));
        }
    });

    // Clear error message when user starts typing
    verificationInput.addEventListener('input', function() {
        if (errorMessage.style.display === 'block') {
            errorMessage.style.display = 'none';
        }
    });
});

// Function to navigate back to login page
function goBackToLogin() {
    // Clear stored email
    sessionStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

// Navigation items
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            console.log('Navigation clicked:', this.textContent);
        });
    });

    // Bottom navigation
    const bottomNavIcons = document.querySelectorAll('.nav-icon');
    bottomNavIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            console.log('Bottom nav icon clicked');
        });
    });
});