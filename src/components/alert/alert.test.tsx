import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HzAlert from './alert.vue'
import Icon from '../icon/icon.vue'

describe('alert.vue', () => {
  test('render & type', () => {
    const wrapper = mount(() => <HzAlert title="Primary alert" type="primary" />, {
      global: {
        stubs: ['Icon'],
      },
    })
    expect(wrapper.get('.hz-alert').classes()).toContain('hz-alert--primary')
    expect(wrapper.get('.hz-alert').classes()).toContain('is-light')
    expect(wrapper.get('.hz-alert__title').text()).toBe('Primary alert')
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('xmark')
  })
  test('theme', () => {
    const wrapper = mount(() => <HzAlert title="Primary alert" type="primary" effect="dark" />, {
      global: {
        stubs: ['Icon'],
      },
    })
    expect(wrapper.get('.hz-alert').classes()).toContain('is-dark')
  })
  test('title slot', () => {
    const wrapper = mount(
      () => (
        <HzAlert
          type="primary"
          v-slots={{
            title: () => <h1>Primary alert</h1>,
          }}
        />
      ),
      {
        global: {
          stubs: ['Icon'],
        },
      },
    )
    expect(wrapper.get('h1').text()).toBe('Primary alert')
  })
  test('close', async () => {
    const wrapper = mount(() => <HzAlert title="Primary alert" type="primary" />, {
      global: {
        stubs: ['Icon'],
      },
      attachTo: document.body,
    })
    const closeBtn = wrapper.find('.hz-alert__close-btn')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(wrapper.get('.hz-alert').isVisible()).toBeFalsy()
  })
  test('unclosable close', async () => {
    const wrapper = mount(() => <HzAlert title="Primary alert" type="primary" closable={false} />, {
      global: {
        stubs: ['Icon'],
      },
      attachTo: document.body,
    })
    const closeBtn = wrapper.find('.hz-alert__close-btn')
    expect(closeBtn.exists()).toBe(false)
  })
})
