import { useState } from "react"
import { Dialog } from "./dialog/Dialog"
import { Ripple } from "./ripple/Ripple"
import { Select } from "./select/Select"

export const App = () => {
  const [open, setOpen] = useState(false)
  return <>
    <Ripple style={{padding:24}} onClick={() => setOpen(true)}>
      🥳OK？
    </Ripple>

    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="py-24px px-32px">
        <Select />
      </div>
    </Dialog>
  </>
}
