import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { authState } from '../stores/auth/atom.js'
import { userInfoState } from '../stores/user/atom.js'
import { useUserActions } from '../hooks/useUserActions'
import '../styles.css'

const Profile = (props) => {
  const auth = useRecoilValue(authState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const { updateUser } = useUserActions();
	const [updateStatus, setUpdateStatus] = useState('');
	const [status, setStatus] = useState('');
  const URL = import.meta.env.VITE_API;
	const [form, setForm] = useState({
    email:'',
    username:'',
    password:'',
    name: {
      firstname:'',
      lastname:'',
    },
    address: {
      city:'',
      street:'',
      number:'',
      zipcode:'',
    },
    phone:''
	});

  const handleSubmit = e => {
    e.preventDefault();
    setUpdateStatus('...uppdaterar');
    updateUser(5, form)
    	.then(_ => {
      	setUpdateStatus('uppdaterad')
    	})
  		.catch(error => {
    		setUpdateStatus('error');
  		})
  }

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const parts = name.split('.');
   	const update = parts.length > 1
			? {...form[parts[0]], [parts[1]]: value}
			: value
    setForm({...form, [parts[0]]: update});
  }

  useEffect(_ => {
  	setStatus('loading');
    axios.get(`${URL}/users/${auth.userId}`)
  		.then(response => {
    		setStatus('success');
        setUserInfo(response.data);
        setForm(response.data);
  		})
  		.catch(error => {
    		setStatus('error');
    		console.log(error);
  		})
  }, [props.id])

  useEffect(_ => {
    setTimeout(() => {setUpdateStatus('')}, 5000);
  }, [updateStatus])

	if (status !== 'success') {
  	return <div>{status}</div>
	}

  return (
    <div>
    {auth.user}
    	<form onSubmit={handleSubmit}>
				<div>
          <label htmlFor="email">Email: </label>
          <input
            value={form.email}
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
            required
          />
				</div>
				<div>
          <label htmlFor="username">Användarnamn: </label>
          <input
            value={form.username}
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            required
          />
				</div>
				<div>
          <label htmlFor="password">Lösenord: </label>
          <input
            value={form.password}
            onChange={handleChange}
            type="text"
            name="password"
            id="password"
            required
          />
				</div>
				<div>
          <label htmlFor="firstname">Förnamn: </label>
          <input
            value={form.name.firstname}
            onChange={handleChange}
            type="text"
            name="name.firstname"
            id="firstname"
            required
          />
				</div>
				<div>
          <label htmlFor="lastname">Efternamn: </label>
          <input
            value={form.name.lastname}
            onChange={handleChange}
            type="text"
            name="name.lastname"
            id="lastname"
            required
          />
        </div>
				<div>
          <label htmlFor="city">Stad: </label>
          <input
            value={form.address.city}
            onChange={handleChange}
            type="text"
            name="address.city"
            id="city"
            required
          />
        </div>
				<div>
          <label htmlFor="street">Gata: </label>
          <input
            value={form.address.street}
            onChange={handleChange}
            type="text"
            name="address.street"
            id="street"
            required
          />
        </div>
				<div>
          <label htmlFor="number">Nummer: </label>
          <input
            value={form.address.number}
            onChange={handleChange}
            type="text"
            name="address.number"
            id="number"
            required
          />
        </div>
				<div>
          <label htmlFor="zipcode">Postnummer: </label>
          <input
            value={form.address.zipcode}
            onChange={handleChange}
            type="text"
            name="address.zipcode"
            id="zipcode"
            required
          />
        </div>
				<div>
          <label htmlFor="phone">Telefonnummer: </label>
          <input
            value={form.phone}
            onChange={handleChange}
            type="text"
            name="phone"
            id="phone"
            required
          />
        </div>

				<div>
          <input type="submit" value="Spara" />
          <p>{updateStatus}</p>
        </div>
      </form>
    </div>
  )
}

export default Profile
