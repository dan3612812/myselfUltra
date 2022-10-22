import { index as modifyIndex } from "./modify/index"
import { Anime } from "./instance/store";

async function main() {
    modifyIndex()
}

main()

interface CustomEventMap {
    "likeAdd": CustomEvent<Anime>
    "likeRemove": CustomEvent<void>
}

declare global {
    interface Document { //adds definition to Document, but you can do the same with HTMLElement
        addEventListener<K extends keyof CustomEventMap>(type: K,
            listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    }
}