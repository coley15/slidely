window.onload = function() {
    openPopup();
}

const popup = document.getElementById('intro-popup')

// if the user clicks on the outside grey area of the popup it will also close
popup.addEventListener('click', function(e) {
    if (e.target == popup) {
        closePopup();
    }
})

// called when window is opened, changing the pop-up display to flex, making it visible
function openPopup() {
    document.getElementById('intro-popup').style.display = 'flex';
}

// called when 'close button' is pressed, making display none
function closePopup() {
    document.getElementById('intro-popup').style.display = 'none';
}

