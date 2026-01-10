// Home/Films Page JavaScript

// Film data
const films = [
    {
        id: 1,
        title: "F1",
        genre: "Sport/Action",
        year: "2025",
        duration: "2h 35mn",
        poster: "./image/F1.png"
    },
    {
        id: 2,
        title: "Lost in Translation",
        genre: "Romance/Comedy",
        year: "2003",
        duration: "1h 41mn",
        poster: "./image/lost.png"
    },
    {
        id: 3,
        title: "The Worst Person in the World",
        genre: "Romance/Comedy",
        year: "2021",
        duration: "2h 1mn",
        poster: "./image/theworld.png"
    },
    {
        id: 4,
        title: "Her",
        genre: "Romance/Sci-fi",
        year: "2013",
        duration: "2h 6mn",
        poster: "./image/her.png"
    },
    {
        id: 5,
        title: "Eternal Sunshine of the Spotless Mind",
        genre: "Romance/Sci-fi",
        year: "2003",
        duration: "1h 48mn",
        poster: "./image/sunshine.png"
    },
    {
        id: 6,
        title: "Detachment",
        genre: "Drama/Psychological Fiction",
        year: "2011",
        duration: "1h 38mn",
        poster: "./image/detachment.png"
    },
    {
        id: 7,
        title: "Blade Runner 2049",
        genre: "Sci-fi/Thriller",
        year: "2017",
        duration: "2h 44mn",
        poster: "./image/F1.png"
    },
    {
        id: 8,
        title: "The Grand Budapest Hotel",
        genre: "Comedy/Drama",
        year: "2014",
        duration: "1h 39mn",
        poster: "./image/lost.png"
    },
    {
        id: 9,
        title: "Interstellar",
        genre: "Sci-fi/Adventure",
        year: "2014",
        duration: "2h 49mn",
        poster: "./image/theworld.png"
    },
    {
        id: 10,
        title: "Moonlight",
        genre: "Drama",
        year: "2016",
        duration: "1h 51mn",
        poster: "./image/her.png"
    },
    {
        id: 11,
        title: "Parasite",
        genre: "Thriller/Drama",
        year: "2019",
        duration: "2h 12mn",
        poster: "./image/sunshine.png"
    },
    {
        id: 12,
        title: "The Shape of Water",
        genre: "Fantasy/Romance",
        year: "2017",
        duration: "2h 3mn",
        poster: "./image/detachment.png"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFilms();
    setupNavigation();
    setupBottomNav();
});

// Load films into the grid
function loadFilms() {
    const filmsGrid = document.getElementById('filmsGrid');
    
    if (!filmsGrid) return;
    
    // Clear existing content
    filmsGrid.innerHTML = '';
    
    // Show loading state
    if (films.length === 0) {
        filmsGrid.innerHTML = '<div class="empty-state">No films available</div>';
        return;
    }
    
    // Create film cards
    films.forEach(film => {
        const filmCard = createFilmCard(film);
        filmsGrid.appendChild(filmCard);
    });
}

// Create a film card element
function createFilmCard(film) {
    const card = document.createElement('div');
    card.className = 'film-card';
    card.dataset.filmId = film.id;
    
    card.innerHTML = `
        <img src="${film.poster}" alt="${film.title}" class="film-poster" onerror="this.src='https://via.placeholder.com/400x600?text=${encodeURIComponent(film.title)}'">
        <div class="film-info">
            <h3 class="film-title">${film.title}</h3>
            <p class="film-genre">${film.genre}</p>
            <div class="film-meta">
                <span class="film-year">${film.year}</span>
                <span class="film-duration">${film.duration}</span>
            </div>
        </div>
    `;
    
    // Add click event listener
    card.addEventListener('click', function() {
        handleFilmClick(film);
    });
    
    return card;
}

// Handle film card click
function handleFilmClick(film) {
    console.log('Film clicked:', film);
    alert(`You clicked on "${film.title}"\n\nIn a real app, this would open the film details page.`);
}

// Setup top navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.top-navigation .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            console.log('Navigation clicked:', this.textContent);
            
            // In a real app, you would load different content based on the navigation
            if (this.textContent.trim() !== 'Film') {
                alert(`${this.textContent} section coming soon!`);
            }
        });
    });
}

// Setup bottom navigation
function setupBottomNav() {
    const navIcons = document.querySelectorAll('.bottom-nav .nav-icon');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            navIcons.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Handle navigation
            if (this.classList.contains('home-icon')) {
                console.log('Home clicked');
                // Already on home
            } else if (this.classList.contains('search-icon')) {
                console.log('Search clicked');
                alert('Search functionality coming soon!');
            } else if (this.classList.contains('profile-icon')) {
                console.log('Profile clicked');
                // Navigate to login page
                window.location.href = 'login.html';
            }
        });
    });
}

// Filter films by genre (optional feature)
function filterFilmsByGenre(genre) {
    const filmsGrid = document.getElementById('filmsGrid');
    filmsGrid.innerHTML = '';
    
    const filteredFilms = genre === 'all' 
        ? films 
        : films.filter(film => film.genre.toLowerCase().includes(genre.toLowerCase()));
    
    if (filteredFilms.length === 0) {
        filmsGrid.innerHTML = '<div class="empty-state">No films found</div>';
        return;
    }
    
    filteredFilms.forEach(film => {
        const filmCard = createFilmCard(film);
        filmsGrid.appendChild(filmCard);
    });
}

// Search films (optional feature)
function searchFilms(query) {
    const filmsGrid = document.getElementById('filmsGrid');
    filmsGrid.innerHTML = '';
    
    const searchResults = films.filter(film => 
        film.title.toLowerCase().includes(query.toLowerCase()) ||
        film.genre.toLowerCase().includes(query.toLowerCase())
    );
    
    if (searchResults.length === 0) {
        filmsGrid.innerHTML = '<div class="empty-state">No films found</div>';
        return;
    }
    
    searchResults.forEach(film => {
        const filmCard = createFilmCard(film);
        filmsGrid.appendChild(filmCard);
    });
}

// Refresh films (optional feature)
function refreshFilms() {
    const filmsGrid = document.getElementById('filmsGrid');
    filmsGrid.innerHTML = '<div class="loading">Loading films...</div>';
    
    setTimeout(() => {
        loadFilms();
    }, 500);
}