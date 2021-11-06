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

    // displayPlay();
});

// Display functions used by main navigation

/**
 * Display game section
 */
 function displayPlay() {

    let scoreState = getScoreState();
   
    let gameState = getGameState();

    let settingsState = getSettingsState();

    let score = createScoreBoard(scoreState);
    let game = createGameBoard(gameState);
    let settings = createSettings(settingsState);

    document.getElementsByTagName('section')[0].innerHTML = `
        ${score}
        ${game}
        ${settings}
    `;

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