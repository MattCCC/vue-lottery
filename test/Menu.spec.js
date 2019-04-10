import { mount } from '@vue/test-utils'
import Menu from '@/components/Menu.vue'

describe('Menu', () => {

  const wrapper = mount(Menu)

  it('should not be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(false)
  })

  it('should contain props', () => {
    expect(wrapper.props).toBeDefined()
  })

})
