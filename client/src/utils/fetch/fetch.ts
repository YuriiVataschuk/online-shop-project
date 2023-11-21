export const FETCH = async (
  method: string,
  path: string,
  body: any,
  token?: string
) => {
  const headers: { 'Content-Type': string; Authorization?: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const r = await fetch('http://127.0.0.1:8000/' + path, {
    method: method,
    headers,
    body: JSON.stringify(body),
  })
  return await r.json()
}
