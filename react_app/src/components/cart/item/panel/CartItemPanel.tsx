/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { CartProduct } from '../../../../utils/types'
import { SizeList } from '../../../sizes-list/SizeList'
import { useAppDispatch } from '../../../../app/hooks'
import * as cartActions from '../../../../features/cartSelector'
import classNames from 'classnames'
import styles from './cart.item.panel.module.scss'

type Props = {
  item: CartProduct
}

export const CartItemPanel: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch()

  const [quantity, setQuantity] = useState<number>(item.quantity)
  const [size, setSize] = useState<string>(item.size)
  useEffect(() => {
    dispatch(cartActions.setQuantity({ id: item.id, quantity: quantity }))
  }, [dispatch, item.id, quantity])
  return (
    <div className={styles.panel}>
      <p className={styles.name}>{item.name}</p>

      <p className={styles.quantity}>
        <span className={styles.value}>{quantity}</span>
        <button
          className={classNames(styles.button, {
            disabled: quantity === 1,
          })}
          onClick={() => setQuantity(quantity - 1)}
        >
          -
        </button>
        <button
          className={styles.button}
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </p>
      <SizeList sizes={item.sizes} size={size} setSize={setSize} />
    </div>
  )
}
