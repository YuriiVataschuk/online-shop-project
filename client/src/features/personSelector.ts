import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Person } from '../utils/types'
import { loocalStorage } from '../utils/localStorage'
const { value, setValue } = loocalStorage('token', '')

export const initPerson = createAsyncThunk('fetch/person', (token: string) => {
  const url = 'http://127.0.0.1:8000/user/me/'
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => {
    return r.json()
  })
})

const initialState: {
  [key: string]: any
  loading: boolean
  person: Person | null
  token: string
} = {
  loading: false,
  person: null,
  token: value,
}

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPersonData: (state, payload: PayloadAction<Person>) => {
      if (state.person) {
        state.person = payload.payload
      }
    },

    setToken: (state, payload: PayloadAction<string>) => {
      state.token = payload.payload
      setValue(state.token)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPerson.pending, (state) => {
      state.loading = false
    })

    builder.addCase(
      initPerson.fulfilled,
      (state, actions: PayloadAction<any>) => {
        state.person = actions.payload
        state.loading = false
      }
    )

    builder.addCase(initPerson.rejected, (state) => {
      state.loading = true
    })
  },
})

export const { setPersonData, setToken } = personSlice.actions
export default personSlice.reducer
