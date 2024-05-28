const GAME_DIV = document.querySelector('.gameDiv');
const EMOJIS_DIV = GAME_DIV.querySelector('.emojis-div')
const GAME_RULES = {rock:"scissors",scissors:"paper",paper:"rock"};
const RECORD_DIV = GAME_DIV.querySelector('.record');
const COMPUTER_CHOICES = new Array('rock','paper','scissors');
const RESET_BUTTON = GAME_DIV.querySelector('.reset')
let   record = {"wins":0,"losses":0,"draws":0};
let outcome;
let playerChoices;
EMOJIS_DIV.addEventListener('click',function(event){
  const imageContainer = event.target.closest('.image-container');
  if (!imageContainer) return;

  let userPick = imageContainer.dataset.move;
  console.log(userPick)
  let computerPick = COMPUTER_CHOICES[Math.floor(Math.random() * COMPUTER_CHOICES.length)];
  console.log(userPick,computerPick);
  playGame(userPick,computerPick);
})
RESET_BUTTON.addEventListener('click',function(){
  resetGame();
  renderRecordDiv();
})
function playGame(userPick,computerPick){
  playerChoices  = `You picked<img src=images/${userPick}-emoji.png> Computer picked<img src=images/${computerPick}-emoji.png>`
   if(GAME_RULES[userPick] === computerPick){
    record['wins']+=1;
    outcome = 'You win';
    saveRecord();
    renderRecordDiv(outcome,playerChoices);
    return;
   }
   if(userPick === computerPick){
    record['draws']+=1;
    outcome = 'The outcome was a Draw';
    saveRecord();
    renderRecordDiv(outcome,playerChoices);
    return;
   }else{
    record['losses']+=1;
    outcome = 'The computer won';
    saveRecord();
    renderRecordDiv(outcome,playerChoices);
    return;
   }
   
}
function renderRecordDiv(outcome,playerChoices){
  RECORD_DIV.innerHTML='';
  let previousRecord = JSON.parse(localStorage.getItem('rps-game-records'));
  if(record && isObject(previousRecord)){
    record=previousRecord
  }else{
    record = {"wins":0,"losses":0,"draws":0};
  }
    if( playerChoices && outcome ){
      const outcomeParagraph = document.createElement('p');
      outcomeParagraph.setAttribute('class','outcome')
      const paragraph1= document.createElement('p');
      outcomeParagraph.textContent=outcome;
      paragraph1.innerHTML=playerChoices;
      RECORD_DIV.appendChild(outcomeParagraph);
      RECORD_DIV.appendChild(paragraph1);
    }
    const historyDiv = document.createElement('div');
    historyDiv.setAttribute('class','history')
    
    const recordsTitle = document.createElement('h2');
    recordsTitle.setAttribute('class','record-title');
    recordsTitle.textContent = 'Record' 

    const winsSpan = document.createElement('span');
    winsSpan.setAttribute('class','wins');
    winsSpan.textContent = `Wins:${record['wins']}, `;

    const drawsSpan = document.createElement('span');
    drawsSpan.setAttribute('class','draws');
    drawsSpan.textContent = `Draws:${record['draws']}, `;

    const lossesSpan = document.createElement('span');
    lossesSpan.setAttribute('class','losses');
    lossesSpan.textContent = `Losses:${record['losses']},`;


    historyDiv.appendChild(recordsTitle);
    historyDiv.appendChild(winsSpan);
    historyDiv.appendChild(drawsSpan);
    historyDiv.appendChild(lossesSpan);
    
    
    RECORD_DIV.appendChild(historyDiv);
}

function isObject(obj) {
  	return typeof obj === 'object' && obj !== null && ! Array.isArray(obj)
};
function saveRecord(){
  localStorage.setItem('rps-game-records',JSON.stringify(record));
}
function resetGame(){
  record = null;
  outcome = null;
  localStorage.removeItem('ps-game-records');
  playerChoices ='';
}
renderRecordDiv();
