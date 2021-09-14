const Player = function (mark) {
    let _mark = mark;

    const getMark = () => _mark;
    const setMark = (mark) => (_mark = mark);

    return { getMark, setMark };
};

export default Player;
