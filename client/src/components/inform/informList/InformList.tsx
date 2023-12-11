/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAppSelector } from '../../../app/hooks'
import { Inform } from '../Inform'
import styles from '../informList/inform.module.scss'

export const InformList = () => {
  const errorList = useAppSelector((state) => state.inform)
  return (
    <>
      <div className={styles.list}>
        {errorList.map((item) => (
          <Inform key={item.id} content={item.content} type={item.type} />
        ))}
      </div>
    </>
  )
}
