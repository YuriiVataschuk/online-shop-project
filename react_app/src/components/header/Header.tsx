import React, { useEffect, useState } from 'react'
import { Logo } from '../Logo'
import { TopActions } from '../top-actions/TopActions'
import { Nav } from '../nav/Nav'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import styles from './header.module.scss'

export const Header = () => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  const navItems = [
    { path: '/', name: isEng ? 'HOME' : 'ГОЛОВНА' },
    { path: 'shirts', name: isEng ? 'SHIRTS' : 'ФУТБОЛКИ' },
    { path: 'sweatshirts', name: isEng ? 'SWEATSHIRTS' : 'СВІТШОТИ' },
    { path: 'hoodies', name: isEng ? 'HOODIES' : 'ХУДДІ' },
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
    const Id = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement

      if (target.className.includes('Nav')) return

      setShowNav(false)
    }

    document.addEventListener('click', Id)

    return () => document.removeEventListener('click', Id)
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
