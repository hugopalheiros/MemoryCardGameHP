const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function showWinPanel() {
    const winPanel = document.createElement('div');
    winPanel.classList.add('win-panel');
    winPanel.textContent = 'YOU WIN! ';

    //botao de RESET:
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
     restartButton.style.fontSize = '20px'; // Increase button font size
    restartButton.style.padding = '10px 20px'; // Increase button size
    restartButton.style.fontFamily = 'Arial, sans-serif'; // Change button font
    restartButton.addEventListener('click', restartGame);

    winPanel.appendChild(restartButton);

    document.body.appendChild(winPanel);    
}

function restartGame() {
    
    location.reload();


    /*const winPanel = document.querySelector('win-panel');
    if (winPanel) {
        winPanel.remove();
    }

    resetBoard();
    //shuffleCards();// ToDo: verificar se o shuffleCards() está a fazer check automaticamente, logo nao 
    //sendo necessario invocar aqui de novo.*/
}



function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second click    
    secondCard = this;

    checkMatch();
    checkAllCardsRevealed();
}

function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();


function checkAllCardsRevealed() {
    const allCards = document.querySelectorAll('.memory-card');
    let allRevealed = true;

    allCards.forEach(card => {
        if (!card.classList.contains('flip')) {
            allRevealed = false;
            return;
        }
    });

    if (allRevealed) {
        console.log("All cards revealed - win");

        showWinPanel();
        //resetGame();
        //ToDo: linkar a pagina de html Highscores
    }
}

//ToDo: function para counter turnos
//ToDo: function para counter pares
//ToDo: win condition (e painel)

cards.forEach(card => card.addEventListener('click', flipCard));

checkAllCardsRevealed();    //ToDo: ver se é necessario estar aqui ou apenas em cada flip (?)