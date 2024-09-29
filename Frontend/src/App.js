
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import ShopCategory from './Pages/ShopCategory';

import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/men_banner.png'
import women_banner from './Components/Assets/women_banner.png'
import kid_banner from './Components/Assets/kids_banner.png'
import electronic_banner from './Components/Assets/electronic_banner.png'
import home_banner from './Components/Assets/home_banner.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/> }/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory  banner={kid_banner} category="kid"/>}/>
        <Route path='/electronics' element={<ShopCategory  banner={electronic_banner} category="electronic"/>}/>
        <Route path='/home&furniture' element={<ShopCategory  banner={home_banner} category="home&furniture"/>}/>
        <Route path="/Product" element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/> 
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
