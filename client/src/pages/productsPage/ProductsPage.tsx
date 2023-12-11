import { useState, useEffect, useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ProductsPageList } from './list/ProductsPageList'
import { Pagination } from '../../components/pagination/Pagination'
import { ProductsPageTitle, getTitle } from './title/ProductsPageTitle'
import { sliceProductList } from '../../utils/sliceProducts'
import { getSortProducts } from '../../utils/getSortProducts'
import { ProductsControl } from './control/ProductsControl'
import { ListProduct } from '../../utils/types'
import styles from './products.module.scss'
import * as productActions from '../../features/productsSelector'

export const ProductsPage = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.productList.products)
  const path = useLocation().pathname
  const [params] = useSearchParams()
  const perPage = params.get('perPage') || '15'
  const page = params.get('page') || '1'
  const [sortBy, setSortBy] = useState<null | boolean>(null)
  const pathForFetch = getTitle(path)
  const [localLoading, setLocalLoading] = useState(true)

  const fetchProducts = async (category: string) => {
    setLocalLoading(true)
    dispatch(productActions.removeProducts())
    return new Promise((resolve) => {
      setTimeout(async () => {
        dispatch(productActions.initProducts(category))
        resolve('')
      }, 500)
    })
  }

  useEffect(() => {
    fetchProducts(pathForFetch).finally(() => setLocalLoading(false))
    console.log(pathForFetch)
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

  const sortObj: { [key: string]: { className: string; list: ListProduct[] } } =
    useMemo(() => getSortProducts(products), [products])

  const listToRender = sliceProductList(
    sortObj[String(sortBy)].list,
    page,
    perPage
  )

  return (
    <main
      className={styles.page}
      style={{
        opacity: localLoading ? 0 : 1,
      }}
    >
      <ProductsPageTitle path={path} loading={!localLoading} />

      {listToRender.length > 0 && (
        <ProductsControl
          variants={sortObj[String(sortBy)].className}
          handleClick={() => handleSort(sortBy)}
        />
      )}

      <div className={styles.content}>
        {listToRender && <ProductsPageList items={listToRender} />}
        {perPage !== 'all' && listToRender.length !== 0 && (
          <Pagination
            paginationLength={Math.ceil(products.length / +perPage) || 1}
          />
        )}
      </div>
    </main>
  )
}
