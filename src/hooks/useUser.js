import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
// import { productsState } from '../stores/products/atom'


export const useUser = id =>  {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('loading');
  const URL = import.meta.env.VITE_API;

  const getUserInfo = async _ => {
    console.log(id)
    try {
      const res = await axios.get(`${URL}/users/${id}`);
      const data = res.data;
  		setResult(data);
  		setStatus('success');

      // setStatus(res.status)
    } catch {
      console.log('error');
      setStatus('error');
    }
  }

  useEffect(() => {
		getUserInfo()
  }, []);

  return {result, status};
}


