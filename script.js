const Player = (name) => {
    const getName = () => name;
    return { getName };
} 

const game = (() => {

    // Make current player string editable
    let gamePlayer = document.getElementsByClassName("game__player")[0];

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
        let overlay = document.getElementsByClassName("overlay")[0];
        switch(menu.style.display){
            case "none":
                menu.style.display = "block";
                overlay.style.display = "block";
                break
            case "block":
                menu.style.display = "none";
                overlay.style.display = "none";
                break
            default:
                menu.style.display = "block";
                overlay.style.display = "block";
        }
    }

    const renderResult = (result) => {
        let resultDOM = document.getElementsByClassName("result")[0];
        let overlay = document.getElementsByClassName("overlay")[0];
        let resultContent = document.getElementsByClassName("result__content")[0];
        switch(resultDOM.style.display){
            case "none":
                resultDOM.style.display = "block";
                overlay.style.display = "block";
                break
            case "block":
                resultDOM.style.display = "none";
                overlay.style.display = "none";
                break
            default:
                resultDOM.style.display = "block";
                overlay.style.display = "block";
        }
        if(result === turn){
            resultContent.textContent = "It is a draw! Another try?"
        } else {
            resultContent.textContent = "Congratulations! " + result + " is the winner!"
        }
        gamePlayer.textContent = 'Click/Tap "NEW GAME" button to start.'
    }

    // Clear board 

    const clearBoard = () => {
        for(let i = 0; i < 9; i++){
            getCell(i).cell.textContent = "";
            fieldModel[i] = false;
            turn = 0;
        } 
    }

    // The players should be visible for the whole game (but not for players to openly edit)
    let playerOne, playerTwo
    
    // Close modal and start game upon entering player names 
    
    const startGame = () => {
        let playerOneInput = document.getElementsByClassName('menu__player')[0].value;
        let playerTwoInput = document.getElementsByClassName('menu__player')[1].value;
        if(playerOneInput != "" && playerTwoInput != ""){
            renderMenu();
            clearBoard();
            currentMark = 'X';
            playerOne = Player(playerOneInput);
            playerTwo = Player(playerTwoInput);
            gamePlayer.textContent = playerOne.getName() + ", this is your turn now!"
            fieldIsActive = true;
            return {playerOne, playerTwo}
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
            if(turn % 2 == 1){
                gamePlayer.textContent = playerTwo.getName() + ", this is your turn now!"
            } else if(turn % 2 == 0){
                gamePlayer.textContent = playerOne.getName() + ", this is your turn now!"
            }
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
                if(fieldModel[i] == 'X'){
                    renderResult(playerOne.getName())
                } else if(fieldModel[i] == 'O'){
                    renderResult(playerTwo.getName())
                }
                fieldIsActive = false;
        } else if(turn == 9 && fieldIsActive){
            renderResult(turn)
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

    let confirmResultsButton = document.getElementsByClassName("result__confirm")[0];
    confirmResultsButton.addEventListener("click", renderResult, false)

})();