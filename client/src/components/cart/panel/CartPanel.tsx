/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Button } from '../../button/Button'
import { CheckOutForm } from '../checkout/CheckOutForm'
import styles from './cart-panel.module.scss'
import * as cartActions from '../../../features/cartSelector'
import * as informActions from '../../../features/informSelector'
import { FETCH } from '../../../utils/fetch/fetch'
import { informs } from '../../../utils/errors'
import { translateContent } from '../../../utils/translate'

const regexp = /^(\+3|)[0-9]{10,11}$/

type Props = {
  checkout: boolean
  setCheckout: (boolean: boolean) => void
}

export const CartPanel: React.FC<Props> = ({ checkout, setCheckout }) => {
  const lang = useAppSelector((state) => state.global)
  const { token } = useAppSelector((state) => state.person)
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState(false)
  const [name, setName] = useState('Leonid')
  const [number, setNumber] = useState('+380689262855')
  const [submited, setSubmited] = useState(false)
  const [loading, setLoading] = useState(false)
  const { cartList } = useAppSelector((state) => state.cart)
  const totalAmount = cartList.reduce((a, c) => a + +c.price * c.quantity, 0)
  const writeInform = (text: string, type = true) => {
    dispatch(informActions.addInform({ type: type, content: text, id: 0 }))
  }

  useEffect(() => {
    if (submited) {
      setErrors(regexp.test(number) && number.length === 13 ? false : true)
    }
  }, [submited, name, number])

  const onSubmit = () => {
    const orders = {
      name: name,
      phone_number: number,
      orders: cartList.map((item) => {
        return {
          size: item.size,
          product: item.id,
          quantity: item.quantity,
        }
      }),
    }
    setSubmited(true)

    if (!errors && name) {
      FETCH('POST', 'api/shop/cart/', orders, token)
        .then((r) => {
          console.log(r, 't')
          writeInform(informs.submitCart.suc[lang])
          dispatch(cartActions.clear())
          dispatch(cartActions.setShowCart(false))
          setName('')
          setNumber('+380')
          setErrors(false)
          setSubmited(false)
        })
        .catch(() => writeInform(informs.submitCart.err[lang], false))
        .finally(() => setLoading(false))
    }
  }

  const handleEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !loading) {
      onSubmit()
    }
  }

  return (
    <div className={styles.container} onKeyDown={handleEnterKeyPress}>
      <div className={styles.panel}>
        {cartList.length > 0 && (
          <>
            <p className={styles.total}>
              {translateContent('TOTAL', 'СУМА', lang)} :
            </p>
            <span className={styles.amount}>
              {totalAmount.toFixed(2)} {translateContent('UAH', 'ГРН', lang)}
            </span>
          </>
        )}
      </div>

      {cartList.length > 0 && (
        <CheckOutForm
          checkout={checkout}
          name={name}
          setName={setName}
          number={number}
          setNumber={setNumber}
          errors={errors}
          submited={submited}
        />
      )}

      {cartList.length > 0 && (
        <Button
          onClick={() => (!checkout ? setCheckout(true) : onSubmit())}
          loading={loading}
          content={
            checkout
              ? translateContent('Send', 'Відправити', lang)
              : translateContent('Checkout', 'Перевірити', lang)
          }
        />
      )}
    </div>
  )
}
