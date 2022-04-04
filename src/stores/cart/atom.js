import { atom } from 'recoil';

const localStorageEffect = key => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, __) => {
     localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const cartState = atom({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect('current_cart')]
})


export default cartState;
