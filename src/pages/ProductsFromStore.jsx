// import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { productsState } from '../stores/products/atom'
import ProductPreviewStore from '../components/ProductPreviewStore'
import '../styles.css'

const ProductsFromStore = (props) => {
	const [categories, setCategories] = useState([])
	const [select, setSelect] = useState('all')
	const [status, setStatus] = useState('')
	const [products, setProducts] = useRecoilState(productsState);
	const [productsToShow, setProductsToShow] = useState([])

  const URL = import.meta.env.VITE_API;

	useEffect(e => {
		const allCategories = products.map(product => {
  		return product.category;
		})
		.reduce((total, cat) => {
  		console.log(cat);
  		return total.includes(cat)
  			? total
			  : [...total, cat];
		}, [])
 		setCategories(allCategories);
	},[props.id])

	useEffect(e => {
  	console.log('selecting ' + select)
  	setStatus('loading');
  	select === 'all'
  		? setProductsToShow(products)
      :	setProductsToShow(products.filter(product => {
    			return product.category === select;
      	}));
	}, [select])

  return (
    <div>
    	<h1>Produkter</h1>
    	<label>Välj kategori</label>
      <select
        name="category"
        id="category-select"
        value={select}
        onChange={e => setSelect(e.target.value)}
      >
        <option value="all">--Alla--</option>
      	{
        	categories.map(cat => {
          	return <option value={cat} key={cat.id}>{cat}</option>
        	})
      	}
      </select>
    	<h2>{select.toUpperCase()}</h2>
      <ul className="productGrid">
        {
          productsToShow.map(product => {
    				return <li key={product.id}><ProductPreviewStore data={product} /></li>;
  				})
        }
      </ul>
    </div>
  )
}

export default ProductsFromStore


