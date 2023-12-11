import { Loader } from '../loader/Loader'
import styles from './button.module.scss'

type Props = {
  content?: string
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
}

export const Button: React.FC<Props> = ({
  content = 'Checkout',
  onClick,
  loading = false,
  disabled,
}) => {
  return (
    <button
      className={disabled ? styles.button + ' disabled' : styles.button}
      style={{
        pointerEvents: loading ? 'none' : 'auto',
      }}
      onClick={onClick}
    >
      {loading ? <Loader /> : content}
    </button>
  )
}
