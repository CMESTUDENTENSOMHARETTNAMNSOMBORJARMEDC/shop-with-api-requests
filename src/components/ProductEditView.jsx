import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { productsState } from '../stores/products/atom.js'
import { addItemSelector } from '../stores/cart/selectors'
import useAdminActions from '../hooks/useAdminActions'
import '../styles.css'

const ProductEditView = props => {
	const {
  	id,
  	title,
  	image,
  	price,
  	category,
  	description,
  	rating
	} = props.data;

	const {updateProduct, removeProduct} = useAdminActions();
	const [products, setProducts] = useRecoilState(productsState);

	const [toggle, setToggle] = useState(false);
	const [updateStatus, setUpdateStatus] = useState('');
	const [removeStatus, setRemoveStatus] = useState('');
	// const [title_, setTitle] = useState(title);
	// const [description_, setDescription] = useState(description);
	// const [image_, setImage] = useState(image);
	// const [category_, setCategory] = useState(category);
	// const [price_, setPrice] = useState(price);
  const URL = import.meta.env.VITE_API;


	const [form, setForm] = useState({
		title,
		price,
		description,
		image,
		category
	});

  const handleSubmit = e => {
    e.preventDefault();
    // const update = updateProduct(id, form);
    setUpdateStatus('updating');
    axios.put(`${URL}/products/${id}`, form)
  		.then(response => {
    		console.log(response)
    		setUpdateStatus('success');
    		const updatedProducts = products.reduce((total, product) => {
					return product.id === id
						? [...total, response.data]
						: [...total, product]
    		}, []);
    		// setProducts([response.data, ...products.filter(p => p.id !== id)]);
    		setProducts(updatedProducts);
  		})
  		.catch(error => {
    		setUpdateStatus('error');
  		})

  }

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({...form, [name]: value});
  }

  const handleRemove = _ => {
		// const remove = removeProduct(id);
		// setRemoveStatus(remove);
		setRemoveStatus('removing'),
    axios.delete(`${URL}/products/${id}`)
  		.then(response => {
    		console.log(response)
    		setRemoveStatus('success');
    		setProducts(products.filter(p => p.id !== response.data.id));
  		})
  		.catch(error => {
    		setRemoveStatus('error');
  		})

  }

  // useEffect(_ => {
  //   console.log(updateStatus)
  // }, [updateStatus])
  useEffect(_ => {
    setTimeout(() => {setUpdateStatus('')}, 3000);
  }, [updateStatus])

  useEffect(_ => {
    setTimeout(() => {setRemoveStatus('')}, 3000);
  }, [removeStatus])


	if (!toggle) {
  	return (
    	<div>
      	|<b onClick={_ => setToggle(true)}> ändra </b>
      	|<b onClick={handleRemove}> ta bort </b>
      	| {title}
    	</div>
  	)
	}

	if (removeStatus && removeStatus !== 'success') {
		return <div>{removeStatus}</div>
	}

	if (updateStatus && updateStatus !== 'success') {
		return <div>{updateStatus}</div>
	}

  return (
    <div>
      | <b onClick={_ => setToggle(false)}>stäng</b> |
      <b onClick={handleRemove}> ta bort</b> |
    	<form onSubmit={handleSubmit}>
				<div>
          <label htmlFor="title">Titel: </label>
          <input
            value={form.title}
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            required
          />
				</div>
				<div>
          <label htmlFor="description">Beskrivning: </label>
          <input
            value={form.description}
            onChange={handleChange}
            type="text"
            name="description"
            id="description"
            required
          />
				</div>
				<div>
          <label htmlFor="image">Bild: </label>
          <input
            value={form.image}
            onChange={handleChange}
            type="text"
            name="image"
            id="image"
            required
          />
				</div>
				<div>
          <label htmlFor="category">Kategori: </label>
          <input
            value={form.category}
            onChange={handleChange}
            type="text"
            name="category"
            id="category"
            required
          />
				</div>
				<div>
          <label htmlFor="price">Pris: </label>
          <input
            value={form.price}
            onChange={handleChange}
            type="text"
            name="price"
            id="price"
            required
          />
        </div>
				<div>
          <input type="submit" value="Spara" />
        </div>
      </form>
    </div>
  )
}

export default ProductEditView
