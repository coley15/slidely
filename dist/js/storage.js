function getLocalDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function canPlayToday() {
    const lastPlayed = localStorage.getItem("lastPlayed");
    const today = getLocalDateString();
    
    return lastPlayed !== today;
}

function playGame() {
    if (canPlayToday()) {
        updateGameState();
        updatePlayButton();
    }
}

function updateGameState() {
    const today = getLocalDateString();

    localStorage.setItem('score', 0);
    localStorage.setItem('lastPlayed', today);
}

function updatePlayButton() {
    if (!canPlayToday()) {
        startButton.disabled = true;
        startButton.style.backgroundColor = 'grey';
        points_element.innerHTML = localStorage.getItem('score');
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', playGame);
    updatePlayButton(); 
});
