import { selectorFamily } from 'recoil'
import { productsState } from './atom'
import { idFilter, categoryFilter } from '../../filters/productFilters'

export const productList = selectorFamily({
  key: 'ProductList',
  get: (filters=[]) => ({ get }) => {
    const products = get(productsState);
		if (filters.length) {
  		const tFilters = filters.map(p => idFilter(p.value));
      const filteredProducts = tFilters.reduce((productsToFilter, currentFilter) => {
  			return currentFilter(productsToFilter);
      }, products);
      return filteredProducts;
		}
    return products;
  }
})

//can't pass functions as params in recoil selectors.
const filterTransform = filters => {
  filters.map(filter => {
    switch(filter.filterType) {
      case 'id':
      	return idFilter(filter.value);
      case 'category':
      	return categoryFilter(filter.value);
      default:
      	return n => n;
    }
  })
}



