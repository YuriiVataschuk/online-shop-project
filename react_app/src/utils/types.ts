export type Person = {
  [key: string]: string | boolean
  name: string
  surname: string
  email: string
  phone: string
  country: string
  city: string
  postcode: string
  house: string
  active: boolean
}

export type Sort = {
  [key: string]: any
}

export interface Product {
  [key: string]: string[] | string | number
  id: number
  name: string
  sizes: string[]
  image: string
  quantity: number
  size: string
  description: string
  price: string
}

export interface CartProduct extends Product {
  path: string
}
