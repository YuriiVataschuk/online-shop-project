import React from 'react'

type Props = {
  content?: string
}

export const Button: React.FC<Props> = ({ content = 'Checkout' }) => {
  return <button className="button">{content}</button>
}
