import { ListProduct } from './types'

export const getSortProducts = (products: ListProduct[] = []) => {
  return {
    null: {
      className: '--off',
      list: products.length ? [...products] : [],
    },

    true: {
      className: '--up ',
      list: products.length
        ? [...products].sort((a, b) => +b.price - +a.price)
        : [],
    },

    false: {
      className: '--down',
      list: products.length
        ? [...products].sort((a, b) => +a.price - +b.price)
        : [],
    },
  }
}
