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
[Go to the top](#table-of-contents)

This implementation of the tic tac toe game is meant to:
- allow users to play the game
- read instructions on how to play the game
- provide feedback using a form

There are some social media links provided in the footer to allow users to find information related to the author or this and other projects.

### 1.1 Wireframe

Before implementing any html, css or javascript, we used [Balsamiq](https://balsamiq.com/) to create wireframes that describe the initial design of the application. This step helped a lot when implementing the html, css and javascript.

#### Home / Play page
Note: The "Go first" section has been moved to future feature.
![Home Mobile](assets/images/home-mobile.webp)
![Home Desktop](assets/images/home-desktop.webp)

#### Instructions page
![Instructions Mobile](assets/images/instructions-mobile.webp)
![Instructions Desktop](assets/images/instructions-desktop.webp)

### Feedback page
![Feedback Mobile](assets/images/feedback-mobile.webp)
![Feedback Desktop](assets/images/feedback-desktop.webp)

### 1.2 Color Scheme

The color scheme influences the users state and the design choice was to try to achieve something calming, relaxing.
When searching for the color scheme, we used [coolors.co](https://coolors.co/ebede9-d2d4c8-b8bdb5-889696-5f7470) as a starting point.

![scheme](assets/images/tic-tac-toe-color-scheme.webp)

The next tool used was [webaim.org](https://webaim.org/resources/contrastchecker/) that helped achieve a good level of contrast while maintaining the overall scheme that we wanted to use.

![contrast](assets/images/tic-tac-toe-contrast-checker.webp)

<a name="features"></a>
## 2. Features
[Go to the top](#table-of-contents)

The app features 3 distinct areas: 
- the header that hosts the main title of the app and the main navigation menu
- the main section that will show one of the 3 pages depending on where the user navigated
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
~~The settings section where the user can select who should start the round (the user or the computer).~~ The Go first setting has been moved to future feature.
Currently, the computer moves are random.
The Restart game button that allows the user to start over.

![contrast](assets/images/tic-tac-toe-the-game.png)

### instructions
A simple, unordered list of instructions meant to tell the user the basic rules of tic-tac-toe.

![contrast](assets/images/tic-tac-toe-instructions.png)

### contact form
A Name, Email and TextArea form that the user can use to send feedback to the maintainer of the app. Currently sending to [formdump](https://formdump.codeinstitute.net/)

![contrast](assets/images/tic-tac-toe-feedback.png)

### footer
Container for social media links that can be used by to user to find information about the author, other projects by the author, code institute. This also highlights when the user hovers over the link to indicate that it is a clickable element.

![contrast](assets/images/tic-tac-toe-footer.png)

### Future Features
- Add the Go first setting to allow the user to select which player moves at the beginning of the game
- Add better logic for the computer moves to increase the level of difficulty, a good example can be found [here](https://codepen.io/Bosa100/pen/XRZppv)
- Add background elements to improve the way it looks on bigger screen sizes.

<a name="technologies-used"></a>
## 3. Technologies Used
[Go to the top](#table-of-contents)

- [Balsamiq](https://balsamiq.com/) wireframes software
- [coolors.co](https://coolors.co/) color schemas generator
- [webaim.org](https://webaim.org/resources/contrastchecker/) contrast checker
- [HTML5](https://en.wikipedia.org/wiki/HTML5) structure and some content for the app
- [CSS3](https://en.wikipedia.org/wiki/CSS) style and some behaviour
- [amIResponsive](http://ami.responsivedesign.is/) generate screenshots for various screen sizes
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) dynamic content behaviour
- [Google Fonts](https://fonts.google.com/) originally selected Roboto Mono and Zen Kurenaido but only the second one was used.
- [Firefox browser](https://www.mozilla.org/) used to preview, inspect and test 
- [Github](https://github.com/) code repository and versioning
- [Gitpod](https://www.gitpod.io/) developer environment
- [W3C HTML Validation](https://validator.w3.org/) check HTML code
- [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) check CSS code
- [JavaScript validation](https://jshint.com/) check JavaScript code
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

<a name="testing"></a>
## 4. Testing
[Go to the top](#table-of-contents)

### 4.1 Manual testing

Have tested using 
- Firefox web browser Responsive Design Mode and used the following presets:
    - Iphone 5/SE iOS 10.3.1 Resolution: 320 x 568
    - iPad Resolution: 810 x 1080
- Mobile phone Samsung Galaxy Note 10 

Testing focused on:
- consistent positioning of all the elements throughout the different resolutions
- menu functionality across different devices
- menu look and feel across different devices
- overall readability of text sections and the smaller elements
- any other potential bugs

### 4.2 Testing using validation tools

The results contained no errors but did contain a few warnings that were investigated and deemed non issues. The warning complains about not having h2-h6 elements in the section but these are not necessary because this is the game area.
- HTML Validation:
![contrast](assets/images/tic-tac-toe-html-checker.png)

- CSS Validation:
![contrast](assets/images/tic-tac-toe-css-checker.png)
![contrast](assets/images/tic-tac-toe-css-checker-warnings.png)

- JavaScript Validation:
![contrast](assets/images/tic-tac-toe-javascript-checker.png)

- Lighthouse plugin:
![contrast](assets/images/tic-tac-toe-lighthouse.png)

<a name="deployment"></a>
## 5. Deployment
[Go to the top](#table-of-contents)

The website was deployed using [GitHub](https://github.com/).
- Login to GitHub
- Navigate to your repository containing the website you wish to publish.
- Click on "Settings" from the horizontal menu
- Select "Pages" from the vertical menu
- Select the desired branch (usually "master" or "main")
- After clicking "Save" you should see a refresh and the link for accessing the website is now available.

<a name="credits"></a>
## 6. Credits
[Go to the top](#table-of-contents)

There are no images used in the application. Design was created by me.
Elements that were used from other sources were:
- rules: https://www.exploratorium.edu/brain_explorer/tictactoe.html
- modal: https://www.w3schools.com/howto/howto_css_modals.asp