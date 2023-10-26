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
import { useAppDispatch } from '../../app/hooks'
import { signInFetch } from '../../utils/fetch/signIn'
import { signUpFetch } from '../../utils/fetch/signUp'
import { User } from '../../utils/types'
import { Loader } from '../loader/Loader'
import { Button } from '../Button'

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
  const [errorMessage, setErrorMessage] = useState('')

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

    if (!error.password && !error.email && !error.repeatedPassword) {
      signUpFetch(user).catch((e) => setErrorMessage(e))
    }
    if (!error.password && !error.email && signIn) {
      setLoading(true)
      signInFetch(user)
        .then((r) => {
          dispatch(personActions.setToken(r.access))
          navigate('account')
        })
        .finally(() => setLoading(false))
    }

    setClick(false)
    setUser(defaultUser)
    setShowModal()
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

  return (
    <div
      className="account-modal"
      style={{
        top: showModal ? 80 : -800,
      }}
    >
      <img src="images/close.png" width="30" alt="" onClick={setShowModal} />
      <p>EMAIL ADDRESS</p>
      <input
        type="email"
        className={clik && error.email ? 'danger' : ''}
        placeholder="Name@domain.com"
        value={user.email}
        onChange={(e) => handleOnChangeEmail(e.target.value)}
      />
      <p>PASSWORD</p>
      <input
        className={clik && error.password ? 'danger' : ''}
        type="password"
        placeholder="Enter your password"
        value={user.password}
        onChange={(e) => handleOnChangePassword(e.target.value)}
      />

      {!signIn && (
        <>
          <p>REPEAT PASSWORD</p>
          <input
            className={clik && error.repeatedPassword ? 'danger' : ''}
            type="password"
            placeholder="Repeat your password"
            value={user.repeatedPassword}
            onChange={(e) => handleOnChangeRepeatePassword(e.target.value)}
          />
        </>
      )}

      <Button
        loading={loading}
        onChange={handleSubmit}
        content={signIn ? 'SIGN IN' : 'QUICK SIGN UP'}
      />
      <p>{errorMessage}</p>
      <button
        className="account-modal__quick"
        onClick={() => setSignIn(!signIn)}
      >
        {signIn ? 'QUICK SIGN UP' : 'SIGN IN'}
      </button>
    </div>
  )
}
