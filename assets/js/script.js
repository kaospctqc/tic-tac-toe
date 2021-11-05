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
    document.getElementsByTagName('section')[0].innerHTML = '<p>Play</p>';
};

function displayInstructions() {
    document.getElementsByTagName('section')[0].innerHTML = '<p>Instructions</p>';
};

function displayFeedback() {
    document.getElementsByTagName('section')[0].innerHTML = '<p>Feedback</p>';
};