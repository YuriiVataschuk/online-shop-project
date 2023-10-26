import React from 'react'

/* eslint-disable react/prop-types */
type Props = {
  path: string
  loading: boolean
}

export const getTitle = (path: string) => {
  const sliceHomePage = path.slice(1)
  const index = sliceHomePage.indexOf('?')
  return sliceHomePage.slice(0, index)
}

export const ProductsPageTitle: React.FC<Props> = ({ path, loading }) => {
  return (
    <h1
      className="products-page__title"
      style={{
        color: !loading ? 'transparent' : 'black',
      }}
    >
      {(getTitle(path) + 's').toUpperCase()}
    </h1>
  )
}
