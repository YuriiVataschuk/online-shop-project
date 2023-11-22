export type OrderItemFromCart = {
  id: number
  name: string
  orders: {
    size: string
    quantity: number
    product: {
      id: number
      name: string
      price: number
      photo: null
    }
  }[]
  phone_number: string
  user: number
  created_at: string
}

import React, { useState } from 'react'
import styles from './orders.module.scss'
import { OrderListItem } from './item/ OrderListItem'
import { useAppSelector } from '../../../app/hooks'

type OrdersProps = {
  orderHistory: OrderItemFromCart[]
}

export const Orders: React.FC<OrdersProps> = ({ orderHistory }) => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null)
  const lang = useAppSelector((state) => state.global)

  const handleToggleDescription = (index: number) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <>
      {orderHistory.length ? (
        <ul className={styles.list}>
          {orderHistory.map((item, index) => (
            <OrderListItem
              key={item.id}
              item={item}
              isOpen={index === openItemIndex}
              onToggle={() => handleToggleDescription(index)}
            />
          ))}
        </ul>
      ) : (
        <h3
          style={{
            fontWeight: 400,
          }}
        >
          {lang === 'EN'
            ? 'Order history is empty'
            : 'Історія замовлень порожня'}
        </h3>
      )}
    </>
  )
}
