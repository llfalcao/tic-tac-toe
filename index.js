const GameBoard = (function () {
    let _board = [];
    let _filled = 0;
    const getBoard = () => _board;
    const placeMark = (location, mark) => {
        _board[location] = mark;
        _filled++;
    };

    const updateBoard = () => {
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
        if (_filled === 9) {
            return 'gameover';
        }
    };

    return { getBoard, placeMark, updateBoard };
})();

const Player = function (mark, human) {
    let _mark = mark;
    let _isHuman = human;

    const getMark = () => _mark;
    const setMark = (mark) => (_mark = mark);
    const isHuman = () => _isHuman;

    return { getMark, setMark, isHuman };
};

const DisplayController = (function () {
    let _score = [0, 0];
    const getScore = () => _score;
    const setScore = (score) => (_score = score);

    const aiTurn = () => {
        const board = GameBoard.getBoard();
        let available = [];
        for (let i = 0; i <= 8; i++) {
            if (typeof board[i] !== 'string') {
                available.push(i);
            }
        }
        let location = Math.floor(Math.random() * available.length);
        GameBoard.placeMark(available[location], ai.getMark());
        document
            .querySelector(`#block-${location + 1}`)
            .classList.add('active');

        setTimeout(() => GameBoard.updateBoard(), 500);
    };

    const startGame = () => {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block) => {
            block.addEventListener('click', function onClick() {
                block.removeEventListener('click', onClick);
                let blockId = block.id.slice(6) - 1;
                GameBoard.placeMark(blockId, user.getMark());
                block.classList.add('active');
                GameBoard.updateBoard();
                aiTurn();
            });
        });
    };

    return { getScore, setScore, startGame };
})();

function selectPlayer() {
    const userMark = document.querySelector('input[type="radio"]:checked');
    const aiMark = document.querySelector('input[type="radio"]:not(:checked)');
    const form = document.querySelector('#player-info');
    user = Player(userMark.value, true);
    ai = Player(aiMark.value, false);
    // form.classList.add('hidden');
    // temp
    form.remove();
}

const submitBtn = document.querySelector('#player-info button');
let user;
let ai;

submitBtn.addEventListener('click', () => {
    selectPlayer();
    DisplayController.startGame();
});
