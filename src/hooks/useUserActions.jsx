import axios from 'axios'
import { useEffect, useState } from 'react'
import { authState } from '../stores/auth/atom'
import { userInfoState } from '../stores/user/atom'
import { useRecoilState } from 'recoil'

export const useUserActions = _ => {
  const [auth, setAuth] = useRecoilState(authState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [status, setStatus] = useState('');
  const URL = import.meta.env.VITE_API;

  const login = (user, pass) => {
    const promise = axios.post(`${URL}/auth/login`, {
      username: user,
      password: pass,
    })
		.then(response => {
   		if (response.data.status === 'error') throw new Error('error');
  		const { token, userId } = response.data;
      setAuth({...auth, token: token, user: user, userId: userId});
		})
		return promise;
  }

	useEffect(_ => {
		if (auth.token) {
      axios.get(`${URL}/users/${auth.userId}`)
      	.then(response => setAuth({...auth, role: response.data.role}));
		}
	}, [auth.token])


	const logout = _ => {
  	setAuth({token: null, user: null, userId: null, role: 'user'});
  	//localStorage.removeItem
	}

	const updateUser = async (id, updatedUserInfo) => {
    const promise = await axios.put(`${URL}/users/${id}`, updatedUserInfo)
  		.then(response => {
    		console.log(response)
    		if (response.data.status === 'error') throw new Error('error');
    		setUserInfo(response.data);
  		})
		return promise
	}

	const addUser = userInfo => {
    const promise = axios.post(`${URL}/users`, userInfo)
  		.then(response => {
    		console.log(response)
    		if (response.data.status === 'error') throw new Error('error');
    		const { username, password } = response.data;
    		login(username, password);

  		})
		return promise
	}

	return {login, logout, updateUser, addUser};
}
