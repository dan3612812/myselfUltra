import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteCloseReason } from '@mui/material/Autocomplete';
import { isAnimePage, parseAnimeId } from "../libs/index"

import { store, Anime } from "../instance/store"

function getListByStore(): Anime[] {
  const oldList = store.get("likeList")
  let list = []
  for (let ani of oldList) {
    list.push({ ...ani, label: ani.name })
  }
  return list
}
let value: Anime | null
export default function ComboBox() {
  const pageAnimeId = parseAnimeId(window.location.href)
  const [list, setList] = React.useState<Anime[]>()
  // setList([])
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list ? list : []}
      sx={{ width: 150 }}
      size="small"
      getOptionDisabled={(options) => {
        return options.id === pageAnimeId
      }}
      onOpen={(event) => {
        setList(getListByStore())
      }}
      onClose={(event, reason) => {
        if (reason === "selectOption") {
          // 跳轉至所選的頁面
          if (value) window.location.href = value?.url
        }
      }}
      onChange={(event, obj) => { if (obj) value = obj }}
      autoHighlight={true}
      renderInput={(params) => <TextField {...params} label="Favorites" />}
    />
  );

}