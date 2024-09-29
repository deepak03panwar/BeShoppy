import React, { useContext, useRef, useState} from 'react'
import './Navbar.css'
import logo from '../Assets/beshoppy.jpeg'
import cart_icon from '../Assets/cart.jpg'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/chevron.png'
const Navbar = () => {
  
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  // const {Users} = useContext(ShopContext);
  
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }


  
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>BESHOPPY</p> 
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to="/">Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to="/mens">Men</Link> {menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to="/womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to="/kids">Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("electronics")}}><Link style={{textDecoration:'none'}} to="/electronics">Electronics</Link>{menu==="electronics"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("home&furniture")}}><Link style={{textDecoration:'none'}} to="/home&furniture">Home&Furniture</Link>{menu==="home&furniture"?<hr/>:<></>}</li>
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token')
        ?
        <div>
          {/* <button Style={{width:"35px"}}>My Order</button> */}
        <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")} }>Logout</button> 
        </div>
        :<Link to='/login'><button>Login</button></Link>}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
