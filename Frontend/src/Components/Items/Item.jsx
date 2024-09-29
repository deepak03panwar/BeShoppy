import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'>
      <div className="image">
       <Link to={`/Product/${props.id}`} ><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
       </div>
          <p>{props.name.split(' ').slice(0, 7).join(' ')}...</p>
       <div className="item-prices">
        <div className="item-price-new">
        ₹{props.new_price}
        </div>
        <div className="item-price-old">
        ₹{props.old_price}
        </div>
       </div>
    </div>
  )
}

export default Item
