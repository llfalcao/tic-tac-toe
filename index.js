import GameBoard from './src/components/GameBoard/GameBoard.js';
import Player from './src/components/Player/Player.js';

const DisplayController = (function () {
    let _turn = 0;
    let _result = {};

    const updateScore = (result) => {
        if (result === 'draw') {
            const draw = document.querySelector('#score-draw');
            draw.textContent = parseInt(draw.textContent) + 1;
        } else if (user.getMark() === result.mark) {
            const player = document.querySelector('#score-player');
            player.textContent = parseInt(player.textContent) + 1;
        } else {
            const computer = document.querySelector('#score-computer');
            computer.textContent = parseInt(computer.textContent) + 1;
        }
    };

    const userTurn = async (block) => {
        return new Promise((resolve) => {
            if (block.classList.contains('locked')) {
                return;
            }
            let blockId = block.id.slice(6) - 1;
            GameBoard.placeMark(blockId, user.getMark());
            block.classList.add('locked');
            if (_turn >= 3) {
                _result = GameBoard.validate();
            }
            GameBoard.updateBoard();
            if (_result.mark === user.getMark()) {
                endGame(_result);
                return;
            }
            if (++_turn === 9) {
                endGame('draw');
                return;
            }
            resolve();
        });
    };

    // Checks which spots the AI can play
    // A random location will be chosen
    // MiniMax soon...
    const aiTurn = async () => {
        _turn++;
        if (_result.mark !== undefined) {
            return;
        }
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
            .classList.add('locked');
        if (_turn >= 3) {
            _result = GameBoard.validate();
        }
        setTimeout(() => {
            GameBoard.updateBoard();
            if (_result.mark === ai.getMark()) {
                endGame(_result);
                return;
            }
        }, 500);
    };

    const startGame = () => {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block) => {
            block.addEventListener('click', () =>
                userTurn(block).then(() => aiTurn())
            );
        });
    };

    // Displays all the winner info on the screen
    const endGame = (result) => {
        if (result === 'draw') {
            document.querySelector('#winner-x').style.display = 'inline-block';
            document.querySelector('#winner-o').style.display = 'inline-block';
            document.querySelector('h2').textContent = 'DRAW!';
        } else {
            const blocks = document.querySelectorAll('.block');
            blocks.forEach((block) => {
                block.classList.add('locked');
            });
            const strikethrough = [
                'line',
                result.direction,
                `${result.direction}-${result.position}`,
            ];
            const line = document.createElement('div');
            line.classList.add(...strikethrough);
            document.querySelector('.board').appendChild(line);
            document.querySelector(`#winner-${result.mark}`).style.display =
                'block';
            document.querySelector('h2').textContent = 'WINNER!';
        }
        updateScore(result);
        setTimeout(() => {
            window.addEventListener('click', restartGame);
        }, 500);
    };

    const restartGame = () => {
        window.removeEventListener('click', restartGame);
        GameBoard.resetBoard();
        GameBoard.updateBoard();
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block) => {
            block.classList.remove('locked');
        });
        if (_result.mark) {
            const lines = document.querySelectorAll('.line');
            lines.forEach((line) => {
                line.remove();
            });
        }
        document.querySelector('#winner-x').style.display = 'none';
        document.querySelector('#winner-o').style.display = 'none';
        document.querySelector('h2').textContent = '';
        _turn = 0;
        _result = {};
    };

    return { startGame };
})();

function selectPlayer() {
    const userMark = document.querySelector('input[type="radio"]:checked');
    const aiMark = document.querySelector('input[type="radio"]:not(:checked)');
    const form = document.querySelector('#player-info');
    try {
        user = Player(userMark.value);
        ai = Player(aiMark.value);
    } catch (error) {
        user = Player('x');
        ai = Player('o');
    }
    form.classList.add('hidden');
    setTimeout(() => {
        form.remove();
    }, 1000);
}

let user;
let ai;
const submitBtn = document.querySelector('#player-info button');

submitBtn.addEventListener('click', () => {
    selectPlayer();
    document.querySelector('.board').style.opacity = '1';
    DisplayController.startGame();
});
