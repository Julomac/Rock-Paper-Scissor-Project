

//global varibale
const user1 = {
  move: '',
  hasWon: false
};
const user2 = {
  move: '',
  hasWon: false
};
const scoreboard = {
  win: 0,
  lost: 0,
  tie: 0 
};
let intervalID = '';



//Event Listener Section
document.addEventListener('click', (event) =>{
  if(event.target.classList.contains('rock')){
    console.log('Rock');
  }
  if(event.target.classList.contains('paper')){
    console.log('paper');
  }
  if(event.target.classList.contains('scissors')){
    console.log('scissors');
  }
  if(event.target.classList.contains('resetScore')){
    console.log('reset score');
  }
  if(event.target.classList.contains('autoPlay')){
    console.log('Auto Play');
  }
})
document.addEventListener('keydown', (event)=>{

  if (event.key === 'r'){
    console.log('r: rock')
  }
  if (event.key === 'p'){
    console.log('p: paper')
  }
  if (event.key === 's'){
    randomPick();
  }
});
//End of event Listener

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
  //updateScoreboard(user1, user2, scoreboard);
  //saveScore(scoreboard);
  //displayUi(user1, user2, scoreboard);
}
function user2Pick(user2){
  const move = randomPick();
  console.log(move)
  user2.move = move
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
  user1.hasWon = winCondition[user1.move] = user2.move;
  user2.hasWon = !user1.hasWon; 
};
