(function() {
    var self = {};
    self.words = ['GEORGIA', 'CANINE', 'BLISTER', 'FRAGRANT'];
    self.selectedWord = self.words[parseInt(Math.random() * self.words.length, 10)];
    self.elCheat = document.getElementById('cheat');
    self.elLetters = document.getElementById('letters');
    self.elForm = document.getElementById('entry-form');
    self.elInput = self.elForm.input;
    self.elSubmit = self.elForm.submit;
    self.elGuesses = document.getElementById('guesses');
    self.numGuesses = 5;

    function init() {
        self.elCheat.innerHTML = self.selectedWord;
        self.elLetters.innerHTML = drawDashes();
        self.elGuesses.innerHTML = self.numGuesses;
        if(self.elInput.addEventListener) {
            self.elInput.addEventListener('keypress', onKeyPress, false);
            self.elSubmit.addEventListener('click', onSubmit, false);
        } else {
            self.elInput.attachEvent('onkeydown', onKeyPress);
            self.elSubmit.attachEvent('onclick', onSubmit);
        }
    }

    function drawDashes() {
        return new Array(self.selectedWord.length + 1).join('_');
    }

    function decrementGuesses() {
        self.numGuesses--;
        self.elGuesses.innerHTML = self.numGuesses;
        if(self.numGuesses === 0) alert('You lose!');
    }

    function populateLetter(s) {
        var i, len,
        word = self.selectedWord,
        blanks = self.elLetters.innerHTML,
        replaced = '';

        for(i = 0, len = word.length; i < len; i++) {
            replaced = replaced.concat((word[i] === s) ? s : blanks[i]);
        }
        self.elLetters.innerHTML = replaced;
        if(replaced.indexOf('_') === -1) alert('You win!');
    }

    function onKeyPress(e) {
        if(e.which === 13) {
            e.preventDefault();
            handleSubmit();
        }
    }

    function onSubmit(e) {
        handleSubmit();
    }

    function handleSubmit() {
        var letter = self.elInput.value.toUpperCase();
        if(letter.length > 0) {
            if(self.selectedWord.indexOf(letter) === -1) {
                decrementGuesses();
            } else {
                populateLetter(letter);
            }
            self.elInput.value = '';
        }
   }

    init();
})();