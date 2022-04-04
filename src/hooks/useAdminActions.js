import axios from 'axios'
import { productsState } from '../stores/products/atom'
import { useSetRecoilState } from 'recoil'
import { useState } from 'react'

const useAdminActions = _ => {
  const { products, setProducts } =  useSetRecoilState(productsState);
  const URL = import.meta.env.VITE_API;
  const [status, setStatus] = useState('');

  const updateProduct = (id, updatedProductInfo) => {
    setStatus('updating'),
    axios.put(`${URL}/products/${id}`, updatedProductInfo)
  		.then(response => {
    		console.log(response)
    		setStatus('success');
    		setProducts(response.data);
  		})
  		.catch(error => {
    		setStatus('error');
  		})
    return status;
  }

	const removeProduct = id => {
    const [status, setStatus] = useState('');
    setStatus('removing'),
    axios.delete(`${URL}/products/${id}`)
  		.then(response => {
    		console.log(response)
    		setStatus('success');
    		setProducts(response.data);
  		})
  		.catch(error => {
    		setStatus('error');
  		})
    return status;
	}

	return {updateProduct, removeProduct};
}


export default useAdminActions;

