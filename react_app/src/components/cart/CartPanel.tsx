import { useAppSelector } from '../../app/hooks'
import { Button } from '../Button'

export const CartPanel = () => {
  const { cartList } = useAppSelector((state) => state.cart)
  const totalAmount = cartList.reduce((a, c) => a + +c.price * c.quantity, 0)
  return (
    <div className="cart__panel">
      <div className="cart__total">
        {cartList.length > 0 && (
          <>
            <p>total :</p>
            <span>{totalAmount}</span>
          </>
        )}
      </div>
      <Button />
    </div>
  )
}
