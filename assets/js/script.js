// Let DOM finish before funning any JavaScript

/**
 * Main navigation for the Single Page App thingy
 */
document.addEventListener('DOMContentLoaded', function() {
    let menuItems = document.getElementsByClassName('menu-item');

    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', function() {
            if (this.textContent === "Play") {
                displayPlay();
            } else if (this.textContent === "Instructions") {
                displayInstructions();
            } else if (this.textContent === "Feedback") {
                displayFeedback();
            } else {
                alert('No ideea what that was');
            }
        })
    }

    displayPlay();
});

// Display functions used by main navigation

/**
 * Display game section
 */
 function displayPlay() {
    
    if (!scoreState) {
        var scoreState = {
            player: 0, 
            computer: 0
        };
    };
    
    if (!gameState) {
        var gameState = [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ];
    };
    
    if (!settingsState) {
        var settingsState = true;
    };
    
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
    document.getElementsByTagName('section')[0].innerHTML = '<p>Instructions</p>';
}

/**
 * Display feedback section
 */
function displayFeedback() {
    document.getElementsByTagName('section')[0].innerHTML = '<p>Feedback</p>';
}

// functions used to create html

/** 
 * Creates the score html
*/
function createScoreBoard(scoreState) {
    return  `
    <div id="score-board">
        <div id="player">
            <div id="player-label" class="label">Player</div>
            <span id="player-score" class="score">${scoreState.player}</span>
        </div>
        <div id="computer">
            <div id="computer-label" class="label">Computer</div>
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
                <label class="switch">
                    <input type="checkbox" ${checked}>
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
 * Game logic
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
        rows[m].children[n].textContent = currentSettingsState ? "O":"X";;
        rows[m].children[n].removeAttribute('location');
    }

    endTurn('computer');
}

function endTurn(player) {
    let availableMoves = getAvailableMoves()
    console.log(availableMoves);

    let currentState = getGameState();
    let winner = checkWinner(currentState);
    let nextPlayer = (player === "human") ? "computer" : "human";

    if (winner) {
        doWin(player);
    } else {
        if (nextPlayer === "human") {
            humanTurn();
        } else if (nextPlayer === "computer") {
            computerTurn();
        }
    }
}

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

function doWin(player) {
    console.log(player, 'won !!');
    alert('Congratulations ' + player + ' you have won!!!');
}