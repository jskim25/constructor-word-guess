var Letter = require("././Letter");

var Word = function(word) {
	// set var to string value to store the underlying word
	this.word = word;
	// array to hold the letters
	this.letters = [];
	// array to hold underscores
	this.underscores = [];
	this.splitWord = function() {
		// take the word and split at each character
		this.letters = this.word.split("");
		// log them as underscores
		console.log(this.underscores.join(" "));
	}
	this.generateLetters = function() {
		// loop through the letters that were split above
		for (i=0; i < this.letters.length; i++){
			// give each letter the properties of the Letter constructor
			this.letters[i] = new Letter (this.letters[i]);
			this.letters[i].toString();
		}
	}
}

// var testWord = new Word ("apple");
// testWord.splitWord();
// testWord.generateLetters();

module.exports = Word;