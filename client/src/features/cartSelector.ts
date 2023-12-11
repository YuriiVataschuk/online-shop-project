import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loocalStorage } from '../utils/localStorage'
import { CartProduct } from '../utils/types'

type State = {
  showCart: boolean
  cartList: CartProduct[]
}

const { value, setValue } = loocalStorage('cartList', [])

const initialState: State = {
  showCart: false,
  cartList: value,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setShowCart: (state, payload: PayloadAction<boolean>) => {
      state.showCart = payload.payload
    },
    addToCart: (state, payload: PayloadAction<CartProduct>) => {
      state.cartList.push(payload.payload)
      setValue(state.cartList)
    },
    removeFromCart: (state, payload: PayloadAction<number>) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== payload.payload
      )
      setValue(state.cartList)
    },
    setQuantity: (
      state,
      payload: PayloadAction<{ id: number; quantity: number }>
    ) => {
      state.cartList = state.cartList.map((item) => {
        if (item.id !== payload.payload.id) {
          return item
        }
        return { ...item, quantity: payload.payload.quantity }
      })
      setValue(state.cartList)
    },
    clear: (state) => {
      state.cartList = []
      setValue([])
    },
  },
})

export const { setShowCart, addToCart, removeFromCart, setQuantity, clear } =
  cartSlice.actions
export default cartSlice.reducer
