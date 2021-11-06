// Let DOM finish before funning any JavaScript

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

/**
 * Main navigation for the Single Page App thingy
 */
 function displayPlay() {

    let gameState = [
        ['x', 'o', 'o'],
        ['o', 'x', 'o'],
        ['o', 'o', 'x'],
    ];
    
    let score = createScoreBoard();
    let game = createGameBoard(gameState);
    let settings = createSettings();

    document.getElementsByTagName('section')[0].innerHTML = `
        ${score}
        ${game}
        ${settings}
    `;

    console.log(createGameBoard(gameState));
};

function displayInstructions() {
    document.getElementsByTagName('section')[0].innerHTML = '<p>Instructions</p>';
};

function displayFeedback() {
    document.getElementsByTagName('section')[0].innerHTML = '<p>Feedback</p>';
};

function createScoreBoard() {
    return  `
    <div id="score-board">
        <div id="player">
            <div id="player-label" class="label">Player</div>
            <span id="player-score" class="score">0</span>
        </div>
        <div id="computer">
            <div id="computer-label" class="label">Computer</div>
            <span id="computer-score" class="score">0</span>
        </div>
    </div>
    `;
}

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
};

function createSettings () {
    return `
    <div id="settings">
        <div id="turn-select">
            <div id="turn-label" class="label">Go first ?</div>
            <div id="turn-switch">
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <button id="game-restart">Restart game</button>
    </div>
    `;
};

function getScoreState() {

};

function getGameState() {
    let 
};

function getSettingsState() {

};