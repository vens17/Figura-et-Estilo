import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ItemAr from '../pages/ItemAr'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Aboutus from '../pages/Aboutus'
import Contactus from '../pages/Contactus'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'
import AddProducts from '../admin/AddProducts'
import AllProducts from '../admin/AllProducts'
import Orders from '../admin/Orders'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/User'
import useAuth from "../custom-hooks/useAuth";

const Routers = ( ) => {
    const { currentUser } = useAuth(); 

    return (
    <Routes>
    <Route path="/" element={<Navigate to='home' />} />
        <Route path='home' element={<Home />} />
        <Route path='shop' element={<Shop />} />        
        <Route path='shop/:id' element={<ProductDetails />} />
        <Route path='category/:category' element={<Shop />} />
        {/* <Route path='cart' element={<Cart />}/> */}
        <Route path='ar' element={<ItemAr />}/>

        <Route path='about-us' element={<Aboutus />} />
        <Route path='contact-us' element={<Contactus />} />

        <Route path="/*" element={<ProtectedRoute/>}>
            {/* <Route path="checkout" element={<Checkout/>} /> */}
            
            {
                currentUser?.type === 'seller' ?
                    <>
                        
                        <Route path="dashboard" element={<Dashboard/>} />
                        <Route path="dashboard/all-products" element={<AllProducts/>} />
                        <Route path="dashboard/add-product" element={<AddProducts/>} />
                        <Route path="dashboard/orders" element={<Orders/>} />
                        <Route path="dashboard/users" element={<Users/>} />
                    </>
                : ''
            }

        </Route>


        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
    </Routes>
    );
};

export default Routers;