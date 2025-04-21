const startingMinutes = 3;
let time = localStorage.getItem('remainingTime') ? parseInt(localStorage.getItem('remainingTime')) : startingMinutes * 60;

const startButton = document.querySelector('.start-btn'); 
let timerInterval;

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    startButton.textContent = `${minutes}:${formattedSeconds}`;

    if (minutes === 0 && seconds < 21) {
        startButton.style.animation = "countdown 1s linear infinite";
    }

    if (time <= 0) {
        clearInterval(timerInterval); 

        startButton.innerHTML = 'Come Back to Tommorow!'

        game_started = false;

        document.getElementById('popup-title').textContent = "Time's Up!";
        document.getElementById('popup-content-1').textContent = "Congratulations, the Game is Over!";
        document.getElementById('popup-content-2').textContent = "Your score is " + localStorage.getItem('score') + "!";
        document.getElementById('popup-content-3').textContent = "Come Back Tommorow to Play Again!";

        startButton.style.animation = 'none';

        openPopup();
        updateGameState();

        localStorage.setItem('score', points_element.innerHTML);
        
        localStorage.removeItem('remainingTime');
        localStorage.removeItem('timerRunning');

    } 
    else {
        localStorage.setItem('remainingTime', time);
        localStorage.setItem('score', points_element.innerHTML);
    }

    time--;
}

startButton.addEventListener('click', () => {
    if (!timerInterval) { 
        startButton.style.backgroundColor = 'grey'; 
        timerInterval = setInterval(updateCountdown, 1000);

        
        localStorage.setItem('timerRunning', 'true');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const wasTimerRunning = localStorage.getItem('timerRunning') === 'true';

    if (wasTimerRunning && time > 0 && !timerInterval) {
        startButton.style.backgroundColor = 'grey'; 
        timerInterval = setInterval(updateCountdown, 1000);
    }
});