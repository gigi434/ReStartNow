import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ClientSideSubsidy } from '@/src/types'

interface PartialClientSideSubsidy {
  name: string | ''
  applicationAddress: string | ''
  ageLimit: string | ''
  amountReceived: string | ''
  deadlineForReceipt: number | null
}

const initialState: PartialClientSideSubsidy = {
  name: '',
  applicationAddress: '',
  ageLimit: '',
  amountReceived: '',
  deadlineForReceipt: null,
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
