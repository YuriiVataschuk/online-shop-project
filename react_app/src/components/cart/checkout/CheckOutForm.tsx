import React from 'react'
import styles from './cart.checkout.module.scss'
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

export const CheckOutForm: React.FC<Props> = ({
  checkout = true,
  name,
  setName,
  number,
  setNumber,
  errors,
  submited,
}) => {
  console.log(checkout, errors, 'o')
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
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
        placeholder={isEng ? 'Name' : "Ім'я"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={submited && (!name || Number(name[0])) ? 'danger' : ''}
      />
      <input
        type="text"
        className={submited && errors ? `danger` : ''}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder={isEng ? 'Phone' : 'Телефон'}
      />
    </div>
  )
}
