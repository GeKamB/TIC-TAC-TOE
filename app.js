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
    const winnerDisplay = document.querySelector('.info'); 
    let activePlayer = 'O';
    let isGameOver = false;
    

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

    createGameboard.gameBoard.innerHTML = ''; // Clear the previous board
    createGameboard.board.forEach((row, i) => {
        row.forEach((_cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('square');
            cellElement.setAttribute('data-row', i);
            cellElement.setAttribute('data-elem', index);
            winnerDisplay.textContent = `it's ${activePlayer} move`;
            cellElement.addEventListener('click', addMarker);

            createGameboard.gameBoard.append(cellElement);
        });
    });
}
populateGamebooard();
startGame();
function addMarker(e) {
    if (isGameOver) return;

    const markerDisplay = document.createElement('div');
    markerDisplay.classList.add(activePlayer);
    createGameboard.board[e.target.getAttribute('data-row')][e.target.getAttribute('data-elem')] = activePlayer;
    activePlayer = activePlayer === player1.marker ? player2.marker : player1.marker;
    e.target.append(markerDisplay);

    e.target.removeEventListener('click', addMarker);
    showPlayer(activePlayer);
    checkWinner();

    // After the player makes a move, let the AI make its move
    if (!isGameOver && activePlayer === player2.marker) {
        setTimeout(makeAIMove, 500); // Adjust the delay as needed (500ms in this example)
    }
};
function makeAIMove() {
    const emptyCells = createGameboard.board.flat().map((cell, index) => {
        return cell === 0 ? index : -1;
    }).filter(index => index !== -1);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiMoveIndex = emptyCells[randomIndex];

    const aiMoveRow = Math.floor(aiMoveIndex / 3);
    const aiMoveColumn = aiMoveIndex % 3;

    const aiMoveElement = document.querySelector(`[data-row="${aiMoveRow}"][data-elem="${aiMoveColumn}"]`);
    addMarker({ target: aiMoveElement });
}

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

function showPlayer(marker) {
    if (marker === player1.marker) {
       winnerDisplay.textContent = `It's ${player1.name} move`;
      
       
       
    } else {
        winnerDisplay.textContent = `It's ${player2.name} move`;
        
        
    }
}

function showWinner(player) {
   

    winnerDisplay.classList.add('winner');

    if (player) {
        winnerDisplay.textContent = `${player.name} wins!`;
    } else {
        winnerDisplay.textContent = "It's a draw!";
    }

    

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
    createGameboard.board = createGameboard.board.map(row => row.map(() => 0));
    createGameboard.gameBoard.innerHTML = '';
    
    populateGamebooard();
    winnerDisplay.classList.remove('winner');
    winnerDisplay.textContent = `It's ${player1.name} move`
    activePlayer = player1.marker;
    
   
    
    
}

function startGame() {
    const startScreen = document.querySelector('.startScreen');
    const markerButtons = document.querySelectorAll('.chooseMarker');
    let board = document.querySelector('.container');
    markerButtons.forEach(button => {
       button.addEventListener('click', (e) => {
        activePlayer = e.target.getAttribute('value');
        board.style.display = 'flex';
        startScreen.style.display = 'none';
        player1.name = prompt('What is your name ?');
        player1.marker = activePlayer;
        let myFunc = () => {
            if (player1.marker === 'O') {
                return 'X'
            } else {
                return 'O'
            }
        }
        player2.marker = myFunc();
        
        
        
        winnerDisplay.textContent = `${player1.name} start the game`;
        

       }) 
    })

};

    
    
        
        
    
        

    
    


})();




