import { Link, useLocation } from 'react-router-dom'
import { CardImage } from './CardImage'
import styles from './card.module.scss'
import { useAppSelector } from '../../app/hooks'

type Props = {
  item: any
  place: string
}

export const Card: React.FC<Props> = ({ item, place }) => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  const path = useLocation().pathname
  return (
    <Link to={path + '/' + item.id} className={styles.card}>
      <div className={styles.price}>
        <h1>
          {item.price} {isEng ? 'UAH' : 'ГРН'}
        </h1>
      </div>
      <CardImage path={place} />
    </Link>
  )
}
