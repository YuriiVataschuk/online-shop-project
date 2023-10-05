import { Link } from 'react-router-dom'
import { Logo } from '../Logo'
import { Nav } from '../nav/Nav'

const navItems = [
  { path: '/', name: 'githab' },
  { path: 'about', name: 'about' },
  { path: 'contacts', name: 'contacts' },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__social-media">
        <Link to="/">
          <img src="images/inst.svg" alt="instagram" />
        </Link>
        <Link to="/">
          <img src="images/tg.svg" alt="instagram" />
        </Link>
        <Link to="/">
          <img src="images/fb.svg" alt="instagram" />
        </Link>
      </div>
      <Logo />
      <Nav items={navItems} />
    </footer>
  )
}
