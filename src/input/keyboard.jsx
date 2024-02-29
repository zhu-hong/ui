import { useRef, useState } from 'react'
import RKeyboard from 'react-simple-keyboard'
import chineseSet from 'simple-keyboard-layouts/build/layouts/chinese.js'

import 'react-simple-keyboard/build/css/index.css'
import './style.css'
import { useEffect } from 'react'

export const Keyboard = ({ value = '', onChange = () => {}, layout = 'default', point = false, onEnter = null, chinese = false }) => {
  const kref = useRef(null)

  const [layoutName, setLayoutName] = useState(layout)

  const onKChange = (e) => {
    if(layoutName === 'number') {
      if(e.split('').filter((t) => t === '.').length >= 2) {
        e = e.split('.').slice(0,2).join('.')
        kref.current.setCaretPosition(e.length)
        kref.current.setInput(e)
      }
      if(e[0] === '.') {
        e = '0'+e
        kref.current.setCaretPosition(e.length)
        kref.current.setInput(e)
      }
      if(e[0] === '0' && e[1] !== '.' && (+e > 1 || +e === 0)) {
        e = +e
        kref.current.setCaretPosition(e.length) 
        kref.current.setInput(e)
      }
    }
    kref.current.setInput(e)
    onChange(e.toString())
  }

  const onKeyPress = (button) => {
    if (button !== "{shift}" && button !== "{lock}" && button !== "{enter}") return

    if(button === '{enter}') {
      if(typeof onEnter === 'function') {
        onEnter(value)
      }
    } else {
      setLayoutName(layoutName === 'default' ? 'shift' : 'default')
    }
  }

  useEffect(() => {
    if(kref.current !== null) {
      kref.current.setInput(value)
      kref.current.setCaretPosition(value.length)

      if(layoutName === 'number') {
        if(value.includes('.')) {
          kref.current.setOptions({
            buttonAttributes: [
              {
                attribute: 'disabled',
                value: 'true',
                buttons: '.',
              },
            ],
         })
        } else {
          kref.current.setOptions({
            buttonAttributes: null
         })
        }
      }
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
      "{shift}": "",
      "{lock}": "",
      '{backspace}': '',
      '{enter}': 'Enter',
      '{space}': '',
    }}
    onKeyPress={onKeyPress}
    onChange={onKChange}
    preventMouseDownDefault
    useButtonTag
    layoutCandidatesPageSize={8}
  />
}
