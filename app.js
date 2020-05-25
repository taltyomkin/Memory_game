let cards, choosenCards = [];
let matchCount;
const first = document.querySelector('#first');
const second = document.querySelector('#second');
const third = document.querySelector('#third');
const records = [];

let content = [
   {icon:'👹', id: 1}, {icon:'👹', id: 2},
   {icon:'👺', id: 3}, {icon:'👺', id: 4},
   {icon:'👽', id: 5}, {icon:'👽', id: 6},
   {icon:'💀', id: 7}, {icon:'💀', id: 8},
   {icon:'🤖', id: 9}, {icon:'🤖', id: 10},
   {icon:'🤡', id: 11}, {icon:'🤡', id: 12},
];

let shuffleContenet = content => content.sort(() => 0.5 - Math.random())

let board = document.querySelector('.board');

const createCards = content => {
   shuffleContenet(content);
    for(let i = 0; i < content.length; i++) {
        board.innerHTML += `<div class="flip-card">
                             <div id=${content[i].id} class="flip-card-inner">
                                 <div class="flip-card-front">
                                     <span class="icon">${content[i].icon}</span>
                                 </div>
                                 <div class="flip-card-back">
                                    <span class="icon">⚜️</span>
                                 </ div>
                             </div>
                           </div>`;
    }
    cards = board.querySelectorAll('.flip-card-inner'); 
}

const DeleteCards = () => {
   board.innerHTML = '';
}

const showCard = a => {
   if (a.children[0].classList.value === 'flip-card-front seccess') {
      return
   } else {
      if (!choosenCards.length || choosenCards[0].id !== a.id && choosenCards.length === 1){
         choosenCards.push(a);
         a.classList.remove('setCards');
         a.classList.add('flip');
      }
   }
   
   if (choosenCards.length == 2){
      if (choosenCards[0].innerText === choosenCards[1].innerText){
         choosenCards.forEach(match => {
            let goodFit = match.querySelector('.flip-card-front')
            goodFit.classList.add('seccess');
            })
         } else {
         setTimeout(() => cardDontMatch(),800);
      }
      setTimeout(() => choosenCards.length = 0 ,801);
      
      if(a.children[0].classList.contains('seccess')) {
         matchCount += 1;
         if(matchCount === 6){
            clearInterval(timer);
            let score = min.innerText.concat(' : ',sec.innerText);
            records.push(score);
            records.sort();
            first.innerHTML =  records[0] || '00 : 00';
            second.innerHTML = records[1] || '00 : 00';
            third.innerHTML = records[2] || '00 : 00';
            console.log('records',typeof(records), records);
         }
      }

   }
}

const cardDontMatch = () => {
   choosenCards.forEach(match => {
      match.classList.remove('flip');
      match.classList.add('setCards')
   });
}

const setCards = () => {
   DeleteCards();
   createCards(content);

   matchCount = 0;

   for( let i = 0; i < cards.length; i++) {
         setTimeout( () => {
         cards[i].classList.add('setCards');
         cards[i].addEventListener('click', () => showCard(cards[i]));
      },i*100);
   }

   clearInterval(timer);
   totSec = 0;
   sec.innerHTML = '00';
   min.innerHTML = '00';
   timer = setInterval(() => setTime(),1000); 
}

createCards(content);

let min = document.getElementById('min');
let sec = document.getElementById('sec');
let timer;

const setTime = () => {
   ++totSec;
   sec.innerHTML = pad(totSec%60);
   min.innerHTML = pad(parseInt(totSec/60));
}

const pad = val => {
   let valString = val + '';
   if(valString.length < 2){
      return 0 + valString;
   } else {
      return valString;
   }
}








