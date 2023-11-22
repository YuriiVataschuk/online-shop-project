import { useEffect, useState } from 'react'
import { Logo } from '../Logo'
import { TopActions } from '../top-actions/TopActions'
import { Nav } from '../nav/Nav'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import styles from './header.module.scss'
import { translateContent } from '../../utils/translate'

export const Header = () => {
  const lang = useAppSelector((state) => state.global)
  const navItems = [
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
  const path = useLocation().pathname
  const [showNav, setShowNav] = useState(false)
  const { showCart } = useAppSelector((state) => state.cart)
  const [params] = useSearchParams()
  const page = params.get('page')

  useEffect(() => {
    setShowNav(false)
  }, [path])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement

      if (target.className.includes('Nav') || target.className.includes('drop'))
        return

      setShowNav(false)
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    if (showNav || showCart) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [showNav, path, showCart])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path, page])

  return (
    <header
      className={styles.header}
      style={{
        position: path === '/' ? 'absolute' : 'static',
        backgroundColor: path === '/' ? 'transparent' : 'black',
      }}
    >
      <div className={styles.logo}>
        <TopActions setSowNav={() => setShowNav(!showNav)} showNav={showNav} />
        <Logo place="header" />
      </div>
      <Nav showNav={showNav} items={navItems} className="header" />
    </header>
  )
}
