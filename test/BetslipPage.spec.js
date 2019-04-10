import Vue from 'vue'
import Vuex from 'vuex'
import Betslip from '~/pages/betslip.vue'
import SquaresGrid from '~/components/SquaresGrid'
import sinon from 'sinon'

import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

Vue.use(Vuex)

import vuexMock from './mocks/vuexFactory'

describe('Betslip page', () => {
  let store = new Vuex.Store(vuexMock)

  const localVue = createLocalVue()
  localVue.use(Vuex)

  const wrapper = shallowMount(Betslip, {
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

  it('should return correct number of bought tickets', () => {
    expect(vm.boughtTickets).toBe(2)
  })

})
