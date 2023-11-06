/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react'
import { Form } from '../form/Form'
import styles from './call-us.module.scss'

export const CallUs = () => {
  const [show, setShow] = useState(false)
  return (
    <div className={styles.call}>
      <img
        src="call.png"
        alt="icon call-us"
        width={70}
        height={70}
        onClick={() => setShow(!show)}
      />
      <Form
        show={show}
        onHide={setShow}

        // onHide={() => setModalShow(false)}
      />
    </div>
  )
}
