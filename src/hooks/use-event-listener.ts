const useEventListener = (
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => unknown,
) => {
  if (isRef(target)) {
    watch(
      () => target.value,
      (newValue, oldValue) => {
        oldValue?.removeEventListener(event, handler)
        newValue?.addEventListener(event, handler)
      },
    )
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}

export default useEventListener
