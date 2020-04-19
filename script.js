const Player = (name) => {
    const getName = () => name;
    return { getName };
} 

const game = (() => {

    // Create modal for new game options

    const renderMenu = () => {
        let menu = document.getElementsByClassName("menu")[0];
        let menuOverlay = document.getElementsByClassName("menu-overlay")[0];
        switch(menu.style.display){
            case "none":
                menu.style.display = "block";
                menuOverlay.style.display = "block";
                break
            case "block":
                menu.style.display = "none";
                menuOverlay.style.display = "none";
                break
            default:
                menu.style.display = "block";
                menuOverlay.style.display = "block";
        }
    }

    // Create players one and two 

    const createPlayers = (playerOneInput, playerTwoInput) => {
        let playerOne = Player(playerOneInput.value);
        let playerTwo = Player(playerTwoInput.value);
        console.log(playerOne.getName());
        console.log(playerTwo.getName());
    }

    // Close modal and start game upon entering player names 

    const startGame = () => {
        let playerOneInput = document.getElementsByClassName('menu__player')[0];
        let playerTwoInput = document.getElementsByClassName('menu__player')[1];
        if(playerOneInput.value != "" && playerTwoInput.value != ""){
            renderMenu();
            createPlayers(playerOneInput, playerTwoInput);
        } else {
            console.log("Player names are required!");
        }
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
    newGameButton.addEventListener("click", renderMenu, false);

    // Menu button starts the game and closes menu

    let startGameButton = document.getElementsByClassName("menu__start")[0];
    startGameButton.addEventListener("click", startGame, false)

})();