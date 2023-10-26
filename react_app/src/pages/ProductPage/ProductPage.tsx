import { useLocation } from 'react-router-dom'
import { SizeList } from '../../components/SizeList'
import { Arrow } from './Arrow'
import { ImagePagination } from './ImagePagination'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import React, { useEffect, useState } from 'react'
import * as cartActions from '../../features/cartSelector'
import * as currentProductActions from '../../features/productSelector'
import classNames from 'classnames'

export const ProductPage = () => {
  const path = useLocation().pathname
  const lastIndex = path.lastIndexOf('/') + 1
  const id = path.slice(lastIndex)

  const cartList = useAppSelector((state) => state.cart.cartList)
  const { product, loading } = useAppSelector((state) => state.product)
  const [size, setSize] = useState(product?.size || 'S')
  const [quantity, setqQuantity] = useState(1)
  const includesInCart = cartList.find(
    (cartItem) => cartItem.id === product?.id
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(currentProductActions.initProduct(id))
  }, [path])


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
            image: 'images/test.webp',
          })
        )
    }
  }

  return (
    <main
      className="product-page"
      style={{
        opacity: loading ? 1 : 0,
      }}
    >
      <h1 className="product-page__title">{product?.name}</h1>
      <div className="product-page__content">
        <div className="product-page__image">
          <img src="images/test.webp" alt="" width={'100%'} height="100%" />
          <ImagePagination />
          <button className="product-page__arrow product-page__arrow-left">
            <Arrow variant="--left" />
          </button>
          <button className="product-page__arrow product-page__arrow-right">
            <Arrow variant="--right" />
          </button>
        </div>
        <div className="product-page__panel">
          <div className="product-page__price">{product?.price} UAH</div>
          <p className="product-page__description">{product?.description}</p>
          <div className="product-page__sizes">
            <span>chose a size</span>
            {product && (
              <SizeList sizes={product.sizes} size={size} setSize={setSize} />
            )}
          </div>
          <span>Quantity</span>
          <div className="product-page__quantity">
            <button
              className={classNames({
                disabled: quantity === 1 || includesInCart,
              })}
              onClick={() => setqQuantity((prev) => (prev -= 1))}
            >
              -
            </button>
            <div>{quantity}</div>
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
            className={classNames('product-page__add-to-cart', {
              'product-page__add-to-cart--disabled': includesInCart,
            })}
            onClick={addToCartHandler}
          >
            {includesInCart ? 'ADDED' : 'ADD'} TO CART
          </button>
        </div>
      </div>
    </main>
  )
}
