// Login page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');
    const termsCheck = document.getElementById('termsCheck');
    const forgotPasswordLink = document.querySelector('.forgot-password');

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const termsChecked = termsCheck.checked;

        if (email && termsChecked) {
            // Store email in sessionStorage for the verification page
            sessionStorage.setItem('userEmail', email);
            
            // In a real application, you would send this to your backend
            console.log('Login attempt with email:', email);
            
            // For demo purposes, show an alert
            alert('Login functionality would be implemented here. Redirecting to verification page...');
            goToVerification();
        } else if (!email) {
            alert('Please enter your email address.');
        } else if (!termsChecked) {
            alert('Please agree to the terms of service and privacy policy.');
        }
    });

    // Handle forgot password link
    forgotPasswordLink.addEventListener('click', function() {
        goToVerification();
    });

    // Allow Enter key to submit
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const provider = this.textContent.includes('Google') ? 'Google' : 'Facebook';
            alert(`${provider} login would be implemented here.`);
        });
    });
});

// Function to navigate to verification page
function goToVerification() {
    window.location.href = 'verification.html';
}

// Navigation items hover effect
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