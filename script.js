function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(createCell());
    }
  }

  console.log(board);
}

function createCell() {
  let value = 0;

  const addMarker = (playerMarker) => {
    value = playerMarker;
  }
  const getValue = () => value;

  return {
    addMarker,
    getValue
  }
}

function createPlayer(name, marker) {
  return { name, marker };
}

function gameController() {
  gameBoard();

  let player = [];

  for (let i = 0; i < 2; i++) {
    var name = prompt("Player " + i + " Name:");
    var mark = prompt("Player " + i + " Mark:");
    player[i] = createPlayer(name, mark)
  }
  
  console.log(player);
}

