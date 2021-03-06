const timer = document.querySelector('#timer');
const sessionTitle = document.querySelector('#session-title');
const sessionInput = document.querySelector('#sessionInput');
const breakInput = document.querySelector('#breakInput');
const startButton = document.querySelector('#startTimer');
let counter;
let timerId;
let session = 'session';

let beep = new Audio('assets/js/sounds/BeepSound.wav');
beep.volume = 0.2;

if (session === 'session') {
    counter = sessionInput.value * 60;
} else {
    counter =  breakInput.value * 60;
}

startButton.addEventListener('click', startButtonEvent);

function startButtonEvent() {
    changeSession();
    switchPause();
    startCounter();
    startButton.removeEventListener('click', startButtonEvent, false);
}

function sessionInputFunction() {
    if (session === 'session') {
        if (sessionInput.value > 60) {
            sessionInput.value = 60;
            sessionInput.setAttribute('disabled', '');
        }
        counter = sessionInput.value * 60;
        timer.textContent = convertSeconds(counter);
    }
}

function breakInputFunction() {
    if (!(session === 'session')) {
        if (breakInput.value > 10) {
            breakInput.value = 10;
            breakInput.setAttribute('disabled', '');
        }
        counter = breakInput.value * 60;
        timer.textContent = convertSeconds(counter);
    }
}

sessionInput.addEventListener('input', sessionInputFunction);
breakInput.addEventListener('input', breakInputFunction);

function changeSession() {
    if (session === 'session') {
        if (sessionInput.value > 60) {
            sessionInput.value = 60;
        }
        sessionTitle.textContent = 'Session';
        startButton.textContent = 'start session';
    } else {
        if (breakInput.value > 15) {
            breakInput.value = 15;
        }
        sessionTitle.textContent = 'Break time';
        startButton.textContent = 'start break';
    }
}

function switchPause() {
    if (session === 'session') {
        startButton.textContent = 'pause session';
        startButton.addEventListener('click', function() {
            stopCounter();
            startButton.textContent = 'continue ' + session;
            startButton.addEventListener('click', startButtonEvent);
        });
    } else {
        startButton.textContent = 'pause break';
        startButton.addEventListener('click', function() {
            stopCounter();
            startButton.textContent = 'continue ' + session; 
            startButton.addEventListener('click', startButtonEvent);
        })
    }
}
