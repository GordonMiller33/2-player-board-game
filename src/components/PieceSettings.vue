<template>
  <div class="board">
    <div class="board-container">
      <table class="board-holder">
        <tr v-for="(item, i) in totalWidth" v-bind:key="i">
          <GameTile v-for="(item, j) in totalWidth" v-bind:key="j" v-bind:id="totalWidth*i+j" v-on:tile-click="clickNewTile()"></GameTile>
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
    <button v-on:click="addPiece(selectedTile.id)"> Add/Update Piece </button>
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

    if(store.totalWidth != totalWidth){
      store.customPieces = [];
      store.board = [];
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
      store.totalWidth = totalWidth;
    }
    else{
      nextPieceId = this.getNumPieces();
    }
    console.log("customPieces: " + store.customPieces);

    
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
      for(let i = 0; i < store.board.length; i++) {
        if(store.board[i] > store.EMPTY_TILE_ID) {
          this.loadPiece(i);
        }
      }
    },
    setInitalTileProperties(){
      let lightFlag = false;
      for (let i = 0; i < totalWidth; i++){
        if(totalWidth%2 == 0) { lightFlag = !lightFlag; }
        for (let j = 0; j < totalWidth; j++){
          let index = (totalWidth*i+j);
          this.setTile(index, store.board[index], lightFlag);
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
    clickNewTile() {
      document.getElementById("piece-settings").classList.remove("hidden");
      let tileId = event.target.id;
      if(tileId.includes("p")){
        tileId = document.getElementById(event.target.id).parentNode.id;
        console.log("TILEID " + tileId);
      }
      if(tileId != selectedTile.Id){  
        if(!this.isDataStored(tileId)) { 
          if(confirm("Are you sure you wish to select a new tile? Any changes to the piece at this location will be lost")){
            this.deselectCurrentTile();
            this.selectNewTile(tileId);
          }
        }
        else{
          this.deselectCurrentTile();
          this.selectNewTile(tileId);
        }
      }
      console.log("CUSTOM PIECES:");
      for(let i=0;i<this.getNumPieces();i++){
        console.log(this.getColor(i) + " " + this.getSpeed(i));
      }
    }, 
    selectNewTile(tileId) {
      document.getElementById("piece_color").value = null;
      document.getElementById("piece_speed").value = null;
      let cl;
      selectedTile.id = tileId;
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
        this.setSpeed(selectedPiece.id, selectedPiece.data.speed);
        this.setColor(selectedPiece.id, selectedPiece.data.color);
      }
      else{
        store.board[selectedTile.id] = nextPieceId;
        console.log("storing in customPieces[" + nextPieceId + "]");
        this.setSpeed(nextPieceId, selectedPiece.data.speed);
        this.setColor(nextPieceId, selectedPiece.data.color);
        selectedPiece.id = nextPieceId;
        nextPieceId++;
      }
      console.log("CUSTOM PIECES:");
      for(let i=0;i<this.getNumPieces();i++){
        console.log(this.getColor(i) + " " + this.getSpeed(i));
      }
    }, 
    loadTileData() {
      if(this.getSpeed(selectedPiece.id) != undefined){
        selectedPiece.data.color = this.getColor(selectedPiece.id);
        selectedPiece.data.speed = this.getSpeed(selectedPiece.id);
        document.getElementById("piece_color").value = this.getColor(selectedPiece.id);
        document.getElementById("piece_speed").value = this.getSpeed(selectedPiece.id);
      }
    },
    isDataStored() {
      let color = document.getElementById("piece_color").value.trim();
      let speed = document.getElementById("piece_speed").value.trim();
      if(color != "" || speed != ""){
        if(this.getSpeed(selectedPiece.id) != null && this.getColor(selectedPiece.id) != null){
          return (color == this.getColor(selectedPiece.id) && speed == this.getSpeed(selectedPiece.id));
        }
        else{
          return false;
        }
      }
      else{
        return true;
      }
    },
    addPiece(tileId) {
      console.log("---adding piece---")
      if(store.board[tileId] == store.EMPTY_TILE_ID){
        let piece = document.createElement("span");
        piece.classList.add("piece");
        piece.style.backgroundColor = document.getElementById("piece_color").value.trim();
        piece.id = "p" + nextPieceId;
        selectedTile.element.appendChild(piece);
      }
      else{
        console.log("looking for piece with id " + "p" + selectedPiece.id);
        document.getElementById("p" + selectedPiece.id).style.backgroundColor = document.getElementById("piece_color").value.trim();
      }
      console.log("CUSTOM PIECES:");
      for(let i=0;i<this.getNumPieces();i++){
        console.log(this.getColor(i) + " " + this.getSpeed(i));
      }
      this.storeTileData();
    },
    loadPiece(tileId) {
      console.log("---loading piece---")
      let pId = store.board[tileId];
      let piece = document.createElement("span");
      piece.classList.add("piece");
      console.log("loading custom piece # " + pId);
      piece.style.backgroundColor = this.getColor(pId);
      piece.id = "p" + pId;
      document.getElementById(tileId).appendChild(piece);
    },
    getSpeed(index){
      return store.customPieces[2*index+1];
    },
    getColor(index){
      return store.customPieces[2*index];
    },
    setSpeed(index, value){
      store.customPieces[2*index+1] = value;
    },
    setColor(index, value){
      store.customPieces[2*index] = value;
    },
    getNumPieces() {
      return store.customPieces.length/2;
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

  .piece {
    width: 50px;
    height: 50px;
    border: 2px solid black;
    border-radius: 50px;
    display: inline-block;
  }
</style>