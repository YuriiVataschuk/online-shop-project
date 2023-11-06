import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './404.module.scss'
import { useAppSelector } from '../../app/hooks'
import { Helmet } from 'react-helmet-async'

export const PageNotFound = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(5)
  const path = useLocation().pathname
  const index = path.lastIndexOf('/') + 1
  const prevPath = path.slice(0, index)
  const pageUnderDevelopment = ['orders', 'return', 'service']
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  const currentPage = pageUnderDevelopment.find((item) => path.includes(item))

  useEffect(() => {
    let id
    if (count > 0.2) {
      id = setTimeout(() => setCount(count - 0.02), 20)
    } else {
      clearTimeout(id)
      navigate(prevPath)
    }
  }, [count])
  return (
    <main className={styles.page}>
      <Helmet>
        <title>
          {currentPage
            ? isEng
              ? 'UNDER DEVELOPMENT'
              : 'В РОЗРОБЦІ'
            : isEng
            ? 'NOT FOUND'
            : 'НЕ ЗНАЙДЕНО'}
        </title>
      </Helmet>
      <h1>
        {currentPage
          ? isEng
            ? 'The page is under development'
            : 'Сторінка в розробці'
          : isEng
          ? 'There is no such stand in our store.'
          : ' Такої стоінки не існує'}
      </h1>

      <h4>
        {isEng
          ? 'Go to the front page page in '
          : 'Перехід на попередню сторінку через '}{' '}
        <span>{Math.floor(count)}</span> {isEng ? 'sec' : 'сек'}
      </h4>
      <div
        style={{
          width: 20 * count + '%',
        }}
      ></div>
    </main>
  )
}
