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
  displayRender(board.getBoard());

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
      console.log(cellArray);
      break
    } if (itsATie(cellArray)) {
      gameGoing = false;
      console.log("Game Over Its a Tie!");
      console.log(cellArray);
      break
    }
    else {
      playRound();
    }
    switchActualPlayer();
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

  function itsATie(cellArray) {
    let testArray = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (cellArray[i][j] != 0)
          testArray.push(1);
      }
    }
    console.log(testArray)
    if (testArray.length == 9)
      return true
    return false
  }
}

function displayRender(board) {
  board[0][1] = 'X';
  board[1][1] = 'O';

  const name1 = (document.getElementById("player-1-name")).value;
  const marker1 = (document.getElementById("player-1-marker")).value;
  const name2 = (document.getElementById("player-2-name")).value;
  const marker2 = (document.getElementById("player-2-marker")).value;

  const inputArea = document.getElementsByClassName("input-area");
  //deletar inputarea
  
  const tictactoe = document.getElementsByClassName("tictactoe-area");

  const node = document.createElement("div");
  node.classList.add("node");
  //node.textContent = "Glimpse Of Usssssssssss";
  //node.innerHTML = `${Cell()}`;
  for (let i = 0; i < 3; i++) {

  }
  tictactoe.appendChild(node);
}
