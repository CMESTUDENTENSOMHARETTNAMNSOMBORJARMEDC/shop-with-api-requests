import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { productsState } from '../stores/products/atom'
import { usersState } from '../stores/users/atom'
import { cartsState } from '../stores/carts/atom'


export const useAdmin = _ => {
  const [result, setResult] = useState(null);
  const [productsStatus, setProductsStatus] = useState('');
  const [cartsStatus, setCartsStatus] = useState('');
  const [usersStatus, setUsersStatus] = useState('');
  const [users, setUsers] = useRecoilState(usersState);
  const [products, setProducts] = useRecoilState(productsState);
  const [carts, setCarts] = useRecoilState(cartsState);

  // const [users_, setUsers] = useRecoilState(usersState);
  // const [carts_, setCarts] = useRecoilState(cartsState);
  const URL = import.meta.env.VITE_API;

	const getProducts = _ => {
 		setProductsStatus('loading');
		axios.get(`${URL}/products`)
  		.then(response => {
    		console.log(response)
    		setProducts(response.data);
    		setProductsStatus('success');
  		})
  		.catch(error => {
    		setProductsStatus('error');
  		})
	}

	const getCarts = _ => {
 		setCartsStatus('loading');
		axios.get(`${URL}/carts`)
  		.then(response => {
    		console.log(response.data)
    		setCarts(response.data);
    		setCartsStatus('success');
  		})
  		.catch(error => {
    		setCarsStatus('error');
  		})
	}

	const getUsers = _ => {
 		setUsersStatus('loading');
		axios.get(`${URL}/users`)
  		.then(response => {
    		console.log(response)
    		setUsers(response.data);
    		setUsersStatus('success');
  		})
  		.catch(error => {
    		setUsersStatus('error');
  		})
	}

  useEffect(_ => {
    console.log('running')
		getCarts();
		getProducts();
		getUsers();
  }, []);

  return {users, usersStatus, carts, cartsStatus, products, productsStatus};
}

