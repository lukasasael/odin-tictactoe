function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  function dropMarker(row, column, player) {
    if (row > 2 || column > 2)
      return console.error("Posição Inválida");
    if (board[row][column].getValue() == 0) {
      board[row][column].addMarker(player.marker);
    } else {
      console.log("A célula tá ocupada");
      switchActualPlayer();
    }
  }

  function getBoard() {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    return boardWithCellValues;
  }

  function printBoard() {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    return console.log(boardWithCellValues);
  };

  return { dropMarker, getBoard, printBoard };
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

  let player = [];

  function createPlayer(name, marker) {
    return { name, marker };
  }

  for (let i = 0; i < 2; i++) {
    var name = prompt("Player " + i + " Name:");
    var mark = prompt("Player " + i + " Mark:");
    player[i] = createPlayer(name, mark);
  }

  let activePlayer = player[0];

  function switchActualPlayer() {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  }

  function playRound() {
    var row = prompt("que linha quer jogar?");
    var column = prompt("que coluna quer jogar?");
    board.dropMarker(row, column, activePlayer);
  }

  let gameGoing = true;

  while (gameGoing) {
    cellArray = board.getBoard();
    if (threeInRow(cellArray)) {
      gameGoing = false;
      switchActualPlayer();
      console.log("Game Over " + activePlayer.name + " Won!");
    } else {
      playRound();
    }
    switchActualPlayer();
    console.log(cellArray);
  }

  function threeInRow(cellArray) {
    for (let i = 0; i < 3; i++) {
      if ((cellArray[i][0] != 0) && (cellArray[i][0] == cellArray[i][1]) && (cellArray[i][1] == cellArray[i][2]))
        return true
      if ((cellArray[0][i] != 0) && (cellArray[0][i] == cellArray[1][i]) && (cellArray[1][i] == cellArray[2][i]))
        return true
    }
    if ((cellArray[1][1] != 0) && (cellArray[0][0] == cellArray[1][1]) && (cellArray[1][1] == cellArray[2][2]))
      return true
    if ((cellArray[1][1] != 0) && (cellArray[0][2] == cellArray[1][1]) && (cellArray[1][1] == cellArray[2][0]))
      return true
    else
      return false
  }
}