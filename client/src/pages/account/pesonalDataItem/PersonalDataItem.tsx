import { useEffect, useState } from 'react'
import { Person } from '../../../utils/types'
import { useAppSelector } from '../../../app/hooks'
import styles from './personal-data-item.module.scss'

type Translate = {
  [key: string]: string
}
const translator: Translate = {
  name: 'імя',
  surname: 'прізвище',
  email: 'емейл',
  phone: 'телефон',
  country: 'країна',
  city: 'місто',
  postcode: 'поштовий індекс',
  house: 'будинок',
  gender: 'стать',
}
type Props = {
  item: string
  change: boolean
  person: Person | null
  setPerson: (value: string) => void
}

export const PersonalDataItem: React.FC<Props> = ({
  item,
  change,
  person,
  setPerson,
}) => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  return (
    <li className={styles.item}>
      <p>{isEng ? item : translator[item]}</p>
      {change ? (
        <input
          type="text"
          defaultValue={person ? person[item] : ''}
          placeholder={
            isEng ? 'enter your ' + item : 'введіть ' + translator[item]
          }
          onChange={(e) => setPerson(e.target.value)}
        />
      ) : (
        <div>{person ? person[item] : ''}</div>
      )}
    </li>
  )
}
