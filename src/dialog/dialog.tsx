import AntDialog, { DialogProps } from 'rc-dialog'
import { FC } from 'react'
import './dialog.css'

/**
 * @see https://dialog-react-component.vercel.app/#rc-dialog-1
*/
export const Dialog: FC<DialogProps> = (props) => {
  return <AntDialog
    {...props}
    animation='slide'
    maskAnimation='fade'
    prefixCls='dlg'
  />
}
