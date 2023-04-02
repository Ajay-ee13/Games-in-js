let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let winner = document.getElementById('result');
let winnerDeclared = false;
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


//check for winner
function checkWinner() {
    for (let i = 0; i < 8; i++) {
        var a = winCondition[i][0];
        var b = winCondition[i][1];
        var c = winCondition[i][2];

        if (gameState[a] == currentPlayer &&
            gameState[b] == currentPlayer &&
            gameState[c] == currentPlayer) {
            winnerDeclared = true; 
            winner.innerHTML = "Winner is " + currentPlayer;
        }
    }
}

//check for draw

function checkDraw() {
    if (!gameState.includes('') && !winnerDeclared)
        winner.innerHTML = "Game Draw";
}



function init() {
    var tdCells = document.getElementsByTagName('td');
    console.log(tdCells)

    for (let i = 0; i < 9; i++) {
        tdCells[i].addEventListener('click', (e) => {
            // console.log(e.target);
            let td = e.target;


            // check if target site is empty if yes then change gameState
            let index = td.getAttribute('index');
            console.log(index);
            if (gameState[index] === '') {
                td.innerHTML = currentPlayer;
                gameState[index] = currentPlayer;
                checkWinner();
                checkDraw();
                currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
            }
        })
    }
}

init()