/* eslint-disable react/prop-types */
import { useState } from 'react'
import { PersonalDataItem } from './PersonalDataItem'
import React from 'react'

type Props = {
  items: string[]
  type?: string
}

export const PersonalData: React.FC<Props> = ({ items, type }) => {
  const [change, setChange] = useState(false)
  return (
    <div className="account__personal-data">
      <h3 className="account__personal-data--title">
        {!type ? 'Personal data' : type}{' '}
        <button onClick={() => setChange(!change)}>change</button>
      </h3>
      <ul className="account__personal-data--list">
        {items.map((item) => (
          <PersonalDataItem item={item} key={item} change={change} />
        ))}
      </ul>
      {change && (
        <button
          className="account__personal-data--apply"
          onClick={() => setChange(!change)}
        >
          APPLY CHANGES
        </button>
      )}
    </div>
  )
}
