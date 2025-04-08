import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

export interface IIconProps extends FontAwesomeIconProps {
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
  color?: string
}
