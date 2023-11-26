import styles from './cart.checkout.module.scss'
import { translateContent } from '../../../utils/translate'
import { useAppSelector } from '../../../app/hooks'

type Props = {
  checkout?: boolean
  setName: (val: string) => void
  setNumber: (val: string) => void
  name: string
  number: string
  errors: boolean
  submited: boolean
}
const regexpName = /^[a-zA-Z]+$/

export const CheckOutForm: React.FC<Props> = ({
  checkout = true,
  name,
  setName,
  number,
  setNumber,
  errors,
  submited,
}) => {
  const lang = useAppSelector((state) => state.global)

  return (
    <div
      className={styles.checkout}
      style={{
        height: checkout ? 'fit-content' : 0,
        marginBottom: checkout ? 40 : 0,
      }}
    >
      <input
        type="text"
        placeholder={translateContent('Name', "Ім'я", lang)}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={
          submited && (!regexpName.test(name.trim()) || Number(name[0]))
            ? 'danger input'
            : 'input'
        }
      />
      <input
        type="text"
        className={submited && errors ? `danger input` : 'input'}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder={translateContent('Phone', 'Телефон', lang)}
      />
    </div>
  )
}
