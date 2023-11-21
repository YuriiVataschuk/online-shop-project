/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import { PersonalDataItem } from '../pesonalDataItem/PersonalDataItem'
import { Button } from '../../../components/button/Button'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { FETCH } from '../../../utils/fetch/fetch'
import * as informActions from '../../../features/informSelector'
import * as personActions from '../../../features/personSelector'
import styles from './personal-data.module.scss'

type Props = {
  items: string[]
  type?: string
}

export const PersonalData: React.FC<Props> = ({ items, type }) => {
  const [change, setChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token, person } = useAppSelector((state) => state.person)
  const [copyPerson, setCopyPerson] = useState(person ? { ...person } : null)
  const dispatch = useAppDispatch()

  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  const handleSbmit = () => {
    if (copyPerson) {
      setLoading(true)
      FETCH('PATCH', 'user/me/', copyPerson, token)
        .then((r) => {
          dispatch(personActions.setPersonData(r))
          setChange(!change)
        })
        .catch(() =>
          dispatch(
            informActions.addInform({
              type: false,
              content: isEng ? 'something went wrong' : 'щось пішло не так',
              id: 1,
            })
          )
        )
        .finally(() => setLoading(false))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSbmit()
    }
  }

  useEffect(() => {
    if (person) setCopyPerson(person)
  }, [person])

  return (
    <div className={styles.data} onKeyDown={handleKeyDown}>
      <h3>
        {type}
        {!change && (
          <button onClick={() => setChange(!change)}>
            {isEng ? 'change' : 'змінити'}
          </button>
        )}
      </h3>
      <ul>
        {items.map((item) => (
          <PersonalDataItem
            item={item}
            key={item}
            change={change}
            person={copyPerson}
            setPerson={(value: string) => {
              if (person && copyPerson) {
                setCopyPerson({ ...copyPerson, [item]: value })
              }
            }}
          />
        ))}
      </ul>
      {change && (
        <Button
          content={isEng ? 'APPLY CHANGES' : 'Змінити'}
          onClick={handleSbmit}
          loading={loading}
        />
      )}
    </div>
  )
}
