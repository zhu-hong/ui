import { useState } from "react"
import { Dialog } from "./dialog/dialog"
import { Ripple } from "mui-ripple"
import { Select } from "./select/select"

export const App = () => {
  const [open, setOpen] = useState(false)
  return <div className="p-4">
    <Ripple sx={{padding:24}} focusRipple={true} onClick={() => setOpen(true)}>
      🥳OK？
    </Ripple>

    <Select className="w-250px text-22px" optionClassName="text-20px" options={[{label:'ka',value:'ka'},{label:'kale',value:'kale'},{label:'卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡卡',value:'kal'}]} optionRender={(opt) => opt.value+'-'+opt.label} />

    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="w-1150px px-24px py-20px">
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
