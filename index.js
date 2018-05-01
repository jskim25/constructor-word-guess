var Word = require("././Word");
var inquirer = require("inquirer");

var wordBank = [
    'Apple',
    'Apricot',
    'Avocado',
    'Banana',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Blueberry',
    'Boysenberry',
    'Currant',
    'Cherry',
    'Cherimoya',
    'Cloudberry',
    'Coconut',
    'Cranberry',
    'Cucumber',
    'Damson',
    'Date',
    'Dragonfruit',
    'Durian',
    'Elderberry',
    'Feijoa',
    'Fig',
    'Gooseberry',
    'Grape',
    'Raisin',
    'Grapefruit',
    'Guava',
    'Honeyberry',
    'Huckleberry',
    'Jabuticaba',
    'Jackfruit',
    'Jambul',
    'Jujube',
    'Juniper berry',
    'Kiwano',
    'Kiwifruit',
    'Kumquat',
    'Lemon',
    'Lime',
    'Loquat',
    'Longan',
    'Lychee',
    'Mango',
    'Mangosteen',
    'Marionberry',
    'Melon',
    'Cantaloupe',
    'Honeydew',
    'Watermelon',
    'Mulberry',
    'Nectarine',
    'Nance',
    'Olive',
    'Orange',
    'Clementine',
    'Mandarine',
    'Tangerine',
    'Papaya',
    'Passionfruit',
    'Peach',
    'Pear',
    'Persimmon',
    'Plantain',
    'Plum',
    'Prune',
    'Pineapple',
    'Plumcot',
    'Pomegranate',
    'Pomelo',
    'Quince',
    'Raspberry',
    'Salmonberry',
    'Rambutan',
    'Redcurrant',
    'Salak',
    'Satsuma',
    'Soursop',
    'Gonzoberry',
    'Strawberry',
    'Tamarillo',
    'Tamarind',
    'Yuzu',
];

// choose random word from the word bank array
var randomWord;

// variable to keep count of guesses and letters remaining as well as wins & losses
var guessesRemaining = 7;
var correctGuesses = 0;
var wins = 0;
var losses = 0;

// variable initially set to false until user guesses entire word correctly
var wordGuessed = false;

// initialize the game
initializeGame();

// this prompts the user, asking if he/she wants to play
function initializeGame() {
    var confirmStart = [
        {
            type: 'confirm',
            name: 'confirmStart',
            message: 'Welcome to Constructor Word Guess. Please press (Y) if you would like to play. Press (N) to quit.',
            default: true
        }
    ];
    inquirer.prompt(confirmStart).then(response => {
        // if the user confirms, start the game
        if (response.confirmStart) {
            console.log("Game initializing...");
            startGame();
        }
        else {
            // otherwise, end application
            console.log("Exiting...");
            return;
        }
    });
}

// runs only if user confirms they want to play
function startGame() {
    // reset the variables for the game
    guessesRemaining = 7;
    totalLettersGuessed = "";
    lettersGuessedArray = [];
    // run function for choosing a random word
    chooseWord();
}

// runs only if startGame is run
function chooseWord() {
    // randomly select a word from the word bank and make all letters uppercase to account for case sensitivity
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
    // this random word is now set as the selected word, taking in the properties of the Word object created in Word.js
    currentWord = new Word(randomWord);
    // give user a hint
    console.log("HINT: the word is a type of fruit.\n");
    // use the methods in the Word constructor to split the word into individual letters and generate them
    currentWord.splitWord();
    currentWord.generateLetters();
    // run function for guessing the letters
    guessLetters();
}

// run only if a word was randomly selected from the word bank successful
function guessLetters() {
    // if letters remain unguessed or there are guesses remaining,
    if (correctGuesses < currentWord.letters.length || guessesRemaining > 0) {
        // prompt the user to guess a letter
        inquirer.prompt([
            {
                name: "letter",
                message: "GUESS A LETTER: ",
                validate: function (val) {
                    // make sure the user does not guess a non-letter (or non-number)
                    return /[a-z1-9]/gi.test(val);
                }
            }
        ]).then(function (guess) {
            // take the guessed letter and make it upper-case
            guess.letter.toUpperCase();
            wordGuessed = false;
            // if the letter guessed by user has already been guessed, prompt user to guess a different letter
            if (lettersGuessedArray.indexOf(guess.letter.toUpperCase()) > -1) {
                console.log("That letter has already been guessed. Try another one.");
                console.log("------------------------------------------------------");
                guessLetters();
            }
            // if user entered a letter that was not already guessed
            else if (lettersGuessedArray.indexOf(guess.letter.toUpperCase()) === -1) {
                // push it to the totalLettersGuessed array
                totalLettersGuessed = totalLettersGuessed.concat(" " + guess.letter.toUpperCase());
                lettersGuessedArray.push(guess.letter.toUpperCase());
                // log all letters guessed by the user
                console.log("------------------------------------------------------")
                console.log('LETTERS GUESSED: ' + totalLettersGuessed);
                // loop through all of the letters in the word to see if the letter guessed matches one of the letters in the word
                for (i = 0; i < currentWord.letters.length; i++) {
                    // if the user's guess equals one of the letters in the word and wasn't already guessed previously
                    if (guess.letter.toUpperCase() === currentWord.letters[i].char && currentWord.letters[i].letterGuessedCorrectly === false) {
                        // set letterGuessedCorrectly to true
                        currentWord.letters[i].letterGuessedCorrectly === true;
                        // set wordGuessed to true
                        wordGuessed = true;
                        currentWord.underscores[i] = guess.letter.toUpperCase();
                        correctGuesses++
                    }
                }
                // update this each time the user guesses a new letter -- NEEDS SOME WORK
                console.log("WORD TO GUESS: ");
                currentWord.splitWord();
                currentWord.generateLetters();

                // if user guessed letter correctly
                if (wordGuessed) {
                    // log to user to let him/her know
                    console.log("CORRECT");
                    // check to see if user won
                    checkIfUserWon();
                }

                // if user guessed incorrectly
                else {
                    //T log to user to let him/her know
                    console.log("INCORRECT");
                    // decrease the remaining guesses by 1 and display to user
                    guessesRemaining--;
                    console.log("You have " + guessesRemaining + " guesses remaining.");
                    // check to see if user won (in this case, see if there are guesses remaining)
                    checkIfUserWon();
                }
            }
        });
    }
}

// run after each guessed letter
function checkIfUserWon() {
    // if number of guesses remaining is 0, user lost and game is over
    if (guessesRemaining === 0) {
        console.log("------------------------------------------------------");
        console.log("Sorry, you have 0 guesses remaining. Game over.");
        console.log("The correct word was: " + randomWord);
        console.log("------------------------------------------------------");
        // increase losses by 1
        losses++;
        // display total wins & losses
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        console.log("------------------------------------------------------");
        // ask user if he/she wants to play again
        playAgain();
    }
    // if the number of letters remaining is equal to the number of letters in the word, user won and game is over
    else if (correctGuesses === currentWord.letters.length) {
        console.log("------------------------------------------------------");
        console.log("Congratulations, you have guessed the word correctly.");
        console.log("The correct word was: " + randomWord);
        console.log("------------------------------------------------------");
        // increase wins by 1
        wins++;
        // display total wins & losses
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        console.log("------------------------------------------------------");
        // ask user if he/she wants to play again
        playAgain();
    }
    else {
        // if neither of the above parameters are met, continue to prompt the user to guess a letter
        guessLetters();
    }
}

// run only after the user has won or lost
function playAgain() {
    // prompt the user to see if he/she would like to play again
    var playGameAgain = [
        {
            type: 'confirm',
            name: 'playAgain',
            message: 'Please press (Y) to play again. Press (N) to quit.',
            default: true
        }
    ];
    inquirer.prompt(playGameAgain).then(response => {
        // if the user wants to play again
        if (response.playAgain) {
            // reset the variables
            totalLettersGuessed = "";
            lettersGuessedArray = [];
            correctGuesses = 0;
            console.log("Game initializing...");
            // and start a new game
            startGame();
        }
        else {
            // if user doesn't want to play again, quit application
            console.log("Exiting...");
            return;
        }
    });
}