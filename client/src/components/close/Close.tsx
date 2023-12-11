/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from './close.module.scss'
type Props = {
  onClick: () => void
}
export const Close: React.FC<Props> = ({ onClick }) => {
  return (
    <img
      className={styles.close}
      src="images/close.png"
      width="30"
      alt="close icon"
      onClick={onClick}
    />
  )
}
