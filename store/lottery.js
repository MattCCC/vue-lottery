/**
 * Handle lottery related data
 */
import config from '~/app.config.js'

import {
  range
} from '~/utils/range'

const shuffle = require('knuth-shuffle').knuthShuffle

export const state = () => ({
  drawnNumbers: [],
})


export const getters = {
  drawnNumbers: state => state.drawnNumbers,

  allNumbers: (state) => {
    return range(config.minNumber, config.gridSize)
  },
}


export const mutations = {
  DRAW_RANDOM_NUMBERS (state, numbersArray) {
    state.drawnNumbers = shuffle( numbersArray.slice(0) ).slice(0, config.stopDrawAfter)
  }
}


export const actions = {
  DRAW_RANDOM_NUMBERS ({ commit, getters }) {
    commit('DRAW_RANDOM_NUMBERS', getters.allNumbers)
  }
}
