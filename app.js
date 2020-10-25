document.body.style.backgroundColor = 'black'; 

function timer(ms){
    return new Promise(res => setTimeout(res, ms));
}

class Game{
    constructor(starter, topL, topR, botL, botR){
        this.topL = topL;
        this.topR = topR;
        this.botL = botL;
        this.botR = botR
        this.sections = [this.topL, this.topR, this.botL, this.botR];
        this.starter = starter;
        this.sequence = [];
        this.inputLocked = true;

        this.starter.addEventListener('click', async ()=>{
            await this.startUp();
        })
    }
    startSequence = async (n) => {
        for(let i = 0; i < n; i++){
            let index = Math.floor(Math.random() * 4);
            let nextLight = this.sections[index].color;
            this.sequence.push(nextLight);
        }
        for(let i = 0; i < this.sequence.length; i++){
            await timer(100);
            let section;
            switch(this.sequence[i]){
                case 'yellow' : section = this.topL; break;
                case 'blue' : section = this.topR; break;
                case 'red' : section = this.botL; break;
                case 'green' : section = this.botR; break;
            }
            let {classList} = section.el;
            let classToAdd = 'lightup-'+section.color;
            classList.add(classToAdd);
            await timer(500);
            classList.remove(classToAdd);
        }
    }
    startUp = async() =>{
        for(let i = 0; i < 4; i++){
            let color = this.sections[i].color;
            for(let j = 0; j < 4; j++){ 
                let s = this.sections[j];
                let {classList} = s.el;
                classList.add('lightup-'+color);
                await this.timer(150);
                classList.remove('lightup-'+color);
            }
        }
        for(let i = 0; i < 3; i++){
            await this.timer(150);
            for(let s of this.sections){
                s.el.classList.add('lightup-green');
            }
            await this.timer(500);
            for(let s of this.sections){
                s.el.classList.remove('lightup-green');
            }
        }
        await this.startSequence(3);
    }
    timer = async (ms)=>{
        return new Promise(res => setTimeout(res, ms));
    }
}

class GameSection{
    constructor(el, color){
        this.el = el;
        this.color = color;
        this.el.addEventListener('click', this.buttonFlash.bind(null, this.el, this.color), false);
    }
    buttonFlash = (el) =>{
        let newClass = 'lightup-'+ this.color;
        if(!el.classList.contains(newClass)){
            el.classList.add(newClass);
        }
        setTimeout(()=>{
            el.classList.remove(newClass);
        }, 250);
    }
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

let game = new Game(play_btn, topLeft, topRight, botLeft, botRight);


