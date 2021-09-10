const GameBoard = (function () {
    let _board = ['o', 'x', 'x', 'o', 'o', 'x', 'x', 'o', 'o'];

    const getBoard = () => _board;
    const placeMark = (position, mark) => (_board[position] = mark);

    return { getBoard, placeMark };
})();

const Player = function () {
    let _name;

    getName = () => _name;
    setName = (name) => (_name = name);

    return { getName, setName };
};

const DisplayController = (function () {
    let _score = [0, 0];

    getScore = () => _score;
    setScore = (score) => (_score = score);

    return { getScore, setScore };
})();

function updateBoard() {
    let board = GameBoard.getBoard();
    for (let i = 0; i <= 8; i++) {
        if (board[i] === 'x') {
            const mark = document.querySelector(`img[data-mark="${i + 1}x"]`);
            mark.style.display = 'block';
        } else if (board[i] === 'o') {
            const mark = document.querySelector(`img[data-mark="${i + 1}o"]`);
            mark.style.display = 'block';
        }
    }
}

updateBoard();
