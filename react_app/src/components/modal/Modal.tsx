/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

function validateEmail(value: string) {
  return EMAIL_REGEXP.test(value)
}
function validatePassword(value: string) {
  return PASSWORD_REGEXP.test(value)
}

import React, { useEffect, useState } from 'react'
import * as personActions from '../../features/personSelector'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { signFetch } from '../../utils/fetch/fetch'
import { User } from '../../utils/types'
import { Button } from '../button/Button'
import * as actionsEr from '../../features/informSelector'
import { Close } from '../close/Close'
import styles from './modal.module.scss'

type Props = {
  showModal: boolean
  setShowModal: () => void
}

const defaultUser: User = {
  email: 'Ln@ukr.net',
  password: '11111111Ll',
  repeatedPassword: '',
}
const defaultError = {
  email: false,
  password: false,
  repeatedPassword: false,
}

export const Modal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(defaultUser)
  const [error, setError] = useState(defaultError)
  const [clik, setClick] = useState(false)
  const [signIn, setSignIn] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  const handleOnChangeEmail = (value: string) => {
    setUser({ ...user, email: value })
  }
  const handleOnChangePassword = (value: string) => {
    setUser({ ...user, password: value })
  }
  const handleOnChangeRepeatePassword = (value: string) => {
    setUser({ ...user, repeatedPassword: value })
  }

  const handleSubmit = () => {
    setClick(true)

    if (!error.password && !error.email && !error.repeatedPassword && !signIn) {
      setLoading(true)
      signFetch(user, 'signUp')
        .then(() => {
          dispatch(
            actionsEr.addInform({
              type: true,
              content: `Registration completed successfully.
                Sign in to your account`,
              id: 0,
            })
          )
        })
        .catch(() => {
          dispatch(
            actionsEr.addInform({ type: false, content: 'signUp False', id: 0 })
          )
        })
        .finally(() => {
          setLoading(false)
          setClick(false)
          setUser(defaultUser)
          setShowModal()
          setSignIn(true)
        })

      return
    }
    if (!error.password && !error.email && signIn) {
      setLoading(true)
      signFetch(user, 'signIn')
        .then((r) => {
          if (r.access) {
            dispatch(personActions.setToken(r.access))
            navigate('account')
          }
        })
        .catch(() => {
          dispatch(
            actionsEr.addInform({ type: false, content: 'SingIn False', id: 0 })
          )
        })
        .finally(() => {
          setLoading(false)
          setClick(false)
          setUser(defaultUser)
          setShowModal()
        })
    }
  }

  useEffect(() => {
    setError((prev) => {
      return { ...prev, email: validateEmail(user.email) ? false : true }
    })
    setError((prev) => {
      return {
        ...prev,
        password: validatePassword(user.password) ? false : true,
      }
    })

    setError((prev) => {
      return {
        ...prev,
        repeatedPassword:
          user.password === user.repeatedPassword ? false : true,
      }
    })
  }, [clik, user])

  useEffect(() => {
    const main = document.querySelector('main')
    if (showModal && main) {
      main.style.opacity = '0.5'
    } else {
      if (main) {
        main.style.opacity = '1'
      }
    }
  }, [showModal])

  return (
    <div
      className={styles.modal}
      style={{
        top: showModal ? 80 : -800,
      }}
    >
      <Close onClick={setShowModal} />
      <p>{isEng ? 'EMAIL ADDRESS' : 'Емейл'}</p>
      <input
        type="email"
        className={clik && error.email ? 'danger' : ''}
        placeholder="Name@domain.com"
        value={user.email}
        onChange={(e) => handleOnChangeEmail(e.target.value)}
      />
      <p>{isEng ? 'PASSWORD' : 'Пароль'}</p>
      <input
        className={clik && error.password ? 'danger' : ''}
        type="password"
        placeholder={isEng ? 'Enter your password' : 'Введіть пароль'}
        value={user.password}
        onChange={(e) => handleOnChangePassword(e.target.value)}
      />

      {!signIn && (
        <>
          <p>{isEng ? 'REPEAT PASSWORD' : 'Продублюйте пароль'}</p>
          <input
            className={clik && error.repeatedPassword ? 'danger' : ''}
            type="password"
            placeholder={isEng ? 'Repeat your password' : 'Продублюйте пароль'}
            value={user.repeatedPassword}
            onChange={(e) => handleOnChangeRepeatePassword(e.target.value)}
          />
        </>
      )}

      <Button
        loading={loading}
        onClick={handleSubmit}
        content={
          signIn
            ? isEng
              ? 'SIGN IN'
              : 'Увійти'
            : isEng
            ? 'QUICK SIGN UP'
            : 'Швидка реєстрація'
        }
      />
      <button className={styles.quick} onClick={() => setSignIn(!signIn)}>
        {signIn
          ? isEng
            ? 'QUICK SIGN UP'
            : 'Швидка реєстрація'
          : isEng
          ? 'SIGN IN'
          : 'Увійти'}
      </button>
    </div>
  )
}
