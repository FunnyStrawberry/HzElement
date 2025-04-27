import type { SFCWithInstall } from '@hz-element/utils'
import { withInstall } from '@hz-element/utils'
import Icon from './src/icon.vue'

export const HzIcon: SFCWithInstall<typeof Icon> = withInstall(Icon)

export default HzIcon
