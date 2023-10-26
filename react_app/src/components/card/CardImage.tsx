import { Button } from '../Button'

export const CardImage = () => {
  return (
    <div className="card__image">
      <img src="images/test.webp" width="100%" alt="" />
      <div className="card__button">
        <Button content="READ MORE" />
      </div>
    </div>
  )
}
