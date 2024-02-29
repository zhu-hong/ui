import { useRef, useState } from 'react'
import RKeyboard from 'react-simple-keyboard'
import chineseSet from 'simple-keyboard-layouts/build/layouts/chinese.js'

import 'react-simple-keyboard/build/css/index.css'
import './style.css'
import { useEffect } from 'react'

export const Keyboard = ({ value, onChange, layout, point, onEnter, chinese }) => {
  const kref = useRef(null)

  const [layoutName, setLayoutName] = useState(layout)

  const onKChange = (e) => {
    if(layoutName === 'number' && e.split('').filter((t) => t === '.').length >= 2) {
      e = e.split('.').slice(0,2).join('.')
      kref.current.setInput(e)
    }
    onChange(e)
  }
  const onKeyPress = (button, e) => {
    if(e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (button !== "{shift}" && button !== "{lock}" && button !== "{enter}") return

    if(button !== '{enter}') {
      setLayoutName(layoutName === 'default' ? 'shift' : 'default')
    } else {
      if(typeof onEnter === 'function') {
        onEnter(value)
      }
    }
  }

  useEffect(() => {
    if(kref.current !== null) {
      kref.current.setInput(value)
    }
  }, [value])

  return <RKeyboard
    keyboardRef={(ref) => {
      kref.current = ref
    }}
    layoutName={layoutName}
    layoutCandidates={(layoutName === 'default'&&chinese) ? chineseSet.layoutCandidates : undefined}
    layout={{
      default: [
        '1 2 3 4 5 6 7 8 9 0 - = {backspace}',
        'q w e r t y u i o p [ ] \\',
        `a s d f g h j k l ; \'${onEnter===null?'':' {enter}'}`,
        '{shift} z x c v b n m , . / {space}',
      ],
      shift: [
        '! @ # $ % ^ & * ( ) _ + {backspace}',
        'Q W E R T Y U I O P { } |',
        `A S D F G H J K L : "${onEnter===null?'':' {enter}'}`,
        '{lock} Z X C V B N M < > ? {space}',
      ],
      number: [
        '1 2 3',
        '4 5 6',
        '7 8 9',
        `0${point?' .':''} {backspace}`,
      ],
    }}
    display={{
      "{shift}": "⇧",
      "{lock}": "⇪",
      '{backspace}': '',
      '{enter}': 'Enter',
      '{space}': '',
    }}
    onKeyPress={onKeyPress}
    onChange={onKChange}
  />
}
