import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(6)
  const path = useLocation().pathname
  const index = path.lastIndexOf('/') + 1
  const prevPath = path.slice(0, index)
  const pageUnderDevelopment = ['orders', 'return', 'service']

  const currentPage = pageUnderDevelopment.find((item) => path.includes(item))

  useEffect(() => {
    let id
    if (count > 0.2) {
      id = setTimeout(() => setCount(count - 0.2), 200)
    } else {
      clearTimeout(id)
      navigate(prevPath)
    }
  }, [count])
  return (
    <main className="page-not-found">
      <h1 className="page-not-found__title">
        {currentPage
          ? 'The page is under development'
          : 'There is no such stand in our store.'}
      </h1>

      <h4 className="page-not-found__subtitle">
        Go to the front page page in <span>{Math.floor(count)}</span> sec
      </h4>
      <div
        className="page-not-found__line"
        style={{
          width: 20 * count + '%',
        }}
      ></div>
    </main>
  )
}
