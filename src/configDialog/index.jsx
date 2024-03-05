import { useState, useMemo, useRef } from "react"
import { IconButton } from "../button/iconButton"
import { Dialog } from "../dialog/dialog"
import { Select } from "../select/select"
import { Ripple } from "mui-ripple"
import { ProductionConfig } from "./production"
import { QualityConfig } from "./quality"

const WORKTERMINAL_CACHEID = 'work-terminal-type'

const WORKTERMINALS = ['生产工作站', '质量工作站']

export const ConfigDialog = ({ open, onClose, allowClose = true, apiURL, onConfirm, onConfirmWarn }) => {
  const [workTerminal, setWorkTerminal] = useState(() => {
    const workTerminal = localStorage.getItem(WORKTERMINAL_CACHEID)

    return workTerminal ?? '生产工作站'
  })

  const configRef = useRef(null)
  const configBlock = useMemo(() => {
    return {
      '生产工作站': <ProductionConfig apiURL={apiURL} ref={configRef} />,
      '质量工作站': <QualityConfig apiURL={apiURL} ref={configRef} />,
    }[workTerminal]
  }, [workTerminal])

  const resolveConfig = () => {
    configRef.current.getConfig()
      .then((config) => onConfirm({
        ...config,
        workTerminal,
      }))
      .catch(onConfirmWarn)
  }

  return <>
    <Dialog
      open={open}
      onClose={onClose}
      mask={allowClose}
      maskClosable={allowClose}
      keyboard={allowClose}
      destroyOnClose
      title={
        <div className="w-full bg-#DAE6E5 flex justify-between items-center pl-32px pr-12px py-8px">
          <span className="text-22px font-meudim">系统配置</span>
          {
            allowClose
            ?
            <IconButton onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"></path></svg>
            </IconButton>
            :
            null
          }
        </div>
      }
      footer={allowClose ? <div className="py-32px flex items-center justify-center text-20px font-meudim">
        <Ripple focusRipple className="bg-#058373 text-white px-48px py-14px mr-32px" onClick={resolveConfig}>确定</Ripple>
        <Ripple focusRipple className="bg-#CECECE text-#646A73 px-48px py-14px" onClick={onClose}>取消</Ripple>
      </div> : null}
    >
      <div className="px-56px pt-24px pb-12px text-#646A73 text-18px">
        <div className="flex items-center justify-between">
          <span>工作站类型：</span>
          <Select
            value={workTerminal}
            onChange={(e) => setWorkTerminal(e)}
            placeholder="请选择工作站类型"
            className="w-400px text-#000c25"
            options={WORKTERMINALS.map((w) => ({ value: w, label: w }))}
          />
        </div>
        {configBlock}
      </div>
    </Dialog>
  </>
}
