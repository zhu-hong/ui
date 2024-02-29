import { useState } from 'react'
import { useFocus, useFloating, FloatingPortal, useDismiss, useInteractions, offset, shift, flip, autoUpdate } from '@floating-ui/react'
import { Keyboard } from './keyboard'

export const Input = ({ value, onChange, number = false, point = false, placement = 'top', chinese = false, onEnter = null, ...props }) => {
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement,
    middleware: [
      offset(10),
      shift(),
      flip(),
    ],
  })
  
  const dismiss = useDismiss(context)
  const focus = useFocus(context)
  
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    focus,
  ])

  return <div>
    <input ref={refs.setReference} {...getReferenceProps({
      value,
      onChange: (e) => onChange(e.target.value),
      ...props,
    })} />
    <FloatingPortal root={document.getElementById('root')}>
      {
        open
        ?
        <div {...getFloatingProps({
          className: 'fkeyboard',
          ref: refs.setFloating,
          style: floatingStyles,
        })}>
          <Keyboard value={value} onChange={onChange} layout={number?'number':'default'} point={point} onEnter={onEnter} chinese={chinese} />
        </div>
        :
        null
      }
    </FloatingPortal>
  </div>
}
