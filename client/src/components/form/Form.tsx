import { Modal } from 'react-bootstrap'
import { Button } from '../button/Button'
import { Close } from '../close/Close'
import { CheckOutForm } from '../cart/checkout/CheckOutForm'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import * as InformActions from '../../features/informSelector'
import { FETCH } from '../../utils/fetch/fetch'
import { informs } from '../../utils/errors'
import { translateContent } from '../../utils/translate'

type Props = {
  onHide: (value: boolean) => void
  show: boolean
}

const regexp = /^(\+3|)[0-9]{10,11}$/

export const Form: React.FC<Props> = ({ show, onHide }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('+380')
  const [errors, setErrors] = useState(false)
  const [submited, setSubmited] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.global)

  const writeInform = (content: string, type = true) => {
    dispatch(
      InformActions.addInform({
        type: type,
        content: content,
        id: 0,
      })
    )
  }

  useEffect(() => {
    if (submited) {
      setErrors(regexp.test(number) && number.length === 13 ? false : true)
    }
  }, [submited, name, number])

  const handleSubmit = () => {
    setSubmited(true)

    if (!errors && name) {
      setLoading(true)
      FETCH('POST', 'api/shop/contacts/', {
        name: name,
        phone_number: number,
      })
        .then(() => {
          setName('')
          setNumber('+380')
          setErrors(false)
          setSubmited(false)
          onHide(false)
          writeInform(informs.SendForm.suc[lang], true)
        })
        .catch(() => writeInform(informs.SendForm.suc[lang], false))
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show}>
      <Modal.Header>
        <Close onClick={() => onHide(false)} />
        <Modal.Title id="contained-modal-title-vcenter">
          {translateContent('Order a call', 'Замовити дзвінок', lang)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="ps-3">
        <CheckOutForm
          number={number}
          name={name}
          setName={setName}
          setNumber={setNumber}
          errors={errors}
          checkout
          submited={submited}
        />
      </Modal.Body>
      <Modal.Footer>
        <div
          style={{
            width: '85%',
            margin: '0 auto',
            padding: 20,
          }}
        >
          <Button
            onClick={handleSubmit}
            content={translateContent('Submit', 'Відправити', lang)}
            loading={loading}
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
