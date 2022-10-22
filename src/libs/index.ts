export function isAnimePage(currentUrl: string): boolean {
    return currentUrl.includes("thread")
}

export function isIndexPage(currentUrl: string): boolean {
    return currentUrl.includes("portal")
}

export function parseAnimeId(currentUrl: string): number {
    const regex = new RegExp(/thread-([0-9]*)-/g)
    let r: string | number
    try {
        r = regex.exec(currentUrl)![1]
    } catch (err) {
        // throw new Error(`parse anime id error input data:${currentUrl}`)
        return -1
    }
    return parseInt(r)
}

export function parseAnimeName(docTitle: string): string {
    const name = docTitle.split("【")[0]
    if (name.length === 0) throw new Error(`split anime name error input data ${docTitle}`)
    return name
}

export function getAnimePicture(document: Document): string {
    const ele = document.querySelector("#ct > div:nth-child(3) > div.info_box.fl > div > div.info_img_box.fl > img")
    //@ts-ignore
    return ele!.src
}
export function isLike(likeList: { id: number }[], animeId: number): boolean {
    for (let anime of likeList) {
        if (anime.id === animeId) return true
    }
    return false
}