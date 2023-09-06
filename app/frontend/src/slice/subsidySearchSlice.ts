import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ClientSideSubsidy } from '../types'

interface SubsidyState {
  subsidy: ClientSideSubsidy | null
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
      action: PayloadAction<ClientSideSubsidy | null>
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
