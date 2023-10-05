import { Link } from 'react-router-dom'
import { Button } from '../Button'

export const Card = () => {
  return (
    <Link to="/" className="card">
      <div className="card__price">
        <h1 className="card__price--content">2344 UA</h1>
      </div>

      <div className="card__image">
        <img src="images/test.webp" width="100%" alt="" />
        <div className="card__button">
          <Button content="READ MORE" />
        </div>
      </div>
    </Link>
  )
}
