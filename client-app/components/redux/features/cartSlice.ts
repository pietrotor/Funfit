import { createSlice } from '@reduxjs/toolkit'
export type TCartItem = {
  productName: string
  price: number
  quantity: number
  pictureUrl: string
}
export type TCart = {
  cartItems: TCartItem[]
  cartSubTotal: number
  cartDetails?: string
}
const initialState: TCart = {
  cartItems: [],
  cartSubTotal: 0,
  cartDetails: ''
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { initialState },
  reducers: {
    addToCart(state, action) {
      localStorage.removeItem('cartItems')
      const item = action.payload
      const existItem = initialState.cartItems.find(
        x => x.productName === item.productName
      )
      console.log(existItem)
      if (existItem) {
        console.log(existItem)

        state.initialState.cartItems = state.initialState.cartItems.map(x => {
          if (x.productName === existItem.productName) {
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
      localStorage.setItem('cartItems', JSON.stringify(state.initialState.cartItems))
    },
    decreaseCart(state, action) {
      localStorage.removeItem('cartItems')
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
      localStorage.setItem('cartItems', JSON.stringify(state.initialState.cartItems))
    },
    increaseCart(state, action) {
      localStorage.removeItem('cartItems')
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
      localStorage.setItem('cartItems', JSON.stringify(state.initialState.cartItems))
    },
    removeFromCart(state, action) {
      localStorage.removeItem('cartItems')
      const item = action.payload
      state.initialState.cartItems = state.initialState.cartItems.filter(
        x => x.productName !== item.productName
      )
      localStorage.setItem('cartItems', JSON.stringify(state.initialState.cartItems))
    },
    clearCart(state) {
      state.initialState.cartItems = []
      localStorage.removeItem('cartItems')
    },
    updateCartDetails: (state, action) => {
      state.initialState.cartDetails = action.payload
      localStorage.setItem('cartDetails', JSON.stringify(state.initialState.cartDetails))
    },
    updateCartSubTotal: (state, action) => {
      state.initialState.cartSubTotal = action.payload
      localStorage.setItem('cartSubTotal', JSON.stringify(state.initialState.cartSubTotal))
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
export default cartSlice.reducer
