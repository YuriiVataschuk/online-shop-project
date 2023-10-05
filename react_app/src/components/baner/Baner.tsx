// import { Image } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'

export const Baner = () => {
  return (
    <div className="baner">
      <Carousel>
        <Carousel.Item
          interval={1000}
          style={{ height: '100vh', width: '100vw' }}
        >
          <img
            src="images/baner-1.jpeg"
            alt="baner item"
            width={'100%'}
            height={'100%'}
            style={{
              objectFit: 'cover',
            }}
          />
        </Carousel.Item>
        <Carousel.Item
          interval={1000}
          style={{ height: '100vh', width: '100vw' }}
        >
          <img
            src="images/baner-1.jpeg"
            alt="baner item"
            width={'100%'}
            height={'100%'}
            style={{
              objectFit: 'cover',
            }}
          />
        </Carousel.Item>
        <Carousel.Item
          interval={1000}
          style={{ height: '100vh', width: '100vw' }}
        >
          <img
            src="images/baner-1.jpeg"
            alt="baner item"
            width={'100%'}
            height={'100%'}
            style={{
              objectFit: 'cover',
            }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
