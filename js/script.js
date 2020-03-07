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

const grid = () => Array.from(document.getElementsByClassName('field'));
const fieldNumId = (fieldEl) => fieldEl.id.replace('field', '');
const emptyFields = () => grid().filter(_fieldEl => _fieldEl.innerText === '');
const allSame = (arr) => arr.every(_fieldEl => _fieldEl.innerText === arr[0].innerText && _fieldEl.innerText !== '');

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => fieldNumId(emptyFields()[Math.floor(Math.random() * emptyFields().length)]);

const endGame = (winningSequences) => {
    winningSequences.forEach(_fieldEl => _fieldEl.classList.add('winner'));
    disableListeners();
};
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

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), 'o');
        if (!victoryCheck())
            enableListeners();
    }, 1000);
}

const clickFunction = (event) => {
    takeTurn(fieldNumId(event.target), 'x');
    if (!victoryCheck())
        opponentTurn();
};

const enableListeners = () => grid().forEach(_fieldEl => _fieldEl.addEventListener('click', clickFunction));
const disableListeners = () => grid().forEach(_fieldEl => _fieldEl.removeEventListener('click', clickFunction));

enableListeners();