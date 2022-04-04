import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { productsState } from '../stores/products/atom'


export const useProducts = (id = null) =>  {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('loading');
  const [products, setProducts] = useRecoilState(productsState);
  const URL = import.meta.env.VITE_API;

  const getProducts = async () => {
    try {
      const res = await axios.get(`${URL}/products/`);
      const data = res.data;
      console.log(data)
      setProducts(data);
  		setResult(data);

      // setStatus(res.status)
    } catch {
      console.log('error');
    }
  }

	const categoryFilteredProducts = async categories => {
		const res = await axios.get(`${URL}/products/category/${category}`);
	}


	const getSingleProduct = async id => {
  	setStatus('laddar');
		const res = await axios.get(`${URL}/products/${id}`);
		setResult(res.data);
		setStatus('success');
	}

  useEffect(() => {
		id
			? getSingleProduct(id)
    	: getProducts()
  }, []);

  return {result, status};
}

