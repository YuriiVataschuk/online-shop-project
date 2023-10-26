import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cartSelector from '../features/cartSelector'
import productSelector from '../features/productsSelector'
import personSelector from '../features/personSelector'
import currentProductSelector from '../features/productSelector'

export const store = configureStore({
  reducer: {
    cart: cartSelector,
    productList: productSelector,
    person: personSelector,
    product: currentProductSelector,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
