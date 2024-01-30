import AntSelect, { Option } from 'rc-select'

import './select.css'

export const Select = () => {
  return <AntSelect notFoundContent={<div className='w-full h-full flex justify-center items-center'>卡了</div>}>
    <Option value='1'>1</Option>
    <Option value='2'>2</Option>
  </AntSelect>
}
