import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({title ="Welcome to ProShop",description ='We sell the best products for cheap',keywords="electronics,cheap electronics"}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>


    </Helmet>
  )
}

export default Meta