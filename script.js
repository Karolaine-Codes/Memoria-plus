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

let lives = 3;

let combo = 0;

let bestCombo = 0;

let attempts = 0;

let seconds = 0;

let timerInterval = null;


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


            updateMessage();

        }
    );

});


/* =========================================
   MENSAGEM
========================================= */

function updateMessage() {

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


/* =========================================
   INICIAR
========================================= */

startButton.addEventListener(
    "click",
    startGame
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

    lives = 3;

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


    updateScore();

    updateCombo();


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

    updateCombo();


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

    let hearts = "";


    for (
        let i = 0;
        i < 3;
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
    startGame
);


retryButton.addEventListener(
    "click",
    startGame
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

startButton.disabled = true;

updateMessage();

updateScore();

updateLives();

updateCombo();

updateAttempts();

updateTimer();


console.log(
    "🧠 Memória+ iniciado com sucesso!"
);