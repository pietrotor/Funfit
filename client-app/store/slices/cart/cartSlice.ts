import { createSlice } from '@reduxjs/toolkit'
export type TCartItem = {
  id: string
  productName: string
  price: number
  quantity: number
  pictureUrl: string
}
export type TCart = {
  id: string
  cartItems: TCartItem[]
  cartSubTotal: number
  cartDetails?: string
}
const initialState: TCart = {
  id: '',
  cartItems: [],
  cartSubTotal: 0,
  cartDetails: ''
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { initialState },
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const existItem = initialState.cartItems.find(
        x => x.id === item.id
      )

      if (existItem) {
        state.initialState.cartItems = state.initialState.cartItems.map(x => {
          if (x.id === existItem.id) {
            return {
              ...x,
              quantity: x.quantity + item.quantity,
              price: x.price + item.price
            }
          } else {
            return x
          }
        })
      } else {
        state.initialState.cartItems.push(item)
      }
    },
    decreaseCart(state, action) {
      const item = action.payload
      const existItem = state.initialState.cartItems.find(
        x => x.productName === item.productName
      )
      if (existItem) {
        state.initialState.cartItems = state.initialState.cartItems.map(x => {
          if (x.productName === existItem.productName) {
            if (x.quantity > 1) {
              return {
                ...x,
                quantity: item.quantity - 1,
                price: item.price - item.price / item.quantity
              }
            } else {
              return x
            }
          } else {
            return x
          }
        })
        state.initialState.cartSubTotal = state.initialState.cartItems.reduce(
          (acc, item) => acc + item.price,
          0
        )
      }
    },
    increaseCart(state, action) {
      const item = action.payload
      const existItem = state.initialState.cartItems.find(
        x => x.productName === item.productName
      )
      if (existItem) {
        state.initialState.cartItems = state.initialState.cartItems.map(x => {
          if (x.productName === existItem.productName) {
            if (x.quantity < 100) {
              return {
                ...x,
                quantity: item.quantity + 1,
                price: item.price + item.price / item.quantity
              }
            } else {
              return x
            }
          } else {
            return x
          }
        })
        state.initialState.cartSubTotal = state.initialState.cartItems.reduce(
          (acc, item) => acc + item.price,
          0
        )
      }
    },
    removeFromCart(state, action) {
      const item = action.payload
      state.initialState.cartItems = state.initialState.cartItems.filter(
        x => x.productName !== item.productName
      )
    },
    clearCart(state) {
      state.initialState.cartItems = []
    },
    updateCartDetails: (state, action) => {
      state.initialState.cartDetails = action.payload
    },
    updateCartSubTotal: (state, action) => {
      state.initialState.cartSubTotal = action.payload
    }
  }
})
export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart,
  increaseCart,
  updateCartDetails,
  updateCartSubTotal
} = cartSlice.actions
