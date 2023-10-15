/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSearchParams } from 'react-router-dom'
import classnames from 'classnames'
import { useEffect } from 'react'

import { Arrow } from '../pages/ProductPage/Arrow'

type Props = {
  paginationLength: number
}

export const Pagination: React.FC<Props> = ({ paginationLength = 10 }) => {
  const [params, setParams] = useSearchParams()
  const page = params.get('page') || 1
  const perPage = params.get('perPage')

  const handleChangePage = (num: number) => {
    params.set('page', `${num}`)
    setParams(params)
  }

  const createPagination = () => {
    const result = []

    for (let i = 1 || 1; i <= paginationLength; i += 1) {
      result.push(
        <li
          key={i}
          className={classnames('pagination__item', {
            'is-active': +page === i,
          })}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </li>
      )
    }

    return result
  }

  useEffect(() => {
    params.set('page', `1`)
    setParams(params)
  }, [perPage])

  useEffect(() => {
    if (page === '1') {
      params.delete('page')
    }
    setParams(params)
  }, [page])

  const paginationList = createPagination()

  return (
    <section className="pagination">
      <Arrow
        variant="left"
        handleClick={() => handleChangePage(+page - 1)}
        disabled={+page === 1 ? ' disabled' : ''}
      />
      <ul className="pagination__list">{paginationList}</ul>
      <div className="right-button">
        <Arrow
          variant="--right"
          handleClick={() => handleChangePage(+page + 1)}
          disabled={+page === paginationList.length ? ' disabled' : ''}
        />
      </div>
    </section>
  )
}
