const GameBoard = (function () {
    // let _board = ['o', 'x', 'x', 'o', 'o', 'x', 'x', 'o', 'o'];
    let _board = [];

    const getBoard = () => _board;
    const placeMark = (position, mark) => (_board[position] = mark);

    return { getBoard, placeMark };
})();

const Player = function (mark) {
    let _mark = mark;

    getMark = () => _mark;

    return { getMark };
};

const DisplayController = (function () {
    let _score = [0, 0];

    getScore = () => _score;
    setScore = (score) => (_score = score);

    updateBoard = () => {
        let board = GameBoard.getBoard();
        for (let i = 0; i <= 8; i++) {
            if (board[i] === 'x') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}x"]`
                );
                mark.style.display = 'block';
            } else if (board[i] === 'o') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}o"]`
                );
                mark.style.display = 'block';
            }
        }
    };

    return { getScore, setScore, updateBoard };
})();

let user;

function selectPlayer() {
    const form = document.querySelector('#player-info');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const mark = document.querySelector('input[type="radio"]:checked');
        user = new Player(mark.value);
    });
}

const blocks = document.querySelectorAll('.block');
blocks.forEach((block) => {
    block.addEventListener('click', () => {
        let blockId = block.id.slice(6) - 1;
        console.log(blockId);
        GameBoard.placeMark(blockId, user.getMark());
    });
});

selectPlayer();
DisplayController.updateBoard();
