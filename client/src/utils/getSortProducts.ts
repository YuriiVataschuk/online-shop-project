import { ListProduct, Product } from './types'

export const getSortProducts = (products: ListProduct[] = []) => {
  return {
    null: {
      className: '--up',
      list: products.length ? [...products] : [],
    },

    true: {
      className: '--down',
      list: products.length
        ? [...products].sort((a, b) => +b.price - +a.price)
        : [],
    },

    false: {
      className: '--off',
      list: products.length
        ? [...products].sort((a, b) => +a.price - +b.price)
        : [],
    },
  }
}
