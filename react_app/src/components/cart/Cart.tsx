import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CartItem } from './CartItem'
import { Button } from '../Button'
import { useEffect, useState } from 'react'

export const Cart = () => {
  const path = useLocation().pathname
  const prevPath = path.replace('/cart', '')
  const [shift, setShift] = useState(-400)
  const navigate = useNavigate()

  useEffect(() => {
    const prevPath = path.replace('/cart', '')
    const Id = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement
      if (target.className.includes('cart')) return

      setShift(-400)
      navigate(prevPath)
    }

    if (!path.includes('cart')) return

    document.addEventListener('click', Id)

    return () => document.removeEventListener('click', Id)
  }, [path, shift, navigate, prevPath])

  useEffect(() => {
    setShift(path.includes('cart') ? 0 : -400)
  }, [path])

  return (
    <div
      className="cart"
      style={{
        right: shift,
      }}
    >
      <Link to={prevPath} className="cart__title">
        <img
          src="images/arrow-left.png"
          alt="close cart"
          style={{
            transform: !path.includes('cart') ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />{' '}
        CONTINUE SHOPPING
      </Link>

      <ul className="cart__list">
        <h1 className="cart__list--title">My purhase</h1>
        <li className="cart__item">
          <CartItem />
        </li>
        <li className="cart__item">
          <CartItem />
        </li>
        <li className="cart__item">
          <CartItem />
        </li>
        <li className="cart__item">
          <CartItem />
        </li>

        {/* <h3 className="cart__item--empty">CART IS EMPTY</h3> */}
      </ul>
      <div className="cart__panel">
        <div className="cart__total">
          <p>total :</p>
          <span>0</span>
        </div>
        <Button />
      </div>
    </div>
  )
}
