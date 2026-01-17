// Universal Navigation Handler - Include this on ALL pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation after DOM is fully loaded
    initNavigation();
});

function initNavigation() {
    // Set up top navigation
    setupTopNavigation();
    
    // Set up bottom navigation
    setupBottomNavigation();
    
    // Update active states based on current page
    updateActiveStates();
}

function setupTopNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
                // Navigate after animation
                window.location.href = targetPage;
            }, 150);
        });
    });
}

function setupBottomNavigation() {
    const navIcons = document.querySelectorAll('.bottom-nav .nav-icon');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            
            // Remove active class from all icons
            navIcons.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // Navigate after animation
                window.location.href = targetPage;
            }, 150);
        });
    });
}

function updateActiveStates() {
    // Get current page filename
    let currentPage = window.location.pathname.split('/').pop();
    
    // Handle edge cases
    if (!currentPage || currentPage === '') currentPage = 'index.html';
    
    console.log('Current page:', currentPage);
    
    // Update top navigation
    updateTopNavigationActiveState(currentPage);
    
    // Update bottom navigation
    updateBottomNavigationActiveState(currentPage);
}

function updateTopNavigationActiveState(currentPage) {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    // Clear all active states first
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Set active state based on current page
    navTabs.forEach(tab => {
        const href = tab.getAttribute('href');
        if (matchesCurrentPage(href, currentPage)) {
            tab.classList.add('active');
        }
    });
}

function updateBottomNavigationActiveState(currentPage) {
    const navIcons = document.querySelectorAll('.bottom-nav .nav-icon');
    
    // Clear all active states first
    navIcons.forEach(icon => icon.classList.remove('active'));
    
    // Set active state based on current page
    navIcons.forEach(icon => {
        const href = icon.getAttribute('href');
        if (matchesCurrentPage(href, currentPage)) {
            icon.classList.add('active');
        }
    });
}

// Helper function to match pages with different path formats
function matchesCurrentPage(href, currentPage) {
    // Normalize paths
    let normalizedHref = href.replace('./', '');
    let normalizedCurrent = currentPage.replace('./', '');
    
    // Special case for index/home page
    if ((normalizedHref === 'index.html' || normalizedHref === '') && 
        (normalizedCurrent === 'index.html' || normalizedCurrent === '' || normalizedCurrent === '/')) {
        return true;
    }
    
    // Match exact filenames
    return normalizedHref === normalizedCurrent;
}