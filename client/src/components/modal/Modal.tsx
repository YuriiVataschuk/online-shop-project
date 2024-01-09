/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
const PASSWORD_REGEXP =
  /^(?=.*\d)(?=.*[A-Z])(?!.*[!@#$%^&*].*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/

const PASSWORD_REGEXP_WITHOUTLENGTH =
  /^(?=.*\d)(?=.*[A-Z])(?!.*[!@#$%^&*].*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

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
import { FETCH } from '../../utils/fetch/fetch'
import { User } from '../../utils/types'
import { Button } from '../button/Button'
import * as informActions from '../../features/informSelector'
import { Close } from '../close/Close'
import styles from './modal.module.scss'
import { informs } from '../../utils/errors'
import { translateContent } from '../../utils/translate'

type Props = {
  showModal: boolean
  setShowModal: () => void
}

const defaultUser: User = {
  email: '',
  password: '',
  repeatedPassword: '',
}
const defaultError = {
  email: false,
  password: false,
  repeatedPassword: false,
}

export const Modal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const [eye, setEye] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(defaultUser)
  const [error, setError] = useState(defaultError)
  const [clik, setClick] = useState(false)
  const [signIn, setSignIn] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const lang = useAppSelector((state) => state.global)

  const handleOnChangeEmail = (value: string) => {
    setUser({ ...user, email: value })
  }
  const handleOnChangePassword = (value: string) => {
    setUser({ ...user, password: value })
  }
  const handleOnChangeRepeatePassword = (value: string) => {
    setUser({ ...user, repeatedPassword: value })
  }

  const writeInform = (text: string, success = true) => {
    dispatch(
      informActions.addInform({
        type: success,
        content: text,
        id: 0,
      })
    )
  }

  const handleSubmit = () => {
    setClick(true)

    if (error.password) {
      if (
        PASSWORD_REGEXP_WITHOUTLENGTH.test(user.password) &&
        user.password.length > 25
      ) {
        writeInform(informs.SignUp.longPassword[lang], false)
      } else {
        writeInform(informs.SignIn.paswordNotification[lang], false)
      }
    }
    if (error.email) {
      writeInform(informs.SignIn.emailNotification[lang], false)
    }

    if (!error.password && !error.email && !error.repeatedPassword && !signIn) {
      setLoading(true)
      FETCH('POST', 'user/register/', user)
        .then((response) => {
          if (response.email !== user.email) {
            writeInform(response.email + '', false)
          } else {
            writeInform(informs.SignUp.suc[lang])
          }
        })
        .catch(() => {
          writeInform(informs.SignUp.err[lang], false)
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
      FETCH('POST', 'user/token/', user)
        .then((response) => {
          if (response.detail) {
            writeInform(response.detail, false)
          }

          if (response.access) {
            dispatch(personActions.setToken(response.access))
            navigate('account')
          }
        })
        .catch(() => {
          writeInform(informs.SignIn.err[lang], false)
        })
        .finally(() => {
          setLoading(false)
          setClick(false)
          setUser(defaultUser)
          setShowModal()
          setEye(false)
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

  const handleEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div
      className={styles.modal}
      style={{
        top: showModal ? 80 : -800,
      }}
      onKeyDown={handleEnterKeyPress}
    >
      <Close onClick={setShowModal} />
      <p>{translateContent('EMAIL ADDRESS', 'Емейл', lang)}</p>
      <input
        type="email"
        className={clik && error.email ? 'danger' : ''}
        placeholder="Name@domain.com"
        value={user.email}
        onChange={(e) => handleOnChangeEmail(e.target.value)}
      />
      <p>{translateContent('PASSWORD', 'Пароль', lang)}</p>
      <div className={styles.inputBlock}>
        <input
          className={clik && error.password ? 'danger' : ''}
          type={eye ? 'text' : 'password'}
          placeholder={translateContent(
            'Enter your password',
            'Введіть пароль',
            lang
          )}
          value={user.password}
          onChange={(e) => handleOnChangePassword(e.target.value)}
        />
        <button
          className={styles.eyeButton}
          onClick={() => setEye(!eye)}
          style={{
            opacity: eye ? 1 : 0.6,
          }}
        >
          <img src="images/eye.png" alt="eye" width={20} />
        </button>
      </div>

      {!signIn && (
        <>
          <p>
            {translateContent('REPEAT PASSWORD', 'Продублюйте пароль', lang)}
          </p>

          <input
            className={clik && error.repeatedPassword ? 'danger' : ''}
            type={eye ? 'text' : 'password'}
            placeholder={translateContent(
              'Repeat your password',
              'Продублюйте пароль',
              lang
            )}
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
            ? translateContent('SIGN IN', 'Увійти', lang)
            : translateContent('QUICK SIGN UP', 'Швидка реєстрація', lang)
        }
      />
      <button className={styles.quick} onClick={() => setSignIn(!signIn)}>
        {signIn
          ? translateContent('QUICK SIGN UP', 'Швидка реєстрація', lang)
          : translateContent('SIGN IN', 'Увійти', lang)}
      </button>
    </div>
  )
}
