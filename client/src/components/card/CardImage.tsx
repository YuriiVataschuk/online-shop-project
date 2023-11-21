import { Button } from '../button/Button'
import styles from './card.module.scss'

type Props = {
  photo: string
}

export const CardImage: React.FC<Props> = ({ photo }) => {
  console.log(photo)
  return (
    <div className={styles.image}>
      <img src={photo} width="100%" alt="product img" />
      <div className={styles.button}>
        <Button content="READ MORE" />
      </div>
    </div>
  )
}
