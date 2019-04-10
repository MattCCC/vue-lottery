import Vue from 'vue'
import Vuex from 'vuex'
import Play from '~/pages/play.vue'
import SquaresGrid from '~/components/SquaresGrid'
import sinon from 'sinon'

import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

Vue.use(Vuex)

import vuexMock from './mocks/vuexFactory'

describe('Play page', () => {
  let store = new Vuex.Store(vuexMock)

  const localVue = createLocalVue()
  localVue.use(Vuex)

  const wrapper = shallowMount(Play, {
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

  it('should render Stake box', () => {
    expect(wrapper.find('.stake').exists()).toBe(true)
  })

  it('should return correct number of squares', () => {
    expect(vm.squares.length).toBe(35)
  })

  it('should properly check if number is selected', () => {
    expect( vm.isNumberSelected(1) ).toBe(true)
  })

  it('should try to set stake when clicked', () => {
    const SET_STAKE = sinon.stub()
    wrapper.setMethods({
      SET_STAKE: SET_STAKE,
    })
    vm.onChangeStake( { target: {value: 5} } )
    expect( vm.SET_STAKE.called ).toBe(true)
  })

  it('should call Vuex number removal when selected', () => {
    const REMOVE_NUMBER = sinon.stub()
    wrapper.setMethods({
      REMOVE_NUMBER: REMOVE_NUMBER,
    })
    vm.onSquareClick(1)
    expect( vm.REMOVE_NUMBER.called ).toBe(true)
  })

  it('should call Vuex number add when selected', () => {
    const ADD_NUMBER = sinon.stub()
    wrapper.setMethods({
      ADD_NUMBER: ADD_NUMBER,
    })
    vm.onSquareClick(6)
    expect( vm.ADD_NUMBER.called ).toBe(true)
  })

})
