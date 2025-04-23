import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HzButton from './src/button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../icon/icon.vue'

describe('button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(HzButton, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'button',
      },
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('hz-button--primary')
    // slot
    // get, find
    expect(wrapper.get('button').text()).toBe('button')
    // events
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const wrapper = mount(HzButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'disabled',
      },
    })
    // attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    // attributes
    expect(wrapper.find('button').element.disabled).toBeDefined()
    // events
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  test('icon', () => {
    const wrapper = mount(HzButton, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon',
      },
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
  test('loading', () => {
    const wrapper = mount(HzButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading',
      },
      global: {
        stubs: ['Icon'],
      },
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
