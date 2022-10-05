/* Author: Kaylene-Nhu Nguyen, 000861159 
Javascript functions for Assignment 05, index.html file hosted in 10259/a5 in CSUNIX. 
28 March, 2022 */

// initialize remaining attempts variable
let remainingAttempts;
let win;
let winningCup;
let relevantBall;

/**
 * Creates the cups SVG elements.
 * @param {Number} numOfCups the number of cups to be made
 */
function makeCups(numOfCups) {

    const svgNS = "http://www.w3.org/2000/svg";

    // SELECT THE SVG CANVAS TO DRAW ON
    let svg = document.querySelector("#gameContainer svg");

    /**
     * Draws a single cup.
     * @param {Number} cupNumber the intended id # of the cup
     * @param {String} points variable definition of the polygon (cup) points
     * @returns an SVG polygon (cup)
     */
    function drawCup(cupNumber, points) {
        let cup = document.createElementNS(svgNS, "polygon");
        cup.setAttribute("id", "cup" + cupNumber);
        cup.setAttribute("class", "cup");
        // cup.setAttribute("points", "20 140, 70 140, 85 250, 5 250"); // change this to a variable
        cup.setAttribute("points", points);
        // cup.setAttribute("transform","translate(" + offset + ")");
        cup.setAttribute("onmouseover", "shake(this)");
        cup.setAttribute("onmouseout", "stopshake(this)");
        // cup.setAttribute("onclick", "lift(this)");

        return cup;

    }

    /**
     * Draws a single ball.
     * @param {Number} cupNumber the intended id # of the ball
     * @param {Number} cx x value of the circle
     * @returns an SVG circle (ball)
     */
    function drawBall(cupNumber, cx) {
        // every cup has a hidden ball
        let ball = document.createElementNS(svgNS, "circle");
        ball.setAttribute("id", "ball" + cupNumber);
        ball.setAttribute("class", "ball hidden");
        ball.setAttribute("cx", String(cx));
        ball.setAttribute("cy", "225"); // fixed y position for the ball
        ball.setAttribute("r", "17");

        return ball;
    }

    // empty the svg of any groups that were drawn before
    // referenced from inclass example: makeHouse.js
    let screen = svg.querySelectorAll("polygon");
    screen.forEach(cup => { cup.parentNode.removeChild(cup); });

    screen = svg.querySelectorAll("circle");
    screen.forEach(ball => { ball.parentNode.removeChild(ball); });

    let cups = Array(numOfCups);

    for (let cupNumber = 1; cupNumber <= numOfCups; cupNumber++) {
        cups[cupNumber] = document.createElementNS(svgNS, "g");
        cups[cupNumber].setAttribute("id", "cup" + cupNumber);

        let svgWidth = parseInt(svg.getAttribute("width"));
        let offset = (svgWidth / (numOfCups + 2)) * cupNumber // padding and spacing for translation

        // RECENTER IF THERE ARE 4 CUPS
        if (numOfCups == 4) {
            offset = ((svgWidth / numOfCups) * cupNumber) - 115;
        }

        // RECENTER IF THERE ARE 5 CUPS
        if (numOfCups == 5) {
            offset = ((svgWidth / numOfCups + 2) * cupNumber) - 105;
        }

        // 4 points needed to draw the cups
        // the format is x1 y1, x2 y2 [...]
        let pt1 = String(20 + offset) + " 140,";
        let pt2 = String(70 + offset) + " 140,";
        let pt3 = String(85 + offset) + " 250,";
        let pt4 = String(5 + offset) + " 250";

        let points = pt1 + pt2 + pt3 + pt4;

        // console.log(cupNumber);
        svg.appendChild(drawCup(cupNumber, points));
        svg.appendChild(drawBall(cupNumber, offset + 45));
    }

    // SET THE SCOREBOARD DEFAULT
    remainingAttempts = numOfCups - 1;
    let scoreboard = document.querySelector("#scoreboard");
    scoreboard.innerHTML = "Remaining Attempts: " + remainingAttempts;

}

// SHAKES THE CUP ON MOUSEOVER
/**
 * Adds the CSS class to shake the cup.
 * @param {SVG Element} x the cup to be shaken
 */
function shake(x) {
    x.classList.add("shake");
}

// STOPS THE SHAKING WHEN THE MOUSE IS MOVED AWAY
/**
 * Removes the CSS class to shake the cup.
 * @param {SVG Element} x the cup to stop shaking 
 */
function stopshake(x) {
    x.classList.remove("shake");
}

// LIFTS THE CUP
/**
 * Animates the lifting of a cup.
 * Checks to see if the cup is the winning cup. If yes, ends the game and changes the scoreboard.
 * If not, facilitates continued gameplay until the user no longer has remaining attempts.
 * @param {SVG Element} x the cup to be lifted
 */
function lift(x) {
    // strips the shaking motion when it is clicked
    stopshake(x);
    // lifts the cup
    x.setAttribute("transform", "translate(0 -50)");
    // prevents the cup from shaking on hover after it is lifted
    x.setAttribute("onmouseover", "");
    // prevents the user from clicking the same cup again in the same round
    x.setAttribute("onclick", "");

    //console.log("The cup clicked was: " + x.id);

    if (winningCup == x.id) {
        //console.log("The winning cup is " + winningCup + ". Clicked: " + x.id);

        // accomodate the delay for the cup to lift
        /**
         * Accomodates the delay for the cup lifting animation.
         */
        setTimeout(function() {
            document.getElementById(relevantBall).classList.remove("hidden");
        }, 270);

        scoreboard.innerHTML = "Remaining Attempts: " + remainingAttempts + "<br>You found the ball!";
        disableClick();

    } else {
        // ADD THE COUNTER TO DECREASE ATTEMPTS
        remainingAttempts -= 1;

        if (remainingAttempts > 0) {

            scoreboard.innerHTML = "Remaining Attempts: " + remainingAttempts;

        } else {
            // settings for game over
            scoreboard.innerHTML = "Remaining Attempts: " + remainingAttempts + "<br>Game Over!";

            // disable the clicking for all the cups
            disableClick();

        }
    }

}

/**
 * Plays an animation for the cups shuffling.
 * "Places the ball under a cup" - aka randomly generates the winning cup number
 */
function shuffleCups() {

    // re-enable the clicking/lifting in case of previous shuffle
    enableClick();

    let svg = document.querySelector("#gameContainer svg");

    let allCups = svg.querySelectorAll("polygon");

    for (let i = 0; i < allCups.length; i++) {
        allCups[i].setAttribute("transform", "translate(0 0)");
        allCups[i].classList.add("shuffle");
    }


    // pick a random cup to be the cup with the ball underneath
    // ensure that the cup is never 0 and always an integer
    // saves the id of the winning cup to the variable "winningCup"
    win = String(Math.floor(Math.random() * allCups.length) + 1)
    winningCup = "cup" + win;
    relevantBall = "ball" + win;
    //console.log("The winning cup is: " + winningCup + ". The associated ball is: " + relevantBall);

    /**
     * Allow shuffling animation again after 3s.
     */
    setTimeout(function() {
        for (let i = 0; i < allCups.length; i++) {
            allCups[i].classList.remove("shuffle");
        }
    }, 3000);

}

/**
 * Disables the clicking function for all cups.
 */
function disableClick() {
    // disable the clicking for all the cups
    let svg = document.querySelector("#gameContainer svg");

    let allCups = svg.querySelectorAll("polygon");

    for (let i = 0; i < allCups.length; i++) {
        allCups[i].setAttribute("onclick", "");
    }
}

/**
 * Enables the clicking function for all cups.
 */
function enableClick() {
    // disable the clicking for all the cups
    let svg = document.querySelector("#gameContainer svg");

    let allCups = svg.querySelectorAll("polygon");
    let allBalls = svg.querySelectorAll("circle");

    for (let i = 0; i < allBalls.length; i++) {
        allBalls[i].classList.add("hidden");
    }

    for (let i = 0; i < allCups.length; i++) {
        allCups[i].setAttribute("onclick", "lift(this)");
    }

    remainingAttempts = allCups.length - 1;
    scoreboard.innerHTML = "Remaining Attempts: " + remainingAttempts;

}