import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HzInput from './input.vue'

describe('input.vue', () => {
  test('基本展示', () => {
    const wrapper = mount(HzInput, {
      props: {
        type: 'text',
        size: 'small',
        modelValue: '',
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      },
    })
    // 针对动态 class, 查看 classes 是否正确
    expect(wrapper.classes()).toContain('hz-input--text')
    expect(wrapper.classes()).toContain('hz-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    expect(wrapper.classes()).toContain('is-prefix')
    // 针对 v-if 是否渲染正确的标签以及内容
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.find('input').attributes('type')).toBe('text')
    // 针对 slots, 是否渲染对应的 slots 内容
    expect(wrapper.find('.hz-input__prepend').exists()).toBeTruthy()
    expect(wrapper.find('.hz-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.hz-input__prefix').exists()).toBeTruthy()
    expect(wrapper.find('.hz-input__prefix').text()).toBe('prefix')

    const textareaWrapper = mount(HzInput, {
      props: {
        type: 'textarea',
        modelValue: '',
      },
    })
    expect(textareaWrapper.find('textarea').exists()).toBeTruthy()
  })
  test('支持 v-model', async () => {
    const wrapper = mount(HzInput, {
      props: {
        type: 'text',
        modelValue: 'test',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
      attachTo: document.body,
    })
    // 初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // 更新值
    // 会触发 input 和 change 事件
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['test'])
    expect(changeEvent![0]).toEqual(['test'])
    // v-model 的异步更新
    await wrapper.setProps({ modelValue: 'prop undate' })
    expect(input.element.value).toBe('prop undate')
  })
  test('支持点击清空字符串', async () => {
    const wrapper = mount(HzInput, {
      props: {
        type: 'text',
        modelValue: 'test',
        clearable: true,
      },
      global: {
        stubs: ['icon'],
      },
    })
    // 不出现对应 icon 区域
    expect(wrapper.find('.hz-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    // 出现对应 icon 区域
    expect(wrapper.find('.hz-input__clear').exists()).toBeTruthy()
    // 点击对应 icon 区域, 值变为空并且对应 icon 消失
    await wrapper.get('.hz-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })
  test('支持切换密码显示', async () => {
    const wrapper = mount(HzInput, {
      props: {
        type: 'text',
        modelValue: '',
        showPassword: true,
      },
      global: {
        stubs: ['icon'],
      },
    })
    // 值为空, 不出现对应 icon 区域
    expect(wrapper.find('.hz-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    // 出现对应 icon 区域
    await input.setValue('123')
    const eyeIcon = wrapper.find('.hz-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击对应 icon 区域, 切换 input 类型, 并且 icon 图标切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.hz-input__password').attributes('icon')).toBe('eye')
  })
})
