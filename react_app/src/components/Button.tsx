import React from 'react'
import { Loader } from './loader/Loader'

type Props = {
  content?: string
  onChange?: () => void
  loading?: boolean
}

export const Button: React.FC<Props> = ({
  content = 'Checkout',
  onChange,
  loading = false,
}) => {
  return (
    <button className="button" onClick={onChange}>
      {loading ? <Loader /> : content}
    </button>
  )
}
