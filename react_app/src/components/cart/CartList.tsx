import { useAppSelector } from '../../app/hooks'

import { CartItem } from './CartItem'

export const CartList = () => {
  const { cartList } = useAppSelector((state) => state.cart)

  return (
    <ul className="cart__list">
      <h1 className="cart__list--title">My purhase</h1>
      {cartList.length ? (
        cartList.map((item) => (
          <li className="cart__item" key={item.name + item.id}>
            <CartItem item={item} />
          </li>
        ))
      ) : (
        <h3 className="cart__empty">CART IS EMPTY</h3>
      )}
    </ul>
  )
}
