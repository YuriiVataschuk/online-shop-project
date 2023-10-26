import { Link } from 'react-router-dom'

export const FooterSocialMedia = () => {
  return (
    <div className="footer__social-media">
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
