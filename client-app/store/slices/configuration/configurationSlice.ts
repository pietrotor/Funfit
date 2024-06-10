import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import { GetConfigurationQuery } from '@/graphql/graphql-types'

type DefaultState = {
  business:
  | NonNullable<GetConfigurationQuery['getConfiguration']>['data']
  | null
}
type ordersDefaultState = {
  orders: TPointOfSaleData[]
}

const initialState: DefaultState = {
  business: null
}

const orderInitialState: ordersDefaultState = {
  orders: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload
    }
  }
})

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setBusiness: (
      state,
      action: PayloadAction<
        NonNullable<GetConfigurationQuery['getConfiguration']>['data']
      >
    ) => {
      state.business = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setBusiness } = configurationSlice.actions
export const { setOrder } = orderSlice.actions
