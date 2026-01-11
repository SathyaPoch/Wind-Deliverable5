// Universal Navigation Handler - Include this on ALL pages
document.addEventListener('DOMContentLoaded', function() {
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log('Current page:', currentPage);
    
    // Update top navigation active state
    updateTopNavigation(currentPage);
    
    // Update bottom navigation active state
    updateBottomNavigation(currentPage);
});

function updateTopNavigation(currentPage) {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    // Remove all active classes first
    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class based on current page
    navTabs.forEach(tab => {
        const href = tab.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            tab.classList.add('active');
            console.log('Top nav activated:', href);
        }
    });
}

function updateBottomNavigation(currentPage) {
    const navIcons = document.querySelectorAll('.bottom-nav .nav-icon');
    
    // Remove all active classes first
    navIcons.forEach(icon => {
        icon.classList.remove('active');
    });
    
    // Add active class based on current page
    navIcons.forEach(icon => {
        const href = icon.getAttribute('href');
        
        // Check for home icon
        if ((href === 'index.html' || href === './index.html') && 
            (currentPage === 'index.html' || currentPage === '' || currentPage === '/')) {
            icon.classList.add('active');
            console.log('Bottom nav activated: home');
        }
        // Check for search icon
        else if ((href === 'search.html' || href === './search.html') && 
                 currentPage === 'search.html') {
            icon.classList.add('active');
            console.log('Bottom nav activated: search');
        }
        // Check for profile/account icon
        else if ((href === 'account.html' || href === './account.html' || 
                  href === 'profile.html' || href === './profile.html') && 
                 (currentPage === 'account.html' || currentPage === 'profile.html')) {
            icon.classList.add('active');
            console.log('Bottom nav activated: profile');
        }
    });
}