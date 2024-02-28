import type { FC, ReactNode } from 'react'
import { Ripple } from 'mui-ripple'
import { IconButton } from '../button/iconButton'
import RcSelect from 'rc-select'
import type { FlattenOptionData } from 'rc-select/lib/interface'
import type { BaseOptionType, SelectProps } from 'rc-select/lib/Select'

import './select.css'

export const Select: FC<
  Partial<
    Omit<SelectProps, 'prefixCls'|'animation'|'allowClear'|'suffixIcon'|'optionRender'|'menuItemSelectedIcon'|'removeIcon'|'mode'>
    &
    {
      arrowClear: boolean;
      optionClassName: string;
      optionRender: (opt: FlattenOptionData<BaseOptionType>) => ReactNode;
      multiple: boolean;
    }
  >
> = ({ arrowClear, optionClassName, optionRender, multiple = false, ...other }) => {
  return <>
    <RcSelect
      {...other}
      mode={multiple?'multiple':undefined}
      prefixCls='d2mslt'
      animation='slide'
      allowClear={arrowClear ? {
        clearIcon: <IconButton tabIndex={-1} sx={{padding:'4px'}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"></path></svg></IconButton>,
      } : false}
      optionRender={(opt) => {
        return <Ripple tabIndex={-1} as='div' disabled={opt.data.disabled} className={optionClassName}>{optionRender ? optionRender(opt) : opt.label}</Ripple>
      }}
      menuItemSelectedIcon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"></path></svg>}
      removeIcon={<IconButton tabIndex={-1} sx={{padding:'4px',flex:'none'}}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path fill="#7F848B" fillRule="evenodd" d="M3.948.896a5.5 5.5 0 0 1 5.94 1.216 5.49 5.49 0 0 1 1.194 5.995A5.49 5.49 0 0 1 6 11.5a5.5 5.5 0 0 1-3.889-1.606A5.5 5.5 0 0 1 .5 6v-.11A5.5 5.5 0 0 1 3.948.896m3.347 3.105L6 5.296 4.705 4 4 4.706 5.295 6 4 7.296 4.705 8 6 6.706 7.295 8 8 7.296 6.705 6 8 4.706z"/></svg></IconButton>}
      placeholder={other.placeholder??'请选择'}
      showSearch={other.showSearch||false}
      listHeight={other.listHeight||520}
      dropdownMatchSelectWidth={other.dropdownMatchSelectWidth||false}
      suffixIcon={other.loading?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#058373" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"></path><path fill="#058373" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform></path></svg>:null}
      maxTagCount={other.maxTagCount||'responsive'}
    />
  </>
}
