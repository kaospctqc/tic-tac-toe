# tic tac toe

## Introduction

Welcome to my tic tac toe game. This is designed to be a mobile app first and a single page application.
We are using HTML5, CSS3 and JavaScript to create a fun to play game.

[Live website](https://kaospctqc.github.io/tic-tac-toe/).

![website preview](assets/images/tic-tac-toe-responsive.webp)

## Table of Contents

-   [1. UX](#ux)
-   [2. Features](#features)
-   [3. Technologies Used](#technologies-used)
-   [4. Testing](#testing)
-   [5. Deployment](#deployment)
-   [6. Credits](#credits)

<a name="ux"></a>
## 1. UX

This implementation of the tic tac toe game is meant to:
- allow users to play the game
- read instructions on how to play the game
- provide feedback using a form

There are some social media links provided in the footer to allow users to find information related to the author or this and other projects.

### 1.1 Wireframe

Before implementing any html, css or javascript, we used [Balsamiq](https://balsamiq.com/) to create wireframes that describe the initial design of the application. This step help a lot when implementing the html, css and javascript.

#### Home / Play page
![Home Mobile](assets/images/home-mobile.webp)
![Home Desktop](assets/images/home-desktop.webp)

#### Instructions page
![Instructions Mobile](assets/images/instructions-mobile.webp)
![Instructions Desktop](assets/images/instructions-desktop.webp)

### #Feedback page
![Feedback Mobile](assets/images/feedback-mobile.webp)
![Feedback Desktop](assets/images/feedback-desktop.webp)

### 1.2 Color Scheme

The color scheme influences the users state and the design choice was to try to achieve something calming, relaxing.
When searching for the color scheme, we used [coolors.co](https://coolors.co/ebede9-d2d4c8-b8bdb5-889696-5f7470) as a starting point.

![scheme](assets/images/tic-tac-toe-colorScheme.webp)

The next tool used was [webaim.org](https://webaim.org/resources/contrastchecker/) that helped achieve a good level of contrast while maintaining the overall scheme that we wanted to use.

![contrast](assets/images/tic-tac-toe-contrastChecker.webp)

<a name="features"></a>
## 2. Features

The app features 3 distinct areas: 
- the header that hosts the main title of the app and the main navigation menu
- the main section that will show one of the 3 pages depending of where the user navigated
    - the game (Play), 
    - how to play (Instructions), 
    - contact form (Feedback).
- the footer that has social media links

### the header
The name of the app is the largest text. 
The menu highlights the current location and also signals when mouse over to indicate that it is a active element and can be pressed.

![contrast](assets/images/tic-tac-toe-header.png)

### the game (Play)
All elements will reset once the Restart game button has been pressed or the user navigated to a different location or on page refresh.
The game section starts with showing the current score. 
The game board where the user may add marks during a round of the game.
The settings section where the user can select who should start the round (the user or the computer). 
Currently, the computer moves are random.
The Restart game button that allows the user to start over.

![contrast](assets/images/tic-tac-toe-theGame.png)

### instructions
A simple, unordered list of instructions meant to tell the user the basic rules of tic-tac-toe.

![contrast](assets/images/tic-tac-toe-instructions.png)

### contact form
A Name, Email and TextArea form that the user can use to send feedback to the maintainer of the app. Currently sending to [formdump](https://formdump.codeinstitute.net/)

![contrast](assets/images/tic-tac-toe-feedback.png)

### footer
Container for social media links that can be used by to user to find information about the author, other projects by the author, code institute.

![contrast](assets/images/tic-tac-toe-footer.png)

<a name="technologies-used"></a>
## 3. Technologies Used

<a name="testing"></a>
## 4. Testing

<a name="deployment"></a>
## 5. Deployment

<a name="credits"></a>
## 6. Credits
rules: https://www.exploratorium.edu/brain_explorer/tictactoe.html