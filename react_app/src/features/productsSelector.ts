import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../utils/types'
const names = [
  'Біла футболка 1',
  'Чорна футболка 2',
  'Сіра футболка 3',
  'Червона футболка 4',
  'Синя футболка 5',
  'Зелена футболка 6',
  'Жовта футболка 7',
  'Рожева футболка 8',
  'Футболка з малюнком 9',
  'Футболка з логотипом 10',
  'Футболка з вишивкою 11',
  'Футболка з капюшоном 12',
  'Футболка для спорту 13',
  'Футболка для вечірки 14',
  'Футболка для пляжу 15',
  'Футболка для подорожей 16',
  'Футболка для щоденного використання 17',
  'Футболка з коротким рукавом 18',
  'Футболка з довгим рукавом 19',
  'Футболка з коміксами 20',
]

const cartItem = {
  id: 0,
  name: 'Product',
  sizes: ['S', 'M', 'L', 'XL'],
  image: 'images/test.webp',
  quantity: 0,
  size: 'S',
  description: 'Lorem dhjjk  dkjfhfh  fjisinxd ks;s; k',
  price: '',
}

const items: Product[] = []

for (let i = 0; i < 20; i += 1) {
  items.push({
    ...cartItem,
    id: i,
    price: '1' + i + '00',
    name: names[i] || 'Футболка з коміксами',
  })
}
function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export const init = createAsyncThunk('fetch/products', () => {
  return wait(500).then(() => items)
})

const initialState: {
  loading: boolean
  products: Product[]
} = {
  loading: false,
  products: [],
}

const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = false
    })

    builder.addCase(
      init.fulfilled,
      (state, actions: PayloadAction<Product[]>) => {
        state.loading = true
        state.products = actions.payload
      }
    )

    builder.addCase(init.rejected, (state) => {
      state.loading = true
    })
  },
})
export default cartSlice.reducer
