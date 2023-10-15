import Carousel from 'react-bootstrap/Carousel'

export const Baner = () => {
  return (
    <div className="baner">
      <Carousel>
        <Carousel.Item
          interval={5000}
          style={{ height: '100vh', width: '100%' }}
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
          interval={5000}
          style={{ height: '100vh', width: '100%' }}
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
          interval={5000}
          style={{ height: '100vh', width: '100%' }}
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
