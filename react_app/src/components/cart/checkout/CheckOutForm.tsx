import React, { useState } from 'react'
type Props = {
  checkout: boolean
  setName: (val: string) => void
  setNumber: (val: string) => void
  name: string
  number: string
  errors: boolean
  submited: boolean
}

export const CheckOutForm: React.FC<Props> = ({
  checkout,
  name,
  setName,
  number,
  setNumber,
  errors,
  submited,
}) => {
  return (
    <div
      className="cart-checkout"
      style={{
        height: checkout ? 'fit-content' : 0,
        marginBottom: checkout ? 40 : 0,
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={
          submited && (!name || Number(name[0]))
            ? 'cart-checkout__input danger'
            : 'cart-checkout__input'
        }
      />
      <input
        type="text"
        className={
          submited && errors
            ? 'cart-checkout__input danger'
            : 'cart-checkout__input'
        }
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Phone"
      />
    </div>
  )
}
