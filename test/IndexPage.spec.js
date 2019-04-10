import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

import Index from '~/pages/index.vue'

describe('Index Page', () => {

  const localVue = createLocalVue()

  const wrapper = shallowMount(Index, {
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

})
