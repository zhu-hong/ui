import { useState, useEffect } from "react"
import { Select } from "@/select/select"

const CACHEID = 'quality-config-cache'

export const QualityConfig = () => {
  const [config, setConfig] = useState(() => {
    const cache = localStorage.getItem(CACHEID)
    if(cache === null) {
      return {
      }      
    }
    return JSON.stringify(cache)
  })

  const [workcenters, setWorkcenters] = useState(null)
  useEffect(() => {
  }, [])

  return <>
    <div className="flex items-center justify-between mt-24px">
      <span>作业类型：</span>
      <Select
        className="w-400px text-#000c25"
        placeholder="请选择作业类型"
        multiple
        options={[
          {
            value: '来料检验',
            label: '来料检验',
          },
        ]}
      />
    </div>
    <div className="flex items-center justify-between mt-24px">
      <span>检验中心：</span>
      <Select
        className="w-400px text-#000c25"
        placeholder="请选择检验中心"
        options={workcenters}
        loading={workcenters===null}
      />
    </div>
  </>
}
