/* eslint-disable react/prop-types */
type Props = {
  place?: 'header' | 'footer'
}

export const Logo: React.FC<Props> = ({ place = 'footer' }) => {
  return (
    <div className="logo">
      <h1
        style={{
          color: place === 'header' ? 'black' : '#fff',
        }}
      >
        LOGO
      </h1>
    </div>
  )
}
