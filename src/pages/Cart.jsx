import axios from 'axios'
import { useState, useEffect } from 'react'
import cartState from '../stores/cart/atom';
import { productsState } from '../stores/products/atom';
import cartStatus from '../stores/cart/selectors';
// import { useProducts } from '../hooks/useProducts';
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


  // const	ids = cart.map(item => item.id);

	// const { result, status } = useCarts(auth.userId);

	// const totalPrice = 1;
	useEffect(_ => {
  	setStatus('loading');
   	Promise.all(cart.map(item => axios.get(`${URL}/products/${item.id}`)))
  		.then(response => {
    		setStatus('success');
    		setProducts(response.map((res, i)=> {
      		return {...res.data, ...cart[i]};
    		}));
    		console.log(products)
    		console.log(cart)
  		})
  		.catch(error => {
    		setError('error');
    		console.log('error')
  		})
    }, [cart])

	const totalPrice = products.reduce((sum, item) => {
  	return sum + item.price * item.quantity;
	}, 0);

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


