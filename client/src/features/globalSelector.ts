import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('language') || 'EN'

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeLang: (state, payload: PayloadAction<string>) => {
      const newLang = payload.payload
      state = newLang
      localStorage.setItem('language', newLang)

      return state
    },
  },
})

export const { changeLang } = globalSlice.actions
export default globalSlice.reducer
