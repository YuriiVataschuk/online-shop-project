import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { Button } from '../../button/Button'
import { CheckOutForm } from '../checkout/CheckOutForm'
import styles from './cart-panel.module.scss'

const regexp = /^(\+3|)[0-9]{10,11}$/

type Props = {
  checkout: boolean
  setCheckout: (boolean: boolean) => void
}

export const CartPanel: React.FC<Props> = ({ checkout, setCheckout }) => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  const [errors, setErrors] = useState(false)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('+380')
  const [submited, setSubmited] = useState(false)
  const { cartList } = useAppSelector((state) => state.cart)
  const totalAmount = cartList.reduce((a, c) => a + +c.price * c.quantity, 0)

  useEffect(() => {
    if (submited) {
      setErrors(regexp.test(number) && number.length === 13 ? false : true)
    }
  }, [submited, name, number])

  const onSubmit = () => {
    setSubmited(true)

    if (!errors && name) {
      setName('')
      setNumber('+380')
      setErrors(false)
      setSubmited(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {cartList.length > 0 && (
          <>
            <p className={styles.total}>{isEng ? 'total' : 'сума'} :</p>
            <span className={styles.amount}>{totalAmount}</span>
          </>
        )}
      </div>
      <CheckOutForm
        checkout={checkout}
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        errors={errors}
        submited={submited}
      />
      <Button
        onClick={() => (!checkout ? setCheckout(true) : onSubmit())}
        content={
          checkout
            ? isEng
              ? 'Send'
              : 'Відправити'
            : isEng
            ? 'Checkout'
            : 'Перевірити'
        }
        disabled={!cartList.length}
      />
    </div>
  )
}
