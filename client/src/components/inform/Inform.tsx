/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import styles from './inform.module.scss'
import * as actionsEr from '../../features/informSelector'
import { useAppDispatch } from '../../app/hooks'
import { Close } from '../close/Close'

type Props = {
  content: string
  type?: boolean
}

const { container, line } = styles
export const Inform: React.FC<Props> = ({ content, type = false }) => {
  const [timer, setTimer] = useState(100)

  const dispatch = useAppDispatch()
  useEffect(() => {
    const Id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(Id)
          dispatch(actionsEr.removeInform())
          return 0
        }
        return prev - 0.15
      })
    }, 10)
  }, [])

  return (
    <div className={container}>
      <Close onClick={() => dispatch(actionsEr.removeInform())} />
      <p>{content}</p>
      <div
        className={line + ' ' + styles[!type ? 'line--denger' : '']}
        style={{
          width: timer + '%',
        }}
      />
    </div>
  )
}
