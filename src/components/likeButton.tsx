import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

import { store, Anime } from "../instance/store"
import { getAnimePicture, parseAnimeId, parseAnimeName, isLike } from "../libs/index"

enum TypeMap {
    "border" = 0,
    "full" = 1,
    // "broken" = 2
}
const pageAnimeId = parseAnimeId(window.location.href)


export default function IconButtons() {

    const liking = isLike(store.get("likeList"), pageAnimeId)
    const t = liking ? TypeMap.full : TypeMap.border
    let originType = t
    // 檢查是否在like list裡面
    const [type, setType] = React.useState<TypeMap>(t)
    return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="add to favorites"
                style={{ paddingRight: "16px", paddingTop: "4px" }}
                color="error"
                onMouseEnter={enterHandler}
                onMouseLeave={leaveHandler}
                onClick={click} >
                {
                    type === TypeMap.border ? <FavoriteBorderIcon /> :
                        type === TypeMap.full ? <FavoriteIcon fontSize="inherit" /> : <></>
                }
            </IconButton>
        </Stack >
    );

    function enterHandler() {
        originType = type
        switch (type) {
            case TypeMap.border:
                setType(TypeMap.full)
                break;
            case TypeMap.full:
                setType(TypeMap.border)
                break;
        }
    }
    function leaveHandler() {
        setType(originType)
    }
    function click() {
        const likeList = store.get("likeList")
        const liking = isLike(likeList, pageAnimeId)
        if (liking) {
            // 移除
            for (let i = 0; i < likeList.length; i++) {
                if (likeList[i].id === pageAnimeId) {
                    likeList.splice(i, 1)
                }
            }
            originType = TypeMap.border
            setType(TypeMap.border)
            store.set("likeList", likeList)
            const emitter = new CustomEvent("likeRemove")
            document.dispatchEvent(emitter)
        } else {
            // 新增
            const name = parseAnimeName(document.title)
            const picture = getAnimePicture(document)
            const obj = { "id": pageAnimeId, name, "url": window.location.href, picture }
            likeList.push(obj)
            originType = TypeMap.full
            setType(TypeMap.full)
            store.set("likeList", likeList)
            const emitter = new CustomEvent<Anime>("likeAdd", { detail: obj })
            document.dispatchEvent(emitter)
        }

        // centerBarColor()

    }
}