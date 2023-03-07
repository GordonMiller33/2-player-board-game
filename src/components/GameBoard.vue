<template>
  <GamePiece v-for="(item, index) in numPieces" v-bind:key="index" v-bind:id="'p'+(index+1)" v-on:update-state="updateState(2)"/>
  <div class="board">
    <div class="board-container">
      <table class="board-holder">
        <tr v-for="(item, i) in totalWidth" v-bind:key="i">
          <GameTile v-for="(item, j) in totalWidth" v-bind:key="j" v-bind:id="totalWidth*i+j" v-on:move-piece="movePiece()"></GameTile>
        </tr>
      </table>
    </div>
  </div>
</template>


<script setup>
console.log("------script setup------")
import { useBaseStore } from '@/stores/BaseStore.js';
//let boardWidth = parseInt(store.boardWidth);
//let totalWidth = boardWidth+3*2;
</script>
<script>
import GamePiece from '@/components/GamePiece.vue'
import GameTile from '@/components/GameTile.vue'

const store = useBaseStore();
let boardWidth = parseInt(store.boardWidth);
let maxPieceMovement = parseInt(store.movementSpeed);
let totalWidth = boardWidth+maxPieceMovement*2;
let halfBoardWidth = boardWidth/2;
let board = [];

let numPiecesPerPlayer = parseInt(store.piecesPerPlayer);                  
let numPieces = numPiecesPerPlayer*2;                                      
//const tileOffset = (boardWidth/2+1)%2;
let playerPieces;
let tiles;

let selectedPiece = {
  pieceId: "p-2",
  pieceIdNum: -2,
  piecesIndex: -2
}

export default {
  name: 'GameBoard',
  data()  {
    return {
      totalWidth: totalWidth,
      numPieces: numPieces,
      store: store,
      board: board
    }
  },
  created() {
    board = [];
    boardWidth = parseInt(store.boardWidth);
    maxPieceMovement = parseInt(store.movementSpeed);
    totalWidth = boardWidth+maxPieceMovement*2;
    halfBoardWidth = boardWidth/2;
    numPiecesPerPlayer = parseInt(store.piecesPerPlayer);                  
    numPieces = numPiecesPerPlayer*2;     
    for(let i = 0; i < totalWidth; i++){
      for(let j = 0; j < totalWidth; j++){
        let index = (totalWidth*i+j);
        if(i < maxPieceMovement || i >= boardWidth + maxPieceMovement || j < maxPieceMovement|| j >= boardWidth + maxPieceMovement){
          board[index] = 0;
        }
        else{
          board[index] = -1;
        }
      }
    }
    for(let i = 0; i < numPieces/2; i++){
      board[(totalWidth*maxPieceMovement)+((halfBoardWidth)-((numPieces-(4*maxPieceMovement))/4)+i)] = i + 1;
    }
    for(let i = numPieces/2; i < numPieces; i++){
      board[(totalWidth*((totalWidth-(maxPieceMovement))-1))+(halfBoardWidth-((numPieces-(4*maxPieceMovement))/4)+(i-numPieces/2))] = i + 1;
    }
  },
  mounted() {
    console.log("board:");
    console.log(board);
    this.setInitalTileProperties();
    playerPieces = document.querySelectorAll(".piece");
    tiles = document.querySelectorAll(".tile-default");
    console.log("tiles:");
    console.log(tiles);
    this.updateBoard();
  },
  components: {
    GamePiece,
    GameTile
  },
  methods: {
    updateState(eventCode) {                                //eventCode that determines what caused the updateState function to be called
      console.log('State Updated')
      if(eventCode == 1) {                                  //eventCode = 1: triggered by end of turn, change active player
        this.resetSelectedPiece();
        this.updateBoard();
      }
      if(eventCode == 2) {                                  //eventCode = 2: triggered by clicking a piece
        this.resetSelectedPiece();
        this.updateBoard();
        this.setSelectedPiece();
        this.displayMovement();
      }
    },
    setInitalTileProperties(){
      let lightFlag = false;
      let nextPieceIndex = 1;
      for (let i = 0; i < (totalWidth); i++){
        lightFlag = !lightFlag;
        for (let j = 0; j < totalWidth; j++){
          let index = (totalWidth*i+j);
          this.setTile(index, board[index], lightFlag, nextPieceIndex);
          lightFlag = !lightFlag;
          if(board[index] > 0){
            nextPieceIndex++;
          }
        }
      }
    },
    resetSelectedPiece() {
      selectedPiece.pieceId = "p-2";
      selectedPiece.pieceIdNum = -2;
      selectedPiece.piecesIndex = -2;
      for(let i = 0; i < playerPieces.length; i++){
        playerPieces[i].style.border = "2px solid black";
      }
    },
    setSelectedPiece() {
      selectedPiece.pieceId = event.target.id;
      selectedPiece.pieceIdNum = parseInt(selectedPiece.pieceId.substring(1,selectedPiece.pieceId.length));
      selectedPiece.piecesIndex = board.indexOf(selectedPiece.pieceIdNum);
      this.findPieceByIdNum(selectedPiece.pieceIdNum).style.border = "4px solid white";
    },
    displayMovement() {
      let adjacentIterator = [-totalWidth, -1, 1, totalWidth];     
      this.setValidMove(selectedPiece.piecesIndex,-1);
      let index;
      for (let x = 0; x < maxPieceMovement ; x++){
        for(let i = 0; i < (x*2+1); i++){
          for(let j = 0; j < (x*2+1); j++){
            index = (selectedPiece.piecesIndex-(totalWidth*(x)) - (x)) + (i * totalWidth) + j;
            if(tiles[index].classList.contains("valid-move") && tiles[index].classList.contains("distance-" + (x-1))){
              for(let n = 0; n < 4; n++){
                if( board[index + adjacentIterator[n]] == -1){
                  this.setValidMove(index + adjacentIterator[n], x);
                }
              }
            }
          }
        }
        
      }
    },
    resetDisplayMovement() {
      let cl;
      for(let i = 0; i < board.length; i++) {
        cl = tiles[i].classList;
        cl.remove("valid-move");
        for(let i = 0; i < maxPieceMovement; i++){
          cl.remove("distance-" + i);
        }
        if(cl.contains("moveTo-dark")){
          cl.remove("moveTo-dark");
          cl.add("dark");
        }
        else if(cl.contains("moveTo-light")){
          cl.remove("moveTo-light");
          cl.add("light");
        }
      }
    },
    setValidMove(index, distance) {
      if(tiles[index].classList.contains("dark")){
        tiles[index].classList.remove("dark");
        tiles[index].classList.add("moveTo-dark");
      }
      if(tiles[index].classList.contains("light")){
        tiles[index].classList.remove("light");
        tiles[index].classList.add("moveTo-light");
      }
      tiles[index].classList.add("valid-move");
      tiles[index].classList.add("distance-" + distance);
    },
    movePiece() {
      let destinationIndex = event.target.id;
      if( destinationIndex.charAt(0) != 'p' && tiles[destinationIndex].classList.contains("valid-move")) {
        board[destinationIndex] = selectedPiece.pieceIdNum;
        board[selectedPiece.piecesIndex] = -1;
        this.updateState(1);
      }
    },
    updateBoard() {
      this.resetDisplayMovement();
      for(let i = 0; i < board.length; i++) {
        if(board[i] > 0) {
          tiles[i].appendChild(this.findPieceByIdNum(board[i]));
        }
      }
    },
    findPieceByIdNum(x){
      for(let i = 0; i < playerPieces.length; i++){
        if(playerPieces[i].id == ("p" + x)){
          return playerPieces[i];
        }
      }
      return -1;
    },
    reachable(index) {
      let reachableFlag = false;
      if( tiles[index].classList.contains("valid-move") || tiles[index-1].classList.contains("valid-move") ||  tiles[index+1].classList.contains("valid-move") ||  tiles[index-totalWidth].classList.contains("valid-move") ||  tiles[index+totalWidth].classList.contains("valid-move")) { 
        reachableFlag = true;
      }
      return reachableFlag;
    },
    setTile(index, tileCode, light, nextP) {
      //tileCode(number with range -1 to numPieces) determines teh type of tile to be created, -1 = empty inner tile, 0 = outer tile, 1+ = inner tile with piece 
      //visibile(boolean) determines whether it will be hidden or not, true = visible, false = hidden
      //light(boolean) determines whetehr an inner space is light or dark, true = light, false = dark
      //Index(number) the index of the tile
      let t = document.getElementById(index);
      if(tileCode == 0){
        t.classList.add("tile-moveTo");
        t.classList.add("tile-default");
        t.classList.add("hidden");
      }
      else {
        t.classList.add("tile-default");
        if(light) {
          t.classList.add("light");
        }
        else {
          t.classList.add("dark");
        }
        if(tileCode > 0){
          let p = document.getElementById("p" + nextP);
          if(tileCode <= numPieces/2) {
            p.classList.add("blue-piece");
          }
          else {
            p.classList.add("red-piece");
          }
          t.appendChild(p);
          return nextP++;
        }
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
    background-color: #429722;
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