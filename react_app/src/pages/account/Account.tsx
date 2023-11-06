import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PersonalData } from './PersonalData'
import classNames from 'classnames'
import * as pesonActions from '../../features/personSelector'
import React, { useEffect } from 'react'
import { Button } from '../../components/button/Button'
import { Helmet } from 'react-helmet-async'
const personalDataItems = ['name', 'surname', 'email', 'phone']
const deliveryDataItems = ['country', 'city', 'postcode', 'house']

export const Account = () => {
  const { person, token } = useAppSelector((state) => state.person)
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

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
    dispatch(pesonActions.initPerson(token)).then((r) => {
      if (r.payload.code) {
        dispatch(pesonActions.setToken(''))
      }
    })
  }, [])

  return (
    <main className="account">
      <Helmet>
        <title>{`${isEng ? 'Online Shop | ' : 'Онлайн Магазин | '} ${
          isEng ? 'MY PROFILE' : 'МІЙ ПРОФІЛЬ'
        }`}</title>
      </Helmet>
      <h1 className="account__title">
        {isEng ? 'MY PROFILE' : 'МІЙ ПРОФІЛЬ'}
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
                {isEng ? '-Personal data' : '-Персональні данні'}
              </li>
            </Link>
            <Link to={path + '/orders'}>
              <li
                className={classNames('account__signout--item', {
                  'account__signout--item-active': path !== '/account',
                })}
              >
                {isEng ? 'My orderes' : 'Мої замовлення'}
              </li>
            </Link>
          </ul>
          <Button
            onClick={handleChange}
            content={isEng ? 'SIGN OUT' : 'ВИЙТИ З ПРОФІЛЮ'}
          />
        </div>
        <div className="account__data">
          <PersonalData
            items={personalDataItems}
            type={isEng ? 'Personal data' : 'Персональні данні'}
          />
          <PersonalData
            items={deliveryDataItems}
            type={isEng ? 'Delivery' : 'Доставка'}
          />
        </div>
      </div>
    </main>
  )
}
