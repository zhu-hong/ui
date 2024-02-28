import { type FC } from 'react'
import RcDialog, { type DialogProps } from 'rc-dialog'

import './dialog.css'

export const Dialog: FC<Omit<DialogProps, 'visible'|'prefixCls'|'animation'|'maskAnimation'> & { open?: boolean }> = ({ open, ...props }) => {
  return <RcDialog
    {...props}
    visible={open}
    prefixCls='d2mdlg'
    animation='slide'
    maskAnimation='fade'
  />
}
