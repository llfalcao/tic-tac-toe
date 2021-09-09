const GameBoard = (function () {
    let _board = [];

    const getBoard = () => _board;
    const placeMark = (position, mark) => (_board[position] = mark);

    return { getBoard, placeMark };
})();
