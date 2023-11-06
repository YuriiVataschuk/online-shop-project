import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = 'EN'

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeLang: (state, payload: PayloadAction<string>) => {
      return (state = payload.payload)
    },
  },
})

export const { changeLang } = globalSlice.actions
export default globalSlice.reducer
