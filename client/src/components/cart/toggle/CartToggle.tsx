import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as cartActions from '../../../features/cartSelector'
import styles from './toggle.module.scss'

export const CartToggle = () => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  const dispatch = useAppDispatch()
  const showCart = useAppSelector((state) => state.cart.showCart)
  return (
    <button
      className={styles.toggle}
      onClick={() => dispatch(cartActions.setShowCart(!showCart))}
    >
      <img
        src="images/arrow-left.png"
        alt="close cart"
        style={{
          transform: !showCart ? 'rotate(90deg)' : 'rotate(-90deg)',
        }}
      />{' '}
      {isEng ? 'CONTINUE SHOPPING' : 'ПРОДОВЖИТИ ПОКУПКИ'}
    </button>
  )
}
