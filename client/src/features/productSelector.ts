import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../utils/types'

const cache: { [id: string]: Product } = {}

export const initProduct = createAsyncThunk(
  'fetch/product',
  async (id: string) => {
    if (cache[id]) {
      return cache[id]
    }

    try {
      const resp = await fetch(`https://online-shop-noih.onrender.com/api/shop/products/${id}`)
      const data = await resp.json()
      cache[id] = data

      return data
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  }
)

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
  reducers: {
    removeProduct: (state) => {
      state.product = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initProduct.pending, (state) => {
      state.loading = true
    })

    builder.addCase(
      initProduct.fulfilled,
      (state, actions: PayloadAction<Product>) => {
        state.loading = false
        state.product = {
          ...actions.payload,
          sizes: ['S', 'M', 'XL'],
          quantity: 0,
        }
      }
    )

    builder.addCase(initProduct.rejected, (state) => {
      state.loading = false
    })
  },
})

export default productSlice.reducer
export const { removeProduct } = productSlice.actions
