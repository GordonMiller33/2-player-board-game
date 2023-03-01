<template>
  <div class="board">
    <div class="board-container">
      <table class="board-holder">
        <tr>
          <td>
            <table class="board-half" style="border-bottom: 5px solid hotpink;">
              <tr>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
              </tr>
              <tr>
                <td class="tile outer"></td>
                <td class="tile dark"><span class="blue-piece" id="1"></span></td>
                <td class="tile light"><span class="blue-piece" id="2"></span></td>
                <td class="tile dark"><span class="blue-piece" id="3"></span></td>
                <td class="tile light"><span class="blue-piece" id="4"></span></td>
                <td class="tile outer"></td>
              </tr>
              <tr>
                <td class="tile outer"></td>
                <td class="tile light"></td>
                <td class="tile dark"></td>
                <td class="tile light"></td>
                <td class="tile dark"></td>
                <td class="tile outer"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table class="board-half">
              <tr>
                <td class="tile outer"></td>
                <td class="tile dark"></td>
                <td class="tile light"></td>
                <td class="tile dark"></td>
                <td class="tile light"></td>
                <td class="tile outer"></td>
              </tr>
              <tr>
                <td class="tile outer"></td>
                <td class="tile light"><span class="red-piece" id="5" v-on:click = "getPlayerPieces()"></span></td>
                <td class="tile dark"><span class="red-piece" id="6" v-on:click = "getPlayerPieces()"></span></td>
                <td class="tile light"><span class="red-piece" id="7" v-on:click = "getPlayerPieces()"></span></td>
                <td class="tile dark"><span class="red-piece" id="8" v-on:click = "getPlayerPieces()"></span></td>
                <td class="tile outer"></td>
              </tr>
              <tr>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
                <td class="tile outer"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
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


let selectedPiece = {
  pieceId: -1,
  piecesIndex: -1
}

export default {
  name: 'GameBoard',
  methods: {
    getPlayerPieces() {
      tiles = document.querySelectorAll(".tile");
      if (turn){
        playerPieces = document.querySelectorAll(".red-piece");
      }
      else {
        playerPieces = document.querySelectorAll(".blue-piece");
      }
      this.resetSelectedPiece();
      this.resetMovement();
      this.setSelectedPiece();
      this.displayMovement();
    },
    resetSelectedPiece() {
      selectedPiece.pieceId = -1;
      selectedPiece.piecesIndex = -1;
      for(let i = 0; i < playerPieces.length; i++){
        playerPieces[i].style.border = "2px solid black";
      }
    },
    setSelectedPiece() {
      selectedPiece.pieceId = parseInt(event.target.id);
      selectedPiece.piecesIndex = board.indexOf(selectedPiece.pieceId);
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
    },
    resetMovement() {
      for(let i = 7; i < board.length; i++) {
        if(tiles[i].classList.contains("dark")) {
          tiles[i].style.backgroundColor = "darkgreen";
        }
        else if(tiles[i].classList.contains("light")){
          tiles[i].style.backgroundColor = "lawngreen";
        }
      }
    },
    setValidMove(index) {
      if(tiles[index].classList.contains("dark")) {
            tiles[index].style.backgroundColor = "#487500";
      }
      else if(tiles[index].classList.contains("light")){
        tiles[index].style.backgroundColor = "#bfff00";
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

  .tile {
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

  .outer {
    height: 0px;
    width: 0px;
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
</style>