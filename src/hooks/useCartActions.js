import axios from 'axios'
import { cartState } from '../stores/auth/atom'
import { useSetRecoilState } from 'recoil'

const useCartActions = _ => {
  const { cart, setCart } = useSetRecoilState(cart);

  const addProduct = async (userId, products) => {
    try {
      const res = await axios.put('https://fakestoreapi.com/cart', {
        userId: userId,
        products: products
      })
      setCart();
    } catch (error) {
      console.error(error);
    }
  }

	const removeProduct = _ => {
  	//localStorage.removeItem
  	setCart();
	}

	return {addProduct, removeProduct};
}

export default useCartActions;

