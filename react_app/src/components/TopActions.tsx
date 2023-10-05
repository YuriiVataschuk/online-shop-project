/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

type Props = {
  setSowNav: () => void
  showNav: boolean
}
export const TopActions: React.FC<Props> = ({ setSowNav, showNav }) => {
  const path = useLocation().pathname

  return (
    <div className="top-actions">
      <Link to={path + '/cart'}>
        <img
          className="top-actions__cart"
          src={showNav ? 'images/cart-black.png' : 'images/cart-icon.png'}
          alt="cart icon"
          width={27}
        />
      </Link>

      <span
        style={{
          color: showNav ? 'black' : '#fff',
        }}
      >
        {' '}
        0 UAH
      </span>
      <img
        src={
          showNav ? 'images/close-mobile-menu.png' : 'images/mobile-menu.png'
        }
        alt="mobile menu"
        width={27}
        className="top-actions__show-nav"
        onClick={setSowNav}
      />
    </div>
  )
}
