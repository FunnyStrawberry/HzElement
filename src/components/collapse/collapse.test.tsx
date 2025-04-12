import { describe, test, expect, beforeAll } from 'vitest'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import HzCollapse from './collapse.vue'
import HzCollapseItem from './collapse-item.vue'

let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disableContent: DOMWrapper<Element>
let changeEvent: unknown[]

describe('basic collapse', () => {
  beforeAll(() => {
    wrapper = mount(HzCollapse, {
      props: {
        modelValue: ['a'],
      },
      slots: {
        default: (
          <>
            <HzCollapseItem name="a" title="title a">
              content a
            </HzCollapseItem>
            <HzCollapseItem name="b" title="title b">
              content b
            </HzCollapseItem>
            <HzCollapseItem name="c" title="title c" disabled>
              content c
            </HzCollapseItem>
          </>
        ),
      },
      global: {
        stubs: ['Icon'],
      },
      attachTo: document.body,
    })
    headers = wrapper.findAll('.hz-collapse-item__header')
    contents = wrapper.findAll('.hz-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disableContent = contents[2]
  })
  test('测试基础结构以及对应文本', () => {
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 文本
    expect(firstHeader.text()).toBe('title a')
    // 内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })
  test('点击标题展开/关闭内容', async () => {
    // 行为事件
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  test('发送正确的事件', () => {
    expect(wrapper.emitted()).toHaveProperty('change')
    changeEvent = wrapper.emitted('change') as unknown[]
    expect(changeEvent).toHaveLength(2)
    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])
  })
  test('disabled的内容应该没有反应', async () => {
    // disabled
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
    expect(changeEvent).toHaveLength(2)
  })
})

describe('accordion collapse', () => {
  beforeAll(() => {
    wrapper = mount(HzCollapse, {
      props: {
        modelValue: ['a'],
        accordion: true,
      },
      slots: {
        default: (
          <>
            <HzCollapseItem name="a" title="title a">
              content a
            </HzCollapseItem>
            <HzCollapseItem name="b" title="title b">
              content b
            </HzCollapseItem>
            <HzCollapseItem name="c" title="title c" disabled>
              content c
            </HzCollapseItem>
          </>
        ),
      },
      global: {
        stubs: ['Icon'],
      },
      attachTo: document.body,
    })
    headers = wrapper.findAll('.hz-collapse-item__header')
    contents = wrapper.findAll('.hz-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disableContent = contents[2]
  })
  test('点击标题展开/关闭内容', async () => {
    // 行为事件
    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
  })
  test('发送正确的事件', () => {
    expect(wrapper.emitted()).toHaveProperty('change')
    changeEvent = wrapper.emitted('change') as unknown[]
    expect(changeEvent).toHaveLength(1)
    expect(changeEvent[0]).toEqual([['b']])
  })
  test('disabled的内容应该没有反应', async () => {
    // disabled
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
    expect(disableContent.isVisible()).toBeFalsy()
    expect(changeEvent).toHaveLength(1)
  })
})
