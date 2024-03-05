import { IconButton } from "@/button/iconButton"
import { Select } from "@/select/select"
import { useEffect, forwardRef, useState, useImperativeHandle } from "react"
import { CheckIcon } from "./checkIcon"
import { useApi } from "./api"

const CACHEID = 'production-config-cache'

export const ProductionConfig = forwardRef(({ apiURL }, ref) => {
  useImperativeHandle(ref, () => ({
    getConfig() {
      return new Promise((resolve, reject) => {
        if(config.WorkshopGuid === undefined) {
          reject('请选择所属区域')
          return
        }
        if(config.MachineGuid === undefined) {
          reject('请选择一体机')
          return
        }
        // 判断是否要修改terminalInfo
        let needUpdateTerminalInfo = false
        const cache = localStorage.getItem(CACHEID)
        if(cache === null) {
          needUpdateTerminalInfo = true
        } else {
          const cacheConfig = JSON.parse(cache)
          if(config.WorkshopGuid !== cacheConfig.WorkshopGuid || config.MachineGuid !== cacheConfig.MachineGuid || config.terminalType !== cacheConfig.terminalType) {
            needUpdateTerminalInfo = true
          }
        }
        if(needUpdateTerminalInfo) {
          api.GetMachineDetail({ MachineGuid: config.MachineGuid }).then((res) => {
            const { Workcenters: { [0]: { Workstations: _, ...Workcenter } }, Workstations: { [0]: Workstation } } = res
            resolve({
              config: {
                ...config,
                terminalInfo: [Workcenter,Workstation][config.terminalType],
              },
              cacheid: CACHEID,
            })
          })
        } else {
          resolve({
            config,
            cacheid: CACHEID,
          })
        }
      })  
    }
  }))

  const api = useApi(apiURL)

  const [config, setConfig] = useState(() => {
    const cache = localStorage.getItem(CACHEID)
    if(cache === null) {
      return {
        WorkshopGuid: undefined,
        WorkshopName: undefined,
        MachineGuid: undefined,
        terminalType: 0,
        terminalInfo: undefined,
      }
    }
    const cacheConfig = JSON.parse(cache)

    return {
      ...cacheConfig,
      terminalType: Number(cacheConfig.terminalType),
    }
  })

  const [areas, setAreas] = useState(null)
  useEffect(() => {
    api.GetWorkshop().then((res) => {
      setAreas(res.data.map((w) => ({ ...w, value: w.WorkshopGuid, label: w.WorkshopName })))
    })
  }, [])

  const [machines, setMachines] = useState([])
  useEffect(() => {
    if(config.WorkshopGuid !== undefined) {
      api.GetMachine({ WorkshopGuid: config.WorkshopGuid }).then((res) => {
        setMachines(res.data.map((m) => ({ ...m, value: m.MachineGuid, label: m.MachineName })))
      })
    }
  }, [config.WorkshopGuid])

  return <>
    <div className="flex items-center justify-between mt-24px">
      <span>所属区域：</span>
      <Select
        value={config.WorkshopGuid}
        className="w-400px text-#000c25"
        placeholder="请选择区域"
        loading={areas === null}
        options={areas}
        onChange={(_, opt) => setConfig({
          ...config,
          WorkshopGuid: opt.WorkshopGuid,
          WorkshopName: opt.WorkshopName,
          MachineGuid: undefined,
        })}
      />
    </div>
    <div className="flex items-center justify-between mt-24px">
      <span>一体机：</span>
      <Select
        value={config.MachineGuid}
        onChange={(e) => setConfig({ ...config, MachineGuid: e })}
        className="w-400px text-#000c25"
        placeholder="请选择"
        disabled={config.WorkshopGuid === undefined}
        options={machines}
      />
    </div>
    <div className="flex items-center justify-between mt-24px">
      <span>作业类型：</span>
      <input className="w-400px h-40px px-10px text-#000c25 rounded-none border border-#E9E9E9 hover:border-#058373 outline-#058373" value='通用' readOnly />
    </div>
    <div className="flex items-center justify-between mt-24px">
      <span>应用层级：</span>
      <div className="w-400px flex items-center text-#000c25">
        <div className="mr-24px flex items-center cursor-pointer" onClick={() => setConfig({ ...config, terminalType: 0 })}>
          <IconButton><CheckIcon check={config.terminalType===0} /></IconButton>
          <span>工作中心</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => setConfig({ ...config, terminalType: 1 })}>
          <IconButton><CheckIcon check={config.terminalType===1} /></IconButton>
          <span>工位</span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between mt-24px">
      <span>登录方式：</span>
      <div className="w-400px flex items-center text-#000c25">
        <div className="flex items-center cursor-pointer">
          <IconButton><CheckIcon check /></IconButton>
          <span>操作验证</span>
        </div>
      </div>
    </div>
  </>
})
