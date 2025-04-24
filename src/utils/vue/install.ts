/* eslint-disable vue/prefer-import-from-vue, @typescript-eslint/no-explicit-any  */
import { NOOP } from '@vue/shared'
import type { SFCWithInstall } from './typescript'

/**
 * 主要用于给 Vue 组件添加 install 方法, 使其可以作为 Vue 插件(Plugin)被全局注册, 同时支持附加额外的组件或方法
 * @param main 主组件
 * @param extra 可以传入额外的组件或方法
 * @returns 增强后的 main
 */
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  // 给主组件添加 install 方法
  ;(main as SFCWithInstall<T>).install = (app: {
    component: (name: string, comp: { name: string }) => void
  }): void => {
    // 遍历 main 和 extra 的所有组件, 并使用 app.component() 全局注册它们
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  // 如果传入 extra, 把它们的所有属性挂载到 main 上
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }

  return main as SFCWithInstall<T> & E
}

/**
 * 主要用于给 Vue 组件添加一个空的 install 方法
 * @param component 组件
 * @returns 添加了 install 方法的组件
 */
export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
}
