import Button from './src/button.vue'
import { withInstall } from '@hz-element/utils'
import type { SFCWithInstall } from '@hz-element/utils'

export const HzButton: SFCWithInstall<typeof Button> = withInstall(Button)

export default HzButton
