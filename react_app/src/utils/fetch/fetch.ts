import { User } from '../types'
import { Person } from '../types'

export const signFetch = async (user: User, action: string) => {
  const r = await fetch(
    `http://127.0.0.1:8000/user/${
      action === 'signUp' ? 'register/' : 'token/'
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    }
  )
  return await r.json()
}

export const changeUserAccount = async (
  token: string,
  changedPerson: Person
) => {
  const requestBody = JSON.stringify(changedPerson)
  const url = 'http://127.0.0.1:8000/user/me/'
  const r = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: requestBody,
  })
  return await r.json()
}
