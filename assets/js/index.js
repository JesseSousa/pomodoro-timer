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

sessionInput.addEventListener('click', function() {
    if (session === 'session') {
        counter = sessionInput.value * 60;
        timer.textContent = convertSeconds(counter);
    }
});

breakInput.addEventListener('click', function() {
    if (!(session === 'session')) {
        counter = breakInput.value * 60;
        timer.textContent = convertSeconds(counter);
    }
});

function changeSession() {
    if (session === 'session') {
        sessionTitle.textContent = 'Session';
        startButton.textContent = 'start session';
    } else {
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
