const mousetable = Array.from(document.getElementsByClassName('box'));

// MouseOver & mouseOut for each box
mousetable.forEach(box => {
    box.addEventListener('mouseover', myfunction1);
    box.addEventListener('mouseout', myfunction2); 
});

// Set the background image+color on mouseover for empty boxes.
function myfunction1() {
    if (!this.classList.contains('boxComputer')) { 
        this.style.backgroundImage = "url('img/o.svg')"; // Set the image.
    }
}

// Reset box to deafult background on mouseOut if box not occipied.
function myfunction2() { 
    if (!this.classList.contains('boxComputer')) { 
        this.style.backgroundImage = ''; 
    }
}


// Game table to play on.
const table = Array.from(document.querySelectorAll('.box'));
let currenP = 'x'; // Player 'x' (boxCmputer) start
let movesPlayed = []; // counter 

const winnCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle the computer's move
function computerMove() {
    const availableMoves = table
        .map((box, index) => (box.classList.contains('boxHuman') || box.classList.contains('boxComputer')) ? null : index)
        .filter(index => index !== null);

    // Check if there are available moves before 'x' move
      //Set Timeout to prevent alert before classList is added.
     //Same for  ALL  winn & draw check  to add classList berfore winn/draw alert's.
    if (availableMoves.length === 0) {
        setTimeout(() => {
        alert("It's a draw! \n Restart?");
        restart();
         }, 200);
        return; // If it's a draw
    }

    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    table[move].classList.add('boxComputer');
    movesPlayed.push(move);

    // Check for winner after computer's move
    if (checkWinner()) {
        setTimeout(() => {
        alert(currenP + " wins! Restart?");
        restart();
         }, 300);
        return;
    }
 // Check for draw after computer's move
    const remainingMoves = table
        .map((box, index) => (box.classList.contains('boxHuman') || box.classList.contains('boxComputer')) ? null : index)
        .filter(index => index !== null);

    if (remainingMoves.length === 0) {
        setTimeout(() => {
            alert("It's a draw! Restart?");
            restart();
        }, 200);
        return;
    }
    // Switch,Now it's the human's turn
    currenP = 'o'; 
}

// Add Event listener to each box.
table.forEach(box => {
    box.addEventListener('click', myfunction);
    box.addEventListener('touchstart', myfunction); // touchstart for iPhone
});

// Function to handle human's move
function myfunction(e) {
    const boxArr = Array.from(document.getElementsByClassName('box'));
    const index = boxArr.indexOf(e.target);

    // If box is already clicked (occupied), ignore the click
    if (table[index].classList.contains('boxHuman') || table[index].classList.contains('boxComputer')) {
        return; 
    }

    // Player 'O' move
    if (currenP === 'o') {
        table[index].classList.add('boxHuman'); 
        movesPlayed.push(index);

// Check for winner
if (checkWinner()) {
    setTimeout(() => {
     //Timeout to prevent alert to popoup before classList is added.
        alert(currenP + " wins! Restart?");
        restart();
    }, 200);     
    return;
}

    // Switch to the next player
        currenP = 'x'; // Now it's the computer's turn
        setTimeout(computerMove, 200); // Delay computer's move by 200ms
    }
}

// Function to check the winner
function checkWinner() {
    for (let combo of winnCombos) {
        const boxes = combo.map(index => table[index]);
        const classes = boxes.map(box => box.classList.value);
        if (classes.every(cls => cls === 'box boxHuman') || classes.every(cls => cls === 'box boxComputer')) {
            return true;
        }
    }
    return false;
}

// Restart game easy and safe way: 
function restart() {
    window.location.reload(); // Reload page to reset game.
}

// Start the game with a computer move after 2 seconds
window.onload = function() {
    setTimeout(computerMove, 1500); // Delay...simulate computer is " thinking "


}
