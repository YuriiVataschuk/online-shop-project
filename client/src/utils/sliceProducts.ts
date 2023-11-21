import { ListProduct } from './types'

export const sliceProductList = (
  list: ListProduct[],
  page: string,
  perPage: string
) => {
  if (perPage === 'all') {
    return list
  }

  const from = +page * +perPage - +perPage
  const to = from + +perPage

  return list.slice(from, to)
}
