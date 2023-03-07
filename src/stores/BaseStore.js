import { defineStore } from "pinia";

export const useBaseStore = defineStore( "BaseStore", {

	state: () => {
		return{
			boardWidth: 30,
		}
	}

})