import { Logo } from '../Logo'
import { Nav } from '../nav/Nav'
import { FooterSocialMedia } from './FooterSocialMedia'

const navItems = [
  {
    path: 'https://github.com/YuriiVataschuk/online-shop-project',
    name: 'github',
  },
  { path: 'return', name: 'return of goods' },
  { path: 'service', name: 'service department' },
]

const navItemsHeader = [
  { path: '/', name: 'home' },
  { path: 'shirts', name: 'SHIRTS' },
  { path: 'sweatshirts', name: 'SWEATSHIRTS' },
  { path: 'sweatshirts', name: 'SWEATSHIRTS' },
  { path: 'hoodies', name: 'HOODIES' },
  { path: 'hoodies', name: 'HOODIES' },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <Nav items={navItemsHeader} className="nav__list--mobile-footer" />
      <FooterSocialMedia />
      <div className="footer__logo">
        <Logo />
      </div>

      <div className="footer__nav">
        <Nav items={navItems} />
      </div>
    </footer>
  )
}
