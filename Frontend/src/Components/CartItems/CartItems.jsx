import React, { useContext  } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import App1 from '../../App1'





const CartItems = () => {
   
    const {addToCart} = useContext(ShopContext);
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,removeFromCart1} = useContext(ShopContext)
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=> {
            if(cartItems[e.id]>0)
            {
                return <div>
                     <div className="cartitems-format  cartitems-format-main1">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p> ₹{e.new_price}</p>
                        <div className='cartitems-format-main2'>
                        <button className="cartitems-quantity" onClick={()=>{removeFromCart(e.id)}}>-</button>
                        <button className="cartitems-quantity">{cartItems[e.id]}</button>
                        <button className="cartitems-quantity" onClick={()=>{addToCart(e.id)}}>+</button>
                        </div>
                        <p> ₹{e.new_price*cartItems[e.id]}</p>
                        <div className="image">
                           <img  className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart1(e.id)}} alt="" />
                        </div>      
                  </div>
                <hr />
            </div>
            }
            return null;
        })} 
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                       <p>Shipping Fee</p>
                       <p>Free</p> 
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>₹{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <App1 data={getTotalCartAmount()*100}/>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CartItems
