// Highlight active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.top-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'offline.html')) {
            link.classList.add('active');
        }
    });
});

// Handle article clicks
const articleTitles = document.querySelectorAll('.article-title');

articleTitles.forEach((title, index) => {
    title.addEventListener('click', function(e) {
        e.preventDefault();
        
        const articleNumber = index + 1;
        const articleName = this.textContent;
        
        // Show alert with article info
        alert(`Opening article ${articleNumber}:\n${articleName}`);
        
        // In a real application, you would navigate to the article page:
        // window.location.href = `article-detail.html?id=${articleNumber}`;
        
        // Or open in a modal/overlay
        console.log(`Article ${articleNumber} clicked: ${articleName}`);
    });
});

// Handle bottom navigation clicks
const bottomNavIcons = document.querySelectorAll('.bottom-nav .nav-icon');

bottomNavIcons.forEach((icon, index) => {
    icon.addEventListener('click', function(e) {
        // Remove active state from all icons
        bottomNavIcons.forEach(i => i.style.color = '#666');
        
        // Add active state to clicked icon
        this.style.color = '#4a9eff';
        
        // Handle navigation based on icon index
        switch(index) {
            case 0: // Home icon
                console.log('Home clicked');
                // window.location.href = 'index.html';
                break;
            case 1: // Search icon
                e.preventDefault();
                console.log('Search clicked');
                alert('Search functionality would be implemented here');
                break;
            case 2: // Profile icon
                e.preventDefault();
                console.log('Profile clicked');
                alert('Profile page would be implemented here');
                break;
        }
    });
});

// Add smooth scrolling to article list
const content = document.querySelector('.content');
let isScrolling = false;

content.addEventListener('scroll', function() {
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            // Add scroll effects here if needed
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Optional: Add pull-to-refresh functionality
let touchStartY = 0;
let touchEndY = 0;

content.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

content.addEventListener('touchmove', function(e) {
    touchEndY = e.touches[0].clientY;
}, { passive: true });

content.addEventListener('touchend', function() {
    // If scrolled to top and pulled down
    if (content.scrollTop === 0 && touchEndY > touchStartY + 100) {
        console.log('Pull to refresh triggered');
        // Add refresh animation/functionality here
        // Example: location.reload();
    }
});