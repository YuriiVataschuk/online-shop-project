/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import styles from './sizes-list.module.scss'

/* eslint-disable react/prop-types */
type Props = {
  sizes: string[]
  size: string
  setSize: (size: string) => void
}

export const SizeList: React.FC<Props> = ({ sizes, size, setSize }) => {
  return (
    <div>
      <ul className={styles.list}>
        {sizes.map((item) => (
          <li
            className={classNames(styles.item, {
              [styles.isActive]: item === size,
            })}
            key={item}
            onClick={() => setSize(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
