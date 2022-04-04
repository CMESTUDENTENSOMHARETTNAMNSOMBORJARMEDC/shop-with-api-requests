import { useEffect } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import logo from './logo.svg'
import './App.css'

import { Routes, Route, useNavigate } from 'react-router-dom'

import Products from './pages/Products'
import ProductsFromStore from './pages/ProductsFromStore'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ProductFromStore from './pages/ProductFromStore'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Navigation from './partials/Navigation'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'

import { authState } from './stores/auth/atom'
import { productsState } from './stores/products/atom'
import { useProducts } from './hooks/useProducts'

const Shop = () => {
	const auth = useRecoilValue(authState);
	const navigate = useNavigate();

  return (
    <>
		<Navigation />
		<Routes>
			{!auth.token
				? <Route path="*" element={<Login />} />
        : (
					<>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products /> } />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
					</>
					)
			}
      <Route path="/login" element={<Login />} />
      <Route path="/productsstore" element={<ProductsFromStore />} />
      <Route path="/productstore/:id" element={<ProductFromStore />} />
      <Route path="/register" element={<Register />} />
      {auth.role === 'admin' &&
        <Route path="/admin" element={<Admin />} />
      }

    </Routes>
    </>
  )
}

export default Shop
