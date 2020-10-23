document.body.style.backgroundColor= 'black';

function getRandomColor(){
    return '#' + parseInt(Math.random() * 0xffffff).toString(16);
}

function changeColor(el){
    let color = getRandomColor();
    el.innerText = color;
    el.style.backgroundColor = color;
}

const top_left = document.getElementById('top-left');
const bot_left = document.getElementById('bot-left');
const top_right = document.getElementById('top-right');
const bot_right = document.getElementById('bot-right');

let squares = [top_left, bot_left, top_right, bot_right];
for(let s of squares){
    s.addEventListener('click', changeColor.bind(null, s), false);
}
