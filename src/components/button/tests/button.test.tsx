import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { ButtonSize } from '../src/button'
import HzButton from '../src/button.vue'
import HzButtonGroup from '../src/button-group.vue'

describe('button.vue', () => {
  test('create', () => {
    const wrapper = mount(() => <HzButton type="primary" />)

    expect(wrapper.classes()).toContain('hz-button--primary')
  })

  test('icon', () => {
    const wrapper = mount(() => <HzButton icon="search" />, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })

    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('search')
  })

  test('nativeType', () => {
    const wrapper = mount(() => <HzButton nativeType="submit" />)

    expect(wrapper.attributes('type')).toBe('submit')
  })

  test('loading', () => {
    const wrapper = mount(() => <HzButton loading />, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })

    expect(wrapper.classes()).toContain('is-loading')
    const loadingElement = wrapper.findComponent(FontAwesomeIcon)
    expect(loadingElement.exists()).toBeTruthy()
    expect(loadingElement.attributes('icon')).toBe('spinner')
  })

  test('size', () => {
    const wrapper = mount(() => <HzButton size="large" />)

    expect(wrapper.classes()).toContain('hz-button--large')
  })

  test('plain', () => {
    const wrapper = mount(() => <HzButton plain />)

    expect(wrapper.classes()).toContain('is-plain')
  })

  test('round', () => {
    const wrapper = mount(() => <HzButton round />)

    expect(wrapper.classes()).toContain('is-round')
  })

  test('circle', () => {
    const wrapper = mount(() => <HzButton circle />)

    expect(wrapper.classes()).toContain('is-circle')
  })

  test('text', async () => {
    const textBg = ref(false)
    const wrapper = mount(() => <HzButton text textBg={textBg.value} />)

    expect(wrapper.classes()).toContain('is-text')

    textBg.value = true
    await nextTick()

    expect(wrapper.classes()).toContain('is-text-bg')
  })

  test('link', () => {
    const wrapper = mount(() => <HzButton link />)

    expect(wrapper.classes()).toContain('is-link')
  })

  test('render text', () => {
    const wrapper = mount(() => <HzButton>button</HzButton>)

    expect(wrapper.text()).toBe('button')
  })

  test('handle click', async () => {
    const wrapper = mount(() => <HzButton>button</HzButton>)
    await wrapper.trigger('click')

    expect(wrapper.emitted()).toBeDefined() // 判断是否触发的事件
  })

  test('handle click inside', async () => {
    const wrapper = mount(() => (
      <HzButton>
        <span class="inner-slot"></span>
      </HzButton>
    ))
    await wrapper.find('.inner-slot').trigger('click')

    expect(wrapper.emitted()).toBeDefined()
  })

  test('loading implies disabled', async () => {
    const wrapper = mount(() => <HzButton loading>button</HzButton>, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })
    await wrapper.trigger('click')

    expect(wrapper.emitted()).toEqual({})
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  test('disabled', async () => {
    const wrapper = mount(() => <HzButton disabled />)

    expect(wrapper.classes()).toContain('is-disabled')

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  test('loading icon', () => {
    const wrapper = mount(() => <HzButton loadingIcon="rotate" loading />, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })

    const loadingElement = wrapper.findComponent(FontAwesomeIcon)
    expect(loadingElement.exists()).toBeTruthy()
    expect(loadingElement.attributes('icon')).toBe('rotate')
  })

  test('tag', () => {
    const link = 'https://github.com/FunnyStrawberry/HzElement'
    const wrapper = mount(() => (
      <HzButton tag="a" href={link}>
        button
      </HzButton>
    ))

    expect(wrapper.text()).toEqual('button')
    expect(wrapper.element.nodeName).toBe('A')
    expect(wrapper.attributes('href')).toBe(link)
  })

  test('tag disabled click not triggered', async () => {
    const isLoading = ref(false)
    const isDisabled = ref(false)
    const wrapper = mount(() => (
      <div>
        <HzButton tag="div" loading={isLoading.value} disabled={isDisabled.value} />
      </div>
    ))
    const btn = wrapper.findComponent(HzButton)
    isDisabled.value = true
    await nextTick()
    await btn.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()

    isLoading.value = true
    isDisabled.value = false
    await nextTick()
    await btn.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()

    isLoading.value = false
    isDisabled.value = false
    await nextTick()
    await btn.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})

describe('button-group.vue', () => {
  test('create', () => {
    const wrapper = mount(() => (
      <HzButtonGroup>
        <HzButton type="primary">上一页</HzButton>
        <HzButton type="primary">下一页</HzButton>
      </HzButtonGroup>
    ))

    expect(wrapper.classes()).toContain('hz-button-group')
    expect(wrapper.findAll('button').length).toBe(2)
  })

  test('size', async () => {
    const size = ref<ButtonSize>('small')
    const wrapper = mount(() => (
      <HzButtonGroup size={size.value}>
        <HzButton type="primary">上一页</HzButton>
        <HzButton type="primary">下一页</HzButton>
      </HzButtonGroup>
    ))

    expect(wrapper.classes()).toContain('hz-button-group')
    expect(wrapper.findAll('.hz-button-group button.hz-button--small').length).toBe(2)

    size.value = 'large'
    await nextTick()

    expect(wrapper.findAll('.hz-button-group button.hz-button--large').length).toBe(2)
  })

  test('type', async () => {
    const wrapper = mount(() => (
      <HzButtonGroup type="warning">
        <HzButton type="primary">上一页</HzButton>
        <HzButton>下一页</HzButton>
      </HzButtonGroup>
    ))

    expect(wrapper.classes()).toContain('hz-button-group')
    expect(wrapper.findAll('.hz-button-group button.hz-button--primary').length).toBe(1)
    expect(wrapper.findAll('.hz-button-group button.hz-button--warning').length).toBe(1)
  })
})
