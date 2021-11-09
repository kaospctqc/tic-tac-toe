// Let DOM finish before funning any JavaScript

/**
 * Main navigation for the Single Page App thingy
 */
document.addEventListener('DOMContentLoaded', function() {
    let menuItems = document.getElementsByClassName('menu-item');

    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', function() {
            let menuItems = document.getElementsByClassName('menu-item');
            for (menuItem of menuItems) {
                menuItem.classList.remove('live');
            }

            if (this.textContent === "Play") {
                displayPlay();
                this.classList.add('live');
            } else if (this.textContent === "Instructions") {
                displayInstructions();
                this.classList.add('live');
            } else if (this.textContent === "Feedback") {
                displayFeedback();
                this.classList.add('live');
            } else {
                alert('No ideea what that was');
            }
        });
    }

    displayPlay();
});

// Display functions used by main navigation

/**
 * Display game section
 */
 function displayPlay() {
    
    let scoreState;
    if (!scoreState) {
        scoreState = {
            player: 0, 
            computer: 0
        };
    } else {
        scoreState = getScoreState();
    }
    
    let gameState;
    if (!gameState) {
        gameState = [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ];
    }
    
    let settingsState;
    if (!settingsState) {
        settingsState = true;
    }
    
    let score = createScoreBoard(scoreState);
    let game = createGameBoard(gameState);
    let settings = createSettings(settingsState);
    
    document.getElementsByTagName('section')[0].innerHTML = `
        ${score}
        ${game}
        ${settings}
    `;

    startGame();
    document.getElementById('game-restart').addEventListener('click', displayPlay);
}

/**
 * Display instructions section
 */
function displayInstructions() {
    // document.getElementsByTagName('section')[0].innerHTML = '<p>Instructions</p>';
    document.getElementsByTagName('section')[0].innerHTML = `
    <div id='instructions'>
        <ul>
            <li><p>This game is played on a grid that's 3 squares by 3 squares.</p></li>
            <li><p>You are X, the computer is O. Players take turns putting their marks in empty squares.</p></li>
            <li><p>The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner.</p></li>
            <li><p>The game is over either when all 9 squares are full or when a winner has been found.</p></li>
        </ul>
    </div>
    `;
}

/**
 * Display feedback section
 */
function displayFeedback() {
    document.getElementsByTagName('section')[0].innerHTML = `
    <div id='feedback-section'>
        <form>
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br>
            <label for="feedback-input">Feedback:</label><br>
            <textarea name="feedback-input" rows="8" cols="25"></textarea><br>
            <input type="submit" value="Submit" id="submit-form">
        </form>
    </div>
    `;
}

// functions used to create html

/** 
 * Creates the score html
*/
function createScoreBoard(scoreState) {
    return  `
    <div id="score-board">
        <div id="player">
            <h2 id="player-label" class="label">Player</h2>
            <span id="player-score" class="score">${scoreState.player}</span>
        </div>
        <div id="computer">
            <h2 id="computer-label" class="label">Computer</h2>
            <span id="computer-score" class="score">${scoreState.computer}</span>
        </div>
    </div>
    `;
}

/** 
 * Creates the game html
*/
function createGameBoard(gameState) {
    let gameBoard = `
    <div id="game-board">
        <table>
            <tbody>
    `;
    for (var i = 0; i < 3; i++) {
        gameBoard += `           <tr>`;
        for (var j = 0; j < 3; j++) {
            gameBoard += `
                    <td location="${i}-${j}">${gameState[i][j].toUpperCase()}</td>`;
        }
        gameBoard += `
                </tr>
    `;
    }
    gameBoard += `
            </tbody>
        </table>
    </div>
    `;

    return gameBoard;
}

/** 
 * Creates the settings html
*/
function createSettings (settingsState) {
    let checked = settingsState ? 'checked': '';
    return `
    <div id="settings">
        <div id="turn-select">
            <div id="turn-label" class="label">Go first ?</div>
            <div id="turn-switch">
                <label for="toggle" class="switch">Go first
                    <input id="toggle" name="toggle" type="checkbox" ${checked}>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <button id="game-restart">Restart game</button>
    </div>
    `;
}

// functions used to grab the current state from the DOM

/**
 * Find the current score, return object
 */
function getScoreState() {
    let playerScore = 0;
    let computerScore = 0;

    if (document.getElementById('player-score')) {
        playerScore = parseInt(document.getElementById('player-score').textContent);
    }
    if (document.getElementById('computer-score')) {
        computerScore = parseInt(document.getElementById('computer-score').textContent);
    }

    return {
        player: playerScore, 
        computer: computerScore
    };
}

/**
 * Find the current game progress, return array of array
 */
function getGameState() {
    let gameState = [
        ['', '', ''], 
        ['', '', ''], 
        ['', '', '']
    ];
    
    if (document.getElementById('game-board')) {
        let rows = document.getElementsByTagName('tr');

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameState[i][j] = rows[i].children[j].textContent;
            }
        }
    }

    return gameState;
}

/**
 * Find the current settings, return boolean
 */
function getSettingsState() {
    let settingsState = true;

    if (document.getElementById('turn-switch')) {
        if (!(document.getElementById('turn-switch').children[0].children[0].attributes.checked)) {
            settingsState = false;
        } 
    }

    return settingsState;
}

/**
 * Function to mark starting a new round 
 * in the same game
 */
function startGame() {
    let settingsState = getSettingsState();

    let startPlayer = '';
    if (settingsState) {
        startPlayer = 'human';
    } else {
        startPlayer = 'computer';
    }

    decideTurn(startPlayer);
}

/**
 * Find all the cells that are currently 
 * not occupied and available
 */
function getAvailableMoves() {
    let cells = document.getElementsByTagName('td');
    let moves = [];
    for (let cell of cells) {
        if (cell.attributes.location) {
            moves.push(cell.attributes.location.value);
        }
    }
    return moves;
}

/**
 * Decide wether to run the human turn 
 * or the computer turn
 */
function decideTurn(startPlayer = '', lastPlayer = '') {
    let player = '';

    if (startPlayer) {
        player = (startPlayer === 'human') ? 'human':'computer';
    } else {
        // console.log('No start player');
    }

    if (lastPlayer) {
        player = (lastPlayer === 'human') ? 'computer':'human';
    } else {
        // console.log('No last player');
    }

    if (player === 'human') {
        humanTurn();
    } else if (player === 'computer') {
        computerTurn();
    } else {
        console.log('undefined player');
    }
}

/**
 * Run the human turn and grab the
 * players click
 */
function humanTurn() {
    let cells = document.getElementsByTagName('td');

    for (let cell of cells) {
        if (cell.attributes.location) {
            cell.addEventListener('click', playerMove);
        } else {
            console.log('not listening on: ', cell.parentElement.rowIndex, '-', cell.cellIndex);
        }
    }
}

/**
 * Add the players mark to the board and
 * remove the location from the available
 * locations list
 */
function playerMove() {
    let cells = document.getElementsByTagName('td');

    for (let cell of cells) {
        cell.removeEventListener('click', playerMove);
    }
    let settingsState = getSettingsState();

    this.textContent = settingsState ? "X":"O";
    this.removeAttribute('location');

    endTurn('human');
}

/**
 * Add the computers mark to the board and
 * remove the location from the available
 * locations list
 */
function computerTurn() {
    let availableMoves = getAvailableMoves();

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    let m = randomMove.charAt(0);
    let n = randomMove.charAt(2);
    // let n = randomMove.charAt(randomMove.length - 1);

    let currentGameState = getGameState();
    let currentSettingsState = getSettingsState();
    if (currentGameState) {
        let rows = document.getElementsByTagName('tr');
        rows[m].children[n].textContent = currentSettingsState ? "O":"X";
        rows[m].children[n].removeAttribute('location');
    }

    endTurn('computer');
}

/**
 * Mark the end of the turn and run checks
 * to see if anyone won, if not, run the
 * next turn
 * @param {string} player - contains either 'human' or 'computer'
 */
function endTurn(player) {
    let availableMoves = getAvailableMoves();
    console.log(availableMoves);

    let currentState = getGameState();
    let winner = checkWinner(currentState);
    let nextPlayer = (player === "human") ? "computer" : "human";

    if (winner) {
        doWin(player);
    } else if (!availableMoves.length) {
        showSplashScreen("You've reached a draw!!");
        resetGameBoard();
        startGame();
    } else {
        if (nextPlayer === "human") {
            humanTurn();
        } else if (nextPlayer === "computer") {
            computerTurn();
        }
    }
}

/**
 * Verify if anyone won at the end of last turn
 * @param {*} currentState game board at the end of last turn
 * @returns used for truthy or falsey
 */
function checkWinner(currentState) {
    if (
        currentState[0][0] === currentState[1][1] && 
        currentState[1][1] === currentState[2][2] &&
        currentState[1][1] !== '') {
        return 'winner';
    } else if (
        currentState[2][0] === currentState[1][1] && 
        currentState[1][1] === currentState[0][2] &&
        currentState[1][1] !== '') {
        return 'winner';
    }

    for (let i = 0; i < 3; i++) {
        if (
            currentState[0][i] === currentState[1][i] && 
            currentState[0][i] === currentState[2][i] &&
            currentState[0][i] !== '') {
            return 'winner';
        } else if (
            currentState[i][0] === currentState[i][1] && 
            currentState[i][0] === currentState[i][2] &&
            currentState[i][0] !== '') {
            return 'winner';
        }
    }

    return '';
}

/**
 * Assign win to player or computer and reset the game
 * board while keeping score to allow for a new round
 * to begin and start new round
 * @param {*} player 
 */
function doWin(player) {
    console.log(player, 'won !!');
    if (player === 'human') {
        let message = 'Congratulations, you have won!!!';
        showSplashScreen(message);
        document.getElementById('player-score').textContent++;
        
    } else if (player === 'computer') {
        let message = 'Try again, you have lost.';
        showSplashScreen(message);
        document.getElementById('computer-score').textContent++;
    }

    resetGameBoard();
    startGame();
}

/**
 * Empty game board cells and add the missing 
 * location attribute to those cells
 */
function resetGameBoard() {
    let cells = document.getElementsByTagName('td');
    for (let cell of cells) {
        if (!cell.attributes.location) {
            let m = cell.parentElement.rowIndex;
            let n = cell.cellIndex;
            let name = 'location';
            let value = `${m}-${n}`;
            cell.setAttribute(name, value);
            cell.textContent = '';
        }                
    }
}

/**
 * Show slpash screen
 */
function showSplashScreen(message) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    // let window = document.getElementsByClassName("close")[0];
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    let messageElement = document.getElementById('modal-message');
    messageElement.textContent = message;
}
