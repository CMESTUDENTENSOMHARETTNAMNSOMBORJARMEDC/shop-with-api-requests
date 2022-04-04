import axios from 'axios'
import { authState } from '../stores/auth/atom'
import { useSetRecoilState } from 'recoil'

const useUserActions = _ => {
  const { auth, setAuth } from useSetRecoilState();

  const login = async (user, pass) => {
    console.log('logging in' + user + ' ' + pass);
    // const setAuth = useSetRecoilState(authState);
    try {
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        // username: user,
        // password: pass,
        username: 'mor_2314',
        password: '83r5^_',
      })
      // setAuth(res.data);
      // console.log(res.data);
      // const data = await res.json();
      // console.log(res);
      const token = res.data;
      setAuth{token: token, user: user);
    } catch (error) {
      console.error(error);
      // return null;
    }
      // .then(data => setAuth(data.token))
  }

	const logout = _ => {
  	setAuth({token: null, user: null});
  	//localStorage.removeItem
	}
	return {login, logout};
}


