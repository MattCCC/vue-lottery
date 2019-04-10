import {
  range
} from '~/utils/range'

// Modules could be eventually separated depending on the size of App..

import {
  mutations as lotteryMutations,
  actions as lotteryActions
} from '~/store/lottery.js'

import {
  mutations as userMutations,
  actions as userActions
} from '~/store/userLottery.js'



const lotteryState = () => ({
  drawnNumbers: range(1, 35),
})


const lotteryGetters = {
  drawnNumbers: state => state.drawnNumbers,

  allNumbers: state => range(1, 35),
}


const userState = () => ({
  stake: 75,
  balance: 500,

  currentNumbers: [1,2,3,4,5], // current numbers on Play page
  tickets: [
    {
      stake: 245,
      numbers: [1,2,3,4,5,6]
    },
    {
      stake: 12,
      numbers: [17,25,34,41,15,46]
    }
  ],
})

const userGetters = {
  stake: state => state.stake,
  balance: state => state.balance,
  currentNumbers: state => state.currentNumbers,
  tickets: state => state.tickets,

  numNumbers: state => state.currentNumbers.length,
  numTickets: state => state.tickets.length,
  ticketsLeft: (state, getters) => 10 - getters.numTickets,

  allSelectedNumbers(state, getters) {
    return getters.numNumbers === 6
  },
}

export default {
  modules: {
    lottery: {
      namespaced: true,
      state: lotteryState,
      getters: lotteryGetters,
      mutations: lotteryMutations,
      actions: lotteryActions
    },
    userLottery: {
      namespaced: true,
      state: userState,
      getters: userGetters,
      mutations: userMutations,
      actions: userActions
    }
  }
}
