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
    updateCart(state, action) {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.id === item.id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? {
            ...x,
            quantity: item.quantity,
            price: item.price
          } : x
        )
      } else {
        state.cartItems.push(item)
      }
      state.cartSubTotal = state.cartItems.reduce((acc, item) => acc + item.price, 0)
    },
    addToCart(state, action) {
      localStorage.removeItem('cartItems')
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.id === item.id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? {
            ...x,
            quantity: x.quantity + item.quantity,
            price: x.price + item.price
          } : x
        )
      } else {
        state.cartItems.push(item)
      }
      state.cartSubTotal = state.cartItems.reduce((acc, item) => acc + item.price, 0)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    decreaseCart(state, action) {
      localStorage.removeItem('cartItems')
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
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    increaseCart(state, action) {
      localStorage.removeItem('cartItems')
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
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action) {
      localStorage.removeItem('cartItems')
      const item = action.payload
      state.cartItems = state.cartItems.filter(
        x => x.productName !== item.productName
      )
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    clearCart(state) {
      localStorage.removeItem('cartItems')
      state.cartItems = []
    },
    updateLocalStorageCartDetails(state, action) {
      state.cartDetails = action.payload
    },
    updateCartDetails: (state, action) => {
      localStorage.removeItem('cartDetails')
      state.cartDetails = action.payload
      localStorage.setItem('cartDetails', JSON.stringify(state.cartDetails))
    },
    updateLocalStorageCartSubTotal(state, action) {
      state.cartSubTotal = action.payload
    },
    updateCartSubTotal: (state, action) => {
      localStorage.removeItem('cartSubTotal')
      state.cartSubTotal = action.payload
      localStorage.setItem('cartSubTotal', JSON.stringify(state.cartSubTotal))
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
  updateCartSubTotal,
  updateLocalStorageCartDetails,
  updateLocalStorageCartSubTotal,
  updateCart
} = cartSlice.actions
