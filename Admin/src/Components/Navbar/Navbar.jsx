import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/shopping.png'
import navProfile from '../../assets/people.png'

const Navbar = () => {
  return (
    <div className='navbar'>
       <img src={navlogo} alt="" className="nav-logo" />
       <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
