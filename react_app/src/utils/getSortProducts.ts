export const getSortProducts = (products: any) => {
  return {
    null: {
      className: '--up',
      list: [...products],
    },

    true: {
      className: '--down',
      list: [...products].sort((a, b) => b.price - a.price),
    },

    false: {
      className: '--off',
      list: [...products].sort((a, b) => a.price - b.price),
    },
  }
}
