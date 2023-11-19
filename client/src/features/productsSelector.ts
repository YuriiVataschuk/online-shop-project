import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../utils/types'

const cache: { [key: string]: Product[] } = {}

export const initProducts = createAsyncThunk(
  'fetch/products',
  async (category: string) => {
    if (cache[category]) {
      return cache[category]
    }

    try {
      const resp = await fetch(
        'http://127.0.0.1:8000/api/shop/products/?category=' + category
      )
      const data = await resp.json()

      cache[category] = data

      return data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
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
      state.loading = true
    })

    builder.addCase(
      initProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      }
    )

    builder.addCase(initProducts.rejected, (state) => {
      state.loading = false
    })
  },
})

export default ProductsSlice.reducer
