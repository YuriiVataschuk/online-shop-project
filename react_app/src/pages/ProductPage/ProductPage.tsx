import { useLocation } from 'react-router-dom'
import { SizeList } from '../../components/SizeList'
import { Arrow } from './Arrow'
import { ImagePagination } from './ImagePagination'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import * as cartActions from '../../features/cartSelector'
import classNames from 'classnames'

export const ProductPage = () => {
  const path = useLocation().pathname
  const lastIndex = path.lastIndexOf('/') + 1
  const id = path.slice(lastIndex)
  const list = useAppSelector((state) => state.productList.products)
  const cartList = useAppSelector((state) => state.cart.cartList)
  const item = list[+id]
  const [size, setSize] = useState(item.size)
  const [quantity, setqQuantity] = useState(1)
  const includesInCart = cartList.find((cartItem) => cartItem.id === item.id)

  const dispatch = useAppDispatch()

  const addToCartHandler = () => {
    if (includesInCart) {
      dispatch(cartActions.removeFromCart(item.id))
    } else {
      dispatch(
        cartActions.addToCart({
          ...item,
          size: size,
          quantity: quantity,
          path: path,
        })
      )
    }
  }

  return (
    <main className="product-page">
      <h1 className="product-page__title">{item.name}</h1>
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
          <div className="product-page__price">{item.price} UAH</div>
          <p className="product-page__description">{item.description}</p>
          <div className="product-page__sizes">
            <span>chose a size</span>
            <SizeList sizes={item.sizes} size={size} setSize={setSize} />
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
