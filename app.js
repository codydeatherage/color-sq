
let doc = document.body;
doc.style.backgroundColor = 'black'; 
//const random = require('random');
function getRandomColor(){
    return '#' + parseInt(Math.random() * 0xffffff).toString(16);
}

class GameSection{
    constructor(el, color){
        this.el = el;
        this.color = color;
        this.el.addEventListener('click', this.buttonFlash.bind(null, this.el, color), false);
    }
    buttonFlash = (el) =>{
        let newClass = 'lightup-'+ this.color;
        console.log(newClass);
        //console.log('classes? ', classes);
        if(!el.classList.contains(newClass)){
            el.classList.add(newClass);
        }
        setTimeout(()=>{
            el.classList.remove(newClass);
        }, 250);
    }
}



function buttonFlash(el, color){
    let classes = [...el.classList];
    let newClass = ' ';
    switch(color){
        case 'yellow' : newClass = 'light-yellow'; break;
        case 'blue': newClass = 'light-blue'; break;
        case 'red' : newClass = 'light-red'; break;
        case 'green' : newClass = 'light-green'; break;
    }
    //console.log('classes? ', classes);
    if(!classes.includes(newClass)){
        el.classList.add(newClass);
    }
    setTimeout(()=>{
        el.classList.remove(newClass);
    }, 250);
}

function changeColor(el){
    let color = getRandomColor();
    el.style.backgroundColor = color;
}

const play_btn = document.querySelector('.fa-play-circle');
const top_left = document.getElementById('top-left');
const bot_left = document.getElementById('bot-left');
const top_right = document.getElementById('top-right');
const bot_right = document.getElementById('bot-right');
let topLeft = new GameSection(top_left, 'yellow');
let topRight = new GameSection(top_right, 'blue');
let botLeft = new GameSection(bot_left, 'red');
let botRight = new GameSection(bot_right, 'green');
let sequence = [];
let squares = [top_left, top_right,bot_right, bot_left];
const colors = ['yellow', 'blue', 'green', 'red'];
/* for(let i = 0; i < squares.length;i++){
    let s = squares[i];
    s.addEventListener('click', buttonFlash.bind(null, s, colors[i]), false);
} */
 
function timer(ms){
    return new Promise(res => setTimeout(res, ms));
}
/* async function startSequence(n){
    const top_left = document.getElementById('top-left');
    const bot_left = document.getElementById('bot-left');
    const top_right = document.getElementById('top-right');
    const bot_right = document.getElementById('bot-right'); 
    for(let i = 0; i < n; i++){
        let lights = ['yellow', 'red', 'blue', 'green'];
        let index = Math.floor(Math.random() * lights.length);
        console.log(index);
        let nextLight = lights[index];
        sequence.push(nextLight);
    }
    console.log(sequence);
    for(let s of sequence){
        await timer(100);
        //console.log(s);
        let id = '', classToAdd = '';
        switch(s){
            case 'yellow' : id = 'top-left'; classToAdd = 'light-yellow'; break;
            case 'blue': id = 'top-right'; classToAdd = 'light-blue'; break;
            case 'red' : id = 'bot-left'; classToAdd = 'light-red'; break;
            case 'green' : id = 'bot-right'; classToAdd = 'light-green'; break;
        }
        let el = document.getElementById(id);
        el.classList.add(classToAdd);
        await timer(500);
        el.classList.remove(classToAdd);
    }
} */
/* async function startUp(segment, lights){
    for(let i = 0; i < squares.length; i++){
        for(let j = 0; j < squares.length; j++){ 
            let s = segment[j];
            //console.log(s);
            s.classList.add(lights[i]);
            await timer(75);
            s.classList.remove(lights[i]);
        }
    }

    for(let i = 0; i < 3; i++){
        await timer(150);
        for(let s of segment){
            s.classList.add('light-green');
        }
        await timer(500);
        for(let s of segment){
            s.classList.remove('light-green');
        }
    }
    await startSequence(3);
}
play_btn.addEventListener('click', async ()=>{
    const top_left = document.getElementById('top-left');
    const bot_left = document.getElementById('bot-left');
    const top_right = document.getElementById('top-right');
    const bot_right = document.getElementById('bot-right');
    let lights = ['light-yellow', 'light-blue', 'light-red', 'light-green'];
    let squares = [top_left, top_right, bot_right, bot_left];
    await startUp(squares, lights);
}) */

