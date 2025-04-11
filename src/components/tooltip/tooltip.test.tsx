import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HzTooltip from './tooltip.vue'
const onVisibleChange = vi.fn()
describe('tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('发送正确的事件', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <HzTooltip content="hello tooltip" trigger="click" onVisible-change={onVisibleChange}>
            <button id="trigger">Trigger</button>
          </HzTooltip>
        </div>
      ),
      {
        attachTo: document.body,
      },
    )
    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.hz-tooltip__popper').exists()).toBeFalsy()
    // 测试点击行为
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.hz-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.hz-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.hz-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
