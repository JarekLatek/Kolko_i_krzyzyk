// creating array with winning combinations
const winCombs = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]

// function which make array form elements with class name field
const grid = () => Array.from(document.getElementsByClassName('field')); 

// function which replace every string element into an number element ???
const fieldNumId = (fieldEl) => fieldEl.id.replace('field', '');

// function that is searching array for empty fields, where aren't any x or o sign yet
const emptyFields = () => grid().filter(_fieldEl => _fieldEl.innerText === ''); 

 // function that are checking if array have all same signs in it but not all empty 
const allSame = (arr) => arr.every(_fieldEl => _fieldEl.innerText === arr[0].innerText && _fieldEl.innerText !== '');

 // function that is changing move turn
const takeTurn = (index, letter) => grid()[index].innerText = letter;

// function that is doing an opponent move (basic AI), it is working by searching for random empty field
const opponentChoice = () => fieldNumId(emptyFields()[Math.floor(Math.random() * emptyFields().length)]); 

// function that is changing class for win combo and making it red
const endGame = (winningSequences) => {
    winningSequences.forEach(_fieldEl => _fieldEl.classList.add('winner'));
    disableListeners();
};

// function that is checking if there is some winning combination 
const victoryCheck = () => {
    let victory = false;
    winCombs.forEach(_comb => {
        const _grid = grid();
        const sequence = [_grid[_comb[0]], _grid[_comb[1]], _grid[_comb[2]]];
        if (allSame(sequence)) {
            victory = true;
            endGame(sequence);
        }
    });
    return victory;
}

// function that doing an AI opponent move by some period of time
const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), 'o');
        if (!victoryCheck())
            enableListeners();
    }, 1000);
}

// function that is making our turn by clicking field on game board
const clickFunction = (event) => {
    takeTurn(fieldNumId(event.target), 'x');
    if (!victoryCheck())
        opponentTurn();
};

// adding and removing eventListeners to each field which will be working on a click and will make clickFunction happend or unhappend
const enableListeners = () => grid().forEach(_fieldEl => _fieldEl.addEventListener('click', clickFunction)); 
const disableListeners = () => grid().forEach(_fieldEl => _fieldEl.removeEventListener('click', clickFunction));

enableListeners();