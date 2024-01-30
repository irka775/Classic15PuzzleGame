document.addEventListener('DOMContentLoaded', function () {
    // Initialize game field, shuffle button, and game parameters
    const gameField = document.getElementById('game-field');
    const shuffleButton = document.getElementById('shuffle-button');
    const pauseButton = document.getElementById('pause-button'); // Added Pause button
    const axleSize = 4; // Size of the puzzle grid (4x4)
    let cells = []; // Array to store cell elements
    let gameStarted = false; // Flag to track if the game has started
    let movesCount = 0; // Counter for moves
    let timerInterval; // Variable to store timer interval
    let sec = 0; // Seconds counter for timer
    let min = 0; // Minutes counter for timer

    // Array of light colors for cell backgrounds
    const lightColors = [/* array of color hex codes */];

    // Function to update move counter display
    function updateMoves() {
        document.getElementById('moves').innerHTML = "Moves: " + movesCount;
    }

    // Function to format and update the timer display
    function updateTimer() {
        let formattedTime = "Timer: " + (min < 10 ? "0" : "") + min + ':' + (sec < 10 ? "0" : "") + sec;
        document.getElementById('timer').innerHTML = formattedTime;
    }

    // Timer function to increment time and update display
    function timer() {
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
        }
        updateTimer();
    }

    // Function to shuffle the array for initial game setup
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to check if a cell can be moved
    function canMove(index) {
        const emptyIndex = cells.findIndex(cell => cell.innerHTML === '');
        const x = index % axleSize, y = Math.floor(index / axleSize);
        const emptyX = emptyIndex % axleSize, emptyY = Math.floor(emptyIndex / axleSize);
        return (Math.abs(x - emptyX) + Math.abs(y - emptyY) === 1);
    }

    // Function to shift a cell and update game state
    function shiftCell(index) {
        if (canMove(index)) {
            const emptyIndex = cells.findIndex(cell => cell.innerHTML === '');
            [cells[index].innerHTML, cells[emptyIndex].innerHTML] = [cells[emptyIndex].innerHTML, cells[index].innerHTML];
            cells[index].style.backgroundColor = lightColors[emptyIndex];
            cells[emptyIndex].style.backgroundColor = '#B57EDC';
            movesCount++;
            updateMoves();
        }
    }

    // Function to create and display cells on the game field
    function drawCells() {
        gameField.innerHTML = ''; // Clear the field
        cells = [];

        // Create an array of numbers for the cells
        let cellNumbers = Array.from({ length: axleSize * axleSize - 1 }, (_, i) => i + 1);
        shuffle(cellNumbers);
        cellNumbers.push(''); // Add an empty string to represent the empty cell

        cellNumbers.forEach((number, i) => {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerHTML = number;
            cell.style.backgroundColor = number ? lightColors[i] : '#B57EDC';
            gameField.appendChild(cell);
            cells.push(cell);

            // Add click event to each cell
            cell.addEventListener('click', () => shiftCell(i));
        });
    }

    // Event listener for the shuffle button
    shuffleButton.addEventListener('click', function () {
        gameStarted = true;
        movesCount = 0;
        sec = 0;
        min = 0;
        updateMoves();
        updateTimer();
        clearInterval(timerInterval); // Clear existing timer interval
        timerInterval = setInterval(timer, 1000); // Start new timer interval
        shuffle(cells.map(cell => cell.innerHTML));
        drawCells();
    });

    // Custom function to pause the timer
    function pauseGame() {
        if (gameStarted) {
            clearInterval(timerInterval); // Pause the timer
            gameStarted = false; // Update game state to paused
        }
    }

    // Custom function to resume the timer
    function resumeGame() {
        if (!gameStarted) {
            timerInterval = setInterval(timer, 1000); // Resume the timer
            gameStarted = true; // Update game state to resumed
        }
    }


});

