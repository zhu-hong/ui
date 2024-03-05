import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Select } from "@/select/select"
import { useApi } from "./api"

const CACHEID = 'quality-config-cache'

export const QualityConfig = forwardRef(({ apiURL }, ref) => {
  useImperativeHandle(ref, () => ({
    getConfig() {
      return new Promise((resolve, reject) => {
        if(config.worktypes.length === 0) {
          reject('请选择作业类型')
          return
        }
        if(config.workcenter === undefined) {
          reject('请选择检验中心')
          return
        }
        resolve({
          config,
          cacheid: CACHEID,
        })
      })  
    }
  }))

  const api = useApi(apiURL)

  const [config, setConfig] = useState(() => {
    const cache = localStorage.getItem(CACHEID)
    if(cache === null) {
      return {
        worktypes: ['过程检验IPQC'],
        workcenter: undefined,
        employeeGuid: undefined,
        employeeCode: undefined,
        employeeName: undefined,
      }
    }
    return JSON.parse(cache)
  })

  const [workcenters, setWorkcenters] = useState(null)
  useEffect(() => {
    api.GetWorkcenterForInspect().then((res) => {
      setWorkcenters(res.data.map((w) => ({ ...w, value: w.WorkcenterGuid, label: w.WorkcenterName, })))
    })
  }, [])

  return <>
    <div className="flex items-center justify-between mt-24px">
      <span>作业类型：</span>
      <Select
        className="w-400px text-#000c25"
        placeholder="请选择作业类型"
        multiple
        value={config.worktypes}
        onChange={(e) => setConfig({ ...config, worktypes: e })}
        options={[
          {
            value: '过程检验IPQC',
            label: '过程检验IPQC',
          },
          {
            value: '来料检验IQC',
            label: '来料检验IQC',
          },
          {
            value: '成品检验FQC',
            label: '成品检验FQC',
          },
          {
            value: '出货检验OQC',
            label: '出货检验OQC',
          },
        ]}
      />
    </div>
    <div className="flex items-center justify-between mt-24px">
      <span>检验中心：</span>
      <Select
        className="w-400px text-#000c25"
        placeholder="请选择检验中心"
        value={config.workcenter}
        onChange={(e) => setConfig({ ...config, workcenter: e })}
        options={workcenters}
        loading={workcenters===null}
      />
    </div>
  </>
})
