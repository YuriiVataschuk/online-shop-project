import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PersonalData } from './PersonalData'
import classNames from 'classnames'
import * as pesonActions from '../../features/personSelector'
import React, { useEffect } from 'react'
const personalDataItems = ['name', 'surname', 'email', 'phone']
const deliveryDataItems = ['country', 'city', 'postcode', 'house']

export const Account = () => {
  const { person, token } = useAppSelector((state) => state.person)

  const path = useLocation().pathname
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = () => {
    dispatch(pesonActions.setToken(''))
    navigate('/')
  }

  useEffect(() => {
    if (path.includes('account') && !token) {
      location.reload()
      navigate('/')
    }
    dispatch(pesonActions.initPerson(token))
  }, [])

  return (
    <main className="account">
      <h1 className="account__title">
        MY PROFILE
        <p className="account__user">{person?.email}</p>
      </h1>
      <div className="account__content">
        <div className="account__signout">
          <ul className="account__signout--change">
            <Link to="account">
              <li
                className={classNames('account__signout--item', {
                  'account__signout--item-active': path === '/account',
                })}
              >
                -Personal data
              </li>
            </Link>
            <Link to={path + '/orders'}>
              <li
                className={classNames('account__signout--item', {
                  'account__signout--item-active': path !== '/account',
                })}
              >
                My orderes
              </li>
            </Link>
          </ul>
          <button onClick={handleChange}>SIGN OUT</button>
        </div>
        <div className="account__data">
          <PersonalData items={personalDataItems} />
          <PersonalData items={deliveryDataItems} />
        </div>
      </div>
    </main>
  )
}
