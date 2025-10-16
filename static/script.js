const input = document.querySelector(".input-feild");
const typingtext = document.querySelector(".typing-text p");
const time = document.querySelector(".timeleft span");
const mistakes = document.querySelector(".mistakes span ");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");
let timer;
let maxtime = 60;
let charIndex = 0;
let timeleft = maxtime;
let mistake = 0;
let isTyping = false; 


function loadparagraphs() {
    const paragraph = [
        "The rhythmic crashing of waves against the shore calmed my restless thoughts. As the sun began to set, the ocean glowed with a beautiful, fiery orange light.",
        "I'll never forget the aroma of my grandmother's fresh-baked bread, a comforting smell that filled her small kitchen. The warm, yeasty scent instantly transports me back to my childhood summers.",
        "The city's skyline sparkled like a million diamonds scattered on a black velvet cloth. Below, the streets hummed with the constant, pulsing energy of a thousand different stories.",
        "The river's current flows slowly through the rocks, overcoming every obstacle in its path. It always moves toward its goal, without stopping, getting tired, or pausing.",
        "The vast blue sky of the day fills with orange and pink hues by evening. At night, it covers itself with a blanket of stars, taking on a calm and mysterious form.",
        "Old memories sometimes arrive like a gust of wind, and in an instant, everything becomes fresh again. They make us laugh and cry, but they always remain close to our hearts.",
        "A book is like a magic door, introducing us to new worlds and unseen stories. Every page takes us on a new journey, where we meet new characters and new ideas."
    ]   
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingtext.innerHTML="";
    for (const char of paragraph[randomIndex]){
        typingtext.innerHTML += `<span>${char}</span>`;  
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingtext.addEventListener('click',()=>input.focus());
}
function initTyping() {
    const char = typingtext.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeleft >0){
        if (!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }
        if (char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');  
            console.log("correct");
            
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect'); 
        }
        char.forEach(span => span.classList.remove("active"));
        charIndex++;
        if (charIndex < char.length) {
            char[charIndex].classList.add("active");
        }
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        finalresult();
    }
}
function initTime(){
    if(timeleft>0){
        timeleft--;
        time.innerText = timeleft;
        let wpmVal = Math.round(((charIndex - mistake) / 5 ) / (maxtime - timeleft) * 60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer); 
        finalresult();
    }
}
function reset(){
    loadparagraphs();
    clearInterval(timer);
    timeleft = maxtime;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    time.innerText = timeleft;
    gamebox.style.display = "block";
    input.style.display = "block";
    scoreBoard.style.display = "none";
}

function handleBackspace(e){
    const char = typingtext.querySelectorAll('span');
    if(e.key === 'Backspace'){
        e.preventDefault();
        if(charIndex > 0){
            charIndex--;
            input.value = input.value.slice(0,-1);
            char[charIndex].classList.remove('correct','incorrect');
            char.forEach(span => span.classList.remove("active"));
            char[charIndex].classList.add('active');
            mistakes.innerText = mistake;
            cpm.innerText = charIndex - mistake;
        }
    }
}
function finalresult(){
    const scoreBoard = document.getElementById("scoreBoard");
    const gamebox = document.querySelector(".typing-text");
    const content = document.querySelector(".content-box");
    let wpmVal = parseInt(wpm.innerText);
    gamebox.style.display = "none";
    input.style.display = "none";
    content.style.display = "none";
    scoreBoard.style.display = "block";

    if ( wpmVal>40 && wpmVal <= 100) {
        scoreBoard.innerText = `🏆 Wow! You Win! Your WPM: ${wpmVal}`;      
    } else if(wpmVal>20 && wpmVal <= 40) {
        scoreBoard.innerText = `💪 Don't give up — better luck next time! Your WPM: ${wpmVal}`;
    }else{
        scoreBoard.innerText = `😞 You Lose ! Your WPM: ${wpmVal}`;
    }
}
input.addEventListener("input",initTyping);
input.addEventListener("keydown",handleBackspace);
btn.addEventListener("click",reset);
loadparagraphs();

