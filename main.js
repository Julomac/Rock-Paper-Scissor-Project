

//global varibale
const user1 = {
  move: '',
  hasWon: false
};
const user2 = {
  move: '',
  hasWon: false
};
const savedScore = localStorage.getItem('score');
const scoreboard =  savedScore ? JSON.parse(savedScore) : {
  wins: 0,
  losses: 0,
  ties: 0 
};





//Event Listener Section
document.addEventListener('click', (event) =>{
  if(event.target.classList.contains('rock')){
    user1Pick(user1, user2, 'rock', scoreboard)
  }
  if(event.target.classList.contains('paper')){
    user1Pick(user1, user2, 'paper', scoreboard)
  }
  if(event.target.classList.contains('scissors')){
    user1Pick(user1, user2, 'scissors', scoreboard)
  }
  if(event.target.classList.contains('resetScore')){
    resetScore(scoreboard, user1, user2);
    
  }
  if(event.target.classList.contains('autoPlay')){
    autoPlay(user1, user2, scoreboard);
  }
})
document.addEventListener('keydown', (event)=>{

  if (event.key === 'r'){
    user1Pick(user1, user2, 'rock', scoreboard)
  }
  if (event.key === 'p'){
    user1Pick(user1, user2, 'paper', scoreboard)
  }
  if (event.key === 's'){
    user1Pick(user1, user2, 'scissors', scoreboard)
  }
});
//End of event Listener

displayUi(user1, user2, scoreboard);

// Choses a random move
function randomPick(){
  const number = Math.random();
  if(number < 1/3){
    return 'rock';
  }else if (number < 2/3){
    return 'paper';
  }else{
    return 'scissors'
  }
};

function user1Pick(user1, user2, move, scoreboard){
  user1.move = move;

  user2Pick(user2);
  gameLogic2(user1, user2);
  updateScoreboard(user1, user2, scoreboard);
  saveScore(scoreboard);
  displayUi(user1, user2, scoreboard);
}
function user2Pick(user2){
  const move = randomPick();
  user2.move = move;
}

/*
//original game logic
function gameLogic(user1, user2){
  if (user1.move === user2.move){
    user1.hasWon = false;
    user2.hasWon = false;
  }else if ((user1.move === 'rock' && user2.move === 'scissors')||
            (user1.move === 'paper' && user2.move === 'rock')||
            (user1.move === 'scissors' && user2.move === 'paper')){
              user1.hasWon = true;
              user2.hasWon = false;
  }else{
    user1.hasWon = false;
    user2.hasWon = true;
  }
};
*/
//this is the better way of doing the game logic
function gameLogic2(user1, user2){
  if (user1.move === user2.move){
    user1.hasWon = false;
    user2.hasWon = false;
    return;
  }
  const winCondition = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  }
  user1.hasWon = (winCondition[user1.move] === user2.move);
  user2.hasWon = !user1.hasWon; 
};
function updateScoreboard(user1, user2, scoreboard){
  if(user1.hasWon){
    scoreboard.wins += 1;
  }else if(user2.hasWon){
    scoreboard.losses += 1 ;
  }else{
    scoreboard.ties += 1;
  }
};

function displayUi(user1,user2, scoreboard){
  const resultHTML = document.querySelector('.resultContainer')
  const scoreboardHTML = document.querySelector('.scoreboard')
  if (user1.move === '' && user2.move === ''){
    resultHTML.innerHTML = 
      `<p>Chose a move to Play the game or click Auto Play</p>`;
  }else if (user1.hasWon){
    resultHTML.innerHTML = 
      `<p>You Picked <img src="/images/${user1.move}.png"> and the bot pick <img src="/images/${user2.move}.png"></p>
      <p>You Won!</p>`;
  }else if (user2.hasWon){
    resultHTML.innerHTML = 
      `<p>You Picked <img src="/images/${user1.move}.png"> and the bot pick <img src="/images/${user2.move}.png"></p>
      <p>You Lost!</p>`;
  }else{
    resultHTML.innerHTML = 
      `<p>You Picked <img src="/images/${user1.move}.png"> and the bot pick <img src="/images/${user2.move}.png"></p>
      <p>It's a tie!</p>`;
    }
      scoreboardHTML.innerHTML = 
      `<p>Wins: ${scoreboard.wins} Loses:${scoreboard.losses} Ties: ${scoreboard.ties}</p>`;
};

function resetScore(scoreboard, user1, user2){
  scoreboard.wins = 0;
  scoreboard.losses = 0;
  scoreboard.ties = 0;
  
  user1.move = '';
  user2.move = '';

  

  localStorage.removeItem('score');

  clearInterval(intervalID);
  isRunning = false
  
  displayUi(user1, user2, scoreboard);

}

function saveScore(scoreboard){
  localStorage.setItem('score', JSON.stringify(scoreboard))
}

let isRunning = false; 
let intervalID = '';

function autoPlay(user1, user2, scoreboard){
    isRunning = !isRunning;
    if(isRunning){
      intervalID = setInterval(()=>{
        user1.move = randomPick();
        user2Pick(user2);
        gameLogic2(user1, user2);
        updateScoreboard(user1, user2, scoreboard);
        saveScore(scoreboard);
        displayUi(user1, user2, scoreboard);
      },500)
    }else{
      clearInterval(intervalID);
    }
};