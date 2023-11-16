import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InformationFilterState = string[]

const initialState: InformationFilterState = []

const informationFilterSlice = createSlice({
  name: 'informationFilter',
  initialState,
  reducers: {
    setInformationFilter: (state, action: PayloadAction<string[]>) => {
      return action.payload
    },
  },
})

export const { setInformationFilter } = informationFilterSlice.actions

export const informationFilterReducer = informationFilterSlice.reducer
