<template>
  <div class="board">
    <div class="board-container">
      <table class="board-holder">
        <tr>
          <td>
            <table class="board-half" style="border-bottom: 5px solid hotpink;">
              <tr>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
              </tr>
              <tr>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default dark"><span class="piece blue-piece" id="1" v-on:click="updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(7)"></td>
                <td class="tile-default light"><span class="piece blue-piece" id="2" v-on:click="updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(8)"></td>
                <td class="tile-default dark"><span class="piece blue-piece" id="3" v-on:click="updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(9)"></td>
                <td class="tile-default light"><span class="piece blue-piece" id="4" v-on:click="updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(10)"></td>
                <td class="tile-default tile-moveTo hidden"></td>
              </tr>
              <tr>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default light"></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(13)"></td>
                <td class="tile-default dark"></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(14)"></td>
                <td class="tile-default light"></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(15)"></td>
                <td class="tile-default dark"></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(16)"></td>
                <td class="tile-default tile-moveTo hidden"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table class="board-half">
              <tr>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default dark"></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(19)"></td>
                <td class="tile-default light"></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(20)"></td>
                <td class="tile-default dark"></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(21)"></td>
                <td class="tile-default light"></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(22)"></td>
                <td class="tile-default tile-moveTo hidden"></td>
              </tr>
              <tr>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default light"><span class="piece red-piece" id="5" v-on:click = "updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(25)"></td>
                <td class="tile-default dark"><span class="piece red-piece" id="6" v-on:click = "updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(26)"></td>
                <td class="tile-default light"><span class="piece red-piece" id="7" v-on:click = "updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-light" v-on:click = "movePiece(27)"></td>
                <td class="tile-default dark"><span class="piece red-piece" id="8" v-on:click = "updateState()"></span></td>
                <td class="tile-moveTo hidden moveTo-dark" v-on:click = "movePiece(28)"></td>
                <td class="tile-default tile-moveTo hidden"></td>
              </tr>
              <tr>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
                <td class="tile-default tile-moveTo hidden"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div class="tracker-container">
    <div class="red-turn-text" id="redTurn">Red's Turn</div>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <div id="blueTurn">Blue's Turn</div>
  </div>
</template>

<script>


let board = [
  0,0,0,0,0,0,
  0,1,2,3,4,0,
  0,-1,-1,-1,-1,0,
  0,-1,-1,-1,-1,0,
  0,5,6,7,8,0,
  0,0,0,0,0,0
]

let turn = true; //true=red, false = blue
let playerPieces;
let tiles;
let hiddenTiles;

let selectedPiece = {
  pieceId: -2,
  piecesIndex: -2
}

export default {
  name: 'GameBoard',
  data()  {
    return {

    }
  },
  methods: {
    updateState(eventID) {                              //eventID = -1: End Turn
      this.updateTileList();
      playerPieces = document.querySelectorAll(".piece");
      if(eventID == -1) {                               //end turn, change active player
        this.resetSelectedPiece();
        this.updateBoard();
        if(turn){ 
          turn = false; 
        }
        else{ 
          turn = true; 
        }
        this.updateTurnDisplay();
      }
      else if(turn && parseInt(event.target.id) < 5) {  //Try to select blue piece on red's turn
        alert("It is the Red player's turn");

      }
      else if(!turn && parseInt(event.target.id) >= 5) {//Try to select red piece on red's turn
        alert("It is the Blue player's turn");
      }
      else {                                            //select a new piece
        this.resetSelectedPiece();
        this.updateBoard();
        this.setSelectedPiece();
        this.displayMovement();
      }
    },
    resetSelectedPiece() {
      selectedPiece.pieceId = -2;
      selectedPiece.piecesIndex = -2;
      for(let i = 0; i < playerPieces.length; i++){
        playerPieces[i].style.border = "2px solid black";
      }
    },
    setSelectedPiece() {
      selectedPiece.pieceId = parseInt(event.target.id);
      selectedPiece.piecesIndex = board.indexOf(selectedPiece.pieceId);
      console.log("selectedpieceIndex = " + board.indexOf(selectedPiece.pieceId));
      document.getElementById(selectedPiece.pieceId).style.border = "4px solid white";
    },
    displayMovement() {
      this.setValidMove(selectedPiece.piecesIndex);
      let currentSpace;
      for(let i = 0; i < 3; i++){
        currentSpace = selectedPiece.piecesIndex - 7 + i;
        if( board[currentSpace] == -1) {
          this.setValidMove(currentSpace);
        }
      }
      for(let i = 0; i < 3; i++){
        currentSpace = selectedPiece.piecesIndex - 1 + i;
        if( board[currentSpace] == -1) {
          this.setValidMove(currentSpace);
        }
      }
      for(let i = 0; i < 3; i++){
        currentSpace = selectedPiece.piecesIndex + 5 + i;
        if( board[currentSpace] == -1) {
          this.setValidMove(currentSpace);
        }
      }
    },
    resetDisplayMovement() {
      for(let i = 7; i < board.length; i++) {
        tiles[i].classList.remove("hidden");
        hiddenTiles[i].classList.add("hidden");
      }
    },
    setValidMove(index) {
      if(board[index] != -1){
        hiddenTiles[index].appendChild(tiles[index].firstChild);
      }
      tiles[index].classList.add("hidden");
      hiddenTiles[index].classList.remove("hidden");
    },
    movePiece(destinationIndex) {
      board[destinationIndex] = selectedPiece.pieceId;
      board[selectedPiece.piecesIndex] = -1;
      this.updateState(-1);
    },
    updateBoard() {
      this.resetDisplayMovement();
      for(let i = 7; i < board.length; i++) {
        if(board[i] > 0) {
          tiles[i].appendChild(this.findPieceById(board[i]));
        }
      }
    },
    updateTileList() {
      hiddenTiles = document.querySelectorAll(".tile-moveTo");
      tiles = document.querySelectorAll(".tile-default");
    },
    findPieceById(x){
      for(let i = 0; i < playerPieces.length; i++){
        if(playerPieces[i].id == x){
          return playerPieces[i];
        }
      }
      return -1;
    },
    updateTurnDisplay() {
      if(turn){
        document.getElementById("redTurn").classList.add("red-turn-text");
        document.getElementById("blueTurn").classList.remove("blue-turn-text");
      }
      else{
        document.getElementById("redTurn").classList.remove("red-turn-text");
        document.getElementById("blueTurn").classList.add("blue-turn-text");
      }
    }
  }
}
</script>

<style>

  table {
    border-collapse: collapse;
  }

  .board-container {
    display: flex;
    justify-content: center;
  }

  .board-holder {
    border: 5px solid;
    border-color: black;
    
  }

  td {
    padding: 0px;
  }

  .hidden {
    display: none;
  }

  .tile-default {
    width: 80px;
    height: 80px;
    text-align: center;
  }
  .tile-moveTo {
    width: 80px;
    height: 80px;
    text-align: center;
  }

  .dark {
    background-color: darkgreen;
  }

  .light {
    background-color: lawngreen;
  }

  .moveTo-dark {
    background-color: #acb300;
  }

  .moveTo-light {
    background-color: #f5ff00;
  }

  .red-piece {
    width: 50px;
    height: 50px;
    background-color: red;
    border: 2px solid black;
    border-radius: 50px;
    display: inline-block;
  }

  .blue-piece {
    width: 50px;
    height: 50px;
    background-color: blue;
    border: 2px solid black;
    border-radius: 50px;
    display: inline-block;
  }

  .tracker-container {
  display: inline-flex;
  font-size: 30px;
  }

  .red-turn-text {
    font-weight: 700;
    color: red;
  }

  .blue-turn-text {
    font-weight: 700;
    color: blue;
  }
</style>