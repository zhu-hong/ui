import { IconButton } from "./button/iconButton"
import { Dialog } from "./dialog/dialog"
import { Select } from "./select/select"

export const ConfigDialog = ({ open, onClose }) => {
  return <Dialog open={open} onClose={onClose} mask={false} maskClosable={false} keyboard={false} title={<div className="w-full h-56px bg-#DAE6E5 flex justify-between items-center pl-32px pr-24px">
    <span className="text-22px font-meudim">系统配置</span>
    <IconButton className="bg-transparent" onClick={onClose}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"></path></svg>
    </IconButton>
  </div>}>
    <div className="px-56px py-24px text-#646A73 text-18px">
      <div className="flex items-center">
        <span>工作站类型：</span>
        <Select className="w-400px text-#000c25" placeholder="请选择工作站类型" options={[
          { label: '生产工作站', value: '生产工作站' },
          { label: '检验工作站', value: '检验工作站' },
        ]} />
      </div>
    </div>
  </Dialog>
}
