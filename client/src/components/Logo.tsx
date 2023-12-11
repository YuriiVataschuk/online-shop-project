import { Link } from 'react-router-dom'

type Props = {
  place?: 'header' | 'footer'
}

export const Logo: React.FC<Props> = () => {
  return (
    <Link to="/" className="logo">
      <h1
        style={{
          color: '#fff',
        }}
      >
        LOGO
      </h1>
    </Link>
  )
}
