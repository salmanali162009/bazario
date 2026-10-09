import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from '../pages/auth/signup'
import Login from '../pages/auth/login'
import ForgotPassword from '../pages/auth/forgotPassword'
import ResetPassword from '../pages/auth/resetPassword'
import Profile from '../pages/Profile/profile'
import MyProduct from '../pages/Profile/myProduct'
import EditProduct from "../pages/Profile/EditProduct";
import SellerOrderDetails from '../pages/Profile/SellerOrderDetails'
import MyOrder from '../pages/Profile/OrderDetails'
import AllProduct from '../pages/product/allProduct'
import ProductDetail from '../pages/product/ProductDetail'
import NotFound from '../pages/404/notfound'
import Checkout from "../pages/product/Checkout";
import AddProduct from '../pages/Profile/AddProduct'
function routes() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AllProduct /> } />
        <Route path="/home" element={ <AllProduct /> } />
        <Route path="/signup" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/forgot-password" element={ <ForgotPassword /> } />
        <Route path="/reset-password" element={ <ResetPassword /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/my-products/:id" element={ <MyProduct /> } />
        <Route path="/my-products/:id/edit" element={<EditProduct />} />
        <Route path="/seller-orders/:id" element={<SellerOrderDetails />}/>
        <Route path="/my-orders/:id" element={<MyOrder />}/>
        <Route path="/products/:id" element={<ProductDetail />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default routes