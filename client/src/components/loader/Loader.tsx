import React from 'react'
import styles from './Loader.module.scss'

type LoaderProps = {
  isBlack?: boolean
}

export const Loader: React.FC<LoaderProps> = ({ isBlack = false }) => {
  return (
    <div
      className={`${styles['lds-ring']} ${
        isBlack ? styles.black : styles.white
      }`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
