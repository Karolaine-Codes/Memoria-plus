/* =========================================
   MEMÓRIA+
   JOGO DA MEMÓRIA EDUCATIVO
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const menu =
    document.querySelector("#menu");

const game =
    document.querySelector("#game");

const victory =
    document.querySelector("#victory");

const gameOverScreen =
    document.querySelector("#game-over");

const gameBoard =
    document.querySelector("#game-board");

const startButton =
    document.querySelector("#start-button");

const backButton =
    document.querySelector("#back-button");

const playAgainButton =
    document.querySelector("#play-again");

const victoryMenuButton =
    document.querySelector("#victory-menu");

const retryButton =
    document.querySelector("#retry-button");

const gameOverMenuButton =
    document.querySelector("#game-over-menu");

const message =
    document.querySelector("#message");

const loginScreen =
    document.querySelector("#login");

const loginForm =
    document.querySelector("#login-form");

const guestButton =
    document.querySelector("#guest-button");

const logoutButton =
    document.querySelector("#logout-button");

const playerNameInput =
    document.querySelector("#player-name");

const playerNameLabel =
    document.querySelector("#player-name-label");

const bestScoreElement =
    document.querySelector("#best-score");

const rankingElement =
    document.querySelector("#ranking");

const globalRankingList =
    document.querySelector("#global-ranking-list");

const scoreElement =
    document.querySelector("#score");

const livesElement =
    document.querySelector("#lives");

const comboElement =
    document.querySelector("#combo");

const attemptsElement =
    document.querySelector("#attempts");

const timerElement =
    document.querySelector("#timer");

const categoryNameElement =
    document.querySelector("#category-name");

const finalScoreElement =
    document.querySelector("#final-score");

const finalComboElement =
    document.querySelector("#final-combo");

const finalAttemptsElement =
    document.querySelector("#final-attempts");

const finalTimeElement =
    document.querySelector("#final-time");

const gameOverScoreElement =
    document.querySelector("#game-over-score");

const gameOverComboElement =
    document.querySelector("#game-over-combo");

const gameOverAttemptsElement =
    document.querySelector("#game-over-attempts");

const gameOverTimeElement =
    document.querySelector("#game-over-time");


/* =========================================
   BOTÕES
========================================= */

const categoryButtons =
    document.querySelectorAll(
        ".category"
    );

const difficultyButtons =
    document.querySelectorAll(
        ".difficulty-button"
    );


/* =========================================
   ESTADO
========================================= */

let selectedCategory = null;

let selectedDifficulty = null;

let cards = [];

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;

let score = 0;

const DEFAULT_MAX_LIVES = 6;

const HARD_MODE_EXTRA_LIVES = 2;

let lives = DEFAULT_MAX_LIVES;

const livesChancesElement = document.querySelector("#lives-chances");

function getMaxLives() {

    return selectedDifficulty === "hard"
        ? DEFAULT_MAX_LIVES + HARD_MODE_EXTRA_LIVES
        : DEFAULT_MAX_LIVES;

}

let combo = 0;

let bestCombo = 0;

let attempts = 0;

let seconds = 0;

let timerInterval = null;

let audioContext = null;

let bestScore = 0;

const PLAYER_NAME_KEY = "memoria-plus-player-name";

const BEST_SCORE_KEY = "memoria-plus-best-score";

const RANKING_KEY = "memoria-plus-ranking";

const GLOBAL_RANKING_KEY = "memoria-plus-global-ranking";

const SUPABASE_TABLE = "leaderboard";

const SUPABASE_CONFIG =
    window.MEMORIA_PLUS_SUPABASE || {};

const SUPABASE_URL =
    SUPABASE_CONFIG.url || "";

const SUPABASE_ANON_KEY =
    SUPABASE_CONFIG.anonKey || "";

const SUPABASE_ENABLED =
    Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const rankingTemplate = {

    animals: {
        easy: 0,
        medium: 0,
        hard: 0
    },

    math: {
        easy: 0,
        medium: 0,
        hard: 0
    },

    geography: {
        easy: 0,
        medium: 0,
        hard: 0
    },

    science: {
        easy: 0,
        medium: 0,
        hard: 0
    }

};


/* =========================================
   DIFICULDADES
========================================= */

const difficultyConfig = {

    easy: {
        pairs: 4
    },

    medium: {
        pairs: 6
    },

    hard: {
        pairs: 8
    }

};


/* =========================================
   CATEGORIAS
========================================= */

const categoryData = {

    animals: [
        "🐶",
        "🐱",
        "🦊",
        "🐼",
        "🐸",
        "🐵",
        "🦁",
        "🐯"
    ],

    math: [
        "➕",
        "➖",
        "✖️",
        "➗",
        "🔢",
        "📐",
        "📊",
        "💯"
    ],

    geography: [
        "🌎",
        "🌍",
        "🌏",
        "🗺️",
        "🏔️",
        "🏝️",
        "🌋",
        "🏜️"
    ],

    science: [
        "🔬",
        "🧬",
        "🧪",
        "⚛️",
        "🌡️",
        "🧫",
        "🔭",
        "🧠"
    ]

};


const categoryNames = {

    animals: "🐶 Animais",

    math: "➕ Matemática",

    geography: "🌎 Geografia",

    science: "🔬 Ciências"

};


/* =========================================
   SELECIONAR CATEGORIA
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(
                item => {

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            button.classList.add(
                "selected"
            );


            selectedCategory =
                button.dataset.category;

            updateRankingDisplay();
            updateMessage();

        }
    );

});


/* =========================================
   SELECIONAR DIFICULDADE
========================================= */

difficultyButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            difficultyButtons.forEach(
                item => {

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            button.classList.add(
                "selected"
            );


            selectedDifficulty =
                button.dataset.difficulty;

            updateRankingDisplay();
            updateMessage();

        }
    );

});


/* =========================================
   MENSAGEM
========================================= */

function updateMessage() {

    if (livesChancesElement) {
        livesChancesElement.textContent =
            selectedDifficulty === "hard"
                ? "Oito chances"
                : "Seis chances";
    }

    startButton.disabled =
        !(
            selectedCategory &&
            selectedDifficulty
        );


    if (
        !selectedCategory &&
        !selectedDifficulty
    ) {

        message.textContent =
            "Escolha uma categoria e uma dificuldade.";

        message.className =
            "message";

        return;

    }


    if (
        selectedCategory &&
        !selectedDifficulty
    ) {

        message.textContent =
            `${categoryNames[selectedCategory]} selecionado. Agora escolha a dificuldade.`;

        message.className =
            "message message-info";

        return;

    }


    if (
        !selectedCategory &&
        selectedDifficulty
    ) {

        const difficultyNames = {

            easy: "🟢 Fácil",

            medium: "🟡 Médio",

            hard: "🔴 Difícil"

        };


        message.textContent =
            `${difficultyNames[selectedDifficulty]} selecionado. Agora escolha uma categoria.`;

        message.className =
            "message message-info";

        return;

    }


    message.textContent =
        "🚀 Tudo pronto! Você pode começar o jogo.";

    message.className =
        "message message-success";

}


function getStoredBestScore() {

    try {

        const savedScore =
            Number(
                localStorage.getItem(
                    BEST_SCORE_KEY
                )
            );

        return Number.isFinite(savedScore)
            ? savedScore
            : 0;

    } catch (error) {

        return 0;

    }

}


function getPlayerName() {

    try {

        const storedName =
            localStorage.getItem(
                PLAYER_NAME_KEY
            );

        return storedName && storedName.trim()
            ? storedName.trim()
            : "Visitante";

    } catch (error) {

        return "Visitante";

    }

}


function setPlayerName(name) {

    const cleanName =
        (name || "Visitante")
            .trim()
            .slice(0, 18) || "Visitante";

    try {

        localStorage.setItem(
            PLAYER_NAME_KEY,
            cleanName
        );

    } catch (error) {

        console.warn(
            "Não foi possível guardar o nome do jogador.",
            error
        );

    }

    if (playerNameLabel) {
        playerNameLabel.textContent =
            cleanName;
    }

    return cleanName;

}


function enterGame(name) {

    const currentPlayerName =
        setPlayerName(name);

    loginScreen.classList.add("hidden");
    menu.classList.remove("hidden");

    if (playerNameInput) {
        playerNameInput.value =
            currentPlayerName === "Visitante"
                ? ""
                : currentPlayerName;
    }

}


function logoutPlayer() {

    setPlayerName("Visitante");
    localStorage.removeItem(PLAYER_NAME_KEY);

    loginScreen.classList.remove("hidden");
    menu.classList.add("hidden");

    if (playerNameInput) {
        playerNameInput.value = "";
    }

    if (playerNameLabel) {
        playerNameLabel.textContent = "Visitante";
    }

}


function normalizeRankingEntry(entry) {

    return {
        name: String(entry?.name || "Visitante").slice(0, 18),
        score: Number(entry?.score || 0),
        category: entry?.category || "Geral",
        difficulty: entry?.difficulty || "Médio"
    };

}

function buildSupabaseHeaders() { return { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json" }; }

async function fetchGlobalRankingFromSupabase() {

    if (!SUPABASE_ENABLED) {
        return [];
    }

    try {

        const endpoint = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${SUPABASE_TABLE}?select=name,score,category,difficulty&order=score.desc&limit=5`;

        const response = await fetch(
            endpoint,
            {
                headers: buildSupabaseHeaders()
            }
        );

        if (!response.ok) {
            throw new Error(`Erro do Supabase: ${response.status}`);
        }

        const data = await response.json();

        return Array.isArray(data)
            ? data.map(normalizeRankingEntry)
            : [];

    } catch (error) {

        console.warn("Não foi possível carregar a tabela do Supabase.", error);
        return [];

    }

}

async function pushGlobalRankingToSupabase(entry) {

    if (!SUPABASE_ENABLED || !entry?.name || !entry?.score) {
        return;
    }

    try {

        const endpoint = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${SUPABASE_TABLE}`;

        await fetch(
            endpoint,
            {
                method: "POST",
                headers: {
                    ...buildSupabaseHeaders(),
                    Prefer: "return=representation"
                },
                body: JSON.stringify({
                    name: entry.name,
                    score: Number(entry.score),
                    category: entry.category,
                    difficulty: entry.difficulty
                })
            }
        );

    } catch (error) {

        console.warn("Falha ao enviar score para o Supabase.", error);

    }

}

function getGlobalRanking() {

    try {

        const ranking =
            JSON.parse(
                localStorage.getItem(
                    GLOBAL_RANKING_KEY
                ) || "[]"
            );

        return Array.isArray(ranking)
            ? ranking.map(normalizeRankingEntry)
            : [];

    } catch (error) {

        return [];

    }

}


function seedGlobalRanking() {

    const currentRanking =
        getGlobalRanking();

    if (currentRanking.length > 0) {
        return currentRanking;
    }

    const seedEntries = [
        { name: "Nina", score: 920, category: "Animais", difficulty: "Médio" },
        { name: "Theo", score: 880, category: "Matemática", difficulty: "Difícil" },
        { name: "Luiza", score: 830, category: "Ciências", difficulty: "Fácil" },
        { name: "Kai", score: 780, category: "Geografia", difficulty: "Médio" },
        { name: "Júlia", score: 760, category: "Animais", difficulty: "Fácil" }
    ];

    localStorage.setItem(
        GLOBAL_RANKING_KEY,
        JSON.stringify(seedEntries)
    );

    return seedEntries;

}


async function updateGlobalRanking() {

    let ranking = [...seedGlobalRanking()].map(normalizeRankingEntry);

    if (SUPABASE_ENABLED) {
        const remoteRanking = await fetchGlobalRankingFromSupabase();
        ranking = [...ranking, ...remoteRanking]
            .sort((a, b) => Number(b.score) - Number(a.score))
            .slice(0, 5);
    } else {
        ranking = ranking
            .sort((a, b) => Number(b.score) - Number(a.score))
            .slice(0, 5);
    }

    if (!globalRankingList) {
        return;
    }

    globalRankingList.innerHTML =
        ranking.map(
            (entry, index) => `
                <li class="ranking-item">
                    <span class="ranking-position">#${index + 1}</span>
                    <span class="ranking-player">${entry.name}</span>
                    <span class="ranking-score">${entry.score} pts</span>
                </li>
            `
        ).join("");

}


async function addScoreToGlobalRanking(name, score, category, difficulty) {

    if (!name || !score) {
        return;
    }

    const ranking =
        seedGlobalRanking();

    ranking.push({
        name,
        score,
        category,
        difficulty
    });

    ranking.sort(
        (a, b) => b.score - a.score
    );

    const topRanking =
        ranking.slice(0, 10);

    try {

        localStorage.setItem(
            GLOBAL_RANKING_KEY,
            JSON.stringify(topRanking)
        );

    } catch (error) {

        console.warn(
            "Não foi possível salvar o ranking mundial.",
            error
        );

    }

    if (SUPABASE_ENABLED) {
        await pushGlobalRankingToSupabase({
            name,
            score,
            category,
            difficulty
        });
    }

    await updateGlobalRanking();

}


function updateBestScoreDisplay() {

    bestScore =
        Math.max(
            bestScore,
            getStoredBestScore()
        );

    bestScoreElement.textContent =
        `🏅 Recorde: ${bestScore}`;

}


function saveBestScore(currentScore) {

    const nextBestScore =
        Math.max(
            bestScore,
            currentScore
        );

    bestScore = nextBestScore;

    try {

        localStorage.setItem(
            BEST_SCORE_KEY,
            String(nextBestScore)
        );

    } catch (error) {

        console.warn(
            "Não foi possível salvar o melhor score.",
            error
        );

    }

    updateBestScoreDisplay();

}


function getStoredRanking() {

    try {

        const rawRanking =
            JSON.parse(
                localStorage.getItem(
                    RANKING_KEY
                ) || "{}"
            );

        return {
            ...rankingTemplate,
            ...rawRanking,
            animals: {
                ...rankingTemplate.animals,
                ...(rawRanking.animals || {})
            },
            math: {
                ...rankingTemplate.math,
                ...(rawRanking.math || {})
            },
            geography: {
                ...rankingTemplate.geography,
                ...(rawRanking.geography || {})
            },
            science: {
                ...rankingTemplate.science,
                ...(rawRanking.science || {})
            }
        };

    } catch (error) {

        return {
            ...rankingTemplate
        };

    }

}


function saveCategoryScore(category, difficulty, score) {

    if (!category || !difficulty) {
        return;
    }

    const ranking =
        getStoredRanking();

    const currentDifficultyRecord =
        ranking[category][difficulty] ?? 0;

    ranking[category][difficulty] =
        Math.max(
            currentDifficultyRecord,
            score
        );

    try {

        localStorage.setItem(
            RANKING_KEY,
            JSON.stringify(ranking)
        );

    } catch (error) {

        console.warn(
            "Não foi possível salvar o ranking da categoria.",
            error
        );

    }

    updateRankingDisplay();

}


function updateRankingDisplay() {

    const ranking =
        getStoredRanking();

    const difficultyLabels = {

        easy: "Fácil",
        medium: "Médio",
        hard: "Difícil"

    };

    const categoryEntries =
        Object.entries(
            categoryNames
        );

    if (rankingElement) {

        rankingElement.innerHTML =
            categoryEntries.map(
                ([category, label]) => {

                    const scores =
                        ranking[category] || {
                            easy: 0,
                            medium: 0,
                            hard: 0
                        };

                    return `
                        <div class="ranking-item ${selectedCategory === category ? "active" : ""}">
                            <span class="ranking-label">${label}</span>
                            <div class="ranking-scores">
                                ${Object.entries(difficultyLabels).map(([difficulty, text]) => {
                                    return `<span class="ranking-pill ${difficulty}">${text}: ${scores[difficulty] ?? 0}</span>`;
                                }).join("")}
                            </div>
                        </div>
                    `;

                }
            ).join("");

    }

}


function initializeAudio() {

   const AudioContextClass =
       window.AudioContext ||
       window.webkitAudioContext;

   if (!AudioContextClass) {
       return;
   }

   if (!audioContext) {
       audioContext = new AudioContextClass();
   }

   if (audioContext.state === "suspended") {
       audioContext.resume();
   }

}


function playTone(
   frequency,
   duration,
   type = "sine",
   volume = 0.04,
   slide = 0
) {

   if (!audioContext) {
       return;
   }

   const oscillator =
       audioContext.createOscillator();

   const gainNode =
       audioContext.createGain();

   oscillator.type = type;
   oscillator.frequency.setValueAtTime(
       frequency,
       audioContext.currentTime
   );

   if (slide) {
       oscillator.frequency.linearRampToValueAtTime(
           frequency + slide,
           audioContext.currentTime + duration
       );
   }

   gainNode.gain.setValueAtTime(
       0.0001,
       audioContext.currentTime
   );

   gainNode.gain.exponentialRampToValueAtTime(
       volume,
       audioContext.currentTime + 0.02
   );

   gainNode.gain.exponentialRampToValueAtTime(
       0.0001,
       audioContext.currentTime + duration
   );

   oscillator.connect(gainNode);
   gainNode.connect(audioContext.destination);

   oscillator.start(audioContext.currentTime);
   oscillator.stop(audioContext.currentTime + duration);

}


function playSound(type) {

   initializeAudio();

   if (!audioContext) {
       return;
   }

   if (type === "match") {
       playTone(660, 0.08, "triangle", 0.05, 80);
       setTimeout(() => {
           playTone(880, 0.12, "triangle", 0.04, 60);
       }, 70);
       return;
   }

   if (type === "mismatch") {
       playTone(220, 0.16, "sawtooth", 0.04, -50);
       return;
   }

   if (type === "win") {
       playTone(392, 0.13, "triangle", 0.05, 45);
       setTimeout(() => {
           playTone(523, 0.13, "triangle", 0.05, 55);
       }, 100);
       setTimeout(() => {
           playTone(659, 0.18, "triangle", 0.05, 65);
       }, 200);
       return;
   }

   if (type === "game-over") {
       playTone(180, 0.2, "square", 0.05, -30);
       setTimeout(() => {
           playTone(140, 0.25, "square", 0.04, -25);
       }, 160);
   }

}


/* =========================================
   INICIAR
========================================= */

startButton.addEventListener(
    "click",
    () => {
        initializeAudio();
        startGame();
    }
);


function startGame() {

    if (
        !selectedCategory ||
        !selectedDifficulty
    ) {

        return;

    }


    resetGame();


    menu.classList.add(
        "hidden"
    );

    victory.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    game.classList.remove(
        "hidden"
    );


    categoryNameElement.textContent =
        categoryNames[selectedCategory];


    createBoard();

    startTimer();

}


/* =========================================
   RESETAR
========================================= */

function resetGame() {

    clearInterval(
        timerInterval
    );


    firstCard = null;

    secondCard = null;

    lockBoard = false;

    matchedPairs = 0;

    score = 0;

    lives = getMaxLives();

    combo = 0;

    bestCombo = 0;

    attempts = 0;

    seconds = 0;


    gameBoard.innerHTML = "";


    updateScore();

    updateLives();

    updateCombo();

    updateAttempts();

    updateTimer();

}


/* =========================================
   TABULEIRO
========================================= */

function createBoard() {

    const pairCount =
        difficultyConfig[
            selectedDifficulty
        ].pairs;


    const availableCards =
        categoryData[
            selectedCategory
        ];


    const selectedCards =
        availableCards.slice(
            0,
            pairCount
        );


    cards = [
        ...selectedCards,
        ...selectedCards
    ];


    cards =
        shuffle(cards);


    cards.forEach(
        (symbol, index) => {

            const card =
                createCard(
                    symbol,
                    index
                );


            gameBoard.appendChild(
                card
            );

        }
    );

}


/* =========================================
   CARTA
========================================= */

function createCard(
    symbol,
    index
) {

    const card =
        document.createElement(
            "button"
        );


    card.type = "button";

    card.className =
        "card";


    card.dataset.symbol =
        symbol;

    card.dataset.index =
        index;


    card.innerHTML = `

        <div class="card-inner">

            <div class="card-front">
                ❓
            </div>

            <div class="card-back">
                ${symbol}
            </div>

        </div>

    `;


    card.addEventListener(
        "click",
        () => flipCard(card)
    );


    return card;

}


/* =========================================
   EMBARALHAR
========================================= */

function shuffle(array) {

    const result =
        [...array];


    for (
        let i =
            result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];

    }


    return result;

}


/* =========================================
   VIRAR CARTA
========================================= */

function flipCard(card) {

    if (
        lockBoard ||
        card === firstCard ||
        card.classList.contains(
            "matched"
        )
    ) {

        return;

    }


    card.classList.add(
        "flipped"
    );


    if (!firstCard) {

        firstCard = card;

        return;

    }


    secondCard = card;

    attempts++;

    updateAttempts();


    checkMatch();

}


/* =========================================
   COMPARAR
========================================= */

function checkMatch() {

    lockBoard = true;


    const match =
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol;


    if (match) {

        handleMatch();

    } else {

        handleMismatch();

    }

}


/* =========================================
   ACERTO
========================================= */

function handleMatch() {

    firstCard.classList.add(
        "matched"
    );

    secondCard.classList.add(
        "matched"
    );


    matchedPairs++;


    combo++;


    if (combo > bestCombo) {

        bestCombo = combo;

    }


    const points =
        calculatePoints();

    score += points;

    saveBestScore(score);
    saveCategoryScore(selectedCategory, selectedDifficulty, score);

    updateScore();

    updateCombo();

    playSound("match");


    setTimeout(
        () => {

            resetTurn();


            if (
                matchedPairs ===
                cards.length / 2
            ) {

                finishGame();

            }

        },
        500
    );

}

/* =========================================
   PONTUAÇÃO
========================================= */

function calculatePoints() {

    const base = 100;


    const comboBonus =
        (combo - 1) * 25;


    const difficultyBonus = {

        easy: 0,

        medium: 25,

        hard: 50

    };


    return (
        base +
        comboBonus +
        difficultyBonus[
            selectedDifficulty
        ]
    );

}


/* =========================================
   ERRO
========================================= */

function handleMismatch() {

    lives--;

    combo = 0;


    updateLives();

    playSound("mismatch");


    setTimeout(
        () => {

            firstCard.classList.remove(
                "flipped"
            );

            secondCard.classList.remove(
                "flipped"
            );


            resetTurn();


            if (lives <= 0) {

                gameOver();

            }

        },
        900
    );

}

/* =========================================
   RESETAR TURNO
========================================= */

function resetTurn() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


/* =========================================
   PONTOS
========================================= */

function updateScore() {

    scoreElement.textContent =
        score;

}


/* =========================================
   VIDAS
========================================= */

function updateLives() {

    const maxLives = getMaxLives();
    let hearts = "";


    for (
        let i = 0;
        i < maxLives;
        i++
    ) {

        if (i < lives) {

            hearts += "❤️ ";

        } else {

            hearts += "🤍 ";

        }

    }


    livesElement.textContent =
        hearts.trim();

}


/* =========================================
   COMBO
========================================= */

function updateCombo() {

    comboElement.textContent =
        combo;


    if (combo >= 3) {

        comboElement.classList.add(
            "combo-active"
        );

    } else {

        comboElement.classList.remove(
            "combo-active"
        );

    }

}


/* =========================================
   TENTATIVAS
========================================= */

function updateAttempts() {

    attemptsElement.textContent =
        attempts;

}


/* =========================================
   CRONÔMETRO
========================================= */

function startTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval =
        setInterval(
            () => {

                seconds++;

                updateTimer();

            },
            1000
        );

}


function updateTimer() {

    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;

}


/* =========================================
   VITÓRIA
========================================= */

function finishGame() {

    clearInterval(
        timerInterval
    );

    playSound("win");


    saveBestScore(score);
    saveCategoryScore(selectedCategory, selectedDifficulty, score);
    addScoreToGlobalRanking(
        getPlayerName(),
        score,
        categoryNames[selectedCategory],
        selectedDifficulty
    );

    finalScoreElement.textContent =
        score;

    finalComboElement.textContent =
        bestCombo;

    finalAttemptsElement.textContent =
        attempts;

    finalTimeElement.textContent =
        timerElement.textContent;


    game.classList.add(
        "hidden"
    );

    victory.classList.remove(
        "hidden"
    );

}


/* =========================================
   GAME OVER
========================================= */

function gameOver() {

    clearInterval(
        timerInterval
    );

    playSound("game-over");


    saveBestScore(score);
    saveCategoryScore(selectedCategory, selectedDifficulty, score);
    addScoreToGlobalRanking(
        getPlayerName(),
        score,
        categoryNames[selectedCategory],
        selectedDifficulty
    );

    gameOverScoreElement.textContent =
        score;

    gameOverComboElement.textContent =
        bestCombo;

    gameOverAttemptsElement.textContent =
        attempts;

    gameOverTimeElement.textContent =
        timerElement.textContent;


    game.classList.add(
        "hidden"
    );

    gameOverScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   VOLTAR AO MENU
========================================= */

function returnToMenu() {

    clearInterval(
        timerInterval
    );


    game.classList.add(
        "hidden"
    );

    victory.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    menu.classList.remove(
        "hidden"
    );


    updateMessage();

}


/* =========================================
   BOTÕES DO JOGO
========================================= */

backButton.addEventListener(
    "click",
    returnToMenu
);


victoryMenuButton.addEventListener(
    "click",
    returnToMenu
);


gameOverMenuButton.addEventListener(
    "click",
    returnToMenu
);


playAgainButton.addEventListener(
    "click",
    () => {
        initializeAudio();
        startGame();
    }
);


retryButton.addEventListener(
    "click",
    () => {
        initializeAudio();
        startGame();
    }
);


loginForm.addEventListener(
   "submit",
   (event) => {
       event.preventDefault();

       const currentPlayerName =
           setPlayerName(
               playerNameInput.value || "Visitante"
           );

       loginScreen.classList.add("hidden");
       menu.classList.remove("hidden");

       if (selectedCategory && selectedDifficulty) {
           addScoreToGlobalRanking(
               currentPlayerName,
               bestScore,
               categoryNames[selectedCategory],
               selectedDifficulty
           );
       }

   }
);


guestButton.addEventListener(
   "click",
   () => {
       enterGame("Visitante");
   }
);

if (logoutButton) {
   logoutButton.addEventListener(
       "click",
       () => {
           logoutPlayer();
       }
   );
}


/* =========================================
   INICIALIZAÇÃO
========================================= */

startButton.disabled = true;

const savedPlayerName =
    getPlayerName();

if (playerNameLabel) {
    playerNameLabel.textContent =
        savedPlayerName;
}

if (playerNameInput) {
    playerNameInput.value =
        savedPlayerName === "Visitante"
            ? ""
            : savedPlayerName;
}

bestScore = getStoredBestScore();

updateBestScoreDisplay();
updateRankingDisplay();
updateGlobalRanking();

loginScreen.classList.remove("hidden");
menu.classList.add("hidden");

updateMessage();

updateScore();

updateLives();

updateCombo();

updateAttempts();

updateTimer();


if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {
            navigator.serviceWorker.register(
                "./service-worker.js"
            ).catch(
                (error) => {
                    console.error(
                        "Falha ao registrar o service worker:",
                        error
                    );
                }
            );
        }
    );

}

console.log(
    "🧠 Memória+ Academy iniciado com sucesso!"
);