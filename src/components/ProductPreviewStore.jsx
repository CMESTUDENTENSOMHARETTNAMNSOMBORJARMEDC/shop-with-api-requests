import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { addItemSelector } from '../stores/cart/selectors';
import '../styles.css';

const ProductPreviewStore = props => {
	const { id, title, image, price } = props.data;
	const addItem = useSetRecoilState(addItemSelector);
  return (
    <div className="product">
      <Link to={`/productstore/${id}`}>
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

export default ProductPreviewStore


