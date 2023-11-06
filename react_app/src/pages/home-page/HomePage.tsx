import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '../../app/hooks'
import { Baner } from '../../components/baner/Baner'
import styles from './home-page.module.scss'
const images = [
  'images/banner1.jpg',
  'images/banner2.jpg',
  'images/banner3.jpg',
]

export const HomePage = () => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  return (
    <div className={styles.page}>
      <Helmet>
        <title>{isEng ? 'Online Shop' : 'Онлайн Магазин| '}</title>
      </Helmet>
      <Baner images={images} />
      <h1>
        {isEng
          ? 'Where fashion and comfort find a common language'
          : 'Де мода і комфорт знаходять спільну мову'}
      </h1>
    </div>
  )
}
