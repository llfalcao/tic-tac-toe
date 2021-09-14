const GameBoard = (function () {
    let _board = [];

    const getBoard = () => _board;

    const resetBoard = () => (_board = []);

    const placeMark = (location, mark) => {
        _board[location] = mark;
    };

    // Saves the state of each row, column, and diagonal,
    // merges them, then checks whether there's a winner.
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
            _board[0] + _board[4] + _board[8],
            _board[2] + _board[4] + _board[6],
        ];
        const lines = rows.concat(cols, diag);
        let lineDirection, position;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === 'xxx' || lines[i] === 'ooo') {
                if (i < 3) {
                    lineDirection = 'row';
                    position = i + 1;
                } else if (i < 6) {
                    lineDirection = 'col';
                    position = i - 2;
                } else if (i < 8) {
                    lineDirection = 'diag';
                    position = i - 5;
                }
                return {
                    mark: lines[i].charAt(0),
                    direction: lineDirection,
                    position,
                };
            }
        }
        return {};
    };

    const updateBoard = () => {
        if (_board.length === 0) {
            const marks = document.querySelectorAll(`img[data-mark]`);
            marks.forEach((mark) => {
                mark.removeAttribute('style');
            });
        }
        for (let i = 0; i <= 8; i++) {
            if (_board[i] === 'x') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}x"]`
                );
                mark.style.display = 'block';
            } else if (_board[i] === 'o') {
                const mark = document.querySelector(
                    `img[data-mark="${i + 1}o"]`
                );
                mark.style.display = 'block';
            }
        }
    };

    return { getBoard, resetBoard, placeMark, updateBoard, validate };
})();

export default GameBoard;
