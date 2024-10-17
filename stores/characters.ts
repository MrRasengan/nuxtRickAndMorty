import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    selectedCharacter: null,
  }),
  actions: {
    selectCharacter(character: any) {
      this.selectedCharacter = character
    },
    clearSelection() {
      this.selectedCharacter = null
    },
  },
})
