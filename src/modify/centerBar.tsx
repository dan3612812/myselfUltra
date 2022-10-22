import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "../instance/store"
import { isAnimePage, parseAnimeId, isLike } from "../libs/index"
import LikeButton from "../components/likeButton"


export function init() {
    // 只在動畫頁面做動(不轉換主頁)
    if (!isAnimePage(window.location.href)) return
    // modify bar color 
    // if the anime was subscribe then turn red
    document.addEventListener("likeAdd", (obj) => { judgment() })
    document.addEventListener("likeRemove", () => { judgment() })
    judgment()
    const centerBar = document.getElementsByClassName("c_l")[0] as unknown as HTMLElement
    const c1 = document.createElement("div")
    centerBar.appendChild(c1)
    ReactDOM.render(<LikeButton />, c1)

}

function judgment() {
    const currentUrl = window.location.href
    const ele = document.getElementsByClassName("c_l")[0] as unknown as HTMLElement
    // 修改排版 愛心排在最右側
    ele.style.display = "flex"
    ele.style.justifyContent = "space-between"
    // 是否like 來決定是修改
    const animeId = parseAnimeId(currentUrl)
    const liking = isLike(store.get("likeList"), animeId)
    if (!liking) { modifyToUnlike(ele) } else { modifyToLike(ele) }
    // add event
}

function modifyToLike(ele: HTMLElement) {
    ele.style.background = "#aa0000"
    ele.style.opacity = "0.8"
    ele.style.borderRadius = "10px"
}
function modifyToUnlike(ele: HTMLElement) {
    ele.style.background = ""
    ele.style.opacity = ""
    ele.style.borderRadius = ""
}