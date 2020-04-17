const Player = (name) => {
    const getName = () => name;
    const markSymbol = () => 'X';
    const canMark = () => {}
    const changeTurn = canMark => {
        canMark = !canMark;
    };
    return { getName };
} 

const game = (() => {
    const getCell = (index) => {
        let cells = document.getElementsByClassName("game__cell");
        let cell = cells[index];
        return { cell }
    };

    for(let i = 0; i < 9; i++){
        getCell(i).cell.addEventListener("click", e = () => {alert("Clicked" + getCell(i).cell.classList)});
    }

    return {getCell}
})();