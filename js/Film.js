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
        title: "Dead Poets Scociety",
        genre: "Comedy/Drama",
        year: "1989",
        duration: "2h 8mn",
        poster: "./image/poet.jpg"
    },
    {
        id: 8,
        title: "The Conjuring : Last Rites",
        genre: "Horror",
        year: "2025",
        duration: "2h 15mn",
        poster: "./image/conjuring.webp"
    },
    {
        id: 9,
        title: "Highest 2 Lowest",
        genre: "Crime/Thriller",
        year: "2025",
        duration: "2h 13mn",
        poster: "./image/high.webp"
    },
    {
        id: 10,
        title: "Mission: Impossible - The Final Reckoning",
        genre: "Action/Thriller",
        year: "2025",
        duration: "2h 50mn",
        poster: "./image/mission.webp"
    },
    {
        id: 11,
        title: "Superman",
        genre: "Action/Sci-fi",
        year: "2025",
        duration: "2h 9mn",
        poster: "./image/superman.webp"
    },
    {
        id: 12,
        title: "Final Destination Bloodlines",
        genre: "Horror/Mystery",
        year: "2025",
        duration: "1h 50mn",
        poster: "./image/final.webp"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFilms();
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
        <img src="${film.poster}" alt="${film.title}" class="film-poster" onerror="this.src='https://via.placeholder.com/400x600/667eea/ffffff?text=${encodeURIComponent(film.title)}'">
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
    // You can navigate to a film details page here
    // window.location.href = `film-details.html?id=${film.id}`;
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