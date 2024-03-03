import { Ripple, type RippleProps } from 'mui-ripple'
import { type FC, type ReactNode } from 'react'

export const IconButton: FC<Omit<RippleProps, 'centerRipple'> & { children?: ReactNode }> = (props) => {
  return <Ripple {...props} centerRipple sx={Object.assign({ padding: '8px', borderRadius: '50%', backgroundColor: 'transparent' }, props.sx)}></Ripple>
}
