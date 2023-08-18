import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PartialClientSideSubsidy {
  name: string | ''
}

const initialState: PartialClientSideSubsidy = {
  name: '',
}

const subsidySearchSlice = createSlice({
  name: 'subsidySearch',
  initialState,
  reducers: {
    updateSubsidySearch: (
      state: PartialClientSideSubsidy,
      action: PayloadAction<PartialClientSideSubsidy>
    ) => {
      return action.payload
    },
    resetSubsidySearch: () => initialState,
  },
})

export const { updateSubsidySearch, resetSubsidySearch } =
  subsidySearchSlice.actions

export const subsidySearchReducer = subsidySearchSlice.reducer
