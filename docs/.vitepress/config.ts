import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Hz Element Project',
  description: 'A VitePress Site',
  vite: {
    plugins: [
      // @ts-expect-error 类型Plugin<any>不呢分配PluginOption
      vueJsx(),
      // @ts-expect-error 类型Plugin<any>不呢分配PluginOption
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: fileURLToPath(new URL('../../auto-import.d.ts', import.meta.url)),
        eslintrc: {
          // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
          enabled: false,
          // 生成文件地址和名称
          filepath: fileURLToPath(new URL('../../.eslintrc-auto-import.json', import.meta.url)),
          globalsPropValue: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
        '@hz-element/utils': fileURLToPath(new URL('../../src/utils', import.meta.url)),
      },
    },
  },
  // srcDir: 'components',
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/components/button' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Basic 基础组件',
        items: [{ text: 'Button 按钮', link: '/components/button' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
