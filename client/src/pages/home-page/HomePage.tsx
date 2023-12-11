import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '../../app/hooks'
import { Baner } from '../../components/baner/Baner'
import styles from './home-page.module.scss'
import { translateContent } from '../../utils/translate'

const images = [
  'images/banner1.jpg',
  'images/banner2.jpg',
  'images/banner1.jpg',
]

export const HomePage = () => {
  const lang = useAppSelector((state) => state.global)

  return (
    <div className={styles.page}>
      <Helmet>
        <title>{translateContent('Online Shop', 'Онлайн Магазин', lang)}</title>
      </Helmet>
      <Baner images={images} />
      <h1>
        {translateContent(
          'Where fashion and comfort find a common language',
          'Де мода і комфорт знаходять спільну мову',
          lang
        )}
      </h1>
    </div>
  )
}
