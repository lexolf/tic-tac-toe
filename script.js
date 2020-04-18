const Player = (name) => {
    const getName = () => name;
    return { getName };
} 

const game = (() => {

    // Create modal for new game options

    const renderModal = () => {
        console.log('hey')
    }

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

    // Make new game button active

    let newGameButton = document.getElementsByClassName("game__button--new")[0];
    newGameButton.addEventListener("click", renderModal, false);

})();