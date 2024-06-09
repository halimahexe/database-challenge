const db = require('../database/db.js');

// List all products

const select_products = db.prepare(/* sql */ `
    SELECT
        id,
        name, 
        quantity_per_unit,
        FORMAT('£%.2f', unit_price) AS unit_price, 
        units_in_stock, 
        units_on_order,
        FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value /* How does this work without using INSERT? */
    FROM
        products
`);

const listProducts = () => {
	return select_products.all();
};

// Search products

const search_products = db.prepare(/* sql */ `
    SELECT
        id, 
        name
    FROM products
    WHERE name LIKE ? /* I kept having issues where I was trying to use RETURNING - when is RETURNING needed? */
`);

const searchProducts = (string) => {
	return search_products.all('%' + string + '%');
};

// Get specific product

const get_product = db.prepare(/* sql */ `
    SELECT
        products.id,
        products.name,
        categories.name AS category_name,
        categories.description AS category_description
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE products.id = ?
`);

const getProduct = (id) => {
	return get_product.get(id);
};

module.exports = { listProducts, searchProducts, getProduct };
