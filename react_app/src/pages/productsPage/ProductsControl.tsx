/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SizeList } from '../../components/SizeList'
import { Arrow } from '../ProductPage/Arrow'

type Props = {
  variants: string
  handleClick: () => void
}

const itemsOnPage = ['15', '9', '3', 'all']

export const ProductsControl: React.FC<Props> = ({ handleClick, variants }) => {
  const [item, setItem] = useState(itemsOnPage[0])
  const [params, setParams] = useSearchParams()
  const perPage = params.get('perPage') || '15'
  const page = params.get('page') || '1'

  useEffect(() => {
    params.set('perPage', item)

    setParams(params)
  }, [item])

  useEffect(() => {
    if (page === '1') {
      params.delete('page')
    }

    if (perPage === '15') {
      params.delete('perPage')
    }
    setParams(params)
  }, [page, perPage])

  return (
    <div className="products-page__control">
      <div style={{ fontWeight: 200 }}>
        ITEMS ON PAGE:{' '}
        <SizeList sizes={itemsOnPage} size={item} setSize={setItem} />
      </div>

      <div style={{ fontWeight: 200 }}>
        SORT PRICE: <Arrow variant={variants} handleClick={handleClick} />
      </div>
    </div>
  )
}
