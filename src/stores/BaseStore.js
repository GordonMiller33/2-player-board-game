import { defineStore } from "pinia";

export const useBaseStore = defineStore( "BaseStore", {

	state: () => {
		return{
			boardWidth: 6,
			movementSpeed: 2,
			piecesPerPlayer: 2,
			numPieces: 0,
			customPieces: []
		}
	}
})