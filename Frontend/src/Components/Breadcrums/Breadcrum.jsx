import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum-arrow.png'

const Breadcrum = (props) => {
  const { product } = props;
  if (!product || !product.category || !product.name) {
    return null; // Or render a default breadcrum
  }

  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum
 /*const Breadcrum = (props) => {
  const {product} = props;
  return (
    <div className='breadcrum'>
       HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum
*/