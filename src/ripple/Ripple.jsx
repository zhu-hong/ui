import { createElement, forwardRef, useRef, useEffect } from 'react'
import { styled, setup } from 'goober'
import { TouchRipple } from './TouchRipple'
import { useTouchRipple } from './useTouchRipple'
import { useButton } from './useButton'
import { useForkRef } from './useForkRef'
import { useSlotProps } from './useSlotProps'
import clsx from 'clsx'

setup(createElement)

export const RippleRoot = styled('button', forwardRef)`
  position: relative;
`

export const Ripple = forwardRef((props, ref) => {
  const {
    children,
    as = 'button',
    disabled = false,
    centerRipple = false,
    focusRipple = true,
    disableRipple = false,
    disableTouchRipple = false,
    focusableWhenDisabled = false,
    disabledClassName,
    focusVisibleClassName,
    tabIndex = 0,
    type,
    ...other
  } = props

  const buttonRef = useRef(null)
  const handleRef = useForkRef(buttonRef, ref)
  const { focusVisible, getRootProps } = useButton({
    disabled,
    focusableWhenDisabled,
    tabIndex,
    rootRef: handleRef,
  })

  const rippleRef = useRef(null)
  const handleRippleRef = useForkRef(rippleRef)
  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled,
    disableRipple,
    disableTouchRipple,
    rippleRef,
  })
  
  useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple && rippleRef.current) {
      rippleRef.current.pulsate()
    }
  }, [disableRipple, focusRipple, focusVisible])

  const rootProps = useSlotProps({
    getSlotProps: (otherHandlers) => ({
      ...getRootProps({
        ...otherHandlers,
        ...getRippleHandlers(props),
      }),
      ...(!!type && { type }),
    }),
    externalForwardedProps: other,
    additionalProps: {
      as,
    },
    className: clsx(props.className, disabled && disabledClassName, focusVisible && focusVisibleClassName),
  })

  return (
    <RippleRoot {...rootProps}>
      {children}
      {enableTouchRipple ? (
        <TouchRipple center={centerRipple} ref={handleRippleRef} />
      ) : null}
    </RippleRoot>
  )
})
