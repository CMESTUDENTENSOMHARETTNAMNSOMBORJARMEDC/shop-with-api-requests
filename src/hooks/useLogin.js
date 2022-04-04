import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLogin = { user, pass } =>  {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('loading');

  const getFetch = async () => {
    try {
      const result = await fetch(source);
      const data = await result.json();
    } catch {
      setResult(null);
      setStatus('error');
    }
  }

  useEffect(() => {
    getFetch();
  }, [source]);

  return { result, status };
}

export const login = _ => {

}
export const logout = _ => {

}
export const register = _ => {

}

useEffect(_ => {
  axios.post('https://fakestoreapi.com/auth/login', {
    username: user,
    password: pass,
  })
  .then(res => )
  .then(data => )
})

