// Navigation tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle navigation tab clicks
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // Handle bottom navigation clicks
    const navIcons = document.querySelectorAll('.nav-icon');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            navIcons.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked icon
            this.classList.add('active');
        });
    });

    // Handle action button clicks (like, reply, share)
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.split(' ')[0];
            
            // Add a subtle animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // You can add more functionality here
            console.log(`${action} button clicked`);
            
            // Example: Change color on like
            if (action === 'like') {
                if (this.style.color === 'rgb(255, 0, 0)') {
                    this.style.color = '#666';
                } else {
                    this.style.color = 'red';
                }
            }
        });
    });

    // Smooth scroll behavior
    const feedContent = document.querySelector('.feed-content');
    
    // Add fade-in animation to posts
    const posts = document.querySelectorAll('.post');
    
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
    
    posts.forEach(post => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(post);
    });

    // Add hover effects to comments
    const comments = document.querySelectorAll('.comment');
    
    comments.forEach(comment => {
        comment.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
            this.style.borderRadius = '8px';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        comment.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // Movie card hover effect
    const movieCard = document.querySelector('.movie-card');
    
    if (movieCard) {
        movieCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        movieCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }

    // Add click feedback to action buttons
    actionButtons.forEach(button => {
        button.style.transition = 'transform 0.1s ease';
    });

    // Console log for debugging
    console.log('Social media interface loaded successfully');
});

// Optional: Add a function to dynamically add new posts
function addPost(postData) {
    const feedContent = document.querySelector('.feed-content');
    
    const postHTML = `
        <article class="post">
            <div class="post-header">
                <h2 class="post-title">${postData.title}</h2>
                <div class="post-meta">
                    <span class="author">${postData.author}</span>
                    <span class="heart-icon">🖤</span>
                    <span class="post-date">${postData.date}</span>
                </div>
            </div>
            <!-- Add more post content here -->
        </article>
    `;
    
    feedContent.insertAdjacentHTML('beforeend', postHTML);
}

// Optional: Load more posts on scroll
let isLoading = false;

document.querySelector('.feed-content').addEventListener('scroll', function() {
    const scrollPosition = this.scrollTop + this.clientHeight;
    const scrollHeight = this.scrollHeight;
    
    // If scrolled near bottom and not already loading
    if (scrollPosition >= scrollHeight - 100 && !isLoading) {
        isLoading = true;
        
        // Simulate loading more posts
        setTimeout(() => {
            console.log('Load more posts here');
            isLoading = false;
        }, 1000);
    }
});