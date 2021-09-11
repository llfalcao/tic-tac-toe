const GameBoard = (function () {
    let _board = [];
    const getBoard = () => _board;
    const placeMark = (position, mark) => (_board[position] = mark);

    markBoard = (player) => {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block) => {
            block.addEventListener('click', () => {
                let blockId = block.id.slice(6) - 1;
                if (block.classList.contains('active')) {
                    return;
                }
                GameBoard.placeMark(blockId, player.getMark());
                block.classList.add('active');
                updateBoard();
            });
        });
    };

    updateBoard = () => {
        let board = GameBoard.getBoard();
        for (let i = 0; i <= 8; i++) {
            if (board[i] === 'X') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}x"]`
                );
                mark.style.display = 'block';
            } else if (board[i] === 'O') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}o"]`
                );
                mark.style.display = 'block';
            }
        }
    };

    return { getBoard, placeMark, markBoard, updateBoard };
})();

const Player = function (mark) {
    let _mark = mark || 'X';
    const getMark = () => _mark;
    const setMark = (mark) => (_mark = mark);

    return { getMark, setMark };
};

const DisplayController = (function () {
    let _score = [0, 0];
    let _isAITurn = false;
    const getScore = () => _score;
    const setScore = (score) => (_score = score);
    const getIsAITurn = () => _isAITurn;

    const startGame = () => {
        GameBoard.markBoard(user);
    };

    return { getScore, setScore, startGame, getIsAITurn };
})();

function selectPlayer(player) {
    const mark = document.querySelector('input[type="radio"]:checked');
    player.setMark(mark.value);
}

const submitBtn = document.querySelector('#player-info button');
let user = new Player();
submitBtn.addEventListener('click', selectPlayer(user));

DisplayController.startGame();
