/**
 * Plugin 是 Vue 的插件类型, 它要求对象必须有一个 install 方法, 用于在 Vue 应用(app)中注册插件
 */
import type { Plugin } from 'vue'

/**
 * 定义并导出一个泛型类型 SFCWithInstall<T>
 * 意味着 SFCWithInstall<T> 既具有 T 的所有属性/方法, 又具有 Plugin 的 install 方法
 * 用途: 在 Vue 生态中, 这种模式常用于让组件既能单独使用, 又能通过 app.use() 全局注册
 */
export type SFCWithInstall<T> = T & Plugin
