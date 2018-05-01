var Letter = function(char) {
	// set var to string value to store the underlying letter
	this.char = char.toUpperCase();
	// check to see if characters are letters or numbers
    this.visible = !/[a-z1-9]/i.test(char);
	// set var to a boolean value that stores whether that letter has been guessed yet
	this.letterGuessedCorrectly = false;
	// toString function that
	this.toString = function() {
		// checks to see if there are any non-letter/non-numbers in the word. if there are, log it
		if (this.visible) {
			console.log(this.char);
		}
		else if (this.letterGuessedCorrectly) {
			console.log(this.char);
		}
		// otherwise, return an underscore
        else {
            console.log("_");
        }
	}
}

// var letter = new Letter ("a");
// letter.toString();

module.exports = Letter