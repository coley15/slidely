function canPlayToday() {
    const lastPlayed = localStorage.getItem("lastPlayed");
    const today = new Date().toISOString().split('T')[0];
    
    return lastPlayed !== today;
}

function playGame() {
    if (canPlayToday()) {
        updateGameState()
        updatePlayButton()
    }
}

function updateGameState() {
    const today = new Date().toISOString().split('T')[0];

    localStorage.setItem('score', 0)
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
