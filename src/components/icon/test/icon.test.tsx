import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HzIcon from './icon.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

describe('icon.vue', () => {
  test('render', () => {
    const wrapper = mount(HzIcon, {
      props: {
        type: 'primary',
        icon: 'arrow-up',
        color: '#ff0000',
        size: '2xl',
      },
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })
    expect(wrapper.classes()).toContain('hz-icon--primary')
    expect(wrapper.attributes('style')).toContain(`color: rgb(255, 0, 0)`)
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
    expect(iconElement.attributes('size')).toBe('2xl')
  })
})
