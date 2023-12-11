import React from 'react'
import styles from './products.title.module.scss'
import { useAppSelector } from '../../../app/hooks'
import { Helmet } from 'react-helmet'

type Props = {
  path: string
  loading: boolean
}
type Translate = {
  [key: string]: string
}

const translate: Translate = {
  shirt: 'ФУТБОЛКИ',
  hoodie: 'ХУДІ',
  sweatshirt: 'СВІТШОТИ',
  bag: 'СУМКИ',
  pant: 'ШТАНИ',
}

export const getTitle = (path: string) => {
  const sliceHomePage = path.slice(1)
  const index = sliceHomePage.indexOf('?')
  return sliceHomePage.slice(0, index)
}

export const ProductsPageTitle: React.FC<Props> = ({ path, loading }) => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  const title = isEng
    ? (getTitle(path) + 's').toUpperCase()
    : translate[getTitle(path)]

  return (
    <h1
      className={styles.title}
      style={{
        color: !loading ? 'transparent' : 'black',
      }}
    >
      <Helmet>
        <title>{`${
          isEng ? 'Online Shop | ' : 'Онлайн Магазин | '
        } ${title}`}</title>
      </Helmet>
      {title}
    </h1>
  )
}
