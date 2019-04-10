import { mount } from '@vue/test-utils'
import CustomButton from '@/components/CustomButton.vue'

describe('CustomButton', () => {

  const wrapper = mount(CustomButton)

  it('should not be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(false)
  })

  it('should contain props', () => {
    expect(wrapper.props).toBeDefined()
  })

})
