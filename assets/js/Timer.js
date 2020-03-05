function convertSeconds(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;

    if (sec < 10) {
        sec = '0' + sec;
    }
    if (min < 10) {
        min = '0' + min;
    }

    return min + ':' + sec;
}

function count() {
    counter--;
    timer.textContent = convertSeconds(counter);
    if (counter < 1) {
        session = (session === 'session') ? session = 'break' : session = 'session';
        beep.play();
        startButton.addEventListener('click', startButtonEvent); 
        changeSession();
        if (session === 'session') {
            counter = sessionInput.value * 60;
        } else {
            counter =  breakInput.value * 60;
        }

        sessionInput.removeAttribute('disabled');
        breakInput.removeAttribute('disabled');
        
        timer.textContent = convertSeconds(counter);
        stopCounter();
    }
}

function startCounter() {
    sessionInput.setAttribute('disabled', '');
    breakInput.setAttribute('disabled', '');
    timerId = setInterval(count, 1000);
}

function stopCounter() {
        clearInterval(timerId);
}