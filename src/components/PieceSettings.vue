<template>
  <div class="board">
    <div class="board-container">
      <table class="board-holder">
        <tr v-for="(item, i) in totalWidth" v-bind:key="i">
          <GameTile v-for="(item, j) in totalWidth" v-bind:key="j" v-bind:id="totalWidth*i+j" v-on:tile-click="selectNewTile()"></GameTile>
        </tr>
      </table>
    </div>
  </div>
  <div id="piece-settings" class="hidden">
    <p><b>Piece Color</b></p>
    <input id="piece_color" placeholder="edit me" />
    <p><b>Piece Speed</b></p>
    <input id="piece_speed" placeholder="edit me" />
    <br><br>
    <button v-on:click="storeTileData()"> Add Piece </button>
  </div>
</template>

<script setup>
console.log("------script setup------")
import { useBaseStore } from '@/stores/BaseStore.js';
</script>
<script>
import GameTile from '@/components/GameTile.vue'


const store = useBaseStore();
let boardWidth = parseInt(store.boardWidth);
let maxPieceMovement = parseInt(store.movementSpeed);
let totalWidth = boardWidth+maxPieceMovement*2;
let board = [];
let nextPieceId = 0;


//let pieces;
let tiles;

let selectedTile = {
  id: -1,
  element: null
}

let selectedPiece = {
  id: -1,
  data: {
    color: null,
    speed: 1
  }
}

export default {  
  name: 'PieceSettings',
  data()  {
    return {
    }
  },
  created() {
    board = [];
    boardWidth = parseInt(store.boardWidth);
    maxPieceMovement = parseInt(store.movementSpeed);
    totalWidth = boardWidth+maxPieceMovement*2;

    if(store.board.length != (totalWidth * totalWidth)){
      store.customPieces = [];
      for(let i = 0; i < totalWidth; i++){
        for(let j = 0; j < totalWidth; j++){
          let index = (totalWidth*i+j);
          if(i < maxPieceMovement || i >= boardWidth + maxPieceMovement || j < maxPieceMovement|| j >= boardWidth + maxPieceMovement){
            store.board[index] = store.OUTER_TILE_ID;
          }
          else{
            store.board[index] = store.EMPTY_TILE_ID;
          }
        }
      }
    }
    else{
      nextPieceId = store.customPieces.length;
    }
    console.log("customPieces: " + store.customPieces);

    for(let i = 0; i < totalWidth; i++){
      for(let j = 0; j < totalWidth; j++){
        let index = (totalWidth*i+j);
        if(i < maxPieceMovement || i >= boardWidth + maxPieceMovement || j < maxPieceMovement|| j >= boardWidth + maxPieceMovement){
          board[index] = store.board[index];
        }
        else{
          board[index] = store.board[index];
        }
      }
    }

    
  },
  mounted() {
    console.log("board:");
    console.log(board);
    this.setInitalTileProperties();
    tiles = document.querySelectorAll(".tile-default");
    console.log("tiles:");
    console.log(tiles);
    this.updateBoard();
  },
  components: {
    GameTile
  },
  methods: {
    updateBoard() {
      for(let i = 0; i < board.length; i++) {
        if(board[i] > store.EMPTY_TILE_ID) {
          //comment

        }
      }
    },
    setInitalTileProperties(){
      let lightFlag = false;
      for (let i = 0; i < totalWidth; i++){
        lightFlag = !lightFlag;
        for (let j = 0; j < totalWidth; j++){
          let index = (totalWidth*i+j);
          this.setTile(index, board[index], lightFlag);
          lightFlag = !lightFlag;
        }
      }
    },
    setTile(index, tileCode, light) {
      //tileCode(number with range -1 to numPieces) determines the type of tile to be created, -1 = empty inner tile, -2 = outer tile
      //visibile(boolean) determines whether it will be hidden or not, true = visible, false = hidden
      //light(boolean) determines whetehr an inner space is light or dark, true = light, false = dark
      //Index(number) the index of the tile
      let t = document.getElementById(index);
      if(tileCode == store.OUTER_TILE_ID){
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
      }
    },
    selectNewTile() {
      document.getElementById("piece-settings").classList.remove("hidden");
      let cl;
      if((!this.isEmpty(document.getElementById("piece_color").value)) && (!this.isEmpty(document.getElementById("piece_speed").value))) { this.storeTileData(); }
      this.deselectCurrentTile();
      selectedTile.id = event.target.id;
      selectedTile.element = document.getElementById(selectedTile.id);
      selectedPiece.id = store.board[selectedTile.id];
      console.log("Backend board @ selected tile:" + store.board[selectedTile.id]);
      cl = selectedTile.element.classList;
      if(cl.contains("dark")){
          cl.remove("dark");
          cl.add("selected-dark");
        }
        else if(cl.contains("light")){
          cl.remove("light");
          cl.add("selected-light");
      }
      if(selectedPiece.id >= 0){ this.loadTileData(); }
    }, 
    deselectCurrentTile() {
      let cl;
      if(selectedTile.element!=null){
        cl = selectedTile.element.classList;
        if(cl.contains("selected-dark")){
          cl.remove("selected-dark");
          cl.add("dark");
        }
        else if(cl.contains("selected-light")){
          cl.remove("selected-light");
          cl.add("light");
        }
      }
    }, 
    storeTileData() {
      console.log("storing tile data");
      selectedPiece.data.color = document.getElementById("piece_color").value;
      selectedPiece.data.speed = document.getElementById("piece_speed").value;
      if(selectedPiece.id >= 0){
        store.board[selectedTile.id] = selectedPiece.id;
        store.customPieces[selectedPiece.id] = selectedPiece.data;
      }
      else{
        store.board[selectedTile.id] = nextPieceId;
        store.customPieces[nextPieceId] = selectedPiece.data;
        nextPieceId++;
      }
      document.getElementById("piece_color").value = null;
      document.getElementById("piece_speed").value = null;
    }, 
    loadTileData() {
      if(store.customPieces[selectedPiece.id] != undefined){
        selectedPiece.data.color = store.customPieces[selectedPiece.id].color;
        selectedPiece.data.speed = store.customPieces[selectedPiece.id].speed;
        document.getElementById("piece_color").value = store.customPieces[selectedPiece.id].color;
        document.getElementById("piece_speed").value = store.customPieces[selectedPiece.id].speed;
      }
    }, 
    isEmpty(str) {
      return !str.trim().length;
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

  .selected-dark {
    background-color: #acb300;
  }

  .selected-light {
    background-color: #f5ff00;
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