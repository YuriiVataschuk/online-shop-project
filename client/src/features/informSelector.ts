import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initProducts } from './productsSelector'
import { initProduct } from './productSelector'
import { initPerson } from './personSelector'

type State = {
  id: number
  content: string
  type: boolean
}

const initialState: State[] = []

const informsSlice = createSlice({
  name: 'informs',
  initialState,
  reducers: {
    addInform: (state, payload: PayloadAction<State>) => {
      state.push({
        ...payload.payload,
        id: state.length ? state[state.length - 1].id + 1 : 0,
      })
    },

    removeInform: (state) => {
      state.shift()
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initProducts.rejected, (state) => {
      if (state.every((item) => !item.content.includes('products'))) {
        state.push({
          type: false,
          content: 'Failed to load the products',
          id: 1,
        })
      }
    })
    builder.addCase(initPerson.rejected, (state) => {
      state.push({
        type: false,
        content: 'Failed to load personal data',
        id: 1,
      })
    })

    builder.addCase(initProduct.rejected, (state) => {
      if (state.every((item) => !item.content.includes('product'))) {
        state.push({
          type: false,
          content: 'Failed to load the product',
          id: 1,
        })
      }
    })
  },
})

export const { addInform, removeInform } = informsSlice.actions
export default informsSlice.reducer
