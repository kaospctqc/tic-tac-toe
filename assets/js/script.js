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

    let scoreState = getScoreState();
   
    let gameState = getGameState();

    let settingsState = getSettingsState();
    // let settingsState = false;

    let score = createScoreBoard(scoreState);
    let game = createGameBoard(gameState);
    let settings = createSettings(settingsState);

    document.getElementsByTagName('section')[0].innerHTML = `
        ${score}
        ${game}
        ${settings}
    `;

    runGame(settingsState);
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
                    <td>${gameState[i][j].toUpperCase()}</td>`;
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
    }
}

/**
 * Find the current game progress, return array of array
 */
function getGameState() {
    let gameState = [['', '', ''], ['', '', ''], ['', '', '']];
    
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
function runGame(settingsState) {

    let rows = document.getElementsByTagName('tr');
    let currentCells = [
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
    ];
    let stepCount = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            rows[i].children[j].addEventListener('click', function() {
                let m = Math.floor(Math.random() * 3);
                let n = Math.floor(Math.random() * 3);

                if (currentCells[i][j] === "empty") {
                    
                    rows[i].children[j].textContent = settingsState ? "X":"O"; 
                    currentCells[i][j] = settingsState ? "X":"O";
                    if (checkWinner(currentCells) === "X" || checkWinner(currentCells) === "O") {
                        console.log(checkWinner(currentCells));
                    }

                    while (currentCells[m][n] !== "empty" && stepCount < 4) {
                        m = Math.floor(Math.random() * 3);
                        n = Math.floor(Math.random() * 3);
                    }

                    if (currentCells[m][n] === "empty") {
                        rows[m].children[n].textContent = settingsState ? "O":"X"; 
                        currentCells[m][n] = settingsState ? "O":"X";
                        if (checkWinner(currentCells) === "X" || checkWinner(currentCells) === "O") {
                            console.log(checkWinner(currentCells));
                        }
                    }

                    stepCount++;
                }
            });
        }
    }
}

function checkWinner (currentCells) {
    let winnerDiagOne = (currentCells[0][0] === currentCells[1][1] && currentCells[0][0] === currentCells[2][2]);
    if (winnerDiagOne) {
        return currentCells[0][0];
    }

    let winnerDiagTwo = (currentCells[0][2] === currentCells[1][1] && currentCells[0][0] === currentCells[2][1]);
    if (winnerDiagTwo) {
        return currentCells[0][2];
    }

    for (let i = 0; i < 3; i++) {
        let winnerLine = (currentCells[0][i] === currentCells[1][i] && currentCells[0][i] === currentCells[2][i]);
        let winnerRow = (currentCells[i][0] === currentCells[i][1] && currentCells[i][0] === currentCells[i][2]);
        if (winnerLine) {
            return currentCells[0][i];
        } else if (winnerRow) {
            return currentCells[i][0];
        }
    }
}