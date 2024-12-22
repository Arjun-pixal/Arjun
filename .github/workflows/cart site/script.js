let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to add products to the cart
function addToCart(productName, price, imageUrl) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        // Product already in cart, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // New product, add to cart with image URL
        cart.push({ name: productName, price: price, quantity: 1, image: imageUrl });
    }
    updateCart();
    myFunction("Your item added to cart 🥰🥰 👍"); // Alert when item is added to the cart
}

// Function to decrease the quantity of products in the cart
function decreaseQuantity(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        // Decrease quantity by one
        cart[productIndex].quantity -= 1;

        // If quantity is 0, remove the product from the cart
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1); // Remove product from cart
        }
        updateCart(); // Refresh cart
        myFunction("Your item has been removed from the cart."); // Alert when item is removed from the cart
    }
}

// Function to update local storage and refresh cart display
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');

    if (!cartItemsDiv || !totalPriceDiv) return; // Ensure the elements exist

    cartItemsDiv.innerHTML = ''; // Clear the display
    let total = 0;

    // Loop through each item in the cart
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity; // Calculate total for each item
        total += itemTotal; // Accumulate total price
        cartItemsDiv.innerHTML += `
            <div class="card mb-3">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 100px; height: 100px; margin-right: 10px;">
                        <div>
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Price: ₹${item.price} | Quantity: ${item.quantity}</p>
                            <p class="card-text">Total: ₹${itemTotal.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-warning" onclick="decreaseQuantity('${item.name}')">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    totalPriceDiv.innerText = total.toFixed(2); // Display total price
}

// Function to toggle the wishlist state and animate it
function toggleWishlist(btn, productName, price, imageUrl) {
    const icon = btn.querySelector('i');
    const productIndex = wishlist.findIndex(item => item.name === productName);

    // Toggle the wishlist state
    if (productIndex > -1) {
        wishlist.splice(productIndex, 1); // Remove from wishlist
        icon.classList.replace('bi-heart-fill', 'bi-heart');
        myFunction("Your item has been removed from the wishlist."); // Alert when item is removed
    } else {
        wishlist.push({ name: productName, price: price, image: imageUrl }); // Add to wishlist
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        myFunction("Your item added to wishlist ❤️"); // Alert when item is added
    }

    // Trigger the animation
    icon.classList.add('animated');
    setTimeout(() => {
        icon.classList.remove('animated'); // Remove animation after 500ms
    }, 500); 

    // Update the wishlist in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlistItems(); // Update wishlist display
}

// Function to display wishlist items
function displayWishlistItems() {
    const wishlistItemsDiv = document.getElementById('wishlist-items');
    if (!wishlistItemsDiv) return; // Ensure the element exists

    wishlistItemsDiv.innerHTML = ''; // Clear the display

    wishlist.forEach(item => {
        wishlistItemsDiv.innerHTML += `
            <div class="card mb-3">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="wishlist-item-image" style="width: 50px; height: 50px; margin-right: 10px;">
                        <div>
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Price: ₹${item.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Call displayCartItems and displayWishlistItems when the page loads
window.onload = function () {
    displayCartItems(); // Show items in cart when the page loads
    displayWishlistItems(); // Show items in wishlist when the page loads
};

// Function for alert messages
function myFunction(message) {
    alert(message);
}



// example
// Function to get products from localStorage
function getProducts() {
    let products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Function to save products to localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to add a new product
function addProduct(name, price, imageUrl) {
    const products = getProducts();
    products.push({ name, price, imageUrl });
    saveProducts(products);
    alert('Product added successfully!');
}

// Function to display products on any page (e.g., home or product page)
function displayProducts(containerId) {
    const products = getProducts();
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container first

    products.forEach((product, index) => {
        const productCard = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card bg-dark text-light">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">₹${product.price}</p>
                        <button class="btn btn-danger" onclick="addToCart('${product.name}', ${product.price}, '${product.imageUrl}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// Function to handle adding the product from the form
function handleAddProductForm(event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageUrl = document.getElementById('product-image').value;

    if (name && price && imageUrl) {
        addProduct(name, price, imageUrl);
        document.getElementById('add-product-form').reset(); // Reset the form
    } else {
        alert('Please fill all fields');
    }
}

// Adding event listener for the add product form
if (document.getElementById('add-product-form')) {
    document.getElementById('add-product-form').addEventListener('submit', handleAddProductForm);
}

// Call this function on home or products page to display products dynamically
// e.g., displayProducts('product-container');


