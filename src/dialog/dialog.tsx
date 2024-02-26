import { type FC, useState } from 'react'
import RcDialog, { type DialogProps } from 'rc-dialog'
import { render, unmount } from 'rc-util/es/React/render'

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

const ConfirmDialog = ({ afterClose, resolve, reject }) => {
  const [open, setOpen] = useState(true)

  return <Dialog title='提示' open={open} onClose={() => setOpen(false)} footer={<>
    <button onClick={() => {
      resolve()
      setOpen(false)
    }}>同意</button>
    <button onClick={() => {
      reject()
      setOpen(false)
    }}>不同意</button>
  </>} afterClose={afterClose}>
    这是☝️提示
  </Dialog>
}

export const confirm = () => {
  return new Promise((resolve, reject) => {
    const container = document.createDocumentFragment()

    render(<ConfirmDialog afterClose={() => {
      unmount(container)
    }} resolve={resolve} reject={reject} />, container)
  })
}
