/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'
import { CardImage } from './CardImage'

type Props = {
  item: any
}

export const Card: React.FC<Props> = ({ item }) => {
  const path = useLocation().pathname
  return (
    <Link to={path + '/' + item.id} className="card">
      <div className="card__price">
        <h1 className="card__price--content">{item.price} UA</h1>
      </div>
      <CardImage />
    </Link>
  )
}
