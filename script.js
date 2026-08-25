// ==========================================
// MEMÓRIA+
// JOGO DA MEMÓRIA
// ==========================================


// ==========================================
// DADOS DAS CARTAS
// ==========================================

const cardsData = {

    animals: [
        "🐶",
        "🐱",
        "🦁",
        "🐯",
        "🐸",
        "🐵",
        "🐼",
        "🐨",
        "🦊",
        "🐰",
        "🐷",
        "🐮",
        "🐔",
        "🐧",
        "🐙",
        "🦋"
    ],

    math: [
        "➕",
        "➖",
        "✖️",
        "➗",
        "🔢",
        "💯",
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣",
        "🔟"
    ],

    geography: [
        "🌎",
        "🌍",
        "🌏",
        "🏔️",
        "🏝️",
        "🏜️",
        "🌋",
        "🗺️",
        "🏖️",
        "🌊",
        "🏕️",
        "🗿",
        "🗽",
        "🗼",
        "🏰",
        "⛺"
    ],

    science: [
        "🔬",
        "🧬",
        "🧪",
        "⚗️",
        "🔭",
        "🧫",
        "🦠",
        "🌱",
        "🌳",
        "☀️",
        "🌙",
        "⚡",
        "💧",
        "🔥",
        "🪐",
        "🧠"
    ]

};


// ==========================================
// DIFICULDADES
// ==========================================

const difficulties = {

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


// ==========================================
// ELEMENTOS
// ==========================================

const menu =
    document.querySelector("#menu");

const game =
    document.querySelector("#game");

const victory =
    document.querySelector("#victory");

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

const message =
    document.querySelector("#message");

const scoreElement =
    document.querySelector("#score");

const attemptsElement =
    document.querySelector("#attempts");

const timerElement =
    document.querySelector("#timer");

const finalScore =
    document.querySelector("#final-score");

const finalAttempts =
    document.querySelector("#final-attempts");

const finalTime =
    document.querySelector("#final-time");

const categoryName =
    document.querySelector("#category-name");


// ==========================================
// ESTADO DO JOGO
// ==========================================

let selectedCategory = null;

let selectedDifficulty = null;

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let score = 0;

let attempts = 0;

let matchedPairs = 0;

let seconds = 0;

let timerInterval = null;


// ==========================================
// SELECIONAR CATEGORIA
// ==========================================

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                selectedCategory =
                    button.dataset.category;


                updateMessage();

            }

        );

    });


// ==========================================
// SELECIONAR DIFICULDADE
// ==========================================

document
    .querySelectorAll(".difficulty-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".difficulty-button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                selectedDifficulty =
                    button.dataset.difficulty;


                updateMessage();

            }

        );

    });


// ==========================================
// ATUALIZAR MENSAGEM
// ==========================================

function updateMessage() {

    if (
        selectedCategory &&
        selectedDifficulty
    ) {

        message.textContent =
            "✅ Tudo pronto! Clique em começar.";

        message.style.color =
            "#16a34a";

    } else {

        message.textContent =
            "Escolha uma categoria e uma dificuldade.";

        message.style.color =
            "#6b7280";

    }

}


// ==========================================
// COMEÇAR
// ==========================================

startButton.addEventListener(
    "click",
    startGame
);


// ==========================================
// INICIAR JOGO
// ==========================================

function startGame() {

    if (
        !selectedCategory ||
        !selectedDifficulty
    ) {

        alert(
            "⚠️ Escolha uma categoria e uma dificuldade."
        );

        return;

    }


    resetGame();


    menu.classList.add(
        "hidden"
    );


    victory.classList.add(
        "hidden"
    );


    game.classList.remove(
        "hidden"
    );


    categoryName.textContent =
        getCategoryName();


    createBoard();


    startTimer();

}


// ==========================================
// NOME DA CATEGORIA
// ==========================================

function getCategoryName() {

    const names = {

        animals:
            "🐶 Animais",

        math:
            "➕ Matemática",

        geography:
            "🌎 Geografia",

        science:
            "🔬 Ciências"

    };


    return names[
        selectedCategory
    ];

}


// ==========================================
// RESETAR JOGO
// ==========================================

function resetGame() {

    clearInterval(
        timerInterval
    );


    firstCard = null;

    secondCard = null;

    lockBoard = false;

    score = 0;

    attempts = 0;

    matchedPairs = 0;

    seconds = 0;


    updateScore();


    updateTimer();

}


// ==========================================
// CRIAR TABULEIRO
// ==========================================

function createBoard() {

    gameBoard.innerHTML = "";


    const pairCount =
        difficulties[
            selectedDifficulty
        ].pairs;


    const selectedCards =
        cardsData[
            selectedCategory
        ].slice(
            0,
            pairCount
        );


    const cards = [
        ...selectedCards,
        ...selectedCards
    ];


    shuffle(cards);


    cards.forEach(
        value => {

            const card =
                document.createElement(
                    "button"
                );


            card.classList.add(
                "card"
            );


            card.innerHTML = `

                <div class="card-inner">

                    <div class="card-front">
                        ?
                    </div>

                    <div class="card-back">
                        ${value}
                    </div>

                </div>

            `;


            card.dataset.value =
                value;


            card.addEventListener(
                "click",
                () => flipCard(card)
            );


            gameBoard.appendChild(
                card
            );

        }
    );

}


// ==========================================
// EMBARALHAR
// ==========================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[randomIndex]
        ] = [
            array[randomIndex],
            array[i]
        ];

    }

}


// ==========================================
// VIRAR CARTA
// ==========================================

function flipCard(card) {

    if (lockBoard) {
        return;
    }


    if (
        card === firstCard
    ) {
        return;
    }


    if (
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


    updateScore();


    checkMatch();

}


// ==========================================
// VERIFICAR PAR
// ==========================================

function checkMatch() {

    const isMatch =
        firstCard.dataset.value ===
        secondCard.dataset.value;


    if (isMatch) {

        correctMatch();

    } else {

        incorrectMatch();

    }

}


// ==========================================
// ACERTO
// ==========================================

function correctMatch() {

    firstCard.classList.add(
        "matched"
    );

    secondCard.classList.add(
        "matched"
    );


    matchedPairs++;


    score += 100;


    updateScore();


    resetSelection();


    checkVictory();

}


// ==========================================
// ERRO
// ==========================================

function incorrectMatch() {

    lockBoard = true;


    setTimeout(
        () => {

            firstCard.classList.remove(
                "flipped"
            );

            secondCard.classList.remove(
                "flipped"
            );


            resetSelection();

        },
        800
    );

}


// ==========================================
// RESETAR CARTAS
// ==========================================

function resetSelection() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


// ==========================================
// VERIFICAR VITÓRIA
// ==========================================

function checkVictory() {

    const totalPairs =
        difficulties[
            selectedDifficulty
        ].pairs;


    if (
        matchedPairs !==
        totalPairs
    ) {

        return;

    }


    clearInterval(
        timerInterval
    );


    setTimeout(
        showVictory,
        500
    );

}


// ==========================================
// MOSTRAR VITÓRIA
// ==========================================

function showVictory() {

    game.classList.add(
        "hidden"
    );


    victory.classList.remove(
        "hidden"
    );


    finalScore.textContent =
        score;


    finalAttempts.textContent =
        attempts;


    finalTime.textContent =
        formatTime(seconds);

}


// ==========================================
// CRONÔMETRO
// ==========================================

function startTimer() {

    timerInterval =
        setInterval(
            () => {

                seconds++;

                updateTimer();

            },
            1000
        );

}


// ==========================================
// ATUALIZAR TEMPO
// ==========================================

function updateTimer() {

    timerElement.textContent =
        formatTime(seconds);

}


// ==========================================
// FORMATAR TEMPO
// ==========================================

function formatTime(totalSeconds) {

    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const remainingSeconds =
        totalSeconds % 60;


    return (
        String(minutes).padStart(
            2,
            "0"
        )
        +
        ":"
        +
        String(remainingSeconds).padStart(
            2,
            "0"
        )
    );

}


// ==========================================
// ATUALIZAR PLACAR
// ==========================================

function updateScore() {

    scoreElement.textContent =
        score;


    attemptsElement.textContent =
        attempts;

}


// ==========================================
// VOLTAR AO MENU
// ==========================================

backButton.addEventListener(
    "click",
    () => {

        clearInterval(
            timerInterval
        );


        game.classList.add(
            "hidden"
        );


        menu.classList.remove(
            "hidden"
        );

    }
);


// ==========================================
// JOGAR NOVAMENTE
// ==========================================

playAgainButton.addEventListener(
    "click",
    () => {

        startGame();

    }
);


// ==========================================
// MENU DA VITÓRIA
// ==========================================

victoryMenuButton.addEventListener(
    "click",
    () => {

        victory.classList.add(
            "hidden"
        );


        menu.classList.remove(
            "hidden"
        );

    }
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

console.log(
    "🧠 Memória+ iniciado com sucesso!"
);