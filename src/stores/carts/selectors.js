import { selector, selectorFamily } from 'recoil';
import { cartsState } from './atom'

export const cartOwnerSelector = selector({
  key: 'cartOwnerSelector',
  get: ({get}, id) => {
    const carts = get(cartsState);
    return carts.find(c => c.userId === id);
  }
});

