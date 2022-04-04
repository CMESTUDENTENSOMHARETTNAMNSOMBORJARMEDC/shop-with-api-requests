import { selector, selectorFamily } from 'recoil';
import cartState from './atom';
// import cartReducer from '.../hooks/useReducer';
// import useReducer from '.../hooks/useReducer.js';


const cartStatus = selector({
  key: 'cartStatus',
  get: ({ get }, priceInfo) => {
    
    const cart = get(cartState);

    const totalItems = cart.reduce((total, current) => {
			return total + current.quantity;
    }, 0);

    return {
      totalItems
    }
  }
})

export const removeItemSelector = selector({
  key: 'RemoveItemSelector',
  get: () => {},
  set: ({ get, set }, id) => {
    set(cartState, cartReducer(get(cartState), {type: 'REMOVE', id: id}));
  }
})

export const decreaseItemSelector = selector({
  key: 'DecreaseItemSelector',
  get: () => {},
  set: ({ get, set }, action) => {
    set(cartState, cartReducer(get(cartState), {type: 'DECREASE', ...action}));
  }
})


export const addItemSelector = selector({
  key: 'AddItemSelector',
  get: () => {},
  set: ({ get, set }, action) => {
    set(cartState, cartReducer(get(cartState), {type: 'ADD', ...action}));
  }
})

const cartHelper = (state, { id, quantity }) => {
  // const pipeline = [
  //   _ => {
  //   	const p = state.find(p => p.id === id)
  //   	return p
  //   		?	[{id, quantity: p.quantity + quantity}]
  //   		: [{id, quantity}]
  //   },
  //   _ => state.filter(prod => prod.id !== id)
  // ];
  // return pipeline.reduce((carry, func) => [...carry, ...func()], []);
	return state.some(product => product.id === id)
		?	state.map(product => {
    		return product.id === id
    			? {...product, quantity: product.quantity + quantity}
    			: product
  		})
  	: [{id, quantity}, ...state];


}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
			return cartHelper(state, action);
    case 'DECREASE':
    	return cartHelper(state, {
        	...action,
        	quantity: action.quantity*-1
      	})
        	.filter(product => product.quantity > 0
    	);
    case 'REMOVE':
			return state.filter(product => product.id !== action.id);
    default:
      return state;
  }
}


export default cartStatus;
