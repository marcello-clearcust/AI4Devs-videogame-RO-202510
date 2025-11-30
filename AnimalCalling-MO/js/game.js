// Game Configuration
const config = {
    // Default animals list - expects {animal}.png and {animal}.mp3 in assets folder
    animals: [
        'Cat',
        'Cow',
        'Dog',
        'Donkey',
        'Goat',
        'Pig',
        'Pony',
        'Rooster',
        'Sheep'
    ],
    paths: {
        images: 'assets/images/',
        sounds: 'assets/sounds/'
    },
    pointsPerRound: 100,
    maxLives: 3
};

// Game State
let state = {
    score: 0,
    lives: config.maxLives,
    currentRound: {
        target: null, // The animal sound to identify
        options: []   // The 3 animals displayed
    },
    isRoundActive: false, // Prevents interaction during feedback/animations
    sounds: {} // Cache for Howl objects
};

// DOM Elements
const elements = {
    score: document.getElementById('score-display'),
    livesContainer: document.getElementById('lives-display'),
    playSoundBtn: document.getElementById('play-sound-btn'),
    optionsGrid: document.getElementById('options-grid'),
    feedbackMsg: document.getElementById('feedback-msg'),
    modal: document.getElementById('game-over-modal'),
    modalContent: document.getElementById('modal-content'),
    finalScore: document.getElementById('final-score'),
    restartBtn: document.getElementById('restart-btn')
};

// Sound Effects (System)
const sfx = {
    correct: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'], volume: 0.5 }), // Placeholder or generic success
    wrong: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'], volume: 0.5 }),   // Placeholder or generic error
    gameOver: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'], volume: 0.5 })
};

// --- Initialization ---

function init() {
    setupEventListeners();
    startNewGame();
}

function setupEventListeners() {
    elements.playSoundBtn.addEventListener('click', playTargetSound);
    elements.restartBtn.addEventListener('click', () => {
        closeModal();
        startNewGame();
    });
}

// --- Game Logic ---

function startNewGame() {
    state.score = 0;
    state.lives = config.maxLives;
    updateUI();
    preloadSounds(); // Optional: Preload sounds for smoother experience
    startRound();
}

function startRound() {
    state.isRoundActive = true;
    
    // 1. Select Target
    const targetIndex = Math.floor(Math.random() * config.animals.length);
    state.currentRound.target = config.animals[targetIndex];

    // 2. Select Distractors (2 unique others)
    let options = [state.currentRound.target];
    while (options.length < 3) {
        const randomAnimal = config.animals[Math.floor(Math.random() * config.animals.length)];
        if (!options.includes(randomAnimal)) {
            options.push(randomAnimal);
        }
    }

    // 3. Shuffle Options
    state.currentRound.options = options.sort(() => Math.random() - 0.5);

    // 4. Render
    renderRound();
    
    // 5. Reset Feedback
    elements.feedbackMsg.style.opacity = '0';
    
    // Note: We don't auto-play sound to respect browser autoplay policies, user must click button
}

function renderRound() {
    elements.optionsGrid.innerHTML = '';
    
    state.currentRound.options.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'animal-card bg-white p-4 rounded-2xl shadow-lg cursor-pointer border-4 border-transparent hover:border-blue-400 group relative transition-all';
        card.dataset.animal = animal;
        
        // Image with fallback handling
        const imgContainer = document.createElement('div');
        imgContainer.className = 'aspect-square rounded-xl overflow-hidden bg-gray-100 relative';
        
        const img = document.createElement('img');
        img.src = `${config.paths.images}${animal}.png`;
        img.alt = animal;
        img.className = 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500';
        
        // Handle missing images gracefully
        img.onerror = function() {
            this.style.display = 'none';
            imgContainer.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-gray-400 font-bold capitalize text-xl">${animal}</div>`;
        };

        imgContainer.appendChild(img);
        card.appendChild(imgContainer);
        
        // Click Event
        card.addEventListener('click', () => handleCardClick(card, animal));
        
        elements.optionsGrid.appendChild(card);
    });
}

function playTargetSound() {
    if (!state.currentRound.target) return;

    // Stop any currently playing sound
    Howler.stop();

    // Animate Button
    elements.playSoundBtn.classList.add('scale-95');
    setTimeout(() => elements.playSoundBtn.classList.remove('scale-95'), 100);

    const soundPath = `${config.paths.sounds}${state.currentRound.target}.mp3`;
    
    // Create or reuse Howl instance
    const sound = new Howl({
        src: [soundPath],
        html5: true, // Forces HTML5 Audio to support large files/streaming better if needed
        onloaderror: (id, err) => {
            console.error('Sound load error:', err);
            alert(`Sound file missing: ${soundPath}. Please ensure assets are in place.`);
        }
    });
    
    sound.play();
}

function handleCardClick(cardElement, selectedAnimal) {
    if (!state.isRoundActive) return;

    const isCorrect = selectedAnimal === state.currentRound.target;

    if (isCorrect) {
        handleSuccess(cardElement);
    } else {
        handleFailure(cardElement);
    }
}

function handleSuccess(cardElement) {
    state.isRoundActive = false; // Lock input
    
    // Visuals
    cardElement.classList.add('correct-answer');
    triggerConfetti();
    
    // Audio
    sfx.correct.play();
    
    // Score
    state.score += config.pointsPerRound;
    updateUI();
    
    // Message
    showFeedback('Correct!', 'text-green-600');

    // Next Round Delay
    setTimeout(() => {
        startRound();
    }, 2000);
}

function handleFailure(cardElement) {
    // Visuals
    cardElement.classList.add('shake');
    
    // Audio
    sfx.wrong.play();
    
    // Lives
    state.lives--;
    updateUI();
    
    // Remove shake class after animation
    setTimeout(() => {
        cardElement.classList.remove('shake');
    }, 500);

    // Check Game Over
    if (state.lives <= 0) {
        endGame();
    }
}

function endGame() {
    state.isRoundActive = false;
    sfx.gameOver.play();
    elements.finalScore.textContent = state.score;
    showModal();
}

// --- UI Helpers ---

function updateUI() {
    // Score
    elements.score.textContent = state.score;
    
    // Lives (Hearts)
    const heartSVG = `<svg class="w-8 h-8 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    const brokenHeartSVG = `<svg class="w-8 h-8 text-gray-300 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    
    elements.livesContainer.innerHTML = '';
    for (let i = 0; i < config.maxLives; i++) {
        elements.livesContainer.innerHTML += (i < state.lives) ? heartSVG : brokenHeartSVG;
    }
}

function showFeedback(text, colorClass) {
    elements.feedbackMsg.textContent = text;
    elements.feedbackMsg.className = `h-8 text-xl font-bold text-center transition-opacity duration-300 opacity-100 ${colorClass}`;
    
    setTimeout(() => {
        elements.feedbackMsg.classList.remove('opacity-100');
        elements.feedbackMsg.classList.add('opacity-0');
    }, 1500);
}

function showModal() {
    elements.modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        elements.modal.classList.add('modal-active');
        elements.modalContent.classList.add('modal-content-active');
    }, 10);
}

function closeModal() {
    elements.modal.classList.remove('modal-active');
    elements.modalContent.classList.remove('modal-content-active');
    
    setTimeout(() => {
        elements.modal.classList.add('hidden');
    }, 300);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function preloadSounds() {
    // Basic preloading of common assets could go here
    // For this simple game, lazy loading on click is acceptable
}

// Start
init();
