import axios from 'axios'
import { useState, useEffect } from 'react'
import { cartState } from '../stores/cart/atom';
import { cartStatus } from '../stores/cart/selectors';
import { useRecoilState, useRecoilValue } from 'recoil';
import CartItem from '../components/CartItem';
import '../styles.css';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const { totalItems } = useRecoilValue(cartStatus);
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState('');
	const [error, setError] = useState('');
  const URL = import.meta.env.VITE_API;
	const totalPrice = products.reduce((sum, item) => {
  	return sum + item.price * item.quantity;
	}, 0);

	useEffect(_ => {
  	setStatus('loading');
   	Promise.all(cart.map(item => axios.get(`${URL}/products/${item.id}`)))
  		.then(response => {
    		setStatus('success');
    		setProducts(response.map((res, i)=> {
      		return {...res.data, ...cart[i]};
    		}));
  		})
  		.catch(error => {
    		setError('error');
    		console.log('error')
  		})
    }, [cart])

  return (
    <div>
    	{cart.length
      	? (<div>
          		<p>{totalItems} var{totalItems > 1 ? 'or' : 'a'} </p>
            	<h3>Summa</h3>
            	<p>{parseInt(totalPrice + 0.5)}:-</p>
           </div>
          )
        : <h3>Varukorgen är tom</h3>
    	}
    	<ul className="cartList">
      	{products.map(item => {
          	return <li key={item.id}><CartItem item={item} /></li>;
        	})
      	}
    	</ul>
    </div>
  )
}

export default Cart
