import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../utils/types'

export const initProducts = createAsyncThunk(
  'fetch/products',
  (category: string) => {
    return fetch(
      'http://127.0.0.1:8000/api/shop/products/?category=' + category
    ).then((resp) => resp.json())
  }
)

const initialState: {
  loading: boolean
  products: Product[]
} = {
  loading: false,
  products: [],
}

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initProducts.pending, (state) => {
      state.loading = false
    })

    builder.addCase(
      initProducts.fulfilled,
      (state, actions: PayloadAction<Product[]>) => {
        state.loading = true
        state.products = actions.payload
      }
    )

    builder.addCase(initProducts.rejected, (state) => {
      state.loading = true
    })
  },
})
export default ProductsSlice.reducer
