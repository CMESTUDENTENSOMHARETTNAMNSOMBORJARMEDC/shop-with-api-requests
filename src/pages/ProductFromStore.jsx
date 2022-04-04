import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useRecoilValue, useRecoilState } from 'recoil'
import cartState from '../stores/cart/atom'
import { productsState } from '../stores/products/atom'
import { addItemSelector } from '../stores/cart/selectors'
import '../styles.css'

const ProductFromStore = () => {
	const params = useParams();
	const [_, addItem] = useRecoilState(addItemSelector);
	const products = useRecoilValue(productsState);
  const [quantity, setQuantity] = useState(1);
	const [addStatus, setAddStatus] = useState('');
	const [status, setStatus] = useState('');
	const [error, setError] = useState('');
	const [product, setProduct] = useState({});
  const URL = import.meta.env.VITE_API;

	useEffect(e => {
  	console.log('single item ' + params.id)
		setProduct(products.find(product => product.id == params.id));
	}, [params.id])


	const handleAdd = (value) => {
		const validatedValue = parseInt(value);
		if (validatedValue > 0) {
  		addItem({id: id, quantity: validatedValue});
			setAddStatus(`Lade till ${validatedValue} var${quantity > 1 ? 'or' : 'a'}`);
		} else {
  		setAddStatus('Error');
		}
	}

	if (!product) {
  	return <div>loading</div>
	}

	const { price, title, image, description, id } = product;

  return (
    <div>
    	{
      	<div>
					<img src={image} width="200px" height="300px"/>
  				<h1>{title}</h1>
  				<p>{description}</p>
  				<h2>{price}:-</h2>
  				<input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
  				<button onClick={_ => handleAdd(quantity)}>
    				Lägg i varukorg
  				</button>
  				<p>{addStatus}</p>
				</div>
    	}
    </div>
  )
}

export default ProductFromStore

