import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../protectedRoute';
import LogIn from './pages/logInForm';
import ResetPassword from './pages/forgotPassword';
import ForgotPassWord from './pages/newPassword';
import Products from './pages/products/products';
import ProductOrderForm from './pages/products/productOrderForm';
import ProductCreationForm from './pages/products/createProduct';
import Vendors from './pages/vendors/vendors';
import VendorForm from './pages/vendors/vendorForm';
import Orders from './pages/orders/orders';
import Users from './pages/users/users';
import CreateUserForm from './pages/users/userForm';
import CustomerForm from './pages/customer';
const AppRoutes = () => {

const naviagte = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={() => naviagte('/products')} />} />
      <Route path="/products" element={<ProtectedRoute Component={Products} />} />
      <Route path="/products/:id" element={<ProtectedRoute Component={ProductOrderForm} />} />
      <Route path="/products/create-product" element={<ProtectedRoute Component={ProductCreationForm} />} />
      <Route path="/vendors" element={<ProtectedRoute Component={Vendors} />} />
      <Route path="/vendors/vendor" element={<ProtectedRoute Component={VendorForm} />} />
      <Route path="/orders" element={<ProtectedRoute Component={Orders} />} />
      <Route path="/users" element={<ProtectedRoute Component={Users} />} />
      <Route path="/users/user" element={<ProtectedRoute Component={CreateUserForm} />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/reset-password" element={<ForgotPassWord />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
      <Route path="*" element={<h1>Page Not Found!</h1>} />
      <Route path='/create-customer' element={<CustomerForm />} />
    </Routes>
  );
};

export default AppRoutes;
