import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loocalStorage } from '../utils/localStorage'
import { Person } from '../utils/types'

const def = {
  name: 'Leonid',
  surname: 'Bondarchuk',
  email: '',
  phone: '',
  country: '',
  city: '',
  postcode: '',
  house: '',
  active: false,
}

const { value, setValue } = loocalStorage('account', {})
const initialState: Person | any = value

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPersonData: (
      state,
      payload: PayloadAction<{ field: string; value: string }>
    ) => {
      state[payload.payload.field] = payload.payload.value
      setValue(state)
    },
    addPerson: (state, payload: PayloadAction<Person>) => {
      return (state = payload.payload)
    },

    signOut: (state) => {
      state = def
      setValue(state)
    },
  },
})

export const { setPersonData, addPerson, signOut } = personSlice.actions
export default personSlice.reducer
