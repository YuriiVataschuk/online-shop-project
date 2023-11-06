/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { SizeList } from '../../../components/sizes-list/SizeList'
import classNames from 'classnames'
import { Product } from '../../../utils/types'
import * as cartActions from '../../../features/cartSelector'
import { useLocation } from 'react-router-dom'
import styles from './product-panel.module.scss'

type Props = {
  product: Product | null
}

export const ProductPagePanel: React.FC<Props> = ({ product }) => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  const dispatch = useAppDispatch()
  const cartList = useAppSelector((state) => state.cart.cartList)
  const [size, setSize] = useState(product?.size || 'S')
  const [quantity, setqQuantity] = useState(1)
  const path = useLocation().pathname
  const includesInCart = cartList.find(
    (cartItem) => cartItem.id === product?.id
  )

  const addToCartHandler = () => {
    if (includesInCart && product) {
      dispatch(cartActions.removeFromCart(product.id))
    } else {
      if (product !== null)
        dispatch(
          cartActions.addToCart({
            ...product,
            size: size,
            quantity: quantity,
            path: path,
            image: 'images/shirts/white.png',
          })
        )
    }
  }
  return (
    <div className={styles.panel}>
      <div className={styles.price}>
        {product?.price} {isEng ? 'UAH' : 'ГРН'}
      </div>
      <p className={styles.description}>{product?.description}</p>
      <div className={styles.sizes}>
        <span>{isEng ? 'chose a size' : 'оберіть розмір'}</span>
        {product && (
          <SizeList sizes={product.sizes} size={size} setSize={setSize} />
        )}
      </div>
      <span>{isEng ? 'Quantity' : 'Кількість'}</span>
      <div className={styles.quantity}>
        <button
          className={classNames({
            disabled: quantity === 1 || includesInCart,
          })}
          onClick={() => setqQuantity((prev) => (prev -= 1))}
        >
          -
        </button>
        <div
          className={classNames({
            disabled: includesInCart,
          })}
        >
          {quantity}
        </div>
        <button
          onClick={() => setqQuantity((prev) => (prev += 1))}
          className={classNames({
            disabled: includesInCart,
          })}
        >
          +
        </button>
      </div>
      <button
        className={classNames(styles.addToCart, {
          [styles.disabled]: includesInCart,
        })}
        onClick={addToCartHandler}
      >
        {includesInCart
          ? isEng
            ? 'ADED'
            : 'Додано'
          : isEng
          ? 'ADD'
          : 'Додати'}{' '}
        {isEng ? 'TO CART' : 'до корзини'}
      </button>
    </div>
  )
}
