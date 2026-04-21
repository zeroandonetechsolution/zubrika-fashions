// Product Data
const products = [
    {
        id: 1,
        title: "Oversized Graphic T-Shirt - Tokyo Drift",
        brand: "ZUBRIKA",
        price: 899,
        originalPrice: 1499,
        discount: 40,
        rating: 4.8,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
        isNew: true,
        category: "tshirts"
    },
    {
        id: 2,
        title: "Cargo Pants with Multi-Pockets - Olive Green",
        brand: "ZUBRIKA",
        price: 1899,
        originalPrice: 2599,
        discount: 27,
        rating: 4.6,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1624378441864-6da7ac5e2e83?w=600&q=80",
        isNew: false,
        category: "pants"
    },
    {
        id: 3,
        title: "Streetwear Checked Flannel Shirt",
        brand: "ZUBRIKA",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.9,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=600&q=80",
        isNew: true,
        category: "shirts"
    },
    {
        id: 4,
        title: "Relaxed Fit Denim Jacket - Distressed",
        brand: "ZUBRIKA",
        price: 2499,
        originalPrice: 3499,
        discount: 28,
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&q=80",
        isNew: false,
        category: "outerwear"
    },
    {
        id: 5,
        title: "Minimalist Anime Print Tee - Black",
        brand: "ZUBRIKA",
        price: 799,
        originalPrice: 1299,
        discount: 38,
        rating: 4.5,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
        isNew: true,
        category: "tshirts"
    },
    {
        id: 6,
        title: "Cyberpunk Techwear Joggers",
        brand: "ZUBRIKA",
        price: 1699,
        originalPrice: 2299,
        discount: 26,
        rating: 4.8,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
        isNew: false,
        category: "pants"
    },
    {
        id: 7,
        title: "Corduroy Overshirt - Rust Orange",
        brand: "ZUBRIKA",
        price: 1499,
        originalPrice: 2199,
        discount: 31,
        rating: 4.6,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
        isNew: false,
        category: "shirts"
    },
    {
        id: 8,
        title: "Heavyweight Boxy Fit Solid Tee - White",
        brand: "ZUBRIKA",
        price: 699,
        originalPrice: 999,
        discount: 30,
        rating: 4.9,
        reviews: 530,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
        isNew: true,
        category: "tshirts"
    }
];

// State
let cart = JSON.parse(localStorage.getItem('zubrikaCart')) || [];
let selectedSize = 'L'; // Default size for modal

const filterState = {
    sort: 'featured',
    categories: [],
    price: 'all'
};

// DOM Elements
const productList = document.getElementById('product-list');
const cartBadge = document.getElementById('cart-badge');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartTotalPrice = document.getElementById('cart-total-price');
const shopNowBtn = document.getElementById('shop-now-btn');

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav-links a');

const sortSelect = document.getElementById('sort-select');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const priceRadios = document.querySelectorAll('input[name="price"]');
const mobileFilterBtn = document.getElementById('mobile-filter-btn');
const shopSidebar = document.querySelector('.shop-sidebar');

const pdpModal = document.getElementById('pdp-modal');
const pdpOverlay = document.getElementById('pdp-overlay');
const closePdpBtn = document.getElementById('close-pdp-btn');
const pdpContent = document.getElementById('pdp-content');

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');

const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout-btn');
const checkoutItemsContainer = document.getElementById('checkout-items');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutGrandtotal = document.getElementById('checkout-grandtotal');

const checkoutCity = document.getElementById('checkout-city');
const checkoutState = document.getElementById('checkout-state');
const checkoutPin = document.getElementById('checkout-pin');

const successModal = document.getElementById('success-modal');
const orderIdEl = document.getElementById('order-id');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProducts(products);
    updateCartUI();
    setupEventListeners();
});

// Theme Setup
function initTheme() {
    let currentTheme = localStorage.getItem('zubrikaTheme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Render Products
function renderProducts(productsToRender) {
    productList.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productList.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; font-weight:800; font-size:1.5rem;">No products found matching these filters.</div>';
        return;
    }
    
    productsToRender.forEach((product, index) => {
        const productEl = document.createElement('div');
        productEl.classList.add('product-card');
        productEl.style.animation = `fadeIn 0.5s ease backwards ${index * 0.05}s`;
        
        let badgesHtml = '';
        if (product.discount > 0) {
            badgesHtml += `<div class="badge badge-discount">-${product.discount}%</div>`;
        }
        if (product.isNew) {
            badgesHtml += `<div class="badge badge-new">NEW</div>`;
        }

        productEl.innerHTML = `
            <div class="product-badges">
                ${badgesHtml}
            </div>
            <div class="product-image" onclick="openPDP(${product.id})" style="cursor: pointer;">
                <img src="${product.image}" loading="lazy" alt="${product.title}">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title" onclick="openPDP(${product.id})" style="cursor: pointer;">${product.title}</h3>
                <div class="product-meta">
                    <div class="product-price">
                        <span class="current-price">₹${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating}</span>
                    </div>
                </div>
                <button class="btn btn-primary add-to-cart-btn" onclick="addToCart(${product.id}, 'L')">
                    ADD TO BAG
                </button>
            </div>
        `;
        
        productList.appendChild(productEl);
    });
}

// Cart Functionality
function addToCart(productId, size = 'L', fromPdp = false) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // We use a combined ID to distinguish sizes in the cart
    const cartItemId = `${productId}-${size}`;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            cartItemId: cartItemId,
            id: product.id,
            title: `${product.title} - ${size}`,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    if (fromPdp) closePDP();
    openCart();
    
    // Animate Add to Cart
    animateCartIcon();
}

function updateQuantity(cartItemId, change) {
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    // Update badge
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Update contents
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCartMsg);
        emptyCartMsg.style.display = 'flex';
        cartTotalPrice.textContent = '₹0';
    } else {
        emptyCartMsg.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            
            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div>
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQuantity('${item.cartItemId}', -1)">-</button>
                            <div class="qty-value">${item.quantity}</div>
                            <button class="qty-btn" onclick="updateQuantity('${item.cartItemId}', 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.cartItemId}')" aria-label="Remove item">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
        
        cartTotalPrice.textContent = `₹${total}`;
    }
}

function saveCart() {
    localStorage.setItem('zubrikaCart', JSON.stringify(cart));
}

function animateCartIcon() {
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
    }, 200);
}

// Drawer Controls
function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// PDP Controls
function openPDP(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    selectedSize = 'L'; // Reset size on open
    
    pdpContent.innerHTML = `
        <div class="pdp-image-col">
            <img src="${product.image}" loading="lazy" alt="${product.title}">
        </div>
        <div class="pdp-details-col">
            <div class="pdp-brand">${product.brand}</div>
            <h2 class="pdp-title">${product.title}</h2>
            
            <div class="pdp-price-wrap">
                <span class="pdp-current-price">₹${product.price}</span>
                ${product.originalPrice ? `<span class="pdp-original-price">₹${product.originalPrice}</span>` : ''}
            </div>
            
            <div class="pdp-size-title">Select Size</div>
            <div class="size-selector">
                <button class="size-btn" onclick="selectSize(this, 'S')">S</button>
                <button class="size-btn" onclick="selectSize(this, 'M')">M</button>
                <button class="size-btn selected" onclick="selectSize(this, 'L')">L</button>
                <button class="size-btn" onclick="selectSize(this, 'XL')">XL</button>
            </div>
            
            <p class="pdp-desc">
                Uncompromising comfort meets street-ready style. Crafted with premium thick cotton blend. 
                Features a relaxed drop-shoulder fit tailored for urban environments. Authentic Zubrika tag.
            </p>
            
            <button class="btn btn-primary pdp-add-to-cart" onclick="addToCart(${product.id}, selectedSize, true)">
                ADD TO BAG
            </button>
        </div>
    `;

    pdpModal.classList.add('active');
    pdpOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDP() {
    pdpModal.classList.remove('active');
    pdpOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function selectSize(btn, size) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSize = size;
}

// Filter Engine
function applyFilters() {
    let result = [...products];
    
    // Filter Category
    if (filterState.categories.length > 0) {
        result = result.filter(p => filterState.categories.includes(p.category));
    }
    
    // Filter Price
    if (filterState.price === 'under-1000') {
        result = result.filter(p => p.price < 1000);
    } else if (filterState.price === '1000-2000') {
        result = result.filter(p => p.price >= 1000 && p.price <= 2000);
    } else if (filterState.price === 'over-2000') {
        result = result.filter(p => p.price > 2000);
    }
    
    // Sort
    if (filterState.sort === 'price-low') {
        result.sort((a, b) => a.price - b.price);
    } else if (filterState.sort === 'price-high') {
        result.sort((a, b) => b.price - a.price);
    } else if (filterState.sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
    }
    
    renderProducts(result);
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme Toggle
    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('zubrikaTheme', currentTheme);
        
        if (currentTheme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Advanced Filters Events
    sortSelect.addEventListener('change', (e) => {
        filterState.sort = e.target.value;
        applyFilters();
    });

    categoryCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const checkedBoxes = Array.from(categoryCheckboxes).filter(i => i.checked);
            filterState.categories = checkedBoxes.map(i => i.value);
            applyFilters();
        });
    });

    priceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            filterState.price = e.target.value;
            applyFilters();
        });
    });

    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', () => {
            shopSidebar.classList.toggle('active');
        });
    }

    openCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    shopNowBtn.addEventListener('click', () => {
        closeCart();
        window.location.href = '#products';
    });

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // PDP Listeners
    closePdpBtn.addEventListener('click', closePDP);
    pdpOverlay.addEventListener('click', closePDP);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            closeMobileMenu();
            closePDP();
        }
    });

    // Checkout logic
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your bag is empty!');
        } else {
            closeCart();
            openCheckout();
        }
    });

    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Auto-fill City & State using PIN Code
    if (checkoutPin) {
        checkoutPin.addEventListener('input', async (e) => {
            const pin = e.target.value;
            if (pin.length === 6 && /^\d+$/.test(pin)) {
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
                    const data = await response.json();
                    
                    if (data && data[0].Status === "Success") {
                        const postOffice = data[0].PostOffice[0];
                        
                        checkoutCity.value = postOffice.District;
                        checkoutState.value = postOffice.State;
                        
                        // Neo-brutalist flash animation to signify auto-fill success
                        const originalBg = checkoutCity.style.backgroundColor;
                        checkoutCity.style.backgroundColor = 'var(--accent-yellow)';
                        checkoutState.style.backgroundColor = 'var(--accent-yellow)';
                        
                        setTimeout(() => {
                            checkoutCity.style.backgroundColor = originalBg;
                            checkoutState.style.backgroundColor = originalBg;
                        }, 500);
                    }
                } catch (error) {
                    console.error("Failed to fetch PIN details", error);
                }
            }
        });
    }

    // GPS Geolocation Address Fetching
    const gpsBtn = document.getElementById('gps-locate-btn');
    const checkoutStreet = document.getElementById('checkout-street');
    
    if (gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
                return;
            }
            
            const originalText = gpsBtn.innerHTML;
            gpsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
            
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                try {
                    // OpenStreetMap Nominatim API for Free Reverse Geocoding
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                    const data = await res.json();
                    
                    if (data && data.address) {
                        const addr = data.address;
                        
                        // Assemble structured street address
                        const streetArr = [];
                        if (addr.house_number) streetArr.push(addr.house_number);
                        if (addr.road) streetArr.push(addr.road);
                        if (addr.suburb) streetArr.push(addr.suburb);
                        if (addr.neighbourhood) streetArr.push(addr.neighbourhood);
                        
                        if (checkoutStreet) checkoutStreet.value = streetArr.join(', ') || data.display_name.split(',')[0];
                        if (checkoutCity) checkoutCity.value = addr.city || addr.town || addr.county || addr.state_district || '';
                        if (checkoutState) checkoutState.value = addr.state || '';
                        if (checkoutPin) checkoutPin.value = addr.postcode || '';
                        
                        // Flash animation to signify GPS mapping success
                        [checkoutStreet, checkoutCity, checkoutState, checkoutPin].forEach(input => {
                            if (!input) return;
                            const origBg = input.style.backgroundColor;
                            input.style.backgroundColor = 'var(--accent-blue)';
                            setTimeout(() => input.style.backgroundColor = origBg, 500);
                        });
                    }
                } catch (err) {
                    alert("Failed to reverse geocode address. Please enter manually.");
                } finally {
                    gpsBtn.innerHTML = originalText;
                }
                
            }, (error) => {
                alert("Location access denied or failed.");
                gpsBtn.innerHTML = originalText;
            });
        });
    }
    
    // Mobile Menu
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

// Checkout Methods
function openCheckout() {
    checkoutModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden'; // Ensure it locks scrolling
    renderCheckoutSummary();
}

function renderCheckoutSummary() {
    checkoutItemsContainer.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
        const el = document.createElement('div');
        el.className = 'checkout-item-mini';
        el.innerHTML = `
            <img src="${item.image}" alt="">
            <div style="flex-grow:1;">
                <div style="font-weight:800;font-size:0.9rem;">${item.title}</div>
                <div style="font-size:0.8rem; font-weight:600;">Qty: ${item.quantity} | Size: ${item.size}</div>
                <div style="font-weight:800;margin-top:5px;">₹${item.price}</div>
            </div>
        `;
        checkoutItemsContainer.appendChild(el);
    });
    
    checkoutSubtotal.textContent = `₹${subtotal}`;
    checkoutGrandtotal.textContent = `₹${subtotal + 100}`; // Flat 100 shipping
}

function completeCheckout() {
    const orderId = 'ZB-' + Math.floor(Math.random() * 1000000);
    orderIdEl.textContent = orderId;
    
    cart = [];
    saveCart();
    updateCartUI();
    
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = ''; // Unlock for success modal
    
    successModal.classList.add('active');
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    window.location.href = '#';
}
