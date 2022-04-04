import { useState, useEffect } from 'react';
import { authState } from '../stores/auth/atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import useUserActions from '../hooks/useUserActions'
import { useUser }from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [auth, setAuth] = useRecoilState(authState);
  const { login } = useUserActions();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState('')

	const handleSubmit = e => {
  	e.preventDefault();
  	setStatus('logging in'),
  	login(username, password)
  		.catch(error => {
    		setStatus('error');
    		setPassword('');
  		})
	}

	//redirect if logged in
	useEffect(_ => auth.token &&	navigate('/'));

	return (
  	<div>
    	LOGIN
    	<p>{status}</p>
    	<p>{auth.token} {auth.user}</p>
  		<form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logga in</button>
    	</form>
  	</div>
	)
}

export default Login;
