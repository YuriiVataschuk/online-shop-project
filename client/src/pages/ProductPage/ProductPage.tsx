import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect, useState } from 'react'
import styles from './product-page.module.scss'
import { ProductPageImage } from './image/image/ProductPageImage'
import { ProductPagePanel } from './panel/ProductPagePanel'
import * as productActions from './../../features/productSelector'

export const ProductPage = () => {
  const path = useLocation().pathname
  const lastIndex = path.lastIndexOf('/') + 1
  const id = path.slice(lastIndex)
  const [localLoading, setLocalLoading] = useState(true)

  const fetchProducts = async () => {
    dispatch(productActions.removeProduct())
    setLocalLoading(true)
    return new Promise((resolve) => {
      setTimeout(async () => {
        dispatch(productActions.initProduct(id))
        resolve('')
      }, 500)
    })
  }
  useEffect(() => {
    fetchProducts().finally(() => setLocalLoading(false))
  }, [path])
  const { product } = useAppSelector((state) => state.product)

  const dispatch = useAppDispatch()
  const isBlack = product?.color === 'Black'

  return (
    <main
      className={styles.page}
      style={{
        opacity: localLoading ? 0 : 1,
        backgroundColor: isBlack ? '#dcdada' : 'rgb(19, 19, 19)',
      }}
    >
      <h1
        className={styles.title}
        style={{
          color: isBlack ? 'black' : '#fff',
        }}
      >
        {product?.name}
      </h1>
      <div className={styles.content}>
        {product && <ProductPageImage image={product.photo} />}
        {product && <ProductPagePanel product={product} isBlack={isBlack} />}
      </div>
    </main>
  )
}
