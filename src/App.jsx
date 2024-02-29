import { useState } from "react"
import { Dialog } from "./dialog/dialog"
import { Ripple } from "mui-ripple"
import { Select } from "./select/select"
import { Input } from "./input/input"

export const App = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('123')
  return <div className="p-4">
    <Ripple sx={{padding:24}} focusRipple={true} onClick={() => setOpen(true)}>
      🥳OK？
    </Ripple>
    <div className="h-screen"></div>
    <Input className='border p-4 mb-4' placement="top" number value={value} onChange={setValue} point />
    <Input className='border p-4 mb-4' value={value1} chinese onChange={setValue1} autoFocus onEnter={(value) => {
      console.log(value === value1)
      setValue1('')
    }} />
    <Input className='border p-4 mb-4' value={value} onChange={setValue} />
    <Select
      className="w-250px text-22px"
      optionClassName="text-20px"
      options={[
        {label:'ka',value:'ka'},
        {label:'kale',value:'kale'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'ka1'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal2'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal3'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal4'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal5'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal6'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal7'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal8'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal9'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal10'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal11'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal12'},
        {label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal13'},
      ]}
      optionRender={(opt) => opt.value+'-'+opt.label}
    />
    <div className="h-screen"></div>

    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="px-24px py-20px">
        零零落落零零落落零零落落啦啦啦
        零零落落零零落落零零落落啦啦啦
        零零落落零零落落零零落落啦啦啦
        零零落落零零落落零零落落啦啦啦
        零零落落零零落落零零落落啦啦啦
        零零落落零零落落零零落落啦啦啦
      </div>
    </Dialog>
  </div>
}
