import { type FC, createElement, useEffect, useState } from 'react'
import RCDialog, { DialogProps } from 'rc-dialog'
import { keyframes, css, setup } from 'goober'
import { render, unmount } from 'rc-util/es/React/render'

setup(createElement)

let prefixCls = ''

const initDialogCss = () => {
  const fadeInAnimate = keyframes`
    100% {
      opacity: 1;
    }
  `
  const fadeOutAnimate = keyframes`
    to {
      opacity: 0;
    }
  `

  const slideInAnimate = keyframes`
    from {
      transform: scale(.95,.95) translate3d(0,4%,0);
    }

    to {
      opacity: 1;
    }
  `
  const slideOutAnimate = keyframes`
    to {
      opacity: 0;
      transform: scale(.95,.95) translate3d(0,4%,0);
    }
  `
  prefixCls = css`
    max-width: 100%;
    max-height: 100%;
    &-wrap {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 32px;
    }
    & {
    }
    &-content {
      position: relative;
      background-color: #fff;
      max-width: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    &-header,&-footer {
      flex: 0 0 auto;
    }
    &-body {
      flex: 1 1 auto;
      overflow: auto;
    }
    &-slide-enter,
    &-slide-appear {
      opacity: 0;
      animation: .2s ease-in both paused;
    }
    &-slide-leave {
      animation: .2s ease-out both paused;
    }
    &-slide-enter&-slide-enter-active,
    &-slide-appear&-slide-appear-active {
      animation-name: ${slideInAnimate};
      animation-play-state: running;
    }
    &-slide-leave&-slide-leave-active {
      animation-name: ${slideOutAnimate};
      animation-play-state: running;
    }

    &-mask {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    &-fade-enter,
    &-fade-appear {
      opacity: 0;
      animation: .2s ease-in both paused;
    }
    &-fade-leave {
      animation: .2s ease-out both paused;
    }
    &-fade-enter&-fade-enter-active,
    &-fade-appear&-fade-appear-active {
      animation-name: ${fadeInAnimate};
      animation-play-state: running;
    }
    &-fade-leave&-fade-leave-active {
      animation-name: ${fadeOutAnimate};
      animation-play-state: running;
    }
  `
}

export const Dialog: FC<Omit<DialogProps, 'visible'|'prefixCls'|'animation'|'maskAnimation'>&{open?:boolean}> = ({ open, ...props }) => {
  useEffect(() => {
    if(prefixCls === '') {
      initDialogCss()
    }
  }, [])
  return <RCDialog
    {...props}
    visible={open}
    prefixCls={prefixCls}
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
