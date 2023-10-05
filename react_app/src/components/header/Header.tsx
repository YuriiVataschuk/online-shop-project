// import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react'
import { Logo } from '../Logo'
import { TopActions } from '../TopActions'
import { Nav } from '../nav/Nav'
import { useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', name: 'home' },
  { path: 'shirts', name: 'SHIRTS' },
  { path: 'sweatshirts', name: 'SWEATSHIRTS' },
  { path: 'sweatshirts', name: 'SWEATSHIRTS' },
  { path: 'hoodies', name: 'HOODIES' },
  { path: 'hoodies', name: 'HOODIES' },
]

export const Header = () => {
  const path = useLocation().pathname
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    setShowNav(false)
  }, [path])

  useEffect(() => {
    const Id = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement
      console.log(target.className)
      if (target.className.includes('nav')) return

      setShowNav(false)
    }

    document.addEventListener('click', Id)

    return () => document.removeEventListener('click', Id)
  }, [])

  useEffect(() => {
    const Id = () => window.scrollTo(0, 0)

    if (showNav || path.includes('cart')) {
      window.addEventListener('scroll', Id)
    }

    return () => removeEventListener('scroll', Id)
  }, [showNav, path])

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
      <Nav showNav={showNav} items={navItems} />
    </header>
  )
}
