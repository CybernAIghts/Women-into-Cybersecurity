document.addEventListener('DOMContentLoaded', function() {
    const cartItemsEl = document.getElementById('cart-items');
    const subtotalEl = document.querySelector('.subtotal');
    const taxEl = document.querySelector('.tax');
    const totalEl = document.querySelector('.total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += parseFloat(item.price.substring(1)) * item.quantity;
        });
        let tax = subtotal * 0.2; // Assuming 20% tax rate
        let total = subtotal + tax;
        subtotalEl.textContent = `£${subtotal.toFixed(2)}`;
        taxEl.textContent = `£${tax.toFixed(2)}`;
        totalEl.textContent = `£${total.toFixed(2)}`;
    }
    

    function addItemToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartTotals();
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartTotals();
    }

    function displayCartItems() {
        cartItemsEl.innerHTML = '';
        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <p>${item.price}</p>
                    </div>
                </div>
                <div class="item-quantity">
                    <input type="number" value="${item.quantity}" min="1" onchange="updateItemQuantity('${item.id}', this.value)">
                </div>
                <button onclick="removeItemFromCart('${item.id}')">Remove</button>
            `;
            cartItemsEl.appendChild(cartItemEl);
        });
    }

    function updateItemQuantity(productId, quantity) {
        cart.forEach(item => {
            if (item.id === productId) {
                item.quantity = parseInt(quantity);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotals();
    }

    displayCartItems();
    updateCartTotals();
});
