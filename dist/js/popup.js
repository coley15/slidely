window.onload = function() {
    openPopup();
}

const popup = document.getElementById('intro-popup')

popup.addEventListener('click', function(e) {
    if (e.target == popup) {
        closePopup();
    }
})

function openPopup() {
    document.getElementById('intro-popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('intro-popup').style.display = 'none';
}

