export type Person = {
  [key: string]: string
  name: string
  surname: string
  phone: string
  country: string
  city: string
  postcode: string
  house: string
  gender: string
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
  description: any
  price: string
  photo: string
  color: string
}

export interface ListProduct {
  [key: string]: string | number
  id: number
  name: string
  price: number
  discount: number
  photo: string
}

export interface CartProduct extends Product {
  path: string
}

export type User = {
  email: string
  password: string
  repeatedPassword: string
}
