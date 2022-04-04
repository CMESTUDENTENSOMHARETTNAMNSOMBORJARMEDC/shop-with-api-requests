import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Shop from './Shop';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navigation from './partials/Navigation';

import { authState } from './stores/auth/atom';



ReactDOM.render(
  <React.StrictMode>
  	<RecoilRoot>
  		<Router>
  			<Shop/>
  		</Router>
  	</RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
