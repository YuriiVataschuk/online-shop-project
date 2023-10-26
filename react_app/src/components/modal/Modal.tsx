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

import { useEffect, useState } from 'react'
import * as personActions from '../../features/personSelector'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'

type Props = {
  showModal: boolean
  setShowModal: () => void
}
type DefaultUser = {
  email: string
  password: string
  repeatedPassword: string
}

const defaultUser: DefaultUser = {
  email: '',
  password: '',
  repeatedPassword: '',
}
const defaultError = {
  email: false,
  password: false,
  repeatedPassword: false,
}

const def = {
  name: 'Leonid',
  surname: 'Bondarchuk',
  email: '',
  phone: '',
  country: '',
  city: '',
  postcode: '',
  house: '',
  active: true,
}
export const Modal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const [user, setUser] = useState(defaultUser)
  const [error, setError] = useState(defaultError)
  const [clik, setClick] = useState(false)
  const [signIn, setSignIn] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    if (!error.password && !error.email) {
      setClick(false)
      dispatch(personActions.addPerson(def))
      setUser(defaultUser)
      setShowModal()
      navigate('/account')
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

      <button className="account-modal__sign-in" onClick={handleSubmit}>
        {signIn ? 'SIGN IN' : 'QUICK SIGN UP'}
      </button>
      <button
        className="account-modal__quick"
        onClick={() => setSignIn(!signIn)}
      >
        {signIn ? 'QUICK SIGN UP' : 'SIGN IN'}
      </button>
    </div>
  )
}
