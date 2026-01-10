// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation tabs functionality
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigating to:', this.textContent);
            
            // Add click feedback
            this.style.color = '#000';
            setTimeout(() => {
                this.style.color = '#333';
            }, 200);
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

    // Settings button functionality
    const settingsBtn = document.querySelector('.settings-btn');
    
    settingsBtn.addEventListener('click', function() {
        console.log('Settings clicked');
        
        // Add rotation animation
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
        
        // Navigate to settings
        alert('Opening settings...');
    });

    // Avatar click functionality
    const avatar = document.querySelector('.avatar');
    
    avatar.addEventListener('click', function() {
        console.log('Avatar clicked - Edit profile photo');
        
        // Add scale animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Stats items click functionality
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            const label = this.querySelector('.stat-label').textContent;
            const value = this.querySelector('.stat-value').textContent;
            
            console.log(`Clicked: ${label} - ${value}`);
            
            // Add click feedback
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
            
            // Handle different stat clicks
            switch(label) {
                case 'Review and Rate':
                    navigateToReviews();
                    break;
                case 'Films':
                    navigateToFilms();
                    break;
                case 'Articles':
                    navigateToArticles();
                    break;
                case 'Following':
                    navigateToFollowing();
                    break;
                case 'Followers':
                    navigateToFollowers();
                    break;
            }
        });
    });

    // Navigation functions
    function navigateToReviews() {
        console.log('Navigate to Reviews and Ratings');
        // Add your navigation logic here
    }

    function navigateToFilms() {
        console.log('Navigate to Films list');
    }

    function navigateToArticles() {
        console.log('Navigate to Articles list');
    }

    function navigateToFollowing() {
        console.log('Navigate to Following list');
    }

    function navigateToFollowers() {
        console.log('Navigate to Followers list');
    }

    // Animate chevron on first stat item hover
    const firstStatItem = document.querySelector('.stat-item:first-child');
    
    if (firstStatItem) {
        firstStatItem.addEventListener('mouseenter', function() {
            const chevron = this.querySelector('.chevron-icon');
            if (chevron) {
                chevron.style.transform = 'translateX(3px)';
                chevron.style.transition = 'transform 0.3s ease';
            }
        });
        
        firstStatItem.addEventListener('mouseleave', function() {
            const chevron = this.querySelector('.chevron-icon');
            if (chevron) {
                chevron.style.transform = 'translateX(0)';
            }
        });
    }

    // Log initialization
    console.log('Clean profile page loaded successfully');
});

// Function to update profile stats
function updateStats(stats) {
    const statLabels = {
        'Review and Rate': stats.reviews || 0,
        'Films': stats.films || 0,
        'Articles': stats.articles || 0,
        'Following': stats.following || 0,
        'Followers': stats.followers || 0
    };
    
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        const label = item.querySelector('.stat-label').textContent;
        const valueElement = item.querySelector('.stat-value');
        
        if (statLabels[label] !== undefined) {
            valueElement.textContent = statLabels[label];
        }
    });
    
    console.log('Stats updated:', stats);
}

// Function to update avatar
function updateAvatar(imageUrl) {
    const avatar = document.querySelector('.avatar');
    
    if (imageUrl) {
        avatar.innerHTML = `<img src="${imageUrl}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    }
    
    console.log('Avatar updated');
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Example usage:
// updateStats({
//     reviews: 5,
//     films: 15,
//     articles: 32,
//     following: 125,
//     followers: 45
// });

// updateAvatar('https://example.com/avatar.jpg');

// showNotification('Profile updated successfully!');

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 's' to open settings
    if (e.key === 's' || e.key === 'S') {
        const settingsBtn = document.querySelector('.settings-btn');
        if (settingsBtn) settingsBtn.click();
    }
    
    // Press 'p' to click profile avatar
    if (e.key === 'p' || e.key === 'P') {
        const avatar = document.querySelector('.avatar');
        if (avatar) avatar.click();
    }
});

// Prevent default scrolling behavior on stat items
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => {
    item.addEventListener('touchstart', function(e) {
        // Add touch feedback for mobile
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });
    
    item.addEventListener('touchend', function(e) {
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 200);
    });
});