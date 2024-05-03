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
    if (board[row][column].getValue() == "-") {
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
  let value = "-";

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

  const name1 = (document.getElementById("player-1-name")).value;
  const marker1 = (document.getElementById("player-1-marker")).value;
  const name2 = (document.getElementById("player-2-name")).value;
  const marker2 = (document.getElementById("player-2-marker")).value;

  const inputArea = document.getElementById("input-area");


  document.getElementById("name1").innerHTML = (document.getElementById("player-1-name")).value;
  document.getElementById("marker1").innerHTML = "X";
  document.getElementById("marker1").style.color = marker1;
  newMarker1 = document.getElementById("marker1").innerHTML;

  document.getElementById("name2").innerHTML = (document.getElementById("player-2-name")).value;
  document.getElementById("marker2").innerHTML = "O";
  document.getElementById("marker2").style.color = marker2;
  newMarker2 = document.getElementById("marker2").innerHTML;
  //Consertar essa merda aí pra printar colorido no tictactoe-area

  inputArea.remove();

  player[0] = createPlayer(name1, newMarker1);
  player[1] = createPlayer(name2, newMarker2);

  let activePlayer = player[0];

  function switchActualPlayer() {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  }

  displayRender(board.getBoard(), playRound);

  function playRound(i, j) {
    board.dropMarker(i, j, activePlayer);
    cellArray = board.getBoard();
    if (threeInRow(cellArray)) {
      gameGoing = false;
      switchActualPlayer();
      console.log("Game Over " + activePlayer.name + " Won!");
      console.log(cellArray);
    } if (itsATie(cellArray)) {
      gameGoing = false;
      console.log("Game Over Its a Tie!");
      console.log(cellArray);
    }
    switchActualPlayer();
  }

  function threeInRow(cellArray) {
    for (let i = 0; i < 3; i++) {
      if ((cellArray[i][0] != "-") && (cellArray[i][0] == cellArray[i][1]) && (cellArray[i][1] == cellArray[i][2]))
        return true
      if ((cellArray[0][i] != "-") && (cellArray[0][i] == cellArray[1][i]) && (cellArray[1][i] == cellArray[2][i]))
        return true
    }
    if ((cellArray[1][1] != "-") && (cellArray[0][0] == cellArray[1][1]) && (cellArray[1][1] == cellArray[2][2]))
      return true
    if ((cellArray[1][1] != "-") && (cellArray[0][2] == cellArray[1][1]) && (cellArray[1][1] == cellArray[2][0]))
      return true
    else
      return false
  }

  function itsATie(cellArray) {
    let testArray = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (cellArray[i][j] != "-")
          testArray.push(1);
      }
    }
    //console.log(testArray)
    if (testArray.length == 9)
      return true
    return false
  }
}

function displayRender(board, playRound) {
  board[0][1] = 'X';
  board[1][1] = 'O';
  console.log(board);

  const tictactoe = document.getElementById("tictactoe-area");
  const cell = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cell[i + j] = document.createElement("div");
      cell[i + j].classList.add("cell");
      cell[i + j].innerHTML = board[i][j];
      cell[i + j].onclick = playRound(i, j, activePlayer);
      tictactoe.appendChild(cell[i + j]);
    }
  }
}