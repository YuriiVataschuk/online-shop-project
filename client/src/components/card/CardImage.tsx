import { Button } from '../button/Button'
import styles from './card.module.scss'

type Props = {
  path: string
}

export const CardImage: React.FC<Props> = ({ path }) => {
  return (
    <div className={styles.image}>
      <img src={`images/shirts/white.png`} width="100%" alt="product img" />
      <div className={styles.button}>
        <Button content="READ MORE" />
      </div>
    </div>
  )
}
