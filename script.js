function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Creating Board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  function dropMarker(row, column, player) {
    if (board[row][column].getValue == 0) { //se ñ tiver marcada a celula 
      board[row][column].addMarker(player.marker);
    } else {
      error = "a célula tá ocupada"
    }
  }

  function getBoard() {
    return board;
  }

  return { dropMarker, getBoard };
}

function Cell() {
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

function gameController() {
  const board = gameBoard();
  const oi = board.getBoard();

  console.log(oi);

  let player = [];

  function createPlayer(name, marker) {
    return { name, marker };
  }

  for (let i = 0; i < 2; i++) {
    var name = prompt("Player " + i + " Name:");
    var mark = prompt("Player " + i + " Mark:");
    player[i] = createPlayer(name, mark)
  }

  let activePlayer = player[1];

  function getActualPlayer() {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
    return activePlayer;
  }

  function playRound() {
    var place1 = prompt("que linha quer jogar?");
    var place2 = prompt("que coluna quer jogar?");
    board.dropMarker(place1, place2, getActualPlayer());
    console.log(oi.getBoard[row][column].getValue);
    console.log(oi + "depois do round");
  }

  playRound();
}

