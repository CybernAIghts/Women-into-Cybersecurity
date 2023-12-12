document.addEventListener('DOMContentLoaded', function() {
    const cartCountEl = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalCount;
    }

    function addProductToCart(productId, productName, productPrice, productImage) {
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex > -1) {
            // Increase the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add the new product
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
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
            // Ensure item.price is a string and remove the currency symbol (e.g., '£')
            let priceString = item.price;
            if (typeof item.price !== 'string') {
                priceString = item.price.toString();
            }
            priceString = priceString.replace('£', ''); // Remove the currency symbol
            subtotal += parseFloat(priceString) * item.quantity;
        });
        let tax = subtotal * 0.2; // Assuming 20% tax rate
        let total = subtotal + tax;
    
        // Use £ as the currency symbol for subtotal, tax, and total
        subtotalEl.textContent = `£${subtotal.toFixed(2)}`;
        taxEl.textContent = `£${tax.toFixed(2)}`;
        totalEl.textContent = `£${total.toFixed(2)}`;
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartTotals();
    }

    function clearCart() {
        cart = [];
        localStorage.removeItem('cart');
        displayCartItems();
        updateCartTotals();
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
                    <button onclick="updateQuantity('${item.id}')">Update</button>
                    <button onclick="removeItemFromCart('${item.id}')">Remove</button>
                </div>
            `;
            cartItemsEl.appendChild(cartItemEl);
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
        }
    }

    window.removeItemFromCart = removeItemFromCart;
    window.updateQuantity = updateQuantity;
    clearCartButton.addEventListener('click', clearCart);

    displayCartItems();
    updateCartTotals();
    updateCartCount(); // Call this once after everything is set up
});
