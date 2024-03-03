import { IconButton } from "@/button/iconButton"
import { Select } from "@/select/select"
import { useEffect } from "react"
import { useState } from "react"
import { CheckIcon } from "./checkIcon"

const CACHEID = 'production-config-cache'

export const ProductionConfig = () => {
  const [config, setConfig] = useState(() => {
    const cache = localStorage.getItem(CACHEID)
    if(cache === null) {
      return {
        WorkshopGuid: undefined,
        WorkshopName: undefined,
        MachineGuid: undefined,
        terminalType: 0,
        terminalInfo: null,
      }      
    }
    const cacheConfig = JSON.stringify(cache)

    return {
      ...cacheConfig,
      terminalType: Number(config.terminalType),
    }
  })

  const [areas, setAreas] = useState(null)
  useEffect(() => {
  }, [])

  const [machines, setMachines] = useState([])
  useEffect(() => {
    if(config.WorkshopGuid !== undefined) {
    }
  }, [config.WorkshopGuid])


  useEffect(() => {
    if(config.MachineGuid !== undefined) {
    }
  }, [config.MachineGuid])

  return <>
    <div className="flex items-center justify-between mt-24px">
      <span>所属区域：</span>
      <Select
        value={config.WorkshopGuid}
        className="w-400px text-#000c25"
        placeholder="请选择区域"
        loading={areas === null}
        options={areas}
        onChange={(val, opt) => {
          setConfig({
            ...config,
            MachineGuid: undefined,
          })
        }}
      />
    </div>
    <div className="flex items-center justify-between mt-24px">
      <span>一体机：</span>
      <Select
        value={config.MachineGuid}
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
}
