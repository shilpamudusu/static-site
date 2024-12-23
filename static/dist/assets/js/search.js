let searchIndex;
let products;

async function initSearch() {
    try {
        const response = await fetch('/assets/js/search-index.json');
        const data = await response.json();
        searchIndex = lunr.Index.load(data.index);
        products = data.products;
    } catch (error) {
        console.error('Error initializing search:', error);
    }
}

function performSearch(query) {
    if (!searchIndex) {
        console.error('Search index not initialized');
        return;
    }

    const results = searchIndex.search(query);
    displayResults(results);
}

function displayResults(results) {
    const productList = document.getElementById('product-list');
    if (!productList) {
        console.error('Product list element not found');
        return;
    }

    productList.innerHTML = '';

    if (results.length === 0) {
        productList.innerHTML = '<p class="text-center text-gray-500 my-4">No results found.</p>';
        return;
    }

    results.forEach(result => {
        const product = products.find(p => p.id === result.ref);
        if (product) {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        }
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card border rounded-lg overflow-hidden shadow-lg';
    card.innerHTML = `
        <img 
            src="${product.images[0]}" 
            alt="${product.name}" 
            class="w-full h-64 object-cover"
        >
        <div class="p-4">
            <div class="flex items-center mb-2">
                <img 
                    src="${product.brandLogo}" 
                    alt="${product.brand}" 
                    class="w-6 h-6 mr-2"
                >
                <span class="text-sm text-gray-600">${product.brand}</span>
            </div>
            <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
            <div class="flex items-center mb-2">
                <div class="text-yellow-400">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span class="text-sm text-gray-600 ml-2">(${product.reviews.length} reviews)</span>
            </div>
            <p class="text-lg font-bold mb-4">$${product.price.toFixed(2)}</p>
            <a href="/product/${product.id}/" class="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
                View Details
            </a>
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    initSearch();

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length > 2) {
                performSearch(query);
            } else if (query.length === 0) {
                location.reload();
            }
        });
    }
});