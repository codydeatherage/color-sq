document.body.style.backgroundColor= 'black';

function getRandomColor(){
    return '#' + parseInt(Math.random() * 0xffffff).toString(16);
}

function clearColors(el){
    let classes = [...el.classList];
    if(classes.includes('light-red')){
        el.classList.remove('light-red');
    }
    if(classes.includes('light-blue')){
        el.classList.remove('light-blue');
    }
    if(classes.includes('light-yellow')){
        el.classList.remove('light-yellow');
    }
    if(classes.includes('light-green')){
        el.classList.remove('light-green');
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
    }, 1000);
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

let squares = [top_left, top_right,bot_right, bot_left];
const colors = ['yellow', 'blue', 'green', 'red',];
for(let i = 0; i < squares.length;i++){
    let s = squares[i];
    s.addEventListener('click', buttonFlash.bind(null, s, colors[i]), false);
}

function timer(ms){
    return new Promise(res => setTimeout(res, ms));
}

async function startUp(segment, lights){
    for(let i = 0; i < squares.length; i++){
        for(let j = 0; j < squares.length; j++){ 
            let s = segment[j];
            //console.log(s);
            s.classList.add(lights[i]);
            await timer(100);
            s.classList.remove(lights[i]);
        }
    }

    for(let i = 0; i < 3; i++){
        await timer(50);
        for(let s of segment){
            s.classList.add('light-green');
        }
        await timer(500);
        for(let s of segment){
            s.classList.remove('light-green');
        }
    }
}
play_btn.addEventListener('click', async ()=>{
    const top_left = document.getElementById('top-left');
    const bot_left = document.getElementById('bot-left');
    const top_right = document.getElementById('top-right');
    const bot_right = document.getElementById('bot-right');
    let lights = ['light-yellow', 'light-blue', 'light-red', 'light-green'];
    let squares = [top_left, top_right, bot_right, bot_left];
    await startUp(squares, lights);
})

