/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { PersonalDataItem } from './PersonalDataItem'
import { Button } from '../../components/button/Button'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeUserAccount } from '../../utils/fetch/fetch'
import * as informActions from './../../features/informSelector'
import * as personActions from '../../features/personSelector'

type Props = {
  items: string[]
  type?: string
}


export const PersonalData: React.FC<Props> = ({ items, type }) => {
  const [change, setChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token, person } = useAppSelector((state) => state.person)
  const [copyPerson, setCopyPerson] = useState(person)
  const dispatch = useAppDispatch()

  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  const handleSbmit = () => {
    if (copyPerson) {
      setLoading(true)
      changeUserAccount(token, copyPerson)
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

  useEffect(() => {
    if (person) setCopyPerson(person)
  }, [person])
  return (
    <div className="account__personal-data">
      <h3 className="account__personal-data--title">
        {type}
        {!change && (
          <button onClick={() => setChange(!change)}>
            {isEng ? 'change' : 'змінити'}
          </button>
        )}
      </h3>
      <ul className="account__personal-data--list">
        {items.map((item) => (
          <PersonalDataItem
            item={item}
            key={item}
            change={change}
            person={copyPerson}
            setPerson={(value: string) => {
              if (person) setCopyPerson({ ...person, [item]: value })
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
