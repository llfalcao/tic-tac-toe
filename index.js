const GameBoard = (function () {
    let _board = [];

    const getBoard = () => _board;
    const placeMark = (position, mark) => (_board[position] = mark);

    return { getBoard, placeMark };
})();

const Player = function (mark) {
    let _mark = mark || 'X';

    getMark = () => _mark;
    setMark = (mark) => (_mark = mark);

    return { getMark, setMark };
};

const DisplayController = (function () {
    let _score = [0, 0];

    getScore = () => _score;
    setScore = (score) => (_score = score);

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
                DisplayController.updateBoard();
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

    return { getScore, setScore, markBoard, updateBoard };
})();

function selectMark(player) {
    const mark = document.querySelector('input[type="radio"]:checked');
    player.setMark(mark.value);
}

const submitBtn = document.querySelector('#player-info button');
let user = new Player();
submitBtn.addEventListener('click', selectMark(user));

DisplayController.markBoard(user);
