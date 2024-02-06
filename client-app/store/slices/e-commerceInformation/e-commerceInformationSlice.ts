import { createSlice } from '@reduxjs/toolkit'

export type TBranch = {
  id: string
  name: string
  city: string
  direction: string
  phone: string
}

const initialState: TBranch = {
  id: '',
  name: '',
  city: '',
  direction: '',
  phone: ''
}

export const ecommerceInformationSlice = createSlice({
  name: 'ecommerceInformation',
  initialState,
  reducers: {
    setBranchInformation(state, action) {
      const item = action.payload
      console.log(item)
      state.id = item?.id
      state.name = item?.name
      state.city = item?.city
      state.direction = item?.direction
      state.phone = item?.phone
      console.log(state)
    }
  }
})

export const { setBranchInformation } = ecommerceInformationSlice.actions
