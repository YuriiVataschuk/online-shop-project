import Carousel from 'react-bootstrap/Carousel'
import styles from './banner.module.scss'

type Props = {
  images: string[]
  place?: string
}

export const Baner: React.FC<Props> = ({ images, place = 'home-page' }) => {
  return (
    <div
      className={`${styles.baner}  ${
        place === 'product' ? styles.bannerProduct : ''
      }`}
    >
      <Carousel>
        {images.map((item) => (
          <Carousel.Item
            interval={5000}
            key={item}
            style={{
              height: '100%',
              minHeight: 500,
              width: '100%',
            }}
          >
            <img
              src={item}
              alt="baner item"
              width={'100%'}
              height={'100%'}
              style={{
                objectFit: 'cover',
                minWidth: 300,
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
