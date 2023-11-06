/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'

type Props = {
  variant: string
  handleClick?: () => void
  disabled?: string
}

export const Arrow: React.FC<Props> = ({
  variant,
  handleClick,
  disabled = '',
}) => {
  return (
    <div className={'arrow' + disabled} onClick={handleClick}>
      {variant === '--off' && <div style={{ position: 'absolute' }}>OFF</div>}
      <img
        src="images/arrow.png"
        className={'arrow__img arrow__img' + variant}
        alt=""
      />
    </div>
  )
}
