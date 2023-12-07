import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ListProduct, Product } from '../utils/types'

const cache: { [key: string]: ListProduct[] } = {}

export const initProducts = createAsyncThunk(
  'fetch/products',
  async (category: string) => {
    if (cache[category]) {
      return cache[category]
    }

    try {
      const resp = await fetch(
        'https://online-shop-noih.onrender.com/api/shop/products/?category=' +
          category
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
  products: ListProduct[]
} = {
  loading: false,
  products: [],
}

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProducts: (state) => {
      state.products = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initProducts.pending, (state) => {
      state.loading = true
    })

    builder.addCase(
      initProducts.fulfilled,
      (state, action: PayloadAction<ListProduct[]>) => {
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
export const { removeProducts } = ProductsSlice.actions
