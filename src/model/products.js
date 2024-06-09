const db = require('../database/db.js');

// List all products

const select_products = db.prepare(/* sql */ `
    SELECT id, name, quantity_per_unit, unit_price, units_in_stock, units_on_order FROM products
`);

const listProducts = () => {
	return select_products.all();
};

// Search products

const search_products = db.prepare(/* sql */ `
    SELECT id, name
    FROM products
    WHERE name LIKE ?
`);

const searchProducts = (string) => {
	return search_products.all('%' + string + '%');
};

// Get specific product

const get_product = db.prepare(/* sql */ `
    SELECT products.id, products.name
    FROM products
    WHERE products.id = ?
`);

const getProduct = (id) => {
	return get_product.get(id);
};

module.exports = { listProducts, searchProducts, getProduct };
