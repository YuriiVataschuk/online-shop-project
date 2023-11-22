import { Link } from 'react-router-dom'
import styles from './nav.module.scss'
import { DropdownItem } from './dropdown/Dropdown'

type NavItem = {
  path: string
  name: string
}

type Props = {
  showNav?: boolean
  items: NavItem[]
  className?: string
}

export const Nav: React.FC<Props> = ({
  showNav,
  items = [],
  className = '',
}) => {
  return (
    <nav>
      <ul
        className={`${styles.list} ${
          className === 'header' ? styles.listHeader : styles.listFooter
        }`}
        style={{
          top: showNav ? 0 : '-1000px',
        }}
      >
        {items.map((item) => (
          <>
            <li key={item.name + new Date()}>
              <Link
                to={item.path}
                className={styles.item}
                target={item.name === 'github' ? '_blank' : '_self'}
              >
                {item.name}
              </Link>
            </li>
          </>
        ))}
        <li> {className === 'header' && <DropdownItem />}</li>
      </ul>
    </nav>
  )
}
