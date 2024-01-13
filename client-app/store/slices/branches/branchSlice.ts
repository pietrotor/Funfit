import { createSlice } from '@reduxjs/toolkit'
import { TDataBranch } from '../../../interfaces/TData'
export type TBranch = {
  branches: TDataBranch[]
  currentBranch: TDataBranch
}
const initialState : TBranch = {
  branches: [],
  currentBranch: {
    id: '',
    name: '',
    code: '',
    city: '',
    direction: '',
    phone: '',
    nit: '',
    cashId: ''

  }
}

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranches: (state, action) => {
      state.branches = action.payload
    },
    setBranch: (state, action) => {
      state.currentBranch = action.payload
    }
  }
})

export const { setBranches, setBranch } = branchSlice.actions
