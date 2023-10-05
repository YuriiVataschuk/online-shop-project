/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

type NavItem = {
  path: string
  name: string
}

type Props = {
  showNav?: boolean
  items: NavItem[]
}

export const Nav: React.FC<Props> = ({ showNav, items = [] }) => {
  return (
    <nav className="nav">
      <ul
        className="nav__list"
        style={{
          right: showNav ? 0 : '-500px',
        }}
      >
        {items.map((item) => (
          <li key={item.name}>
            <Link to={item.path} className="nav__item">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
