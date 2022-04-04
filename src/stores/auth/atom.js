import { atom } from 'recoil';

const localStorageEffect = key => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const authState = atom({
  key: 'authState',
  default: {
    token: '',
    user: '',
    userId: '',
    role: 'user'
  },
  effects: [localStorageEffect('current_user')]
})

