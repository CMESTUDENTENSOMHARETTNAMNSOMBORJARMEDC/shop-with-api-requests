import axios from 'axios'
import { useEffect } from 'react'
import { authState } from '../stores/auth/atom'
import { useRecoilState } from 'recoil'

const useUserActions = _ => {
  const [auth, setAuth] = useRecoilState(authState);
  const URL = import.meta.env.VITE_API;

  const login = async (user, pass) => {
    console.log('logging in' + user + ' ' + pass);
    try {
      const res = await axios.post(`${URL}/auth/login`, {
        username: user,
        password: pass,
        // username: 'mor_2314',
        // password: '83r5^_',
      })
      const data = res.data;
      console.log(data);
      // getUserRole(userId);
      setAuth({...auth, token: data.token, user: user, userId: data.userId});
      return res;
    } catch (error) {
      console.error(error);
      return res;
    }
  }

	useEffect(_ => {
		if (auth.token) {
      axios.get(`${URL}/users/${auth.userId}`)
      	.then(response => setAuth({...auth, role: response.data.role}));
		}
	}, [auth.tokent])


	const logout = _ => {
  	setAuth({token: null, user: null, userId: null, role: 'user'});
  	//localStorage.removeItem
	}

	const updateUser = async (id, updatedUserInfo) => {
    try {
      const res = await axios.put(`${URL}/users/${id}`, updatedUserInfo);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
	}

	const addUser = async updatedUserInfo => {
    try {
      const res = await axios.post(`${URL}/users`, updatedUserInfo);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
	}


	return {login, logout, updateUser, addUser};
}

export default useUserActions;
