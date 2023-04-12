import { defineStore } from "pinia";

export const useBaseStore = defineStore( "BaseStore", {

	state: () => {
		return{
			boardWidth: 6,
			movementSpeed: 2,
			piecesPerPlayer: 2,
			numPieces: 0,
			customPieces: new Map(),
			board: [],
			OUTER_TILE_ID: -2,
			EMPTY_TILE_ID: -1,
			MAX_EMPTY_TILE_ID: -1
		}
	}
})