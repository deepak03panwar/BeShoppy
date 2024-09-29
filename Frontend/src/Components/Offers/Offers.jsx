import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { Link } from 'react-router-dom'

const Offers = () => {
  return (
      <div className="offers">
         <div className="offers-left">
            <h2>Exclusive</h2>
            <h2>Offers For You</h2>
            <p>ONLY ON BEST SELLER PRODUCT</p>
            <Link to={`/mens`} onClick={window.scrollTo(0,0)}><button >Check Now</button></Link>
         </div>
         <div className="offers-right">
         <img  src={exclusive_image} alt="" />
         </div>
      </div>
  )
}

export default Offers
