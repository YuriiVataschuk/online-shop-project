import { Baner } from '../../../../components/baner/Baner'
import styles from './product-image.module.scss'
type Props = {
  image: string
}
export const ProductPageImage: React.FC<Props> = ({ image }) => {
  const images = [image, image, image]
  return (
    <div className={styles.image}>
      <Baner images={images} place="product" />
    </div>
  )
}
