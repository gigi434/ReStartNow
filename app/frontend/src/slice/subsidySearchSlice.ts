import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Subsidy } from '@prisma/client'

interface SubsidyState {
  subsidy: Subsidy | null
}

const initialState: SubsidyState = {
  subsidy: null,
}

const subsidySearchSlice = createSlice({
  name: 'subsidySearch',
  initialState,
  reducers: {
    // 選択した助成金を更新するアクション
    updateSubsidySearch: (
      state: SubsidyState,
      action: PayloadAction<Subsidy | null>
    ) => {
      state.subsidy = action.payload
    },
    // 選択した助成金を初期値にするアクション
    resetSubsidySearch: () => initialState,
  },
})

export const { updateSubsidySearch, resetSubsidySearch } =
  subsidySearchSlice.actions

export const subsidySearchReducer = subsidySearchSlice.reducer
