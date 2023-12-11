import { useAppSelector } from '../../app/hooks'
import { translateContent } from '../../utils/translate'
import { Logo } from '../Logo'
import { Nav } from '../nav/Nav'
import { FooterSocialMedia } from './FooterSocialMedia'
import styles from './footer.module.scss'

export const Footer = () => {
  const lang = useAppSelector((state) => state.global)

  const navItemsHeader = [
    { path: '/', name: translateContent('HOME', 'ГОЛОВНА', lang) },
    { path: 'shirts', name: translateContent('SHIRTS', 'ФУТБОЛКИ', lang) },
    {
      path: 'sweatshirts',
      name: translateContent('SWEATSHIRTS', 'СВІТШОТИ', lang),
    },
    { path: 'hoodies', name: translateContent('HOODIES', 'ХУДДІ', lang) },
    { path: 'bags', name: translateContent('BAGS', 'СУМКИ', lang) },
    { path: 'pants', name: translateContent('PANTS', 'ШТАНИ', lang) },
  ]

  const navItems = [
    {
      path: 'https://github.com/YuriiVataschuk/online-shop-project',
      name: translateContent('github', 'Гітхаб', lang),
    },
    {
      path: 'return',
      name: translateContent('return of goods', 'Повернення товару', lang),
    },
    {
      path: 'service',
      name: translateContent('service department', 'сервісний відділ', lang),
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
