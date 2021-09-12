const GameBoard = (function () {
    let _board = [];
    const getBoard = () => _board;
    const placeMark = (position, mark) => (_board[position] = mark);

    const markBoard = (player) => {
        const blocks = document.querySelectorAll('.block');

        if (player.isHuman()) {
            blocks.forEach((block) => {
                block.addEventListener('click', () => {
                    let blockId = block.id.slice(6) - 1;
                    if (block.classList.contains('active')) {
                        return;
                    }
                    GameBoard.placeMark(blockId, player.getMark());
                    block.classList.add('active');
                    updateBoard();
                    DisplayController.toggleTurn();
                });
            });
        } else {
            let availableSpots = [];
            for (index in _board) {
                if (typeof _board[index] === undefined) {
                    availableSpots.push(index);
                }
            }
            console.log(availableSpots);
            let markPlacement = Math.floor(
                Math.random() * availableSpots.length
            );
            GameBoard.placeMark(markPlacement, player.getMark());
            document
                .querySelector(`#block-${markPlacement + 1}`)
                .classList.add('active');
            updateBoard();
        }
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
    };

    return { getBoard, placeMark, markBoard, updateBoard };
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
    let _isAITurn = false;
    const getScore = () => _score;
    const setScore = (score) => (_score = score);
    const toggleTurn = () => (_isAITurn = !_isAITurn);

    const playRound = () => {
        if (!_isAITurn) {
            GameBoard.markBoard(user);
        } else {
            GameBoard.markBoard(ai);
        }
    };

    return { getScore, setScore, playRound, toggleTurn };
})();

function selectPlayer() {
    const userMark = document.querySelector('input[type="radio"]:checked');
    const aiMark = document.querySelector('input[type="radio"]:not(:checked)');
    const form = document.querySelector('#player-info');
    user = Player(userMark.value, true);
    ai = Player(aiMark.value, false);
    form.classList.add('hidden');
}

const submitBtn = document.querySelector('#player-info button');
let user;
let ai;

submitBtn.addEventListener('click', () => {
    selectPlayer();
    DisplayController.playRound();
    console.log('a');
    DisplayController.playRound();
});
