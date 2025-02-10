

//global varibale
const user1 = {
  move: '',
};
const user2 = {
  move: '',
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
  //gameLogic(user1, user2);
  //updateScoreboard(user1, user2, scoreboard);
  //saveScore(scoreboard);
  //displayUi(user1, user2, scoreboard);
}

function user2Pick(user2){
  const move = randomPick();
  console.log(move)
  user2.move = move
}