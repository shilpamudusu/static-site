const fs = require('fs');
const lunr = require('lunr');

const products = require('./src/_data/products.json');

const index = lunr(function () {
    this.field('name');
    this.field('description');
    this.field('brand');
    this.field('category');

    products.forEach((product) => {
        this.add({
            id: product.id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            category: product.category
        });
    });
});

const searchData = {
    index: index,
    products: products
};

fs.writeFileSync('./src/assets/js/search-index.json', JSON.stringify(searchData));