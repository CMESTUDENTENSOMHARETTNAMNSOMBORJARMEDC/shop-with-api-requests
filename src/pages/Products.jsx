// import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { productsState } from '../stores/products/atom'
import ProductPreview from '../components/ProductPreview'
import '../styles.css'

const Products = (props) => {
	const [categories, setCategories] = useState([])
	const [select, setSelect] = useState('all')
	const [status, setStatus] = useState('')
	const [products, setProducts] = useRecoilState(productsState);
  const URL = import.meta.env.VITE_API;

	useEffect(e => {
		axios.get(`${URL}/products/categories`)
  		.then(response => {
    		setCategories(response.data);
  		})
	},[props.id])

	useEffect(e => {
  	setStatus('loading');
  	const url = select === 'all'
  	 ? `${URL}/products/`
  	 : `${URL}/products/category/${select}`
		axios(url)
  		.then(response => {
    		console.log(response)
    		setStatus('success');
    		setProducts(response.data);
  		})
  		.catch(error => {
    		setError('error');
  		})

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
          	return <option value={cat} key={cat}>{cat}</option>
        	})
      	}
      </select>
    	<h2>{select.toUpperCase()}</h2>
      <ul className="productGrid">
        {
          products.map(product => {
    				return <li key={product.id}><ProductPreview data={product} /></li>;
  				})
        }
      </ul>
    </div>
  )
}

export default Products
