import { describe, test, expect } from 'vitest'
import { createMessage, removeAllMessage } from './method'

// 等待 Transition 组件动画执行结束
const rAF = async () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        resolve(null)
        await nextTick()
      })
    })
  })
}
const getTopValue = (element: Element) => {
  const style = window.getComputedStyle(element)
  const topValue = style.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('createMessage', () => {
  test('调用方法应该创建对应的 Message 组件', async () => {
    const instance = createMessage({ message: 'hello world', duration: 0 })
    await rAF()
    expect(document.querySelector('.hz-message')).toBeTruthy()
    instance.remove()
    await rAF()
    expect(document.querySelector('.hz-message')).toBeFalsy()
  })
  test('多次调用方法应该创建多个实例', async () => {
    createMessage({ message: 'hello world', duration: 0 })
    createMessage({ message: 'hello world 2', duration: 0 })
    await rAF()
    const elements = document.querySelectorAll('.hz-message')
    expect(elements.length).toBe(2)
    removeAllMessage()
    await rAF()
    expect(document.querySelector('.hz-message')).toBeFalsy()
  })
  test('创建多个实例应该设置正确的 offset', async () => {
    createMessage({ message: 'hello world', duration: 0, offset: 100 })
    createMessage({ message: 'hello world 2', duration: 0, offset: 50 })
    await rAF()
    const elements = document.querySelectorAll('.hz-message')
    expect(elements.length).toBe(2)
    const firstElementTop = getTopValue(elements[0])
    const secondElementTop = getTopValue(elements[1])
    // https://github.com/jsdom/jsdom/issues/1590
    // 在JS-dom 中，对应的 height 返回为零
    expect(firstElementTop).toBe(100)
    expect(secondElementTop).toBe(150)
  })
})
