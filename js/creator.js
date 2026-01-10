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

    // Leaderboard row click functionality
    const leaderboardRows = document.querySelectorAll('.leaderboard-table tbody tr');
    
    leaderboardRows.forEach(row => {
        row.addEventListener('click', function() {
            const creatorName = this.querySelector('.creator-name').textContent;
            const followers = this.querySelector('.followers').textContent;
            const rank = this.querySelector('.rank').textContent;
            
            console.log(`Creator: ${creatorName}, Followers: ${followers}, Rank: ${rank}`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // You can add navigation to creator profile here
            // alert(`View profile: ${creatorName}`);
        });
        
        row.style.cursor = 'pointer';
        row.style.transition = 'all 0.2s ease';
    });

    // Article click functionality
    const articleItems = document.querySelectorAll('.article-item');
    
    articleItems.forEach(item => {
        item.addEventListener('click', function() {
            const articleTitle = this.querySelector('.article-title').textContent;
            const articleNumber = this.querySelector('.article-number').textContent;
            
            console.log(`Article ${articleNumber}: ${articleTitle}`);
            
            // Add click animation
            const title = this.querySelector('.article-title');
            title.style.color = '#00a8ff';
            setTimeout(() => {
                title.style.color = '#000';
            }, 300);
            
            // You can add navigation to article page here
            // alert(`Read: ${articleTitle}`);
        });
        
        item.style.cursor = 'pointer';
    });

    // Add hover effect to article titles
    const articleTitles = document.querySelectorAll('.article-title');
    
    articleTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Animate elements on scroll
    const content = document.querySelector('.content');
    const animatedElements = document.querySelectorAll('.leaderboard-table tbody tr, .article-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        
        if (element.classList.contains('article-item')) {
            element.style.transform = 'translateX(-20px)';
        } else {
            element.style.transform = 'translateY(10px)';
        }
        
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Add rank badge animations
    const rankCells = document.querySelectorAll('.rank');
    
    rankCells.forEach((cell, index) => {
        if (index === 0) {
            // Gold medal for 1st place
            cell.style.fontWeight = '700';
        }
    });

    // Trend icon animations
    const trendIcons = document.querySelectorAll('.trend-icon');
    
    trendIcons.forEach(icon => {
        if (icon.classList.contains('up')) {
            // Animate up arrow
            setInterval(() => {
                icon.style.transform = 'translateY(-3px)';
                setTimeout(() => {
                    icon.style.transform = 'translateY(0)';
                }, 500);
            }, 2000);
        } else if (icon.classList.contains('down')) {
            // Animate down arrow
            setInterval(() => {
                icon.style.transform = 'translateY(3px)';
                setTimeout(() => {
                    icon.style.transform = 'translateY(0)';
                }, 500);
            }, 2000);
        }
        
        icon.style.transition = 'transform 0.5s ease';
    });

    // Log initialization
    console.log('Rising Creators page loaded successfully');
    console.log(`Total creators: ${leaderboardRows.length}`);
    console.log(`Total articles: ${articleItems.length}`);
});

// Function to update leaderboard data
function updateLeaderboard(data) {
    const tbody = document.querySelector('.leaderboard-table tbody');
    tbody.innerHTML = '';
    
    data.forEach((creator, index) => {
        const row = document.createElement('tr');
        
        let trendClass = '';
        let trendSymbol = '';
        
        if (creator.trend === 'up') {
            trendClass = 'rank-up';
            trendSymbol = '↑';
        } else if (creator.trend === 'down') {
            trendClass = 'rank-down';
            trendSymbol = '↓';
        } else {
            trendClass = 'rank-same';
            trendSymbol = '→';
        }
        
        row.className = trendClass;
        row.innerHTML = `
            <td>
                <div class="name-cell">
                    <span class="trend-icon ${creator.trend}">${trendSymbol}</span>
                    <span class="creator-name">${creator.name}</span>
                </div>
            </td>
            <td class="followers">${creator.followers}</td>
            <td class="rank">${index + 1}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    console.log('Leaderboard updated with', data.length, 'creators');
}

// Function to add new article
function addArticle(title, position = null) {
    const articlesSection = document.querySelector('.articles-section');
    const articleCount = articlesSection.querySelectorAll('.article-item').length;
    const articleNumber = position || articleCount + 1;
    
    const articleHTML = `
        <div class="article-item">
            <span class="article-number">${articleNumber}</span>
            <h3 class="article-title">${title}</h3>
        </div>
    `;
    
    if (position && position <= articleCount) {
        const articles = articlesSection.querySelectorAll('.article-item');
        articles[position - 1].insertAdjacentHTML('beforebegin', articleHTML);
    } else {
        articlesSection.insertAdjacentHTML('beforeend', articleHTML);
    }
    
    console.log('Article added:', title);
}

// Function to sort leaderboard by followers
function sortLeaderboard(order = 'desc') {
    const tbody = document.querySelector('.leaderboard-table tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const followersA = parseFollowers(a.querySelector('.followers').textContent);
        const followersB = parseFollowers(b.querySelector('.followers').textContent);
        
        return order === 'desc' ? followersB - followersA : followersA - followersB;
    });
    
    tbody.innerHTML = '';
    rows.forEach((row, index) => {
        row.querySelector('.rank').textContent = index + 1;
        tbody.appendChild(row);
    });
    
    console.log('Leaderboard sorted by followers:', order);
}

// Helper function to parse follower count
function parseFollowers(text) {
    const value = parseFloat(text);
    if (text.includes('k')) return value * 1000;
    if (text.includes('M')) return value * 1000000;
    return value;
}

// Example usage:
// updateLeaderboard([
//     { name: 'New Creator', followers: '50k', trend: 'up' },
//     { name: 'Another Creator', followers: '25k', trend: 'down' }
// ]);

// addArticle('How to Stay Productive', 1);

// sortLeaderboard('asc'); // or 'desc'