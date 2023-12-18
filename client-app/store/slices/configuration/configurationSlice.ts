import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetConfigurationQuery } from '@/graphql/graphql-types'

type DefaultState = {
  business:
    | NonNullable<GetConfigurationQuery['getConfiguration']>['data']
    | null
}

const initialState: DefaultState = {
  business: null
}

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
