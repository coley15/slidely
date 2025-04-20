// Get the list of squares that make up the game grid
const squares = document.querySelectorAll('.square');
const start_button = document.getElementById('start-button')

let game_started = false;
let grid = [];
let valid_words = [];
let previous_found_words = [];
let points_element = document.getElementById('points');

console.log(localStorage.getItem('score'))

let score = parseInt(localStorage.getItem('score'));


fetch('/static/wordlist/main_wordlist.txt')
    .then(res => res.text())
    .then(text => {
        valid_words = text
            .split('\n')
            .map(w => w.trim().toLowerCase())
            .filter(w => w.length >= 3 && w.length <= 6);
})


// Convert squares to 2d grid 
function squaresToArray() {
    for (let i = 0; i < 6; i++) {
        let row = [];
        for (let j = 0; j < 6; j++) {
            let index = i * 6 + j;

            row.push(squares[index]);
        }

        grid.push(row);
    }
}

// Add random letters to the board
function setupBoard() {
    for (let i = 0; i < 6; i ++) {
        for (let j = 0; j < 6; j++) {
            var random_character = String.fromCharCode(65 + Math.floor(Math.random() * 26));

            grid[i][j].textContent = random_character;
        }
    }
}

// Going to be used to check if the user made a valid word
function getAllRowsAndColumns() {
    let result = [];

    // Get all row strings
    for (let row = 0; row < 6; row++) {
        const rowText = grid[row].map(cell => cell.textContent).join('');
        result.push(rowText);
    }

    // Get all column strings
    for (let col = 0; col < 6; col++) {
        let colText = '';
        for (let row = 0; row < 6; row++) {
            colText += grid[row][col].textContent;
        }
        result.push(colText);

    }

    return result
}

// Shift row and cols functions here
function shiftRowLeft(row) {
    const first_letter = grid[row][0].textContent;
    for (let col = 0; col < 5; col++) {
        grid[row][col].textContent = grid[row][col + 1].textContent;
    }

    grid[row][5].textContent = first_letter;

    afterMove();
}

function shiftRowRight(row) {
    const last_letter = grid[row][5].textContent;
    for (let col = 5; col > 0; col--) {
        grid[row][col].textContent = grid[row][col - 1].textContent;
    }

    grid[row][0].textContent = last_letter;

    afterMove();
}

function shiftColUp(col) {
    const first_letter = grid[0][col].textContent;
    for (let row = 0; row < 5; row++) {
        grid[row][col].textContent = grid[row + 1][col].textContent
    }

    grid[5][col].textContent = first_letter;

    afterMove();
}

function shiftColDown(col) {
    const last_letter = grid[5][col].textContent;
    for (let row = 5; row > 0; row--) {
        grid[row][col].textContent = grid[row - 1][col].textContent;
    }

    grid[0][col].textContent = last_letter;

    afterMove();
}

function findValidWords() {
    const lines = getAllRowsAndColumns();      // ["ABCDEF", "GHIJKL", …]
    const found = [];
  
    // check rows
    for (let row = 0; row < 6; row++) {
      const text = lines[row];
      for (let start = 0; start <= 3; start++) {
        for (let len = 3; len <= 6 && start + len <= 6; len++) {
          const w = text.slice(start, start + len).toLowerCase();
          if (valid_words.includes(w) && !previous_found_words.includes(w)) {
            previous_found_words.push(w);
            // collect the actual cell elements
            const cells = [];
            for (let c = start; c < start + len; c++) {
              cells.push(grid[row][c]);
            }
            found.push({ word: w, cells });
          }
        }
      }
    }
  
    // check columns (lines 6–11)
    for (let col = 0; col < 6; col++) {
      const text = lines[6 + col];
      for (let start = 0; start <= 3; start++) {
        for (let len = 3; len <= 6 && start + len <= 6; len++) {
          const w = text.slice(start, start + len).toLowerCase();
          if (valid_words.includes(w) && !previous_found_words.includes(w)) {
            previous_found_words.push(w);
            const cells = [];
            for (let r = start; r < start + len; r++) {
              cells.push(grid[r][col]);
            }
            found.push({ word: w, cells });
          }
        }
      }
    }
  
    return found;
}
function afterMove() {
    const new_entries = findValidWords();   // now an array of {word, cells}
  
    console.log(new_entries)

    let points_added = 0;
    new_entries.forEach(({ word, cells }) => {
      // score tiers...
      if (word.length === 3) points_added += 5;
      else if (word.length === 4) points_added += 250;
      else if (word.length === 5) points_added += 500;
      else if (word.length === 6) points_added += 2000;
  
      // highlight these cells:
      cells.forEach(cell => cell.classList.add('highlight'));
      // then remove highlight after 1000ms:
      setTimeout(() => {
        cells.forEach(cell => cell.classList.remove('highlight'));
      }, 1000);
    });
  
    score += points_added;
    points_element.textContent = score;
  
    if (points_added != 0 ) {
        showScorePopup(points_added);
    }
}

function showScorePopup(points) {
    const popup = document.getElementById('score-popup')
    popup.textContent = `+${points}`;
    popup.classList.add('show');

    // Remove the animation
    setTimeout(() => {
        popup.classList.remove('show');
    }, 1200)
}

// Check if game has started
start_button.addEventListener('click', function() {
    game_started = true;
    localStorage.setItem('score', 0)
    score = parseInt(localStorage.getItem('score'));
})

if (localStorage.getItem('remainingTime') > 0) {
    game_started = true;
}


// Get all the arrow classes and add an event listener to check for clicks
document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
        // Get the direction and index of the arrow using the hardcoded values in the HTML 
        const direction = arrow.dataset.direction;
        const index = parseInt(arrow.dataset.index);
        if (game_started == true) {
            if (direction === 'left') shiftRowLeft(index);
            else if (direction === 'right') shiftRowRight(index);
            else if (direction === 'up') shiftColUp(index);
            else if (direction === 'down') shiftColDown(index);
        }
    });
});





squaresToArray();
setupBoard();
getAllRowsAndColumns();


