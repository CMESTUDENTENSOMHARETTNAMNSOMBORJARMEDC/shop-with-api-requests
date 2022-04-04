import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addItemSelector, removeItemSelector, decreaseItemSelector } from '../stores/cart/selectors'
import '../styles.css'


const CartItem = (props) => {
	const addItem = useSetRecoilState(addItemSelector);
	const removeItem = useSetRecoilState(removeItemSelector);
	const decreaseItem = useSetRecoilState(decreaseItemSelector);
  const { quantity, id, image, description, title, price } = props.item;

	return (
  	<div className="cartProductCard">
  		<img src={image} className="cartImage" />
			<Link className="title" to={`/products/${id}`}>{title}</Link>
			<h3>{price}:-</h3>
			<div className="cartOptions">
        <button onClick={_ => decreaseItem({id: id, quantity: 1})}>&lt;</button>
        <b>{quantity}X</b>
        <button onClick={_ => addItem({id: id, quantity: 1})}>&gt;</button>
        <button onClick={_ => removeItem(id)}>Ta bort</button>
      </div>
  </div>
	)
}

export default CartItem;
