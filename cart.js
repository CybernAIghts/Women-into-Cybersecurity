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

    updateCartCount();
});
