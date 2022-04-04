import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { productsState } from '../stores/products/atom'
import { cartState } from '../stores/cart/atom'


export const useCarts = userId =>  {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('loading');
  const [products, setProducts] = useRecoilState(productsState);
  const cart = useRecoilValue(cartState);

  const URL = import.meta.env.VITE_API;

  const getCart = async () => {
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

  useEffect(() => {
  }, []);

  return {result, status};
}


