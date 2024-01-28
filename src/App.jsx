import { useState } from "react"
import { Dialog } from "./dialog/dialog"
import { Ripple } from "./ripple/Ripple"
import { css } from "goober"
import clsx from "clsx"

export const App = () => {
  const tableCss = css`
    min-width: 100%;
    table-layout: fixed;
    td, th {
      padding: 12px;
      word-break: break-word;
      border-inline: 1px solid #cecece;
      border: 1px solid #cecece;
      text-align: start;
    }
    th {
      z-index: 10;
    }
  `
  const [open, setOpen] = useState(false)
  return <>
    <Ripple style={{padding:120}} onClick={() => setOpen(true)}>
      🥳OK？
    </Ripple>

    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="w-450px h-200px relative overflow-auto p-4">
        <div className="relative overflow-auto w-full h-full">
          <table className={clsx(tableCss)}>
            <thead>
              <tr>
                <th className="w-300px sticky top-0">12</th>
                <th className="w-300px sticky top-0">12</th>
                <th className="w-140px sticky top-0 right-0">12</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
              <tr>
                <td className="w-300px">12</td>
                <td className="w-300px">12</td>
                <td className="w-140px sticky right-0">12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Dialog>
  </>
}
