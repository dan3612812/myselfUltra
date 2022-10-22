import { Store } from "../libs/store"

export interface Anime {
    url: string
    name: string
    id: number
    picture: string
}

interface SelfStore {
    likeList: Anime[]
}

export const store = new Store<SelfStore>("store", { likeList: [] })
