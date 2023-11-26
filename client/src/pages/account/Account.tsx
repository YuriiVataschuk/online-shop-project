/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from 'react'
import { OrderItemFromCart, Orders } from './orders/Orders'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import * as personActions from '../../features/personSelector'
import { Loader } from '../../components/loader/Loader'
import { Helmet } from 'react-helmet-async'
import { PersonalData } from './pesonalData/PersonalData'
import classNames from 'classnames'
import { Button } from '../../components/button/Button'
import styles from './account.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { translateContent } from '../../utils/translate'

const personalDataItems = ['name', 'surname', 'gender', 'phone']
const deliveryDataItems = ['country', 'city', 'postcode', 'house']
export const Account = () => {
  const { person, token } = useAppSelector((state) => state.person)
  const lang = useAppSelector((state) => state.global)

  const path = useLocation().pathname
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [selectedTab, setSelectedTab] = useState('personalData')
  const showData = selectedTab === 'personalData'

  const [orderHistory, setOrderHistory] = useState<OrderItemFromCart[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  const handleChange = () => {
    dispatch(personActions.setToken(''))
    navigate('/')
  }

  useEffect(() => {
    if (path.includes('account') && !token) {
      location.reload()
      navigate('/')
    }

    dispatch(personActions.initPerson(token)).then((r) => {
      if (r.payload.detail) {
        dispatch(personActions.setToken(''))
        navigate('/')
        location.reload()
      }
    })
  }, [])

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)

    if (tab === 'orders' && orderHistory.length === 0) {
      setIsLoadingOrders(true)

      fetch('http://127.0.0.1:8000/api/shop/cart/user_carts/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          setOrderHistory(r)
        })
        .catch((error) => {
          console.error('Error fetching order history:', error)
        })
        .finally(() => {
          setIsLoadingOrders(false)
        })
    }
  }

  return (
    <main className={styles.account}>
      <Helmet>
        <title>{`${translateContent(
          'Online Shop | ',
          'Онлайн Магазин | ',
          lang
        )} ${translateContent('MY PROFILE', 'МІЙ ПРОФІЛЬ', lang)}`}</title>
      </Helmet>
      <div className={styles.info}>
        <h1>
          {selectedTab === 'personalData'
            ? translateContent('MY PROFILE', 'МІЙ ПРОФІЛЬ', lang)
            : translateContent('ORDER HISTORY', 'ІСТОРІЯ ЗАМОВЛЕНЬ', lang)}
          <p className={styles.name}>{person?.name}</p>
        </h1>
      </div>
      <div className={styles.content}>
        <div className={styles.pages}>
          <ul className={styles['nav-list']}>
            <li
              onClick={() => handleTabChange('personalData')}
              className={classNames({
                [styles.active]: selectedTab === 'personalData',
              })}
            >
              {`${showData ? '-' : ''}${translateContent(
                ' Personal data',
                ' Персональні данні',
                lang
              )}`}
            </li>
            <li
              onClick={() => handleTabChange('orders')}
              className={classNames('account__signout--item', {
                [styles.active]: selectedTab === 'orders',
              })}
            >
              {`${!showData ? '-' : ''}${translateContent(
                ' My orders',
                ' Мої замовлення',
                lang
              )}`}
            </li>
          </ul>

          <Button
            onClick={handleChange}
            content={translateContent('SIGN OUT', 'ВИЙТИ З ПРОФІЛЮ', lang)}
          />
        </div>
        <div className={styles.data}>
          {selectedTab === 'personalData' && (
            <>
              <PersonalData
                items={personalDataItems}
                type={translateContent(
                  'Personal data',
                  'Персональні данні',
                  lang
                )}
              />

              <PersonalData
                items={deliveryDataItems}
                type={translateContent('Delivery', 'Доставка', lang)}
              />
            </>
          )}
          {selectedTab === 'orders' && (
            <>
              {isLoadingOrders ? (
                <div className={styles.loaderContainer}>
                  <Loader isBlack />
                </div>
              ) : (
                <Orders orderHistory={orderHistory} />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
