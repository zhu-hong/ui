import { useState } from "react"
import { Dialog } from "./dialog/dialog"
import { Ripple } from "./ripple/Ripple"

export const App = () => {
  const [open, setOpen] = useState(false)
  return <>
    <Ripple style={{padding:120}} onClick={() => setOpen(true)}>
      🥳OK？
    </Ripple>

    <Dialog open={open} onClose={() => setOpen(false)}>
      <Ripple style={{padding:24}} />
    </Dialog>
  </>
}
