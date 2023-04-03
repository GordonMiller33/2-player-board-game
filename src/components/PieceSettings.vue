<template>
  <GamePiece v-for="(item, index) in numPieces" v-bind:key="index" v-bind:id="'p'+(index+1)" v-on:click-piece="updateState(2)"/>
  <div class="board">
    <div class="board-container">
      <table class="board-holder">
        <tr v-for="(item, i) in totalWidth" v-bind:key="i">
          <GameTile v-for="(item, j) in totalWidth" v-bind:key="j" v-bind:id="totalWidth*i+j" v-on:tile-click="selectNewTile()"></GameTile>
        </tr>
      </table>
    </div>
  </div>
  <p><b>Pieces per Player</b><br>(even only, max=Board Width)</p>
  <input v-bind:id="piece_number" placeholder="edit me" />
</template>

<script setup>
console.log("------script setup------")
import { useBaseStore } from '@/stores/BaseStore.js';
</script>
<script>
import GamePiece from '@/components/GamePiece.vue'
import GameTile from '@/components/GameTile.vue'


const store = useBaseStore();
let boardWidth = parseInt(store.boardWidth);
let maxPieceMovement = parseInt(store.movementSpeed);
let totalWidth = boardWidth+maxPieceMovement*2;
let board = [];
let numPieces = 0;


//let pieces;
let tiles;

let selectedTile = {
  id: 0,
  element: null
}



export default {  
  name: 'PieceSettings',
  data()  {
    return {
    }
  },
  created() {
    numPieces = 0;
    board = [];
    boardWidth = parseInt(store.boardWidth);
    maxPieceMovement = parseInt(store.movementSpeed);
    totalWidth = boardWidth+maxPieceMovement*2;
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
    GamePiece,
    GameTile
  },
  methods: {
    updateBoard() {
      for(let i = 0; i < board.length; i++) {
        if(board[i] > 0) {
          tiles[i].appendChild(this.findPieceByIdNum(board[i]));
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
      }
    },
    selectNewTile() {
      let cl;
      this.storeTileData();
      this.deselectCurrentTile();
      selectedTile.id = event.target.id;
      selectedTile.element = document.getElementById(selectedTile.id);
      cl = selectedTile.element.classList;
      if(cl.contains("dark")){
          cl.remove("dark");
          cl.add("selected-dark");
        }
        else if(cl.contains("light")){
          cl.remove("light");
          cl.add("selected-light");
      }
      this.loadTileData();
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
      store.customPieces[numPieces] = document.getElementById("piece_number").value;
      numPieces++;
    }, 
    loadTileData() {
      document.getElementById("piece_number").value
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