import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { usersState } from '../stores/users/atom'
import { productsState } from '../stores/products/atom'
import { cartsState } from '../stores/carts/atom'
import { useAdmin } from '../hooks/useAdmin'
import ProductEditView from '../components/ProductEditView'

const Admin = _ => {
  const {
    users,
    usersStatus,
    carts,
    cartsStatus,
    products,
    productsStatus
  } = useAdmin();
	const NONPRODUCT = {id: -1, title: 'försvunnen vara'};

	const cartOwner = id => {
  	return users.length
  		? users.find(user => user.id === id)
  		: 'kunde inte hitta ägare'
	}

	const productById = id => {
  	const product = products.find(product => product.id == id);
  	return product || NONPRODUCT;
	}

	return(
    <div>
      <h2>användare</h2>
      {
        usersStatus !== 'success'
        	? <div>{usersStatus}</div>
        	: (
              users.map(user => {
                return <div key={user.id}>{user.id} - {user.username}</div>
              })
          	)
      }
      <h2>varukorgar</h2>
      {
        cartsStatus !== 'success'
					? <div>{cartsStatus}</div>
					: (
              carts.map(cart => {
                return (
                  <div key={cart.id}>
                    id: {cart.id} ägare: {cartOwner(cart.userId).username}
                    <ul>
                      {cart.products.map(item => {
                        return (
                          <li key={item.id}>
                            {item.quantity} st: {productById(item.productId).title}
                          </li>
                        )
                        })
                      }
                    </ul>
                  </div>
                )
              })
  					)
      }
      <h2>produkter</h2>
 			<Link to="/productsstore">Produkter</Link>
      {
      productsStatus !== 'success'
					? <div>{productsStatus}</div>
					: (
              products.map(product => {
                return <ProductEditView key={product.id} data={product} />
              })
            )
      }
    </div>
  )
}

export default Admin
