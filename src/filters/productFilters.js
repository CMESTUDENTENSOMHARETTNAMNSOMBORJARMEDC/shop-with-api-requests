export const categoryFilter = categories => {
	return (products) => products.filter(product => {
  	return categories.some(cat => product.category === cat);
	});
}

export const idFilter = id => {
	return (products) => products.find(p => p.id === id);
}
