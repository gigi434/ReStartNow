import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Municipality, Prefecture } from '@prisma/client'
interface RegionState {
  prefecture: Prefecture | null
  municipality: Municipality | null
  selectedMunicipality: Municipality | null
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
    setPrefecture: (state, action: PayloadAction<Prefecture | null>) => {
      state.prefecture = action.payload
    },
    // 選択された市町区村を格納する
    setMunicipality: (state, action: PayloadAction<Municipality | null>) => {
      state.municipality = action.payload
    },
  },
})

export const { setPrefecture, setMunicipality } = regionSlice.actions

export const regionReducer = regionSlice.reducer
