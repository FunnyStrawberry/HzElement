<script setup lang="ts">
import { size } from '@floating-ui/vue'
import { isFunction, debounce } from 'lodash'
import type {
  SelectOptionType,
  SelectModelType,
  ISelectStates,
  ISelectProps,
  ISelectEmits,
} from './type'
import RenderVnode from '@/common/render-vnode'
import type { ITooltipInstance } from '../tooltip/types'
import Tooltip from '../tooltip/tooltip.vue'
import type { IInputInstance } from '../input/type'
import HzInput from '../input/input.vue'
import Icon from '../icon/icon.vue'

defineOptions({
  name: 'HzSelect',
})
const {
  options = [],
  placeholder,
  disabled,
  clearable,
  filterable,
  filterMethod,
  remote,
  remoteMethod,
} = defineProps<ISelectProps>()
const emits = defineEmits<ISelectEmits>()
const modelValue = defineModel<SelectModelType>({
  required: true,
})

const tooltipNode = useTemplateRef<ITooltipInstance>('tooltipRef')
const inputNode = useTemplateRef<IInputInstance>('inputRef')
const timeout = computed(() => (remote ? 300 : 0))
const showClear = computed(() => {
  return clearable && states.mouseHover && states.selectOption && states.inputValue.trim() !== ''
})
const onClear = () => {
  states.selectOption = null
  states.inputValue = ''
  modelValue.value = ''
  emits('clear')
  emits('change', '')
}
const isDropdownShow = ref(false)
const controlDropdown = (isShow: boolean) => {
  if (isShow) {
    // filter模式并且之前选择过对应的值
    if (filterable && states.selectOption) {
      states.inputValue = ''
    }
    // 重置过滤条件
    if (filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipNode.value?.add()
  } else {
    tooltipNode.value?.remove()
    // blur 时候将值返回到 input 中
    if (filterable) {
      states.inputValue = states.selectOption ? states.selectOption.label : ''
    }
    states.highLightIndex = -1
  }
  isDropdownShow.value = isShow
  emits('visible-change', isShow)
}
const toggleDropdown = () => {
  if (disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
const findOption = (value: string) => {
  const option = options.find((option) => option.value === value)
  return option ? option : null
}
const initialOption = findOption(modelValue.value)
const states = reactive<ISelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectOption: initialOption,
  mouseHover: false,
  loading: false,
  highLightIndex: -1,
})
const itemSelect = (e: SelectOptionType) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectOption = e
  modelValue.value = e.value
  emits('change', e.value)
  controlDropdown(false)
  inputNode.value?.ref.focus()
}
const middlewareOptions = [
  size({
    apply({ rects, elements }) {
      Object.assign(elements.floating.style, {
        minWidth: `${rects.reference.width}px`,
      })
    },
  }),
]
const filterOptions = ref(options)
const generateFilterOptions = async (searchValue: string) => {
  if (!filterable) return
  if (filterMethod && isFunction(filterMethod)) {
    filterOptions.value = filterMethod(searchValue)
  } else if (remote && remoteMethod && isFunction(remoteMethod)) {
    states.loading = true
    try {
      filterOptions.value = await remoteMethod(searchValue)
    } catch (error) {
      console.error(error)
      filterOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filterOptions.value = options.filter((option) => option.label.includes(searchValue))
  }
  states.highLightIndex = -1
}
const onFilter = debounce(() => {
  generateFilterOptions(states.inputValue)
}, timeout.value)
const filteredPlaceholder = computed(() => {
  return filterable && states.selectOption && isDropdownShow.value
    ? states.selectOption.label
    : placeholder
})
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true)
      } else {
        if (states.highLightIndex > -1 && filterOptions.value[states.highLightIndex]) {
          itemSelect(filterOptions.value[states.highLightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (filterOptions.value.length > 0) {
        if (states.highLightIndex === -1 || states.highLightIndex === 0) {
          states.highLightIndex = filterOptions.value.length - 1
        } else {
          states.highLightIndex--
        }
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (filterOptions.value.length > 0) {
        if (
          states.highLightIndex === -1 ||
          states.highLightIndex === filterOptions.value.length - 1
        ) {
          states.highLightIndex = 0
        } else {
          states.highLightIndex++
        }
      }
      break
    default:
      break
  }
}
const NOOP = () => {}

watch(
  () => options,
  (newOptions) => {
    filterOptions.value = newOptions
  },
)
</script>

<template>
  <div
    class="hz-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <tooltip
      ref="tooltipRef"
      placement="bottom-start"
      manual
      :middlewareOptions="middlewareOptions"
      @clickOutside="controlDropdown(false)"
    >
      <hz-input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="onFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <icon
            icon="circle-xmark"
            v-if="showClear"
            class="hz-input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          />
          <icon
            icon="angle-down"
            v-else
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </hz-input>
      <template #content>
        <div class="hz-select__loading" v-if="states.loading">
          <icon icon="spinner" spin />
        </div>
        <div class="hz-select__nodata" v-else-if="filterable && filterOptions.length === 0">
          <span>no matching data</span>
        </div>
        <ul class="hz-select__menu" v-else>
          <template v-for="(item, index) in filterOptions" :key="item.value">
            <li
              :id="`select-item-${item.value}`"
              class="hz-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectOption?.value === item.value,
                'is-highlighted': states.highLightIndex === index,
              }"
              @click.stop="itemSelect(item)"
            >
              <render-vnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </tooltip>
  </div>
</template>

<style scoped></style>
