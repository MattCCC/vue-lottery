/**
 * Handle user's related lottery data
 */
import config from '~/app.config.js'

export const state = () => ({
  stake: config.defaultStake,
  balance: config.defaultBalance,

  currentNumbers: [], // current numbers on Play page
  tickets: [],
})


export const getters = {
  stake: state => state.stake,
  balance: state => state.balance,

  currentNumbers: state => state.currentNumbers,
  tickets: state => state.tickets,

  numNumbers: state => state.currentNumbers.length,
  numTickets: state => state.tickets.length,
  ticketsLeft: (state, getters) => config.maxTickets - getters.numTickets,

  allSelectedNumbers(state, getters) {
    return getters.numNumbers === config.maxNumbers
  },

  stakeWithinRange(state, getters) {
    return getters.stake >= config.minStake && getters.stake <= config.maxStake
  },

  hasEnoughBalance(state, getters) {
    return getters.balance - getters.stake >= 0
  },

  canBuyMoreTickets(state, getters) {
    return getters.numTickets < config.maxTickets
  },

  canBuyTicket(state, getters) {
    return getters.allSelectedNumbers
      && getters.stakeWithinRange
      && getters.hasEnoughBalance
      && getters.canBuyMoreTickets
  },
}


export const mutations = {
  SET_STAKE (state, number) {
    state.stake = Number(number)
  },
  RESET_STAKE (state) {
    state.stake = config.defaultStake
  },
  ADD_NUMBER (state, number) {
    state.currentNumbers.push(Number(number))
  },
  REMOVE_NUMBER (state, number) {
    state.currentNumbers = state.currentNumbers.filter(v => v !== Number(number))
  },
  REMOVE_NUMBERS (state) {
    state.currentNumbers.splice(0, state.currentNumbers.length)
  },
  ADD_BALANCE (state, value) {
    state.balance += value
  },
  SUBTRACT_BALANCE (state, value) {
    state.balance -= value
  },
  ADD_TICKET (state, ticketObj) {
    state.tickets.unshift(ticketObj)
  },
  REMOVE_TICKETS (state) {
    state.tickets.splice(0, state.tickets.length)
  },
}


export const actions = {
  SET_STAKE ({ commit }, value) {
    commit('SET_STAKE', value)
  },
  RESET_STAKE ({ commit }) {
    commit('RESET_STAKE')
  },
  ADD_NUMBER ({ commit }, number) {
    commit('ADD_NUMBER', number)
  },
  REMOVE_NUMBER ({ commit }, number) {
    commit('REMOVE_NUMBER', number)
  },
  REMOVE_NUMBERS ({ commit }) {
    commit('REMOVE_NUMBERS')
  },
  ADD_BALANCE ({ commit }, value) {
    commit('ADD_BALANCE', value)
  },
  SUBTRACT_BALANCE ({ commit }, value) {
    commit('SUBTRACT_BALANCE', value)
  },
  ADD_TICKET ({ commit }, ticketObj) {
    commit('ADD_TICKET', ticketObj)
  },
  REMOVE_TICKETS ({ commit }) {
    commit('REMOVE_TICKETS')
  },
  async BUY_TICKET ({ commit, getters }) {
    await commit('SUBTRACT_BALANCE', getters.stake)
    await commit('ADD_TICKET', {
      stake: getters.stake,
      numbers: getters.currentNumbers.slice(0),
    })
    await commit('REMOVE_NUMBERS')
    await commit('RESET_STAKE')
  },
  FINISH_DRAW ({ commit }) {
    commit('REMOVE_TICKETS')
  },
}
