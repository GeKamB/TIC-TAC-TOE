const createGameboard = (() => {
    const gameBoard = document.querySelector('.gameboard');
    const board = [];
    const rows = 3;
    const columns = 3;
    const cell = 0;
   
    for (let i = 0; i < rows; i++) {                    //rows
        board[i] = [];
        for (let j = 0; j < columns; j++) {             //columns
          board[i].push(cell);
        }
      }
      
    

    return {
        gameBoard,
        board

    }

})();

const playerFactory = (name, marker) => {
    return {name, marker};
};

const gameController = (() => {    
    let activePlayer = 'O';
    let isGameOver = false;
    let board = createGameboard.board;

    const player1 = playerFactory('Player 1', 'O');
    const player2 = playerFactory('Player 2', 'X');

    const winCombinations = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6],
    ];

const populateGamebooard = () => {

    createGameboard.board.forEach((row, i) => {
        row.forEach((_cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('square');
            cellElement.setAttribute('data-row', i);
            cellElement.setAttribute('data-elem', index);
            cellElement.addEventListener('click', addMarker);

            createGameboard.gameBoard.append(cellElement);

        });
    });
}
populateGamebooard();
function addMarker(e) {
    if (isGameOver) return;

    const markerDisplay = document.createElement('div');
    markerDisplay.classList.add(activePlayer);
    createGameboard.board[e.target.getAttribute('data-row')][e.target.getAttribute('data-elem')] = activePlayer;    //add marker to array
    activePlayer = activePlayer === player1.marker ? player2.marker : player1.marker;
    e.target.append(markerDisplay);

    e.target.removeEventListener('click', addMarker);

    checkWinner();
};

function checkWinner() {
    const checkPlayer = (player) => winCombinations.some(combination => combination.every(index => createGameboard.board.flat()[index] === player.marker));
    
    if (checkPlayer(player1)) {
        isGameOver = true;
        showWinner(player1);
    } else if (checkPlayer(player2)) {
        isGameOver = true;
        showWinner(player2);
    } else if (!createGameboard.board.flat().includes(0)) {
        // No more moves and no winner, it's a draw
        isGameOver = true;
        showWinner(null);
    }
}

function showWinner(player) {
    const winnerDisplay = document.createElement('div');

    winnerDisplay.classList.add('winner');

    if (player) {
        winnerDisplay.textContent = `${player.name} wins!`;
    } else {
        winnerDisplay.textContent = "It's a draw!";
    }

    createGameboard.gameBoard.append(winnerDisplay);

    // Add a reset button after a delay
    setTimeout(() => {
        const resetButton = document.createElement('button');
        resetButton.classList.add('resetButton')
        resetButton.textContent = 'New Game';
        resetButton.addEventListener('click', resetGame);
        createGameboard.gameBoard.append(resetButton);
    }, 1000);
}

function resetGame() {
    isGameOver = false;
    activePlayer = 'O';
    createGameboard.board = createGameboard.board.map(row => row.map(() => 0));
    createGameboard.gameBoard.innerHTML = '';
    console.log(createGameboard.board);
    populateGamebooard();
   
    
    
}

    
    
        
        
    
        

    
    


})();




