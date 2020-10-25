document.body.style.backgroundColor = 'black'; 

class Game{
    constructor(starter, topL, topR, botL, botR){
        this.topL = topL;
        this.topR = topR;
        this.botL = botL;
        this.botR = botR
        this.sections = [this.topL, this.topR, this.botL, this.botR];
        this.starter = starter;
        this.sequence = [];
        this.starter.addEventListener('click', async ()=>{
            await this.startUp();
        });
    }
    startSequence = async (n) => {
        this.lockInputs(); console.log('input locked...');
        for(let i = 0; i < n; i++){
            let index = Math.floor(Math.random() * 4);
            let nextLight = this.sections[index].color;
            this.sequence.push(nextLight);
        }
        for(let i = 0; i < this.sequence.length; i++){
            await this.timer(100);
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
            await this.timer(500);
            classList.remove(classToAdd);
        }
        this.unlockInputs(); console.log('input unlocked...');
    }
    startUp = async() =>{
        this.lockInputs(); console.log('input locked...');
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
        this.unlockInputs();console.log('input unlocked...');
    }
    timer = async (ms)=>{
        return new Promise(res => setTimeout(res, ms));
    }
    lockInputs = async () =>{
        for(let s of this.sections){
            console.log(s);
            s.inputLocked = true;
        }
    }
    unlockInputs = async () =>{
        for(let s of this.sections){
            s.inputLocked = false;
        }
    }
}

class GameSection{
    constructor(el, color, inputLocked){
        this.el = el;
        this.color = color;
        this.inputLocked = inputLocked;
        this.el.addEventListener('click', ()=>{
            if(!this.inputLocked){
                this.buttonFlash(this.el, this.color);
            } 
        });
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
let topLeft = new GameSection(top_left, 'yellow', false);
let topRight = new GameSection(top_right, 'blue', false);
let botLeft = new GameSection(bot_left, 'red', false);
let botRight = new GameSection(bot_right, 'green', false);

let game = new Game(play_btn, topLeft, topRight, botLeft, botRight);


