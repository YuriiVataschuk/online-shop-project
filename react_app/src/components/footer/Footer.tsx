import { useAppSelector } from '../../app/hooks'
import { Logo } from '../Logo'
import { Nav } from '../nav/Nav'
import { FooterSocialMedia } from './FooterSocialMedia'
import styles from './footer.module.scss'

export const Footer = () => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  const navItemsHeader = [
    { path: '/', name: isEng ? 'HOME' : 'ГОЛОВНА' },
    { path: 'shirts', name: isEng ? 'SHIRTS' : 'ФУТБОЛКИ' },
    { path: 'sweatshirts', name: isEng ? 'SWEATSHIRTS' : 'СВІТШОТИ' },
    { path: 'hoodies', name: isEng ? 'HOODIES' : 'ХУДДІ' },
  ]

  const navItems = [
    {
      path: 'https://github.com/YuriiVataschuk/online-shop-project',
      name: isEng ? 'github' : 'Гітхаб',
    },
    { path: 'return', name: isEng ? 'return of goods' : 'Повернення товару' },
    {
      path: 'service',
      name: isEng ? 'service department' : 'сервісний відділ',
    },
  ]
  return (
    <footer className={styles.footer}>
      <Nav items={navItemsHeader} className="footer" />
      <FooterSocialMedia />
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.nav}>
        <Nav items={navItems} />
      </div>
    </footer>
  )
}
