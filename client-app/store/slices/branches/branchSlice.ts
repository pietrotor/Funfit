import { createSlice } from '@reduxjs/toolkit'
import { TDataBranch } from '../../../interfaces/TData'
export type TBranch = {
  branches: TDataBranch[]
  currentBranch: TDataBranch
}
const initialState : TBranch = {
  branches: [],
  currentBranch: {
    id: '6597066023e1ed751b6213ff',
    name: 'Debian',
    code: 'Camargo',
    city: 'Camargo',
    direction: 'Sudeste',
    phone: '788899',
    nit: '41455',
    cashId: '6597066023e1ed751b6213ff'

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
