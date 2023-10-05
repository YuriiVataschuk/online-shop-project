import { Link } from 'react-router-dom'

export const CartItem = () => {
  return (
    <div className="cart__item">
      <div className="cart__item--img">
        <img
          src="images/close-mobile-menu.png"
          alt="remove item"
          className="cart__item--remove"
          width={25}
        />
        <Link to="/">
          <img src="images/cart-test.png" width="100%" alt="" />
        </Link>
      </div>

      <div className="cart__item--panel">
        <p className="cart__item--name">item name</p>

        <p className="cart__item--quantity">
          <span>1</span>
          <button className="cart__item--minus">-</button>
          <button className="cart__item--plus">+</button>
        </p>
      </div>
    </div>
  )
}
