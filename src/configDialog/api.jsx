import axios from 'axios'
import { useMemo } from 'react'
import { toast } from 'react-toastify'

const createAPI = (baseURL) => {
  const ins = axios.create({
    baseURL,
    timeout: 60000,
  })
  ins.interceptors.response.use(
    (res) => {
      if(res.data.code !== 0) {
        toast.error(res.data.msg)
        throw res.data
      }
      return res.data
    },
    (err) => {
      if(err.response === undefined) {
        toast.error('没有网络')
      } else {
        toast.error(`网络错误（${err.response.status}），请重试`)
      }
      throw err
    }
  )
  return {
    /**
     * 获取区域列表
     */
    async GetWorkshop() {
      return await ins.post('/D2MITC/GetWorkshop')
    },
    /**
     * 获取一体机列表
     */
    async GetMachine(paylod) {
      return await ins.post('/D2MITC/GetMachine', paylod)
    },
    /**
     * 获取一体机下配置的工作中心工位列表
     */
    async GetMachineDetail(paylod) {
      const res = await ins.post('/D2MITC/GetMachineDetail', paylod)

      const Workstations = res.data.map((c) => {
        return c.Workstations.map((s) => ({
          ...s,
          WorkcenterGuid: c.WorkcenterGuid,
          WorkcenterCode: c.WorkcenterCode,
          WorkcenterName: c.WorkcenterName,
        }))
      }).flat()
      return {
        ...res,
        Workcenters: res.data,
        Workstations,
      }
    },
    /**
     * 获取检验工作站/实验室实例
     */
    async GetWorkcenterForInspect() {
      return await ins.post('/D2MQS/GetWorkcenterForInspect')
    },
  }
}

export const useApi = (baseURL) => useMemo(() => createAPI(baseURL), [baseURL])
