import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../utils/types'

export const initProduct = createAsyncThunk('fetch/product', (id: string) => {
  return fetch('http://127.0.0.1:8000/api/shop/products/' + id).then((resp) =>
    resp.json()
  )
})

const initialState: {
  loading: boolean
  product: Product | null
} = {
  loading: false,
  product: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initProduct.pending, (state) => {
      state.loading = false
    })

    builder.addCase(
      initProduct.fulfilled,
      (state, actions: PayloadAction<Product>) => {
        state.loading = true
        state.product = {
          ...actions.payload,
          sizes: ['S', 'M', 'XL'],
          quantity: 0,
        }
      }
    )

    builder.addCase(initProduct.rejected, (state) => {
      state.loading = true
    })
  },
})
export default productSlice.reducer
