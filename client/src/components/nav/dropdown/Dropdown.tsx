/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import styles from './drop-down.module.scss'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as langActions from '../../../features/globalSelector'

export function DropdownItem() {
  const lang = useAppSelector((state) => state.global)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)

  const handleChange = (item: string) => {
    dispatch(langActions.changeLang(item))
    setShow(false)
  }

  useEffect(() => {
    const Id = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement
      if (target.className.includes('drop')) return
      setShow(false)
    }

    document.addEventListener('click', Id)

    return () => document.removeEventListener('click', Id)
  }, [show])
  return (
    <div className={styles.dropdown}>
      <button onClick={() => setShow(!show)} className="drop">
        {lang}
      </button>
      {
        <ul
          className="field"
          style={{
            display: show ? 'block' : 'none',
          }}
        >
          <li className="item" onClick={() => handleChange('EN')}>
            EN
          </li>
          <li className="item" onClick={() => handleChange('УКР')}>
            УКР
          </li>
        </ul>
      }
    </div>
  )
}
