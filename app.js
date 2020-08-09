/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//getting DOMS
const dice = document.querySelector(".dice");
const rollBtn = document.querySelector('.btn-roll');
const player1Total = document.getElementById("score-0");
const player1Current = document.getElementById("current-0");
const player2Total = document.getElementById("score-1");
const player2Current = document.getElementById("current-1");
const imgPath = "dice-";
const player1Panel = document.querySelector(".player-0-panel");
const player2Panel = document.querySelector(".player-1-panel");
const holdBtn = document.querySelector(".btn-hold");
const newGameBtn = document.querySelector(".btn-new");

// variables
var score = [0,0];
var roundScore = 0;
var activePlayer = 0;
var gameOver = false;
var previousRoll = 0;
var winScore = 100;
var firstTurn = true;

//functions
function randomNumber() {
    let number = Math.floor(Math.random()*2)+5;
    return number;
}

function rollDice(){
    if(firstTurn){
        firstTurn = false;
        document.getElementById("winScore").disabled = true;
        winScore = document.getElementById("winScore").value;
    }
    let temp = randomNumber();
    dice.style.display = "block";
    dice.src = imgPath+temp+".png";
    //console.log(temp);
    if(temp===1){
        swapTurns(0);
    }
    else if(previousRoll===temp && temp===6){
        eatPlayer();
        swapTurns(0);
    }
    else{
        roundScore += temp;
        previousRoll = temp;
        if(activePlayer){
            player2Current.textContent = roundScore;
        }
        else{
            player1Current.textContent = roundScore;
        }
    }
}

function eatPlayer(){
    score[activePlayer] = 0;
    if(activePlayer){
        player2Total.textContent = score[activePlayer];
    }
    else{
        player1Total.textContent = score[activePlayer];
    }
}

function swapTurns(manager){
    if(manager && gameOver===false){
        score[activePlayer] += roundScore;
        if(activePlayer){
            player2Total.textContent = score[activePlayer];
        }
        else{
            player1Total.textContent = score[activePlayer];
        }
        if(score[activePlayer]>=winScore){
            gameOver = true;
            let winner = "name-"+activePlayer;
            document.getElementById(winner).textContent="WINNER!";
            dice.style.display = "none";
            if(activePlayer){
                player2Panel.classList.add("winner");
                player2Panel.classList.remove("active");
            }
            else{
                player1Panel.classList.add("winner");
                player1Panel.classList.remove("active");
            }
            rollBtn.removeEventListener("click",rollDice);
        }
        else {
            player1Panel.classList.toggle("active");
            player2Panel.classList.toggle("active");
            player1Current.textContent = "0";
            player2Current.textContent = "0";
            dice.style.display = "none";
            activePlayer = activePlayer?0:1;
            roundScore = 0;
        }
    }
    else if(gameOver===false){
        player1Panel.classList.toggle("active");
        player2Panel.classList.toggle("active");
        player1Current.textContent = "0";
        player2Current.textContent = "0";
        dice.style.display = "none";
        activePlayer = activePlayer?0:1;
        roundScore = 0;
    }
}

function reset(){
    player1Current.textContent = "0";
    player1Total.textContent = "0";
    player2Current.textContent = "0";
    player2Total.textContent = "0";
    dice.style.display = "none";
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    player1Panel.classList.add("active");
    player2Panel.classList.remove("active");
    player1Panel.classList.remove("winner");
    player2Panel.classList.remove("winner");
    gameOver = false;
    document.getElementById("name-0").textContent="PLAYER 1";
    document.getElementById("name-1").textContent="PLAYER 2";
    rollBtn.addEventListener("click",rollDice);
    previousRoll = 0;
    document.getElementById("winScore").disabled = false;
    firstTurn = true;
}

holdBtn.addEventListener("click",function(){
                                            swapTurns(1);
                                                        });

newGameBtn.addEventListener("click",reset);

document.onload = reset();