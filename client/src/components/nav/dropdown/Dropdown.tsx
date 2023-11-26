/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import styles from './drop-down.module.scss'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as langActions from '../../../features/globalSelector'

type Props = {
  handleChange?: (value: string) => void
  value?: string
  values?: string[]
}
export const DropdownItem: React.FC<Props> = ({
  handleChange,
  value,
  values,
}) => {
  const lang = value ? value : useAppSelector((state) => state.global)
  const onChange = handleChange
    ? handleChange
    : (item: string) => {
        dispatch(langActions.changeLang(item))
        setShow(false)
      }
  const items = values ? values : ['EN', 'УКР']

  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)

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
          {items.map((item) => (
            <li className="item" key={item} onClick={() => onChange(item)}>
              {item}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}
