import * as React from "react"
import * as ReactDOM from "react-dom"
import ComboBox from "../components/comboBox"

export function init() {
    // 修改 top Bar 
    // 作為確認此腳本是否正常運作
    console.log("Start")
    const ele = document.getElementsByClassName("nv_c")[0] as unknown as HTMLElement
    ele.style.background = "#aa0000"
    ele.style.opacity = "0.8"
    ele.style.display = "flex"
    ele.style.borderRadius = "10px"
    ele.style.height = "36px"
    // delete 
    const ba = document.getElementsByClassName("nv_l")
    ba[0].remove()

    // add anime list
    const topBar = document.getElementsByClassName("nv_c")[0] as unknown as HTMLElement
    const c2 = document.createElement("div")
    topBar.appendChild(c2)
    ReactDOM.render(<ComboBox />, c2)
}
