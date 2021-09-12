const GameBoard = (function () {
    let _board = [];
    let _filled = 0;

    const getBoard = () => _board;

    const getFilled = () => _filled;

    const placeMark = (location, mark) => {
        _board[location] = mark;
        _filled++;
    };

    const validate = () => {
        const rows = ['', '', ''];
        const cols = ['', '', ''];
        for (let i = 0; i <= 8; i++) {
            if (i < 3) {
                rows[0] += _board[i];
            } else if (i < 6) {
                rows[1] += _board[i];
            } else if (i < 9) {
                rows[2] += _board[i];
            }
            if (i % 3 === 0) {
                cols[0] += _board[i];
            } else if (i % 3 === 1) {
                cols[1] += _board[i];
            } else if (i % 3 === 2) {
                cols[2] += _board[i];
            }
        }
        const diag = [
            [_board[0], _board[4], _board[8]],
            [_board[2], _board[4], _board[6]],
        ];
        const lines = rows.concat(cols, diag);
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === 'XXX' || lines[i] === 'OOO') {
                return lines[i].charAt(0);
            }
        }
    };

    const updateBoard = () => {
        for (let i = 0; i <= 8; i++) {
            if (_board[i] === 'X') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}x"]`
                );
                mark.style.display = 'block';
            } else if (_board[i] === 'O') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}o"]`
                );
                mark.style.display = 'block';
            }
        }
    };

    return { getBoard, getFilled, placeMark, updateBoard, validate };
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
        if (available.length === 0) {
            return;
        }
        let index = Math.floor(Math.random() * (available.length - 1));
        GameBoard.placeMark(available[index], ai.getMark());
        document
            .querySelector(`#block-${available[index] + 1}`)
            .classList.add('active');
        let winner;
        if (GameBoard.getFilled() >= 3) {
            winner = GameBoard.validate();
        }
        setTimeout(() => GameBoard.updateBoard(), 500);
        if (winner != undefined) {
            endGame(winner);
        }
    };

    const startGame = () => {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block) => {
            block.addEventListener('click', function onClick() {
                block.removeEventListener('click', onClick);
                if (block.classList.contains('active')) {
                    return;
                }
                let blockId = block.id.slice(6) - 1;
                GameBoard.placeMark(blockId, user.getMark());
                block.classList.add('active');
                let winner;
                if (GameBoard.getFilled() >= 3) {
                    winner = GameBoard.validate();
                }
                GameBoard.updateBoard();
                if (winner != undefined) {
                    endGame(winner);
                }
                aiTurn();
            });
        });
    };

    const endGame = (player) => {
        window.alert(`${player} wins!`);
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
