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

  function dropMarker(row, column, player, switchActualPlayer) {
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

  const addMarker = (playerMarker, cell) => {
    value = playerMarker;
  }

  const getValue = () => value;

  return {
    addMarker,
    getValue
  }
}

function gameController() {
  let board = gameBoard();

  let player = [];

  function createPlayer(name, color, marker) {
    return { name, color, marker };
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

  inputArea.innerHTML = "";

  const playerArea = document.getElementById("player-area");
  playerArea.style.visibility = "visible";

  player[0] = createPlayer(name1, marker1, newMarker1);
  player[1] = createPlayer(name2, marker2, newMarker2);

  let activePlayer = player[0];

  function switchActualPlayer() {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  }

  displayRender(board.getBoard(), playRound, activePlayer);

  let p1WinCounter = 0, p2WinCounter = 0;

  function playRound(i, j) {
    board.dropMarker(i, j, activePlayer, switchActualPlayer);
    cellArray = board.getBoard();
    updateDisplay(cellArray, player);
    if (threeInRow(cellArray)) {
      //alert("Game Over " + activePlayer.name + " Won!");
      if (activePlayer.name == name1) {
        p1WinCounter++;
        document.getElementById("score1").innerHTML = "score:" + p1WinCounter;
        board = gameBoard();
      }
      else {
        p2WinCounter++;
        document.getElementById("score2").innerHTML = "score:" + p2WinCounter;
        board = gameBoard();
      }
      displayRestart(activePlayer.name, board.getBoard(), playRound, activePlayer);
    } if (itsATie(cellArray, board.getBoard())) {
      displayRestart(0, board.getBoard(), playRound, activePlayer);
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
    if (testArray.length == 9)
      return true
    return false
  }

}

function displayRender(board, playRound, activePlayer) {
  const tictactoe = document.getElementById("tictactoe-area");
  const cell = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cell[i + j] = document.createElement("div");
      cell[i + j].classList.add("cell");
      cell[i + j].innerHTML = board[i][j];
      cell[i + j].addEventListener('click', () => {
        playRound(i, j, activePlayer);
      });
      tictactoe.appendChild(cell[i + j]);
    }
  }
}

function updateDisplay(cellArray, player) {
  const tictactoe = document.getElementById("tictactoe-area");
  for (let i = 0, j = 0, k = 0; i < 9, j < 3; i++, k++) {
    tictactoe.getElementsByTagName('div')[i].innerHTML = cellArray[j][k];
    if (cellArray[j][k] == player[0].marker)
      tictactoe.getElementsByTagName('div')[i].style.color = player[0].color;
    else if (cellArray[j][k] == player[1].marker)
      tictactoe.getElementsByTagName('div')[i].style.color = player[1].color;
    if (k == 2) {
      k = -1;
      j++;
    }
  }
}

function displayRestart(playerName, getBoard, playRound, activePlayer) {
  const displayArea = document.getElementById("tictactoe-area");
  /*displayArea.style.display = "flex";
  displayArea.style.justifyContent = "center";
  displayArea.style.alignItems = "center";
  displayArea.style.flexDirection = "column";*/
  if (playerName == 0) {
    displayArea.innerHTML = "Its a Tie!";
  }
  else {
    displayArea.innerHTML = playerName + " has won this match!";
  }
  let btn = document.createElement("button");
  btn.innerText = "Restart";
  btn.classList.add("start-button");
  let board = getBoard;
  btn.addEventListener('click', () => {
    displayArea.innerHTML = "";

    displayRender(getBoard, playRound, activePlayer);
  });
  displayArea.appendChild(btn);
}