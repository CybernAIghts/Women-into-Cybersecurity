document.addEventListener('DOMContentLoaded', function() {
    const cartCountEl = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalCount;
    }

    function addProductToCart(productId, productName, productPrice, productImage) {
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }

    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', function() {
            const productEl = this.closest('.product');
            const productId = parseInt(productEl.getAttribute('data-id'), 10);
            const productName = productEl.querySelector('h3').textContent;
            const productPrice = parseFloat(productEl.querySelector('p').textContent.substring(1));
            const productImage = productEl.querySelector('img').src;

            addProductToCart(productId, productName, productPrice, productImage);
        });
    });

    const cartItemsEl = document.getElementById('cart-items');
    const subtotalEl = document.querySelector('.subtotal');
    const taxEl = document.querySelector('.tax');
    const totalEl = document.querySelector('.total');
    const clearCartButton = document.getElementById('clear-cart');

    function updateCartTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            let priceString = item.price.toString().replace('£', '');
            subtotal += parseFloat(priceString) * item.quantity;
        });
        let tax = subtotal * 0.2;
        let total = subtotal + tax;

        subtotalEl.textContent = `£${subtotal.toFixed(2)}`;
        taxEl.textContent = `£${tax.toFixed(2)}`;
        totalEl.textContent = `£${total.toFixed(2)}`;
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartTotals();
        updateCartCount();
    }

    function clearCart() {
        cart = [];
        localStorage.removeItem('cart');
        displayCartItems();
        updateCartTotals();
        updateCartCount();
    }

    function displayCartItems() {
        cartItemsEl.innerHTML = '';
        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-details">
                    <p>${item.name}</p>
                    <p>Price: £${item.price}</p>
                    <input type="number" value="${item.quantity}" min="1" id="quantity-${item.id}">
                    <button id="update-${item.id}">Update</button>
                    <button id="remove-${item.id}">Remove</button>
                </div>
            `;
            cartItemsEl.appendChild(cartItemEl);

            document.getElementById(`remove-${item.id}`).addEventListener('click', function() {
                removeItemFromCart(item.id);
            });

            document.getElementById(`update-${item.id}`).addEventListener('click', function() {
                updateQuantity(item.id);
            });
        });
    }

    function updateQuantity(productId) {
        const quantityInput = document.getElementById(`quantity-${productId}`);
        const newQuantity = parseInt(quantityInput.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            cart.forEach(item => {
                if (item.id === productId) {
                    item.quantity = newQuantity;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartTotals();
            updateCartCount();
        }
    }

    clearCartButton.addEventListener('click', clearCart);

    displayCartItems();
    updateCartTotals();
    updateCartCount();
});
