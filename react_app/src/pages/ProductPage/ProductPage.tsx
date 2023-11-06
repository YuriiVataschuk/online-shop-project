import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import React, { useEffect } from 'react'
import * as currentProductActions from '../../features/productSelector'
import styles from './product-page.module.scss'
import { ProductPageImage } from './image/image/ProductPageImage'
import { ProductPagePanel } from './panel/ProductPagePanel'

export const ProductPage = () => {
  const path = useLocation().pathname
  const lastIndex = path.lastIndexOf('/') + 1
  const id = path.slice(lastIndex)

  const { product, loading } = useAppSelector((state) => state.product)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(currentProductActions.initProduct(id))
  }, [path])

  return (
    <main
      className={styles.page}
      style={{
        opacity: loading ? 1 : 0,
        backgroundColor: true ? '#dcdada' : 'rgb(19, 19, 19);',
      }}
    >
      <h1
        className={styles.title}
        style={{
          color: true ? 'black' : '#fff',
        }}
      >
        {product?.name}
      </h1>
      <div className={styles.content}>
        {product && <ProductPageImage />}
        {product && <ProductPagePanel product={product} />}
      </div>
    </main>
  )
}
