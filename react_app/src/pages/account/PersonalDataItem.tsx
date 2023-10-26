import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import * as personActions from '../../features/personSelector'

type Props = {
  item: string
  change: boolean
}

export const PersonalDataItem: React.FC<Props> = ({ item, change }) => {
  const data = useAppSelector((state) => state.person)

  const [fieldValue, setFieldValue] = useState(data[item])
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(personActions.setPersonData({ field: item, value: fieldValue }))
  }, [change])

  return (
    <li className="account__personal-data--item">
      <p>{item}</p>
      {change ? (
        <input
          type="text"
          defaultValue={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
      ) : (
        <div>{data[item]}</div>
      )}
    </li>
  )
}
