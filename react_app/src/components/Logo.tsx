import { Link, useLocation } from 'react-router-dom'

/* eslint-disable react/prop-types */
type Props = {
  place?: 'header' | 'footer'
}

export const Logo: React.FC<Props> = () => {
  const path = useLocation().pathname
  return (
    <Link to="/" className="logo">
      <h1
        style={{
          color: path === '/' ? 'black' : '#fff',
        }}
      >
        LOGO
      </h1>
    </Link>
  )
}
