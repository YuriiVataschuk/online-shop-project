import { Button } from '../button/Button'
import styles from './card.module.scss'
import { useAppSelector } from '../../app/hooks'

type Props = {
  photo: string
}

export const CardImage: React.FC<Props> = ({ photo }) => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  return (
    <div className={styles.image}>
      <img src={photo} width="100%" alt="product img" />
      <div className={styles.button}>
        <Button content={isEng ? 'READ MORE' : 'Дізнатись більше '} />
      </div>
    </div>
  )
}
