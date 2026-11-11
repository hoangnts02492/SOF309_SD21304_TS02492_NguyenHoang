let cart = [];

export function initCart() {
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');

    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', () => {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
        });
    }

    const closeCart = () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    };

    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

export function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    
    document.getElementById('cartDrawer')?.classList.add('open');
    document.getElementById('cartOverlay')?.classList.add('open');
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    if (cartCount) cartCount.textContent = cart.length;

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Giỏ hàng đang trống.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map((item) => `
                <div class="cart-item-row">
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <p>${item.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                </div>
            `).join('');
        }
    }

    if (cartTotalPrice) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPrice.textContent = total.toLocaleString('vi-VN') + '₫';
    }
}

export function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    alert('Cảm ơn bạn đã đặt hàng! Conbovuive Gear sẽ liên hệ xác nhận sớm nhất.');
    cart = [];
    updateCartUI();
}