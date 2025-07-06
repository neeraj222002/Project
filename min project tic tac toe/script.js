 let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes('') ? null : 'Draw'; // Return 'Draw' if no winner and board is full
}

function updateStatus() {
  const winner = checkWinner();
  if (winner) {
    if (winner === 'Draw') {
      statusDiv.textContent = "It's a Draw!";
    } else {
      statusDiv.textContent = `${winner} wins!`;
    }
    gameOver = true;
  } else {
    statusDiv.textContent = `${currentPlayer}'s turn`;
  }
}

function handleCellClick(e) {
  const cellIndex = parseInt(e.target.id.split('-')[1]);

  if (board[cellIndex] || gameOver) return; // Don't allow move if the cell is filled or the game is over

  board[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  updateStatus();
}

function newGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  statusDiv.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
updateStatus();
