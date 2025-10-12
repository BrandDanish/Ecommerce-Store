import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopHeader from './components/header/TopHeader'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import UserLog from './components/user/UserLog'
import About from './pages/About'
import Whishlist from './components/whishlist/Whishlist'
import Cart from './components/cart/Cart'
import Contact from './pages/Contact'
import Checkout from './components/checkout/CheckOut'
import Profile from './components/profile/Profile'
import ProductDetail from './components/productdetails/ProductDetails'
import ErrorHandle from './components/errorhandle/Error'
import AllProducts from './pages/Shop'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path='/whishlist' element={<Whishlist/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='*' element={<ErrorHandle/>}/>
        <Route path='/shop' element={<AllProducts/>}/>
        <Route path='/login' element={<UserLog/>}/>
      </Routes>
    </Router>
  )
}
export default App
