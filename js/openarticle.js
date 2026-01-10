// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Audio player state
    let isPlaying = false;
    let currentSpeed = 1.0;
    
    // Navigation tabs functionality
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigating to:', this.textContent);
        });
    });

    // Bottom navigation functionality
    const navIcons = document.querySelectorAll('.nav-icon');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            navIcons.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            console.log('Bottom nav clicked');
        });
    });

    // Close button functionality
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', function() {
        console.log('Close article');
        
        // Add animation
        this.style.transform = 'rotate(90deg) scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
        
        // Navigate back or close
        window.history.back();
    });

    // Audio player elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const waveform = document.querySelector('.waveform');
    const voiceIcon = document.querySelector('.voice-icon');

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            // Change to play icon
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
            waveform.classList.add('playing');
            console.log('Playing audio');
            
            // Start text-to-speech (if available)
            startTextToSpeech();
        } else {
            // Change to pause icon
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            `;
            waveform.classList.remove('playing');
            console.log('Paused audio');
            
            // Stop text-to-speech
            stopTextToSpeech();
        }
    });

    // Previous button
    prevBtn.addEventListener('click', function() {
        console.log('Previous section');
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Navigate to previous section
        scrollToPreviousParagraph();
    });

    // Next button
    nextBtn.addEventListener('click', function() {
        console.log('Next section');
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Navigate to next section
        scrollToNextParagraph();
    });

    // Voice icon click
    voiceIcon.addEventListener('click', function() {
        console.log('Voice settings');
        
        // Toggle voice speed or settings
        currentSpeed = currentSpeed === 1.0 ? 1.5 : currentSpeed === 1.5 ? 0.75 : 1.0;
        alert(`Playback speed: ${currentSpeed}x`);
    });

    // Text-to-Speech functionality
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    let currentParagraphIndex = 0;

    function startTextToSpeech() {
        if (!speechSynthesis) {
            console.log('Text-to-speech not supported');
            return;
        }

        const paragraphs = document.querySelectorAll('.article-paragraph');
        
        if (currentParagraphIndex >= paragraphs.length) {
            currentParagraphIndex = 0;
        }

        const text = paragraphs[currentParagraphIndex].textContent;
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.rate = currentSpeed;
        currentUtterance.pitch = 1;
        currentUtterance.volume = 1;

        currentUtterance.onend = function() {
            currentParagraphIndex++;
            if (currentParagraphIndex < paragraphs.length && isPlaying) {
                startTextToSpeech();
            } else {
                isPlaying = false;
                waveform.classList.remove('playing');
                playPauseBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                `;
            }
        };

        speechSynthesis.speak(currentUtterance);
        
        // Highlight current paragraph
        paragraphs.forEach((p, i) => {
            if (i === currentParagraphIndex) {
                p.style.backgroundColor = 'rgba(0, 168, 255, 0.1)';
                p.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                p.style.backgroundColor = '';
            }
        });
    }

    function stopTextToSpeech() {
        if (speechSynthesis && currentUtterance) {
            speechSynthesis.cancel();
        }
        
        // Remove highlights
        const paragraphs = document.querySelectorAll('.article-paragraph');
        paragraphs.forEach(p => {
            p.style.backgroundColor = '';
        });
    }

    // Navigation between paragraphs
    function scrollToNextParagraph() {
        const paragraphs = document.querySelectorAll('.article-paragraph');
        currentParagraphIndex = Math.min(currentParagraphIndex + 1, paragraphs.length - 1);
        
        if (paragraphs[currentParagraphIndex]) {
            paragraphs[currentParagraphIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            if (isPlaying) {
                stopTextToSpeech();
                startTextToSpeech();
            }
        }
    }

    function scrollToPreviousParagraph() {
        const paragraphs = document.querySelectorAll('.article-paragraph');
        currentParagraphIndex = Math.max(currentParagraphIndex - 1, 0);
        
        if (paragraphs[currentParagraphIndex]) {
            paragraphs[currentParagraphIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            if (isPlaying) {
                stopTextToSpeech();
                startTextToSpeech();
            }
        }
    }

    // Waveform click to seek
    waveform.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        
        const paragraphs = document.querySelectorAll('.article-paragraph');
        const targetIndex = Math.floor(clickPosition * paragraphs.length);
        
        currentParagraphIndex = targetIndex;
        
        if (isPlaying) {
            stopTextToSpeech();
            startTextToSpeech();
        }
        
        console.log(`Seeking to paragraph ${targetIndex + 1}`);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Spacebar to play/pause
        if (e.code === 'Space') {
            e.preventDefault();
            playPauseBtn.click();
        }
        
        // Left arrow for previous
        if (e.code === 'ArrowLeft') {
            e.preventDefault();
            prevBtn.click();
        }
        
        // Right arrow for next
        if (e.code === 'ArrowRight') {
            e.preventDefault();
            nextBtn.click();
        }
        
        // Escape to close
        if (e.code === 'Escape') {
            closeBtn.click();
        }
    });

    // Animate wave bars on load
    const waveBars = document.querySelectorAll('.wave-bar');
    waveBars.forEach((bar, index) => {
        bar.style.opacity = '0';
        setTimeout(() => {
            bar.style.transition = 'opacity 0.3s ease';
            bar.style.opacity = '1';
        }, index * 30);
    });

    // Stop audio when leaving page
    window.addEventListener('beforeunload', function() {
        stopTextToSpeech();
    });

    // Log initialization
    console.log('Article reader loaded successfully');
    console.log('Text-to-speech available:', !!speechSynthesis);
});

// Function to load different article
function loadArticle(title, content) {
    document.querySelector('.article-title').textContent = title;
    document.querySelector('.article-body').innerHTML = content;
    console.log('Article loaded:', title);
}

// Function to export article as text
function exportArticle() {
    const title = document.querySelector('.article-title').textContent;
    const body = document.querySelector('.article-body').textContent;
    
    const content = `${title}\n\n${body}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.txt`;
    link.click();
    
    console.log('Article exported');
}

// Function to adjust text size
function adjustTextSize(size) {
    const body = document.querySelector('.article-body');
    const currentSize = parseInt(window.getComputedStyle(body.querySelector('.article-paragraph')).fontSize);
    
    const newSize = size === 'increase' ? currentSize + 2 : currentSize - 2;
    
    body.querySelectorAll('.article-paragraph, .article-list li').forEach(element => {
        element.style.fontSize = `${newSize}px`;
    });
    
    console.log('Text size adjusted to:', newSize);
}