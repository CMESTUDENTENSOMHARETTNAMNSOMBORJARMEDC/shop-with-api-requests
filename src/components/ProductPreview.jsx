import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartState } from '../stores/cart/atom.js';
import { addItemSelector } from '../stores/cart/selectors';
import '../styles.css';

const ProductPreview = props => {
	const { id, title, image, price } = props.data;
	const [__, addItem] = useRecoilState(addItemSelector);
  return (
    <div className="product">
      <Link to={`/products/${id}`}>
      	<img className="productImage" src={image} />
        <h3 className="title">{title}</h3>
        <b>{price}:-</b>
      </Link>
      <button className="addButton"
      	onClick={_ => addItem({id: id, quantity: 1})}>
      	Lägg i varukorg
    	</button>
    </div>
  )
}

export default ProductPreview

