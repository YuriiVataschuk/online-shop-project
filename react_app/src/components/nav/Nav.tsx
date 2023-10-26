/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

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
    <nav className="nav">
      <ul
        className={`nav__list ${className}`}
        style={{
          top: showNav ? 0 : '-1000px',
        }}
      >
        {items.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="nav__item"
              target={item.name === 'github' ? '_blank' : '_self'}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
