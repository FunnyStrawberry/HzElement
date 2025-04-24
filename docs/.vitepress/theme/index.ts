import DefaultTheme from 'vitepress/theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'

import '@vitepress-demo-preview/component/dist/style.css'
import '../../../src/assets/main.css'
import './custom.css'
library.add(fas)

import { HzButton } from '../../../src/components/button'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(HzButton)
    app.component('demo-preview', ElementPlusContainer)
  },
}
