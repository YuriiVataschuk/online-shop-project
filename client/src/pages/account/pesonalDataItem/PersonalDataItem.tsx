import { useEffect, useState } from 'react'
import { Person } from '../../../utils/types'
import { useAppSelector } from '../../../app/hooks'
import styles from './personal-data-item.module.scss'
import classNames from 'classnames'

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
  const [gender, setGender] = useState<string>('')

  useEffect(() => {
    if (person) {
      setGender(person[item])
    }
  }, [person])

  return (
    <li className={styles.item}>
      <p>{isEng ? item : translator[item]}</p>
      {change ? (
        item === 'gender' ? (
          <>
            <div className={styles.genderList}>
              <button
                className={classNames(styles.genderItem, {
                  [styles.active]: gender === 'Female',
                })}
                onClick={() => {
                  setPerson('Female')
                  setGender('Female')
                }}
              >
                Female
              </button>
              <button
                className={classNames(styles.genderItem, {
                  [styles.active]: gender === 'Male',
                })}
                onClick={() => {
                  setGender('Male')
                  setPerson('Male')
                }}
              >
                Male
              </button>
            </div>
          </>
        ) : (
          <input
            type="text"
            defaultValue={person ? person[item] : ''}
            placeholder={
              isEng ? 'enter your ' + item : 'введіть ' + translator[item]
            }
            onChange={(e) => setPerson(e.target.value)}
          />
        )
      ) : (
        <div>{person ? (item === 'gender' ? gender : person[item]) : ''}</div>
      )}
    </li>
  )
}
