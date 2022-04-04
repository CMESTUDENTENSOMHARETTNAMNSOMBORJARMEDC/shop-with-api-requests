import { authState } from './atom'

export const userInfo = selectorFamily({
	key: 'UserInfo',
	get: async _ => {
  	const userName = get(authState.user);
  	const res = await axios.get(`https://fakestoreapi.com/users/${userName}`);
  	return res.data;
	}
})
