import React from 'react'
import styles from './order-list-item.module.scss'
import { OrderItemFromCart } from '../Orders'

type Props = {
  item: OrderItemFromCart
  isOpen: boolean
  onToggle: () => void
}

export const OrderListItem: React.FC<Props> = ({ item, isOpen, onToggle }) => {
  const calculateTotalPrice = () => {
    return item.orders.reduce(
      (total, order) => total + order.product.price * order.quantity,
      0
    )
  }

  const totalQuantity = item.orders.reduce(
    (total, order) => total + order.quantity,
    0
  )

  return (
    <li className={styles.item}>
      <button
        className={`${styles.title} ${isOpen && styles.active}`}
        onClick={onToggle}
      >
        <h3>{item.created_at}</h3>{' '}
        <h6
          style={{
            fontWeight: 300,
          }}
        >
          Status:{' '}
          <span
            style={{
              color: 'green',
            }}
          >
            processing
          </span>
        </h6>
      </button>
      <p
        className={`${styles.description} ${
          isOpen ? styles.showDescription : ''
        }`}
        style={{
          border: isOpen ? '1px solid gray' : 'none',
          backgroundColor: isOpen ? 'rgb(236, 233, 233)' : '#fff',
        }}
      >
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>SIZE</th>
            </tr>
          </thead>
          <tbody>
            {item.orders &&
              item.orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.product.name}</td>
                  <td>{order.product.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.size}</td>
                </tr>
              ))}
            <tr
              style={{
                backgroundColor: 'black',
                color: 'white',
                transition:
                  'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
              }}
            >
              <td></td>
              <td>{calculateTotalPrice().toFixed(2)}</td>
              <td>{totalQuantity}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </p>
    </li>
  )
}
