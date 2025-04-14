const zIndex = ref(0)

const useZIndex = (initialValue = 2000) => {
  const initialZIndex = ref(initialValue)
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}

export default useZIndex
