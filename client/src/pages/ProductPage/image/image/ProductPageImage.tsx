import { Baner } from '../../../../components/baner/Baner'
import styles from './product-image.module.scss'
const images = [
  '1.png',
  '2.1.png',
  '2.1.png',
  // 'images/shirts/white.png',
]

export const ProductPageImage = () => {
  return (
    <div className={styles.image}>
      <Baner images={images} place="product" />
    </div>
  )
}
