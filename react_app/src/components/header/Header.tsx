import { useEffect, useState } from 'react'
import { Logo } from '../Logo'
import { TopActions } from '../TopActions'
import { Nav } from '../nav/Nav'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const navItems = [
  { path: '/', name: 'home' },
  { path: 'shirts', name: 'SHIRTS' },
  { path: 'sweatshirts', name: 'SWEATSHIRTS' },
  { path: 'hoodies', name: 'HOODIES' },
]

export const Header = () => {
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

      if (target.className.includes('nav')) return

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
      className="header"
      style={{
        position: path === '/' ? 'absolute' : 'static',
        backgroundColor: path === '/' ? 'transparent' : 'black',
      }}
    >
      <div className="header__logo">
        <TopActions setSowNav={() => setShowNav(!showNav)} showNav={showNav} />
        <Logo place="header" />
      </div>
      <Nav
        showNav={showNav}
        items={navItems}
        className="nav__list--mobile-header"
      />
    </header>
  )
}
