import type { SFCWithInstall } from '@hz-element/utils'
import { withInstall, withNoopInstall } from '@hz-element/utils'
import Button from './src/button.vue'
import ButtomGroup from './src/button-group.vue'

export const HzButton: SFCWithInstall<typeof Button> & {
  ButtomGroup: typeof ButtomGroup
} = withInstall(Button, { ButtomGroup })
export const HzButtonGroup: SFCWithInstall<typeof ButtomGroup> = withNoopInstall(ButtomGroup)

export default HzButton
