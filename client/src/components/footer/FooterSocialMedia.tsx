import { Link } from 'react-router-dom'
import styles from './footer.module.scss'

export const FooterSocialMedia = () => {
  return (
    <div className={styles.socialMedia}>
      <Link to="https://www.instagram.com/andrii.hudyma/" target="_blank">
        <img src="images/inst.svg" alt="instagram" />
      </Link>
      <Link to="https://t.me/andriihudyma " target="_blank">
        <img src="images/tg.svg" alt="telegram" />
      </Link>
      <Link
        to="https://www.facebook.com/profile.php?id=100008852254278"
        target="_blank"
      >
        <img src="images/fb.svg" alt="facebook" />
      </Link>
    </div>
  )
}
