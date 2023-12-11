/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react'
import { Form } from '../form/Form'
import styles from './call-us.module.scss'

export const CallUs = () => {
  const [show, setShow] = useState(false)
  const callUsRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={callUsRef} className={styles.call}>
      <img
        src="call.png"
        alt="icon call-us"
        width={50}
        height={50}
        onClick={() => setShow(!show)}
      />
      <Form show={show} onHide={() => setShow(false)} />
    </div>
  )
}
