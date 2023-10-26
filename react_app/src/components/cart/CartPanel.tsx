import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Button } from '../Button'
import { CheckOutForm } from './checkout/CheckOutForm'
import * as CartActions from '../../features/cartSelector'

const regexp = /^(\+3|)[0-9]{10,11}$/

type Props = {
  checkout: boolean
  setCheckout: (boolean: boolean) => void
}

export const CartPanel: React.FC<Props> = ({ checkout, setCheckout }) => {
  const [errors, setErrors] = useState(false)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('+380')
  const [submited, setSubmited] = useState(false)
  const dispatch = useAppDispatch()
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
      console.log('ok')
    }
  }

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
        onChange={() => (!checkout ? setCheckout(true) : onSubmit())}
        content={checkout ? 'Send' : 'Checkout'}
      />
    </div>
  )
}
