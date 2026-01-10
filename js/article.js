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

    // Action buttons functionality (like, comment, share)
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the button text to determine action
            const buttonText = this.textContent.trim();
            
            // Add animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Handle different actions
            if (buttonText.includes('like')) {
                handleLike(this);
            } else if (buttonText.includes('comment')) {
                handleComment(this);
            } else if (buttonText.includes('share')) {
                handleShare(this);
            }
        });
    });

    // Like button handler
    function handleLike(button) {
        const icon = button.querySelector('.icon');
        
        if (button.classList.contains('liked')) {
            button.classList.remove('liked');
            icon.textContent = '🖤';
            button.style.color = '#666';
        } else {
            button.classList.add('liked');
            icon.textContent = '❤️';
            button.style.color = '#ff0000';
            
            // Add a little animation
            icon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);
        }
        
        console.log('Like toggled');
    }

    // Comment button handler
    function handleComment(button) {
        console.log('Comment clicked');
        // You can add a modal or comment section here
        alert('Comment feature - implement as needed');
    }

    // Share button handler
    function handleShare(button) {
        console.log('Share clicked');
        // You can add share functionality here
        if (navigator.share) {
            navigator.share({
                title: 'Check out this article',
                text: 'Interesting article to read!',
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            alert('Share feature - implement as needed');
        }
    }

    // Smooth scroll behavior for feed content
    const feedContent = document.querySelector('.feed-content');
    
    // Add fade-in animation to article cards on scroll
    const articleCards = document.querySelectorAll('.article-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply initial styles and observe
    articleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effects to article cards
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });

    // Infinite scroll effect (optional)
    let isLoading = false;
    
    feedContent.addEventListener('scroll', function() {
        const scrollPosition = this.scrollTop + this.clientHeight;
        const scrollHeight = this.scrollHeight;
        
        // If scrolled near bottom and not already loading
        if (scrollPosition >= scrollHeight - 200 && !isLoading) {
            isLoading = true;
            console.log('Near bottom - could load more articles here');
            
            // Simulate loading delay
            setTimeout(() => {
                isLoading = false;
            }, 1000);
        }
    });

    // Add transition effect to action buttons
    actionButtons.forEach(button => {
        button.style.transition = 'all 0.2s ease';
    });

    // Log initialization
    console.log('Article feed interface loaded successfully');
    console.log(`Total articles: ${articleCards.length}`);
});

// Optional: Function to dynamically add new articles
function addArticle(articleData) {
    const feedContent = document.querySelector('.feed-content');
    
    const articleHTML = `
        <article class="article-card">
            <div class="article-image">
                <img src="${articleData.image}" alt="${articleData.title}">
            </div>
            <div class="article-text">
                <p>${articleData.description}</p>
            </div>
            <h3 class="article-title">${articleData.title}</h3>
            <p class="article-author">by ${articleData.author}</p>
            <div class="article-actions">
                <button class="action-btn">
                    <span class="icon">🖤</span> like
                </button>
                <button class="action-btn">
                    <span class="icon">💬</span> comment
                </button>
                <button class="action-btn">
                    <span class="icon">⚙</span> share
                </button>
            </div>
        </article>
    `;
    
    feedContent.insertAdjacentHTML('beforeend', articleHTML);
    console.log('New article added');
}

// Example usage:
// addArticle({
//     image: 'https://example.com/image.jpg',
//     description: 'Your article description here',
//     title: 'Your Article Title',
//     author: 'Author Name'
// });