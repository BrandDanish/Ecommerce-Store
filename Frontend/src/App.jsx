import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
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
import ProductCard from './components/product_card/ProductCard'
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
        <Route path='/productcard' element={<ProductCard/>}/>
      </Routes>
      <ToastContainer
        position="center"
        closeOnClick={false}
        draggable={false}
        pauseOnHover
        closeButton
        newestOnTop
        theme="colored"
      />
    </Router>
  )
}
export default App
