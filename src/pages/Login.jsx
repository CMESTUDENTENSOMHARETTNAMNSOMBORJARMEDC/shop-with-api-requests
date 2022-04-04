import { useState, useEffect } from 'react';
import { authState } from '../stores/auth/atom'
import { useRecoilState } from 'recoil'
import { useUserActions } from '../hooks/useUserActions'
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
  			<div>
  			<label htmlFor="user">användarnamn</label>
        <input
        	id="user"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
  			<label htmlFor="password">lösenord</label>
        <input
        	id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit">Logga in</button>
    	</form>
  	</div>
	)
}

export default Login;
