import { ProductsPageList } from '../ProductsPageList'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Pagination } from '../../components/Pagination'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import * as productActions from '../../features/productsSelector'
import { ProductsPageTitle } from './ProductsPageTitle'
import { sliceProductList } from '../../utils/sliceProducts'
import { getSortProducts } from '../../utils/getSortProducts'
import { ProductsControl } from './ProductsControl'
import { Product } from '../../utils/types'

export const ProductsPage = () => {
  const { products, loading } = useAppSelector((state) => state.productList)
  const dispatch = useAppDispatch()
  const path = useLocation().pathname
  const [params] = useSearchParams()
  const perPage = params.get('perPage') || '15'
  const page = params.get('page') || '1'
  const paginationLength = Math.ceil(
    products.length / (perPage ? +perPage : 15)
  )
  const [sortBy, setSortBy] = useState<null | boolean>(null)

  useEffect(() => {
    dispatch(productActions.init())
  }, [path])

  const handleSort = (sortBy: null | boolean) => {
    if (sortBy === null) {
      setSortBy(true)
      return
    }
    if (sortBy) {
      setSortBy(false)
      return
    }

    setSortBy(null)
  }

  const sortObj: { [key: string]: { className: string; list: Product[] } } =
    getSortProducts(products)
  const listToRender = sliceProductList(
    sortObj[String(sortBy)].list,
    page,
    perPage
  )

  return (
    <main
      className="products-page"
      style={{
        opacity: loading ? 1 : 0,
      }}
    >
      <ProductsPageTitle path={path} loading={loading} />

      <ProductsControl
        variants={sortObj[String(sortBy)].className}
        handleClick={() => handleSort(sortBy)}
      />

      <div className="products-page__content">
        <ProductsPageList items={listToRender} />
        {perPage !== 'all' && (
          <Pagination
            paginationLength={paginationLength || products.length / 15}
          />
        )}
      </div>
    </main>
  )
}
