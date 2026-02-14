// ===== TEMPORIZADOR DE RELACIONAMENTO =====
const relationshipStartDate = new Date('2025-07-07T22:30:00');

function updateRelationshipTimer() {
    const now = new Date();
    const start = new Date(relationshipStartDate);
    
    // Calcular meses completos
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    
    // Ajustar se os dias forem negativos
    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    // Ajustar se os meses forem negativos
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Adicionar anos aos meses
    months += years * 12;
    
    // Calcular horas e minutos
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Formatar com zero à esquerda
    const formattedMonths = String(months).padStart(2, '0');
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    
    // Atualizar o elemento
    const timerElement = document.getElementById('relationshipTimer');
    if (timerElement) {
        timerElement.textContent = `${formattedMonths}M:${formattedDays}D:${formattedHours}H:${formattedMinutes}m`;
    }
}

// Atualizar a cada minuto
setInterval(updateRelationshipTimer, 60000);
// Atualizar imediatamente ao carregar
updateRelationshipTimer();

// ===== INTRO ROMÂNTICA =====
let introPhotoPaths = [];
let introInterval;

function loadIntroPhotos() {
    const introPhotosContainer = document.getElementById('introPhotos');
    const imageNames = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg'];
    
    // Verificar quais fotos existem
    imageNames.forEach(imageName => {
        const img = new Image();
        img.src = `images/${imageName}`;
        
        img.onload = function() {
            introPhotoPaths.push(`images/${imageName}`);
        };
    });
    
    // Iniciar animação de fotos após 500ms
    setTimeout(() => {
        if (introPhotoPaths.length > 0) {
            showIntroPhotos();
        }
    }, 500);
}

function showIntroPhotos() {
    const container = document.getElementById('introPhotos');
    let photoIndex = 0;
    
    // Mostrar fotos aleatoriamente durante a intro
    introInterval = setInterval(() => {
        if (photoIndex < introPhotoPaths.length && photoIndex < 8) {
            const img = document.createElement('img');
            img.src = introPhotoPaths[photoIndex % introPhotoPaths.length];
            img.className = 'intro-photo';
            
            // Posição aleatória (evitar cortar fotos na direita e não cobrir a barra de loading)
            const randomX = Math.random() * 55 + 5; // 5-60% (mais espaço à direita)
            const randomY = Math.random() * 50 + 5; // 5-55% (não vai até muito embaixo)
            img.style.left = randomX + '%';
            img.style.top = randomY + '%';
            img.style.animationDelay = (photoIndex * 0.5) + 's';
            
            container.appendChild(img);
            photoIndex++;
        }
    }, 1200);
    
    // Parar após 8 segundos
    setTimeout(() => {
        clearInterval(introInterval);
    }, 8000);
}

function finishIntro() {
    setTimeout(() => {
        document.getElementById('introScreen').style.display = 'none';
        document.getElementById('proposalScreen').classList.remove('hidden');
    }, 8500);
}

// ===== PEDIDO DE NAMORO =====
let noClickCount = 0;

// Tornar funções globais para que onclick funcione
window.acceptProposal = function() {
    const proposalScreen = document.getElementById('proposalScreen');
    const mainSite = document.getElementById('mainSite');
    
    // Animação de celebração
    proposalScreen.style.animation = 'proposalFadeOut 1s ease-out forwards';
    
    setTimeout(() => {
        proposalScreen.style.display = 'none';
        mainSite.classList.remove('hidden');
        mainSite.classList.add('show');
        
        // Confetti ou celebração
        createHearts();
    }, 1000);
}

window.rejectProposal = function() {
    const btnNao = document.getElementById('btnNao');
    noClickCount++;
    
    if (noClickCount === 1) {
        // Primeira tentativa: botão treme
        btnNao.style.animation = 'buttonShake 0.5s ease';
        setTimeout(() => {
            btnNao.style.animation = '';
        }, 500);
    } else if (noClickCount === 2) {
        // Segunda tentativa: botão fica menor e se move
        btnNao.style.transform = 'scale(0.7)';
        btnNao.style.position = 'relative';
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        btnNao.style.left = randomX + 'px';
        btnNao.style.top = randomY + 'px';
    } else {
        // Terceira tentativa: vira "Sim!"
        btnNao.innerHTML = '<i class="fas fa-heart"></i> Sim!';
        btnNao.classList.add('changing');
        btnNao.onclick = window.acceptProposal;
        btnNao.style.background = 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)';
    }
}

function createHearts() {
    // Criar corações de celebração
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            heart.style.color = '#ff6b9d';
            heart.style.zIndex = '10000';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Adicionar animações CSS dinamicamente
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    @keyframes proposalFadeOut {
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Iniciar intro ao carregar
window.addEventListener('load', () => {
    loadIntroPhotos();
    finishIntro();
});

// ===== DARK MODE =====
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Carregar preferência de dark mode
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// ===== NAVEGAÇÃO =====
// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Galeria de fotos - carregar imagens reais se existirem
function loadGalleryImages() {
    const gallery = document.getElementById('photoGallery');
    const imageNames = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg'];
    
    // Tentar carregar cada imagem
    imageNames.forEach((imageName, index) => {
        const img = new Image();
        img.src = `images/${imageName}`;
        
        img.onload = function() {
            const galleryItem = gallery.children[index];
            galleryItem.innerHTML = `<img src="images/${imageName}" alt="Foto ${index + 1}" onclick="openImageModal(this.src)">`;
            galleryItem.classList.remove('placeholder');
        };
    });
}

// Modal de imagem ampliada
window.openImageModal = function(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = src;
}

window.closeImageModal = function() {
    document.getElementById('imageModal').style.display = 'none';
}

// QUIZ DO CASAL
const quizQuestions = [
    {
        question: "Qual é a comida favorita da Bruna?",
        options: ["Francesinha", "Sushi", "Massa com Atum", "Hambúrguer"],
        answer: 2 // Muda para a resposta correta
    },
    {
        question: "Qual é o filme favorito do Bernardo?",
        options: ["Ação", "Comédia", "Romance", "Terror"],
        answer: 0 // Muda para a resposta correta
    },
    {
        question: "Onde foi o nosso primeiro beijo?",
        options: ["Parque", "Cinema", "Praia", "Casa"],
        answer: 0 // Muda para a resposta correta
    },
    {
        question: "Qual é a música do casal?",
        options: ["Yellow", "Shape of You", "All of Me", "Amar não é pecado"],
        answer: 0 // Muda para a resposta correta
    },
    {
        question: "Qual é a data do vosso aniversário de namoro?",
        options: ["07 de Julho", " 4 de Fevereiro", "30 de Julho", "25 de Abril"],
        answer: 0 // Muda para a resposta correta
    }
];

let currentQuizScore = 0;
let currentQuestion = 0;

window.startQuiz = function() {
    const modal = document.getElementById('quizModal');
    modal.style.display = 'block';
    currentQuizScore = 0;
    currentQuestion = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const content = document.getElementById('quizContent');
    const result = document.getElementById('quizResult');
    
    if (currentQuestion < quizQuestions.length) {
        const q = quizQuestions[currentQuestion];
        content.innerHTML = `
            <div class="quiz-question">
                <h3>Pergunta ${currentQuestion + 1} de ${quizQuestions.length}</h3>
                <p style="font-size: 1.2rem; margin: 1rem 0;">${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, index) => `
                        <button class="quiz-option" onclick="selectAnswer(${index})">${option}</button>
                    `).join('')}
                </div>
            </div>
        `;
        result.innerHTML = '';
    } else {
        showQuizResult();
    }
}

window.selectAnswer = function(selected) {
    const correct = quizQuestions[currentQuestion].answer;
    
    if (selected === correct) {
        currentQuizScore++;
        showFeedback('Correto! 💖', true);
    } else {
        showFeedback('Ops! Tenta conhecer melhor o teu amor! 💔', false);
    }
    
    setTimeout(() => {
        currentQuestion++;
        showQuizQuestion();
    }, 1500);
}

function showFeedback(message, isCorrect) {
    const content = document.getElementById('quizContent');
    const feedbackColor = isCorrect ? '#90EE90' : '#FFB6C6';
    content.innerHTML += `<div style="background: ${feedbackColor}; padding: 1rem; margin-top: 1rem; border-radius: 10px; text-align: center; font-weight: bold;">${message}</div>`;
}

function showQuizResult() {
    const content = document.getElementById('quizContent');
    const percentage = (currentQuizScore / quizQuestions.length) * 100;
    
    let message = '';
    if (percentage === 100) {
        message = '🏆 Perfeito! Vocês conhecem-se mesmo muito bem!';
    } else if (percentage >= 70) {
        message = '💕 Muito bem! Vocês são um ótimo casal!';
    } else if (percentage >= 50) {
        message = '💖 Bom! Mas ainda há muito para descobrir!';
    } else {
        message = '💝 Está na hora de conversarem mais um com o outro!';
    }
    
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="color: #ff6b9d; font-size: 2rem; margin-bottom: 1rem;">${message}</h3>
            <p style="font-size: 3rem; margin: 2rem 0;">${currentQuizScore}/${quizQuestions.length}</p>
            <p style="font-size: 1.5rem; color: #666;">${percentage.toFixed(0)}% corretas</p>
            <button class="game-btn" onclick="startQuiz()" style="margin-top: 2rem;">Jogar Novamente</button>
        </div>
    `;
}

window.closeQuiz = function() {
    document.getElementById('quizModal').style.display = 'none';
}

// JOGO DA MEMÓRIA
const memoryEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💘'];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

window.startMemory = function() {
    const modal = document.getElementById('memoryModal');
    modal.style.display = 'block';
    resetMemory();
}

window.resetMemory = function() {
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    
    // Criar e embaralhar cartas
    memoryCards = [...memoryEmojis, ...memoryEmojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({
            id: index,
            emoji: emoji,
            flipped: false,
            matched: false
        }));
    
    updateMemoryStats();
    renderMemoryGame();
}

function renderMemoryGame() {
    const grid = document.getElementById('memoryGame');
    grid.innerHTML = memoryCards.map(card => `
        <div class="memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}" 
             onclick="flipCard(${card.id})">
            ${card.flipped || card.matched ? card.emoji : '❓'}
        </div>
    `).join('');
}

window.flipCard = function(cardId) {
    // Não permitir mais de 2 cartas viradas
    if (flippedCards.length >= 2) return;
    
    const card = memoryCards[cardId];
    
    // Não virar carta já virada ou combinada
    if (card.flipped || card.matched) return;
    
    card.flipped = true;
    flippedCards.push(cardId);
    renderMemoryGame();
    
    if (flippedCards.length === 2) {
        moves++;
        updateMemoryStats();
        checkMatch();
    }
}

function checkMatch() {
    const [card1Id, card2Id] = flippedCards;
    const card1 = memoryCards[card1Id];
    const card2 = memoryCards[card2Id];
    
    setTimeout(() => {
        if (card1.emoji === card2.emoji) {
            // Match!
            card1.matched = true;
            card2.matched = true;
            matchedPairs++;
            updateMemoryStats();
            
            if (matchedPairs === memoryEmojis.length) {
                setTimeout(() => {
                    alert(`🎉 Parabéns! Completaram o jogo em ${moves} jogadas!`);
                }, 500);
            }
        } else {
            // Não combina
            card1.flipped = false;
            card2.flipped = false;
        }
        
        flippedCards = [];
        renderMemoryGame();
    }, 1000);
}

function updateMemoryStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('pairs').textContent = matchedPairs;
}

window.closeMemory = function() {
    document.getElementById('memoryModal').style.display = 'none';
}

// DADOS DO AMOR
const loveChallenges = [
    "Dêem um beijo apaixonado! 💋",
    "Digam 3 coisas que amam um no outro! 💕",
    "Façam uma massagem um ao outro por 5 minutos! 💆",
    "Dancem uma música romântica juntos! 💃🕺",
    "Digam o vosso momento favorito juntos! 🌟",
    "Façam 10 elogios um ao outro! 💖",
    "Planeiem um encontro surpresa para a próxima semana! 🎭",
    "Escrevam uma carta de amor um para o outro! ✍️",
    "Contem a história de como se apaixonaram! 💘",
    "Façam uma promessa romântica um ao outro! 💗",
    "Tirem uma selfie romântica juntos! 📸",
    "Preparem uma sobremesa juntos! 🍰"
];

window.startDice = function() {
    const modal = document.getElementById('diceModal');
    modal.style.display = 'block';
    document.getElementById('diceChallenge').textContent = 'Cliquem em "Lançar Dados" para um desafio romântico!';
}

window.rollDice = function() {
    const dice = document.getElementById('dice');
    const challenge = document.getElementById('diceChallenge');
    
    // Animação do dado
    dice.style.animation = 'none';
    setTimeout(() => {
        dice.style.animation = 'spin 0.5s ease-out';
    }, 10);
    
    // Selecionar desafio aleatório
    const randomChallenge = loveChallenges[Math.floor(Math.random() * loveChallenges.length)];
    
    setTimeout(() => {
        challenge.textContent = randomChallenge;
    }, 500);
}

window.closeDice = function() {
    document.getElementById('diceModal').style.display = 'none';
}

// ===== LOVE BONUS (SEGREDO) =====
let secretRevealed = false;

window.revealSecret = function() {
    if (!secretRevealed) {
        const loveBonusBtn = document.getElementById('loveBonusBtn');
        loveBonusBtn.classList.remove('hidden');
        secretRevealed = true;
        
        // Ocultar o trigger após revelar
        const trigger = document.getElementById('secretTrigger');
        trigger.style.opacity = '0';
        trigger.style.pointerEvents = 'none';
    }
}

window.openLoveBonus = function() {
    const modal = document.getElementById('loveBonusModal');
    const video = document.getElementById('loveBonusVideo');
    modal.style.display = 'block';
    video.currentTime = 0; // Reiniciar vídeo
}

window.closeLoveBonus = function() {
    const modal = document.getElementById('loveBonusModal');
    const video = document.getElementById('loveBonusVideo');
    modal.style.display = 'none';
    video.pause(); // Pausar vídeo ao fechar
}

// ===== SEGREDOS NA HISTÓRIA =====
let musicSecretRevealed = false;
let photoSecretRevealed = false;

// Segredo da Música
window.revealMusic = function() {
    if (!musicSecretRevealed) {
        const musicBtn = document.getElementById('musicBtn');
        const trigger = document.getElementById('secretMusic');
        
        musicBtn.classList.remove('hidden');
        musicSecretRevealed = true;
        
        trigger.style.opacity = '0';
        trigger.style.pointerEvents = 'none';
    }
}

window.playSecretMusic = function() {
    const modal = document.getElementById('musicModal');
    const audio = document.getElementById('secretAudio');
    modal.style.display = 'block';
    audio.currentTime = 15; // Começar aos 15 segundos
    audio.play();
}

window.closeMusicModal = function() {
    const modal = document.getElementById('musicModal');
    const audio = document.getElementById('secretAudio');
    modal.style.display = 'none';
    audio.pause();
}

// Segredo da Foto
window.revealPhoto = function() {
    if (!photoSecretRevealed) {
        const photoBtn = document.getElementById('photoBtn');
        const trigger = document.getElementById('secretPhoto');
        
        photoBtn.classList.remove('hidden');
        photoSecretRevealed = true;
        
        trigger.style.opacity = '0';
        trigger.style.pointerEvents = 'none';
    }
}

window.showSecretPhoto = function() {
    const modal = document.getElementById('secretPhotoModal');
    const video = document.getElementById('secretVideo');
    modal.style.display = 'block';
    if (video) video.currentTime = 0; // Reiniciar vídeo
}

window.closeSecretPhotoModal = function() {
    const modal = document.getElementById('secretPhotoModal');
    const video = document.getElementById('secretVideo');
    modal.style.display = 'none';
    if (video) video.pause();
}

// Fechar modals ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        
        // Pausar vídeo se for o modal Love Bonus
        if (event.target.id === 'loveBonusModal') {
            const video = document.getElementById('loveBonusVideo');
            if (video) video.pause();
        }
        
        // Pausar áudio se for o modal de música
        if (event.target.id === 'musicModal') {
            const audio = document.getElementById('secretAudio');
            if (audio) audio.pause();
        }
        
        // Pausar vídeo se for o modal de foto secreta
        if (event.target.id === 'secretPhotoModal') {
            const video = document.getElementById('secretVideo');
            if (video) video.pause();
        }
    }
}

// Carregar galeria ao carregar página
window.addEventListener('load', loadGalleryImages);
