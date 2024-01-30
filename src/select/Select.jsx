import RcSelect, { Option } from 'rc-select'
import { Ripple } from '@/ripple/Ripple'

import './select.css'

export const Select = () => {
  return <RcSelect
    showAction={['focus','focus']}
    // open={true}
    placeholder='请选择'
    animation='slide'
    dropdownMatchSelectWidth={false}
    showSearch
    filterOption={(val, opt) => opt.label.includes(val) || opt.value.includes(val)}
    // loading
    allowClear={{
      clearIcon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"></path></svg>,
    }}
    // suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M1 3h22L12 22"></path></svg>}
    options={[
      {
        label: '卡了卡了卡了卡了卡了卡了卡了卡了卡了',
        value: 'kale',
      },
      {
        label: '没卡',
        value: 'meika',
      },
      {
        label: '如卡',
        value: 'ruka',
        disabled: true,
      },
    ]}
    optionRender={(opt) => {
      return <Ripple className='w-full h-full text-start px-8px py-12px bg-transparent truncate' as='div' disabled={opt.data.disabled}>{opt.label}</Ripple>
    }}
    menuItemSelectedIcon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"></path></svg>}
    notFoundContent='No Options'
  >
  </RcSelect>
}
