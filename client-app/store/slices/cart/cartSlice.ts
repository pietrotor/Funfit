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
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.productName === item.productName)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productName === existItem.productName ? {
            ...x,
            quantity: x.quantity + item.quantity,
            price: x.price + item.price
          } : x
        )
      } else {
        state.cartItems.push(item)
      }

      state.cartSubTotal = state.cartItems.reduce((acc, item) => acc + item.price, 0)
    },
    decreaseCart(state, action) {
      const item = action.payload
      const existItem = state.cartItems.find(
        x => x.productName === item.productName
      )
      if (existItem) {
        state.cartItems = state.cartItems.map(x => {
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
        state.cartSubTotal = state.cartItems.reduce(
          (acc, item) => acc + item.price,
          0
        )
      }
    },
    increaseCart(state, action) {
      const item = action.payload
      const existItem = state.cartItems.find(
        x => x.productName === item.productName
      )
      if (existItem) {
        state.cartItems = state.cartItems.map(x => {
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
        state.cartSubTotal = state.cartItems.reduce(
          (acc, item) => acc + item.price,
          0
        )
      }
    },
    removeFromCart(state, action) {
      const item = action.payload
      state.cartItems = state.cartItems.filter(
        x => x.productName !== item.productName
      )
    },
    clearCart(state) {
      state.cartItems = []
    },
    updateCartDetails: (state, action) => {
      state.cartDetails = action.payload
    },
    updateCartSubTotal: (state, action) => {
      state.cartSubTotal = action.payload
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
