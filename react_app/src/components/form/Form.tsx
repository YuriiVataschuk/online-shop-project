/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import { Button } from '../button/Button'
import { Close } from '../close/Close'
import { CheckOutForm } from '../cart/checkout/CheckOutForm'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'

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
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  useEffect(() => {
    if (submited) {
      setErrors(regexp.test(number) && number.length === 13 ? false : true)
    }
  }, [submited, name, number])

  const handleSubmit = () => {
    setSubmited(true)

    if (!errors && name) {
      setName('')
      setNumber('+380')
      setErrors(false)
      setSubmited(false)
    }
  }
  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show}>
      <Modal.Header>
        <Close onClick={() => onHide(false)} />
        <Modal.Title id="contained-modal-title-vcenter">
          {isEng ? 'Order a call' : 'Замовити дзвінок'}
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
            content={isEng ? 'Submit' : 'Відправити'}
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
