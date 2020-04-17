const Player = (name) => {
    const getName = () => name;
    return { getName };
} 

const game = (() => {

    // Add ability to find a specific cell on the board

    const getCell = (index) => {
        let cells = document.getElementsByClassName("game__cell");
        let cell = cells[index];
        return { cell }
    }

    // Mark cell with symbol

    const mark = (i) => {
        getCell(i).cell.textContent = "X";
    }

    // Make every cell responsive to user input 
    
    for(let i = 0; i < 9; i++){
        getCell(i).cell.addEventListener("click", e = () => {mark(i)});
    }
})();