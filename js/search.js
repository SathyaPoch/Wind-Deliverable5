// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation tabs functionality
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            console.log('Switched to:', this.textContent);
        });
    });

    // Bottom navigation functionality
    const navIcons = document.querySelectorAll('.nav-icon');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            navIcons.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked icon
            this.classList.add('active');
            
            console.log('Bottom nav clicked');
        });
    });

    // Search input functionality
    const searchInput = document.querySelector('.search-input');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value;
        console.log('Searching for:', searchTerm);
        
        // You can add live search functionality here
        if (searchTerm.length > 2) {
            // Perform search
            performSearch(searchTerm);
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value;
            console.log('Search submitted:', searchTerm);
            
            // Add to recent searches
            addToRecentSearches(searchTerm);
        }
    });

    // Search input focus effect
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });

    // Recent search items click functionality
    const searchItems = document.querySelectorAll('.search-item');
    
    searchItems.forEach(item => {
        item.addEventListener('click', function() {
            const searchText = this.querySelector('.search-text').textContent;
            searchInput.value = searchText;
            console.log('Selected recent search:', searchText);
            
            // Add animation
            this.style.backgroundColor = 'rgba(0, 168, 255, 0.1)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });

    // Browse items click functionality
    const browseItems = document.querySelectorAll('.browse-item');
    
    browseItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.querySelector('span').textContent;
            console.log('Browse by:', category);
            
            // Add animation
            this.style.transform = 'translateX(5px)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 200);
            
            // You can add navigation to category page here
            alert(`Browsing by: ${category}`);
        });
    });

    // Function to perform search
    function performSearch(query) {
        console.log('Performing search for:', query);
        // Add your search logic here
        // Example: fetch results from API, filter content, etc.
    }

    // Function to add to recent searches
    function addToRecentSearches(searchTerm) {
        if (searchTerm.trim() === '') return;
        
        const recentSearches = document.querySelector('.recent-searches');
        
        // Create new search item
        const newSearchItem = document.createElement('div');
        newSearchItem.className = 'search-item';
        newSearchItem.innerHTML = `
            <svg class="clock-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="search-text">${searchTerm}</span>
        `;
        
        // Add click event to new item
        newSearchItem.addEventListener('click', function() {
            const text = this.querySelector('.search-text').textContent;
            searchInput.value = text;
            console.log('Selected recent search:', text);
        });
        
        // Insert at the top of recent searches
        recentSearches.insertBefore(newSearchItem, recentSearches.firstChild);
        
        // Limit to 5 recent searches
        const allItems = recentSearches.querySelectorAll('.search-item');
        if (allItems.length > 5) {
            recentSearches.removeChild(allItems[allItems.length - 1]);
        }
        
        // Clear search input
        searchInput.value = '';
        searchInput.blur();
        
        console.log('Added to recent searches:', searchTerm);
    }

    // Add animation to elements on scroll
    const content = document.querySelector('.content');
    const animatedElements = document.querySelectorAll('.search-item, .browse-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Keyboard shortcut for search (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // Clear search button functionality (optional)
    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            // You can add a clear button here if needed
            console.log('Input has text:', this.value);
        }
    });

    // Log initialization
    console.log('Search & Browse interface loaded successfully');
    console.log(`Recent searches: ${searchItems.length}`);
    console.log(`Browse categories: ${browseItems.length}`);
});

// Optional: Save recent searches to localStorage
function saveRecentSearches() {
    const searchItems = document.querySelectorAll('.search-item');
    const searches = Array.from(searchItems).map(item => 
        item.querySelector('.search-text').textContent
    );
    localStorage.setItem('recentSearches', JSON.stringify(searches));
}

// Optional: Load recent searches from localStorage
function loadRecentSearches() {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
        const searches = JSON.parse(saved);
        console.log('Loaded recent searches:', searches);
        // You can populate the UI with saved searches here
    }
}

// Optional: Export search history
function exportSearchHistory() {
    const searchItems = document.querySelectorAll('.search-item');
    const searches = Array.from(searchItems).map(item => 
        item.querySelector('.search-text').textContent
    );
    
    const dataStr = JSON.stringify(searches, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'search-history.json';
    link.click();
}