import { init as centerBarInit } from "./centerBar"
import { init as topBarInit } from "./topBar"

export function index() {
    centerBarInit()
    topBarInit()
}