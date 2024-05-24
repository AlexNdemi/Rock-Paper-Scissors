const GAME_DIV = document.querySelector('.gameDiv');
const BUTTONS_DIV = GAME_DIV.querySelector('.buttons-div')
const GAME_RULES = {rock:"scissors",scissors:"paper",paper:"rock"};
const RECORD_DIV = GAME_DIV.querySelector('.record');
const COMPUTER_CHOICES = new Array('rock','paper','scissors');
const RESET_BUTTON = GAME_DIV.querySelector('.reset')
let   record = {"wins":0,"losses":0,"draws":0};
BUTTONS_DIV.addEventListener('click',function(event){
  if(!event.target.closest('button')) return
  let userPick = event.target.dataset.move;
  let computerPick = COMPUTER_CHOICES[Math.floor(Math.random() * COMPUTER_CHOICES.length)];
  console.log(userPick,computerPick);
  playGame(userPick,computerPick)
})
RESET_BUTTON.addEventListener('click',function(){
  resetGame();
  renderRecordDiv();
})
function playGame(userPick,computerPick){
  let result;
   if(GAME_RULES[userPick] === computerPick){
    record['wins']+=1;
    result = `You picked ${userPick}.Computer picked ${computerPick}.You win'`
    saveRecord();
    renderRecordDiv(result);
    return;
   }
   if(userPick === computerPick){
    record['draws']+=1;
    saveRecord();
    result =`You picked ${userPick}.Computer picked ${computerPick}.The outcome was a Draw'`;
    renderRecordDiv(result);
    return;
   }else{
    record['losses']+=1;
    saveRecord();
    result = `You picked ${userPick}.Computer picked ${computerPick}.The computer won'`
    renderRecordDiv(result);
    return;
   }
   
}
function renderRecordDiv(result){
  RECORD_DIV.innerHTML='';
  let previousRecord = JSON.parse(localStorage.getItem('rps-game-records'));
  if(record && isObject(previousRecord)){
    record=previousRecord
  }else{
    record = {"wins":0,"losses":0,"draws":0};
  }
    const paragraph = document.createElement('p');
    const paragraph1= document.createElement('p');
    paragraph1.textContent=result;

    const winsSpan = document.createElement('span');
    winsSpan.setAttribute('class','wins');
    winsSpan.textContent = `Wins:${record['wins']}, `

    const drawsSpan = document.createElement('span');
    drawsSpan.setAttribute('class','draws');
    drawsSpan.textContent = `Draws:${record['draws']}, `;

    const lossesSpan = document.createElement('span');
    lossesSpan.setAttribute('class','losses');
    lossesSpan.textContent = `Losses:${record['losses']},`;

    paragraph.appendChild(winsSpan);
    paragraph.appendChild(drawsSpan);
    paragraph.appendChild(lossesSpan);

    RECORD_DIV.appendChild(paragraph1);
    RECORD_DIV.appendChild(paragraph);
}

function isObject(obj) {
  	return typeof obj === 'object' && obj !== null && ! Array.isArray(obj)
};
function saveRecord(){
  localStorage.setItem('rps-game-records',JSON.stringify(record));
}
function resetGame(){
  record = null;
  localStorage.removeItem('ps-game-records');
  result='';
}
renderRecordDiv();
