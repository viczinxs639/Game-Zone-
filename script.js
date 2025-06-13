let currentPlayer = 'X';
let cells = [];

function startGame() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  cells = Array(9).fill(null);
  document.getElementById('status').innerText = `Vez do jogador: ${currentPlayer}`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  }
}

function handleClick(index) {
  if (cells[index] || checkWinner()) return;

  cells[index] = currentPlayer;
  document.querySelectorAll('.cell')[index].innerText = currentPlayer;

  if (checkWinner()) {
    document.getElementById('status').innerText = `Jogador ${currentPlayer} venceu!`;
  } else if (cells.every(cell => cell)) {
    document.getElementById('status').innerText = 'Empate!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `Vez do jogador: ${currentPlayer}`;
  }
}

function checkWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return combos.some(([a,b,c]) =>
    cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
  );
}

startGame();
