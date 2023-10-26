import { User } from '../types'

export const signUpFetch = (user: User) => {
  return fetch('http://127.0.0.1:8000/user/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then((r) => r.json())
}
