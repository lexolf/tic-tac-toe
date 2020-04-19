const Player = (name) => {
    const getName = () => name;
    let willGoNext = false;
    let switchTurn = () => {
        switch(willGoNext){
            case false: 
                willGoNext = true;
                break;
            case true: 
                willGoNext = false;
                break;
        }
    }
    return { getName, switchTurn };
} 

const game = (() => {

    // Keep track of turns
    let turn = 0;

    // The first player will always go with 'X'
    let currentMark = 'X';

    // Game field is innactive at the start

    let fieldIsActive = false;

    // create field model to avoid HTMl source code manipulation

    let fieldModel = [
        false, false, false,
        false, false, false,
        false, false, false
    ]

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

    // Clear board 

    const clearBoard = () => {
        for(let i = 0; i < 9; i++){
            getCell(i).cell.textContent = "";
            fieldModel[i] = false;
            turn = 0;
        } 
    }


    // Create players one and two 

    const createPlayers = (playerOneInput, playerTwoInput) => {
        let playerOne = Player(playerOneInput.value);
        playerOne.switchTurn();
        let playerTwo = Player(playerTwoInput.value);
    }

    // Close modal and start game upon entering player names 

    const startGame = () => {
        let playerOneInput = document.getElementsByClassName('menu__player')[0];
        let playerTwoInput = document.getElementsByClassName('menu__player')[1];
        if(playerOneInput.value != "" && playerTwoInput.value != ""){
            renderMenu();
            clearBoard();
            createPlayers(playerOneInput, playerTwoInput);
            fieldIsActive = true;
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

    // Set current marking symbol depending on turn

    const switchMark = (symbol) => {
        switch(symbol){
            case 'O':
                return 'X';
            case 'X':
                return 'O';
        }
    }

    // Mark cell with symbol

    const mark = (i) => {
        if(fieldIsActive && !fieldModel[i]){
            getCell(i).cell.textContent = currentMark;
            fieldModel[i] = currentMark;
            currentMark =  switchMark(currentMark);
            turn++;
            checkIfWon(i);
        }
    }

    // Check if the game is won by turn end 
    const checkIfWon = (i) => {
        if(
            (i == 0) && (
                (fieldModel[0] == fieldModel[1] && fieldModel[0] == fieldModel[2])
                || (fieldModel[0] == fieldModel[3] && fieldModel[0] == fieldModel[6])
                || (fieldModel[0] == fieldModel[4] && fieldModel[0] == fieldModel[8])
            ) 
            || (i == 1) && (
                (fieldModel[1] == fieldModel[0] && fieldModel[1] == fieldModel[2])
                || (fieldModel[1] == fieldModel[4] && fieldModel[1] == fieldModel[7])
            )
            || (i == 2) && (
                (fieldModel[0] == fieldModel[1] && fieldModel[0] == fieldModel[2])
                || (fieldModel[2] == fieldModel[5] && fieldModel[2] == fieldModel[8])
                || (fieldModel[2] == fieldModel[4] && fieldModel[2] == fieldModel[6])
            )
            || (i == 3) && (
                (fieldModel[0] == fieldModel[3] && fieldModel[0] == fieldModel[6])
                || (fieldModel[3] == fieldModel[4] && fieldModel[3] == fieldModel[6])
            )
            || (i == 4) && (
                (fieldModel[0] == fieldModel[4] && fieldModel[0] == fieldModel[8])
                || (fieldModel[1] == fieldModel[4] && fieldModel[1] == fieldModel[7])
                || (fieldModel[2] == fieldModel[4] && fieldModel[2] == fieldModel[6])
                || (fieldModel[3] == fieldModel[4] && fieldModel[3] == fieldModel[5])
            )
            || (i == 5) && (
                (fieldModel[2] == fieldModel[5] && fieldModel[2] == fieldModel[8])
                || (fieldModel[3] == fieldModel[4] && fieldModel[3] == fieldModel[5])
            )
            || (i == 6) && (
                (fieldModel[0] == fieldModel[3] && fieldModel[0] == fieldModel[6])
                || (fieldModel[6] == fieldModel[7] && fieldModel[6] == fieldModel[8])
                || (fieldModel[6] == fieldModel[4] && fieldModel[6] == fieldModel[2])
            )
            || (i == 7) && (
                (fieldModel[1] == fieldModel[4] && fieldModel[1] == fieldModel[7])
                || (fieldModel[6] == fieldModel[7] && fieldModel[6] == fieldModel[8])
            )
            || (i == 8) && (
                (fieldModel[2] == fieldModel[5] && fieldModel[2] == fieldModel[8])
                || (fieldModel[0] == fieldModel[4] && fieldModel[0] == fieldModel[8])
                || (fieldModel[6] == fieldModel[7] && fieldModel[6] == fieldModel[8])
            )
        ){
                console.log('won through' + getCell(i).cell.classList);
                fieldIsActive = false;
        } else if(turn == 9){
            console.log('draw');
            fieldIsActive = false;
        }
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