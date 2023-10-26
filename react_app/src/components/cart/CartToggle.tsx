import { useAppDispatch, useAppSelector } from '../../app/hooks'
import * as cartActions from '../../features/cartSelector'

export const CartToggle = () => {
  const dispatch = useAppDispatch()
  const showCart = useAppSelector((state) => state.cart.showCart)
  return (
    <button
      className="cart__title"
      onClick={() => dispatch(cartActions.setShowCart(!showCart))}
    >
      <img
        src="images/arrow-left.png"
        alt="close cart"
        style={{
          transform: !showCart ? 'rotate(90deg)' : 'rotate(-90deg)',
        }}
      />{' '}
      CONTINUE SHOPPING
    </button>
  )
}
