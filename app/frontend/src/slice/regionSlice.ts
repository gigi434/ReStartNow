import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ClientSideMunicipality, ClientSidePrefecture } from '@/src/types'

interface RegionState {
  prefecture: ClientSidePrefecture | null
  municipality: ClientSideMunicipality | null
  selectedMunicipality: ClientSideMunicipality | null
}

const initialState: RegionState = {
  prefecture: null,
  municipality: null,
  selectedMunicipality: null,
}

export const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    // 選択された都道府県を格納する
    setPrefecture: (
      state,
      action: PayloadAction<ClientSidePrefecture | null>
    ) => {
      state.prefecture = action.payload
    },
    // 選択された市町区村を格納する
    setMunicipality: (
      state,
      action: PayloadAction<ClientSideMunicipality | null>
    ) => {
      state.municipality = action.payload
    },
  },
})

export const { setPrefecture, setMunicipality } = regionSlice.actions

export const regionReducer = regionSlice.reducer
