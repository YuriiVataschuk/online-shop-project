/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'

/* eslint-disable react/prop-types */
type Props = {
  sizes: string[]
  size: string
  setSize: (size: string) => void
}

export const SizeList: React.FC<Props> = ({ sizes, size, setSize }) => {
  return (
    <div className="size">
      <ul className="size__list">
        {sizes.map((item) => (
          <li
            className={classNames('size__item ', {
              'size__item--is-active': item === size,
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
