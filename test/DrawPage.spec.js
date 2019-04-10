import Vue from 'vue'
import Vuex from 'vuex'
import Draw from '~/pages/draw.vue'
import SquaresGrid from '~/components/SquaresGrid'
import sinon from 'sinon'

import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

Vue.use(Vuex)

import vuexMock from './mocks/vuexFactory'

describe('Draw page', () => {
  let store = new Vuex.Store(vuexMock)

  const localVue = createLocalVue()
  localVue.use(Vuex)

  const wrapper = shallowMount(Draw, {
    store,
    localVue,
    mocks: {
      $metaInfo: {
        title: ''
      }
    },
    stubs: ['NLink']
  })

  const vm = wrapper.vm


  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render section tag', () => {
    expect(wrapper.contains('section')).toBe(true)
  })

  it('should have page title set', () => {
    expect(vm.$options.head().title).toBeDefined()
  })

  it('should render Betslip', () => {
    expect(wrapper.find('.betslip').exists()).toBe(true)
  })

  it('should render Draw button', () => {
    expect(wrapper.find('.do-draw').exists()).toBe(true)
  })

  it('should return proper number of tickets', () => {
    expect(vm.numTickets).toBe(2)
  })

  it('should append all drawn numbers locally', () => {
    jest.useFakeTimers()
    vm.appendDrawnNumbers().then(() => {
      expect(window.setTimeout).toHaveBeenCalledTimes(35)
    })
  })

  it('should asynchronously call draw finish on Draw click', () => {
    const DRAW_RANDOM_NUMBERS = sinon.stub()
    const appendDrawnNumbers = sinon.stub()
    const finishDraw = sinon.stub()

    wrapper.setMethods({
      DRAW_RANDOM_NUMBERS: DRAW_RANDOM_NUMBERS,
      appendDrawnNumbers: appendDrawnNumbers,
      finishDraw: finishDraw,
    })

    vm.onClickDraw().then(() => {
      expect(vm.finishDraw.called).toBe(true)
    })
  })

  it('should have a winning ticket', () => {
    vm.calculateWinningTickets()
    expect(vm.numWinningTickets).toBe(1)
  })

  it('should return correct winning amount', () => {
    vm.calculateWinningTickets()
    expect(vm.winningAmount).toBe(4900)
  })

  it('should calculate timeout for a Number', () => {
    expect( vm.calcNumberTimeout(0) ).not.toBe(4900)
  })

})
